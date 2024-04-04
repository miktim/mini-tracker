/* 
 * LiteRadar Leaflet tracker, MIT (c) 2019-2022 miktim@mail.ru
 * Geolocation watcher
 * See https://w3c.github.io/geolocation-api/#examples
 */
import {options} from './options.js';
//import {map} from './map.js';
import {Source} from './objects.js';
import {update, extend} from './util.js';
import {logger} from './logger.js';
//import {exchanger} from './exchanger.js';
import {lang} from './lang.js';

export var geolocationWatcher = {
    watchId : null,
    interval : null,
    timeout: 0,
    lastSource : null,

    start(timeout = options.watch, highAccuracy = true) {
        this.timeout = timeout;
        if (!('geolocation' in navigator)) {
            logger.error({
                type: 'locationerror',
                code: 4,
                message: lang.locationerror[4]
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
                    maximumAge: 0
                }
        );
        this.interval = setInterval(function (self) {
            if(self.lastSource.latitude) {
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

var renewLastSource = (function() {
     this.lastSource = new Source({
         name: lang.ownName,
         accuracy: 1000000, 
         iconid: 4,
         timeout: this.timeout});
}).bind(geolocationWatcher);

var onLocationFound = (function (l) {
    if (this.lastSource.accuracy > l.coords.accuracy) {
        update(this.lastSource, l.coords);
        this.lastsource.setPosition(
                [l.coords.latitude, l.coords.longitude]);
        this.lastSource.timestamp = l.timestamp;
    }
}).bind(geolocationWatcher);

var onLocationError = (function (e) {
    logger.error(extend(e,{type:'locationerror'}));
}).bind(geolocationWatcher);

