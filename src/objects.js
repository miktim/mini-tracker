/* 
 * LiteRadar tracker, MIT (c) 2019-2024 miktim@mail.ru
 */
import {map} from "./map.js";
import {options} from './options.js';
import {lang} from './messages.js';
import {interfaces} from './exchanger.js';
import {merge, update, extend, format} from './util.js';
import {logger} from './logger.js';
import {tracker} from './tracker.js';
import * as geoUtil from "./geoUtil.js";

Number.prototype.between = function (min, max) {
    return this >= min && this <= max;
};

export function TrackerError(code = 0, object) {
    this.code = code;
    this.message = lang.trackererror[code];
    this.type = 'trackererror';
    this.trackerObj = object;
//    this.stack;
}
TrackerError.prototype = new Error();  //

export function Source(s) {
    this.id = 'LiteRadar tracker'; // required, string, unique 'transponder' id
    this.name = 'tracker'; // string, 'transponder' name
    this.iconid = 0; //
    this.point = [undefined, undefined];
//    this.latitude = undefined; // required, degrees (-90 : 90), WGS-84
//    this.longitude = undefined; // required, degrees (-180 : 180), WGS-84
    this.accuracy = undefined; // required, meters (0:..., radius)
    this.speed = 0; // meters per second (0:...) (GNSS)
    this.heading = 0; // degrees (0:360) counting clockwise from true North (GNSS)
    this.timestamp = Date.now(); // acquired time in milliseconds (EpochTimeStamp)
    this.timeout = options.watch; // seconds (0:...) location lifetime
    update(this, s);
}

Source.prototype = {
    getLatLng : function () {
        return {lat: this.point[0], lng: this.point[1]};
    },
    setLatLng : function (latlng) {
        this.point[0] = latlng.lat;
        this.point[1] = latlng.lng;
        return this;
    },
    getPosition : function () {
        return this.point;
    },
    setPosition : function (position) {
        this.point = position;
        return this;
    },
    update : function () { 
        interfaces.javascript.from(merge({action: 'update:locationsource'}, this));
        return this;
    }
};

export var trackerObjects = [];

export function checkSource(src) {
    if (!(src.id && src.point
            && src.point[0] && src.point[0].between(-90, 90) // latitude
            && src.point[1] && src.point[1].between(-180, 180) // longitude
            && src.accuracy && src.accuracy > 0
            && src.timestamp && Date.now() >= src.timestamp)) {
        throw new TrackerError(3, src);
    }
    src.name = src.name || 'unknown';
    src.timeout = src.timeout || options.outdatingDelay;
    src.speed = src.speed || 0;
    src.heading = src.heading || 0;
    src.iconid = (src.iconid && src.iconid.between(0,4)) || 0;
    let prevSrc = trackerObjects[src.id]; // map depended
    if (prevSrc) {
        prevSrc = prevSrc.getSource();
        if (src.timestamp <= prevSrc.timestamp)
            throw new TrackerError(4, src); // outdated location
// calc heading, speed 
        let pos = src.point;
        let prevPos = prevSrc.point;
        src.heading = geoUtil.heading(prevPos, pos);
        src.speed = geoUtil.distance(prevPos, pos) /
                ((src.timestamp - prevSrc.timestamp) / 1000);
    }
}

export function Evented(extension = {}) {
    var evented = new EventTarget();
    evented.on = function (event, listener) {
        this.addEventListener(event, listener);
        return this;
    };
    evented.once = function (event, listener) {
        this.addEventListener(event, listener, {once: true});
        return this;
    };
    evented.off = function (event, listener) {
        this.removeEventListener(event, listener);
        return this;
    };
    return extend(evented, extension);
}

export function Message(m) {
    this.message = m;
    this.update = function () {
        interfaces.javascript.from(merge({action: 'update:message'}, this));
        return this;
    };
}

export function MapSource(src) {
    this.id = src.id;
    this.name = src.name;
}

export function SourceListEntry(src, tracked) {
    this.id = src.id;
    this.source = src;
    this.tracked = tracked;
}

// TODO remove after 10 outdates, getSource
export var objectsWatcher = {
    interval: null,

    start(delay = options.outdatingDelay) { //delay in seconds
        this.stop();
        if (!this.interval)
            this.interval = setInterval(function () {
                for (var id in trackerObjects) {
                    var obj = trackerObjects[id];
                    if ('outdated' in obj) {
                        var src = obj.getSource();
                        var timeToDie = src.timestamp + (src.timeout * 10000);
                        var timeToDim = src.timestamp + (src.timeout * 1000);
                        if (timeToDie < Date.now()) {
                            obj.remove(); // remove from map
                        } else if (timeToDim < Date.now())
                            obj.outdated();
                    }
                }
            }, delay * 1000);
    },

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
};    