# Analytics Implementation Tutorial

## Case 1: New User (First Time Setup)


Step 1: Check Analytics Status

```
// First, check if the project has analytics enabled
const analyticsStatus = await getProjectPID(projectName, REGISTRY_PROCESS);
if (!analyticsStatus.processId) {
    // Show enable analytics button/UI
    showEnableAnalyticsButton();
}
```

Step 2: Enable Analytics
When user clicks "Enable Analytics" button:

```
async function enableAnalytics(projectName: string) {
    try {
        // 1. Spawn a new analytics process
        const newProcessId = await spawnProcess(`${projectName}-analytics`);
        
        // 2. Initialize the analytics contract
        await runLua(setupCommands, newProcessId);
        
        // 3. Register with analytics registry
        const walletAddress = await window.arweaveWallet.getActiveAddress();
        const registration = await registerProject(
            projectName,
            newProcessId,
            walletAddress
        );

        if (registration.success) {
            // Show success message
            showSuccessMessage("Analytics enabled successfully!");
            return newProcessId;
        }
    } catch (error) {
        console.error("Failed to enable analytics:", error);
        showErrorMessage("Failed to enable analytics");
    }
}

```

## Case 2: Existing User (Analytics Already Setup)

Step 1: Fetch Analytics Process ID

```
async function getAnalyticsData(projectName: string) {
    try {
        // 1. Get the project's analytics process ID
        const projectData = await getProjectPID(
            projectName,
            REGISTRY_PROCESS
        );

        if (!projectData.processId) {
            throw new Error("Analytics not found for this project");
        }

        return projectData.processId;
    } catch (error) {
        console.error("Error fetching analytics ID:", error);
        throw error;
    }
}
```
Step 2: Fetch Analytics Data
```
async function fetchAnalytics(processId: string) {
    try {
        // Get analytics data
        const analytics = await getAnalytics(processId);
        
        if (analytics.data) {
            return analytics.data;
        } else {
            throw new Error(analytics.error || "Failed to fetch analytics");
        }
    } catch (error) {
        console.error("Error fetching analytics:", error);
        throw error;
    }
}
```
Example Analytics Data Structure

```
// The analytics data will include:
{
    analyticsMetrics: {
        pageViews: {
            value: number,
            change: number,
            trend: 'up' | 'down',
            chartData: Array<{date: string, value: number}>
        },
        visitors: {
            // Same structure as pageViews
        },
        avgLoadTime: {
            // Same structure as pageViews
        },
        globalTraffic: {
            regions: Record<string, number>
        },
        topCountries: Record<string, number>
    },
    browsers: Array<{
        name: string,
        visitors: number,
        percentage: number
    }>,
    wallets: Array<{
        name: string,
        visitors: number,
        percentage: number
    }>,
    topPages: Array<{
        path: string,
        visitors: number,
        percentage: number
    }>,
    recentActivity: Array<{
        timestamp: string,
        browserDevice: string,
        pageVisited: string,
        loadTime: string,
        country: string
    }>
}
```
# Core Functions

```
// Constants
const REGISTRY_PROCESS = 'LBFUMh7TLRcEWWiZhTd_FaDmAiaReOiPfZdQh5QAVrg';

interface RegisterProjectReturnType {
    messageId: string | null;
    success: boolean;
    error: string | null;
}

/**
 * Register a project with the analytics registry
 */
export async function registerProject(
    projectName: string,
    processId: string,
    walletAddress: string
): Promise<RegisterProjectReturnType> {
    const TARGET_PROCESS = REGISTRY_PROCESS;
    const ao = connect();

    try {
        // Send registration message
        const message = await ao.message({
            process: TARGET_PROCESS,
            tags: [
                { name: "Action", value: "RegisterProject" },
                { name: "Projectname", value: projectName },
                { name: "ProcessID", value: processId },
                { name: "walletaddr", value: walletAddress }
            ],
            signer: createDataItemSigner(window.arweaveWallet),
        });

        console.log("Registration message sent with ID:", message);

        const { Messages, Error } = await ao.result({
            message: message,
            process: TARGET_PROCESS,
        });

        if (Messages && Messages.length > 0) {
            return {
                messageId: message,
                success: Messages[0].Tags.Status === "Success",
                error: null,
            };
        }

        if (Error) {
            return {
                messageId: message,
                success: false,
                error: Error,
            };
        }

        return {
            messageId: message,
            success: false,
            error: "No response received",
        };
    } catch (error) {
        console.error("Failed to register project:", error);
        throw error;
    }
}

/**
 * Get project's analytics process ID
 */
export async function getProjectPID(
    projectName: string,
    managerProcess: string = REGISTRY_PROCESS
): Promise<GetProjectPIDResponse> {
    const TARGET_PROCESS = managerProcess;
    const ao = connect();

    try {
        const message = await ao.message({
            process: TARGET_PROCESS,
            tags: [
                { name: "Action", value: "GetProjectPID" },
                { name: "Projectname", value: projectName },
                { name: "walletaddr", value: await window.arweaveWallet.getActiveAddress() }
            ],
            signer: createDataItemSigner(window.arweaveWallet),
        });

        const { Messages, Error } = await ao.result({
            message: message,
            process: TARGET_PROCESS,
        });

        if (Messages && Messages.length > 0) {
            const status = Messages[0].Tags.Status;
            
            if (status === "Success") {
                return {
                    messageId: message,
                    processId: Messages[0].Data,
                    error: null,
                };
            } else {
                return {
                    messageId: message,
                    processId: null,
                    error: Messages[0].Data,
                };
            }
        }

        if (Error) {
            return {
                messageId: message,
                processId: null,
                error: Error,
            };
        }

        return {
            messageId: message,
            processId: null,
            error: "No response received",
        };
    } catch (error) {
        console.error("Failed to fetch project PID:", error);
        throw error;
    }
}
```

2. Analytics Functions
```
interface AnalyticsMetric {
    value: number;
    change: number;
    trend: 'up' | 'down';
    chartData: Array<{
        date: string;
        value: number;
    }>;
}

interface AnalyticsData {
    analyticsMetrics: {
        pageViews: AnalyticsMetric;
        visitors: AnalyticsMetric;
        avgLoadTime: AnalyticsMetric;
        globalTraffic: {
            regions: Record<string, number>;
        };
        topCountries: Record<string, number>;
    };
    browsers: Array<{
        name: string;
        visitors: number;
        percentage: number;
    }>;
    wallets: Array<{
        name: string;
        visitors: number;
        percentage: number;
    }>;
    topPages: Array<{
        path: string;
        visitors: number;
        percentage: number;
    }>;
    recentActivity: Array<{
        timestamp: string;
        browserDevice: string;
        pageVisited: string;
        loadTime: string;
        country: string;
    }>;
}

interface AnalyticsResponse {
    messageId: string | null;
    data: AnalyticsData | null;
    error: string | null;
}

/**
 * Fetch analytics data for a project
 */
export async function getAnalytics(
    processId: string
): Promise<AnalyticsResponse> {
    const ao = connect();

    try {
        const message = await ao.message({
            process: processId,
            tags: [
                { name: "Action", value: "GetAnalytics" }
            ],
            signer: createDataItemSigner(window.arweaveWallet),
        });

        console.log("Analytics request sent with ID:", message);

        const { Messages, Error } = await ao.result({
            message: message,
            process: processId,
        });

        if (Messages && Messages.length > 0) {
            const analyticsData = JSON.parse(Messages[0].Data);
            
            if (analyticsData.success) {
                return {
                    messageId: message,
                    data: analyticsData.data,
                    error: null,
                };
            }
        }

        if (Error) {
            return {
                messageId: message,
                data: null,
                error: Error,
            };
        }

        return {
            messageId: message,
            data: null,
            error: "No data received",
        };
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        throw error;
    }
}

/**
 * Helper function to spawn analytics process
 */
export async function spawnAnalyticsProcess(projectName: string): Promise<string> {
    try {
        const processId = await spawnProcess(`${projectName}-analytics`);
        
        // Initialize with analytics contract
        const setupCommands = `
           local _tl_compat; if (tonumber((_VERSION or ''):match('[%d.]*$')) or 0) < 5.3 then local p, m = pcall(require, 'compat53.module'); if p then _tl_compat = m end end; local math = _tl_compat and _tl_compat.math or math; local os = _tl_compat and _tl_compat.os or os; local pairs = _tl_compat and _tl_compat.pairs or pairs; local pcall = _tl_compat and _tl_compat.pcall or pcall

json = require("json")

-- Initialize State with all required structures
State = State or {
  pageViews = {}, -- Store monthly page views
  visitors = {}, -- Store monthly unique visitors
  loadTimes = {}, -- Store monthly load times
  countries = {}, -- Store country visit counts
  browsers = {}, -- Store browser usage
  wallets = {}, -- Store wallet usage
  pages = {}, -- Store page visit counts
  recentActivity = {}, -- Store recent activities
  monthlyStats = {} -- Store combined monthly statistics
}



-- Helper function to calculate percentages
local function calculatePercentages(data)
  local total = 0
  for _, item in pairs(data) do
    total = total + (type(item) == "table" and item.count or item)
  end
  
  local result = {}
  for key, value in pairs(data) do
    local count = type(value) == "table" and value.count or value
    table.insert(result, {
      [type(value) == "table" and value.name or key] = key,
      visitors = count,
      percentage = math.floor((count / total) * 100)
    })
  end
  
  table.sort(result, function(a, b) return a.visitors > b.visitors end)
  return result
end

-- Track handler to process incoming data
Handlers.add("track", Handlers.utils.hasMatchingTag("Action", "Track"), function(msg)
    -- Tags are already key-value pairs, no need to convert
    local data = msg.Tags

    -- Debug print
    print("Received data:", json.encode(data))

    -- Track handler validation section
    local requiredFields = {
        country = "Country",
        browser = "Browser",
        pageVisited = "Page Visited",
        lt = "Load Time"
    }

    -- Check missing fields
    local missingFields = {}
    for field, displayName in pairs(requiredFields) do
        if not data[field] then
            table.insert(missingFields, displayName)
        end
    end

    if #missingFields > 0 then
        return ao.send({
            Target = msg.From,
            Data = string.format("Error: Missing required fields: %s", table.concat(missingFields, ", ")),
            Tags = {
                ["Status"] = "Error",
                ["Error"] = "Missing required fields",
                ["Missing-Fields"] = table.concat(missingFields, ", ")
            }
        })
    end

    -- Extract month directly from timestamp string instead of using os.time parsing
    local month = "Jan" -- Default value
    if data.timestamp then
        -- Format: 2025-03-05T11:06:42GMT
        local _, monthNum = data.timestamp:match("(%d+)-(%d+)-")
        if monthNum then
            local monthIndex = tonumber(monthNum)
            if monthIndex and monthIndex >= 1 and monthIndex <= 12 then
                local months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}
                month = months[monthIndex]
                print("Extracted month: " .. month .. " from timestamp: " .. data.timestamp)
            end
        end
    end

    -- Initialize state structures if they don't exist
    State.monthlyStats = State.monthlyStats or {}
    State.countries = State.countries or {}
    State.browsers = State.browsers or {}
    State.wallets = State.wallets or {}
    State.pages = State.pages or {}
    State.recentActivity = State.recentActivity or {}

    State.monthlyStats[month] = State.monthlyStats[month] or {
        pageViews = 0,
        visitors = 0,
        loadTimes = { total = 0, count = 0 }
    }

    -- Update all statistics
    State.monthlyStats[month].pageViews = State.monthlyStats[month].pageViews + 1
    State.monthlyStats[month].visitors = State.monthlyStats[month].visitors + 1
    
    -- Parse and validate load time
    local loadTime = tonumber(data.lt)
    if loadTime and loadTime > 0 and loadTime < 60 then -- Reasonable bounds for page load time in seconds
        State.monthlyStats[month].loadTimes.total = State.monthlyStats[month].loadTimes.total + loadTime
        State.monthlyStats[month].loadTimes.count = State.monthlyStats[month].loadTimes.count + 1
    end

    -- Update country/browsers/wallets/pages
    State.countries[data.country] = (State.countries[data.country] or 0) + 1
    State.browsers[data.browser] = (State.browsers[data.browser] or 0) + 1

    -- Handle wallet detection
    local wallet = (data.ar and data.ar ~= "unknown") and data.ar or 
                   (data.eth and data.eth ~= "unknown" and data.eth or "others")
    State.wallets[wallet] = (State.wallets[wallet] or 0) + 1

    State.pages[data.pageVisited] = (State.pages[data.pageVisited] or 0) + 1

    -- Update recent activity (keeping only last 6 items)
    -- Validate the load time for display
    local displayLoadTime = loadTime and loadTime > 0 and loadTime < 60 
                           and (loadTime .. "s") 
                           or "N/A"
    
    table.insert(State.recentActivity, 1, {
        timestamp = data.timestamp,
        pageVisited = data.pageVisited,
        browserDevice = data.browserDevice,
        country = data.country,
        loadTime = displayLoadTime
    })
    
    while #State.recentActivity > 6 do
        table.remove(State.recentActivity)
    end

    -- Return response
    return ao.send({
        Target = msg.From,
        Data = "Tracking data processed successfully",
        Tags = {
            ["Status"] = "Success"
        }
    })
end)

-- GetAnalytics handler to format and return data
Handlers.add("getAnalytics", Handlers.utils.hasMatchingTag("Action", "GetAnalytics"), function(msg)
  -- Helper function to format metric data
  local function formatMetric(data, current, previous)
    -- Get the most recent non-zero value from chartData
    local currentValue = current or 0
    for i = #data, 1, -1 do
      if data[i].value and data[i].value > 0 then
        currentValue = data[i].value
        break
      end
    end
    
    -- Get the previous non-zero value
    local previousValue = previous or 0
    local foundCurrent = false
    for i = #data, 1, -1 do
      if data[i].value and data[i].value > 0 then
        if foundCurrent then
          previousValue = data[i].value
          break
        end
        foundCurrent = true
      end
    end

    local change = previousValue > 0 and math.floor(((currentValue - previousValue) / previousValue) * 100) or 0
    return {
      value = currentValue,  -- This will now correctly use the most recent non-zero value
      change = change,
      trend = change >= 0 and "up" or "down",
      chartData = data
    }
  end

  -- Get monthly data for charts
  local months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}
  local pageViewsData = {}
  local visitorsData = {}
  local loadTimeData = {}

  for _, month in ipairs(months) do
    local stats = State.monthlyStats[month] or { pageViews = 0, visitors = 0, loadTimes = { total = 0, count = 0 } }
    local avgLoadTime = stats.loadTimes.count > 0 and (stats.loadTimes.total / stats.loadTimes.count) or 0
    
    table.insert(pageViewsData, {
      date = month,
      value = stats.pageViews
    })
    
    table.insert(visitorsData, {
      date = month,
      value = stats.visitors or stats.pageViews -- Fallback to pageViews if visitors not set
    })
    
    table.insert(loadTimeData, {
      date = month,
      value = avgLoadTime
    })
  end

  -- Format response with corrected metric values
  local response = {
    success = true,
    data = {
      analyticsMetrics = {
        pageViews = formatMetric(pageViewsData),
        visitors = formatMetric(visitorsData),
        avgLoadTime = formatMetric(loadTimeData),
        globalTraffic = {
          regions = calculatePercentages(State.countries)
        },
        topCountries = calculatePercentages(State.countries)
      },
      browsers = calculatePercentages(State.browsers),
      wallets = calculatePercentages(State.wallets),
      topPages = calculatePercentages(State.pages),
      recentActivity = State.recentActivity
    }
  }

  return ao.send({
    Target = msg.From,
    Data = json.encode(response)
  })
end)


        `;
        
        await runLua(setupCommands, processId);
        return processId;
    } catch (error) {
        console.error("Failed to spawn analytics process:", error);
        throw error;
    }
}
```

