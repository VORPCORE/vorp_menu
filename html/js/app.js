(function () {

    const MenuTpl = `
        <div id="menu_{{_namespace}}_{{_name}}" class="menu{{#align}} align-{{align}}{{/align}}">
            <div class="head">
                <span>{{{title}}}</span>
            </div>
            <div class="desciptions">{{{subtext}}}</div>
            <div class="topline"></div>
            <div class="menu-items">
                {{#isGrid}}
                    <div class="grid-container">
                        {{#elements}}
                            <div class="grid-item {{#selected}}selected{{/selected}}">
                                {{#image}}
                                    <img src="nui://vorp_inventory/html/img/items/{{{image}}}.png"></img>
                                {{/image}}
                                {{^image}}
                                    <div id="item-label" class="label-{{labelPos}}" {{#image}}class="image-pad"{{/image}}>{{{label}}}</div>
                                {{/image}}
                            </div>
                        {{/elements}}
                    </div>
                {{/isGrid}}
                {{^isGrid}}
                    {{#elements}}
                        {{#isNotSelectable}}
                            <div class="menu-item {{#isSlider}}slider{{/isSlider}} {{#isDisabled}}disabled{{/isDisabled}}" {{#itemHeight}} style="height:{{{itemHeight}}}!important"{{/itemHeight}}>
                        {{/isNotSelectable}}
                        {{^isNotSelectable}}
                            <div class="menu-item {{#selected}}selected{{/selected}} {{#isSlider}}slider{{/isSlider}} {{#isLabelSlider}}label-slider{{/isLabelSlider}} {{#isDisabled}}disabled{{/isDisabled}}" {{#itemHeight}} style="height:{{{itemHeight}}}!important"{{/itemHeight}}>
                        {{/isNotSelectable}}
                            {{#image}}
                                <img class="item-image" src="nui://vorp_inventory/html/img/items/{{{image}}}.png"></img>
                            {{/image}}
                            
                            {{#isLabelSlider}}
                                <div class="label-slider-container">
                                    <div class="label-slider-header">
                                        <div class="label-slider-label">{{{label}}}</div>
                                        <div class="label-slider-value">{{{sliderLabel}}}</div>
                                    </div>
                                    <div class="label-slider-track-container">
                                        <div class="label-slider-min">{{{min}}}</div>
                                        <div class="label-slider-track" {{#customColors.trackColor}}style="background-color: {{{customColors.trackColor}}}"{{/customColors.trackColor}}>
                                            <div class="label-slider-fill" style="width: {{{sliderPercentage}}}%{{#customColors.fillColor}}; background: {{{customColors.fillColor}}}{{/customColors.fillColor}}"></div>
                                            <div class="label-slider-thumb" style="left: {{{sliderPercentage}}}%{{#customColors.thumbColor}}; background-color: {{{customColors.thumbColor}}}{{/customColors.thumbColor}}"></div>
                                        </div>
                                        <div class="label-slider-max">{{{max}}}</div>
                                    </div>
                                </div>
                            {{/isLabelSlider}}
                            
                            {{^isLabelSlider}}
                                {{#tickBox}}
                                    <div class="tickbox-container">
                                        <div id="item-label" class="label-{{labelPos}}" {{#image}}class="image-pad"{{/image}}>{{{label}}}</div>
                                        <div class="tickbox-icon">
                                            <img src="css/selection_box_square_1.png" alt="box" class="tickbox-box">
                                            {{#isTickBoxChecked}}
                                                <img src="css/tick.png" alt="checked" class="tickbox-tick">
                                            {{/isTickBoxChecked}}
                                        </div>
                                    </div>
                                {{/tickBox}}
                                {{^tickBox}}
                                    <div id="item-label" class="label-{{labelPos}}" {{#image}}class="image-pad"{{/image}}>{{{label}}}</div>
                                {{/tickBox}}
                            {{/isLabelSlider}}
                            
                            {{^isLabelSlider}}
                                {{^isDescSlider}}
                                    {{#isTextSlider}}
                                        <div class="arrows-text-slider">
                                            {{#enableCursor}}
                                                <button class="text-slider-left" type="button"><i class="fas fa-arrow-alt-circle-left"></i></button>
                                            {{/enableCursor}}
                                            {{^enableCursor}}
                                                <i class="fas fa-arrow-alt-circle-left"></i>
                                            {{/enableCursor}}
                                            <div class="text-slider-label">{{{currentTextLabel}}}</div>
                                            {{#enableCursor}}
                                                <button class="text-slider-right" type="button"><i class="fas fa-arrow-alt-circle-right"></i></button>
                                            {{/enableCursor}}
                                            {{^enableCursor}}
                                                <i class="fas fa-arrow-alt-circle-right"></i>
                                            {{/enableCursor}}
                                        </div>
                                    {{/isTextSlider}}
                                    {{^isTextSlider}}
                                        <div class="arrows">
                                            {{#isSlider}}
                                                {{#enableCursor}}
                                                    <button class="slider-left" type="button"><i class="fas fa-arrow-alt-circle-left"></i></button>
                                                {{/enableCursor}}
                                                {{^enableCursor}}
                                                    <i class="fas fa-arrow-alt-circle-left"></i>
                                                {{/enableCursor}}
                                            {{/isSlider}}
                                            
                                            <div id="slider-label">{{{sliderLabel}}}</div>
                                            
                                            {{#isSlider}}
                                                {{#enableCursor}}
                                                    <button class="slider-right" type="button"><i class="fas fa-arrow-alt-circle-right"></i></button>
                                                {{/enableCursor}}
                                                {{^enableCursor}}
                                                    <i class="fas fa-arrow-alt-circle-right"></i>
                                                {{/enableCursor}}
                                            {{/isSlider}}
                                        </div>
                                    {{/isTextSlider}}
                                {{/isDescSlider}}
                            {{/isLabelSlider}}
                        </div>
                    {{/elements}}
                {{/isGrid}}
            </div>
            <div class="scrollbottom"></div>
            {{#elements}}
                {{#selected}}
                    <div class="options-amount">{{{list_id}}}/{{{list_max}}}</div>
                    <br>
                    {{#confirmButton}}
                        {{#enableCursor}}
                            <div class="menu-action-buttons">
                                <button class="menu-confirm-btn" data-value="{{{confirmButton.value}}}">{{{confirmButton.label}}}</button>
                                {{#cancelButton}}
                                    <button class="menu-cancel-btn" data-value="{{{cancelButton.value}}}">{{{cancelButton.label}}}</button>
                                {{/cancelButton}}
                            </div>
                        {{/enableCursor}}
                    {{/confirmButton}}
                    {{^confirmButton}}
                        {{#cancelButton}}
                            {{#enableCursor}}
                                <div class="menu-action-buttons">
                                    <button class="menu-cancel-btn" data-value="{{{cancelButton.value}}}">{{{cancelButton.label}}}</button>
                                </div>
                            {{/enableCursor}}
                        {{/cancelButton}}
                    {{/confirmButton}}
                    <div class="desciption">{{{desc}}}</div>
                    {{#isDescSlider}}
                        {{#enableCursor}}
                            {{#hasMultipleSliders}}
                                {{#processedSliders}}
                                    <div class="description-slider-container" data-slider-index="{{{index}}}" data-element-index="{{{elementIndex}}}" data-custom-key="{{{customKey}}}">
                                        <div class="description-slider-header">
                                            <div class="description-slider-label">{{{label}}}</div>
                                            <div class="description-slider-value">{{{sliderLabel}}}</div>
                                        </div>
                                        <div class="description-slider-track-container">
                                            <div class="description-slider-min">{{{min}}}</div>
                                            <div class="description-slider-track" 
                                                 {{#customColors.trackColor}}style="background-color: {{{customColors.trackColor}}}"{{/customColors.trackColor}}>
                                                <div class="description-slider-fill" style="width: {{{sliderPercentage}}}%{{#customColors.fillColor}}; background: {{{customColors.fillColor}}}{{/customColors.fillColor}}"></div>
                                                <div class="description-slider-thumb" style="left: {{{sliderPercentage}}}%{{#customColors.thumbColor}}; background-color: {{{customColors.thumbColor}}}{{/customColors.thumbColor}}"></div>
                                            </div>
                                            <div class="description-slider-max">{{{max}}}</div>
                                        </div>
                                    </div>
                                {{/processedSliders}}
                            {{/hasMultipleSliders}}
                            {{^hasMultipleSliders}}
                                <div class="description-slider-container">
                                    <div class="description-slider-header">
                                        <div class="description-slider-label">{{{label}}}</div>
                                        <div class="description-slider-value">{{{sliderLabel}}}</div>
                                    </div>
                                    <div class="description-slider-track-container">
                                        <div class="description-slider-min">{{{min}}}</div>
                                        <div class="description-slider-track">
                                            <div class="description-slider-fill" style="width: {{{sliderPercentage}}}%"></div>
                                            <div class="description-slider-thumb" style="left: {{{sliderPercentage}}}%"></div>
                                        </div>
                                        <div class="description-slider-max">{{{max}}}</div>
                                    </div>
                                </div>
                            {{/hasMultipleSliders}}
                        {{/enableCursor}}
                    {{/isDescSlider}}
                    {{#isMultipleTickBoxes}}
                        {{#enableCursor}}
                            <div class="multiple-tickbox-container">
                                {{#processedTickBoxes}}
                                    <div class="tickbox-item tickbox-container" data-tickbox-index="{{{index}}}" data-element-index="{{{elementIndex}}}">
                                        <div class="tickbox-item-label">{{{label}}}</div>
                                        <div class="tickbox-icon">
                                            <img src="css/selection_box_square_1.png" alt="box" class="tickbox-box">
                                            {{#isChecked}}
                                                <img src="css/tick.png" alt="checked" class="tickbox-tick">
                                            {{/isChecked}}
                                        </div>
                                    </div>
                                {{/processedTickBoxes}}
                            </div>
                        {{/enableCursor}}
                    {{/isMultipleTickBoxes}}
                    {{^descPrice}}
                        {{#footerText}}
                            <div class="footer-text">{{{footerText}}}</div>
                        {{/footerText}}
                    {{/descPrice}}
                {{/selected}}
            {{/elements}}
            {{#showGlobalDivider}}
                <div class="menu-divider">
                    <img src="css/divider_line.png" alt="divider">
                </div>
            {{/showGlobalDivider}}
            {{#hasDescPrice}}
                <div class="desc-price-container">
                    <div class="desc-price-divider">
                        <img src="css/divider_line.png" alt="divider">
                    </div>
                    <div class="desc-price-content">
                        <span class="desc-price-text">{{{descPriceData.text}}}</span>
                        <div class="desc-price-amount-container">
                            {{#descPriceData.isMoneyIcon}}
                                <span class="desc-price-money-icon">$</span>
                            {{/descPriceData.isMoneyIcon}}
                            {{^descPriceData.isMoneyIcon}}
                                <img src="css/{{{descPriceData.icon}}}.png" alt="{{{descPriceData.icon}}}" class="desc-price-icon">
                            {{/descPriceData.isMoneyIcon}}
                            <span class="desc-price-amount">{{{descPriceData.amount}}}</span>
                        </div>
                    </div>
                    <div class="desc-price-divider">
                        <img src="css/divider_line.png" alt="divider">
                    </div>
                </div>
            {{/hasDescPrice}}
            <br>
        </div>`;

    const InputTpl = `
        <div id="input_dialog" class="input-dialog">
            <div class="input-container">
                <div class="input-content">
                    <div class="input-header">{{{header}}}</div>
                    {{#description}}
                    <div class="input-description">{{{description}}}</div>
                    {{/description}}
                    {{^isConfirmation}}
                    {{#isTextarea}}
                    <textarea class="input-field" placeholder="{{{placeholder}}}" {{#maxLength}}maxlength="{{{maxLength}}}"{{/maxLength}}></textarea>
                    {{/isTextarea}}
                    {{^isTextarea}}
                    <input type="{{{inputType}}}" class="input-field" placeholder="{{{placeholder}}}" {{#maxLength}}maxlength="{{{maxLength}}}"{{/maxLength}} />
                    {{/isTextarea}}
                    {{/isConfirmation}}
                    <div class="input-buttons">
                        <button class="input-submit">{{{confirmLabel}}}</button>
                        <button class="input-cancel">{{{cancelLabel}}}</button>
                    </div>
                </div>
            </div>
        </div>`;

    window.isInputOpen = false;
    window.MenuData = {};
    const MenuData = window.MenuData; // just for linter
    MenuData.ResourceName = GetParentResourceName();
    MenuData.opened = {};
    MenuData.focus = [];
    MenuData.pos = {};
    let lastmenu;
    let SavedScrollTop = 0;

    function scrollToElement(element) {
        if (element) {
            const menuContainer = document.querySelector(".menu .menu-items");
            const elementRect = element.getBoundingClientRect();
            const containerRect = menuContainer.getBoundingClientRect();

            if (elementRect.bottom > containerRect.bottom) {
                menuContainer.scrollTop += elementRect.bottom - containerRect.bottom;
            } else if (elementRect.top < containerRect.top) {
                menuContainer.scrollTop -= containerRect.top - elementRect.top;
            }
        }
    }

    function addMouseEvents(namespace, name, menuElement) {

        const menuData = MenuData.opened[namespace][name];

        let isDragging = false;
        let dragElement = null;
        let isDescDragging = false;
        let isMultiSliderDragging = false;

        $(menuElement).find('.menu-item, .grid-item, .slider-left, .slider-right, .menu-confirm-btn, .menu-cancel-btn, .label-slider-track, .label-slider-thumb, .description-slider-track, .description-slider-thumb, .description-slider-container, .tickbox-item').off();

        $(menuElement).find('.menu-item').each(function (index) {
            $(this).on('click', function () {
                if (isDragging || isDescDragging || isMultiSliderDragging) {
                    return;
                }

                const currentSelected = MenuData.pos[namespace][name];

                if (index === currentSelected) {
                    let elem = menuData.elements[index];

                    if (elem.isDisabled) return;

                    if (elem.tickBox) {
                        document.body.style.pointerEvents = 'none';
                        onData({
                            ak_menubase_action: 'controlPressed',
                            ak_menubase_control: 'ENTER'
                        });

                        setTimeout(() => {
                            document.body.style.pointerEvents = '';
                        }, 100);
                        return;
                    }
                    elem.index = index + 1;
                    MenuData.submit(namespace, name, elem);
                } else {

                    lastSelectedIndex = index;
                    MenuData.pos[namespace][name] = index;

                    for (let i = 0; i < menuData.elements.length; i++) {
                        menuData.elements[i].selected = (i === index);
                    }

                    $(menuElement).find('.menu-item').removeClass('selected');
                    $(this).addClass('selected');

                    updateSelectedContent(namespace, name, menuData.elements[index]);

                    MenuData.change(namespace, name, menuData.elements[index]);

                    const menuContainer = $(menuElement).find('.menu-items')[0];
                    SavedScrollTop = menuContainer.scrollTop;

                    MenuData.render();

                    const newMenuContainer = document.querySelector(".menu .menu-items");
                    if (newMenuContainer) {
                        newMenuContainer.scrollTop = SavedScrollTop;
                    }

                    $.post("https://" + MenuData.ResourceName + "/playsound");
                }
            });

            $(this).on('contextmenu', function (e) {

                e.preventDefault();
                onData({
                    ak_menubase_action: 'controlPressed',
                    ak_menubase_control: 'BACKSPACE'
                });
            });
        });


        $(menuElement).find('.grid-item').each(function (index) {
            $(this).on('click', function () {
                if (isDragging || isDescDragging || isMultiSliderDragging) {
                    return;
                }

                const currentSelected = MenuData.pos[namespace][name];

                if (index === currentSelected) {
                    let elem = menuData.elements[index];
                    elem.index = index + 1;
                    MenuData.submit(namespace, name, elem);
                } else {
                    lastSelectedIndex = index;
                    MenuData.pos[namespace][name] = index;

                    for (let i = 0; i < menuData.elements.length; i++) {
                        menuData.elements[i].selected = (i === index);
                    }

                    $(menuElement).find('.grid-item').removeClass('selected');
                    $(this).addClass('selected');

                    updateSelectedContent(namespace, name, menuData.elements[index]);

                    MenuData.change(namespace, name, menuData.elements[index]);

                    const menuContainer = $(menuElement).find('.menu-items')[0];
                    const savedScrollTop = menuContainer.scrollTop;

                    MenuData.render();

                    const newMenuContainer = document.querySelector(".menu .menu-items");
                    if (newMenuContainer) {
                        newMenuContainer.scrollTop = savedScrollTop;
                    }

                }
            });

            $(this).on('contextmenu', function (e) {
                e.preventDefault();
                onData({
                    ak_menubase_action: 'controlPressed',
                    ak_menubase_control: 'BACKSPACE'
                });
            });
        });

        $(menuElement).find('.grid-item').on('mouseenter', function () {
            $.post("https://" + MenuData.ResourceName + "/playsound");
        });

        $(menuElement).find('.slider-left, .text-slider-left').on('click', function (e) {

            e.stopPropagation();

            const itemIndex = $(this).closest('.menu-item').index();
            let elem = menuData.elements[itemIndex];
            elem.index = itemIndex + 1;

            if (itemIndex !== MenuData.pos[namespace][name]) {
                return;
            }

            if (elem.type === 'slider') {
                const min = typeof elem.min == "undefined" ? 0 : elem.min;

                if (elem.value > min) {

                    if (typeof elem.hop != "undefined") {

                        if (Number.isInteger(elem.hop)) {
                            elem.value = elem.value - elem.hop;
                        } else {
                            elem.value = (Number(elem.value) - Number(elem.hop)).toFixed(1);
                        }

                        elem.value = Number(elem.value);

                        if (elem.value < min)
                            elem.value = min;

                    } else {
                        elem.value--;
                    }
                    MenuData.change(namespace, name, elem); // why fire 2 functions it doesnt even make sense with the same params lol ?
                    MenuData.submit(namespace, name, elem);
                }

                MenuData.render();
            } else if (elem.type === 'text-slider') {

                if (elem.textList && elem.textList.length > 0) {

                    const maxLength = elem.textList.length;
                    const currentIndex = elem.textIndex ? (elem.textIndex - 1) : 0;

                    if (currentIndex < 0) {
                        currentIndex = maxLength;
                    }

                    const newIndex = currentIndex - 1;

                    if (elem.textList[newIndex]) {

                        elem.value = elem.textList[newIndex].value;
                        elem.currentTextLabel = elem.textList[newIndex].label;
                        elem.textIndex = newIndex + 1;
                        elem.index = elem.pos + 1;
                        MenuData.submit(namespace, name, elem);

                        const menuContainer = $(menuElement).find('.menu-items')[0];
                        const savedScrollTop = menuContainer.scrollTop;
                        MenuData.render();

                        const newMenuContainer = document.querySelector(".menu .menu-items");
                        if (newMenuContainer) {
                            newMenuContainer.scrollTop = savedScrollTop;
                        }

                        $.post("https://" + MenuData.ResourceName + "/playsound");

                    }
                }
            }
        });

        $(menuElement).find('.slider-right, .text-slider-right').on('click', function (e) {

            e.stopPropagation();

            const itemIndex = $(this).closest('.menu-item').index();
            let elem = menuData.elements[itemIndex];
            elem.index = itemIndex + 1;

            if (itemIndex !== MenuData.pos[namespace][name]) {
                return;
            }

            if (elem.type === 'slider') {
                if (typeof elem.options != "undefined" && elem.value < elem.options.length - 1) {
                    elem.value++;
                    MenuData.change(namespace, name, elem);// why fire 2 functions it doesnt even make sense with the same params lol ?
                    MenuData.submit(namespace, name, elem);
                }

                if (typeof elem.max != "undefined" && elem.value < elem.max) {
                    if (typeof elem.hop != "undefined") {
                        const min = typeof elem.min == "undefined" ? 0 : elem.min;

                        if (min > 0 && min == elem.value)
                            elem.value = 0;

                        if (Number.isInteger(elem.hop)) {
                            elem.value = elem.value + elem.hop;
                        } else {
                            elem.value = (Number(elem.value) + Number(elem.hop)).toFixed(1);
                        }

                        elem.value = Number(elem.value);

                        if (elem.value > elem.max)
                            elem.value = elem.max;

                    } else {
                        elem.value++;
                    }

                    MenuData.change(namespace, name, elem); // why fire 2 functions it doesnt even make sense with the same params lol ?
                    MenuData.submit(namespace, name, elem);
                }

                MenuData.render();
            } else if (elem.type === 'text-slider') {
                if (elem.textList && elem.textList.length > 0) {
                    const maxLength = elem.textList.length;
                    const currentIndex = elem.textIndex ? (elem.textIndex - 1) : 0;

                    if (currentIndex > maxLength) {
                        newIndex = maxLength;
                    }

                    const newIndex = currentIndex + 1;

                    if (elem.textList[newIndex]) {
                        elem.value = elem.textList[newIndex].value;
                        elem.currentTextLabel = elem.textList[newIndex].label;
                        elem.textIndex = newIndex + 1;

                        MenuData.submit(namespace, name, elem);
                        const menuContainer = $(menuElement).find('.menu-items')[0];
                        const savedScrollTop = menuContainer.scrollTop;
                        MenuData.render();

                        const newMenuContainer = document.querySelector(".menu .menu-items");
                        if (newMenuContainer) {
                            newMenuContainer.scrollTop = savedScrollTop;
                        }
                        $.post("https://" + MenuData.ResourceName + "/playsound");
                    }
                }

            }
        });


        $(menuElement).find('.menu-confirm-btn, .menu-cancel-btn').on('click', function () {
            const buttonValue = $(this).data('value');
            const currentIndex = MenuData.pos[namespace][name];
            const selectedElement = menuData.elements[currentIndex];

            const buttonData = {
                buttonType: $(this).hasClass('menu-confirm-btn') ? 'confirm' : 'cancel',
                buttonValue: buttonValue,
                selectedElement: selectedElement,
                selectedIndex: currentIndex + 1,
                value: buttonValue
            };

            MenuData.submit(namespace, name, buttonData);
        });

        $(menuElement).find('.menu-confirm-btn, .menu-cancel-btn').on('mouseenter', function () {
            $.post("https://" + MenuData.ResourceName + "/playsound");
        });

        $(menuElement).find('.menu-confirm-btn, .menu-cancel-btn').on('mouseleave', function () {
            $.post("https://" + MenuData.ResourceName + "/playsound");
        });

        $(menuElement).find('.tickbox-item').on('click', function (e) {
            e.stopPropagation();

            const tickboxIndex = parseInt($(this).data('tickbox-index'));
            const elementIndex = parseInt($(this).data('element-index'));


            if (elementIndex !== MenuData.pos[namespace][name]) {
                return;
            }

            const elem = menuData.elements[elementIndex];

            if (elem && elem.type === 'tick-box' && elem.tickBoxes && elem.tickBoxes[tickboxIndex]) {

                const tickBox = elem.tickBoxes[tickboxIndex];
                tickBox.value = tickBox.value === "ticked" ? "unticked" : "ticked";

                const menuContainer = $(menuElement).find('.menu-items')[0];
                const savedScrollTop = menuContainer.scrollTop;

                const submitData = {
                    ...elem,
                    tickBoxIndex: tickboxIndex + 1,
                    index: elementIndex + 1
                };

                MenuData.submit(namespace, name, submitData);
                MenuData.render();

                const newMenuContainer = document.querySelector(".menu .menu-items");
                if (newMenuContainer) {
                    newMenuContainer.scrollTop = savedScrollTop;
                }

                $.post("https://" + MenuData.ResourceName + "/playsound");
            }
        });


        function getBoundingRect(e, track, elem) {
            const rect = track.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const trackWidth = rect.width;
            const percentage = Math.max(0, Math.min(1, clickX / trackWidth));

            const min = typeof elem.min === "undefined" ? 0 : elem.min;
            const max = typeof elem.max === "undefined" ? 10 : elem.max;
            let newValue = min + percentage * (max - min);

            if (typeof elem.hop !== "undefined") {
                newValue = Math.round(newValue / elem.hop) * elem.hop;
                newValue = Number.isInteger(elem.hop) ? newValue : Number(newValue.toFixed(1));
            } else {
                newValue = Math.round(newValue);
            }

            newValue = Math.max(min, Math.min(max, newValue));

            return newValue;
        }


        $(menuElement).find('.label-slider-track').on('click', function (e) {
            e.stopPropagation();

            const itemIndex = $(this).closest('.menu-item').index();
            const elem = menuData.elements[itemIndex];

            if (itemIndex !== MenuData.pos[namespace][name]) {
                return;
            }

            if (elem && elem.type === 'label-slider') {
                const track = $(this)[0];

                newValue = getBoundingRect(e, track, elem);

                if (newValue !== elem.value) {
                    elem.value = newValue;
                    elem.index = itemIndex + 1;

                    MenuData.submit(namespace, name, elem);
                    MenuData.render();
                }
            }
        });


        $(menuElement).find('.label-slider-thumb').on('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();

            const itemIndex = $(this).closest('.menu-item').index();

            if (itemIndex !== MenuData.pos[namespace][name]) {
                return;
            }

            if (isDragging) {
                $(document).off('mousemove.slider');
                $(document).off('mouseup.slider');
            }

            isDragging = true;
            dragElement = itemIndex;

            const dragThumb = $(this);
            const dragFill = dragThumb.siblings('.label-slider-fill');
            const dragValue = $(this).closest('.menu-item').find('.label-slider-value');

            $(document).on('mousemove.slider', function (e) {
                if (isDragging && dragElement !== null) {
                    const elem = menuData.elements[dragElement];

                    if (elem && elem.type === 'label-slider') {
                        const track = $(menuElement).find('.menu-item').eq(dragElement).find('.label-slider-track')[0];
                        newValue = getBoundingRect(e, track, elem);

                        if (newValue !== elem.value) {
                            elem.value = newValue;

                            const min = elem.min !== undefined ? elem.min : 0;
                            const max = elem.max !== undefined ? elem.max : 10;
                            const range = max - min;
                            const visualPercentage = range === 0 ? 0 : Math.round(((elem.value - min) / range) * 100);
                            dragThumb.css('left', visualPercentage + '%');
                            dragFill.css('width', visualPercentage + '%');

                            let displayValue = formatSliderValue(elem.value, elem.hop, elem.options);

                            dragValue.text(displayValue);
                            elem.index = dragElement + 1;
                            MenuData.submit(namespace, name, elem);
                        }
                    }
                }
            });

            $(document).on('mouseup.slider', function () {
                isDragging = false;
                dragElement = null;
                $(document).off('mousemove.slider');
                $(document).off('mouseup.slider');
                MenuData.render();
            });
        });


        $(menuElement).find('.description-slider-track').on('click', function (e) {
            e.stopPropagation();

            const isMultipleSlider = $(this).closest('[data-slider-index]').length > 0;

            if (!isMultipleSlider) {

                const selectedIndex = MenuData.pos[namespace][name];
                let elem = menuData.elements[selectedIndex];


                if (elem && elem.type === 'desc-slider') {
                    const track = $(this)[0];


                    newValue = getBoundingRect(e, track, elem);
                    elem.value = newValue;
                    elem.index = selectedIndex + 1;
                    MenuData.submit(namespace, name, elem);
                    MenuData.render();
                }
            }
        });


        $(menuElement).find('.description-slider-thumb').on('mousedown', function (e) {
            e.stopPropagation();
            e.preventDefault();

            if (isDescDragging) {
                $(document).off('mousemove.descslider');
                $(document).off('mouseup.descslider');
            }

            isDescDragging = true;
            const selectedIndex = MenuData.pos[namespace][name];
            const dragThumb = $(this);
            const dragFill = dragThumb.siblings('.description-slider-fill');
            const dragValue = $(this).closest('.description-slider-container').find('.description-slider-value');

            $(document).on('mousemove.descslider', function (e) {
                if (isDescDragging) {
                    const elem = menuData.elements[selectedIndex];

                    if (elem && elem.type === 'desc-slider') {
                        const track = dragThumb.closest('.description-slider-container').find('.description-slider-track')[0];

                        newValue = getBoundingRect(e, track, elem);

                        if (newValue !== elem.value) {
                            elem.value = newValue;

                            const min = elem.min !== undefined ? elem.min : 0;
                            const max = elem.max !== undefined ? elem.max : 10;
                            const range = max - min;
                            const visualPercentage = range === 0 ? 0 : Math.round(((elem.value - min) / range) * 100);
                            dragThumb.css('left', visualPercentage + '%');
                            dragFill.css('width', visualPercentage + '%');

                            let displayValue = formatSliderValue(elem.value, elem.hop, elem.options);

                            dragValue.text(displayValue);

                            elem.index = selectedIndex + 1;
                            MenuData.submit(namespace, name, elem);
                        }
                    }
                }
            });

            $(document).on('mouseup.descslider', function () {
                isDescDragging = false;
                $(document).off('mousemove.descslider');
                $(document).off('mouseup.descslider');
                MenuData.render();
            });
        });


        $(menuElement).find('.description-slider-container[data-slider-index]').each(function () {
            const sliderContainer = $(this);
            const elementIndex = parseInt(sliderContainer.data('element-index'));
            const sliderIndex = parseInt(sliderContainer.data('slider-index'));

            sliderContainer.find('.description-slider-track').on('click', function (e) {
                e.stopPropagation();

                const elem = menuData.elements[elementIndex];

                if (elem && elem.type === 'desc-slider' && elem.sliders && elem.sliders[sliderIndex]) {
                    const slider = elem.sliders[sliderIndex];
                    const track = $(this)[0];

                    newValue = getBoundingRect(e, track, slider);
                    slider.value = newValue;

                    let callbackData = JSON.parse(JSON.stringify(elem));
                    callbackData.index = elementIndex + 1;
                    callbackData.sliderIndex = sliderIndex + 1;

                    callbackData.value = newValue;
                    const currentSlider = elem.sliders[sliderIndex];

                    for (const key in currentSlider) {
                        if (key !== "label" && key !== "value" && key !== "min" && key !== "max" && key !== "hop" && key !== "options" && key !== "attributes") {
                            callbackData[key] = currentSlider[key];
                        }
                    }

                    MenuData.submit(namespace, name, callbackData);
                    MenuData.render();
                }
            });


            sliderContainer.find('.description-slider-thumb').on('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (isMultiSliderDragging) {
                    $(document).off('mousemove.multislider');
                    $(document).off('mouseup.multislider');
                }

                isMultiSliderDragging = true;
                const capturedElementIndex = elementIndex;
                const capturedSliderIndex = sliderIndex;
                const dragThumb = $(this);
                const dragFill = dragThumb.siblings('.description-slider-fill');
                const dragValue = sliderContainer.find('.description-slider-value');

                $(document).on('mousemove.multislider', function (e) {
                    if (isMultiSliderDragging && capturedElementIndex !== null && capturedSliderIndex !== null) {
                        const elem = menuData.elements[capturedElementIndex];
                        if (elem && elem.type === 'desc-slider' && elem.sliders && elem.sliders[capturedSliderIndex]) {
                            const slider = elem.sliders[capturedSliderIndex];
                            const track = dragThumb.closest('.description-slider-container').find('.description-slider-track')[0];

                            newValue = getBoundingRect(e, track, slider);


                            if (newValue !== slider.value) {
                                slider.value = newValue;

                                const min = slider.min !== undefined ? slider.min : 0;
                                const max = slider.max !== undefined ? slider.max : 10;
                                const range = max - min;
                                const visualPercentage = range === 0 ? 0 : Math.round(((slider.value - min) / range) * 100);
                                dragThumb.css('left', visualPercentage + '%');
                                dragFill.css('width', visualPercentage + '%');

                                let displayValue = formatSliderValue(slider.value, slider.hop, slider.options);
                                dragValue.text(displayValue);

                                let callbackData = JSON.parse(JSON.stringify(elem));
                                callbackData.index = capturedElementIndex + 1;
                                callbackData.sliderIndex = capturedSliderIndex + 1;

                                callbackData.value = newValue;
                                const currentSlider = elem.sliders[capturedSliderIndex];

                                for (const key in currentSlider) {
                                    if (key !== "label" && key !== "value" && key !== "min" && key !== "max" && key !== "hop" && key !== "options" && key !== "attributes") {
                                        callbackData[key] = currentSlider[key];
                                    }
                                }

                                MenuData.submit(namespace, name, callbackData);
                            }
                        }
                    }
                });

                $(document).on('mouseup.multislider', function () {
                    isMultiSliderDragging = false;
                    $(document).off('mousemove.multislider');
                    $(document).off('mouseup.multislider');
                    MenuData.render();
                });
            });
        });


        menuData.cleanup = function () {
            $(document).off('mousemove.slider');
            $(document).off('mouseup.slider');
            $(document).off('mousemove.descslider');
            $(document).off('mouseup.descslider');
            $(document).off('mousemove.multislider');
            $(document).off('mouseup.multislider');

            isDragging = false;
            isDescDragging = false;
            isMultiSliderDragging = false;
            dragElement = null;
        };
    }

    function updateSelectedContent(namespace, name, selectedElement) {

        const menuElement = document.querySelector(`#menu_${namespace}_${name}`);
        const menuData = MenuData.opened[namespace][name];

        if (menuElement && menuData) {
            const selectedIndex = MenuData.pos[namespace][name];

            const optionsAmount = menuElement.querySelector('.options-amount');
            if (optionsAmount)
                optionsAmount.textContent = `${selectedIndex + 1}/${menuData.elements.length}`;

            const description = menuElement.querySelector('.desciption');
            if (description)
                description.innerHTML = selectedElement.desc || '';

            const footerText = menuElement.querySelector('.footer-text');
            if (footerText)
                footerText.remove();


            if (selectedElement.footerText) {
                const newFooterText = document.createElement('div');
                newFooterText.className = 'footer-text';
                newFooterText.innerHTML = selectedElement.footerText;
                menuElement.appendChild(newFooterText);
            }


            $.post('https://' + MenuData.ResourceName + '/update_last_selected', JSON.stringify({
                _namespace: namespace,
                _name: name,
                selected: selectedIndex
            }));
        }
    }


    MenuData.open = function (namespace, name, data) {
        lastmenu = data.lastmenu;
        if (typeof MenuData.opened[namespace] == "undefined") {
            MenuData.opened[namespace] = {};
        }

        if (typeof MenuData.opened[namespace][name] != "undefined") {
            MenuData.close(namespace, name);
        }

        if (typeof MenuData.pos[namespace] == "undefined") {
            MenuData.pos[namespace] = {};
        }

        for (let i = 0; i < data.elements.length; i++) {
            if (typeof data.elements[i].type == "undefined") {
                data.elements[i].type = "default";
            }
        }

        data._index = MenuData.focus.length;
        data._namespace = namespace;
        data._name = name;

        for (let i = 0; i < data.elements.length; i++) {
            data.elements[i]._namespace = namespace;
            data.elements[i]._name = name;
        }
        let selectedIndex = (typeof MenuData.pos[namespace][name] !== "undefined") ? MenuData.pos[namespace][name] : 0;
        for (let i = 0; i < data.elements.length; i++) {
            data.elements[i].selected = (i === selectedIndex);
        }

        MenuData.opened[namespace][name] = data;
        MenuData.pos[namespace][name] = 0;

        for (let i = 0; i < data.elements.length; i++) {
            if (data.elements[i].selected) {
                MenuData.pos[namespace][name] = i;
            } else {
                data.elements[i].selected = false;
            }
        }

        MenuData.focus.push({
            namespace: namespace,
            name: name,
        });


        data.displayInput = function (inputConfig, onSubmit, onCancel) {
            MenuData.inputCallbacks = {
                onSubmit: onSubmit,
                onCancel: onCancel
            };

            MenuData.displayInput(namespace, name, inputConfig);
        };



        MenuData.render();

        if (SavedScrollTop > 0) { // refresh the menu this gets called so we gotta scroll to where we were
            requestAnimationFrame(() => {
                const menuItems = document.querySelector('.menu .menu-items');
                if (menuItems) {
                    menuItems.scrollTop = SavedScrollTop;
                    SavedScrollTop = 0;
                }
            });
        }

        const selectedElement = $("#menu_" + namespace + "_" + name).find(".menu-item.selected, .grid-item.selected");
        if (selectedElement.length > 0) {
            scrollToElement(selectedElement[0]);
        }

        $.post("https://" + MenuData.ResourceName + "/setCursor", JSON.stringify({
            enabled: data.enableCursor
        }));

    };

    MenuData.close = function (namespace, name) {

        if (MenuData.opened[namespace] && MenuData.opened[namespace][name] && MenuData.opened[namespace][name].cleanup) {
            MenuData.opened[namespace][name].cleanup();
        }

        delete MenuData.opened[namespace][name];

        for (let i = 0; i < MenuData.focus.length; i++) {
            if (
                MenuData.focus[i].namespace == namespace &&
                MenuData.focus[i].name == name
            ) {
                MenuData.focus.splice(i, 1);
                break;
            }
        }

        MenuData.render();

        let cursorEnabled = false;
        for (let ns in MenuData.opened) {
            for (let nm in MenuData.opened[ns]) {
                if (MenuData.opened[ns][nm].enableCursor) {
                    cursorEnabled = true;
                    break;
                }
            }
            if (cursorEnabled) break;
        }

        $.post("https://" + MenuData.ResourceName + "/setCursor", JSON.stringify({
            enabled: cursorEnabled
        }));
    };

    function formatSliderValue(value, hop, options) {
        if (typeof options !== "undefined") {
            return options[value];
        }

        if (typeof hop !== "undefined" && !Number.isInteger(hop)) {
            return Number(value).toFixed(1);
        } else {
            return Math.floor(value);
        }
    }

    MenuData.render = function () {

        const focused = MenuData.getFocused();
        $(document).off('mousemove.slider');
        $(document).off('mouseup.slider');
        $(document).off('mousemove.descslider');
        $(document).off('mouseup.descslider');

        let cursorEnabled = false;
        if (focused && MenuData.opened[focused.namespace] && MenuData.opened[focused.namespace][focused.name]) {
            cursorEnabled = (MenuData.opened[focused.namespace][focused.name].enableCursor);
        }

        $.post("https://" + MenuData.ResourceName + "/setCursor", JSON.stringify({
            enabled: cursorEnabled
        }));


        let menuContainer = document.getElementById("menus");
        menuContainer.innerHTML = "";
        $(menuContainer).hide();

        for (const namespace in MenuData.opened) {
            for (const name in MenuData.opened[namespace]) {
                const menuData = MenuData.opened[namespace][name];

                const view = JSON.parse(JSON.stringify(menuData));


                for (let i = 0; i < menuData.elements.length; i++) {
                    let element = view.elements[i];

                    switch (element.type) {
                        case "default":
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;

                            if (element.tickBox) {
                                element.isTickBoxChecked = (element.value === "ticked");
                            }
                            break;

                        case "slider": {
                            element.isSlider = true;
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;

                            element.sliderLabel = formatSliderValue(element.value, element.hop, element.options);

                            break;
                        }

                        case "label-slider": {
                            element.isLabelSlider = true;
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;
                            const min = element.min || 0;
                            const max = element.max || 100;
                            let value = element.value !== undefined ? element.value : min;
                            value = Math.max(min, Math.min(max, value));
                            element.hasNegativeRange = min < 0 && max > 0;
                            const range = max - min;
                            if (range === 0) {
                                element.sliderPercentage = 0;
                            } else {
                                element.sliderPercentage = Math.round(((value - min) / range) * 100);
                            }

                            element.sliderLabel = formatSliderValue(value, element.hop, element.options);

                            let customColors = {};
                            if (element.attributes) {
                                customColors = {
                                    trackColor: element.attributes.trackColor || null,
                                    fillColor: element.attributes.fillColor || null,
                                    thumbColor: element.attributes.thumbColor || null
                                };
                            }
                            element.customColors = customColors;

                            element.min = formatSliderValue(min, element.hop);
                            element.max = formatSliderValue(max, element.hop);

                            break;
                        }

                        case "desc-slider": {
                            element.isDescSlider = true;
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;

                            if (element.sliders && Array.isArray(element.sliders)) {
                                element.hasMultipleSliders = true;
                                element.processedSliders = [];

                                for (let sliderIndex = 0; sliderIndex < element.sliders.length; sliderIndex++) {
                                    const slider = element.sliders[sliderIndex];
                                    const min = slider.min !== undefined ? slider.min : 0;
                                    const max = slider.max !== undefined ? slider.max : 100;
                                    let value = slider.value !== undefined ? slider.value : min;

                                    value = Math.max(min, Math.min(max, value));
                                    const range = max - min;
                                    let sliderPercentage = 0;
                                    if (range === 0) {
                                        sliderPercentage = 0;
                                    } else {
                                        sliderPercentage = Math.round(((value - min) / range) * 100);
                                    }

                                    let sliderLabel = formatSliderValue(value, slider.hop, slider.options);

                                    let customKey = null;
                                    for (const key in slider) {
                                        if (key !== "label" && key !== "value" && key !== "min" && key !== "max" && key !== "hop" && key !== "options" && key !== "attributes") {
                                            if (!customKey) {
                                                customKey = key;
                                            }
                                        }
                                    }

                                    let customColors = {};
                                    if (slider.attributes) {
                                        customColors = {
                                            trackColor: slider.attributes.trackColor || null,
                                            fillColor: slider.attributes.fillColor || null,
                                            thumbColor: slider.attributes.thumbColor || null
                                        };
                                    }

                                    element.processedSliders.push({
                                        index: sliderIndex,
                                        label: slider.label || `Slider ${sliderIndex + 1}`,
                                        value: value,
                                        min: formatSliderValue(slider.min, slider.hop),
                                        max: formatSliderValue(slider.max, slider.hop),
                                        hop: slider.hop,
                                        options: slider.options,
                                        sliderPercentage: sliderPercentage,
                                        sliderLabel: sliderLabel,
                                        customKey: customKey || `slider${sliderIndex}`,
                                        customColors: customColors,
                                        elementIndex: i
                                    });
                                }
                            } else {

                                element.hasMultipleSliders = false;

                                const min = element.min !== undefined ? element.min : 0;
                                const max = element.max !== undefined ? element.max : 10;
                                let value = element.value !== undefined ? element.value : min;
                                value = Math.max(min, Math.min(max, value));
                                element.hasNegativeRange = min < 0 && max > 0;

                                const range = max - min;
                                if (range === 0) {
                                    element.sliderPercentage = 0;
                                } else {
                                    element.sliderPercentage = Math.round(((value - min) / range) * 100);
                                }

                                element.sliderLabel = formatSliderValue(value, element.hop, element.options);

                                element.min = formatSliderValue(min, element.hop);
                                element.max = formatSliderValue(max, element.hop);
                            }

                            element.isSlider = false;

                            break;
                        }

                        case "tick-box": {
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;

                            if (element.tickBoxes && Array.isArray(element.tickBoxes)) {
                                element.isMultipleTickBoxes = true;
                                element.processedTickBoxes = [];

                                for (let tickBoxIndex = 0; tickBoxIndex < element.tickBoxes.length; tickBoxIndex++) {
                                    const tickBox = element.tickBoxes[tickBoxIndex];

                                    element.processedTickBoxes.push({
                                        index: tickBoxIndex,
                                        label: tickBox.label || `Option ${tickBoxIndex + 1}`,
                                        value: tickBox.value || "unticked",
                                        isChecked: tickBox.value === "ticked",
                                        elementIndex: i
                                    });
                                }
                            } else {
                                element.isMultipleTickBoxes = false;
                                element.tickBox = true;
                                element.isTickBoxChecked = element.value === "ticked";
                            }

                            break;
                        }

                        case "text-slider": {
                            element.isSlider = true;
                            element.isTextSlider = true;
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;

                            if (element.textList && Array.isArray(element.textList)) {

                                const currentIndex = element.textIndex ? (element.textIndex - 1) : 0;

                                if (element.textList[currentIndex]) {
                                    element.textIndex = currentIndex + 1;
                                    element.currentTextLabel = element.textList[currentIndex].label;
                                    element.maxIndex = element.textList.length - 1;
                                }
                            } else {
                                element.textIndex = 0;
                                element.currentTextLabel = "none";
                                element.maxIndex = 0;
                            }

                            break;
                        }

                        default:
                            element.list_id = i + 1;
                            element.list_max = menuData.elements.length;
                            break;
                    }

                    if (i == MenuData.pos[namespace][name]) {
                        element.selected = true;
                    }
                }


                let hasDescPrice = false;
                let descPriceData = null;
                const selectedIndex = MenuData.pos[namespace][name] || 0;
                if (view.elements[selectedIndex] && view.elements[selectedIndex].descPrice) {
                    hasDescPrice = true;
                    descPriceData = JSON.parse(JSON.stringify(view.elements[selectedIndex].descPrice));
                    descPriceData.isMoneyIcon = descPriceData.icon === "money";
                }
                view.hasDescPrice = hasDescPrice;
                view.descPriceData = descPriceData;
                view.showGlobalDivider = menuData.divider && !hasDescPrice;
                view.enableCursor = menuData.enableCursor;

                const menu = $(Mustache.render(MenuTpl, view))[0];
                $(menu).hide();
                menuContainer.appendChild(menu);

                if (menuData.maxVisibleItems && typeof menuData.maxVisibleItems === 'number') {
                    const wrap = menu.querySelector('.menu-items');
                    if (wrap) {

                        if (!menuData._maxVisibleHeight) {
                            requestAnimationFrame(() => {
                                const items = wrap.querySelectorAll('.menu-item, .grid-item');
                                const N = menuData.maxVisibleItems;
                                if (items.length > N) {
                                    let total = 0;
                                    for (let i = 0; i < N; i++) {
                                        const el = items[i];
                                        const h = el.getBoundingClientRect().height;
                                        const s = getComputedStyle(el);
                                        total += h + parseFloat(s.marginTop) + parseFloat(s.marginBottom);
                                    }
                                    menuData._maxVisibleHeight = total;

                                    wrap.style.height = `${total}px`;
                                    wrap.style.overflowY = 'auto';
                                    wrap.style.maxHeight = 'none';
                                }
                            });
                        } else {
                            wrap.style.height = `${menuData._maxVisibleHeight}px`;
                            wrap.style.overflowY = 'auto';
                            wrap.style.maxHeight = 'none';
                        }
                    }

                }

                if (menuData.enableCursor) {
                    addMouseEvents(namespace, name, menu);
                }
            }
        }

        if (typeof focused != "undefined") {
            $("#menu_" + focused.namespace + "_" + focused.name).show();

            const focusedMenuData = MenuData.opened[focused.namespace][focused.name];
            if (focusedMenuData) {
                const specificMenu = document.querySelector(`#menu_${focused.namespace}_${focused.name}`);
                if (focusedMenuData.fixedHeight) {
                    if (specificMenu)
                        specificMenu.style.height = "85vh";
                } else {
                    if (specificMenu)
                        specificMenu.style.height = "auto";
                }
            }
        }

        $(menuContainer).show();

    };

    MenuData.submit = function (namespace, name, data) {

        if (data && data.type === 'desc-slider' && data.sliders && Array.isArray(data.sliders)) {
            if (data.sliderIndex === null || data.sliderIndex === undefined || isNaN(data.sliderIndex)) {
                return;
            }
        }

        if (data == "backup") {
            $.post("https://" + MenuData.ResourceName + "/menu_submit",
                JSON.stringify({
                    _namespace: namespace,
                    _name: name,
                    current: data,
                    trigger: lastmenu,
                    elements: MenuData.opened[namespace][name].elements,
                })
            );
        } else {
            $.post("https://" + MenuData.ResourceName + "/menu_submit",
                JSON.stringify({
                    _namespace: namespace,
                    _name: name,
                    current: data,
                    elements: MenuData.opened[namespace][name].elements,
                })
            );
        }
    };

    MenuData.cancel = function (namespace, name) {
        $.post("https://" + MenuData.ResourceName + "/menu_cancel",
            JSON.stringify({
                _namespace: namespace,
                _name: name,
            })
        );
    };

    MenuData.change = function (namespace, name, data) {
        $.post("https://" + MenuData.ResourceName + "/menu_change",
            JSON.stringify({
                _namespace: namespace,
                _name: name,
                current: data,
                elements: MenuData.opened[namespace][name].elements,
            })
        );
    };

    MenuData.getFocused = function () {
        return MenuData.focus[MenuData.focus.length - 1];
    };

    MenuData.displayInput = function (namespace, name, inputConfig) {

        const menuData = MenuData.opened[namespace][name];
        const originalCursorState = menuData ? menuData.enableCursor : false;

        // predefined patterns (international character support)
        // need to document these in our docs
        const patterns = {
            'letters': /^[\p{L}\s]*$/u,                    // all Unicode letters and spaces
            'numbers': /^[0-9]*$/,                         // numbers only
            'alphanumeric': /^[\p{L}0-9]*$/u,             // all Unicode letters and numbers
            'no-symbols': /^[\p{L}0-9\s]*$/u,             // letters, numbers, spaces (all languages)
            'username': /^[\p{L}0-9_-]*$/u,               // username with international letters
            'phone': /^[0-9\s\-\(\)\+]*$/,                // phone numbers with + for country codes
            'email': /^[\p{L}0-9@._-]*$/u,                // email with international letters
            'money': /^[0-9.,]*$/,                        // money format (supports both . and , decimals)
            'no-special': /^[\p{L}0-9\s\-']*$/u          // no special symbols but allow apostrophes and hyphens
        };

        const inputData = {
            inputType: inputConfig.inputType || 'text',
            header: inputConfig.header || 'Input',
            description: inputConfig.description || '',
            placeholder: inputConfig.placeholder || '',
            maxLength: inputConfig.maxLength,
            pattern: inputConfig.pattern || null,
            isConfirmation: inputConfig.inputType === 'yesno',
            confirmLabel: '',
            cancelLabel: ''
        };

        if (inputConfig.inputType === 'textarea')
            inputData.isTextarea = true;

        if (inputConfig.buttons) {
            inputData.confirmLabel = inputConfig.buttons?.confirm || 'Confirm';
            inputData.cancelLabel = inputConfig.buttons?.cancel || 'Cancel';
        }

        const inputHtml = Mustache.render(InputTpl, inputData);
        const inputElement = $(inputHtml)[0];
        document.body.appendChild(inputElement);

        $.post("https://" + MenuData.ResourceName + "/setCursor", JSON.stringify({
            enabled: true
        }));


        if (!inputData.isConfirmation && inputConfig.pattern) {
            const inputField = inputElement.querySelector('.input-field');
            const pattern = patterns[inputConfig.pattern] || new RegExp(inputConfig.pattern);

            const tooltip = document.createElement('div');
            tooltip.className = 'input-tooltip';

            const getMessage = () => {
                return inputConfig.patternMessage || 'Invalid characters not allowed';
            };

            tooltip.textContent = getMessage();
            inputField.parentElement.style.position = 'relative';
            inputField.parentElement.appendChild(tooltip);

            let tooltipTimeout;

            inputField.addEventListener('input', (e) => {
                const value = e.target.value;
                const originalValue = value;

                const validChars = value.split('').filter(char => {
                    return pattern.test(char) || pattern.test(value.substring(0, value.indexOf(char) + 1));
                });
                const newValue = validChars.join('');

                if (originalValue !== newValue) {
                    e.target.value = newValue;

                    tooltip.classList.add('show');

                    if (tooltipTimeout) {
                        clearTimeout(tooltipTimeout);
                    }

                    tooltipTimeout = setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 2000);
                }
            });


            inputField.addEventListener('paste', (e) => {
                e.preventDefault();
                const paste = (e.clipboardData || window.clipboardData).getData('text');
                const validChars = paste.split('').filter(char => pattern.test(char));
                const currentValue = e.target.value;
                const newValue = currentValue + validChars.join('');

                if (paste !== validChars.join('')) {
                    tooltip.classList.add('show');
                    if (tooltipTimeout) clearTimeout(tooltipTimeout);
                    tooltipTimeout = setTimeout(() => {
                        tooltip.classList.remove('show');
                    }, 2000);
                }

                if (inputData.maxLength && newValue.length > inputData.maxLength) {
                    e.target.value = newValue.substring(0, inputData.maxLength);
                } else {
                    e.target.value = newValue;
                }
            });
        }


        if (!inputData.isConfirmation) {
            const inputField = inputElement.querySelector('.input-field');
            setTimeout(() => {
                inputField.focus();
            }, 100);
        }

        const submitBtn = inputElement.querySelector('.input-submit');
        const cancelBtn = inputElement.querySelector('.input-cancel');

        const closeInput = () => {
            document.body.removeChild(inputElement);

            $.post("https://" + MenuData.ResourceName + "/setCursor", JSON.stringify({
                enabled: originalCursorState
            }));
            window.isInputOpen = false;
        };

        const sendResult = (inputData, cancelled) => {

            $.post("https://" + MenuData.ResourceName + "/inputResult", JSON.stringify({
                inputData: inputData,
                cancelled: cancelled
            }));

            if (MenuData.inputCallbacks) {
                if (cancelled && MenuData.inputCallbacks.onCancel) {
                    MenuData.inputCallbacks.onCancel();
                } else if (!cancelled && MenuData.inputCallbacks.onSubmit) {
                    MenuData.inputCallbacks.onSubmit(inputData);
                }

                MenuData.inputCallbacks = null;
            }
        };

        submitBtn.addEventListener('click', () => {
            let value = true;

            if (!inputData.isConfirmation) {
                const inputField = inputElement.querySelector('.input-field');
                value = inputField.value;
            }

            closeInput();
            sendResult(value, false);
            document.removeEventListener('keydown', handleEscKey);
        });

        cancelBtn.addEventListener('click', () => {
            if (inputData.isConfirmation) {
                closeInput();
                sendResult(false, false);
                document.removeEventListener('keydown', handleEscKey);
            } else {
                closeInput();
                sendResult(null, true);
                document.removeEventListener('keydown', handleEscKey);
            }
        });

        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeInput();

                if (MenuData.inputCallbacks) {
                    MenuData.inputCallbacks = null;
                }

                $.post("https://" + MenuData.ResourceName + "/inputResult", JSON.stringify({
                    inputData: null,
                    cancelled: true,
                    escPressed: true
                }));
                document.removeEventListener('keydown', handleEscKey);
            }
        };
        document.addEventListener('keydown', handleEscKey);


        if (!inputData.isConfirmation) {
            const inputField = inputElement.querySelector('.input-field');
            inputField.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {

                    if (!inputData.isTextarea) {
                        e.preventDefault();
                        const value = inputField.value;
                        closeInput();
                        sendResult(value, false);
                        document.removeEventListener('keydown', handleEscKey);
                    }
                }
            });
        } else {

            inputElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    closeInput();
                    sendResult(true, false);
                    document.removeEventListener('keydown', handleEscKey);
                    
                }
            });
        }

        window.isInputOpen = true;
    };



    window.onData = (data) => {

        switch (data.ak_menubase_action) {

            case "openMenu": {

                MenuData.open(
                    data.ak_menubase_namespace,
                    data.ak_menubase_name,
                    data.ak_menubase_data
                );
                break;
            }

            case "closeMenu": {
                MenuData.close(data.ak_menubase_namespace, data.ak_menubase_name);
                break;
            }

            case "displayInput": {
                MenuData.displayInput(
                    data.ak_menubase_namespace,
                    data.ak_menubase_name,
                    data.ak_menubase_inputConfig
                );
                break;
            }

            case "controlPressed": {
                switch (data.ak_menubase_control) {
                    case "ENTER": {
                        const focused = MenuData.getFocused();

                        if (typeof focused != "undefined") {
                            const menu = MenuData.opened[focused.namespace][focused.name];
                            const pos = MenuData.pos[focused.namespace][focused.name];
                            let elem = menu.elements[pos];
                            elem.index = pos + 1;

                            if (elem.isDisabled) return;

                            if (elem.tickBox) {

                                elem.value = elem.value === "ticked" ? "unticked" : "ticked";
                                const menuContainer = document.querySelector(".menu .menu-items");
                                 SavedScrollTop = menuContainer ? menuContainer.scrollTop : 0;

                                MenuData.submit(focused.namespace, focused.name, elem);
                                MenuData.render();
                                const newMenuContainer = document.querySelector(".menu .menu-items");
                                if (newMenuContainer) {
                                    newMenuContainer.scrollTop = SavedScrollTop;
                                }
                                break;
                            }

                            if (menu.elements.length > 0) {
                                MenuData.submit(focused.namespace, focused.name, elem);
                            }
                        }

                        break;
                    }

                    case "BACKSPACE": {
                        const focused = MenuData.getFocused();
                        if (lastmenu == null)
                            lastmenu = "";

                        if (lastmenu != "undefined" && lastmenu != "") {
                            MenuData.submit(focused.namespace, focused.name, "backup");
                        } else if (typeof focused != "undefined") {
                            MenuData.cancel(focused.namespace, focused.name);
                            $.post("https://" + MenuData.ResourceName + "/closeui",
                                JSON.stringify({namespace: focused.namespace, name: focused.name})
                            );
                        }
                        break;
                    }

                    case "TOP": {
                        const focused = MenuData.getFocused();

                        if (typeof focused != "undefined") {
                            const menu = MenuData.opened[focused.namespace][focused.name];
                            const pos = MenuData.pos[focused.namespace][focused.name];

                            if (menu.isGrid) {

                                let newPos = pos - 4;
                                if (newPos < 0) {

                                    const column = pos % 4;
                                    const totalRows = Math.ceil(menu.elements.length / 4);
                                    const lastRowStart = (totalRows - 1) * 4;
                                    newPos = lastRowStart + column;


                                    if (newPos >= menu.elements.length)
                                        newPos = menu.elements.length - 1;

                                }
                                MenuData.pos[focused.namespace][focused.name] = newPos;
                            } else {

                                if (pos > 0) {
                                    MenuData.pos[focused.namespace][focused.name]--;
                                } else {
                                    MenuData.pos[focused.namespace][focused.name] = menu.elements.length - 1;
                                }
                            }

                            const elem = menu.elements[MenuData.pos[focused.namespace][focused.name]];

                            for (let i = 0; i < menu.elements.length; i++) {
                                menu.elements[i].selected = (i == MenuData.pos[focused.namespace][focused.name]);
                            }

                            $.post('https://' + MenuData.ResourceName + '/update_last_selected', JSON.stringify({
                                _namespace: focused.namespace,
                                _name: focused.name,
                                selected: MenuData.pos[focused.namespace][focused.name]
                            }));

                            MenuData.change(focused.namespace, focused.name, elem);
                            MenuData.render();
                            $.post("https://" + MenuData.ResourceName + "/playsound");

                            const selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                            if (selectedElement.length > 0)
                                scrollToElement(selectedElement[0]);

                        }

                        break;
                    }

                    case "DOWN": {
                        let focused = MenuData.getFocused();

                        if (typeof focused != "undefined") {
                            let menu = MenuData.opened[focused.namespace][focused.name];
                            let pos = MenuData.pos[focused.namespace][focused.name];
                            let length = menu.elements.length;

                            if (menu.isGrid) {
                                let newPos = pos + 4;
                                if (newPos >= length) {
                                    let column = pos % 4;
                                    newPos = column;
                                }
                                MenuData.pos[focused.namespace][focused.name] = newPos;
                            } else {

                                if (pos < length - 1) {
                                    MenuData.pos[focused.namespace][focused.name]++;
                                } else {
                                    MenuData.pos[focused.namespace][focused.name] = 0;
                                }
                            }

                            let elem = menu.elements[MenuData.pos[focused.namespace][focused.name]];

                            for (let i = 0; i < menu.elements.length; i++) {
                                if (i == MenuData.pos[focused.namespace][focused.name]) {
                                    menu.elements[i].selected = true;
                                } else {
                                    menu.elements[i].selected = false;
                                }
                            }

                            $.post('https://' + MenuData.ResourceName + '/update_last_selected', JSON.stringify({
                                _namespace: focused.namespace,
                                _name: focused.name,
                                selected: MenuData.pos[focused.namespace][focused.name]
                            }));

                            MenuData.change(focused.namespace, focused.name, elem);
                            MenuData.render();
                            $.post("https://" + MenuData.ResourceName + "/playsound");
                            let selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                            if (selectedElement.length > 0) {
                                scrollToElement(selectedElement[0]);
                            }

                        }

                        break;
                    }

                    case "LEFT": {
                        const focused = MenuData.getFocused();

                        if (typeof focused != "undefined") {
                            const menu = MenuData.opened[focused.namespace][focused.name];
                            const pos = MenuData.pos[focused.namespace][focused.name];

                            if (menu.isGrid) {
                                let newPos = pos - 1;
                                if (newPos < 0 || pos % 4 === 0) {
                                    if (pos % 4 === 0) {
                                        if (pos === 0) {
                                            newPos = menu.elements.length - 1;
                                        } else {

                                            newPos = pos - 1;
                                        }
                                    } else {
                                        newPos = menu.elements.length - 1;
                                    }
                                }

                                MenuData.pos[focused.namespace][focused.name] = newPos;

                                let elem = menu.elements[MenuData.pos[focused.namespace][focused.name]];
                                for (let i = 0; i < menu.elements.length; i++) {
                                    menu.elements[i].selected = (i == MenuData.pos[focused.namespace][focused.name]);
                                }

                                $.post('https://' + MenuData.ResourceName + '/update_last_selected', JSON.stringify({
                                    _namespace: focused.namespace,
                                    _name: focused.name,
                                    selected: MenuData.pos[focused.namespace][focused.name]
                                }));

                                MenuData.change(focused.namespace, focused.name, elem);
                                MenuData.render();
                                $.post("https://" + MenuData.ResourceName + "/playsound");

                                const selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                                if (selectedElement.length > 0)
                                    scrollToElement(selectedElement[0]);

                            } else {

                                let elem = menu.elements[pos];
                                elem.index = pos + 1;

                                if (elem.isDisabled) return;

                                switch (elem.type) {
                                    case "default":
                                        break;

                                    case "slider": {
                                        const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                        if (elem.value > min) {
                                            if (typeof elem.hop != "undefined") {
                                                if (Number.isInteger(elem.hop)) {
                                                    elem.value = elem.value - elem.hop;
                                                } else {
                                                    elem.value = (
                                                        Number(elem.value) - Number(elem.hop)
                                                    ).toFixed(1);
                                                }

                                                elem.value = Number(elem.value);

                                                if (elem.value < min)
                                                    elem.value = min;

                                            } else {
                                                elem.value--;
                                            }
                                            MenuData.change(focused.namespace, focused.name, elem);
                                            MenuData.submit(focused.namespace, focused.name, elem);
                                        }

                                        MenuData.render();
                                        break;
                                    }

                                    case "label-slider": {
                                        const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                        if (elem.value > min) {
                                            if (typeof elem.hop != "undefined") {
                                                if (Number.isInteger(elem.hop)) {
                                                    elem.value = elem.value - elem.hop;
                                                } else {
                                                    elem.value = (
                                                        Number(elem.value) - Number(elem.hop)
                                                    ).toFixed(1);
                                                }

                                                elem.value = Number(elem.value);

                                                if (elem.value < min)
                                                    elem.value = min;

                                            } else {
                                                elem.value--;
                                            }
                                            MenuData.change(focused.namespace, focused.name, elem);
                                            MenuData.submit(focused.namespace, focused.name, elem);
                                        }

                                        MenuData.render();
                                        break;
                                    }

                                    case "desc-slider": {

                                        if (!elem.sliders || !Array.isArray(elem.sliders)) {

                                            const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                            if (elem.value > min) {
                                                if (typeof elem.hop != "undefined") {

                                                    if (Number.isInteger(elem.hop)) {
                                                        elem.value = elem.value - elem.hop;
                                                    } else {
                                                        elem.value = (
                                                            Number(elem.value) - Number(elem.hop)
                                                        ).toFixed(1);
                                                    }

                                                    elem.value = Number(elem.value);

                                                    if (elem.value < min)
                                                        elem.value = min;

                                                } else {
                                                    elem.value--;
                                                }
                                                MenuData.change(focused.namespace, focused.name, elem);
                                                MenuData.submit(focused.namespace, focused.name, elem);
                                            }

                                            MenuData.render();
                                        }
                                        break;
                                    }

                                    case "text-slider": {
                                        if (elem.textList && elem.textList.length > 0) {

                                            const maxLength = elem.textList.length;
                                            const currentIndex = elem.textIndex ? (elem.textIndex - 1) : 0;

                                            if (currentIndex > maxLength) {
                                                currentIndex = maxLength;
                                            }

                                            const newIndex = currentIndex - 1;

                                            if (elem.textList[newIndex]) {

                                                elem.value = elem.textList[newIndex].value;
                                                elem.currentTextLabel = elem.textList[newIndex].label;
                                                elem.textIndex = newIndex + 1;
                                                elem.index = elem.pos + 1;
                                                MenuData.submit(focused.namespace, focused.name, elem);
                                                MenuData.render();
                                            }
                                        }
                                        break;
                                    }

                                    default:
                                        break;
                                }

                                const selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                                if (selectedElement.length > 0)
                                    scrollToElement(selectedElement[0]);
                            }
                        }
                        break;
                    }

                    case "RIGHT": {
                        const focused = MenuData.getFocused();

                        if (typeof focused != "undefined") {
                            const menu = MenuData.opened[focused.namespace][focused.name];
                            const pos = MenuData.pos[focused.namespace][focused.name];

                            if (menu.isGrid) {
                                let newPos = pos + 1;
                                if (newPos >= menu.elements.length || (pos + 1) % 4 === 0) {
                                    if ((pos + 1) % 4 === 0) {
                                        if (newPos >= menu.elements.length) {
                                            newPos = 0;
                                        }
                                    } else {
                                        newPos = 0;
                                    }
                                }

                                MenuData.pos[focused.namespace][focused.name] = newPos;

                                const elem = menu.elements[MenuData.pos[focused.namespace][focused.name]];
                                for (let i = 0; i < menu.elements.length; i++) {
                                    menu.elements[i].selected = (i == MenuData.pos[focused.namespace][focused.name]);
                                }

                                $.post('https://' + MenuData.ResourceName + '/update_last_selected', JSON.stringify({
                                    _namespace: focused.namespace,
                                    _name: focused.name,
                                    selected: MenuData.pos[focused.namespace][focused.name]
                                }));

                                MenuData.change(focused.namespace, focused.name, elem);
                                MenuData.render();
                                $.post("https://" + MenuData.ResourceName + "/playsound");

                                const selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                                if (selectedElement.length > 0)
                                    scrollToElement(selectedElement[0]);

                            } else {

                                let elem = menu.elements[pos];
                                elem.index = pos + 1;

                                if (elem.isDisabled) return;

                                switch (elem.type) {
                                    case "default":
                                        break;

                                    case "slider": {

                                        if (typeof elem.options != "undefined" && elem.value < elem.options.length - 1) {
                                            elem.value++;
                                            MenuData.change(focused.namespace, focused.name, elem);
                                            MenuData.submit(focused.namespace, focused.name, elem);
                                        }

                                        if (typeof elem.max != "undefined" && elem.value < elem.max) {
                                            if (typeof elem.hop != "undefined") {

                                                const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                                if (min > 0 && min == elem.value)
                                                    elem.value = 0;


                                                if (Number.isInteger(elem.hop)) {
                                                    elem.value = elem.value + elem.hop;
                                                } else {
                                                    elem.value = (
                                                        Number(elem.value) + Number(elem.hop)
                                                    ).toFixed(1);
                                                }

                                                elem.value = Number(elem.value);

                                                if (elem.value > elem.max)
                                                    elem.value = elem.max;

                                            } else {
                                                elem.value++;
                                            }
                                            MenuData.change(focused.namespace, focused.name, elem); // for back compatibility
                                            MenuData.submit(focused.namespace, focused.name, elem);
                                        }

                                        MenuData.render();
                                        break;
                                    }

                                    case "label-slider": {

                                        if (typeof elem.max != "undefined" && elem.value < elem.max) {

                                            const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                            if (min > 0 && min == elem.value)
                                                elem.value = 0;



                                            if (Number.isInteger(elem.hop)) {
                                                elem.value = elem.value + elem.hop;
                                            } else {
                                                elem.value = (
                                                    Number(elem.value) + Number(elem.hop)
                                                ).toFixed(1);
                                            }

                                            elem.value = Number(elem.value);

                                            if (elem.value > elem.max)
                                                elem.value = elem.max;

                                            MenuData.submit(focused.namespace, focused.name, elem);
                                        }

                                        MenuData.render();
                                        break;
                                    }

                                    case "desc-slider": {

                                        if (!elem.sliders || !Array.isArray(elem.sliders)) {

                                            if (typeof elem.max != "undefined" && elem.value < elem.max) {

                                                const min = typeof elem.min == "undefined" ? 0 : elem.min;

                                                if (min > 0 && min == elem.value)
                                                    elem.value = 0;


                                                if (Number.isInteger(elem.hop)) {
                                                    elem.value = elem.value + elem.hop;
                                                } else {
                                                    elem.value = (
                                                        Number(elem.value) + Number(elem.hop)
                                                    ).toFixed(1);
                                                }

                                                elem.value = Number(elem.value);

                                                if (elem.value > elem.max)
                                                    elem.value = elem.max;

                                                MenuData.submit(focused.namespace, focused.name, elem);
                                            }

                                            MenuData.render();
                                        }


                                        break;
                                    }

                                    case "text-slider": {
                                        if (elem.textList && elem.textList.length > 0) {

                                            const currentIndex = elem.textIndex ? (elem.textIndex - 1) : 0;

                                            if (currentIndex < 0) {
                                                currentIndex = 0
                                            }

                                            const newIndex = currentIndex + 1;

                                            if (elem.textList[newIndex]) {
                                                elem.value = elem.textList[newIndex].value;
                                                elem.currentTextLabel = elem.textList[newIndex].label;
                                                elem.textIndex = newIndex + 1;
                                                elem.index = elem.pos + 1;
                                                MenuData.submit(focused.namespace, focused.name, elem);
                                                MenuData.render();
                                            }

                                        }
                                        break;
                                    }

                                    default:
                                        break;
                                }

                                const selectedElement = $("#menu_" + focused.namespace + "_" + focused.name).find(".menu-item.selected, .grid-item.selected");
                                if (selectedElement.length > 0)
                                    scrollToElement(selectedElement[0]);
                            }
                        }

                        break;
                    }

                    default:
                        break;
                }

                break;
            }
        }
    };

    document.addEventListener('DOMContentLoaded', function () {

        window.addEventListener("message", (event) => {
            onData(event.data);
        });

        document.addEventListener('keydown', function (e) {

            if (window.isInputOpen) return;

            let cursorEnabled = false;
            let focusedMenu = MenuData.getFocused();
            if (focusedMenu && MenuData.opened[focusedMenu.namespace] && MenuData.opened[focusedMenu.namespace][focusedMenu.name]) {
                cursorEnabled = (MenuData.opened[focusedMenu.namespace][focusedMenu.name].enableCursor === true);
            }

            if (cursorEnabled) {

                if (e.key === 'Backspace') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'BACKSPACE'
                    });
                }

                if (e.key === 'Enter') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'ENTER'
                    });
                }

                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'TOP'
                    });
                }

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'DOWN'
                    });
                }

                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'LEFT'
                    });
                }

                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    onData({
                        ak_menubase_action: 'controlPressed',
                        ak_menubase_control: 'RIGHT'
                    });
                }
            }
        });
    });
})();

