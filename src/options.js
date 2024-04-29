/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {update, getUrlSearchParameter} from './util.js';
import {lang} from './messages.js';

export var options = {
    mode: '', // debug, demo, watch
    websocket: '', // WebSocket URI
    watch: 5, // seconds, waiting time for location determination
    track: {
        deviation: 7, // degrees
        minDistance: 20, // meters min track segment length
        maxDistance: 1000 // meters
    },
    outdatingDelay: 10, // seconds, check outdated objects
    logger: {
        messageDelay: 3,
        historyLength: 50
    },
    map: {
        defaultZoom: 16, // default zoom
        minZoom: 4
    },
    lang: 'en_US',

    update: function (opts = {}) {
        update(this, opts);
        lang.set();
    },
    checkMode: function (mode) {
        var ismode = (new RegExp('(^|,)' + mode + '(,|$)', 'i')).test(this.mode);
        return ismode;
    }
};

// parse url search parameters
options.mode = getUrlSearchParameter('mode') || options.mode;
options.websocket = getUrlSearchParameter('websocket') || options.wsURL;
options.lang = getUrlSearchParameter('lang') || navigator.language || options.lang;
var param = getUrlSearchParameter('watch');
if (param) {
    options.watch = parseInt(param);
}
param = getUrlSearchParameter('track');
if (param) {
    param = param.split(':');
    options.track.deviation = Number(param[0]) || options.track.deviation;
    options.track.minDistance = Number(param[1]) || options.track.minDistance;
    options.track.maxDistance = Number(param[2]) || options.track.maxDistance;
}



