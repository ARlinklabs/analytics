import './arweave.js'
import { message } from './aoconnect.js'
import { createData, ArweaveSigner } from './arbundles.js'

export class Junction {
  #signer
  #processId
  #trackUrlHashes

  constructor(signer, processId, trackUrlHashes) {
    this.#signer = signer
    this.#processId = processId
    this.#trackUrlHashes = trackUrlHashes
  }

  static log = (...args) => console.log('[Junction]', ...args)

  static async initialize(config) {
    if (!config.debug) Junction.log = () => {}

    let { signer } = config

    Junction.log('Initializing:', config)

    if (!signer) {
      let wallet
      const storedWallet = localStorage.getItem('junctionWallet')

      if (storedWallet) {
        Junction.log('Found stored wallet.')
        wallet = JSON.parse(storedWallet)
      } else {
        wallet = await Arweave.init(config.arweaveConfig ?? {}).wallets.generate()
        localStorage.setItem('junctionWallet', JSON.stringify(wallet))
        Junction.log('Generated new wallet.')
      }

      const arweaveSigner = new ArweaveSigner(wallet)
      signer = async ({ data, tags, target, anchor }) => {
        const dataItem = createData(data, arweaveSigner, {
          tags,
          target,
          anchor
        })
        await dataItem.sign(arweaveSigner)
        return { id: await dataItem.id, raw: await dataItem.getRaw() }
      }
    }

    return new Junction(signer, config.processId, config.trackUrlHashes ?? false)
  }

  #getClientInfo = async () => {
    const info = []
    const timestamp = Date.now()

    // Basic URL info (without duplicating what will be in payload)
    const canonicalLinkTag = document.querySelector('link[rel="canonical"]')
    let url = canonicalLinkTag?.getAttribute('href') || 
      (this.#trackUrlHashes ? window.location.href : window.location.href.replace(/#.*$/, ''))
    info.push({ name: 'url', value: url })

    // URL and basic page info
    info.push({ name: 'j-path', value: window.location.pathname })
    info.push({ name: 'j-title', value: document.title })
    info.push({ name: 'j-referrer', value: document.referrer })

    // Enhanced browser detection
    const ua = navigator.userAgent
    let browserInfo = 'others'
    if (ua.includes('Chrome') && ua.includes('Brave')) {
      browserInfo = 'brave'
    } else if (ua.includes('Chrome') && !ua.includes('Edg/')) {
      browserInfo = 'chrome'
    } else if (ua.includes('Firefox')) {
      browserInfo = 'firefox'
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browserInfo = 'safari'
    }
    info.push({ name: 'browser', value: browserInfo })

    // Enhanced OS detection
    let osInfo = 'Unknown'
    if (ua.includes('Windows')) {
      osInfo = 'Windows'
    } else if (ua.includes('Mac')) {
      osInfo = 'Mac'
    } else if (ua.includes('iPhone') || ua.includes('iPad')) {
      osInfo = 'iOS'
    } else if (ua.includes('Android')) {
      osInfo = 'Android'
    } else if (ua.includes('Linux')) {
      osInfo = 'Linux'
    }
    info.push({ name: 'os', value: osInfo })

    // Enhanced device detection
    let deviceType = 'desktop'
    if (/Mobile|Android|iPhone|iPod/i.test(ua)) {
      deviceType = 'mobile'
    } else if (/Tablet|iPad/i.test(ua)) {
      deviceType = 'tablet'
    }
    info.push({ name: 'device', value: deviceType })

    // Screen and connection info
    info.push({ name: 'screen', value: `${window.screen.width}x${window.screen.height}` })
    if (navigator.connection) {
      info.push({ name: 'connection', value: navigator.connection.effectiveType || 'unknown' })
    }

    // Enhanced timezone info for region/country detection
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (timezone) {
        info.push({ name: 'tz', value: timezone })
      }
    } catch (_) {
      const timezoneOffset = new Date().getTimezoneOffset()
      info.push({
        name: 'tz',
        value: timezoneOffset > 0
          ? `UTC${(timezoneOffset * -1) / 60}`
          : `UTC+${(timezoneOffset * -1) / 60}`
      })
    }

    // Enhanced wallet detection
    if (window.arweaveWallet) {
      const arWallet = window.arweaveWallet.walletName || 'ArConnect'
      info.push({ name: 'ar', value: arWallet })
      try {
        const address = await window.arweaveWallet.getActiveAddress()
        if (address) {
          info.push({ name: 'ar-con', value: '1' })
        }
      } catch (_) {}
    }

    if (window.ethereum) {
      let ethWallet = 'unknown'
      if (window.ethereum.isBraveWallet) {
        ethWallet = 'BraveWallet-ETH'
      } else if (window.ethereum.isMetaMask) {
        ethWallet = 'MetaMask'
      }

      info.push({ name: 'eth', value: ethWallet })
      if (window.ethereum.selectedAddress) {
        info.push({ name: 'eth-con', value: '1' })
        info.push({ name: 'eth-chain', value: '' + window.ethereum.chainId })
      }
    }

    if (window.solana) {
      let solWallet = 'unknown'
      if (window.solana.isBraveWallet) {
        solWallet = 'BraveWallet-SOL'
      } else if (window.solana.isPhantom) {
        solWallet = 'Phantom'
      }
      else if (window.solana.isSolflare) {
        solWallet = 'Solflare'
      }
      else if (window.solana.isBackpack) {
        solWallet = 'Backpack'
      }
      
      
      info.push({ name: 'sol', value: solWallet })
      if (window.solana.publicKey) {
        info.push({ name: 'sol-con', value: '1' })
      }
    }

    return info
  }

  track = async (event, payload = {}) => {
    const clientInfo = await this.#getClientInfo()
    
    // Calculate load time
    const loadTime = window.performance.timing ? 
      `${((window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / 1000).toFixed(1)}` : '0.0s'

    const filteredClientInfo = clientInfo.filter(info => 
      !['j-path', 'j-title', 'j-referrer', 'j-lt'].includes(info.name)
    )

    // Construct tags with formatted data
    const tags = [
      { name: 'Action', value: 'Track' },
      { name: 'ev', value: event },
      { name: 'timestamp', value: new Date().toISOString().replace(/\.[0-9]{3}Z$/, 'GMT') },
      { name: 'pageVisited', value: window.location.pathname },
      { name: 'browserDevice', value: `${clientInfo.find(i => i.name === 'browser')?.value?.charAt(0).toUpperCase() + clientInfo.find(i => i.name === 'browser')?.value?.slice(1) || 'Unknown'} ${clientInfo.find(i => i.name === 'os')?.value || 'Unknown'}` },
      { name: 'country', value: this.#getCountryFromTimezone(clientInfo.find(i => i.name === 'tz')?.value) },
      { name: 'lt', value: loadTime },  // Simplified load time
      ...filteredClientInfo
    ]

    Junction.log(tags)
    await message({ 
      process: this.#processId, 
      signer: this.#signer, 
      tags 
    })
  }

  // Helper function to get country from timezone
   #getCountryFromTimezone = (tz) => {
    const tzCountryMap = {
      'Pacific/Midway': 'United States',
      'Pacific/Honolulu': 'United States',
      'America/Anchorage': 'United States',
      'America/Los_Angeles': 'United States',
      'America/Denver': 'United States',
      'America/Chicago': 'United States',
      'America/New_York': 'United States',
      'America/Toronto': 'Canada',
      'America/Mexico_City': 'Mexico',
      'America/Bogota': 'Colombia',
      'America/Caracas': 'Venezuela',
      'America/Sao_Paulo': 'Brazil',
      'Atlantic/Azores': 'Portugal',
      'Europe/London': 'United Kingdom',
      'Europe/Paris': 'France',
      'Europe/Berlin': 'Germany',
      'Europe/Rome': 'Italy',
      'Europe/Madrid': 'Spain',
      'Europe/Moscow': 'Russia',
      'Africa/Cairo': 'Egypt',
      'Africa/Johannesburg': 'South Africa',
      'Asia/Dubai': 'United Arab Emirates',
      'Asia/Kolkata': 'India',
      'Asia/Calcutta': 'India',
      'Asia/Kathmandu': 'Nepal',
      'Asia/Dhaka': 'Bangladesh',
      'Asia/Jakarta': 'Indonesia',
      'Asia/Shanghai': 'China',
      'Asia/Tokyo': 'Japan',
      'Asia/Seoul': 'South Korea',
      'Asia/Singapore': 'Singapore',
      'Asia/Hong_Kong': 'Hong Kong',
      'Australia/Sydney': 'Australia',
      'Australia/Melbourne': 'Australia',
      'Pacific/Auckland': 'New Zealand',
      'Pacific/Fiji': 'Fiji',
    };
  
    return tzCountryMap[tz] || 'Unknown';
  };
  

  page = (pageData = {}) => {
    const enhancedData = {
      ...pageData,
      referrer: document.referrer,
      title: document.title,
      path: window.location.pathname,
      loadTime: window.performance.timing ? 
        window.performance.timing.loadEventEnd - window.performance.timing.navigationStart : 0
    }
    return this.track('pv', enhancedData)
  }

  // Add automatic page view tracking
  initAutoTracking = () => {
    // Track initial page view
    this.page()

    // Track subsequent navigation (for SPAs)
    if (typeof history !== 'undefined') {
      const originalPushState = history.pushState
      history.pushState = function() {
        originalPushState.apply(this, arguments)
        this.page()
      }.bind(this)
      
      window.addEventListener('popstate', () => this.page())
    }
  }
}
