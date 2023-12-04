/* 
 * LiteRadar Leaflet tracker, MIT (c) 2023 miktim@mail.ru
 */

import {map, loadMap} from './map.js';
import {geolocationWatcher} from './watcher.js';
import {options} from './options.js';
import {objectsWatcher} from './objects.js';
import {webSocket} from './websocket.js';
import {getMobileOperatingSystem} from './util.js';

var activities = [];

export function loadTracker(mapid, opts = {}) {
    options.update(opts);
    loadMap(mapid);
    var noSleep = new NoSleep();
    noSleep.stop = noSleep.disable;
    activities = [objectsWatcher, geolocationWatcher, webSocket, noSleep];
    window.addEventListener('unload', unloadTracker);
    if (options.checkMode('watch'))
        geolocationWatcher.start();
    if (options.websocket)
        webSocket.start();
    objectsWatcher.start();
// see: https://github.com/richtr/NoSleep.js
    if (getMobileOperatingSystem())
        noSleep.enable();
}

function unloadTracker(e) {
    for (var i in activities) {
        var activity = activities[i];
        if (typeof activity === 'object' && 'stop' in activity)
            activity.stop();
    }
    map.remove();
}

