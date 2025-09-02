MenuData = {}
MenuData.Opened = {}
MenuData.RegisteredTypes = {}
MenuData.LastSelectedIndex = {}


MenuData.RegisteredTypes['default'] = {
    open  = function(namespace, name, data)
        SendNUIMessage({
            ak_menubase_action = 'openMenu',
            ak_menubase_namespace = namespace,
            ak_menubase_name = name,
            ak_menubase_data = data
        })
    end,
    close = function(namespace, name)
        SendNUIMessage({
            ak_menubase_action = 'closeMenu',
            ak_menubase_namespace = namespace,
            ak_menubase_name = name,
          -- ak_menubase_data = data
        })
    end
}


function MenuData.Open(menuType, namespace, name, data, submit, cancel, change, close)
    local menu         = {}

    menu.type          = menuType
    menu.namespace     = namespace
    menu.name          = name
    menu.data          = data
    menu.submit        = submit
    menu.cancel        = cancel
    menu.change        = change
    menu.data.selected = MenuData.LastSelectedIndex[menu.type .. "_" .. menu.namespace .. "_" .. menu.name] or 0

    menu.close         = function(showRadar, closeSound)
        MenuData.RegisteredTypes[menuType].close(namespace, name)

        for i = 1, #MenuData.Opened, 1 do
            if MenuData.Opened[i] then
                if MenuData.Opened[i].type == menuType and MenuData.Opened[i].namespace == namespace and MenuData.Opened[i].name == name then
                    MenuData.Opened[i] = nil
                end
            end
        end

        if showRadar then
            DisplayRadar(true)
        end

        if closeSound then
            PlaySoundFrontend("MENU_CLOSE", "HUD_PLAYER_MENU", true, 0)
        end

        if close then
            close()
        end
    end

    if data.hideRadar then
        DisplayRadar(false)
    end

    menu.update               = function(query, newData)
        for i = 1, #menu.data.elements, 1 do
            local match = true

            for k, v in pairs(query) do
                if menu.data.elements[i][k] ~= v then
                    match = false
                end
            end

            if match then
                for k, v in pairs(newData) do
                    menu.data.elements[i][k] = v
                end
            end
        end
    end

    menu.addNewElement        = function(element)
        menu.data.elements[#menu.data.elements + 1] = element
    end

    menu.removeElementByValue = function(value, stop)
        for i = 1, #menu.data.elements, 1 do
            if menu.data.elements[i] then
                if menu.data.elements[i].value == value then
                    table.remove(menu.data.elements, i)
                    if stop then
                        break
                    end
                end
            end
        end
    end

    menu.removeElementByIndex = function(index, stop)
        for i = 1, #menu.data.elements, 1 do
            if menu.data.elements[i] then
                if i == index then
                    table.remove(menu.data.elements, i)
                    if stop then
                        break
                    end
                end
            end
        end
    end

    menu.refresh              = function()
        MenuData.RegisteredTypes[menuType].open(namespace, name, menu.data)
    end

    menu.setElement           = function(i, key, val)
        menu.data.elements[i][key] = val
    end

    menu.setElements          = function(newElements)
        menu.data.elements = newElements
    end

    menu.setTitle             = function(val)
        menu.data.title = val
    end

    menu.setSubtext             = function(val)
        menu.data.subtext = val
    end

    menu.displayInput         = function(inputConfig, onSubmit, onCancel)
        Wait(500)
        if MenuData.InputCallbacks then
            return
        end

        MenuData.InputCallbacks = {
            onSubmit = onSubmit,
            onCancel = onCancel
        }

        SendNUIMessage({
            ak_menubase_action = 'displayInput',
            ak_menubase_namespace = namespace,
            ak_menubase_name = name,
            ak_menubase_inputConfig = inputConfig
        })
    end

    menu.isInputActive        = function()
        return MenuData.InputCallbacks ~= nil
    end

    menu.removeElement        = function(query)
        for i = 1, #menu.data.elements, 1 do
            for k, v in pairs(query) do
                if menu.data.elements[i] then
                    if menu.data.elements[i][k] == v then
                        menu.data.elements[i] = nil
                        break
                    end
                end
            end
        end
    end

    -- Check if action buttons are defined but cursor is not enabled
    if (data.confirmButton or data.cancelButton) and not data.enableCursor then
        print("^3[VORP Menu Warning]^7 action buttons (confirmButton/cancelButton) require enableCursor = true to be clickable!")

        -- remove buttons from data to prevent them from being created
        data.confirmButton = nil
        data.cancelButton = nil
    end

    local function checkProperties(min, max, value, elements)
        -- check if properties are all there
        if not min then
            return print("^3[VORP Menu Warning]^7 no min property found for slider  you must add one ")
        end

        if not max then
            return print("^3[VORP Menu Warning]^7 no max property found for slider  you must add one ")
        end

        if not value then
            return print("^3[VORP Menu Warning]^7 no value property found for slider  you must add one ")
        end

        -- check if custom key is there
        local customKey = nil
        for key, _ in pairs(elements) do
            if key ~= "label" and key ~= "value" and key ~= "min" and key ~= "max" and key ~= "hop" and key ~= "options" and key ~= "attributes" then
                customKey = key
                break
            end
        end

        if not customKey then
            return print("^3[VORP Menu Warning]^7 no custom key found for slider add one so you can detect it")
        end
    end

    if data.elements then
        for i = 1, #data.elements do
            if data.elements[i].type then
                if data.elements[i].type == "label-slider" then
                    -- set itemHeight for label-slider elements if not set
                    if not data.elements[i].itemHeight then
                        data.elements[i].itemHeight = "4vh"
                    end

                    checkProperties(data.elements[i].min, data.elements[i].max, data.elements[i].value, data.elements[i])
                elseif data.elements[i].type == "desc-slider" then
                    -- description slider requires cursor
                    if not data.enableCursor then
                        return print("^3[VORP Menu Warning]^7 desc-slider elements require enableCursor = true to be clickable!")
                    end

                    -- multiple sliders
                    if data.elements[i].sliders then
                        if type(data.elements[i].sliders) == "table" then
                            for j = 1, #data.elements[i].sliders do
                                local slider = data.elements[i].sliders[j]
                                checkProperties(slider.min, slider.max, slider.value, slider)
                            end
                        else
                            return print("^3[VORP Menu Warning]^7 sliders must be a table")
                        end
                    else
                        checkProperties(data.elements[i].min, data.elements[i].max, data.elements[i].value, data.elements[i])
                    end
                end
            end
            -- convert to strings to display the floats
            if data.elements[i].descPrice then
                data.elements[i].descPrice.amount = tostring(data.elements[i].descPrice.amount)
            end
        end
    end

    MenuData.Opened[#MenuData.Opened + 1] = menu
    MenuData.RegisteredTypes[menuType].open(namespace, name, data)

    if data.soundOpen then
        PlaySoundFrontend("MENU_ENTER", "HUD_PLAYER_MENU", true, 0)
    else
        PlaySoundFrontend("SELECT", "RDRO_Character_Creator_Sounds", true, 0)
    end
    TriggerEvent("vorp_menu:openmenu",name)
    return menu
end

function MenuData.Close(type, namespace, name)
    for i = 1, #MenuData.Opened, 1 do
        if MenuData.Opened[i] then
            if MenuData.Opened[i].type == type and MenuData.Opened[i].namespace == namespace and MenuData.Opened[i].name == name then
                MenuData.Opened[i].close()
                MenuData.Opened[i] = nil
            end
        end
    end
end

function MenuData.CloseAll(showRadar, closeSound)
    for i = 1, #MenuData.Opened, 1 do
        if MenuData.Opened[i] then
            MenuData.Opened[i].close()
            MenuData.Opened[i] = nil
        end
    end

    if showRadar then
        DisplayRadar(true)
    end

    if closeSound then
        PlaySoundFrontend("MENU_CLOSE", "HUD_PLAYER_MENU", true, 0)
    end
end

function MenuData.GetOpened(type, namespace, name)
    for i = 1, #MenuData.Opened, 1 do
        if MenuData.Opened[i] then
            if MenuData.Opened[i].type == type and MenuData.Opened[i].namespace == namespace and MenuData.Opened[i].name == name then
                return MenuData.Opened[i]
            end
        end
    end
end

function MenuData.GetOpenedMenus()
    return MenuData.Opened
end

function MenuData.IsOpen(type, namespace, name)
    return MenuData.GetOpened(type, namespace, name) ~= nil
end

function MenuData.ReOpen(oldMenu)
    MenuData.Open(oldMenu.type, oldMenu.namespace, oldMenu.name, oldMenu.data, oldMenu.submit, oldMenu.cancel, oldMenu.change, oldMenu.close)
end

function MenuData.IsInputActive()
    return MenuData.InputCallbacks ~= nil
end

local MenuType = 'default'

RegisterNUICallback('menu_submit', function(data)
    PlaySoundFrontend("SELECT", "RDRO_Character_Creator_Sounds", true, 0)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)

    if menu.submit ~= nil then
        menu.submit(data, menu)
    end
end)


RegisterNUICallback('playsound', function()
    PlaySoundFrontend("NAV_LEFT", "PAUSE_MENU_SOUNDSET", true, 0)
end)

RegisterNUICallback('menu_cancel', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if menu.cancel ~= nil then
        menu.cancel(data, menu)
    end
end)

RegisterNUICallback('menu_change', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)

    for i = 1, #data.elements, 1 do
        menu.setElement(i, 'value', data.elements[i].value)

        if data.elements[i].selected then
            menu.setElement(i, 'selected', true)
        else
            menu.setElement(i, 'selected', false)
        end
    end

    if menu.change ~= nil then
        menu.change(data, menu)
    end
end)

RegisterNUICallback('update_last_selected', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    local menuKey = menu.type .. "_" .. menu.namespace .. "_" .. menu.name
    if data.selected ~= nil then
        MenuData.LastSelectedIndex[menuKey] = data.selected
    end
end)

RegisterNUICallback('closeui', function(data)
    TriggerEvent("menuapi:closemenu")
    TriggerEvent("vorp_menu:closemenu",data) -- new event
end)

RegisterNUICallback('setCursor', function(data, cb)
    SetNuiFocus(data.enabled, data.enabled)
    cb('ok')
end)

RegisterNUICallback("inputResult", function(data, cb)
    local inputData = data.inputData
    local cancelled = data.cancelled
    local escPressed = data.escPressed

    if MenuData.InputCallbacks then
        -- ESC was pressed
        if escPressed then
            MenuData.InputCallbacks = nil
        else
            if cancelled and MenuData.InputCallbacks.onCancel then
                MenuData.InputCallbacks.onCancel()
            elseif not cancelled and MenuData.InputCallbacks.onSubmit then
                MenuData.InputCallbacks.onSubmit(inputData)
            end

            MenuData.InputCallbacks = nil
        end
    end

    cb("ok")
end)


local IsControlJustReleased = IsControlJustReleased
local IsDisabledControlJustReleased = IsDisabledControlJustReleased
local SendNUIMessage = SendNUIMessage
local IsPauseMenuActive = IsPauseMenuActive
local Wait = Wait

CreateThread(function()
    local PauseMenuState = false
    local MenusToReOpen  = {}

    while true do
        Wait(0)
        if #MenuData.Opened > 0 and not IsNuiFocused() then -- if cursor is enabled these dont need to work
            if (IsControlJustReleased(0, 0x43DBF61F) or IsDisabledControlJustReleased(0, 0x43DBF61F)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'ENTER' })
            end

            if (IsControlJustReleased(0, 0x308588E6) or IsDisabledControlJustReleased(0, 0x308588E6)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'BACKSPACE' })
            end

            if (IsControlJustReleased(0, 0x911CB09E) or IsDisabledControlJustReleased(0, 0x911CB09E)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'TOP' })
            end

            if (IsControlJustReleased(0, 0x4403F97F) or IsDisabledControlJustReleased(0, 0x4403F97F)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'DOWN' })
            end

            if (IsControlJustReleased(0, 0xAD7FCC5B) or IsDisabledControlJustReleased(0, 0xAD7FCC5B)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'LEFT' })
            end

            if (IsControlJustReleased(0, 0x65F9EC5B) or IsDisabledControlJustReleased(0, 0x65F9EC5B)) then
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'RIGHT' })
            end

            if IsPauseMenuActive() then
                if not PauseMenuState then
                    PauseMenuState = true
                    for k, v in pairs(MenuData.GetOpenedMenus()) do
                        table.insert(MenusToReOpen, v)
                    end
                    MenuData.CloseAll()
                end
            end
        else
            if PauseMenuState and not IsPauseMenuActive() then
                PauseMenuState = false
                Wait(1000)
                for k, v in pairs(MenusToReOpen) do
                    MenuData.ReOpen(v)
                end
                MenusToReOpen = {}
            end
        end
    end
end)

AddEventHandler('menuapi:getData', function(cb)
    cb(MenuData)
end)

AddEventHandler("vorp_menu:getData", function(cb)
    return cb(MenuData)
end)


AddEventHandler('onClientResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        MenuData.LastSelectedIndex = {}
    end
end)

exports("GetMenuData", function()
    return MenuData
end)
