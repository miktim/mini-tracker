/* 
 * LiteRadar tracker logger, MIT (c) 2019-2023 miktim@mail.ru
 */
import {loggerInfo} from './dom.js';
import {lang} from './lang.js';

export var logger = {
    log: function (msg, timeout = 3) {
        console.log(msg);
        this.update(msg, timeout);
    },
    error: function (e, timeout = 3) {
        console.log(e);
        var msg = e.code ? lang[e.type][e.code] : e.message;
        this.update(msg, timeout);
    },
    info: function (msg, timeout = 3) {
        this.update(msg, timeout);
    },
    timer: null,
    pane: loggerInfo.pane,
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
    }

};