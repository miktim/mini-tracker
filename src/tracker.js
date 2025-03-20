/* 
 * LiteRadar tracker, MIT (c) 2023-2025 miktim@mail.ru
 */

import {loadTracker} from './loader.js';
import {Source, Message, Evented} from './objects.js';
import {interfaces} from './exchanger.js';
import {map} from './map.js';
import * as geoUtil from './geoUtil.js';
import * as util from './util.js';

//(function (window, document) {
export var tracker = new Evented({
    version: '1.4.3',
    load: function (mapid = 'map', options = {}) {
        loadTracker(mapid, options);
    },
    SourceLocation: function (src) {
        return new Source(src);
    },
    Message: function (msg) {
        return new Message(msg);
    },
    getMap: function () {
        return map;
    },
    whenReady: function (listener) {
        if ('trackerReady' in map) {
            listener({readyObj: map.trackerReady});
        } else {
            this.once('trackerready', function (e) {
                listener({readyObj: map.trackerReady});
            });
        }
    },
    geoUtil: geoUtil,
    util: util,
    webview: {
        toTracker: interfaces.webview.from,
        fromTracker: function(eventJson) {
        }
    }
});

window.Tracker = tracker;

//}(window, document));
