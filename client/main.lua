MenuData = {}
MenuData.Opened = {}
MenuData.RegisteredTypes = {}
MenuData.LastSelectedIndex = {}

-- Tipe menu default
MenuData.RegisteredTypes[Config.defaultMenuType] = {
    open = function(namespace, name, data)
        if not data then return end -- Cek nil
        SendNUIMessage({
            ak_menubase_action = 'openMenu',
            ak_menubase_namespace = namespace,
            ak_menubase_name = name,
            ak_menubase_data = data,
            show = true
        })
        -- Aktifkan kursor saat menu terbuka
        SetNuiFocus(Config.enableCursor, Config.useMenuWithMouse)
        SetNuiFocusKeepInput(Config.keepInputEnabled)
        -- Trigger event saat menu terbuka
        TriggerEvent('vorp_menu:opened', namespace, name, data)
    end,
    close = function(namespace, name)
        SendNUIMessage({
            ak_menubase_action = 'closeMenu',
            ak_menubase_namespace = namespace,
            ak_menubase_name = name,
        })
        -- Nonaktifkan kursor saat menu tertutup
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
        -- Trigger event saat menu tertutup
        TriggerEvent('vorp_menu:closed', namespace, name)
    end
}

function MenuData.Open(type, namespace, name, data, submit, cancel, change, close)
    local menu = {}
    menu.type = type
    menu.namespace = namespace
    menu.name = name
    menu.data = data or {} -- Tambah tabel kosong default
    menu.submit = submit
    menu.cancel = cancel
    menu.change = change
    
    -- Cek nil untuk menu.data
    if menu.data then
        menu.data.selected = MenuData.LastSelectedIndex[menu.type .. "_" .. menu.namespace .. "_" .. menu.name] or 0
    end

    menu.close = function()
        if not MenuData.RegisteredTypes[type] then return end -- Cek nil
        MenuData.RegisteredTypes[type].close(namespace, name)
        for i = 1, #MenuData.Opened, 1 do
            if MenuData.Opened[i] then
                if MenuData.Opened[i].type == type and MenuData.Opened[i].namespace == namespace and MenuData.Opened[i].name == name then
                    MenuData.Opened[i] = nil
                end
            end
        end
        if close then
            close()
        end
        -- Trigger event saat menu ditutup via fungsi
        TriggerEvent('vorp_menu:closed', namespace, name)
    end

    menu.update = function(query, newData)
        if not menu.data or not menu.data.elements then return end -- Cek nil
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
        -- Trigger event saat menu diupdate
        TriggerEvent('vorp_menu:updated', namespace, name, query, newData)
    end

    menu.addNewElement = function(element)
        if not menu.data.elements then menu.data.elements = {} end -- Inisialisasi jika nil
        menu.data.elements[#menu.data.elements + 1] = element
        -- Trigger event saat elemen ditambahkan
        TriggerEvent('vorp_menu:elementAdded', namespace, name, element)
    end

    menu.removeElementByValue = function(value, stop)
        if not menu.data.elements then return end -- Cek nil
        for i = 1, #menu.data.elements, 1 do
            if menu.data.elements[i] then
                if menu.data.elements[i].value == value then
                    table.remove(menu.data.elements, i)
                    -- Trigger event saat elemen dihapus
                    TriggerEvent('vorp_menu:elementRemoved', namespace, name, value)
                    if stop then
                        break
                    end
                end
            end
        end
    end

    menu.removeElementByIndex = function(index, stop)
        if not menu.data.elements then return end -- Cek nil
        for i = 1, #menu.data.elements, 1 do
            if menu.data.elements[i] then
                if i == index then
                    table.remove(menu.data.elements, i)
                    -- Trigger event saat elemen dihapus
                    TriggerEvent('vorp_menu:elementRemoved', namespace, name, index)
                    if stop then
                        break
                    end
                end
            end
        end
    end

    menu.refresh = function()
        if not MenuData.RegisteredTypes[type] then return end -- Cek nil
        MenuData.RegisteredTypes[type].open(namespace, name, menu.data)
        -- Trigger event saat menu direfresh
        TriggerEvent('vorp_menu:refreshed', namespace, name)
    end

    menu.setElement = function(i, key, val)
        if not menu.data.elements then return end -- Cek nil
        menu.data.elements[i][key] = val
        -- Trigger event saat elemen dimodifikasi
        TriggerEvent('vorp_menu:elementModified', namespace, name, i, key, val)
    end

    menu.setElements = function(newElements)
        menu.data.elements = newElements
        -- Trigger event saat elemen diset
        TriggerEvent('vorp_menu:elementsSet', namespace, name, newElements)
    end

    menu.setTitle = function(val)
        menu.data.title = val
        -- Trigger event saat judul diubah
        TriggerEvent('vorp_menu:titleChanged', namespace, name, val)
    end

    menu.getElementByIndex = function(index)
        if not menu.data.elements then return nil end -- Cek nil
        return menu.data.elements[index]
    end

    menu.getElementByValue = function(value)
        if not menu.data.elements then return nil end -- Cek nil
        for i = 1, #menu.data.elements, 1 do
            if menu.data.elements[i].value == value then
                return menu.data.elements[i]
            end
        end
    end

    menu.removeElement = function(query)
        if not menu.data.elements then return end -- Cek nil
        for i = 1, #menu.data.elements, 1 do
            for k, v in pairs(query) do
                if menu.data.elements[i] then
                    if menu.data.elements[i][k] == v then
                        menu.data.elements[i] = nil
                        -- Trigger event saat elemen dihapus
                        TriggerEvent('vorp_menu:elementRemoved', namespace, name, query)
                        break
                    end
                end
            end
        end
    end

    MenuData.Opened[#MenuData.Opened + 1] = menu
    if MenuData.RegisteredTypes[type] then -- Cek nil
        MenuData.RegisteredTypes[type].open(namespace, name, data)
    end
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

function MenuData.CloseAll()
    for i = 1, #MenuData.Opened, 1 do
        if MenuData.Opened[i] then
            MenuData.Opened[i].close()
            MenuData.Opened[i] = nil
        end
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
    if not oldMenu then return end -- Cek nil
    MenuData.Open(oldMenu.type, oldMenu.namespace, oldMenu.name, oldMenu.data, oldMenu.submit, oldMenu.cancel,
        oldMenu.change, oldMenu.close)
end

local MenuType = 'default'

-- Fungsi helper posisi mouse
local function GetMousePosition()
    local cursorX, cursorY = GetNuiCursorPosition()
    local screenW, screenH = GetScreenResolution()
    if not screenW or not screenH then return { x = 0, y = 0 } end -- Cek nil untuk resolusi
    return { x = cursorX, y = cursorY }
end

RegisterNUICallback('menu_submit', function(data)
    PlaySoundFrontend("SELECT", "RDRO_Character_Creator_Sounds", true, 0)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if menu and menu.submit ~= nil then
        menu.submit(data, menu)
    end
end)

RegisterNUICallback('playsound', function()
    PlaySoundFrontend("NAV_LEFT", "PAUSE_MENU_SOUNDSET", true, 0)
end)

RegisterNUICallback('menu_cancel', function(data)
    PlaySoundFrontend("SELECT", "RDRO_Character_Creator_Sounds", true, 0)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if menu and menu.cancel ~= nil then
        menu.cancel(data, menu)
    end
end)

RegisterNUICallback('menu_change', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if not menu then return end
    for i = 1, #data.elements, 1 do
        menu.setElement(i, 'value', data.elements[i].value)
        menu.setElement(i, 'selected', data.elements[i].selected or false)
    end
    if menu.change ~= nil then
        menu.change(data, menu)
        -- Trigger event saat menu berubah
        TriggerEvent('vorp_menu:changed', data._namespace, data._name, data)
    end
end)

RegisterNUICallback('mouse_click', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if menu then
        if Config.sounds.enable then
            PlaySoundFrontend("SELECT", "RDRO_Character_Creator_Sounds", true, 0)
        end
        if data.selected ~= nil then
            MenuData.LastSelectedIndex[menu.type .. "_" .. menu.namespace .. "_" .. menu.name] = data.selected
            if menu.submit then
                menu.submit(data, menu)
                -- Trigger event saat item menu diklik
                TriggerEvent('vorp_menu:clicked', data._namespace, data._name, data.selected)
            end
            if menu.change then
                menu.change(data, menu)
            end
        end
    end
end)

RegisterNUICallback('update_last_selected', function(data)
    local menu = MenuData.GetOpened(MenuType, data._namespace, data._name)
    if not menu then return end
    local menuKey = menu.type .. "_" .. menu.namespace .. "_" .. menu.name
    if data.selected ~= nil then
        MenuData.LastSelectedIndex[menuKey] = data.selected
        -- Trigger event saat last selected diupdate
        TriggerEvent('vorp_menu:lastSelectedUpdated', data._namespace, data._name, data.selected)
    end
end)

RegisterNUICallback('closeui', function(data)
    TriggerEvent("menuapi:closemenu")
end)

CreateThread(function()
    local PauseMenuState = false
    local MenusToReOpen = {}
    while true do
        Wait(0)
        if #MenuData.Opened > 0 then

           
            -- Aktifkan kontrol mouse
            EnableControlAction(0, 0xC7B5340A, true) -- Tombol kiri mouse
            EnableControlAction(0, 0xF84FA74F, true) -- Kursor mouse
            
            -- Nonaktifkan kontrol kamera
            DisableControlAction(0, 0x8FFC75D6, true) -- Nonaktifkan lihat kiri-kanan
            DisableControlAction(0, 0xD2047988, true) -- Nonaktifkan lihat atas-bawah
            DisableControlAction(0, 0x3D99EEC6, true) -- Nonaktifkan lihat mouse
            DisableControlAction(0, 0xA987235F, true) -- Nonaktifkan lihat mouse
            
            -- Nonaktifkan OpenWheelMenu
            DisableControlAction(0, 0xAC4BD4F1, true) -- Nonaktifkan OpenWheelMenu

            -- Hanya nonaktifkan kontrol keyboard
            DisableControlAction(0, Config.controls.select, true) -- Nonaktifkan Enter
            DisableControlAction(0, Config.controls.back, true) -- Nonaktifkan Backspace
            DisableControlAction(0, Config.controls.up, true) -- Nonaktifkan Panah Atas
            DisableControlAction(0, Config.controls.down, true) -- Nonaktifkan Panah Bawah
            DisableControlAction(0, Config.controls.left, true) -- Nonaktifkan Panah Kiri
            DisableControlAction(0, Config.controls.right, true) -- Nonaktifkan Panah Kanan

            
            -- Kontrol keyboard
            if IsDisabledControlJustPressed(0, Config.controls.select) then -- Enter
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'ENTER' })
            end

            if IsDisabledControlJustPressed(0, Config.controls.back) then -- Backspace
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'BACKSPACE' })
            end

            if IsDisabledControlJustPressed(0, Config.controls.up) then -- Panah Atas
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'TOP' })
            end

            if IsDisabledControlJustPressed(0, Config.controls.down) then -- Panah Bawah
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'DOWN' })
            end

            if IsDisabledControlJustPressed(0, Config.controls.left) then -- Panah Kiri
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'LEFT' })
            end

            if IsDisabledControlJustPressed(0, Config.controls.right) then -- Panah Kanan
                SendNUIMessage({ ak_menubase_action = 'controlPressed', ak_menubase_control = 'RIGHT' })
            end

            -- Lacak status hover
            local mousePos = GetMousePosition()
            local isHovered = false
            SendNUIMessage({
                ak_menubase_action = 'mouseMove',
                mousePosition = mousePos,
                trackHover = true
            })

            -- Penanganan klik mouse - hanya trigger jika hover
            if IsControlJustPressed(0, 0xC7B5340A) then -- Tombol kiri mouse
                if isHovered then
                    SendNUIMessage({
                        ak_menubase_action = 'controlPressed',
                        ak_menubase_control = 'ENTER',
                        mousePosition = mousePos
                    })
                end
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
            Wait(500)
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
    MenuData.LastSelectedIndex = {}
end)

exports("GetMenuData", function()
    return MenuData
end)
