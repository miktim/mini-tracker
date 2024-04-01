/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {createDOMElement, formatTime} from './util.js';
import {lang} from './lang.js';
import {map} from './map.js';
import {logger} from './logger.js';

/*
 function TrackerPane(style) {
 this.pane = createDOMElement('div', style||'tracker-pane');
 this.pane.hidden=true;
 };
 
 function TrackerList(style) {
 
 };
 */
export var mainMenu = {
    pane: null
};
mainMenu.pane = createDOMElement('div', 'tracker-button');

export var createMainMenu = function () {
    var pane = mainMenu.pane;

    var menuItems = [
        {img: './images/btn_locate.png', title: lang.actionSetCenter, onclick: function () {
                map.setCenterToLocation();
            }},
        {img: './images/btn_bound.png', title: lang.actionShowAll, onclick: function () {
                map.fitAllObjects();
            }}
    ];
    
    for (var item of menuItems) {
        var btn = createDOMElement('div', 'tracker-button', pane);
        btn.addEventListener('click', item.onclick, false);
        var img = createDOMElement('img', 'tracker-button', btn);
        img.src = item.img;
        img.title = item.title;
    }
    var frm = createDOMElement('form', 'tracker-search', pane);
    frm.style.display = '';
    frm.onclick = function () {
        frm.searchCriteria.focus();
        frm.searchCriteria.scrollIntoView();
        logger.info(lang.msgWildcards, 5);
    };
    frm.onsubmit = function (e) {
// https://stackoverflow.com/questions/4276754/is-it-possible-to-remove-the-focus-from-a-text-input-when-a-page-loads
        document.activeElement.blur(); // remove focus, close keyboard
        var objList = map.searchObjectsByName(e.target.searchCriteria.value);
        objectList.create(objList, lang.msgFound);
        return false;
    };
    var inp = createDOMElement('input', 'tracker-search', frm);
    inp.type = 'text';
    inp.name = 'searchCriteria';
    inp.placeholder = lang.actionSearch;
    inp.autocomplete = 'off';
};

export var scrollPane = {
    pane: null,
    paneTitle: null,
    scrollArea: null
};

// TODO pane prototypes: TrackerPane, TrackerHeadedPane (onclose) 
var createPaneHeader = function (paneObj, style = 'tracker-pane') {
    var pane = createDOMElement('div', style);
    pane.hidden = true;
    paneObj.pane = pane;
    var div = createDOMElement('div', 'tracker-title', pane);
    paneObj.paneTitle = createDOMElement('div', 'tracker-title-text', div);
//objectList.paneTitle = div;
    var img = createDOMElement('img', 'tracker-title', div);
    img.src = './images/btn_close.png';
    img.onclick = function (e) {
        paneObj.pane.hidden = true;
    };
};

export var infoPane = {
    pane: null,
    paneTitle: null,
    infoArea: null
};
createPaneHeader(infoPane); //,'tracker-info-pane');
infoPane.infoArea = createDOMElement('div', 'tracker-pane', infoPane.pane);
//infoPane.pane.style.zIndex = 900;

infoPane.infoArea.onclick = function (e) {
    var pane = infoPane.pane;
    if (!pane.style.marginLeft) {
        pane.style.marginLeft = '-100px';
    } else {
        pane.style.marginLeft = '';
    }
};


export var trackInfo = {
    create: function (info, title) {
        infoPane.pane.hidden = true;
        infoPane.paneTitle.innerHTML = title;
        infoPane.infoArea.innerHTML = '';
        infoPane.pane.hidden = false;
        var clientRect = infoPane.infoArea.getBoundingClientRect();
        var table = createDOMElement('table', 'tracker-table', infoPane.infoArea);
        table.style.maxWidth = Math.max(200, clientRect.width) + 'px';
        this.makeRow(table, lang.tblNodeInfo[0], info.index + 1);
        this.makeRow(table, lang.tblNodeInfo[1], formatTime(info.totalTime));
        this.makeRow(table, lang.tblNodeInfo[2], (info.path / 1000).toFixed(3));
        this.makeRow(table, lang.tblNodeInfo[3], (info.speed * 3.6).toFixed(0));
        this.makeRow(table, lang.tblNodeInfo[4], info.heading ? info.heading.toFixed(1) : '-');
        this.makeRow(table, lang.tblNodeInfo[5], info.course ? info.course.toFixed(1) : '-');

        infoPane.pane.hidden = false;
    },
    makeRow: function (table, name, value) {
        var row = createDOMElement('tr', 'tracker-row', table), cell;
        createDOMElement('td', 'tracker-cell', row).innerHTML = name;
        createDOMElement('td', 'tracker-cell-wide', row).innerHTML = value;
    }
};


createPaneHeader(scrollPane);
scrollPane.scrollArea = createDOMElement('div', 'tracker-scroll', scrollPane.pane);
//scrollPane.pane.style.zIndex = 1100;

var setScrollPaneSize = function () {
    var newHeight = ((window.innerHeight || document.documentElement.clientHeight) - 145) + 'px';
    var newWidth = ((window.innerWidth || document.documentElement.clientWidth) - 25) + 'px';
    if (newHeight !== scrollPane.scrollArea.style.maxHeight ||
            newWidth !== scrollPane.scrollArea.style.maxWidth) {
        scrollPane.scrollArea.style.maxHeight = newHeight;
        scrollPane.scrollArea.style.maxWidth = newWidth;
    }
};
setScrollPaneSize();

var onWindowSizeChange = function (handler) {
    if ('orientation' in window.screen) {
        screen.orientation.addEventListener("oncnange", handler);
    } else {
        screen.addEventListener("orientationchange", handler);
    }
    window.addEventListener("resize", handler); // ??? fired on orientation change
};
onWindowSizeChange(setScrollPaneSize);

export var objectList = {
    create: function (list, title) {
        scrollPane.pane.hidden = true;
        var listLength = list.length;
        if (listLength === 0) {
            logger.info(lang.msgNotFound);
            return;
        }
        scrollPane.paneTitle.innerHTML = title + listLength;
        scrollPane.scrollArea.innerHTML = '';
        var table = createDOMElement('table', 'tracker-table', scrollPane.scrollArea);
        table.onclick = function (e) {
            if (e.target.tagName.toLowerCase() === 'td') {
                var objid = e.target.parentNode.lastChild.innerHTML;
                map.locateObject(objid);
                scrollPane.pane.hidden = true;
            }
        };
        var hdr = createDOMElement('tr', '', table), cell;
        for (var i in lang.hdrSourceTable) {
            createDOMElement('th', 'tracker-cell', hdr)
                    .innerHTML = lang.hdrSourceTable[i];
        }

        for (var i = 0; i < listLength; i++) {
            var obj = list[i];
            var src = obj.source;
            var row = createDOMElement('tr', 'tracker-table', table);
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = (obj.tracked ? '*' : '') + (i + 1);
//            createDOMElement('img', 'tracker-table',
//                    createDOMElement('td', 'tracker-cell', row)).src = './images/btn_locate.png';
            createDOMElement('td', 'tracker-cell', row).innerHTML = src.name;
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = src.latitude.toFixed(6);
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = src.longitude.toFixed(6);
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = src.accuracy.toFixed(1);
            let heading = src.heading === null ? '-' : src.heading.toFixed(1);
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = heading;
            createDOMElement('td', 'tracker-cell-number', row)
                    .innerHTML = (src.speed * 3.6).toFixed(0); // km/h
            createDOMElement('td', 'tracker-cell', row)
                    .innerHTML = (new Date(src.timestamp)).toLocaleString(); // TODO swap date/time
            createDOMElement('td', 'tracker-invisible', row)
                    .innerHTML = src.id;
        }
        scrollPane.pane.hidden = false;
        logger.info(lang.msgTapToLocate);
    }
};

export var loggerInfo = {
    pane: createDOMElement('div', 'tracker-console')
};
loggerInfo.pane.hidden = true;
