/* 
 * LiteRadar tracker, MIT (c) 2023 miktim@mail.ru
 */
import {options} from './options.js';
import {update} from './util.js';

// TODO trackererror[]
export var lang = {
    lang: 'en-US',
    ownName: "It's me",
    msgLocWaiting: 'Waiting for a location...',
    locationerror: [
        'Geolocation error: no such service',
        'Geolocation error: permission denied',
        'Geolocation error: position unavailable',
        'Geolocation error: timeout expired',
        'Geolocation error: service unavilable'],
    error: [], //???
    msgWsOpen: 'WebSocket is open: ',
    msgWsClosed: 'WebSocket closed: ',
    errWebSocket: 'WebSocket connection failed: ', //???
    actionShowAll: 'Show all objects',
    actionSetCenter: 'Center map to location',
    actionSearch: ' Search',
    msgWildcards: 'Search wildcards: ? *',
    msgFound: 'Found: ',
    msgNotFound: 'Nothing found...',
    msgTapToLocate: 'Tap the name to locate',
    hdrSourceTable: ['', 'Name', 'LAT,deg', 'LON,deg', 'ACC,m', 'HDG,deg','SPD,km/h', 'Timestamp'],
//    msgTrackToClipboard: "Track's GeoJSON copied to clipboard",
    hdrNodeInfo: 'Track: %1$',
    tblNodeInfo: ['Node','Time', 'Path,km', 'Speed,km/h', 'Heading,deg', 'Course,deg'],
    actionAbout: 'About',
    set: function () {
        var langsKey = options.lang.split('-')[0].split('_')[0];
        if (langs[langsKey])
            update(this,langs[langsKey]);
    }
};
// TODO lang ru-RU
var langs = [];
langs['ru'] = {
    lang: 'ru-RU',
    ownName: 'Это я',
    msgLocWaiting: 'Ожидаю координаты...'
};