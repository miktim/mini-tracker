/* 
 * LiteRadar tracker, MIT (c) 2019-2024 miktim@mail.ru
 */
import {createDOMElement, formatTime, TrackerDOMTable} from './util.js';
import {lang} from './messages.js';
import {map} from './map.js';
import {logger} from './logger.js';

function TrackerPane(style = 'tracker-pane', hidden = false) {
    this.pane = createDOMElement('div', style);
    this.pane.hidden = hidden;
}

function TrackerTitledPane(style = 'tracker-pane', hidden = true) {
    this.pane = createDOMElement('div', 'tracker-pane');
    this.pane.hidden = hidden;
//    this.divTitle;
//    this.divContent;
    var div = createDOMElement('div', 'tracker-title', this.pane);
    this.divTitle = createDOMElement('div', 'tracker-title-text', div);
    var img = createDOMElement('img', 'tracker-title', div);
    img.src = './images/btn_close.png';
    img.onclick = (function (e) {
        this.hide();
    }).bind(this);
    this.divContent = createDOMElement('div', style, this.pane);
    this.show = function(title, content) {
        this.divTitle.innerHTML = title;
        this.divContent.innerHTML = '';
        this.divContent.appendChild(content);
        this.pane.hidden = false;
    };
    this.hide = function() {
        this.pane.hidden = true;
    };
}

export var mainMenu = new TrackerPane('tracker-button');
// TODO function addButton
export var createMainMenu = function () {
    var pane = mainMenu.pane;

    var menuItems = [
        {img: './images/btn_locate.png', title: lang.actionSetCenter, onclick: function () {
                map.setCenterToLocation();
            }},
        {img: './images/btn_bound.png', title: lang.actionShowAll, onclick: function () {
                map.fitAllObjects();
            }},
        {img: './images/btn_history.png', title: lang.actionHistory, onclick: function () {
                logger.showHistory();
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

export var infoPane = new TrackerTitledPane();
infoPane.divContent.onclick = function (e) {
    var pane = infoPane.pane;
    if (!pane.style.marginLeft) {
        pane.style.marginLeft = '-130px';
    } else {
        pane.style.marginLeft = '';
    }
};

// TODO prompt to shift left
export var trackInfo = {
    create: function (info, title) {
        infoPane.divTitle.innerHTML = title;
        infoPane.divContent.innerHTML = '';
        infoPane.pane.hidden = false;
        var clientRect = infoPane.divContent.getBoundingClientRect();
        var table = new TrackerDOMTable({rowClasses: ['', 'tracker-cell-wide']});
        table.tableNode.style.maxWidth = Math.max(200, clientRect.width) + 'px';
        table.addRow([lang.tblNodeInfo[0], info.index + 1]);
        table.addRow([lang.tblNodeInfo[1], formatTime(info.totalTime)]);
        table.addRow([lang.tblNodeInfo[2], (info.path / 1000).toFixed(3)]);
        table.addRow([lang.tblNodeInfo[3], (info.speed * 3.6).toFixed(0)]);
        table.addRow([lang.tblNodeInfo[4], info.heading ? info.heading.toFixed(1) : '-']);
        table.addRow([lang.tblNodeInfo[5], info.course ? info.course.toFixed(1) : '-']);
        infoPane.show(title,table.tableNode);
    }
};

export var scrollPane = new TrackerTitledPane('tracker-scroll');
var setScrollPaneSize = function (e) {
    var newHeight = ((window.innerHeight || document.documentElement.clientHeight) - 145) + 'px';
    var newWidth = ((window.innerWidth || document.documentElement.clientWidth) - 25) + 'px';
    if (newHeight !== scrollPane.divContent.style.maxHeight ||
            newWidth !== scrollPane.divContent.style.maxWidth) {
        scrollPane.divContent.style.maxHeight = newHeight;
        scrollPane.divContent.style.maxWidth = newWidth;
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

// TODO mark outdated
export var objectList = {
    create: function (list, title) {
        scrollPane.hide();
        var listLength = list.length;
        if (listLength === 0) {
            logger.info(lang.msgNotFound);
            return;
        }
        title += listLength;

        var table = new TrackerDOMTable({header: lang.hdrSourceTable});
        table.tableNode.onclick = function (e) {
            if (e.target.tagName.toLowerCase() === 'td') {
                var objid = e.target.parentNode.lastChild.innerHTML;
                map.locateObject(objid);
                scrollPane.pane.hidden = true;
            }
        };
        table.tableInfo.rowClasses = [
            'tracker-cell-number',
            '',
            'tracker-cell-number',
            'tracker-cell-number',
            'tracker-cell-number',
            'tracker-cell-number',
            'tracker-cell-number',
            '',
            'tracker-invisible'
        ];
        for (var i = 0; i < listLength; i++) {
            var obj = list[i];
            var src = obj.source;
            table.addRow([
                (obj.tracked ? '*' : '') + (i + 1),
                src.name,
                src.getPosition()[0].toFixed(7), // latitude
                src.getPosition()[1].toFixed(7), // longitude
                src.accuracy.toFixed(1),
                src.heading ? src.heading.toFixed(1) : '-',
                src.speed ? (src.speed * 3.6).toFixed(0) : '-', // km/h
                (new Date(src.timestamp)).toLocaleString(), // TODO swap date/time
                src.id]);
        }
        scrollPane.show(title, table.tableNode);
        logger.info(lang.msgTapToLocate);
    }
};

export var loggerPane = new TrackerPane('tracker-console',true);
