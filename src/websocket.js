/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru 
 */
import {options} from './options.js';
import {onAction} from './exchanger.js';
import {logger} from './logger.js';
import {lang} from './lang.js';

export var webSocket = {

    websocket: null,
    error: null,
    start(host = options.websocket) {
        if (host && !this.websocket) {
            var wsurl = (window.location.protocol === 'https:' ? 'wss:' : 'ws:') +
                    host.replace('ws:', '').replace('wss:', '');
            try {
                this.websocket = new WebSocket(wsurl);
                this.websocket.onmessage = function (e) {
                    if (typeof e.data === 'string')
                        onAction(e.data);
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
       if(this.websocket) this.websocket.send(message);  
    },
    stop() {
        if (this.websocket) {
            this.websocket.close();
        }
    }
};

var onClose = (function (e) {
    if (!this.error)
        logger.log(lang.msgWsClosed + e.target.url);
    this.websocket = null;
    this.error = null;
}).bind(webSocket);

var onError = (function (e) {
    this.error = e;
    e.message = lang.errWebSocket + e.target.url;
    logger.error(e);
}).bind(webSocket);
