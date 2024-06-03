/* 
 * LiteRadar tracker logger, MIT (c) 2019-2024 miktim@mail.ru
 */
import {loggerPane, listPane, TrackerDOMTable} from './dom.js';
import {options} from './options.js';
import {lang} from './messages.js';

export var logger = {
    log: function (msg, timeout) {
        console.log(msg);
        this.update(msg, timeout);
        this.addToHistory(msg);
    },
    error: function (e, timeout) {
        console.log(e);
        var msg = e.code ? lang[e.type][e.code] : e.message;
        this.update(msg, timeout);
        this.addToHistory(msg);
    },
    info: function (msg, timeout) {
        this.update(msg, timeout);
    },
    timer: null,
    pane: loggerPane.pane,
    update: function (msg, timeout = options.logger.messageDelay) {
        this.cancel();
        this.pane.innerHTML = msg;
        this.pane.hidden = false;
        this.timer = setTimeout(function (self) {
            self.cancel();
        }, timeout * 1000, this);
    },
    cancel: function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
            this.pane.hidden = true;
        }
    },
    history: [],
    historyCount: 0,
    addToHistory: function (msg) {
        this.historyCount++;
        if (this.history.length >= options.logger.historyLength)
            this.history.pop();
        this.history.unshift({time: Date.now(), message: msg});
    },
    showHistory: function () {
        var title =
                lang.msgHistory + this.history.length;
        var hc = this.historyCount;
        var tdt = new TrackerDOMTable();
        for (var i = 0; i < this.history.length; i++) {
            tdt.addRow([hc--,
                new Date(this.history[i].time).toLocaleTimeString()
                        + " " + this.history[i].message
            ],['tracker-cell-number']);
        }
        listPane.show(title, tdt.tableNode);
    }

};