/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2019-2024 miktim@mail.ru
 * Track object
 */

import {options} from './options.js';
import {heading, distance} from './geoUtil.js';
import {formatTime} from './util.js';
import {infoPane, createDOMElement, TrackerDOMTable} from './dom.js';
import {lang} from './messages.js';
import {logger} from './logger.js';

export function Track(map, trackLayer) {
    this.map = map;
    this.layer = trackLayer;
    this.marker = null;
    this.name = '';
    this.nodes = [];
    this.track = L.polyline([], {weight: 3, color: 'blue'});
    this.rubberThread = L.polyline([], {weight: 2, color: 'red'});
    this.lastLatLng = null;
    this.lastHeading = 0;

    this.isMarkerTracked = function (marker) {
        return marker === this.marker;
    };

    this.isTracked = function () {
        return this.marker;
    };

    this.start = function (marker) {
        this.remove();
        var latLng = marker.getLatLng();
        this.rubberThread.setLatLngs([latLng, latLng]).addTo(this.layer);
//        this.color = map.trackerColors[marker.source.iconid];
        this.name = marker.source.name;
        this.track.addTo(this.layer);//.setStyle({color: this.color});
        this.track.bindTooltip(lang.msgNodeInfo + this.name, {className: 'tracker-tooltip'});
        this.lastLatLng = latLng;
        this.lastHeading = marker.source.heading || 0;
        this.nodes = [];
        this.addTrackNode(marker.source, 0).fire('click');
        this.marker = marker;
        this.marker.on('move', this.onMarkerMove);
    };

    this.stop = function () {
        this.marker.off('move', this.onMarkerMove);
        this.rubberThread.setLatLngs([]);
        this.marker = null;
        infoPane.hide();
    };

    this.remove = function () {
        this.track.setLatLngs([]).unbindTooltip();
        this.layer.clearLayers();
    };

    this.onMarkerMove = (function (e) {
        if (this.isMarkerTracked(e.sourceTarget)) {
            this.marker.openTooltip();
            var newLatLng = e.latlng;
            this.rubberThread.setLatLngs([this.lastLatLng, newLatLng]);
            var dist = distance(this.lastLatLng, newLatLng);
            var step = Math.max(options.track.minDistance, this.marker.source.accuracy);
            var hdng = heading(this.lastLatLng, newLatLng);
//console.log(this.marker.source.heading.toFixed(2), hdng, dist);
            if ((dist > step
                    && Math.abs(this.lastHeading - hdng) > options.track.deviation)
                    || dist > options.track.maxDistance) {
                this.lastHeading = hdng;
                this.addTrackNode(this.marker.source, dist)
                        .fire('click');
            } else {
                this.marker.accuracyCircle.info =
                        TrackNodeInfo(this.nodes.length,this.marker.source.timestamp, dist);
                this.showNodeInfo(this.marker.accuracyCircle);
            }
            this.map.setView(newLatLng, this.map.getZoom());
        }
    }).bind(this);

    this.addTrackNode = function (source, distance) {
        this.lastLatLng = source.getLatLng();
        this.track.addLatLng(this.lastLatLng).bringToFront();
        var node = L.circle(
                this.lastLatLng, source.accuracy, {weight: 1, color: 'blue'})
                .addTo(this.layer);
        node.info = this.TrackNodeInfo(
                this.nodes.length, source.timestamp, distance);
        node.on('click', this.onNodeClick);
        this.nodes.push(node);
        return node;
    };

    this.TrackNodeInfo = function (i, timestamp, dist) {
        return {i: i, // node index
            timestamp: timestamp,
            distance: dist,
            path: (i === 0 ? 0 : this.nodes[i - 1].info.path + dist)
        };
    };

    Number.prototype.roundTo = function (dec) {
        return Number.parseFloat(this.toFixed(dec));
    };
    
// Track GeoJSON to clipboard
    this.track.on('dblclick', function (e) {
        var geoJson = this.track.toGeoJSON(6);
        geoJson.properties.name = this.name;
        geoJson.properties.accuracy = [];
        geoJson.properties.timestamp = [];
        for (var i = 0; i < geoJson.geometry.coordinates.length; i++) {
            geoJson.properties.accuracy.push(this.nodes[i].getRadius().roundTo(1));
            geoJson.properties.timestamp.push(this.nodes[i].info.timestamp);
        }
        navigator.clipboard.writeText(JSON.stringify(geoJson));
        logger.log(lang.msgGeoJSON);
    }.bind(this));

    this.onNodeClick = (function (e) {
        this.showNodeInfo(e.sourceTarget);
    }).bind(this);

    this.getNodeEntry = function (node) {
        let index = node.info.i;
        var nodeEntry = {
            index: index,
            totalTime: (node.info.timestamp - this.nodes[0].info.timestamp),
            path: node.info.path,
            speed: (index === 0 ? null :
                    (node.info.distance /
                            ((node.info.timestamp - this.nodes[index - 1].info.timestamp) / 1000))),
            heading: (index === 0 ? null :
                    heading(this.nodes[index - 1].getLatLng(), node.getLatLng())
                    ),
            course: (index > this.nodes.length - 2 ? null :
                    heading(node.getLatLng(), this.nodes[index + 1 ].getLatLng())
                    )
        };
        return nodeEntry;
    };
    this.showNodeInfo = function (node) {
        var info = this.getNodeEntry(node);
        var table = new TrackerDOMTable({rowClasses: ['', 'tracker-cell-wide']});
//            var clientRect = infoPane.divContent.getBoundingClientRect();
//            table.tableNode.style.maxWidth = Math.max(200, clientRect.width) + 'px';
        table.tableNode.style.maxWidth = '200px';
        table.addRow([lang.dict.tme, formatTime(info.totalTime)]);
        table.addRow([lang.dict.pth, (info.path / 1000).toFixed(3)]);
        table.addRow([lang.dict.nde, (info.index + 1)])
                .style.backgroundColor = 'rgb(96,96,96)';
        table.addRow([lang.dict.spd, (info.speed * 3.6).toFixed(0)]);
        table.addRow([lang.dict.hdg, info.heading ? info.heading.toFixed(1) : '-']);
        table.addRow([lang.dict.crs, info.course ? info.course.toFixed(1) : '-']);
        infoPane.show(lang.msgTrack + this.name, table.tableNode);
    }.bind(this);
    
}
    
