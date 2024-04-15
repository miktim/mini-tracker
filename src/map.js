/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {logger} from "./logger.js";
import {extend, toPosition} from './util.js';
import {options} from './options.js';
import {lang} from './lang.js';
import {MapSource, SourceListEntry, trackerObjects} from './objects.js';
import {createControls} from './map.controls.js'
import {Track} from './map.track.js';
import {tracker} from './tracker.js';
import {interfaces} from './exchanger.js';

export var map = {};

function TrackerReadyEvent() {
    return new Event('trackerready');
}

function fireTrackerReadyEvent() {
    map.trackerReady = { 
        event: 'ready:tracker:' + tracker.version,
        mapCenter: toPosition(map.getCenter())
    };
    interfaces.websocket.to(JSON.stringify(map.trackerReady));
    interfaces.webview.to(JSON.stringify(map.trackerReady));
    logger.log(lang.msgReady);
    tracker.dispatchEvent(new TrackerReadyEvent());
}

export function loadMap(mapid = "map") {
// Prime Meridian (Greenwich)
    var primeMeridian = [51.477928, -0.001545];
    map = L.map(mapid, {center: primeMeridian, zoomControl: false,
        zoom: options.map.defaultZoom, minZoom: options.map.minZoom});
    L.tileLayer(window.location.protocol + '//{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

//    map.fitWorld({padding: [-100, -1000]});

    document.getElementsByClassName('leaflet-control-attribution')[0].onclick =
            function (e) {
                e.preventDefault();
            };

    extend(map, __map);

    map.trackerIcons = [
// gray, blue, green, red, yellow
        map.makeTrackerIcon("./images/phone_0.png"),
        map.makeTrackerIcon("./images/phone_b.png"),
        map.makeTrackerIcon("./images/phone_g.png"),
        map.makeTrackerIcon("./images/phone_r.png"),
        map.makeTrackerIcon("./images/phone_y.png")
    ];

    map.trackerObjectLayer = L.featureGroup().addTo(map); // sources: marker/accuracy
    map.trackLayer = L.layerGroup().addTo(map); // track: polyline/accuracies
    map.tracking = new Track(map, map.trackLayer);
    createControls(map);

    map.locate({setView: true, timeout: options.watch * 1000, watch: false})
            .once('locationfound', function (e) {
//                map.setZoom(options.map.defaultZoom);
                fireTrackerReadyEvent();
            })
            .once('locationerror', function (e) {
                logger.error(e);
                fireTrackerReadyEvent();
            });

    return map;
}

// Monkey patching, sorry
String.prototype.replaceAll = function (f, r) {
// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript    
    return this.split(f).join(r);
};

MapSource.prototype.getSource = function () {
    return this.marker.source;
};
MapSource.prototype.outdated = function () {
//    var src = this.getSource(); // TODO see objectsWatcher
//    if (src.timestamp + (src.timeout * 1000) < Date.now())
        this.marker.setOpacity(0.4);
};
MapSource.prototype.remove = function () {
// this.marker, this.accuracyCircle remove from map.trackerObjectLayer
    this.marker.removeFrom(map.trackerObjectLayer);
    this.accuracyCircle.removeFrom(map.trackerObjectLayer);
};

var __map = {
    setCenterToLocation: function (timeout = options.watch) {
        logger.info(lang.msgLocWaiting, timeout);
//        var zoom = this.getZoom();
        this.locate({setView: true, timeout: timeout * 1000, watch: false}) // milliseconds
                .once('locationfound', function (e) {
                    logger.cancel();
                    this.setZoom(options.map.defaultZoom); // restore zoom
                })
                .once('locationerror', function (e) {
                    logger.error(e);
                });
    },

    searchObjectsByName: function (pattern) { // markers/traps/tracks
        pattern = '^' + pattern.replaceAll('?', '.{1}').replaceAll('*', '.*') + '$';
        var list = [];
        try {// mask regexp {}.[] etc symbols
            var rex = new RegExp(pattern, 'i');
        } catch (e) {
            logger.error(e);
            return list;
        }
        for (var key in trackerObjects) { // 
            if (rex.test(trackerObjects[key].name)) {
                var obj = trackerObjects[key];
                list.push(new SourceListEntry(obj.marker.source, this.tracking.marker === obj.marker));
            }
        }
        return list;
    },

    locateObject: function (objid) {
        var marker = trackerObjects[objid].marker;
        var tmarker = this.tracking.marker || marker;
        if (marker === tmarker) {
            this.setView(marker.getLatLng(), options.map.defaultZoom);
        } else {
//            var bounds = L.latLngBounds()
//                    .extend(marker.getLatLng()).extend(tmarker.getLatLng());
//            this.fitBounds(bounds);
            this.fitAllObjects();
            tmarker.openTooltip();
        }
        marker.openTooltip();
        if (!this.tracking.isMarkerTracked(marker)) {
            setTimeout(function (marker) {
                marker.closeTooltip();
            }, 5000, marker);
        }
    },

    fitAllObjects: function () {
        if (this.hasLayer(this.trackerObjectLayer)) {
            var bounds = this.trackerObjectLayer.getBounds()
                    .extend(this.tracking.track.getBounds());
            if (bounds.isValid())
                this.fitBounds(bounds);
        }
    },

    trackerIcons: [],

    getTrackerIcon: function (iconid = 2) {
        iconid = Math.max(0, Math.min(iconid, this.trackerIcons.length - 1));
        return this.trackerIcons[iconid];
    },

    makeTrackerIcon: function (url, isz) {
        isz = isz || 32;
        return L.icon({
            iconSize: [isz, isz],
            iconAnchor: [isz / 2, isz],
            iconUrl: url
        });
    },

    tracking: null,

    onSourceUpdate: function (src) { // src = action: "source:update"
        var icon = this.getTrackerIcon(src.iconid);
        var mapObject = trackerObjects[src.id];
        var srcLatLng = src.getLatLng();
        if (!mapObject) {
            mapObject = new MapSource(src);
            mapObject.objectMap = this;
            mapObject.marker =
                    L.marker(srcLatLng)//, {icon: icon}, alt: src.id, title: src.name})
                    .bindTooltip(mapObject.name, {className: 'tracker-tooltip'})
                    .addTo(this.trackerObjectLayer);
            mapObject.marker.source = src;
            var onMarkerClick = (function (e) { // start/stop tracking
                if (!this.tracking.marker) // TODO replace to mapsrc.id ?
                    this.tracking.start(e.target);
                else if (this.tracking.marker === e.target)
                    this.tracking.stop();
            }).bind(this);
            mapObject.marker.on('click', onMarkerClick);
            mapObject.accuracyCircle = L.circle(srcLatLng, Math.min(src.accuracy, 1500),
                    {weight: 1, color: 'blue'}).addTo(this.trackerObjectLayer);
            trackerObjects[src.id] = mapObject;
        } else {
            mapObject.accuracyCircle.setLatLng(srcLatLng);
            mapObject.accuracyCircle.setRadius(Math.min(src.accuracy, 1500));
            mapObject.marker.source = src; // before marker move!
            mapObject.marker.setLatLng(srcLatLng);
        }
        mapObject.marker.setIcon(icon);
        mapObject.marker.setOpacity(1);
        return mapObject;
    }};
