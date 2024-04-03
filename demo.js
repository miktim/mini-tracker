/* 
 * LiteRadar tracker demo, MIT (c) 2019-2023 miktim@mail.ru
 */

var demo = {
    isRunning: false,
    interval: null,
    demos: [],
// timeout in seconds!
    start: function (position = [51.505, - 0.09], timeout, demos) { //
        Tracker.SourceLocation().update(); // test trackererror event
        timeout = timeout || 3;
        demos = demos || 30;
        if (this.isRunning === true)
            return;
        this.isRunning = true;
        for (var i = 1; i <= demos; i++) {
            var d = Tracker.SourceLocation();
            d.id = 'id Demo' + i;
            d.name = 'Demo' + i;
            d.timeout = timeout;
            d.setPosition(position);
            d.heading = this.randInt(0, 360);
            d.iconid = 1; //
            this.demos.push(this.moveRandom(d));
        }
        this.sendDemos();
        this.interval = setInterval(function (self) {
            self.sendDemos();
        }, timeout * 1000, this); //!IE9
        Tracker.Message('Demo started').update();
    },
    stop: function () {
        if (this.interval) {
            clearInterval(this.interval);
            this.isStarted = false;
            Tracker.off('trackererror,trackeraction');
        }
    },
// http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    randInt: function (minInt, maxInt) {
        if (minInt === maxInt)
            return minInt;
        return Math.floor((Math.random() * (maxInt - minInt + 1)) + minInt);
    },
    randDbl: function (minDbl, maxDbl) {
        if (minDbl === maxDbl)
            return minDbl;
        return (Math.random() * (maxDbl - minDbl)) + minDbl;
    },
    moveRandom: function (d) {
        d.heading = (this.randInt(d.heading - 45, d.heading + 45) + 360) % 360;
        var dist = this.randDbl(10, 50); // distance in meters
        d.setPosition(Tracker.geoUtil.radialPoint(d.getPosition(), d.heading, dist));
        d.speed = dist / ((Date.now() - d.timestamp) / 1000); //meters per second
        d.accuracy = this.randDbl(10, 50); // radius!
        d.timestamp = Date.now();
        return d;
    },
    sendDemos: function () {
        for (var i in this.demos) {
            try {
                this.moveRandom(this.demos[i]).update();
            } catch (e) {
                Tracker.Message(e.message).update();
            }
        }
    }
};

Tracker.whenReady(function (e) {
    Tracker.once('trackeraction', function (e) {
        console.log(e);
    }).on('trackererror', function (e) {
        console.log(e);
    });
    window.addEventListener('beforeunload', demo.stop);
    demo.start(e.readyObj.mapCenter);
});