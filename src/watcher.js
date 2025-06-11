/* 
 * LiteRadar Leaflet tracker, MIT (c) 2019-2025 miktim@mail.ru
 * Geolocation watcher
 * See https://w3c.github.io/geolocation-api/#examples
 */
import {options} from './options.js';
import {Source} from './objects.js';
import {update} from './util.js';
import {logger} from './logger.js';
import {lang} from './messages.js';

export var geolocationWatcher = {
    watchId: null,
    interval: null,
    timeout: 0,
    lastSource: null,

    start(timeout = options.watch, highAccuracy = true) {
        this.timeout = timeout;
        if (!('geolocation' in navigator)) {
            logger.error({
                type: 'locationerror',
                code: 0,
                message: lang.locationerror[0]
            });
            return;
        }
        if (this.watchId)
            this.stop();
        renewLastSource();
        this.watchId = navigator.geolocation.watchPosition(
                onLocationFound,
                onLocationError,
                {
                    timeout: timeout * 1000,
                    enableHighAccuracy: highAccuracy,
                    maximumAge: (timeout * 1000) + 500
                }
        );
        this.interval = setInterval(function (self) {
            if (self.lastSource.accuracy) {
                self.lastSource.update();
                renewLastSource();
            }
        }, timeout * 1000, this);

    },

    stop() {
        if (this.watchId) {
            clearInterval(this.interval);
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
};

var renewLastSource = (function () {
    this.lastSource = new Source({
        name: lang.ownName,
        iconid: 4,
        timeout: this.timeout * 2});
}).bind(geolocationWatcher);

var onLocationFound = (function (l) {
    if (this.lastSource.accuracy > l.coords.accuracy || !this.lastSource.accuracy) {
        update(this.lastSource, l.coords);
//        this.lastSource.setPosition(
//                [l.coords.latitude, l.coords.longitude]);
        this.lastSource.timestamp = l.timestamp;
    }
}).bind(geolocationWatcher);

var onLocationError = (function (e) {
    if (e instanceof GeolocationPositionError)
        logger.log('Watcher. ' + lang.locationerror[e.code]);
    else
        logger.error(e);
}).bind(geolocationWatcher);

