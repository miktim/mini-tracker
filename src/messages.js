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
    fmtObjCreate: 'Object \'%1$\' created',
    fmtObjDelete: 'Object \'%1$\' deleted',
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
    msgGeoJSON: 'GeoJSON of the track in the clipboard',
    msgTrack: 'Track: ',
    fmtTrkStart: 'Tracking \'%1$\' started',
    fmtTrkStop: 'Tracking \'%1$\' stopped',
    dict: {
        nme: 'Name',
        lat: 'LAT,deg',
        lng: 'LON,deg',
        acc: 'ACC,m',
        hdg: 'HDG,deg',
        crs: 'CRS,deg',
        spd: 'V,km/h',
        spa: 'Vavg,km/h',
        dis: 'D,km',
        tms: 'Timestamp',
        tme: 'T,h:mm:ss',
        nde: 'Node',
        pth: 'S,km'
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
    fmtObjCreate: 'Создан объект \'%1$\'',
    fmtObjDelete: 'Удален объект \'%1$\'',
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
    fmtTrkStart: 'Трекинг \'%1$\' начат',
    fmtTrkStop: 'Трекинг \'%1$\' остановлен',
    dict: {
        nme: 'Имя',
        lat: 'LAT,град',
        lng: 'LON,град',
        acc: 'ACC,м',
        hdg: 'HDG,град',
        crs: 'CRS,град',
        spd: 'V,км/ч',
        spa: 'Vср,км/ч',
        tms: 'Штамп времени',
        tme: 'T,ч:мм:сс',
        dis: 'D,км',
        nde: 'Узел',
        pth: 'S,км'
    },
    actionAbout: 'About'
    
};