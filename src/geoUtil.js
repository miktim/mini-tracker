/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 * Geodetic functions
 */

// Radians per degree
export const RpD = Math.PI / 180; // radians per degree
        
// Earth radius in meters (FAI sphere)
export const EarthRadius = 6371000; // Earth radius in meters (FAI sphere)

// Returns radians from degrees
export var toRadians = function (deg) {
    return deg * RpD;
};

// Returns degrees from radians
export var toDegrees = function (rad) {
    return rad / RpD;
};

// Returns distance in meters between locations
// http://www.movable-type.co.uk/scripts/latlong.html
export function distance(fromLoc, toLoc) {
    var pos1 = Object.values(fromLoc);
    var pos2 = Object.values(toLoc);
    var φ1 = toRadians(pos1[0]); // φ, λ in radians
    var φ2 = toRadians(pos2[0]);
    var Δφ = toRadians(pos2[0] - pos1[0]);
    var Δλ = toRadians(pos2[1] - pos1[1]);
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EarthRadius * c; // in metres
}
// Returns heading in degrees between locations
export function heading(fromLoc, toLoc) {
    return 360 - bearing(fromLoc, toLoc);
}

// Returns bearing in degrees between locations
// http://www.edwilliams.org/avform147.htm#Crs
export function bearing(fromLoc, toLoc) {
    var pos1 = Object.values(fromLoc);
    var pos2 = Object.values(toLoc);
    var lat1 = toRadians(pos1[0]);
    var lon1 = toRadians(pos1[1]);
    var lat2 = toRadians(pos2[0]);
    var lon2 = toRadians(pos2[1]);
    var tc1 = Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2),
            Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2))
            % (2 * Math.PI);
    return (toDegrees(tc1) + 360) % 360;
}

// Returns destination point given distance in meters and heading in degrees from start point
// http://www.movable-type.co.uk/scripts/latlong.html
export function radialPoint(startLoc, heading, distance) {
    var pos = Object.values(startLoc);
    var d = distance / EarthRadius; // radial distance
    var h = toRadians(heading % 360); // degree heading to radiant 
    var φ1 = toRadians(pos[0]); // latitude to radiant
    var λ1 = toRadians(pos[1]); // longitude to radiant
    var φ2 = Math.asin((Math.sin(φ1) * Math.cos(d)) +
            (Math.cos(φ1) * Math.sin(d) * Math.cos(h)));
    var λ2 = λ1 + Math.atan2(Math.sin(h) * Math.sin(d) * Math.cos(φ1),
            Math.cos(d) - Math.sin(φ1) * Math.sin(φ2));
    pos = [toDegrees(φ2), (toDegrees(λ2) + 540) % 360 - 180];
    return Array.isArray(startLoc) ? pos : {lat: pos[0], lng: pos[1]};
}

