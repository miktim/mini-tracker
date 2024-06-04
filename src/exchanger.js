/* 
 * LiteRadar tracker, MIT (c) 2019-2023 miktim@mail.ru
 */
import {logger} from './logger.js';
import {map} from './map.js';
import {update, merge} from './util.js';
import {Source, checkSource, TrackerError} from './objects.js';
import {webSocket} from './websocket.js';
import {tracker} from './tracker.js';

export var interfaces = {
    websocket: {
        from: function (actionJson) {
            actionJSON(actionJson, "websocket");
        },
        to: function (eventJson) {
            webSocket.send(eventJson);
        }
    },
    webview: {
        from: function (actionJson) {
            actionJSON(actionJson, "webview");
        },
        to: function (eventJson) {
            tracker.toWebView(eventJson);
//            tracker.webview.fromTracker(eventJson);
        }
    },
    javascript: {
        from: function (actionObj) {
            try {
                actionObject(actionObj, "javascript");
//  tracker.dispatchEvent(new TrackerActionEvent(actionObj));
            } catch (e) {
                tracker.dispatchEvent(new TrackerErrorEvent(e)); // debug
            }
        },
        to: function (eventObj) {

        }
    }
};

function actionJSON(actionJson, interfaceName) {
    try {
        try {
            var actionObj = JSON.parse(actionJson, interfaceName);
        } catch (e) {
            actionObj = {action: "undefined"};
            throw new TrackerError(1, actionObj);
        }
        var response = JSON.stringify({event: "ok:" + actionObj.action});
        actionObject(actionObj, interfaceName);
        tracker.dispatchEvent(new TrackerActionEvent(actionObj));
    } catch (e) {
        if (!(e instanceof TrackerError))
            console.log(e); // unexpected internal erorr
        response = JSON.stringify(update({
            event: "error:" +
                    (actionObj.action ? actionObj.action : "undefined"),
            code: 5,
            message: "Internal error",
            type: "trackererror"
        }, e));
    }
    interfaces[interfaceName].to(response);
}

function actionObject(actionObj, interfaceName) {
    try {
        actionObj.interface = interfaceName;
        var action = actionObj.action.toLowerCase().split(":");
        var executor = actions[action[0]][action[1]];
        if (!executor)
            throw new Error();
    } catch (e) {
        throw new TrackerError(2, actionObj);
    }
    executor(actionObj);
}

var actions = {
    update: {
        locationsource: function (actionObj) {
            checkSource(actionObj);
            map.onSourceUpdate(new Source(actionObj));
        },
        message: function (actionObj) {
            try {
                logger.log(actionObj.message.substring(0, 64));
            } catch (e) {
                throw new TrackerError(3, actionObj);
            }
        }
    }
};

var TrackerActionEvent = function (actionObj) {
    let event = new Event('trackeraction');
    event.actionObj = actionObj;
    return event;
};

function TrackerErrorEvent(e) {
    let event = new Event('trackererror');
    event.errorObj = e;
    return event;
}

//export var webview = {
//    toTracker: interfaces.webview.from,
//    fromTracker: interfaces.webview.to
//};
