/* 
 * LiteRadar Leaflet tracker, MIT (c) 2023 miktim@mail.ru
 */

import {geolocationWatcher} from './watcher.js';
import {options} from './options.js';
import {objectsWatcher} from './objects.js';
import {webSocket} from './websocket.js';
import {getMobileOperatingSystem} from './util.js';
import {map, loadMap} from './map.js';

var activities = [];

export function loadTracker(mapid, opts = {}) {
    options.update(opts);
    loadMap(mapid);
    var noSleep = new NoSleep();
    noSleep.stop = noSleep.disable;
    activities = [objectsWatcher, geolocationWatcher, webSocket, noSleep];
    window.addEventListener('beforeunload', unloadTracker);
    if (options.checkMode('watch'))
        geolocationWatcher.start();
    if (options.websocket)
        webSocket.start();
    objectsWatcher.start();
// see: https://github.com/richtr/NoSleep.js
    if (getMobileOperatingSystem())
// Enable wake lock.
// (must be wrapped in a user input event handler e.g. a mouse or touch handler)
        document.addEventListener('click', function enableNoSleep() {
            document.removeEventListener('click', enableNoSleep, false);
            try {
                noSleep.enable();
            } catch (e) {
                console.error(e.message);
            }    
        }, false);
}

function unloadTracker(e) {
    for (var i in activities) {
        var activity = activities[i];
        if (typeof activity === 'object' && 'stop' in activity)
            activity.stop();
    }
    map.remove();
}

