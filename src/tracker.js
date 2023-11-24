/* 
 * LiteRadar tracker, MIT (c) 2023 miktim@mail.ru
 */

import {loadTracker} from './loader.js';
import {Source, Message, Evented} from './objects.js';
import {webview} from './exchanger.js';
import {map} from './map.js';
import * as geoUtil from './geoUtil.js';
import * as util from './util.js';

//(function (window, document) {
export var tracker = new Evented({
    version: '0.3',
    load: function (mapid = 'map', options = {}) {
        loadTracker(mapid, options);
    },
    SourceLocation: function (src) {
        return new Source(src);
    },
    Message: function (msg) {
        return new Message(msg);
    },
    whenReady: function (handler) {
        if('whenReady' in map) {
            map.whenReady(handler,{map: map});
        } else {
            this.once('ready', handler);
        }
    },
    getMap: function () {
        return map;
    },
    geoUtil: geoUtil,
    util: util,
    webview: webview
});

window.tracker = tracker;
//}(window, document));
