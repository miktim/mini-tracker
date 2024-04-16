/* 
 * LiteRadar tracker, MIT (c) 2023-2024 miktim@mail.ru
 */
import {options} from './options.js';
import {update} from './util.js';

// TODO trackererror[]
export var lang = {
    lang: 'en-US',
    ownName: "I",
    fmtReady: "Tracker v%1$ ready",
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
        'Outdated object',
        'Internal error'
    ], //???
    msgWsOpen: 'WebSocket is open: ',
    fmtWsClosed: 'WebSocket closed: %1$ %2$',
    actionHistory: 'Message history',
    actionShowAll: 'Show all objects',
    actionSetCenter: 'Center map to location',
    actionSearch: ' Search',
    msgHistory: 'Message history: ',
    msgWildcards: 'Search wildcards: ? *',
    msgFound: 'Found: ',
    msgNotFound: 'Nothing found...',
    msgTapToLocate: 'Tap the name to locate',
    hdrSourceTable: ['', 'Name', 'LAT,deg', 'LON,deg', 'ACC,m', 'HDG,deg','SPD,km/h', 'Timestamp'],
//    msgTrackToClipboard: "Track's GeoJSON copied to clipboard",
    msgGeoJSON: 'GeoJSON of the track in the clipboard',
    msgNodeInfo: 'Track: ',
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
    ownName: 'Я',
    fmtReady: "Трекер v%1$ готов к работе",
    msgLocWaiting: 'Ожидаю координаты...',
    locationerror: [
        'Ошибка геолокации: не поддерживается',
        'Ошибка геолокации: отказано в доступе',
        'Ошибка геолокации: недоступно',
        'Ошибка геолокации: таймаут',
        'Ошибка геолокации: сервис недоступен'],
    msgWsOpen: 'WebSocket открыт: ',
    fmtWsClosed: 'WebSocket закрыт:  %1$ %2$',
    actionShowAll: 'Показать все объекты',
    actionHistory: 'История сообщений',
    actionSetCenter: 'Центрировать по месту',
    actionSearch: ' Поиск',
    msgHistory: 'История сообщений: ',
    msgWildcards: 'Символы подстановки: ? *',
    msgFound: 'Найдено: ',
    msgNotFound: 'Ничего не найдено...',
    msgTapToLocate: 'Для показа коснитесь имени',
    hdrSourceTable: ['', 'Имя', 'Широта,deg', 'Долгота,deg', 'Точность,m', 'Пеленг,deg','Скорость,km/h', 'Время'],
    msgGeoJSON: 'GeoJSON трека в буфере обмена',
    msgNodeInfo: 'Трек: ',
    tblNodeInfo: ['Узел','Время', 'Путь,km', 'Скорость,km/h', 'Пеленг,deg', 'Курс,deg'],
    actionAbout: 'About'
    
};