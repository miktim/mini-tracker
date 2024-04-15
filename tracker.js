(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}};t.d({},{F:()=>vt});var e={};t.r(e),t.d(e,{TrackerDOMTable:()=>h,createDOMElement:()=>c,extend:()=>i,format:()=>d,formatTime:()=>u,getMobileOperatingSystem:()=>m,getUrlSearchParameter:()=>f,isTouchDevice:()=>p,merge:()=>s,smallScreen:()=>g,toLatLng:()=>o,toPosition:()=>r,trackerMode:()=>k,update:()=>a});var n={};function r(t){return Array.isArray(t)?t:[t.lat,t.lng]}function o(t){return"lat"in t?t:{lat:t[0],lng:t[1]}}function a(t,...e){for(var n in e){var r=e[n];for(var o in r)o in t&&(t[o]=r[o])}return t}function i(t,...e){for(var n in e){var r=e[n];for(var o in r)o in t||(t[o]=r[o])}return t}function s(t,...e){for(var n in e){var r=e[n];for(var o in r)t[o]=r[o]}return t}function c(t,e,n){var r=document.createElement(t);return e&&(r.className=e),n&&n.appendChild(r),r}function l(t=[],e=[],n,r="td"){for(var o=c("tr","tracker-table",n),a=0;a<t.length;a++)c(r,e[a]?e[a]:"tracker-table",o).innerHTML=t[a]}function h(t={}){if(this.tableNode=c("table","tracker-table"),this.tableInfo=t,this.addRow=function(t,e=this.tableInfo.rowClasses){l(t,e,this.tableNode,"td")},this.addHeader=function(t,e=this.tableInfo.headerClasses){l(t,e,this.tableNode,"th")},"header"in t&&this.addHeader(t.header),"table"in t)for(var e=0;e<t.table.length;e++)this.addRow(t.table[e])}function d(t,...e){for(var n=0;n<e.length;n++)t=t.replaceAll("%"+(n+1)+"$",e[n].toString());return t}function u(t){if(t<1e3)return"0:00:00";var e=Math.floor(t/1e3),n=e%60,r=Math.floor(e/60)%60;return Math.floor(e/3600)+":"+(r<10?"0"+r:r)+":"+(n<10?"0"+n:n)}function m(){var t=navigator.userAgent||navigator.vendor||window.opera;return/windows phone/i.test(t)?"Windows Phone":/android/i.test(t)?"Android":/iPad|iPhone|iPod/.test(t)&&!window.MSStream?"iOS":null}function g(){return!(Math.min(screen.width,screen.height)>500)}function p(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function f(t,e=window.location.href){t=t.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function k(t){var e=f("mode");return new RegExp("(^|,)"+t+"(,|$)","i").test(e||"")}t.r(n),t.d(n,{EarthRadius:()=>R,RpD:()=>H,bearing:()=>U,distance:()=>F,heading:()=>_,radialPoint:()=>G,toDegrees:()=>P,toRadians:()=>W});var v={lang:"en-US",ownName:"It's me",msgReady:"Tracker ready",msgLocWaiting:"Waiting for a location...",locationerror:["Geolocation error: no such service","Geolocation error: permission denied","Geolocation error: position unavailable","Geolocation error: timeout expired","Geolocation error: service unavilable"],trackererror:["Unknown error","JSON parse error","Unknown action or action object","Object property is missing or invalid","Outdated object","Internal error"],msgWsOpen:"WebSocket is open: ",msgWsClosed:"WebSocket closed: ",errWebSocket:"WebSocket connection failed: ",actionHistory:"Message history",actionShowAll:"Show all objects",actionSetCenter:"Center map to location",actionSearch:" Search",msgHistory:"Message history: ",msgWildcards:"Search wildcards: ? *",msgFound:"Found: ",msgNotFound:"Nothing found...",msgTapToLocate:"Tap the name to locate",hdrSourceTable:["","Name","LAT,deg","LON,deg","ACC,m","HDG,deg","SPD,km/h","Timestamp"],hdrNodeInfo:"Track: %1$",tblNodeInfo:["Node","Time","Path,km","Speed,km/h","Heading,deg","Course,deg"],actionAbout:"About",set:function(){var t=w.lang.split("-")[0].split("_")[0];b[t]&&a(this,b[t])}},b=[];b.ru={lang:"ru-RU",ownName:"Это я",msgReady:"Трекер загружен",msgLocWaiting:"Ожидаю координаты...",locationerror:["Ошибка геолокации: не поддерживается","Ошибка геолокации: отказано в доступе","Ошибка геолокации: недоступно","Ошибка геолокации: таймаут","Ошибка геолокации: сервис недоступен"],msgWsOpen:"WebSocket открыт: ",msgWsClosed:"WebSocket закрыт: ",errWebSocket:"WebSocket ошибка соединения: ",actionShowAll:"Показать все объекты",actionHistory:"История сообщений",actionSetCenter:"Центрировать по месту",actionSearch:" Поиск",msgHistory:"История сообщений: ",msgWildcards:"Символы подстановки: ? *",msgFound:"Найдено: ",msgNotFound:"Ничего не найдено...",msgTapToLocate:"Для показа коснитесь имени",hdrSourceTable:["","Имя","Широта,deg","Долгота,deg","Точность,m","Пеленг,deg","Скорость,km/h","Время"],hdrNodeInfo:"Трек: %1$",tblNodeInfo:["Узел","Время","Путь,km","Скорость,km/h","Пеленг,deg","Курс,deg"],actionAbout:"About"};var w={mode:"",websocket:"",watch:5,track:{deviation:7,minDistance:20,maxDistance:1e3},outdatingDelay:5,logger:{messageDelay:3,historyLength:20},map:{defaultZoom:16,minZoom:4},lang:"en_US",update:function(t={}){a(this,t),v.set()},checkMode:function(t){return new RegExp("(^|,)"+t+"(,|$)","i").test(this.mode)}};w.mode=f("mode")||w.mode,w.websocket=f("websocket")||w.wsURL,w.lang=f("lang")||navigator.language||w.lang;var y=f("watch");y&&(w.watch=parseInt(y)),(y=f("track"))&&(y=y.split(":"),w.track.deviation=Number(y[0])||w.track.deviation,w.track.minDistance=Number(y[1])||w.track.minDistance,w.track.maxDistance=Number(y[2])||w.track.maxDistance);var T={pane:null};T.pane=c("div","tracker-button");var M=function(){var t=T.pane,e=[{img:"./images/btn_locate.png",title:v.actionSetCenter,onclick:function(){tt.setCenterToLocation()}},{img:"./images/btn_bound.png",title:v.actionShowAll,onclick:function(){tt.fitAllObjects()}},{img:"./images/btn_history.png",title:v.actionHistory,onclick:function(){E.showHistory()}}];for(var n of e){var r=c("div","tracker-button",t);r.addEventListener("click",n.onclick,!1);var o=c("img","tracker-button",r);o.src=n.img,o.title=n.title}var a=c("form","tracker-search",t);a.style.display="",a.onclick=function(){a.searchCriteria.focus(),a.searchCriteria.scrollIntoView(),E.info(v.msgWildcards,5)},a.onsubmit=function(t){document.activeElement.blur();var e=tt.searchObjectsByName(t.target.searchCriteria.value);return C.create(e,v.msgFound),!1};var i=c("input","tracker-search",a);i.type="text",i.name="searchCriteria",i.placeholder=v.actionSearch,i.autocomplete="off"},S={pane:null,paneTitle:null,scrollArea:null},N=function(t,e="tracker-pane"){var n=c("div",e);n.hidden=!0,t.pane=n;var r=c("div","tracker-title",n);t.paneTitle=c("div","tracker-title-text",r);var o=c("img","tracker-title",r);o.src="./images/btn_close.png",o.onclick=function(e){t.pane.hidden=!0}},I={pane:null,paneTitle:null,infoArea:null};N(I),I.infoArea=c("div","tracker-pane",I.pane),I.infoArea.onclick=function(t){var e=I.pane;e.style.marginLeft?e.style.marginLeft="":e.style.marginLeft="-130px"};var O={create:function(t,e){I.pane.hidden=!0,I.paneTitle.innerHTML=e,I.infoArea.innerHTML="",I.pane.hidden=!1;var n=I.infoArea.getBoundingClientRect(),r=new h({rowClasses:["","tracker-cell-wide"]});r.tableNode.style.maxWidth=Math.max(200,n.width)+"px",r.addRow([v.tblNodeInfo[0],t.index+1]),r.addRow([v.tblNodeInfo[1],u(t.totalTime)]),r.addRow([v.tblNodeInfo[2],(t.path/1e3).toFixed(3)]),r.addRow([v.tblNodeInfo[3],(3.6*t.speed).toFixed(0)]),r.addRow([v.tblNodeInfo[4],t.heading?t.heading.toFixed(1):"-"]),r.addRow([v.tblNodeInfo[5],t.course?t.course.toFixed(1):"-"]),I.infoArea.appendChild(r.tableNode)}};N(S),S.scrollArea=c("div","tracker-scroll",S.pane);var x,A=function(){var t=(window.innerHeight||document.documentElement.clientHeight)-145+"px",e=(window.innerWidth||document.documentElement.clientWidth)-25+"px";t===S.scrollArea.style.maxHeight&&e===S.scrollArea.style.maxWidth||(S.scrollArea.style.maxHeight=t,S.scrollArea.style.maxWidth=e)};A(),x=A,"orientation"in window.screen?screen.orientation.addEventListener("oncnange",x):screen.addEventListener("orientationchange",x),window.addEventListener("resize",x);var C={create:function(t,e){S.pane.hidden=!0;var n=t.length;if(0!==n){S.paneTitle.innerHTML=e+n,S.scrollArea.innerHTML="";var r=new h({header:v.hdrSourceTable});r.tableNode.onclick=function(t){if("td"===t.target.tagName.toLowerCase()){var e=t.target.parentNode.lastChild.innerHTML;tt.locateObject(e),S.pane.hidden=!0}},r.tableInfo.rowClasses=["tracker-cell-number","","tracker-cell-number","tracker-cell-number","tracker-cell-number","tracker-cell-number","tracker-cell-number","","tracker-invisible"];for(var o=0;o<n;o++){var a=t[o],i=a.source;r.addRow([(a.tracked?"*":"")+(o+1),i.name,i.getPosition()[0].toFixed(7),i.getPosition()[1].toFixed(7),i.accuracy.toFixed(1),i.heading?i.heading.toFixed(1):"-",i.speed?(3.6*i.speed).toFixed(0):"-",new Date(i.timestamp).toLocaleString(),i.id])}S.scrollArea.appendChild(r.tableNode),S.pane.hidden=!1,E.info(v.msgTapToLocate)}else E.info(v.msgNotFound)}},j={pane:c("div","tracker-console")};j.pane.hidden=!0;var E={log:function(t,e=w.logger.messageDelay){console.log(t),this.update(t,e),this.addToHistory(t)},error:function(t,e=w.logger.messageDelay){console.log(t);var n=t.code?v[t.type][t.code]:t.message;this.update(n,e),this.addToHistory(n)},info:function(t,e=w.logger.messageDelay){this.update(t,e)},timer:null,pane:j.pane,update:function(t,e){this.cancel(),this.pane.innerHTML=t,this.pane.hidden=!1,this.timer=setTimeout((function(t){t.cancel()}),1e3*e,this)},cancel:function(){this.timer&&(clearTimeout(this.timer),this.timer=null,this.pane.hidden=!0)},history:[],historyPane:S,addToHistory:function(t){this.history.length>=w.logger.historyLength&&this.history.pop(),this.history.unshift({time:Date.now(),message:t})},showHistory:function(){this.historyPane.paneTitle.innerHTML=v.msgHistory+this.history.length;for(var t=new h,e=0;e<this.history.length;e++)t.addRow([this.history.length-e,u(Date.now()-this.history[e].time)+" "+this.history[e].message]);S.scrollArea.innerHTML="",S.scrollArea.appendChild(t.tableNode),S.pane.hidden=!1}},D=[new(L.Control.extend({options:{position:"bottomright"},onAdd:function(t){return j.pane}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){return T.pane}})),new(L.Control.extend({options:{position:"bottomleft"},onAdd:function(t){var e=I.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){var e=S.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}}))];const H=Math.PI/180,R=6371e3;var W=function(t){return t*H},P=function(t){return t/H};function F(t,e){var n=Object.values(t),r=Object.values(e),o=W(n[0]),a=W(r[0]),i=W(r[0]-n[0]),s=W(r[1]-n[1]),c=Math.sin(i/2)*Math.sin(i/2)+Math.cos(o)*Math.cos(a)*Math.sin(s/2)*Math.sin(s/2),l=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c));return R*l}function _(t,e){return 360-U(t,e)}function U(t,e){var n=Object.values(t),r=Object.values(e),o=W(n[0]),a=W(n[1]),i=W(r[0]),s=W(r[1]),c=Math.atan2(Math.sin(a-s)*Math.cos(i),Math.cos(o)*Math.sin(i)-Math.sin(o)*Math.cos(i)*Math.cos(a-s))%(2*Math.PI);return(P(c)+360)%360}function G(t,e,n){var r=Object.values(t),o=n/R,a=W(e%360),i=W(r[0]),s=W(r[1]),c=Math.asin(Math.sin(i)*Math.cos(o)+Math.cos(i)*Math.sin(o)*Math.cos(a)),l=s+Math.atan2(Math.sin(a)*Math.sin(o)*Math.cos(i),Math.cos(o)-Math.sin(i)*Math.sin(c));return r=[P(c),(P(l)+540)%360-180],Array.isArray(t)?r:{lat:r[0],lng:r[1]}}function Z(t,e){this.map=t,this.layer=e,this.marker=null,this.name="",this.nodes=[],this.track=L.polyline([],{weight:2,color:"blue"}),this.rubberThread=L.polyline([],{weight:2,color:"red"}),this.lastLatLng=null,this.lastHeading=0,this.isMarkerTracked=function(t){return t===this.marker},this.isTracked=function(){return this.marker},this.start=function(t){this.remove();var e=t.getLatLng();this.rubberThread.setLatLngs([e,e]).addTo(this.layer),this.track.addTo(this.layer),this.name=t.source.name,this.lastLatLng=e,this.lastHeading=t.source.heading||0,this.nodes=[],this.addTrackNode(t.source,0).fire("click"),this.marker=t,this.marker.on("move",this.onMarkerMove)},this.onMarkerMove=function(t){if(this.isMarkerTracked(t.sourceTarget)){this.marker.openTooltip();var e=t.latlng;this.rubberThread.setLatLngs([this.lastLatLng,e]);var n=F(this.lastLatLng,e),r=Math.max(w.track.minDistance,this.marker.source.accuracy),o=_(this.lastLatLng,e);if(n>r&&Math.abs(this.lastHeading-o)>w.track.deviation||n>w.track.maxDistance)this.lastHeading=o,this.addTrackNode(this.marker.source,n).fire("click");else{var a=this.getNodeEntry(this.nodes.length-1);a.course=o,O.create(a,d(v.hdrNodeInfo,this.name))}this.map.setView(e,this.map.getZoom())}}.bind(this),this.addTrackNode=function(t,e){this.lastLatLng=t.getLatLng(),this.track.addLatLng(this.lastLatLng);var n=L.circle(this.lastLatLng,t.accuracy,{weight:1,color:"blue"}).addTo(this.layer);return n.info=this.TrackNodeInfo(this.nodes.length,t.timestamp,e),n.on("click",this.onNodeClick),this.nodes.push(n),n},this.TrackNodeInfo=function(t,e,n){return{i:t,timestamp:e,distance:n,path:0===t?0:this.nodes[t-1].info.path+n}},this.onNodeClick=function(t){var e=t.sourceTarget,n=this.getNodeEntry(e.info.i);O.create(n,d(v.hdrNodeInfo,this.name))}.bind(this),this.getNodeEntry=function(t){return{index:t,totalTime:this.nodes[t].info.timestamp-this.nodes[0].info.timestamp,path:this.nodes[t].info.path,speed:0===t?null:this.nodes[t].info.distance/((this.nodes[t].info.timestamp-this.nodes[t-1].info.timestamp)/1e3),heading:0===t?null:_(this.nodes[t-1].getLatLng(),this.nodes[t].getLatLng()),course:t===this.nodes.length-1?null:_(this.nodes[t].getLatLng(),this.nodes[t+1].getLatLng())}},this.stop=function(){this.marker.off("move",this.onMarkerMove),this.rubberThread.setLatLngs([]),this.marker=null},this.remove=function(){this.track.setLatLngs([]),this.layer.clearLayers()}}var $={subprotocol:"tracker.miktim.org",websocket:null,error:null,start(t=w.websocket){if(t&&!this.websocket){var e=("https:"===window.location.protocol?"wss:":"ws:")+t.replace("ws:","").replace("wss:","");try{this.websocket=new WebSocket(e,this.subprotocol),this.websocket.onmessage=function(t){"string"==typeof t.data&&V.websocket.from(t.data)},this.websocket.onopen=function(t){E.log(v.msgWsOpen+t.target.url)},this.websocket.onclose=B,this.websocket.onerror=J}catch(t){E.error(t)}}},send(t){this.websocket&&this.websocket.send(t)},stop(){this.websocket&&this.websocket.close(1001,"Going away")}},B=function(t){this.error||E.log(v.msgWsClosed+t.target.url,10),this.websocket=null,this.error=null}.bind($),J=function(t){this.error=t,t.message=v.errWebSocket+t.target.url,E.error(t)}.bind($),V={websocket:{from:function(t){z(t,"websocket")},to:function(t){$.send(t)}},webview:{from:function(t){z(t,"webview")},to:function(t){}},javascript:{from:function(t){try{q(t,"javascript")}catch(t){vt.dispatchEvent(new X(t))}},to:function(t){}}};function z(t,e){try{try{var n=JSON.parse(t,e)}catch(t){throw new at(1,n={action:"undefined"})}var r=JSON.stringify({event:"ok:"+n.action});q(n,e),vt.dispatchEvent(new Q(n))}catch(t){t instanceof at||console.log(t),r=JSON.stringify(a({event:"error:"+(n.action?n.action:"undefined"),code:5,message:"Internal error",type:"trackererror"},t))}V[e].to(r)}function q(t,e){try{t.interface=e;var n=t.action.toLowerCase().split(":"),r=K[n[0]][n[1]];if(!r)throw new Error}catch(e){throw new at(2,t)}r(t)}var K={update:{locationsource:function(t){!function(t){if(!(t.id&&t.point[0]&&t.point[0].between(-90,90)&&t.point[1]&&t.point[1].between(-180,180)&&t.accuracy&&t.accuracy>0&&t.timestamp&&Date.now()>=t.timestamp))throw new at(3,t);t.name=t.name||"unknown",t.timeout=t.timeout||w.outdatingDelay;let e=ot[t.id];if(e){if(e=e.getSource(),t.timestamp<=e.timestamp)throw new at(4,t);let n=t.point,r=e.point;t.heading=_(r,n),t.speed=F(r,n)/((t.timestamp-e.timestamp)/1e3)}}(t),tt.onSourceUpdate(new it(t))},message:function(t){try{E.log(t.message.substring(0,64))}catch(e){throw new at(3,t)}}}},Q=function(t){let e=new Event("trackeraction");return e.actionObj=t,e};function X(t){let e=new Event("trackererror");return e.errorObj=t,e}var Y={toTracker:V.webview.from,fromTracker:V.webview.to},tt={};function et(){return new Event("trackerready")}function nt(){tt.trackerReady={event:"ready:tracker:"+vt.version,mapCenter:r(tt.getCenter())},V.websocket.to(JSON.stringify(tt.trackerReady)),V.webview.to(JSON.stringify(tt.trackerReady)),E.log(v.msgReady),vt.dispatchEvent(new et)}String.prototype.replaceAll=function(t,e){return this.split(t).join(e)},ct.prototype.getSource=function(){return this.marker.source},ct.prototype.outdated=function(){this.marker.setOpacity(.4)},ct.prototype.remove=function(){this.marker.removeFrom(tt.trackerObjectLayer),this.accuracyCircle.removeFrom(tt.trackerObjectLayer)};var rt={setCenterToLocation:function(t=w.watch){E.info(v.msgLocWaiting,t),this.locate({setView:!0,timeout:1e3*t,watch:!1}).once("locationfound",(function(t){E.cancel(),this.setZoom(w.map.defaultZoom)})).once("locationerror",(function(t){E.error(t)}))},searchObjectsByName:function(t){t="^"+t.replaceAll("?",".{1}").replaceAll("*",".*")+"$";var e=[];try{var n=new RegExp(t,"i")}catch(t){return E.error(t),e}for(var r in ot)if(n.test(ot[r].name)){var o=ot[r];e.push(new lt(o.marker.source,this.tracking.marker===o.marker))}return e},locateObject:function(t){var e=ot[t].marker,n=this.tracking.marker||e;e===n?this.setView(e.getLatLng(),w.map.defaultZoom):(this.fitAllObjects(),n.openTooltip()),e.openTooltip(),this.tracking.isMarkerTracked(e)||setTimeout((function(t){t.closeTooltip()}),5e3,e)},fitAllObjects:function(){if(this.hasLayer(this.trackerObjectLayer)){var t=this.trackerObjectLayer.getBounds().extend(this.tracking.track.getBounds());t.isValid()&&this.fitBounds(t)}},trackerIcons:[],getTrackerIcon:function(t=2){return t=Math.max(0,Math.min(t,this.trackerIcons.length-1)),this.trackerIcons[t]},makeTrackerIcon:function(t,e){return e=e||32,L.icon({iconSize:[e,e],iconAnchor:[e/2,e],iconUrl:t})},tracking:null,onSourceUpdate:function(t){var e=this.getTrackerIcon(t.iconid),n=ot[t.id],r=t.getLatLng();if(n)n.accuracyCircle.setLatLng(r),n.accuracyCircle.setRadius(Math.min(t.accuracy,1500)),n.marker.source=t,n.marker.setLatLng(r);else{(n=new ct(t)).objectMap=this,n.marker=L.marker(r).bindTooltip(n.name,{className:"tracker-tooltip"}).addTo(this.trackerObjectLayer),n.marker.source=t;var o=function(t){this.tracking.marker?this.tracking.marker===t.target&&this.tracking.stop():this.tracking.start(t.target)}.bind(this);n.marker.on("click",o),n.accuracyCircle=L.circle(r,Math.min(t.accuracy,1500),{weight:1,color:"blue"}).addTo(this.trackerObjectLayer),ot[t.id]=n}return n.marker.setIcon(e),n.marker.setOpacity(1),n}};Number.prototype.between=function(t,e){return this>=t&&this<=e};var ot=[];function at(t=0,e){this.code=t,this.message=v.trackererror[t],this.type="trackererror",this.trackerObj=e}function it(t){this.id="LiteRadar tracker",this.name="tracker",this.iconid=0,this.point=[void 0,void 0],this.accuracy=void 0,this.speed=0,this.heading=0,this.timestamp=Date.now(),this.timeout=w.outdatingDelay,this.getLatLng=function(){return{lat:this.point[0],lng:this.point[1]}},this.setLatLng=function(t){return this.point[0]=t.lat,this.point[1]=t.lng,this},this.getPosition=function(){return this.point},this.setPosition=function(t){return this.point=t,this},this.update=function(){return V.javascript.from(s({action:"update:locationsource"},this)),this},a(this,t)}function st(t){this.message=t,this.update=function(){return V.javascript.from(s({action:"update:message"},this)),this}}function ct(t){this.id=t.id,this.name=t.name}function lt(t,e){this.id=t.id,this.source=t,this.tracked=e}at.prototype=new Error;var ht={interval:null,start(t=w.outdatingDelay){this.stop(),this.interval||(this.interval=setInterval((function(t){for(var e in ot){var n=ot[e];if("outdated"in n){var r=n.getSource(),o=r.timestamp+1e3*r.timeout;o+t<Date.now()?(n.remove(),delete ot[e]):o<Date.now()&&n.outdated()}}}),1e3*t,1e4*t))},stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}},dt={watchId:null,interval:null,timeout:0,lastSource:null,start(t=w.watch,e=!0){this.timeout=t,"geolocation"in navigator?(this.watchId&&this.stop(),ut(),this.watchId=navigator.geolocation.watchPosition(mt,gt,{timeout:1e3*t,enableHighAccuracy:e,maximumAge:0}),this.interval=setInterval((function(t){t.lastSource.accuracy&&(t.lastSource.update(),ut())}),1e3*t,this)):E.error({type:"locationerror",code:4,message:v.locationerror[4]})},stop(){this.watchId&&(clearInterval(this.interval),navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}},ut=function(){this.lastSource=new it({name:v.ownName,iconid:4,timeout:this.timeout})}.bind(dt),mt=function(t){(this.lastSource.accuracy>t.coords.accuracy||!this.lastSource.accuracy)&&(a(this.lastSource,t.coords),this.lastSource.setPosition([t.coords.latitude,t.coords.longitude]),this.lastSource.timestamp=t.timestamp)}.bind(dt),gt=function(t){E.error(i(t,{type:"locationerror"}))}.bind(dt),pt=[];function ft(t,e={}){w.update(e),function(t="map"){tt=L.map(t,{center:[51.477928,-.001545],zoomControl:!1,zoom:w.map.defaultZoom,minZoom:w.map.minZoom}),L.tileLayer(window.location.protocol+"//{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(tt),document.getElementsByClassName("leaflet-control-attribution")[0].onclick=function(t){t.preventDefault()},i(tt,rt),tt.trackerIcons=[tt.makeTrackerIcon("./images/phone_0.png"),tt.makeTrackerIcon("./images/phone_b.png"),tt.makeTrackerIcon("./images/phone_g.png"),tt.makeTrackerIcon("./images/phone_r.png"),tt.makeTrackerIcon("./images/phone_y.png")],tt.trackerObjectLayer=L.featureGroup().addTo(tt),tt.trackLayer=L.layerGroup().addTo(tt),tt.tracking=new Z(tt,tt.trackLayer),function(t){for(var e in M(),D)D[e].addTo(t)}(tt),tt.locate({setView:!0,timeout:1e3*w.watch,watch:!1}).once("locationfound",(function(t){nt()})).once("locationerror",(function(t){E.error(t),nt()}))}(t);var n=new NoSleep;n.stop=n.disable,pt=[ht,dt,$,n],window.addEventListener("beforeunload",kt),w.checkMode("watch")&&dt.start(),w.websocket&&$.start(),ht.start(),m()&&document.addEventListener("click",(function t(){document.removeEventListener("click",t,!1),n.enable()}),!1)}function kt(t){for(var e in pt){var n=pt[e];"object"==typeof n&&"stop"in n&&n.stop()}tt.remove()}var vt=new function(t={}){var e=new EventTarget;return e.on=function(t,e){return this.addEventListener(t,e),this},e.once=function(t,e){return this.addEventListener(t,e,{once:!0}),this},e.off=function(t,e){return this.removeEventListener(t,e),this},i(e,t)}({version:"1.2.1",load:function(t="map",e={}){ft(t,e)},SourceLocation:function(t){return new it(t)},Message:function(t){return new st(t)},getMap:function(){return tt},whenReady:function(t){"trackerReady"in tt?t({readyObj:tt.trackerReady}):this.once("trackerready",(function(e){t({readyObj:tt.trackerReady})}))},geoUtil:n,util:e,webview:Y});window.Tracker=vt})();