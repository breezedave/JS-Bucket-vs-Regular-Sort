var gulp = require("gulp");
var Global = require("./Global");

gulp.task("default", function() {
    for(var log = 2; log < 8; log++) {
        for(var n = 1; n < 10; n++) {
            if(log === 7 && n == 3) break;
            looper(n, log, Global);
            console.log("n: " + n + " log: " + log);
        }
    }
    Global.getStory();
});

var looper = function(n, log, Global) {
    var RegularObj = require("./Sorts/Regular");
    var BucketObj = require("./Sorts/Bucket");
    var DataCount = n * Math.pow(10, log);
    var recordsPerPage = 100;
    var page = DataCount / recordsPerPage - 1;

    Global.startClock();
    Global.prepData(DataCount);

    var Regular = new RegularObj.Regular(Global, Global.getData());
    var regularVals = Regular.Sort(recordsPerPage, page);

    var Bucket = new BucketObj.Bucket(Global, Global.getData());
    var bucketVals = Bucket.Sort(recordsPerPage, page);
}
