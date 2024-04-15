/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 */

export function toPosition(latLng) {
    if (Array.isArray(latLng))
        return latLng;
    return [latLng.lat, latLng.lng];
}

export function toLatLng(position) {
    if ('lat' in position)
        return position;
    return {lat: position[0], lng: position[1]};
}

export function update(target, ...sources) {
    for (var i in sources) {
        var src = sources[i];
        for (var key in src)
            if (key in target)
                target[key] = src[key];
    }
    return target;
}

export function extend(target, ...sources) {
    for (var i in sources) {
        var src = sources[i];
        for (var key in src)
            if (!(key in target))
                target[key] = src[key];
    }
    return target;
}

export function merge(target, ...sources) {
    for (var i in sources) {
        var src = sources[i];
        for (var key in src)
            target[key] = src[key];
    }
    return target;
}

export function createDOMElement(tagName, className, container) {
    var el = document.createElement(tagName);
    if (className)
        el.className = className;
    if (container) {
        container.appendChild(el);
    }
    return el;
}

function addDOMTableRow(rowData = [], rowClasses = [], tableEl, tag = 'td') {
    var rowEl = createDOMElement('tr', 'tracker-table', tableEl);
    for (var coli = 0; coli < rowData.length; coli++) {
        var className = rowClasses[coli] ? rowClasses[coli] : 'tracker-table';
        createDOMElement(tag, className, rowEl).innerHTML = rowData[coli];
    }
}

export function TrackerDOMTable(tableInfo = {}) {
    this.tableNode = createDOMElement('table', 'tracker-table');
    this.tableInfo = tableInfo;
    this.addRow = function (rowData, rowCls = this.tableInfo.rowClasses) {
        addDOMTableRow(rowData, rowCls, this.tableNode, 'td');
    };
    this.addHeader = function (rowData, rowCls = this.tableInfo.headerClasses) {
        addDOMTableRow(rowData, rowCls, this.tableNode, 'th');
    };
    if ('header' in tableInfo) {
        this.addHeader(tableInfo.header);
    }
    if ('table' in tableInfo) {
        for (var rowi = 0; rowi < tableInfo.table.length; rowi++) {
            this.addRow(tableInfo.table[rowi]);
        }
    }
}

export function format(pattern, ...args) {
    for (var i = 0;
    i < args.length; i++) {
        pattern = pattern.replaceAll('\%' + (i + 1) + '\$', args[i].toString());
    }
    return pattern;
}

export function formatTime(timeMillis) {
    if (timeMillis < 1000)
        return '0:00:00';
    var timeSec = Math.floor(timeMillis / 1000);
    var sec = timeSec % 60;
    var min = Math.floor(timeSec / 60) % 60;
    var hrs = Math.floor(timeSec / 3600);
    return (hrs + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
}

// See: https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
export function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }
// ??? HarmonyOS
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return null;
}

export function smallScreen() {
    return Math.min(screen.width, screen.height) > 500 ? false : true;
}

// https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
export function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
export function getUrlSearchParameter(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function trackerMode(mode) {
    var value = getUrlSearchParameter('mode');
    return (new RegExp('(^|,)' + mode + '(,|$)', 'i')).test(value || '');
}



