/* 
 * LiteRadar tracker, MIT (c) 2019-2024 miktim@mail.ru
 */
import {formatTime} from './util.js';
import {lang} from './messages.js';
import {map} from './map.js';
import {logger} from './logger.js';

export function createDOMElement(tagName, className, container) {
    var el = document.createElement(tagName);
    if (className)
        el.className = className;
    if (container) {
        container.appendChild(el);
    }
    return el;
}

function addDOMTableRow(rowData, rowClasses, tableEl, tag) {
    rowData = rowData || []; rowClasses = rowClasses || []; tag = tag || 'td';
    var rowEl = createDOMElement('tr', 'tracker-table', tableEl);
    for (var coli = 0; coli < rowData.length; coli++) {
        var className = rowClasses[coli] ? rowClasses[coli] : 'tracker-table';
        createDOMElement(tag, className, rowEl).innerHTML = rowData[coli];
    }
    return rowEl;
}

export function TrackerDOMTable(tableInfo, container) {
    tableInfo = tableInfo || {};
    this.tableNode = createDOMElement('table', 'tracker-table', container);
    this.tableInfo = tableInfo;
    this.addRow = function (rowData, rowCls) {
        rowCls = rowCls || this.tableInfo.rowClasses;
        return addDOMTableRow(rowData, rowCls, this.tableNode, 'td');
    };
    this.addHeader = function (rowData, rowCls) {
        rowCls = rowCls || this.tableInfo.rowClasses;
        return addDOMTableRow(rowData, rowCls, this.tableNode, 'th');
    };
    if ('header' in tableInfo) {
        this.addHeader(tableInfo.header);
    }
    if ('table' in tableInfo) {
        for (var rowi = 0; rowi < tableInfo.table.length; rowi++) {
            this.addRow(tableInfo.table[rowi]);
        }
}
}

function TrackerPane(style, hidden) {
    style = style || 'tracker-pane';
    hidden = hidden || false;
    this.pane = createDOMElement('div', style);
    this.pane.hidden = hidden;
}

function TrackerTitledPane(style, hidden) {
    style = style || 'tracker-pane';
    hidden = hidden || true;
    this.pane = createDOMElement('div', 'tracker-pane');
    this.pane.hidden = hidden;
    var div = createDOMElement('div', 'tracker-title', this.pane);
    this.divTitle = createDOMElement('div', 'tracker-title-text', div);
    var img = createDOMElement('img', 'tracker-title', div);
    img.src = './images/btn_close.png';
    img.onclick = (function (e) {
        this.close();
    }).bind(this);
    this.divContent = createDOMElement('div', style, this.pane);
    this.show = function (title, content) {
        this.divTitle.innerHTML = title;
        this.divContent.innerHTML = '';
        this.divContent.appendChild(content);
        this.pane.hidden = false;
    };
    this.hide = function () {
        this.pane.hidden = true;
    };
    this.closeHandler = null;
    this.close = function() {
      if(this.closeHandler) this.closeHandler(this);
      this.closeHandler = null;
      this.hide();
    };
    this.onClose = function(handler) {
        this.closeHandler = handler;
    };
}

export var mainMenu = new TrackerPane('tracker-button');
// TODO function addButton
export var createMainMenu = function () {
    var pane = mainMenu.pane;

    var menuItems = [
        {img: './images/btn_locate.png', title: lang.btnSetCenter, onclick: function () {
                map.setCenterToLocation();
            }},
        {img: './images/btn_bound.png', title: lang.btnShowAll, onclick: function () {
                map.fitAllObjects();
            }},
        {img: './images/btn_history.png', title: lang.btnHistory, onclick: function () {
                logger.showHistory();
            }},
        {img: './images/btn_track.png', title: lang.btnCopyTrack, onclick: function() {
                map.tracking.copyToClipboard(); 
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
        try {
            map.showObjectList(e.target.searchCriteria.value);
        } catch (e) {
            logger.error(e);
        }
        return false;
    };
    var inp = createDOMElement('input', 'tracker-search', frm);
    inp.type = 'text';
    inp.name = 'searchCriteria';
    inp.placeholder = lang.actionSearch;
    inp.autocomplete = 'off';
};

export var infoPane = new TrackerTitledPane('tracker-scroll');
infoPane.divContent.style.maxHeight = '150px';
infoPane.divContent.style.width = '200px';

infoPane.divContent.onclick = function (e) {
    var pane = infoPane.pane;
    if (!pane.style.marginLeft) {
        var clientRect = infoPane.divContent.getBoundingClientRect();
        pane.style.marginLeft = -(clientRect.width - 70)+'px';
    } else {
        pane.style.marginLeft = '';
    }
};

export var listPane = new TrackerTitledPane('tracker-scroll');
var setScrollPaneSize = function (e) {
    var newHeight = ((window.innerHeight || document.documentElement.clientHeight) - 145) + 'px';
    var newWidth = ((window.innerWidth || document.documentElement.clientWidth) - 25) + 'px';
    if (newHeight !== listPane.divContent.style.maxHeight ||
            newWidth !== listPane.divContent.style.maxWidth) {
        listPane.divContent.style.maxHeight = newHeight;
        listPane.divContent.style.maxWidth = newWidth;
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

export var loggerPane = new TrackerPane('tracker-console', true);
