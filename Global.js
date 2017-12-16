var fs = require('file-system');

(function() {
    var my = {};
    var data = [];
    var story = [];
    var clock;

    my.prepData = function(count) {
        data = [];
        for(var i = 0; i < count; i++) {
            data.push(Math.round(Math.random() * count, 0));
        }
    };

    my.getData = function() {
        var newData = [];
        for(var i = 0; i < data.length; i++) {
            newData.push(data[i]);
        }
        return newData;
    };

    my.startClock = function() {clock = new Date()};

    my.getClock = function() {
        var lapsed = new Date() - clock;
        clock = new Date();
        return lapsed;
    };

    my.addStory = function(val) {story.push(val)};

    my.getStory = function() {
        var sb = "";
        for(var i = 0; i < story.length; i++) {
            sb += story[i] + "\n";
        }
        fs.writeFile('results.csv', sb, function(err) {if(err) console.log(err)});
        console.log("Done: Saved to results.csv");
    };

    module.exports = my;
})();
