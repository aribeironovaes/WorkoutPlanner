/// <reference path="MyMath.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyMath = (function () {
    function MyMath() {
    }
    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */
    MyMath.decimalAdjust = function (type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    };
    MyMath.round10 = function (value, exp) {
        return MyMath.decimalAdjust('round', value, exp);
    };
    MyMath.floor10 = function (value, exp) {
        return MyMath.decimalAdjust('floor', value, exp);
    };
    MyMath.ceil10 = function (value, exp) {
        return MyMath.decimalAdjust('ceil', value, exp);
    };
    return MyMath;
})();
(function (SportType) {
    SportType[SportType["Unknown"] = -1] = "Unknown";
    SportType[SportType["Swim"] = 0] = "Swim";
    SportType[SportType["Bike"] = 1] = "Bike";
    SportType[SportType["Run"] = 2] = "Run";
})(exports.SportType || (exports.SportType = {}));
var SportType = exports.SportType;
var DistanceUnit;
(function (DistanceUnit) {
    DistanceUnit[DistanceUnit["Unknown"] = 0] = "Unknown";
    DistanceUnit[DistanceUnit["Miles"] = 1] = "Miles";
    DistanceUnit[DistanceUnit["Kilometers"] = 2] = "Kilometers";
    DistanceUnit[DistanceUnit["Meters"] = 3] = "Meters";
    DistanceUnit[DistanceUnit["Yards"] = 4] = "Yards";
})(DistanceUnit || (DistanceUnit = {}));
var DistanceUnitHelper = (function () {
    function DistanceUnitHelper() {
    }
    DistanceUnitHelper.convertTo = function (value, unitFrom, unitTo) {
        // convert first to meters
        var distanceInMeters = 0;
        if (unitFrom == 2 /* Kilometers */) {
            distanceInMeters = value * 1000;
        }
        else if (unitFrom == 3 /* Meters */) {
            distanceInMeters = value;
        }
        else if (unitFrom == 1 /* Miles */) {
            distanceInMeters = value * 1609.344;
        }
        else if (unitFrom == 4 /* Yards */) {
            distanceInMeters = value * 0.9144;
        }
        else {
            throw new Error("Unknown distance unit");
        }
        // convert to final unit
        if (unitTo == 2 /* Kilometers */) {
            return distanceInMeters / 1000;
        }
        else if (unitTo == 3 /* Meters */) {
            return distanceInMeters;
        }
        else if (unitTo == 1 /* Miles */) {
            return distanceInMeters / 1609.344;
        }
        else if (unitTo == 4 /* Yards */) {
            return distanceInMeters / 0.9144;
        }
        else {
            return -1;
        }
    };
    return DistanceUnitHelper;
})();
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["Unknown"] = 0] = "Unknown";
    TimeUnit[TimeUnit["Seconds"] = 1] = "Seconds";
    TimeUnit[TimeUnit["Minutes"] = 2] = "Minutes";
    TimeUnit[TimeUnit["Hours"] = 3] = "Hours";
})(TimeUnit || (TimeUnit = {}));
var TimeUnitHelper = (function () {
    function TimeUnitHelper() {
    }
    TimeUnitHelper.convertTo = function (value, unitFrom, unitTo) {
        var timeInSeconds = 0;
        if (unitFrom == 1 /* Seconds */) {
            timeInSeconds = value;
        }
        else if (unitFrom == 2 /* Minutes */) {
            timeInSeconds = value * 60;
        }
        else if (unitFrom == 3 /* Hours */) {
            timeInSeconds = value * 3600;
        }
        else {
            throw new Error("Unknown time unit");
        }
        // convert to final unit
        if (unitTo == 1 /* Seconds */) {
            return timeInSeconds;
        }
        else if (unitTo == 2 /* Minutes */) {
            return timeInSeconds / 60;
        }
        else if (unitTo == 3 /* Hours */) {
            return timeInSeconds / 3600;
        }
        else {
            return -1;
        }
    };
    return TimeUnitHelper;
})();
function getStringFromDurationUnit(unit) {
    switch (unit) {
        case 4 /* Miles */:
            return "mi";
        case 5 /* Kilometers */:
            return "km";
        case 3 /* Meters */:
            return "m";
        case 2 /* Hours */:
            return "h";
        case 1 /* Minutes */:
            return "min";
        case 0 /* Seconds */:
            return "s";
        default:
            return "unknown";
    }
}
var DurationUnitHelper = (function () {
    function DurationUnitHelper() {
    }
    DurationUnitHelper.isTime = function (durationUnit) {
        return (durationUnit == 2 /* Hours */ || durationUnit == 1 /* Minutes */ || durationUnit == 0 /* Seconds */);
    };
    DurationUnitHelper.isDistance = function (durationUnit) {
        return !DurationUnitHelper.isTime(durationUnit);
    };
    DurationUnitHelper.getDistanceMiles = function (unit, value) {
        if (DurationUnitHelper.isTime(unit)) {
            return 0;
        }
        else {
            var distance = value;
            if (unit == 3 /* Meters */) {
                return DistanceUnitHelper.convertTo(value, 3 /* Meters */, 1 /* Miles */);
            }
            else if (unit == 5 /* Kilometers */) {
                return DistanceUnitHelper.convertTo(value, 2 /* Kilometers */, 1 /* Miles */);
            }
            else if (unit == 4 /* Miles */) {
                return distance;
            }
            else {
                return 0;
            }
        }
    };
    DurationUnitHelper.getDurationSeconds = function (unit, value) {
        if (DurationUnitHelper.isDistance(unit)) {
            return 0;
        }
        else {
            var time = value;
            if (unit == 2 /* Hours */) {
                return TimeUnitHelper.convertTo(value, 3 /* Hours */, 1 /* Seconds */);
            }
            else if (unit == 1 /* Minutes */) {
                return TimeUnitHelper.convertTo(value, 2 /* Minutes */, 1 /* Seconds */);
            }
            else if (unit == 0 /* Seconds */) {
                return time;
            }
            else {
                return 0;
            }
        }
    };
    return DurationUnitHelper;
})();
var Duration = (function () {
    function Duration(unit, value, estimatedDurationInSeconds, estimatedDistanceInMiles) {
        this.unit = unit;
        this.value = value;
        if (estimatedDistanceInMiles == 0 && DurationUnitHelper.isDistance(unit)) {
            this.estimatedDistanceInMiles = DurationUnitHelper.getDistanceMiles(unit, value);
        }
        else {
            this.estimatedDistanceInMiles = estimatedDistanceInMiles;
        }
        if (estimatedDurationInSeconds == 0 && DurationUnitHelper.isTime(unit)) {
            this.estimatedDurationInSeconds = DurationUnitHelper.getDurationSeconds(unit, value);
        }
        else {
            this.estimatedDurationInSeconds = estimatedDurationInSeconds;
        }
    }
    Duration.prototype.getUnit = function () {
        return this.unit;
    };
    Duration.prototype.getValue = function () {
        return this.value;
    };
    Duration.prototype.getSeconds = function () {
        return this.estimatedDurationInSeconds;
    };
    Duration.prototype.getDistanceInMiles = function () {
        return this.estimatedDistanceInMiles;
    };
    Duration.prototype.toStringDistance = function () {
        if (DurationUnitHelper.isDistance(this.unit)) {
            return MyMath.round10(this.value, -1) + getStringFromDurationUnit(this.unit);
        }
        else {
            return MyMath.round10(this.estimatedDistanceInMiles, -1) + getStringFromDurationUnit(4 /* Miles */);
        }
    };
    Duration.prototype.toStringTime = function () {
        var result = "";
        var hours = (this.estimatedDurationInSeconds / 3600) | 0;
        var minutes = ((this.estimatedDurationInSeconds - hours * 3600) / 60) | 0;
        var seconds = (this.estimatedDurationInSeconds % 60) | 0;
        if (hours != 0) {
            result += hours + "hr";
        }
        if (minutes != 0) {
            result += minutes + "min";
        }
        if (seconds != 0) {
            result += seconds + "sec";
        }
        if (result.length == 0) {
            throw new Error("Result cannot be empty. seconds:" + this.estimatedDurationInSeconds);
        }
        return result;
    };
    Duration.prototype.toString = function () {
        if (DurationUnitHelper.isTime(this.unit)) {
            return this.toStringTime();
        }
        else {
            return this.toStringDistance();
        }
    };
    Duration.combine = function (dur1, dur2) {
        var estTime = dur1.getSeconds() + dur2.getSeconds();
        var estDistance = dur1.getDistanceInMiles() + dur2.getDistanceInMiles();
        if (DurationUnitHelper.isTime(dur1.getUnit())) {
            if (DurationUnitHelper.isTime(dur2.getUnit())) {
                // Both are Time
                // Convert both to seconds
                var time1 = DurationUnitHelper.getDurationSeconds(dur1.getUnit(), dur1.getValue());
                var time2 = DurationUnitHelper.getDurationSeconds(dur2.getUnit(), dur2.getValue());
                return new Duration(0 /* Seconds */, time1 + time2, estTime, estDistance);
            }
            else {
                throw new Error("Not supported merging durations of time and distance");
            }
        }
        else {
            if (DurationUnitHelper.isTime(dur2.getUnit())) {
                throw new Error("Not supported merging durations of time and distance");
            }
            else {
                var distance1 = DurationUnitHelper.getDistanceMiles(dur1.getUnit(), dur1.getValue());
                var distance2 = DurationUnitHelper.getDistanceMiles(dur2.getUnit(), dur2.getValue());
                return new Duration(4 /* Miles */, distance1 + distance2, estTime, estDistance);
            }
        }
    };
    return Duration;
})();
function getStringFromIntensityUnit(unit) {
    switch (unit) {
        case 1 /* Watts */:
            return "w";
        case 0 /* IF */:
            return "%";
        case 2 /* MinMi */:
            return "min/mi";
        case 3 /* Mph */:
            return "mi/hr";
        case 4 /* Kmh */:
            return "km/hr";
        case 5 /* MinKm */:
            return "min/km";
        default:
            return "unknown";
    }
}
function getDurationUnitFromString(unit) {
    var conversionMap = {
        "mi": 4 /* Miles */,
        "km": 5 /* Kilometers */,
        "m": 3 /* Meters */,
        "h": 2 /* Hours */,
        "hr": 2 /* Hours */,
        "hour": 2 /* Hours */,
        "hours": 2 /* Hours */,
        "min": 1 /* Minutes */,
        "sec": 0 /* Seconds */,
        "s": 0 /* Seconds */
    };
    if (unit in conversionMap) {
        return conversionMap[unit];
    }
    else {
        return -1 /* Unknown */;
    }
}
function getIntensityUnitFromString(unit) {
    var conversionMap = {
        "w": 1 /* Watts */,
        "watts": 1 /* Watts */,
        "%": 0 /* IF */,
        "min/mi": 2 /* MinMi */,
        "mi/hr": 3 /* Mph */,
        "km/hr": 4 /* Kmh */,
        "min/km": 5 /* MinKm */
    };
    if (unit in conversionMap) {
        return conversionMap[unit];
    }
    else {
        return -1 /* Unknown */;
    }
}
function getIntensityUnit(unit) {
    if (unit == 1 /* Watts */) {
        return "w";
    }
    else if (unit == 0 /* IF */) {
        return "%";
    }
    else if (unit == 2 /* MinMi */) {
        return "min/mi";
    }
    else if (unit == 3 /* Mph */) {
        return "mi/h";
    }
    else if (unit == 5 /* MinKm */) {
        return "min/km";
    }
    else if (unit == 4 /* Kmh */) {
        return "km/h";
    }
    else {
        throw new Error("Invalid IntensityUnit");
        return "";
    }
}
function isDurationUnit(value) {
    return getDurationUnitFromString(value) != -1 /* Unknown */;
}
function isIntensityUnit(value) {
    return getIntensityUnitFromString(value) != -1 /* Unknown */;
}
var DurationUnit;
(function (DurationUnit) {
    DurationUnit[DurationUnit["Unknown"] = -1] = "Unknown";
    DurationUnit[DurationUnit["Seconds"] = 0] = "Seconds";
    DurationUnit[DurationUnit["Minutes"] = 1] = "Minutes";
    DurationUnit[DurationUnit["Hours"] = 2] = "Hours";
    DurationUnit[DurationUnit["Meters"] = 3] = "Meters";
    DurationUnit[DurationUnit["Miles"] = 4] = "Miles";
    DurationUnit[DurationUnit["Kilometers"] = 5] = "Kilometers";
})(DurationUnit || (DurationUnit = {}));
(function (IntensityUnit) {
    IntensityUnit[IntensityUnit["Unknown"] = -1] = "Unknown";
    IntensityUnit[IntensityUnit["IF"] = 0] = "IF";
    IntensityUnit[IntensityUnit["Watts"] = 1] = "Watts";
    IntensityUnit[IntensityUnit["MinMi"] = 2] = "MinMi";
    IntensityUnit[IntensityUnit["Mph"] = 3] = "Mph";
    IntensityUnit[IntensityUnit["Kmh"] = 4] = "Kmh";
    IntensityUnit[IntensityUnit["MinKm"] = 5] = "MinKm";
})(exports.IntensityUnit || (exports.IntensityUnit = {}));
var IntensityUnit = exports.IntensityUnit;
var IntensityUnitHelper = (function () {
    function IntensityUnitHelper() {
    }
    IntensityUnitHelper.convertTo = function (value, unitFrom, unitTo) {
        var invalidUnitsForConversion = [
            -1 /* Unknown */,
            0 /* IF */,
            1 /* Watts */
        ];
        if (invalidUnitsForConversion.indexOf(unitFrom) != -1 || invalidUnitsForConversion.indexOf(unitTo) != -1) {
            throw new Error("Invalid unitFrom or unitTo for conversion");
        }
        var speedMph = 0;
        if (unitFrom == 3 /* Mph */) {
            speedMph = value;
        }
        else if (unitFrom == 2 /* MinMi */) {
            speedMph = 60 / value;
        }
        else if (unitFrom == 4 /* Kmh */) {
            speedMph = DistanceUnitHelper.convertTo(value, 2 /* Kilometers */, 1 /* Miles */);
        }
        else if (unitFrom == 5 /* MinKm */) {
            speedMph = 60 / DistanceUnitHelper.convertTo(value, 2 /* Kilometers */, 1 /* Miles */);
        }
        else {
            throw new Error("Unknown IntensityUnit!");
        }
        var result = 0;
        if (unitTo == 3 /* Mph */) {
            result = speedMph;
        }
        else if (unitTo == 2 /* MinMi */) {
            result = 60 / speedMph;
        }
        else if (unitTo == 4 /* Kmh */) {
            result = DistanceUnitHelper.convertTo(speedMph, 1 /* Miles */, 2 /* Kilometers */);
        }
        else if (unitTo == 5 /* MinKm */) {
            result = 60 / DistanceUnitHelper.convertTo(speedMph, 1 /* Miles */, 2 /* Kilometers */);
        }
        else {
            throw new Error("Unknown IntensityUnit!");
        }
        return result;
    };
    return IntensityUnitHelper;
})();
;
var Intensity = (function () {
    function Intensity(ifValue, value, unit) {
        if (ifValue === void 0) { ifValue = 0; }
        if (value === void 0) { value = 0; }
        if (unit === void 0) { unit = 0 /* IF */; }
        // HACK: Find a better way of doing this
        if (ifValue > 10) {
            ifValue = ifValue / 100;
        }
        if (unit == 0 /* IF */) {
            // HACK: Find a vetter way of doing this
            if (value > 10) {
                value = value / 100;
            }
            this.value = ifValue;
            this.originalUnit = 0 /* IF */;
            this.originalValue = value;
        }
        else {
            this.value = ifValue;
            this.originalUnit = unit;
            this.originalValue = value;
        }
    }
    Intensity.prototype.getValue = function () {
        return this.value;
    };
    Intensity.prototype.toString = function () {
        if (this.originalUnit == 0 /* IF */) {
            return MyMath.round10(100 * this.originalValue, -1) + "%";
        }
        else {
            return MyMath.round10(this.originalValue, -1) + getStringFromIntensityUnit(this.originalUnit);
        }
    };
    Intensity.combine = function (intensities, weights) {
        if (weights.length != intensities.length) {
            throw new Error("The size of intensities and weights should be the same");
        }
        // do a weighed sum
        var sum1 = 0;
        var sum2 = 0;
        for (var i = 0; i < intensities.length; i++) {
            sum1 += intensities[i].getValue() * weights[i];
            sum2 += weights[i];
        }
        return Intensity.create(sum1 / sum2);
    };
    Intensity.create = function (intensity) {
        return new Intensity(intensity);
    };
    return Intensity;
})();
exports.Intensity = Intensity;
var BaseInterval = (function () {
    function BaseInterval(title) {
        this.title = title;
    }
    BaseInterval.prototype.getTitle = function () {
        return this.title;
    };
    BaseInterval.prototype.getIntensity = function () {
        throw new Error("not implemented");
    };
    BaseInterval.prototype.getDuration = function () {
        throw new Error("not implemented");
    };
    return BaseInterval;
})();
var SimpleInterval = (function (_super) {
    __extends(SimpleInterval, _super);
    function SimpleInterval(title, intensity, duration) {
        _super.call(this, title);
        this.intensity = intensity;
        this.duration = duration;
    }
    SimpleInterval.prototype.getIntensity = function () {
        return this.intensity;
    };
    SimpleInterval.prototype.getDuration = function () {
        return this.duration;
    };
    return SimpleInterval;
})(BaseInterval);
var BuildInterval = (function (_super) {
    __extends(BuildInterval, _super);
    function BuildInterval(title, startIntensity, endIntensity, duration) {
        _super.call(this, title);
        this.startIntensity = startIntensity;
        this.endIntensity = endIntensity;
        this.duration = duration;
    }
    BuildInterval.prototype.getIntensity = function () {
        return BuildInterval.computeAverageIntensity(this.startIntensity, this.endIntensity);
    };
    BuildInterval.prototype.getDuration = function () {
        return this.duration;
    };
    BuildInterval.prototype.getStartIntensity = function () {
        return this.startIntensity;
    };
    BuildInterval.prototype.getEndIntensity = function () {
        return this.endIntensity;
    };
    BuildInterval.computeAverageIntensity = function (intensity1, intensity2) {
        return Intensity.combine([intensity1, intensity2], [1, 1]);
    };
    return BuildInterval;
})(BaseInterval);
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
var ArrayInterval = (function () {
    function ArrayInterval(title, intervals) {
        this.title = title;
        this.intervals = intervals;
    }
    ArrayInterval.prototype.getIntensity = function () {
        var intensities = this.intervals.map(function (value, index, array) {
            return value.getIntensity();
        });
        var weights = this.intervals.map(function (value, index, array) {
            return value.getDuration().getSeconds();
        });
        return Intensity.combine(intensities, weights);
    };
    ArrayInterval.prototype.getDuration = function () {
        // It will create dummy intervals along the way so that I can use
        // the reduce abstraction
        var res = this.intervals.reduce(function (previousValue, currentValue) {
            var duration = Duration.combine(previousValue.getDuration(), currentValue.getDuration());
            // Create a dummy interval with the proper duration
            return new SimpleInterval("", new Intensity(0), duration);
        });
        return res.getDuration();
    };
    ArrayInterval.prototype.getTitle = function () {
        return this.title;
    };
    ArrayInterval.prototype.getIntervals = function () {
        return this.intervals;
    };
    ArrayInterval.prototype.getTSS = function () {
        var tssVisitor = new TSSVisitor();
        VisitorHelper.visit(tssVisitor, this);
        return MyMath.round10(tssVisitor.getTSS(), -1);
    };
    ArrayInterval.prototype.getIntensities = function () {
        var iv = new IntensitiesVisitor();
        VisitorHelper.visit(iv, this);
        return iv.getIntensities();
    };
    ArrayInterval.prototype.getTimeSeries = function () {
        var pv = new DataPointVisitor();
        VisitorHelper.visit(pv, this);
        // TODO: Massaging the data here to show in minutes
        return pv.data.map(function (item) {
            return {
                x: item.x.getSeconds() / 60,
                y: Math.round(item.y.getValue() * 100)
            };
        });
    };
    ArrayInterval.prototype.getTimeInZones = function () {
        var zv = new ZonesVisitor();
        VisitorHelper.visit(zv, this);
        return zv.getTimeInZones();
    };
    return ArrayInterval;
})();
var RepeatInterval = (function (_super) {
    __extends(RepeatInterval, _super);
    function RepeatInterval(title, mainInterval, restInterval, repeatCount) {
        var intervals = [];
        if (mainInterval != null) {
            intervals.push(mainInterval);
        }
        if (restInterval != null) {
            intervals.push(restInterval);
        }
        _super.call(this, title, intervals);
        this.repeatCount = repeatCount;
    }
    RepeatInterval.prototype.getDuration = function () {
        var baseDuration = _super.prototype.getDuration.call(this);
        return new Duration(baseDuration.getUnit(), baseDuration.getValue() * this.repeatCount, baseDuration.getSeconds() * this.getRepeatCount(), baseDuration.getDistanceInMiles() * this.getRepeatCount());
    };
    RepeatInterval.prototype.getRepeatCount = function () {
        return this.repeatCount;
    };
    return RepeatInterval;
})(ArrayInterval);
var IntervalParser = (function () {
    function IntervalParser() {
    }
    IntervalParser.getCharVal = function (ch) {
        if (ch.length == 1) {
            return ch.charCodeAt(0);
        }
        else {
            return 0;
        }
    };
    IntervalParser.isDigit = function (ch) {
        return ch.length == 1 && IntervalParser.getCharVal(ch) >= IntervalParser.getCharVal("0") && IntervalParser.getCharVal(ch) <= IntervalParser.getCharVal("9");
    };
    IntervalParser.isLetter = function (ch) {
        return ch.length == 1 && IntervalParser.getCharVal(ch) >= IntervalParser.getCharVal("a") && IntervalParser.getCharVal(ch) <= IntervalParser.getCharVal("z");
    };
    IntervalParser.parseInt = function (input, i) {
        var value = 0;
        for (; i < input.length; i++) {
            var ch = input[i];
            if (IntervalParser.isDigit(ch)) {
                value = value * 10 + IntervalParser.getCharVal(ch) - IntervalParser.getCharVal("0");
            }
            else {
                break;
            }
        }
        // points to the last valid char
        return { i: i - 1, value: value };
    };
    IntervalParser.isWhitespace = function (ch) {
        return ch.length == 1 && (ch == " " || ch == "\t" || ch == "\n");
    };
    IntervalParser.throwParserError = function (column, msg) {
        throw Error("Error while parsing input on column " + column + "-  Error: " + msg);
    };
    IntervalParser.parse = function (factory, input) {
        var result = new ArrayInterval("Workout", []);
        var stack = [result];
        for (var i = 0; i < input.length; i++) {
            var ch = input[i];
            if (ch == "(") {
                i++;
                var nums = {
                    0: 0,
                    1: 0,
                    2: 0
                };
                var units = {
                    0: "",
                    1: "",
                    2: ""
                };
                var title = "";
                var numIndex = 0;
                var isInTitle = false;
                for (; i < input.length; i++) {
                    ch = input[i];
                    if (ch == ")") {
                        // simple workout completed, pop element from stack and create
                        var interval;
                        var durationValue;
                        var durationUnit;
                        var intensities = [];
                        // Do we have the units?
                        var containsUnit = units[0] != "" || units[1] != "" || units[2] != "";
                        // Tries to be forgiving by guessing the unit by using the biggest value
                        // TODO: not working with build intervals
                        if (!containsUnit) {
                            if (nums[0] < nums[1]) {
                                units[0] = "min";
                                units[1] = "%";
                            }
                            else {
                                units[0] = "%";
                                units[1] = "min";
                            }
                        }
                        for (var k = 0; k < 3; k++) {
                            if (isDurationUnit(units[k])) {
                                durationUnit = getDurationUnitFromString(units[k]);
                                durationValue = nums[k];
                            }
                            else if (nums[k] != 0) {
                                var intensityUnit = 0 /* IF */;
                                if (isIntensityUnit(units[k])) {
                                    intensityUnit = getIntensityUnitFromString(units[k]);
                                }
                                intensities.push(factory.createIntensity(nums[k], intensityUnit));
                            }
                        }
                        if (intensities.length == 2) {
                            var startIntensity = intensities[0];
                            var endIntensity = intensities[1];
                            var intensity = BuildInterval.computeAverageIntensity(startIntensity, endIntensity);
                            var duration = factory.createDuration(intensity, durationUnit, durationValue);
                            interval = new BuildInterval(title.trim(), startIntensity, endIntensity, duration);
                        }
                        else if (intensities.length == 1) {
                            var intensity = intensities[0];
                            var duration = factory.createDuration(intensity, durationUnit, durationValue);
                            interval = new SimpleInterval(title.trim(), intensity, duration);
                        }
                        else {
                            IntervalParser.throwParserError(i, "Cannot have less than 1 intensity");
                        }
                        stack[stack.length - 1].getIntervals().push(interval);
                        break;
                    }
                    else if (ch == ",") {
                        numIndex++;
                        isInTitle = false;
                    }
                    else {
                        if (IntervalParser.isDigit(ch) && !isInTitle) {
                            var res = IntervalParser.parseInt(input, i);
                            i = res.i;
                            nums[numIndex] = res.value;
                            // look for a unit
                            var unitStr = "";
                            for (var j = i + 1; j < input.length; j++) {
                                if (IntervalParser.isLetter(input[j])) {
                                    unitStr += input[j];
                                }
                                else {
                                    break;
                                }
                            }
                            units[numIndex] = unitStr;
                            i += unitStr.length;
                        }
                        else {
                            // just enter in title mode if its not a whitespace
                            if (!isInTitle && !IntervalParser.isWhitespace(ch)) {
                                isInTitle = true;
                            }
                            if (isInTitle) {
                                title += ch;
                            }
                        }
                    }
                }
            }
            else if (ch == "[") {
                var ai = new ArrayInterval("", []);
                stack[stack.length - 1].getIntervals().push(ai);
                stack.push(ai);
            }
            else if (ch == "]") {
                stack.pop();
            }
            else if (IntervalParser.isDigit(ch)) {
                var res = IntervalParser.parseInt(input, i);
                i = res.i;
                var ri = new RepeatInterval("", null, null, res.value);
                stack[stack.length - 1].getIntervals().push(ri);
                stack.push(ri);
                while (i < input.length && input[i] != "[") {
                    i++;
                }
            }
        }
        return result;
    };
    return IntervalParser;
})();
var VisitorHelper = (function () {
    function VisitorHelper() {
    }
    VisitorHelper.visit = function (visitor, interval) {
        if (interval instanceof SimpleInterval) {
            return visitor.visitSimpleInterval(interval);
        }
        else if (interval instanceof BuildInterval) {
            return visitor.visitBuildInterval(interval);
        }
        else if (interval instanceof RepeatInterval) {
            return visitor.visitRepeatInterval(interval);
        }
        else if (interval instanceof ArrayInterval) {
            return visitor.visitArrayInterval(interval);
        }
        else {
            return null;
        }
    };
    return VisitorHelper;
})();
var BaseVisitor = (function () {
    function BaseVisitor() {
    }
    BaseVisitor.prototype.visitSimpleInterval = function (interval) {
        throw new Error("not implemented");
    };
    BaseVisitor.prototype.visitBuildInterval = function (interval) {
        throw new Error("not implemented");
    };
    BaseVisitor.prototype.visitRepeatInterval = function (interval) {
        for (var i = 0; i < interval.getRepeatCount(); i++) {
            this.visitArrayInterval(interval);
        }
    };
    BaseVisitor.prototype.visitArrayInterval = function (interval) {
        for (var i = 0; i < interval.getIntervals().length; i++) {
            VisitorHelper.visit(this, interval.getIntervals()[i]);
        }
    };
    return BaseVisitor;
})();
// this class has two responsabilities but let's clean this later
// TODO: not working yet!
var IntensityIterator = (function (_super) {
    __extends(IntensityIterator, _super);
    function IntensityIterator(stepInSeconds) {
        _super.call(this);
        // visitor part
        this.ifPairs = [];
        this.currentVisitorTime = 0;
        // iterator part
        this.stepInSeconds = 1;
        this.currentIteratorTime = 0;
        this.currentIdx = 0;
        this.stepInSeconds = stepInSeconds;
    }
    // Visitor part
    IntensityIterator.prototype.processIntensityForGivenDuration = function (ifValue, durationInSeconds) {
        this.ifPairs.push({
            time: this.currentVisitorTime,
            value: ifValue
        });
        this.currentVisitorTime += durationInSeconds;
    };
    IntensityIterator.prototype.visitSimpleInterval = function (interval) {
        var ifValue = interval.getIntensity().getValue();
        var durationInSeconds = interval.getDuration().getSeconds();
        this.processIntensityForGivenDuration(ifValue, durationInSeconds);
    };
    IntensityIterator.prototype.visitBuildInterval = function (interval) {
        var startIntensity = interval.getStartIntensity().getValue();
        var endIntensity = interval.getEndIntensity().getValue();
        var durationInSeconds = interval.getDuration().getSeconds();
        // Go on 1 second increments 
        var intensity = startIntensity;
        var intensityIncrement = (endIntensity - startIntensity) / durationInSeconds;
        for (var t = 0; t < durationInSeconds; t++) {
            this.processIntensityForGivenDuration(intensity, 1);
            intensity += intensityIncrement;
        }
    };
    IntensityIterator.prototype.hasNext = function () {
        this.currentIteratorTime++;
        if (this.currentIdx < this.ifPairs.length && this.currentIteratorTime >= this.ifPairs[this.currentIdx].time) {
            this.currentIdx++;
        }
        return this.currentIteratorTime < this.currentVisitorTime;
    };
    IntensityIterator.prototype.getCurrentIF = function () {
        return this.ifPairs[this.currentIdx].value;
    };
    IntensityIterator.prototype.getCurrentTime = function () {
        return this.ifPairs[this.currentIdx].time;
    };
    return IntensityIterator;
})(BaseVisitor);
var ZonesVisitor = (function (_super) {
    __extends(ZonesVisitor, _super);
    function ZonesVisitor() {
        _super.apply(this, arguments);
        this.zones = {
            1: { name: "Z1", value: 0 },
            2: { name: "Z2", value: 0 },
            3: { name: "Z3", value: 0 },
            4: { name: "Z4", value: 0 },
            5: { name: "Z5", value: 0 },
            6: { name: "Z6+", value: 0 }
        };
    }
    ZonesVisitor.getZone = function (intensity) {
        if (intensity < 0.55) {
            return 1;
        }
        else if (intensity <= 0.75) {
            return 2;
        }
        else if (intensity <= 0.90) {
            return 3;
        }
        else if (intensity <= 1.05) {
            return 4;
        }
        else if (intensity <= 1.2) {
            return 5;
        }
        else {
            return 6;
        }
    };
    ZonesVisitor.prototype.incrementZoneTime = function (intensity, numberOfSeconds) {
        var zone = ZonesVisitor.getZone(intensity);
        this.zones[zone].value += numberOfSeconds;
    };
    ZonesVisitor.prototype.visitSimpleInterval = function (interval) {
        this.incrementZoneTime(interval.getIntensity().getValue(), interval.getDuration().getSeconds());
    };
    ZonesVisitor.prototype.visitBuildInterval = function (interval) {
        var startIntensity = interval.getStartIntensity().getValue();
        var endIntensity = interval.getEndIntensity().getValue();
        var duration = interval.getDuration().getSeconds();
        // Go on 1 second increments 
        var intensity = startIntensity;
        var intensityIncrement = (endIntensity - startIntensity) / duration;
        for (var t = 0; t < duration; t++) {
            this.incrementZoneTime(intensity, 1);
            intensity += intensityIncrement;
        }
    };
    ZonesVisitor.prototype.getTimeInZones = function () {
        var result = [];
        for (var key in this.zones) {
            var zone = this.zones[key];
            if (zone.value > 0) {
                result.push({
                    name: zone.name,
                    duration: new Duration(0 /* Seconds */, zone.value, 0, 0)
                });
            }
        }
        return result;
    };
    return ZonesVisitor;
})(BaseVisitor);
var IntensitiesVisitor = (function (_super) {
    __extends(IntensitiesVisitor, _super);
    function IntensitiesVisitor() {
        _super.apply(this, arguments);
        this.intensities = {};
    }
    IntensitiesVisitor.prototype.visitSimpleInterval = function (interval) {
        this.intensities[interval.getIntensity().getValue()] = interval.getIntensity();
    };
    IntensitiesVisitor.prototype.visitBuildInterval = function (interval) {
        this.intensities[interval.getStartIntensity().getValue()] = interval.getStartIntensity();
        this.intensities[interval.getEndIntensity().getValue()] = interval.getEndIntensity();
    };
    IntensitiesVisitor.prototype.getIntensities = function () {
        var result = [];
        for (var intensityValue in this.intensities) {
            result.push(this.intensities[intensityValue]);
        }
        result.sort(function (left, right) {
            return left.getValue() - right.getValue();
        });
        return result;
    };
    return IntensitiesVisitor;
})(BaseVisitor);
// TSS = [(s x NP x IF) / (FTP x 3600)] x 100
// IF = NP / FTP
// TSS = [(s x NP x NP/FTP) / (FTP x 3600)] x 100
// TSS = [s x (NP / FTP) ^ 2] / 36
var TSSVisitor = (function (_super) {
    __extends(TSSVisitor, _super);
    function TSSVisitor() {
        _super.apply(this, arguments);
        this.tss = 0;
    }
    TSSVisitor.prototype.visitSimpleInterval = function (interval) {
        var duration = interval.getDuration().getSeconds();
        var intensity = interval.getIntensity().getValue();
        this.tss += duration * (intensity * intensity) / 36;
    };
    TSSVisitor.prototype.visitBuildInterval = function (interval) {
        var startIntensity = interval.getStartIntensity().getValue();
        var endIntensity = interval.getEndIntensity().getValue();
        var duration = interval.getDuration().getSeconds();
        // Right way to estimate the intensity is by doing incremental of 1 sec
        var intensity = startIntensity;
        var intensityIncrement = (endIntensity - startIntensity) / duration;
        for (var t = 0; t < duration; t++) {
            this.tss += 1 * (intensity * intensity) / 36;
            intensity += intensityIncrement;
        }
    };
    TSSVisitor.prototype.getTSS = function () {
        return this.tss;
    };
    return TSSVisitor;
})(BaseVisitor);
var DataPointVisitor = (function (_super) {
    __extends(DataPointVisitor, _super);
    function DataPointVisitor() {
        _super.apply(this, arguments);
        this.x = null;
        this.data = [];
    }
    DataPointVisitor.prototype.initX = function (duration) {
        if (this.x == null) {
            this.x = new Duration(duration.getUnit(), 0, 0, 0);
        }
    };
    DataPointVisitor.prototype.incrementX = function (duration) {
        this.x = Duration.combine(this.x, duration);
    };
    DataPointVisitor.prototype.visitSimpleInterval = function (interval) {
        this.initX(interval.getDuration());
        this.data.push(new Point(this.x, interval.getIntensity()));
        this.incrementX(interval.getDuration());
        this.data.push(new Point(this.x, interval.getIntensity()));
    };
    DataPointVisitor.prototype.visitBuildInterval = function (interval) {
        this.initX(interval.getDuration());
        this.data.push(new Point(this.x, interval.getStartIntensity()));
        this.incrementX(interval.getDuration());
        this.data.push(new Point(this.x, interval.getEndIntensity()));
    };
    return DataPointVisitor;
})(BaseVisitor);
var MRCCourseDataVisitor = (function (_super) {
    __extends(MRCCourseDataVisitor, _super);
    function MRCCourseDataVisitor() {
        _super.apply(this, arguments);
        this.courseData = "";
        this.time = 0;
        this.idx = 0;
        this.perfPRODescription = "";
    }
    MRCCourseDataVisitor.prototype.processCourseData = function (intensity, durationInSeconds) {
        this.time += durationInSeconds;
        // Course Data has to be in minutes
        this.courseData += (this.time / 60) + "\t" + Math.round(intensity.getValue() * 100) + "\n";
    };
    MRCCourseDataVisitor.prototype.processTitle = function (interval) {
        var title = interval.getTitle();
        if (title.length == 0) {
            title = Formatter.getIntervalTitle(interval);
        }
        this.perfPRODescription += "Desc" + this.idx++ + "=" + title + "\n";
    };
    MRCCourseDataVisitor.prototype.getCourseData = function () {
        return this.courseData;
    };
    MRCCourseDataVisitor.prototype.getPerfPRODescription = function () {
        return this.perfPRODescription;
    };
    MRCCourseDataVisitor.prototype.visitSimpleInterval = function (interval) {
        this.processCourseData(interval.getIntensity(), 0);
        this.processCourseData(interval.getIntensity(), interval.getDuration().getSeconds());
        this.processTitle(interval);
    };
    MRCCourseDataVisitor.prototype.visitBuildInterval = function (interval) {
        this.processCourseData(interval.getStartIntensity(), 0);
        this.processCourseData(interval.getEndIntensity(), interval.getDuration().getSeconds());
        this.processTitle(interval);
    };
    return MRCCourseDataVisitor;
})(BaseVisitor);
var Formatter = (function () {
    function Formatter() {
        this.result = "";
    }
    Formatter.formatNumber = function (value, decimalMultiplier, separator, unit) {
        var integerPart = Math.floor(value);
        var fractionPart = Math.round(decimalMultiplier * (value - integerPart));
        return Formatter.enforceDigits(integerPart, 2) + separator + Formatter.enforceDigits(fractionPart, 2) + unit;
    };
    Formatter.enforceDigits = function (value, digits) {
        var result = value + "";
        if (result.length > digits) {
            return result.substring(0, digits);
        }
        else {
            while (result.length < digits) {
                result = "0" + result;
            }
            return result;
        }
    };
    Formatter.getIntervalTitle = function (interval) {
        // TODO: instantiating visitor is a bit clowny
        var f = new Formatter();
        VisitorHelper.visit(f, interval);
        if (interval.getTitle().length > 0) {
            return interval.getTitle() + " (" + f.result + ")";
        }
        else {
            return f.result;
        }
    };
    // ArrayInterval
    Formatter.prototype.visitArrayInterval = function (interval) {
        // Detect which subtype is. Couple of possibilities:
        // * Last interval is the minimum (rest interval)
        // * A combination with both
        var prevIntensity = interval.getIntervals()[0].getIntensity();
        var prevDuration = interval.getIntervals()[0].getDuration();
        var isIncreasing = true;
        var isEqualDuration = true;
        var isRestIncluded = false;
        for (var i = 1; i < interval.getIntervals().length; i++) {
            var curIntensity = interval.getIntervals()[i].getIntensity();
            var curDuration = interval.getIntervals()[i].getDuration();
            if (prevIntensity.getValue() > curIntensity.getValue()) {
                // Ignore the last interval
                if (i != interval.getIntervals().length - 1) {
                    isIncreasing = false;
                }
                else {
                    isRestIncluded = true;
                }
            }
            prevIntensity = curIntensity;
            if (prevDuration.getSeconds() == curDuration.getSeconds() || prevDuration.getDistanceInMiles() == curDuration.getDistanceInMiles()) {
                if (i != interval.getIntervals().length - 1 || !isRestIncluded) {
                    isEqualDuration = false;
                }
            }
            prevDuration = curDuration;
        }
        for (var i = 0; i < interval.getIntervals().length; i++) {
            var subInterval = interval.getIntervals()[i];
            if (i == interval.getIntervals().length - 1 && isRestIncluded) {
                this.result = this.result.slice(0, this.result.length - 2);
                this.result += " w/ " + subInterval.getDuration().toString() + " rest at " + subInterval.getIntensity().toString();
            }
            else {
                this.result += Formatter.getIntervalTitle(subInterval);
            }
            this.result += ", ";
        }
        this.result = this.result.slice(0, this.result.length - 2);
    };
    // RepeatInterval
    Formatter.prototype.visitRepeatInterval = function (interval) {
        this.result += interval.getRepeatCount() + "x (";
        this.visitArrayInterval(interval);
        this.result += ")";
    };
    // BuildInterval
    Formatter.prototype.visitBuildInterval = function (interval) {
        this.result += "Build from " + interval.getStartIntensity().toString() + " to " + interval.getEndIntensity().toString() + " for " + interval.getDuration().toString();
    };
    // SimpleInterval
    Formatter.prototype.visitSimpleInterval = function (interval) {
        this.result += interval.getIntensity().toString() + " for " + interval.getDuration().toString();
    };
    return Formatter;
})();
var RunningPaceUnit;
(function (RunningPaceUnit) {
    RunningPaceUnit[RunningPaceUnit["Unknown"] = 0] = "Unknown";
    RunningPaceUnit[RunningPaceUnit["MinMi"] = 1] = "MinMi";
    RunningPaceUnit[RunningPaceUnit["Mph"] = 2] = "Mph";
    RunningPaceUnit[RunningPaceUnit["MinKm"] = 3] = "MinKm";
    RunningPaceUnit[RunningPaceUnit["KmHr"] = 4] = "KmHr";
})(RunningPaceUnit || (RunningPaceUnit = {}));
var RunningPaceHelper = (function () {
    function RunningPaceHelper() {
    }
    RunningPaceHelper.convertToMph = function (value, unit) {
        if (unit == 2 /* Mph */) {
            return value;
        }
        else if (unit == 1 /* MinMi */) {
            return 60 / unit;
        }
        else if (unit == 4 /* KmHr */) {
            return value / 1.609344;
        }
        else if (unit == 3 /* MinKm */) {
            return (60 / value) / 1.609344;
        }
        else {
            throw new Error("Unknown running pace unit");
        }
    };
    return RunningPaceHelper;
})();
;
var UserProfile = (function () {
    function UserProfile(bikeFTP, runningTPaceMinMi) {
        this.bikeFTP = bikeFTP;
        this.runningTPaceMinMi = runningTPaceMinMi;
    }
    UserProfile.prototype.getBikeFTP = function () {
        return this.bikeFTP;
    };
    UserProfile.prototype.getRunningTPaceMinMi = function () {
        return this.runningTPaceMinMi;
    };
    UserProfile.prototype.getPaceMinMi = function (intensity) {
        // Getting the pace from IF is not that straightforward. The way I did was
        // plotting some data in excel to get the relation between the running
        // zones and correlation with pace. For example:
        // IF 55% = 129% of T Pace
        // IF 100% = 100% of T Pace
        // y = ax + b
        // a = DeltaY/DeltaX = -0.64
        // b = y - ax = 1 + 0.64*1 = 1.64
        // y = -0.64 * IF + 1.64
        return this.getRunningTPaceMinMi() * (-0.64 * intensity.getValue() + 1.64);
    };
    return UserProfile;
})();
exports.UserProfile = UserProfile;
// TODO: rename this to factory
var ObjectFactory = (function () {
    function ObjectFactory(userProfile, sportType) {
        this.userProfile = userProfile;
        this.sportType = sportType;
    }
    ObjectFactory.prototype.getBikeSpeedMphForIntensity = function (intensity) {
        // TODO: simplifying it for now
        var actualSpeedMph = 0;
        if (intensity.getValue() < 0.65) {
            actualSpeedMph = 15;
        }
        else {
            actualSpeedMph = 20;
        }
        return actualSpeedMph;
    };
    ObjectFactory.prototype.getRunPaceMphForIntensity = function (intensity) {
        var estPaceMinMi = this.userProfile.getPaceMinMi(intensity);
        return 60 / estPaceMinMi;
    };
    ObjectFactory.prototype.createIntensity = function (value, unit) {
        var ifValue = 0;
        if (this.sportType == 1 /* Bike */) {
            if (unit == 1 /* Watts */) {
                ifValue = value / this.userProfile.getBikeFTP();
            }
            else if (unit == 0 /* IF */) {
                ifValue = value;
            }
            else {
                throw new Error("Invalid unit : " + unit);
            }
        }
        else {
            if (unit == 0 /* IF */) {
                ifValue = value;
            }
            else {
                throw new Error("Not implemented");
            }
        }
        return new Intensity(ifValue, value, unit);
    };
    ObjectFactory.prototype.createDuration = function (intensity, unit, value) {
        var estimatedDistanceInMiles = 0;
        var estimatedTimeInSeconds = 0;
        var estimatedSpeedMph;
        if (this.sportType == 1 /* Bike */) {
            estimatedSpeedMph = this.getBikeSpeedMphForIntensity(intensity);
        }
        else {
            estimatedSpeedMph = this.getRunPaceMphForIntensity(intensity);
        }
        if (DurationUnitHelper.isTime(unit)) {
            estimatedTimeInSeconds = DurationUnitHelper.getDurationSeconds(unit, value);
            // v = s/t
            // s = v * t
            estimatedDistanceInMiles = estimatedSpeedMph * (estimatedTimeInSeconds / 3600);
        }
        else {
            estimatedDistanceInMiles = DurationUnitHelper.getDistanceMiles(unit, value);
            // v = s/t;
            // t = s / v;
            estimatedTimeInSeconds = 3600 * (estimatedDistanceInMiles / estimatedSpeedMph);
        }
        return new Duration(unit, value, estimatedTimeInSeconds, estimatedDistanceInMiles);
    };
    return ObjectFactory;
})();
var StopWatch = (function () {
    function StopWatch() {
        this.startTime = null;
        this.stoppedTime = null;
    }
    StopWatch.prototype.start = function () {
        if (this.startTime === null) {
            this.startTime = Date.now();
        }
    };
    StopWatch.prototype.stop = function () {
        if (this.startTime !== null) {
            this.stoppedTime += Date.now() - this.startTime;
            this.startTime = null;
        }
    };
    StopWatch.prototype.getIsStarted = function () {
        return this.startTime !== null;
    };
    StopWatch.prototype.getElapsedTime = function () {
        if (this.startTime !== null) {
            return (Date.now() - this.startTime) + this.stoppedTime;
        }
        else {
            return this.stoppedTime;
        }
    };
    StopWatch.prototype.reset = function () {
        this.startTime = null;
        this.stoppedTime = 0;
    };
    return StopWatch;
})();
var ArrayIterator = (function () {
    function ArrayIterator(array) {
        this.array = array;
    }
    ArrayIterator.prototype.reset = function () {
        this.index = -1;
    };
    ArrayIterator.prototype.getCurrent = function () {
        return this.array[this.index];
    };
    ArrayIterator.prototype.getCurrentIndex = function () {
        return this.index;
    };
    ArrayIterator.prototype.tryGettingNext = function () {
        if (this.index + 1 < this.array.length) {
            return this.array[this.index + 1];
        }
        else {
            return null;
        }
    };
    ArrayIterator.prototype.getIsValid = function () {
        return this.index >= 0 && this.index < this.array.length;
    };
    ArrayIterator.prototype.moveNext = function () {
        this.index++;
        return this.getIsValid();
    };
    return ArrayIterator;
})();
var PersistedItem = (function () {
    function PersistedItem(id) {
        this.id = id;
    }
    PersistedItem.prototype.save = function (value) {
        if (window.localStorage) {
            window.localStorage.setItem(this.id, value);
        }
    };
    PersistedItem.prototype.load = function () {
        if (window.localStorage) {
            var result = window.localStorage.getItem(this.id);
            return result.trim();
        }
        else {
            return null;
        }
    };
    return PersistedItem;
})();
var WorkoutBuilder = (function () {
    function WorkoutBuilder(userProfile, sportType, outputUnit) {
        this.userProfile = userProfile;
        this.sportType = sportType;
        this.outputUnit = outputUnit;
    }
    WorkoutBuilder.prototype.getInterval = function () {
        return this.intervals;
    };
    WorkoutBuilder.prototype.withDefinition = function (workoutDefinition) {
        this.intervals = IntervalParser.parse(new ObjectFactory(this.userProfile, this.sportType), workoutDefinition);
        this.workoutDefinition = workoutDefinition;
        return this;
    };
    WorkoutBuilder.prototype.getIntensityFriendly = function (intensity) {
        if (this.sportType == 1 /* Bike */) {
            return Math.round(this.userProfile.getBikeFTP() * intensity.getValue()) + "w";
        }
        else if (this.sportType == 2 /* Run */) {
            var minMi = this.userProfile.getPaceMinMi(intensity);
            var outputValue = IntensityUnitHelper.convertTo(minMi, 2 /* MinMi */, this.outputUnit);
            if (this.outputUnit == 4 /* Kmh */ || this.outputUnit == 3 /* Mph */) {
                return MyMath.round10(outputValue, -1) + getIntensityUnit(this.outputUnit);
            }
            else {
                return Formatter.formatNumber(outputValue, 60, ":", getIntensityUnit(this.outputUnit));
            }
        }
        else {
            throw new Error("Not implemented.");
        }
    };
    WorkoutBuilder.prototype.getPrettyPrint = function () {
        var intensities = this.intervals.getIntensities();
        var distanceInMiles = 0;
        var result = "\n";
        this.intervals.getIntervals().forEach(function (interval) {
            result += ("* " + Formatter.getIntervalTitle(interval) + "\n");
            if (interval.getDuration().getDistanceInMiles() > 0) {
                distanceInMiles += interval.getDuration().getDistanceInMiles();
            }
        });
        result += ("\n");
        result += ("Stats:\n");
        result += ("TSS: " + this.intervals.getTSS() + "\n");
        result += ("\t* Time: " + this.intervals.getDuration().toStringTime() + "\n");
        result += ("\t* Distance: " + this.intervals.getDuration().toStringDistance() + "\n");
        result += ("\t* IF: " + MyMath.round10(this.intervals.getIntensity().getValue() * 100, -1) + "\n");
        result += ("Zones:\n");
        var zones = this.intervals.getTimeInZones();
        zones.forEach(function (zone) {
            result += ("\t* " + zone.name + ": " + zone.duration.toString() + "\n");
        });
        if (this.sportType == 1 /* Bike */) {
            result += ("\t* Avg Pwr: " + MyMath.round10(this.userProfile.getBikeFTP() * this.intervals.getIntensity().getValue(), -1) + "w" + "\n");
        }
        result += ("\n");
        result += ("Paces:" + "\n");
        intensities.forEach(function (intensity) {
            result += ("\t* " + Math.round(intensity.getValue() * 100) + "% (" + this.getIntensityFriendly(intensity) + ")" + "\n");
        }, this);
        result += ("\n");
        result += ("Workout Definition: " + this.workoutDefinition + "\n");
        return result;
    };
    WorkoutBuilder.prototype.getMRCFile = function () {
        var dataVisitor = new MRCCourseDataVisitor();
        VisitorHelper.visit(dataVisitor, this.intervals);
        var result = "";
        result += "[COURSE HEADER]\n";
        result += "VERSION=2\n";
        result += "UNITS=ENGLISH\n";
        result += "MINUTES\tPERCENT\n";
        result += "[END COURSE HEADER]\n";
        result += "[COURSE DATA]\n";
        result += dataVisitor.getCourseData();
        result += "[END COURSE DATA]\n";
        result += "[PERFPRO DESCRIPTIONS]\n";
        result += dataVisitor.getPerfPRODescription();
        result += "[END PERFPRO DESCRIPTIONS]\n";
        return result;
    };
    WorkoutBuilder.prototype.getMRCFileName = function () {
        var duration = this.intervals.getDuration().getSeconds();
        var mainInterval = null;
        this.intervals.getIntervals().forEach(function (interval) {
            if (interval.getDuration().getSeconds() > duration / 2) {
                mainInterval = interval;
            }
        });
        if (mainInterval != null) {
            var filename = Formatter.getIntervalTitle(mainInterval) + ".mrc";
            // Avoid really long filenames since its not very helpful
            if (filename.length < 20) {
                return filename;
            }
        }
        return "untitled.mrc";
    };
    return WorkoutBuilder;
})();
exports.WorkoutBuilder = WorkoutBuilder;
;
