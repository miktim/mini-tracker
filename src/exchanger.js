/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {logger} from './logger.js';
import {map} from './map.js';
import {update} from './util.js';
import {Source, checkSource, trackerObjects, TrackerError} from './objects.js';
import {webSocket} from './websocket.js';
import {tracker} from './tracker.js';


export var actions = {
//    connect: function (actionObj) {
//      tracker.setOptions(actionObj.options);
//    }, 
    location: { // get
    },
    source: function (actionObj) {
        checkSource(actionObj);
        var src = trackerObjects[actionObj.id];
        if (src && actionObj.timestamp < src.timestamp) {
            return; // object timestamp absoleted
        }
        map.onSourceUpdate(new Source(actionObj)); //???
    },
    message: function (actionObj) {
        logger.log(actionObj.message);
    }
};
export function eventFrom(e) {
    sendEvent(toJSON(e));
}
export function sendEvent(json) {
    webSocket.send(json);
    // here webview
}
var ActionEvent = function (actionObj) {
    let event = new Event('action');
    event.trackerObj = actionObj;
    return event;
};

export function onAction(json) {
    var actionObj = JSON.parse(json);
    var action = actionObj.action.split(":")[0]; // object:action
    if (!(action in actions))
        throw new TrackerError('Unknown action', 1, actionObj);
    actions[action](actionObj);
    tracker.dispatchEvent(new ActionEvent(actionObj));
}
function ActionErrorEvent(e) {
    let event = new Event('actionerror');
    return merge(event, e);
}
// TODO senders: webview, websocket, api, {tracker}
export var exchanger = {
    toTracker: function (json) {
        try {
            onAction(json);
        } catch (e) {
            console.error(e);
            tracker.dispatchEvent(new ActionErrorEvent(e)); // api only
            this.fromTracker(toJSON({ // websocket, webview
                event: 'error:' + e.type, message: e.message, code: e.code, object: e.trackerObj}));
        }
    },
    fromTracker: sendEvent
};

export var webview = exchanger;