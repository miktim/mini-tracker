/* 
 * LiteRadar tracker, MIT (c) 2019-2024 miktim@mail.ru 
 */
import {options} from './options.js';
import {interfaces} from './exchanger.js';
import {logger} from './logger.js';
import {format} from './util.js';
import {lang} from './messages.js';

export var webSocket = {
    subprotocol: 'tracker.miktim.org',
    websocket: null,
    error: null,
    start(host = options.websocket) {
        if (host && !this.websocket) {
            try {
                var wsurl = (window.location.protocol === 'https:' ? 'wss:' : 'ws:') +
                        host.replace('ws:', '').replace('wss:', '');
                this.websocket = new WebSocket(wsurl, this.subprotocol);
                this.websocket.onmessage = function (e) {
                    if (typeof e.data === 'string')
                        interfaces.websocket.from(e.data);
                };
                this.websocket.onopen = function (e) {
                    logger.log(lang.msgWsOpen + e.target.url);
                };
                this.websocket.onclose = onClose;
                this.websocket.onerror = onError;
            } catch (e) {
                logger.error(e);
            }
    }
    },
    send(message) {
        if (this.websocket)
            this.websocket.send(message);
    },
    stop() {
        if (this.websocket) {
            this.websocket.close(1001, 'Going away');
        }
    }
};

var onClose = (function (e) {
    if (this.error)
        logger.log(lang.msgWsError + e.code);
    else
        logger.log(format(lang.fmtWsClosed, e.code, e.reason), 10); // TODO e.reason
    this.websocket = null;
    this.error = null;
}).bind(webSocket);

var onError = (function (e) { 
    this.error = e;
// websocket.onclose is called anyway
}).bind(webSocket);
