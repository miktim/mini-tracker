(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}};t.d({},{F:()=>pt});var e={};t.r(e),t.d(e,{createDOMElement:()=>s,extend:()=>o,format:()=>l,formatTime:()=>d,getMobileOperatingSystem:()=>u,getUrlSearchParameter:()=>g,isTouchDevice:()=>m,merge:()=>c,smallScreen:()=>h,toLatLng:()=>a,toPosition:()=>r,trackerMode:()=>f,update:()=>i});var n={};function r(t){return Array.isArray(t)?t:[t.lat,t.lng]}function a(t){return"lat"in t?t:{lat:t[0],lng:t[1]}}function i(t,...e){for(var n in e){var r=e[n];for(var a in r)a in t&&(t[a]=r[a])}return t}function o(t,...e){for(var n in e){var r=e[n];for(var a in r)a in t||(t[a]=r[a])}return t}function c(t,...e){for(var n in e){var r=e[n];for(var a in r)t[a]=r[a]}return t}function s(t,e,n){var r=document.createElement(t);return r.className=e||"",n&&n.appendChild(r),r}function l(t,...e){for(var n=0;n<e.length;n++)t=t.replaceAll("%"+(n+1)+"$",e[n].toString());return t}function d(t){if(t<1e3)return"0:00:00";var e=Math.floor(t/1e3),n=e%60,r=Math.floor(e/60)%60;return Math.floor(e/3600)+":"+(r<10?"0"+r:r)+":"+(n<10?"0"+n:n)}function u(){var t=navigator.userAgent||navigator.vendor||window.opera;return/windows phone/i.test(t)?"Windows Phone":/android/i.test(t)?"Android":/iPad|iPhone|iPod/.test(t)&&!window.MSStream?"iOS":null}function h(){return!(Math.min(screen.width,screen.height)>500)}function m(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function g(t,e=window.location.href){t=t.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(e);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function f(t){var e=g("mode");return new RegExp("(^|,)"+t+"(,|$)","i").test(e||"")}t.r(n),t.d(n,{EarthRadius:()=>W,RpD:()=>E,bearing:()=>F,distance:()=>R,heading:()=>P,radialPoint:()=>U,toDegrees:()=>D,toRadians:()=>H});var p={lang:"en-US",ownName:"It's me",msgLocWaiting:"Waiting for a location...",locationerror:["Geolocation error: no such service","Geolocation error: permission denied","Geolocation error: position unavailable","Geolocation error: timeout expired","Geolocation error: service unavilable"],trackererror:["Unknown error","JSON parse error","Unknown action or action object","Object property is missing or invalid","Outdated object","Internal error"],msgWsOpen:"WebSocket is open: ",msgWsClosed:"WebSocket closed: ",errWebSocket:"WebSocket connection failed: ",actionShowAll:"Show all objects",actionSetCenter:"Center map to location",actionSearch:" Search",msgWildcards:"Search wildcards: ? *",msgFound:"Found: ",msgNotFound:"Nothing found...",msgTapToLocate:"Tap the name to locate",hdrSourceTable:["","Name","LAT,deg","LON,deg","ACC,m","HDG,deg","SPD,km/h","Timestamp"],hdrNodeInfo:"Track: %1$",tblNodeInfo:["Node","Time","Path,km","Speed,km/h","Heading,deg","Course,deg"],actionAbout:"About",set:function(){var t=v.lang.split("-")[0].split("_")[0];k[t]&&i(this,k[t])}},k=[];k.ru={lang:"ru-RU",ownName:"Это я",msgLocWaiting:"Ожидаю координаты...",locationerror:["Ошибка геолокации: не поддерживается","Ошибка геолокации: отказано в доступе","Ошибка геолокации: недоступно","Ошибка геолокации: таймаут","Ошибка геолокации: сервис недоступен"],msgWsOpen:"WebSocket открыт: ",msgWsClosed:"WebSocket закрыт: ",errWebSocket:"WebSocket ошибка соединения: ",actionShowAll:"Показать все объекты",actionSetCenter:"Центрировать по месту",actionSearch:" Поиск",msgWildcards:"Символы подстановки: ? *",msgFound:"Найдено: ",msgNotFound:"Ничего не найдено...",msgTapToLocate:"Для показа коснитесь имени",hdrSourceTable:["","Имя","Широта,deg","Долгота,deg","Точность,m","Пеленг,deg","Скорость,km/h","Время"],hdrNodeInfo:"Трек: %1$",tblNodeInfo:["Узел","Время","Путь,km","Скорость,km/h","Пеленг,deg","Курс,deg"],actionAbout:"About"};var v={mode:"",websocket:"",watch:5,track:{deviation:7,minDistance:20,maxDistance:1e3},outdatingDelay:5,map:{defaultZoom:16,minZoom:4},lang:"en_US",update:function(t={}){i(this,t),p.set()},checkMode:function(t){return new RegExp("(^|,)"+t+"(,|$)","i").test(this.mode)}};v.mode=g("mode")||v.mode,v.websocket=g("websocket")||v.wsURL,v.lang=g("lang")||navigator.language||v.lang;var w=g("watch");w&&(v.watch=parseInt(w)),(w=g("track"))&&(w=w.split(":"),v.track.deviation=Number(w[0])||v.track.deviation,v.track.minDistance=Number(w[1])||v.track.minDistance,v.track.maxDistance=Number(w[2])||v.track.maxDistance);var b={pane:null};b.pane=s("div","tracker-button");var y=function(){var t=b.pane,e=[{img:"./images/btn_locate.png",title:p.actionSetCenter,onclick:function(){X.setCenterToLocation()}},{img:"./images/btn_bound.png",title:p.actionShowAll,onclick:function(){X.fitAllObjects()}}];for(var n of e){var r=s("div","tracker-button",t);r.addEventListener("click",n.onclick,!1);var a=s("img","tracker-button",r);a.src=n.img,a.title=n.title}var i=s("form","tracker-search",t);i.style.display="",i.onclick=function(){i.searchCriteria.focus(),i.searchCriteria.scrollIntoView(),j.info(p.msgWildcards,5)},i.onsubmit=function(t){document.activeElement.blur();var e=X.searchObjectsByName(t.target.searchCriteria.value);return O.create(e,p.msgFound),!1};var o=s("input","tracker-search",i);o.type="text",o.name="searchCriteria",o.placeholder=p.actionSearch,o.autocomplete="off"},T={pane:null,paneTitle:null,scrollArea:null},M=function(t,e="tracker-pane"){var n=s("div",e);n.hidden=!0,t.pane=n;var r=s("div","tracker-title",n);t.paneTitle=s("div","tracker-title-text",r);var a=s("img","tracker-title",r);a.src="./images/btn_close.png",a.onclick=function(e){t.pane.hidden=!0}},S={pane:null,paneTitle:null,infoArea:null};M(S),S.infoArea=s("div","tracker-pane",S.pane),S.infoArea.onclick=function(t){var e=S.pane;e.style.marginLeft?e.style.marginLeft="":e.style.marginLeft="-100px"};var N={create:function(t,e){S.pane.hidden=!0,S.paneTitle.innerHTML=e,S.infoArea.innerHTML="",S.pane.hidden=!1;var n=S.infoArea.getBoundingClientRect(),r=s("table","tracker-table",S.infoArea);r.style.maxWidth=Math.max(200,n.width)+"px",this.makeRow(r,p.tblNodeInfo[0],t.index+1),this.makeRow(r,p.tblNodeInfo[1],d(t.totalTime)),this.makeRow(r,p.tblNodeInfo[2],(t.path/1e3).toFixed(3)),this.makeRow(r,p.tblNodeInfo[3],(3.6*t.speed).toFixed(0)),this.makeRow(r,p.tblNodeInfo[4],t.heading?t.heading.toFixed(1):"-"),this.makeRow(r,p.tblNodeInfo[5],t.course?t.course.toFixed(1):"-"),S.pane.hidden=!1},makeRow:function(t,e,n){var r=s("tr","tracker-row",t);s("td","tracker-cell",r).innerHTML=e,s("td","tracker-cell-wide",r).innerHTML=n}};M(T),T.scrollArea=s("div","tracker-scroll",T.pane);var x,I=function(){var t=(window.innerHeight||document.documentElement.clientHeight)-145+"px",e=(window.innerWidth||document.documentElement.clientWidth)-25+"px";t===T.scrollArea.style.maxHeight&&e===T.scrollArea.style.maxWidth||(T.scrollArea.style.maxHeight=t,T.scrollArea.style.maxWidth=e)};I(),x=I,"orientation"in window.screen?screen.orientation.addEventListener("oncnange",x):screen.addEventListener("orientationchange",x),window.addEventListener("resize",x);var O={create:function(t,e){T.pane.hidden=!0;var n=t.length;if(0!==n){T.paneTitle.innerHTML=e+n,T.scrollArea.innerHTML="";var r=s("table","tracker-table",T.scrollArea);r.onclick=function(t){if("td"===t.target.tagName.toLowerCase()){var e=t.target.parentNode.lastChild.innerHTML;X.locateObject(e),T.pane.hidden=!0}};var a=s("tr","",r);for(var i in p.hdrSourceTable)s("th","tracker-cell",a).innerHTML=p.hdrSourceTable[i];for(i=0;i<n;i++){var o=t[i],c=o.source,l=s("tr","tracker-table",r);s("td","tracker-cell-number",l).innerHTML=(o.tracked?"*":"")+(i+1),s("td","tracker-cell",l).innerHTML=c.name,s("td","tracker-cell-number",l).innerHTML=c.latitude.toFixed(6),s("td","tracker-cell-number",l).innerHTML=c.longitude.toFixed(6),s("td","tracker-cell-number",l).innerHTML=c.accuracy.toFixed(1);let e=null===c.heading?"-":c.heading.toFixed(1);s("td","tracker-cell-number",l).innerHTML=e,s("td","tracker-cell-number",l).innerHTML=(3.6*c.speed).toFixed(0),s("td","tracker-cell",l).innerHTML=new Date(c.timestamp).toLocaleString(),s("td","tracker-invisible",l).innerHTML=c.id}T.pane.hidden=!1,j.info(p.msgTapToLocate)}else j.info(p.msgNotFound)}},A={pane:s("div","tracker-console")};A.pane.hidden=!0;var j={log:function(t,e=3){console.log(t),this.update(t,e)},error:function(t,e=3){console.log(t);var n=t.code?p[t.type][t.code]:t.message;this.update(n,e)},info:function(t,e=3){this.update(t,e)},timer:null,pane:A.pane,update:function(t,e){this.cancel(),this.pane.innerHTML=t,this.pane.hidden=!1,this.timer=setTimeout((function(t){t.cancel()}),1e3*e,this)},cancel:function(){this.timer&&(clearTimeout(this.timer),this.timer=null,this.pane.hidden=!0)}},C=[new(L.Control.extend({options:{position:"bottomright"},onAdd:function(t){return A.pane}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){return b.pane}})),new(L.Control.extend({options:{position:"bottomleft"},onAdd:function(t){var e=S.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}})),new(L.Control.extend({options:{position:"topright"},onAdd:function(t){var e=T.pane;return L.DomEvent.disableClickPropagation(e),L.DomEvent.disableScrollPropagation(e),e}}))];const E=Math.PI/180,W=6371e3;var H=function(t){return t*E},D=function(t){return t/E};function R(t,e){var n=Object.values(t),r=Object.values(e),a=H(n[0]),i=H(r[0]),o=H(r[0]-n[0]),c=H(r[1]-n[1]),s=Math.sin(o/2)*Math.sin(o/2)+Math.cos(a)*Math.cos(i)*Math.sin(c/2)*Math.sin(c/2),l=2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));return W*l}function P(t,e){return 360-F(t,e)}function F(t,e){var n=Object.values(t),r=Object.values(e),a=H(n[0]),i=H(n[1]),o=H(r[0]),c=H(r[1]),s=Math.atan2(Math.sin(i-c)*Math.cos(o),Math.cos(a)*Math.sin(o)-Math.sin(a)*Math.cos(o)*Math.cos(i-c))%(2*Math.PI);return(D(s)+360)%360}function U(t,e,n){var r=Object.values(t),a=n/W,i=H(e%360),o=H(r[0]),c=H(r[1]),s=Math.asin(Math.sin(o)*Math.cos(a)+Math.cos(o)*Math.sin(a)*Math.cos(i)),l=c+Math.atan2(Math.sin(i)*Math.sin(a)*Math.cos(o),Math.cos(a)-Math.sin(o)*Math.sin(s));return r=[D(s),(D(l)+540)%360-180],Array.isArray(t)?r:{lat:r[0],lng:r[1]}}function _(t,e){this.map=t,this.layer=e,this.marker=null,this.name="",this.nodes=[],this.track=L.polyline([],{weight:2,color:"blue"}),this.rubberThread=L.polyline([],{weight:2,color:"red"}),this.lastLatLng=null,this.lastHeading=0,this.isMarkerTracked=function(t){return t===this.marker},this.isTracked=function(){return this.marker},this.start=function(t){this.remove();var e=t.getLatLng();this.rubberThread.setLatLngs([e,e]).addTo(this.layer),this.track.addTo(this.layer),this.name=t.source.name,this.lastLatLng=e,this.lastHeading=t.source.heading||0,this.nodes=[],this.addTrackNode(t.source,0).fire("click"),this.marker=t,this.marker.on("move",this.onMarkerMove)},this.onMarkerMove=function(t){if(this.isMarkerTracked(t.sourceTarget)){this.marker.openTooltip();var e=t.latlng;this.rubberThread.setLatLngs([this.lastLatLng,e]);var n=R(this.lastLatLng,e),r=Math.max(v.track.minDistance,this.marker.source.accuracy),a=P(this.lastLatLng,e);if(n>r&&Math.abs(this.lastHeading-a)>v.track.deviation||n>v.track.maxDistance)this.lastHeading=a,this.addTrackNode(this.marker.source,n).fire("click");else{var i=this.getNodeEntry(this.nodes.length-1);i.course=a,N.create(i,l(p.hdrNodeInfo,this.name))}this.map.setView(e,this.map.getZoom())}}.bind(this),this.addTrackNode=function(t,e){this.lastLatLng=t.getLatLng(),this.track.addLatLng(this.lastLatLng);var n=L.circle(this.lastLatLng,t.accuracy,{weight:1,color:"blue"}).addTo(this.layer);return n.info=this.TrackNodeInfo(this.nodes.length,t.timestamp,e),n.on("click",this.onNodeClick),this.nodes.push(n),n},this.TrackNodeInfo=function(t,e,n){return{i:t,timestamp:e,distance:n,path:0===t?0:this.nodes[t-1].info.path+n}},this.onNodeClick=function(t){var e=t.sourceTarget,n=this.getNodeEntry(e.info.i);N.create(n,l(p.hdrNodeInfo,this.name))}.bind(this),this.getNodeEntry=function(t){return{index:t,totalTime:this.nodes[t].info.timestamp-this.nodes[0].info.timestamp,path:this.nodes[t].info.path,speed:0===t?null:this.nodes[t].info.distance/((this.nodes[t].info.timestamp-this.nodes[t-1].info.timestamp)/1e3),heading:0===t?null:P(this.nodes[t-1].getLatLng(),this.nodes[t].getLatLng()),course:t===this.nodes.length-1?null:P(this.nodes[t].getLatLng(),this.nodes[t+1].getLatLng())}},this.stop=function(){this.marker.off("move",this.onMarkerMove),this.rubberThread.setLatLngs([]),this.marker=null},this.remove=function(){this.track.setLatLngs([]),this.layer.clearLayers()}}var G={subprotocol:"tracker.miktim.org",websocket:null,error:null,start(t=v.websocket){if(t&&!this.websocket){var e=("https:"===window.location.protocol?"wss:":"ws:")+t.replace("ws:","").replace("wss:","");try{this.websocket=new WebSocket(e,this.subprotocol),this.websocket.onmessage=function(t){"string"==typeof t.data&&B.websocket.from(t.data)},this.websocket.onopen=function(t){j.log(p.msgWsOpen+t.target.url)},this.websocket.onclose=Z,this.websocket.onerror=$}catch(t){j.error(t)}}},send(t){this.websocket&&this.websocket.send(t)},stop(){this.websocket&&this.websocket.close(1001,"Going away")}},Z=function(t){this.error||j.log(p.msgWsClosed+t.target.url,10),this.websocket=null,this.error=null}.bind(G),$=function(t){this.error=t,t.message=p.errWebSocket+t.target.url,j.error(t)}.bind(G),B={websocket:{from:function(t){J(t,"websocket")},to:function(t){G.send(t)}},webview:{from:function(t){J(t,"webview")},to:function(t){}},javascript:{from:function(t){try{V(t,"javascript")}catch(t){pt.dispatchEvent(new K(t))}},to:function(t){}}};function J(t,e){try{try{var n=JSON.parse(t,e)}catch(t){throw new rt(1,n={action:"undefined"})}var r=JSON.stringify({event:"ok:"+n.action});V(n,e),pt.dispatchEvent(new q(n))}catch(t){t instanceof rt||console.log(t),r=JSON.stringify(i({event:"error:"+(n.action?n.action:"undefined"),code:5,message:"Internal error",type:"trackererror"},t))}B[e].to(r)}function V(t,e){try{t.interface=e;var n=t.action.toLowerCase().split(":"),r=z[n[0]][n[1]];if(!r)throw new Error}catch(e){throw new rt(2,t)}r(t)}var z={update:{locationsource:function(t){!function(t){if(!(t.id&&t.latitude&&t.latitude.between(-90,90)&&t.longitude&&t.longitude.between(-180,180)&&t.accuracy&&t.accuracy>0&&t.timestamp&&Date.now()>=t.timestamp))throw new rt(3,t);t.name=t.name||"unknown",t.timeout=t.timeout||v.outdatingDelay;let e=nt[t.id];if(e){if(e=e.getSource(),t.timestamp<=e.timestamp)throw new rt(4,t);let n=[t.latitude,t.longitude],r=[e.latitude,e.longitude];t.heading=P(r,n),t.speed=R(r,n)/((t.timestamp-e.timestamp)/1e3)}}(t),X.onSourceUpdate(new at(t))},message:function(t){try{j.log(t.message.substring(0,64))}catch(e){throw new rt(3,t)}}}},q=function(t){let e=new Event("trackeraction");return e.actionObj=t,e};function K(t){let e=new Event("trackererror");return e.errorObj=t,e}var Q={toTracker:B.webview.from,fromTracker:B.webview.to},X={};function Y(){return new Event("trackerready")}function tt(){X.trackerReady={event:"ready:tracker:"+pt.version,mapCenter:r(X.getCenter())},B.websocket.to(JSON.stringify(X.trackerReady)),B.webview.to(JSON.stringify(X.trackerReady)),pt.dispatchEvent(new Y)}String.prototype.replaceAll=function(t,e){return this.split(t).join(e)},ot.prototype.getSource=function(){return this.marker.source},ot.prototype.outdated=function(){var t=this.getSource();t.timestamp+1e3*t.timeout<Date.now()&&this.marker.setOpacity(.4)},ot.prototype.remove=function(){};var et={setCenterToLocation:function(t=v.watch){j.info(p.msgLocWaiting,t),this.locate({setView:!0,timeout:1e3*t}).on("locationfound",(function(t){j.cancel(),this.setZoom(v.map.defaultZoom)})).on("locationerror",(function(t){j.error(t)}))},searchObjectsByName:function(t){t="^"+t.replaceAll("?",".{1}").replaceAll("*",".*")+"$";var e=[];try{var n=new RegExp(t,"i")}catch(t){return j.error(t),e}for(var r in nt)if(n.test(nt[r].name)){var a=nt[r];e.push(new ct(a.marker.source,this.tracking.marker===a.marker))}return e},locateObject:function(t){var e=nt[t].marker,n=this.tracking.marker||e;e===n?this.setView(e.getLatLng(),v.map.defaultZoom):(this.fitAllObjects(),n.openTooltip()),e.openTooltip(),this.tracking.isMarkerTracked(e)||setTimeout((function(t){t.closeTooltip()}),5e3,e)},fitAllObjects:function(){if(this.hasLayer(this.trackerObjectLayer)){var t=this.trackerObjectLayer.getBounds().extend(this.tracking.track.getBounds());t.isValid()&&this.fitBounds(t)}},trackerIcons:[],getTrackerIcon:function(t=2){return t=Math.max(0,Math.min(t,this.trackerIcons.length-1)),this.trackerIcons[t]},makeTrackerIcon:function(t,e){return e=e||32,L.icon({iconSize:[e,e],iconAnchor:[e/2,e],iconUrl:t})},tracking:null,onSourceUpdate:function(t){var e=this.getTrackerIcon(t.iconid),n=nt[t.id],r=t.getLatLng();if(n)n.accuracyCircle.setLatLng(r),n.accuracyCircle.setRadius(Math.min(t.accuracy,1500)),n.marker.source=t,n.marker.setLatLng(r);else{(n=new ot(t)).objectMap=this,n.marker=L.marker(r).bindTooltip(n.name,{className:"tracker-tooltip"}).addTo(this.trackerObjectLayer),n.marker.source=t;var a=function(t){this.tracking.marker?this.tracking.marker===t.target&&this.tracking.stop():this.tracking.start(t.target)}.bind(this);n.marker.on("click",a),n.accuracyCircle=L.circle(r,Math.min(t.accuracy,1500),{weight:1,color:"blue"}).addTo(this.trackerObjectLayer),nt[t.id]=n}return n.marker.setIcon(e),n.marker.setOpacity(1),n}};Number.prototype.between=function(t,e){return this>=t&&this<=e};var nt=[];function rt(t=0,e){this.code=t,this.message=p.trackererror[t],this.type="trackererror",this.trackerObj=e}function at(t){this.id="LiteRadar tracker",this.name="tracker",this.iconid=0,this.latitude=void 0,this.longitude=void 0,this.accuracy=void 0,this.speed=0,this.heading=0,this.timestamp=Date.now(),this.timeout=v.outdatingDelay,this.getLatLng=function(){return{lat:this.latitude,lng:this.longitude,alt:0}},this.setLatLng=function(t){return this.latitude=t.lat,this.longitude=t.lng,this},this.getPosition=function(){return[this.latitude,this.longitude,0]},this.setPosition=function(t){return this.latitude=t[0],this.longitude=t[1],this},this.update=function(){return B.javascript.from(c({action:"update:locationsource"},this)),this},i(this,t)}function it(t){this.message=t,this.update=function(){return B.javascript.from(c({action:"update:message"},this)),this}}function ot(t){this.id=t.id,this.name=t.name}function ct(t,e){this.id=t.id,this.source=t,this.tracked=e}rt.prototype=new Error;var st={interval:null,start(t=v.outdatingDelay){this.stop(),this.interval||(this.interval=setInterval((function(){for(var t in nt){var e=nt[t];"outdated"in e&&e.outdated()}}),1e3*t))},stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}},lt={watchId:null,interval:null,timeout:0,lastSource:null,start(t=v.watch,e=!0){this.timeout=t,"geolocation"in navigator?(this.watchId&&this.stop(),dt(),this.watchId=navigator.geolocation.watchPosition(ut,ht,{timeout:1e3*t,enableHighAccuracy:e,maximumAge:0}),this.interval=setInterval((function(t){t.lastSource.latitude&&(t.lastSource.update(),dt())}),1e3*t,this)):j.error({type:"locationerror",code:4,message:p.locationerror[4]})},stop(){this.watchId&&(clearInterval(this.interval),navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}},dt=function(){this.lastSource=new at({name:p.ownName,accuracy:1e6,iconid:4,timeout:this.timeout})}.bind(lt),ut=function(t){this.lastSource.accuracy>t.coords.accuracy&&(i(this.lastSource,t.coords),this.lastSource.timestamp=t.timestamp)}.bind(lt),ht=function(t){j.error(o(t,{type:"locationerror"}))}.bind(lt),mt=[];function gt(t,e={}){v.update(e),function(t="map"){X=L.map(t,{center:[51.477928,-.001545],zoomControl:!1,zoom:v.map.defaultZoom,minZoom:v.map.minZoom}),L.tileLayer(window.location.protocol+"//{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(X),document.getElementsByClassName("leaflet-control-attribution")[0].onclick=function(t){t.preventDefault()},o(X,et),X.trackerIcons=[X.makeTrackerIcon("./images/phone_0.png"),X.makeTrackerIcon("./images/phone_b.png"),X.makeTrackerIcon("./images/phone_g.png"),X.makeTrackerIcon("./images/phone_r.png"),X.makeTrackerIcon("./images/phone_y.png")],X.trackerObjectLayer=L.featureGroup().addTo(X),X.trackLayer=L.layerGroup().addTo(X),X.tracking=new _(X,X.trackLayer),function(t){for(var e in y(),C)C[e].addTo(t)}(X),X.locate({setView:!0,timeout:1e3*v.watch,watch:!1}).once("locationfound",(function(t){tt()})).once("locationerror",(function(t){j.error(t),tt()}))}(t);var n=new NoSleep;n.stop=n.disable,mt=[st,lt,G,n],window.addEventListener("beforeunload",ft),v.checkMode("watch")&&lt.start(),v.websocket&&G.start(),st.start(),u()&&document.addEventListener("click",(function t(){document.removeEventListener("click",t,!1),n.enable()}),!1)}function ft(t){for(var e in mt){var n=mt[e];"object"==typeof n&&"stop"in n&&n.stop()}X.remove()}var pt=new function(t={}){var e=new EventTarget;return e.on=function(t,e){return this.addEventListener(t,e),this},e.once=function(t,e){return this.addEventListener(t,e,{once:!0}),this},e.off=function(t,e){return this.removeEventListener(t,e),this},o(e,t)}({version:"1.1.0",load:function(t="map",e={}){gt(t,e)},SourceLocation:function(t){return new at(t)},Message:function(t){return new it(t)},getMap:function(){return X},whenReady:function(t){"trackerReady"in X?t({readyObj:X.trackerReady}):this.once("trackerready",(function(e){t({readyObj:X.trackerReady})}))},geoUtil:n,util:e,webview:Q});window.Tracker=pt})();