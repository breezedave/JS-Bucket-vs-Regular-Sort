(function() {
    var my = {};
    var Global;
    var Data;
    var buckets = [];
    var min;
    var max;

    my.Bucket = function(global, data) {
        this.Global = global;
        this.Data = data;
        this.Sort = sort;
    };

    var sort = function(recordsPerPage, page) {
        this.Global.startClock();

        var bucketCount = parseInt(Math.sqrt(this.Data.length));

        for(var i = 0; i <= bucketCount; i++) {
            buckets.push([]);
        }

        for(var i = 0; i < this.Data.length; i++) {
            if(!min || this.Data[i] < min) min = this.Data[i];
            if(!max || this.Data[i] > max) max = this.Data[i];
        }

        var divider = parseInt((max - min) / bucketCount) + 1;
        for(var i = 0; i < this.Data.length; i++) {
            var bucketI = parseInt(this.Data[i]/divider);
            buckets[bucketI].push(this.Data[i]);
        }

        var firstRecordNeeded = recordsPerPage * page;
        var lastRecordNeeded = firstRecordNeeded + recordsPerPage;
        var recordCount = 0;
        var nthNeeded;
        var resultHold = [];
        for(var i = 0; i < buckets.length; i++) {
            recordCount += buckets[i].length;
            if(recordCount >= firstRecordNeeded) {
                resultHold = resultHold.concat(buckets[i]);
                if(typeof nthNeeded === "undefined") nthNeeded = firstRecordNeeded - recordCount;
            }
            if(recordCount > lastRecordNeeded) break;
        }
        var compare = function(a, b) {
            return a - b;
        };
        resultHold.sort(compare);

        var returnData = resultHold.splice(nthNeeded, recordsPerPage);
        var time = this.Global.getClock();
        this.Global.addStory("Bucket, " + this.Data.length + ", " + time);

        return returnData;
    };

    module.exports = my;
})();
