/* 
 * LiteRadar tracker, MIT (c) 2023-2024 miktim@mail.ru
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
    trackererror: [
        'Unknown error',
        'JSON parse error',
        'Unknown action or action object',
        'Object property is missing or invalid',
        'Outdated object'
    ], //???
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
    msgLocWaiting: 'Ожидаю координаты...',
    locationerror: [
        'Ошибка геолокации: не поддерживается',
        'Ошибка геолокации: отказано в доступе',
        'Ошибка геолокации: недоступно',
        'Ошибка геолокации: таймаут',
        'Ошибка геолокации: сервис недоступен'],
    msgWsOpen: 'WebSocket открыт: ',
    msgWsClosed: 'WebSocket закрыт: ',
    errWebSocket: 'WebSocket ошибка соединения: ', //???
    actionShowAll: 'Показать все объекты',
    actionSetCenter: 'Центрировать по месту',
    actionSearch: ' Поиск',
    msgWildcards: 'Символы подстановки: ? *',
    msgFound: 'Найдено: ',
    msgNotFound: 'Ничего не найдено...',
    msgTapToLocate: 'Для показа коснитесь имени',
    hdrSourceTable: ['', 'Имя', 'Широта,deg', 'Долгота,deg', 'Точность,m', 'Пеленг,deg','Скорость,km/h', 'Время'],
//    msgTrackToClipboard: "Track's GeoJSON copied to clipboard",
    hdrNodeInfo: 'Трек: %1$',
    tblNodeInfo: ['Узел','Время', 'Путь,km', 'Скорость,km/h', 'Пеленг,deg', 'Курс,deg'],
    actionAbout: 'About'
    
};