local _tl_compat; if (tonumber((_VERSION or ''):match('[%d.]*$')) or 0) < 5.3 then local p, m = pcall(require, 'compat53.module'); if p then _tl_compat = m end end; local ipairs = _tl_compat and _tl_compat.ipairs or ipairs; local os = _tl_compat and _tl_compat.os or os; local table = _tl_compat and _tl_compat.table or table

local json = require("json")
if not db then
    db = require"lsqlite3".open_memory()
    print("Database opened")
end
Name = "Arlink-Registry"

-- Create tables if they don't exist
db:exec[[
CREATE TABLE IF NOT EXISTS wallets (
    wallet_id TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS projects (
    project_id TEXT PRIMARY KEY,
    wallet_id TEXT,
    process_id TEXT UNIQUE,
    FOREIGN KEY (wallet_id) REFERENCES wallets(wallet_id)
);
]]

-- Handler functions
local function register_project(wallet, project, pid)
    -- Insert wallet if not exists
    db:exec(string.format([[
        INSERT OR IGNORE INTO wallets (wallet_id) VALUES ('%s');
    ]], wallet))
    
    -- Insert or update project
    local stmt = db:prepare([[
        INSERT OR REPLACE INTO projects (project_id, wallet_id, process_id)
        VALUES (?, ?, ?);
    ]])
    stmt:bind_values(project, wallet, pid)
    stmt:step()
    stmt:finalize()
    return true
end

local function get_wallet_projects(wallet)
    local results = {}
    local stmt = db:prepare([[
        SELECT project_id, process_id 
        FROM projects 
        WHERE wallet_id = ?;
    ]])
    stmt:bind_values(wallet)
    
    for row in stmt:nrows() do
        results[#results + 1] = {
            project = row.project_id,
            pid = row.process_id
        }
    end
    stmt:finalize()
    return results
end

local function get_project_pid(wallet, project)
    local stmt = db:prepare([[
        SELECT process_id 
        FROM projects 
        WHERE wallet_id = ? AND project_id = ?;
    ]])
    stmt:bind_values(wallet, project)
    local result = stmt:step()
    local pid = (result and stmt:get_value(0)) or nil
    stmt:finalize()
    return pid
end

-- Handlers
Handlers.add("RegisterProject", {Action = "RegisterProject"},
  function(msg)
    local wallet = msg.Tags.walletaddr
    local project = msg.Tags.Projectname
    local pid = msg.Tags.ProcessID

    -- Validation
    assert(wallet, "walletaddr is required!")
    assert(project, "Projectname is required!")
    assert(pid, "ProcessID is required!")

    -- Registration
    local success = register_project(wallet, project, pid)

    -- Response
    ao.send({
      Target = msg.From,
      Action = "Response",
      Tags = {
        Status = success and "Success" or "Failed",
        ["Message-Id"] = msg.Id
      },
      Data = success and "Project registered" or "Registration failed"
    })
  end
)

Handlers.add("GetWalletProjects", {Action = "GetWalletProjects"},
  function(msg)
    local wallet = msg.Tags.walletaddr

    -- Validation
    assert(wallet, "walletaddr is required!")

    -- Fetch projects
    local projects = get_wallet_projects(wallet)

    -- Response
    ao.send({
      Target = msg.From,
      Action = "Response",
      Tags = {
        Status = "Success",
        ["Message-Id"] = msg.Id
      },
      Data = json.encode(projects)
    })
  end
)

Handlers.add("GetProjectPID", {Action = "GetProjectPID"},
  function(msg)
    local wallet = msg.Tags.walletaddr
    local project = msg.Tags.Projectname

    -- Validation
    assert(wallet, "walletaddr is required!")
    assert(project, "Projectname is required!")

    -- Fetch PID
    local pid = get_project_pid(wallet, project)

    -- Response
    ao.send({
      Target = msg.From,
      Action = "Response",
      Tags = {
        Status = pid and "Success" or "Failed",
        ["Message-Id"] = msg.Id
      },
      Data = pid or "Project not found"
    })
  end
)