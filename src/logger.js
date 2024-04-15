/* 
 * LiteRadar tracker logger, MIT (c) 2019-2024 miktim@mail.ru
 */
import {loggerPane, scrollPane} from './dom.js';
import {options} from './options.js';
import {TrackerDOMTable, formatTime} from './util.js';
import {lang} from './messages.js';

export var logger = {
    log: function (msg, timeout = options.logger.messageDelay) {
        console.log(msg);
        this.update(msg, timeout);
        this.addToHistory(msg);
    },
    error: function (e, timeout = options.logger.messageDelay) {
        console.log(e);
        var msg = e.code ? lang[e.type][e.code] : e.message;
        this.update(msg, timeout);
        this.addToHistory(msg);
    },
    info: function (msg, timeout = options.logger.messageDelay) {
        this.update(msg, timeout);
    },
    timer: null,
    pane: loggerPane.pane,
    update: function (msg, timeout) {
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
    addToHistory: function (msg) {
        if (this.history.length >= options.logger.historyLength)
            this.history.pop();
        this.history.unshift({time: Date.now(), message: msg});
    },
    showHistory: function () {
        var title =
                lang.msgHistory + this.history.length;
        var tdt = new TrackerDOMTable();
        for (var i = 0; i < this.history.length; i++) {
            tdt.addRow([this.history.length - i,
                new Date(this.history[i].time).toLocaleTimeString()
                        + " " + this.history[i].message
            ]);
        }
        scrollPane.show(title, tdt.tableNode);
    }

};