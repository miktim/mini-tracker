(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}};t.d({},{F:()=>kt});var e={};t.r(e),t.d(e,{extend:()=>a,format:()=>c,formatTime:()=>d,getMobileOperatingSystem:()=>h,getUrlSearchParameter:()=>m,isTouchDevice:()=>u,merge:()=>s,smallScreen:()=>l,toLatLng:()=>i,toPosition:()=>r,trackerMode:()=>g,update:()=>o});var n={};function r(t){return Array.isArray(t)?t:[t.lat,t.lng]}function i(t){return"lat"in t?t:{lat:t[0],lng:t[1]}}function o(t,...e){for(var n in e){var r=e[n];for(var i in r)i in t&&(t[i]=r[i])}return t}function a(t,...e){for(var n in e){var r=e[n];for(var i in r)i in t||(t[i]=r[i])}return t}function s(t,...e){for(var n in e){var r=e[n];for(var i in r)t[i]=r[i]}return t}function c(t,...e){for(var n=0;n<e.length;n++)t=t.replaceAll("%"+(n+1)+"$",e[n].toString());return t}function d(t){if(t<1e3)return"0:00:00";var e=Math.floor(t/1e3),n=e%60,r=Math.floor(e/60)%60;return Math.floor(e/3600)+":"+(r<10?"0"+r:r)+":"+(n<10?"0"+n:n)}function h(){var t=navigator.userAgent||navigator.vendor||window.opera;return/windows phone/i.test(t)?"Windows Phone":/android/i.test(t)?"Android":/iPad|iPhone|iPod/.test(t)&&!window.MSStream?"iOS":null}function l(){return!(Math.min(screen.width,screen.height)>500)}function u(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function m(t,e=window.location.href){t=t.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function g(t){var e=m("mode");return new RegExp("(^|,)"+t+"(,|$)","i").test(e||"")}t.r(n),t.d(n,{EarthRadius:()=>A,RpD:()=>D,bearing:()=>$,distance:()=>P,heading:()=>F,radialPoint:()=>G,toDegrees:()=>H,toRadians:()=>W});var p={lang:"en-US",ownName:"I",fmtReady:"Tracker v%1$ ready",msgLocWaiting:"Waiting for a location...",locationerror:["Geolocation error: no such service","Geolocation error: permission denied","Geolocation error: position unavailable","Geolocation error: timeout expired","Geolocation error: service unavilable"],trackererror:["Unknown error","JSON parse error","Unknown action or action object","Object property is missing or invalid","Outdated object","Internal error"],msgWsOpen:"WebSocket is open: ",fmtWsClosed:"WebSocket closed: %1$ %2$",fmtObjCreate:"Object '%1$' created",fmtObjDelete:"Object '%1$' deleted",msgWsError:"WebSocket error: ",actionHistory:"Message history",actionShowAll:"Show all objects",actionSetCenter:"Center map to location",actionSearch:" Search",msgHistory:"Message history: ",msgWildcards:"Search wildcards: ? *",msgFound:"Found: ",msgNotFound:"Nothing found...",msgTapToLocate:"Tap the name to locate",msgGeoJSON:"GeoJSON of the track in the clipboard",msgTrack:"Track: ",fmtTrkStart:"Tracking '%1$' started",fmtTrkStop:"Tracking '%1$' stopped",dict:{nme:"Name",lat:"LAT,deg",lng:"LON,deg",acc:"ACC,m",hdg:"HDG,deg",crs:"CRS,deg",spd:"V,km/h",spa:"Vavg,km/h",dis:"D,km",tms:"Timestamp",tme:"T,h:mm:ss",nde:"Node",pth:"S,km"},actionAbout:"About",set:function(){var t=k.lang.split("-")[0].split("_")[0];f[t]&&o(this,f[t])}},f=[];f.ru={lang:"ru-RU",ownName:"Я",fmtReady:"Трекер v%1$ готов к работе",msgLocWaiting:"Ожидаю координаты...",locationerror:["Ошибка геолокации: не поддерживается","Ошибка геолокации: отказано в доступе","Ошибка геолокации: недоступно","Ошибка геолокации: таймаут","Ошибка геолокации: сервис недоступен"],msgWsOpen:"WebSocket открыт: ",fmtWsClosed:"WebSocket закрыт:  %1$ %2$",msgWsError:"Ошибка WebSocket: ",fmtObjCreate:"Создан объект '%1$'",fmtObjDelete:"Удален объект '%1$'",actionShowAll:"Показать все объекты",actionHistory:"История сообщений",actionSetCenter:"Центрировать по месту",actionSearch:" Поиск",msgHistory:"История сообщений: ",msgWildcards:"Символы подстановки: ? *",msgFound:"Найдено: ",msgNotFound:"Ничего не найдено...",msgTapToLocate:"Для показа коснитесь имени",msgGeoJSON:"GeoJSON трека в буфере обмена",msgTrack:"Трек: ",fmtTrkStart:"Трекинг '%1$' начат",fmtTrkStop:"Трекинг '%1$' остановлен",dict:{nme:"Имя",lat:"LAT,град",lng:"LON,град",acc:"ACC,м",hdg:"HDG,град",crs:"CRS,град",spd:"V,км/ч",spa:"Vср,км/ч",tms:"Штамп времени",tme:"T,ч:мм:сс",dis:"D,км",nde:"Узел",pth:"S,км"},actionAbout:"About"};var k={mode:"",websocket:"",watch:5,track:{deviation:7,minDistance:20,maxDistance:1e3},outdatingDelay:10,logger:{messageDelay:3,historyLength:50},map:{defaultZoom:16,minZoom:4},lang:"en_US",update:function(t={}){o(this,t),p.set()},checkMode:function(t){return new RegExp("(^|,)"+t+"(,|$)","i").test(this.mode)}};k.mode=m("mode")||k.mode,k.websocket=m("websocket")||k.wsURL,k.lang=m("lang")||navigator.language||k.lang;var v=m("watch");function w(t,e,n){var r=document.createElement(t);return e&&(r.className=e),n&&n.appendChild(r),r}function b(t=[],e=[],n,r="td"){for(var i=w("tr","tracker-table",n),o=0;o<t.length;o++)w(r,e[o]?e[o]:"tracker-table",i).innerHTML=t[o];return i}function y(t={}){if(this.tableNode=w("table","tracker-table"),this.tableInfo=t,this.addRow=function(t,e=this.tableInfo.rowClasses){return b(t,e,this.tableNode,"td")},this.addHeader=function(t,e=this.tableInfo.headerClasses){return b(t,e,this.tableNode,"th")},"header"in t&&this.addHeader(t.header),"table"in t)for(var e=0;e<t.table.length;e++)this.addRow(t.table[e])}function T(t="tracker-pane",e=!1){this.pane=w("div",t),this.pane.hidden=e}function S(t="tracker-pane",e=!0){this.pane=w("div","tracker-pane"),this.pane.hidden=e;var n=w("div","tracker-title",this.pane);this.divTitle=w("div","tracker-title-text",n);var r=w("img","tracker-title",n);r.src="./images/btn_close.png",r.onclick=function(t){this.hide()}.bind(this),this.divContent=w("div",t,this.pane),this.show=function(t,e){this.divTitle.innerHTML=t,this.divContent.innerHTML="",this.divContent.appendChild(e),this.pane.hidden=!1},this.hide=function(){this.pane.hidden=!0}}v&&(k.watch=parseInt(v)),(v=m("track"))&&(v=v.split(":"),k.track.deviation=Number(v[0])||k.track.deviation,k.track.minDistance=Number(v[1])||k.track.minDistance,k.track.maxDistance=Number(v[2])||k.track.maxDistance);var M=new T("tracker-button"),C=function(){var t=M.pane,e=[{img:"./images/btn_locate.png",title:p.actionSetCenter,onclick:function(){Y.setCenterToLocation()}},{img:"./images/btn_bound.png",title:p.actionShowAll,onclick:function(){Y.fitAllObjects()}},{img:"./images/btn_history.png",title:p.actionHistory,onclick:function(){E.showHistory()}}];for(var n of e){var r=w("div","tracker-button",t);r.addEventListener("click",n.onclick,!1);var i=w("img","tracker-button",r);i.src=n.img,i.title=n.title}var o=w("form","tracker-search",t);o.style.display="",o.onclick=function(){o.searchCriteria.focus(),o.searchCriteria.scrollIntoView(),E.info(p.msgWildcards,5)},o.onsubmit=function(t){document.activeElement.blur();try{Y.showObjectList(t.target.searchCriteria.value)}catch(t){E.error(t)}return!1};var a=w("input","tracker-search",o);a.type="text",a.name="searchCriteria",a.placeholder=p.actionSearch,a.autocomplete="off"},O=new S("tracker-pane");O.divContent.onclick=function(t){var e=O.pane;if(e.style.marginLeft)e.style.marginLeft="";else{var n=O.divContent.getBoundingClientRect();e.style.marginLeft=-(n.width-70)+"px"}};var N,j=new S("tracker-scroll"),x=function(t){var e=(window.innerHeight||document.documentElement.clientHeight)-145+"px",n=(window.innerWidth||document.documentElement.clientWidth)-25+"px";e===j.divContent.style.maxHeight&&n===j.divContent.style.maxWidth||(j.divContent.style.maxHeight=e,j.divContent.style.maxWidth=n)};x(),N=x,"orientation"in window.screen?screen.orientation.addEventListener("oncnange",N):screen.addEventListener("orientationchange",N),window.addEventListener("resize",N);var I=new T("tracker-console",!0),E={log:function(t,e){console.log(t),this.update(t,e),this.addToHistory(t)},error:function(t,e){console.log(t);var n=t.code?p[t.type][t.code]:t.message;this.update(n,e),this.addToHistory(n)},info:function(t,e){this.update(t,e)},timer:null,pane:I.pane,update:function(t,e=k.logger.messageDelay){this.cancel(),this.pane.innerHTML=t,this.pane.hidden=!1,this.timer=setTimeout((function(t){t.cancel()}),1e3*e,this)},cancel:function(){this.timer&&(clearTimeout(this.timer),this.timer=null,this.pane.hidden=!0)},history:[],historyCount:0,addToHistory:function(t){this.historyCount++,this.history.length>=k.logger.historyLength&&this.history.pop(),this.history.unshift({time:Date.now(),message:t})},showHistory:function(){for(var t=p.msgHistory+this.history.length,e=this.historyCount,n=new y,r=0;r<this.history.length;r++)n.addRow([e--,new Date(this.history[r].time).toLocaleTimeString()+" "+this.history[r].message],["tracker-cell-number"]);j.show(t,n.tableNode)}},R=[new(L.Control.extend({options:{position:"bottomright"},onAdd:function(t){return I.pane}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){return M.pane}})),new(L.Control.extend({options:{position:"bottomleft"},onAdd:function(t){var e=O.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){var e=j.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}}))];const D=Math.PI/180,A=6371e3;var W=function(t){return t*D},H=function(t){return t/D};function P(t,e){var n=Object.values(t),r=Object.values(e),i=W(n[0]),o=W(r[0]),a=W(r[0]-n[0]),s=W(r[1]-n[1]),c=Math.sin(a/2)*Math.sin(a/2)+Math.cos(i)*Math.cos(o)*Math.sin(s/2)*Math.sin(s/2),d=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c));return A*d}function F(t,e){return 360-$(t,e)}function $(t,e){var n=Object.values(t),r=Object.values(e),i=W(n[0]),o=W(n[1]),a=W(r[0]),s=W(r[1]),c=Math.atan2(Math.sin(o-s)*Math.cos(a),Math.cos(i)*Math.sin(a)-Math.sin(i)*Math.cos(a)*Math.cos(o-s))%(2*Math.PI);return(H(c)+360)%360}function G(t,e,n){var r=Object.values(t),i=n/A,o=W(e%360),a=W(r[0]),s=W(r[1]),c=Math.asin(Math.sin(a)*Math.cos(i)+Math.cos(a)*Math.sin(i)*Math.cos(o)),d=s+Math.atan2(Math.sin(o)*Math.sin(i)*Math.cos(a),Math.cos(i)-Math.sin(a)*Math.sin(c));return r=[H(c),(H(d)+540)%360-180],Array.isArray(t)?r:{lat:r[0],lng:r[1]}}function J(t,e){this.map=t,this.layer=e,this.marker=null,this.name="",this.nodes=[],this.track=L.polyline([],{weight:3,color:"blue"}),this.rubberThread=L.polyline([],{weight:2,color:"red"}),this.lastLatLng=null,this.lastHeading=0,this.isMarkerTracked=function(t){return t===this.marker},this.isTracked=function(){return this.marker},this.start=function(t){this.remove();var e=t.getLatLng();this.rubberThread.setLatLngs([e,e]).addTo(this.layer),this.name=t.source.name,this.track.addTo(this.layer),this.lastLatLng=e,this.lastHeading=t.source.heading||0,this.nodes=[],this.addTrackNode(t.source,0).fire("click"),this.marker=t,this.marker.on("move",this.onMarkerMove),E.log(c(p.fmtTrkStart,this.name))},this.stop=function(){this.marker.off("move",this.onMarkerMove),this.rubberThread.setLatLngs([]),this.marker=null,O.hide(),E.log(c(p.fmtTrkStop,this.name))},this.remove=function(){this.track.setLatLngs([]),this.layer.clearLayers()},this.onMarkerMove=function(t){if(this.isMarkerTracked(t.sourceTarget)){this.marker.openTooltip();var e=t.latlng;this.rubberThread.setLatLngs([this.lastLatLng,e]);var n=P(this.lastLatLng,e),r=Math.max(k.track.minDistance,this.marker.source.accuracy),i=F(this.lastLatLng,e);n>r&&Math.abs(this.lastHeading-i)>k.track.deviation||n>k.track.maxDistance?(this.lastHeading=i,this.addTrackNode(this.marker.source,n).fire("click")):(this.marker.accuracyCircle.info=this.TrackNodeInfo(this.nodes.length,this.marker.source.timestamp,n),this.showNodeInfo(this.marker.accuracyCircle)),this.map.setView(e,this.map.getZoom())}}.bind(this),this.addTrackNode=function(t,e){this.lastLatLng=t.getLatLng(),this.track.addLatLng(this.lastLatLng).bringToFront();var n=L.circle(this.lastLatLng,t.accuracy,{weight:1,color:"blue"}).addTo(this.layer);return n.info=this.TrackNodeInfo(this.nodes.length,t.timestamp,e),n.on("click",this.onNodeClick),this.nodes.push(n),n},this.TrackNodeInfo=function(t,e,n){return{i:t,timestamp:e,distance:n,path:0===t?0:this.nodes[t-1].info.path+n}},Number.prototype.roundTo=function(t){return Number.parseFloat(this.toFixed(t))},this.track.on("dblclick",function(t){var e=this.track.toGeoJSON(6);e.properties.name=this.name,e.properties.nodes={},e.properties.nodes.accuracy=[],e.properties.nodes.timestamp=[];for(var n=0;n<e.geometry.coordinates.length;n++)e.properties.nodes.accuracy.push(this.nodes[n].getRadius().roundTo(1)),e.properties.nodes.timestamp.push(this.nodes[n].info.timestamp);navigator.clipboard.writeText(JSON.stringify(e)),E.log(p.msgGeoJSON)}.bind(this)),this.onNodeClick=function(t){this.showNodeInfo(t.sourceTarget)}.bind(this),this.getNodeEntry=function(t){let e=t.info.i,n=t.info.timestamp-this.nodes[0].info.timestamp;return{totalTime:n,speedAvg:0===e?null:t.info.path/(n/1e3),speed:0===e?null:t.info.distance/((t.info.timestamp-this.nodes[e-1].info.timestamp)/1e3),heading:0===e?null:F(this.nodes[e-1].getLatLng(),t.getLatLng()),course:e>this.nodes.length-2?null:F(t.getLatLng(),this.nodes[e+1].getLatLng())}},this.showNodeInfo=function(t){let e=this.getNodeEntry(t),n=new y({rowClasses:["","tracker-cell-wide"]});n.tableNode.style.maxWidth="200px",n.addRow([p.dict.nde,t.info.i+1]),n.addRow([p.dict.tme,d(e.totalTime)]),n.addRow([p.dict.pth,(t.info.path/1e3).toFixed(3)]),n.addRow([p.dict.spa,(3.6*e.speedAvg).toFixed(0)]),n.addRow([p.dict.dis,(t.info.distance/1e3).toFixed(3)]),n.addRow([p.dict.spd,(3.6*e.speed).toFixed(0)]),n.addRow([p.dict.hdg,e.heading?e.heading.toFixed(1):"-"]),n.addRow([p.dict.crs,e.course?e.course.toFixed(1):"-"]),O.show(p.msgTrack+this.name,n.tableNode)}.bind(this)}var _={subprotocol:"tracker.miktim.org",websocket:null,error:null,start(t=k.websocket){if(t&&!this.websocket)try{var e=("https:"===window.location.protocol?"wss:":"ws:")+t.replace("ws:","").replace("wss:","");this.websocket=new WebSocket(e,this.subprotocol),this.websocket.onmessage=function(t){"string"==typeof t.data&&Z.websocket.from(t.data)},this.websocket.onopen=function(t){E.log(p.msgWsOpen+t.target.url)},this.websocket.onclose=U,this.websocket.onerror=V}catch(t){E.error(t)}},send(t){this.websocket&&this.websocket.send(t)},stop(){this.websocket&&this.websocket.close(1001,"Going away")}},U=function(t){this.error?E.log(p.msgWsError+t.code):E.log(c(p.fmtWsClosed,t.code,t.reason),10),this.websocket=null,this.error=null}.bind(_),V=function(t){this.error=t}.bind(_),Z={websocket:{from:function(t){B(t,"websocket")},to:function(t){_.send(t)}},webview:{from:function(t){B(t,"webview")},to:function(t){}},javascript:{from:function(t){try{z(t,"javascript")}catch(t){kt.dispatchEvent(new Q(t))}},to:function(t){}}};function B(t,e){try{try{var n=JSON.parse(t,e)}catch(t){throw new rt(1,n={action:"undefined"})}var r=JSON.stringify({event:"ok:"+n.action});z(n,e),kt.dispatchEvent(new K(n))}catch(t){t instanceof rt||console.log(t),r=JSON.stringify(o({event:"error:"+(n.action?n.action:"undefined"),code:5,message:"Internal error",type:"trackererror"},t))}Z[e].to(r)}function z(t,e){try{t.interface=e;var n=t.action.toLowerCase().split(":"),r=q[n[0]][n[1]];if(!r)throw new Error}catch(e){throw new rt(2,t)}r(t)}var q={update:{locationsource:function(t){!function(t){if(!(t.id&&t.point&&t.point[0]&&t.point[0].between(-90,90)&&t.point[1]&&t.point[1].between(-180,180)&&t.accuracy&&t.accuracy>0&&t.timestamp&&Date.now()>=t.timestamp))throw new rt(3,t);t.name=t.name||"unknown",t.timeout=t.timeout||k.outdatingDelay,t.speed=t.speed||0,t.heading=t.heading||0,t.iconid=t.iconid&&t.iconid.between(0,4)?t.iconid:0;let e=ot[t.id];if(e){if(e=e.getSource(),t.timestamp<=e.timestamp)throw new rt(4,t);let n=t.point,r=e.point;t.heading=F(r,n),t.speed=P(r,n)/((t.timestamp-e.timestamp)/1e3)}}(t),Y.onSourceUpdate(new it(t))},message:function(t){try{E.log(t.message.substring(0,64))}catch(e){throw new rt(3,t)}}}},K=function(t){let e=new Event("trackeraction");return e.actionObj=t,e};function Q(t){let e=new Event("trackererror");return e.errorObj=t,e}var X={toTracker:Z.webview.from,fromTracker:Z.webview.to},Y={};function tt(){return new Event("trackerready")}function et(){Y.trackerReady={event:"ready:tracker:"+kt.version,mapCenter:r(Y.getCenter())},Z.websocket.to(JSON.stringify(Y.trackerReady)),Z.webview.to(JSON.stringify(Y.trackerReady)),E.log(c(p.fmtReady,kt.version)),kt.dispatchEvent(new tt)}String.prototype.replaceAll=function(t,e){return this.split(t).join(e)},st.prototype.getSource=function(){return this.marker.source},st.prototype.outdated=function(){this.marker.setOpacity(.4)},st.prototype.remove=function(){this.tracked()?this.outdated():(this.marker.removeFrom(Y.trackerObjectLayer),this.marker.accuracyCircle.removeFrom(Y.trackerObjectLayer),delete ot[this.id],E.log(c(p.fmtObjDelete,this.name)))},st.prototype.tracked=function(){return Y.tracking.marker===this.marker};var nt={setCenterToLocation:function(t=k.watch){E.info(p.msgLocWaiting,t),this.locate({setView:!0,timeout:1e3*t,watch:!1}).once("locationfound",(function(t){E.cancel(),this.setZoom(k.map.defaultZoom)})).once("locationerror",(function(t){E.error(t)}))},searchObjectsByName:function(t){t="^"+t.replaceAll("?",".{1}").replaceAll("*",".*")+"$";var e=[];try{var n=new RegExp(t,"i")}catch(t){return E.error(t),e}for(var r in ot)if(n.test(ot[r].name)){var i=ot[r];e.push(new ct(i.getSource(),i.tracked()))}return e},locateTrackerObject:function(t){var e=ot[t].marker,n=this.tracking.marker||e;e===n?this.setView(e.getLatLng(),k.map.defaultZoom):(this.fitAllObjects(),n.openTooltip()),e.openTooltip(),this.tracking.isMarkerTracked(e)||setTimeout((function(t){t.closeTooltip()}),5e3,e)},fitAllObjects:function(){if(this.hasLayer(this.trackerObjectLayer)){var t=this.trackerObjectLayer.getBounds().extend(this.tracking.track.getBounds());t.isValid()&&this.fitBounds(t)}},showObjectList(t){j.hide();var e=this.searchObjectsByName(t);if(0===e.length)return void E.info(p.msgNotFound);var n=p.msgFound+e.length,r=new y;r.tableNode.onclick=function(t){if("td"===t.target.tagName.toLowerCase()){var e=t.target.parentNode.lastChild.innerHTML;this.locateTrackerObject(e),j.pane.hidden=!0}}.bind(this);let i=p.dict;r.addHeader(["",i.nme,i.lat,i.lng,i.acc,i.hdg,i.spd,i.tms]);let o="tracker-cell-number";r.tableInfo.rowClasses=[o,"",o,o,o,o,o,"","tracker-invisible"];for(var a=0;a<e.length;a++){var s=e[a],c=s.source;r.addRow([(s.tracked?"*":"")+(a+1),c.name,c.getPosition()[0].toFixed(7),c.getPosition()[1].toFixed(7),c.accuracy.toFixed(1),c.heading?c.heading.toFixed(1):"-",c.speed?(3.6*c.speed).toFixed(0):"-",new Date(c.timestamp).toLocaleString(),c.id])}j.show(n,r.tableNode),E.info(p.msgTapToLocate)},trackerIcons:[],trackerColors:["darkgray","blue","green","red","yellow"],getTrackerIcon:function(t=2){return t=Math.max(0,Math.min(t,this.trackerIcons.length-1)),this.trackerIcons[t]},makeTrackerIcon:function(t,e){return e=e||32,L.icon({iconSize:[e,e],iconAnchor:[e/2,e],iconUrl:t})},tracking:null,onSourceUpdate:function(t){var e=this.getTrackerIcon(t.iconid),n=ot[t.id],r=t.getLatLng();if(n)n.marker.accuracyCircle.setLatLng(r),n.marker.accuracyCircle.setRadius(Math.min(t.accuracy,1500)),n.marker.source=t,n.marker.setLatLng(r);else{(n=new st(t)).marker=L.marker(r).bindTooltip(n.name,{className:"tracker-tooltip"}).addTo(this.trackerObjectLayer),n.marker.source=t;var i=function(t){this.tracking.marker?this.tracking.marker===t.target&&this.tracking.stop():this.tracking.start(t.target)}.bind(this);n.marker.on("click",i),n.marker.accuracyCircle=L.circle(r,Math.min(t.accuracy,1500),{weight:1,color:"blue"}).addTo(this.trackerObjectLayer),ot[t.id]=n,E.log(c(p.fmtObjCreate,t.name))}return n.marker.setIcon(e),n.marker.setOpacity(1),n}};function rt(t=0,e){this.code=t,this.message=p.trackererror[t],this.type="trackererror",this.trackerObj=e}function it(t){this.id="LiteRadar tracker",this.name="tracker",this.iconid=0,this.point=[void 0,void 0],this.accuracy=void 0,this.speed=0,this.heading=0,this.timestamp=Date.now(),this.timeout=k.watch,o(this,t)}Number.prototype.between=function(t,e){return this>=t&&this<=e},rt.prototype=new Error,it.prototype={getLatLng:function(){return{lat:this.point[0],lng:this.point[1]}},setLatLng:function(t){return this.point[0]=t.lat,this.point[1]=t.lng,this},getPosition:function(){return this.point},setPosition:function(t){return this.point=t,this},update:function(){return Z.javascript.from(s({action:"update:locationsource"},this)),this}};var ot=[];function at(t){this.message=t,this.update=function(){return Z.javascript.from(s({action:"update:message"},this)),this}}function st(t){this.id=t.id,this.name=t.name}function ct(t,e){this.id=t.id,this.source=t,this.tracked=e}var dt={interval:null,start(t=k.outdatingDelay){this.stop(),this.interval||(this.interval=setInterval((function(){for(var t in ot){var e=ot[t];if("outdated"in e){var n=e.getSource(),r=n.timestamp+1e4*n.timeout,i=n.timestamp+1e3*n.timeout;r<Date.now()?e.remove():i<Date.now()&&e.outdated()}}}),1e3*t))},stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}},ht={watchId:null,interval:null,timeout:0,lastSource:null,start(t=k.watch,e=!0){this.timeout=t,"geolocation"in navigator?(this.watchId&&this.stop(),lt(),this.watchId=navigator.geolocation.watchPosition(ut,mt,{timeout:1e3*t,enableHighAccuracy:e,maximumAge:0}),this.interval=setInterval((function(t){t.lastSource.accuracy&&(t.lastSource.update(),lt())}),1e3*t,this)):E.error({type:"locationerror",code:0,message:p.locationerror[0]})},stop(){this.watchId&&(clearInterval(this.interval),navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}},lt=function(){this.lastSource=new it({name:p.ownName,iconid:4,timeout:this.timeout})}.bind(ht),ut=function(t){(this.lastSource.accuracy>t.coords.accuracy||!this.lastSource.accuracy)&&(o(this.lastSource,t.coords),this.lastSource.setPosition([t.coords.latitude,t.coords.longitude]),this.lastSource.timestamp=t.timestamp)}.bind(ht),mt=function(t){t instanceof GeolocationPositionError?E.log("Watcher. "+p.locationerror[t.code]):E.error(t)}.bind(ht),gt=[];function pt(t,e={}){k.update(e),function(t="map"){Y=L.map(t,{center:[51.477928,-.001545],zoomControl:!1,zoom:k.map.defaultZoom,minZoom:k.map.minZoom}),L.tileLayer(window.location.protocol+"//{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(Y),document.getElementsByClassName("leaflet-control-attribution")[0].onclick=function(t){t.preventDefault()},a(Y,nt),Y.trackerIcons=[Y.makeTrackerIcon("./images/phone_0.png"),Y.makeTrackerIcon("./images/phone_b.png"),Y.makeTrackerIcon("./images/phone_g.png"),Y.makeTrackerIcon("./images/phone_r.png"),Y.makeTrackerIcon("./images/phone_y.png")],Y.trackerObjectLayer=L.featureGroup().addTo(Y),Y.trackLayer=L.layerGroup().addTo(Y),Y.tracking=new J(Y,Y.trackLayer),function(t){for(var e in C(),R)R[e].addTo(t)}(Y),Y.locate({setView:!0,timeout:1e3*k.watch,watch:!1}).once("locationfound",(function(t){et()})).once("locationerror",(function(t){E.error(t),et()}))}(t);var n=new NoSleep;n.stop=n.disable,gt=[dt,ht,_,n],window.addEventListener("beforeunload",ft),k.checkMode("watch")&&ht.start(),k.websocket&&_.start(),dt.start(),h()&&document.addEventListener("click",(function t(){document.removeEventListener("click",t,!1),n.enable()}),!1)}function ft(t){for(var e in gt){var n=gt[e];"object"==typeof n&&"stop"in n&&n.stop()}Y.remove()}var kt=new function(t={}){var e=new EventTarget;return e.on=function(t,e){return this.addEventListener(t,e),this},e.once=function(t,e){return this.addEventListener(t,e,{once:!0}),this},e.off=function(t,e){return this.removeEventListener(t,e),this},a(e,t)}({version:"1.4.0",load:function(t="map",e={}){pt(t,e)},SourceLocation:function(t){return new it(t)},Message:function(t){return new at(t)},getMap:function(){return Y},whenReady:function(t){"trackerReady"in Y?t({readyObj:Y.trackerReady}):this.once("trackerready",(function(e){t({readyObj:Y.trackerReady})}))},geoUtil:n,util:e,webview:X});window.Tracker=kt,window.webviewFromTracker=Tracker.webview.fromTracker,window.webviewToTracker=Tracker.webview.toTracker})();