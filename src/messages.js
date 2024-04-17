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
    msgWsError: 'WebSocket error: ',
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
    msgGeoJSON: 'GeoJSON of the track in the clipboard',
    msgTrack: 'Track: ',
    tblNodeInfo: ['Node','Time', 'Path,km', 'Speed,km/h', 'Heading,deg', 'Course,deg'],
    dict: {
        nme: 'Name',
        lat: 'LAT,deg',
        lng: 'LON,deg',
        acc: 'ACC,m',
        hdg: 'HDG,deg',
        crs: 'CRS,deg',
        spd: 'SPD,km/h',
        dis: 'DIS,km',
        tms: 'Timestamp',
        tme: 'Time',
        nde: 'Node',
        pth: 'Path,km'
    },
    actionAbout: 'About',
    set: function () {
        var langsKey = options.lang.split('-')[0].split('_')[0];
        if (langs[langsKey])
            update(this,langs[langsKey]);
    }
};

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
    msgWsError: 'Ошибка WebSocket: ',
    actionShowAll: 'Показать все объекты',
    actionHistory: 'История сообщений',
    actionSetCenter: 'Центрировать по месту',
    actionSearch: ' Поиск',
    msgHistory: 'История сообщений: ',
    msgWildcards: 'Символы подстановки: ? *',
    msgFound: 'Найдено: ',
    msgNotFound: 'Ничего не найдено...',
    msgTapToLocate: 'Для показа коснитесь имени',
    msgGeoJSON: 'GeoJSON трека в буфере обмена',
    msgTrack: 'Трек: ',
    dict: {
        nme: 'Имя',
        lat: 'LAT,deg',
        lng: 'LON,deg',
        acc: 'ACC,m',
        hdg: 'HDG,deg',
        crs: 'CRS,deg',
        spd: 'SPD,km/h',
        tms: 'Штамп времени',
        tme: 'Время',
        dis: 'DIS,km',
        nde: 'Узел',
        pth: 'Путь,km'
    },
    actionAbout: 'About'
    
};