(function() {
    var my = {};
    var Global;
    var Data;

    my.Regular = function(global, data) {
        this.Global = global;
        this.Data = data;
        this.Sort = sort;
    };

    var sort = function(recordsPerPage, page) {
        this.Global.startClock();

        var compare = function(a, b) {
            return a - b;
        };
        this.Data.sort(compare);

        var returnData = this.Data.splice(recordsPerPage * page, recordsPerPage);
        var time = this.Global.getClock();
        this.Global.addStory("Regular, " + (this.Data.length + returnData.length) + ", " + time);

        return returnData;
    };

    module.exports = my;
})();
