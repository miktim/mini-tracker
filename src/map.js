/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {logger} from "./logger.js";
import {extend, toPosition, format} from './util.js';
import {options} from './options.js';
import {lang} from './messages.js';
import {scrollPane, TrackerDOMTable} from './dom.js';
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
    logger.log(format(lang.fmtReady, tracker.version));
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
    this.marker.setOpacity(0.4);
};
MapSource.prototype.remove = function () {
    if (this.tracked()) {
        this.outdated();
        return;
    }    
    this.marker.removeFrom(map.trackerObjectLayer);
    this.marker.accuracyCircle.removeFrom(map.trackerObjectLayer);
    delete trackerObjects[this.id];
    logger.log(format(lang.fmtObjDelete, this.name));
};
MapSource.prototype.tracked = function () {
    return map.tracking.marker === this.marker;
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
//                list.push(new SourceListEntry(obj.marker.source, this.tracking.marker === obj.marker));
                list.push(new SourceListEntry(obj.getSource(), obj.tracked()));
            }
        }
        return list;
    },

    locateTrackerObject: function (objid) {
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

    showObjectList(criteria) {
        scrollPane.hide();
        var list = this.searchObjectsByName(criteria);
// TODO mark outdated
        if (list.length === 0) {
            logger.info(lang.msgNotFound);
            return;
        }
        var title = lang.msgFound + list.length;

        var table = new TrackerDOMTable();

        table.tableNode.onclick = function (e) {
            if (e.target.tagName.toLowerCase() === 'td') {
                var objid = e.target.parentNode.lastChild.innerHTML;
                this.locateTrackerObject(objid);
                scrollPane.pane.hidden = true;
            }
        }.bind(this);

        let d = lang.dict;
        table.addHeader(['', d.nme, d.lat, d.lng, d.acc, d.hdg, d.spd, d.tms]);
        let cn = 'tracker-cell-number';
        table.tableInfo.rowClasses = [
            cn, '', cn, cn, cn, cn, cn, '', 'tracker-invisible'
        ];
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            var src = obj.source;
            table.addRow([
                (obj.tracked ? '*' : '') + (i + 1),
                src.name,
                src.getPosition()[0].toFixed(7), // latitude
                src.getPosition()[1].toFixed(7), // longitude
                src.accuracy.toFixed(1),
                src.heading ? src.heading.toFixed(1) : '-',
                src.speed ? (src.speed * 3.6).toFixed(0) : '-', // km/h
                (new Date(src.timestamp)).toLocaleString(), // TODO? swap date/time
                src.id]);
        }
        scrollPane.show(title, table.tableNode);
        logger.info(lang.msgTapToLocate);
    },

    trackerIcons: [],
    trackerColors: ['darkgray', 'blue', 'green', 'red', 'yellow'],

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
            mapObject.marker.accuracyCircle = L.circle(srcLatLng, Math.min(src.accuracy, 1500),
                    {weight: 1, color: 'blue'}).addTo(this.trackerObjectLayer);
            trackerObjects[src.id] = mapObject;
            logger.log(format(lang.fmtObjCreate, src.name));
        } else {
            mapObject.marker.accuracyCircle.setLatLng(srcLatLng);
            mapObject.marker.accuracyCircle.setRadius(Math.min(src.accuracy, 1500));
            mapObject.marker.source = src; // before marker move!
            mapObject.marker.setLatLng(srcLatLng);
        }
        mapObject.marker.setIcon(icon);
        mapObject.marker.setOpacity(1);
        return mapObject;
    }};
