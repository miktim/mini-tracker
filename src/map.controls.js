/* 
 * LiteRadar Leaflet mini tracker, MIT (c) 2019-2023 miktim@mail.ru
 * Leaflet tracker user interface
 */
import * as dom from './dom.js';

var mapControls = [
    new (L.Control.extend({
        options: {position: 'bottomright'},
        onAdd: function (map) {
            return dom.loggerInfo.pane;
        }
    })),

    new (L.Control.extend({
        options: {position: 'topright'},
        onAdd: function (map) {
            var pane = dom.mainMenu.pane;
//        L.DomEvent.disableClickPropagation(pane);
//        L.DomEvent.disableScrollPropagation(pane);
            return pane;
        }
    })),

    new (L.Control.extend({
        options: {position: 'bottomleft'},
        onAdd: function (map) {
            var pane = dom.infoPane.pane;
            L.DomEvent.disableClickPropagation(pane);
            L.DomEvent.disableScrollPropagation(pane);
            return pane;
        }
    })),

    new (L.Control.extend({
        options: {position: 'topright'},
        onAdd: function (map) {
            var pane = dom.scrollPane.pane;
            L.DomEvent.disableClickPropagation(pane);
            L.DomEvent.disableScrollPropagation(pane);
            return pane;
        }
    }))
];
export function createControls(map) {
    dom.createMainMenu();
    for (var i in mapControls) {
        mapControls[i].addTo(map);
    }
}