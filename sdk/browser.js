import { Junction } from './junction.js'

const start = Date.now()

async function main() {
  const scriptTag = document.querySelector('script[data-process-id]')
  const processId = scriptTag.getAttribute('data-process-id')
  console.log(processId)
  if (!processId) throw new Error('[Junction] Script tag missing data-process-id attribute')

  const trackUrlHashes = scriptTag.getAttribute('data-track-url-hashes') === 'true'
  const debug = scriptTag.getAttribute('data-debug') === 'true'

  const junction = await Junction.initialize({ processId, trackUrlHashes, debug })

  // Initialize auto tracking instead of manual event listeners
  

  // Enhanced performance tracking
  const trackPerformance = () => {
    // Calculate load time correctly
    const loadTime = window.performance.timing ? 
      window.performance.timing.loadEventEnd - window.performance.timing.navigationStart : 
      Date.now() - start;

    const performanceData = {
      lt: loadTime, // Single consistent load time
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer,
      // Performance metrics
      performance: {
        navigationStart: window.performance.timing?.navigationStart,
        domComplete: window.performance.timing?.domComplete,
        loadEventEnd: window.performance.timing?.loadEventEnd,
        ...(window.performance.memory ? {
          jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
          totalJSHeapSize: window.performance.memory.totalJSHeapSize,
          usedJSHeapSize: window.performance.memory.usedJSHeapSize
        } : {})
      }
    }

    junction.page(performanceData)
  }

  // Track initial page load with performance data
  window.addEventListener('load', trackPerformance)

  // Track client-side navigation
  if (trackUrlHashes) {
    window.addEventListener('hashchange', () => junction.page({ lt: 0 }))
  }

  // Make analytics available globally with additional utilities
  window.analytics = {
    ...junction,
    trackEvent: (eventName, eventData = {}) => junction.track(eventName, eventData),
    trackPageView: (pageData = {}) => junction.page(pageData),
    trackPerformance: () => trackPerformance()
  }
}

// Handle errors during initialization
main().catch(error => {
  console.error('[Junction] Initialization error:', error)
})
