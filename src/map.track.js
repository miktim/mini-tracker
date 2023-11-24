/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2019-2023 miktim@mail.ru
 */

import {options} from './options.js';
import {bearing, heading, distance} from './geoUtil.js';
import {toPosition, format} from './util.js';
import {trackInfo} from './dom.js';
import {lang} from './lang.js';

export function Track(map, trackLayer) {
    this.map = map;
    this.layer = trackLayer;
    this.marker = null;
    this.name = '';
    this.nodes = [];
    this.track = L.polyline([], {weight: 2, color: 'blue'});
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
        this.track.addTo(this.layer);
        this.name = marker.source.name;
        this.lastLatLng = latLng;
        this.lastHeading = marker.source.heading || 0;
        this.nodes = [];
        this.addTrackNode(marker.source, 0).fire('click');
        this.marker = marker;
        this.marker.on('move', this.onMarkerMove);
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
                var nodeEntry = this.getNodeEntry(this.nodes.length - 1);
                nodeEntry.course = hdng;
                trackInfo.create(nodeEntry, format(lang.hdrNodeInfo, this.name));
            }
            this.map.setView(newLatLng, this.map.getZoom());
        }
    }).bind(this);

    this.addTrackNode = function (source, distance) {
        this.lastLatLng = source.getLatLng();
        this.track.addLatLng(this.lastLatLng);
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

    this.onNodeClick = (function (e) {
        var node = e.sourceTarget;
        var nodeEntry = this.getNodeEntry(node.info.i);
        trackInfo.create(nodeEntry, format(lang.hdrNodeInfo, this.name));
    }).bind(this);

    this.getNodeEntry = function (i) {
//        let node = this.nodes[i];
        var nodeEntry = {
            index: i,
            totalTime: (this.nodes[i].info.timestamp - this.nodes[0].info.timestamp),
            path: this.nodes[i].info.path,
            speed: (i === 0 ? null :
                    (this.nodes[i].info.distance /
                            ((this.nodes[i].info.timestamp - this.nodes[i - 1].info.timestamp) / 1000))),
            heading: (i === 0 ? null :
                    heading(this.nodes[i - 1].getLatLng(), this.nodes[i].getLatLng())
                    ),
            course: (i === this.nodes.length - 1 ? null :
                    heading(this.nodes[i].getLatLng(), this.nodes[i + 1 ].getLatLng())
                    )
        };
        return nodeEntry;
    };

    this.stop = function () {
        this.marker.off('move', this.onMarkerMove);
        this.rubberThread.setLatLngs([]);
        this.marker = null;
    };

    this.remove = function () {
        this.track.setLatLngs([]);
        this.layer.clearLayers();
    };
}
