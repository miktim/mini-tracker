/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2023 miktim@mail.ru
 * Geolocation watcher
 */

import {options} from './options.js';
import {map} from './map.js';
import {Source} from './objects.js';
import {update, extend} from './util.js';
import {logger} from './logger.js';
import {exchanger} from './exchanger.js';

export var geolocationWatcher = {
    source: new Source({accuracy: 1000000, iconid: 4}),
    interval: null,
    start(timeout = options.watch) {
        this.stop();
        map.locate({watch: true, timeout: timeout * 1000})
                .on('locationfound', onLocationFound)
                .on('locationerror', onError);
        map.locate({watch: true, timeout: timeout * 1000, enableHighAccuracy: true})
                .on('locationfound', onLocationFound);
        this.interval = setInterval(function (self) {
            if (self.source.latitude)
                self.source.update();
            self.source.accuracy = 1000000;
        }, timeout * 1000, this);
    },
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            map.stopLocate();
        }
    }
};

var onLocationFound = (function (e) {
    if (e.timestamp >= this.source.timestamp && e.accuracy < this.source.accuracy) {
        this.source.setLatLng(e.latlng);
        update(this.source, e);
    }
}).bind(geolocationWatcher);

var onError = (function (e) {
    logger.error(e);
}).bind(geolocationWatcher);

var locationGetAction = function (opts) {
    map.locate(update({timeout: options.watch * 1000, maximumAge: 0, enableHighAccuracy: false}, opts))
            .on('locationfound', function (e) {
                exchanger.fromTracker(toJSON(extend(e, {event: 'locationfound'})));
            })
            .on('locationerror', function (e) {
                throw e;
            });
};
