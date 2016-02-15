/// <reference path="./type_definitions/node.d.ts" />

import _ = require("./model");

function assert(condition, message) {
    if (!condition) {
		console.log(message);
		console.trace();
    }
}

function expect_eq_str(expected : string, actual : string) {
	if (expected !== actual) {
		console.log("expected=", JSON.stringify(expected));
		console.log("actual=", JSON.stringify(actual));
		assert(false, "expect_eq_str failed");
	}
}

function expect_eq_nbr(expected : number, actual : number, error : number = 0.01) {
	var delta = Math.abs(expected - actual);
	if (delta > error) {
		console.log("expected=", JSON.stringify(expected));
		console.log("actual=", JSON.stringify(actual));
		assert(false, "expect_eq_nbr failed");
	}
}

function createSimpleInterval(if_value : number, secs : number) {
	var i = new _.Model.Intensity(if_value, if_value);
	var dur = new _.Model.Duration(_.Model.DurationUnit.Seconds, secs, secs, -1 /* distance */);
	return new _.Model.SimpleInterval("", i, dur);
}

var res = null;

// DistanceUnitHelper tests
res = _.Model.DistanceUnitHelper.convertTo(1000, _.Model.DistanceUnit.Miles, _.Model.DistanceUnit.Kilometers);
expect_eq_nbr(1609.344, res);

// TimeUnitHelper tests
res = _.Model.TimeUnitHelper.convertTo(1, _.Model.TimeUnit.Hours, _.Model.TimeUnit.Seconds); 
expect_eq_nbr(3600, res);

// Intensity
var i90 = new _.Model.Intensity(0.90, 0.90);
var i80 = new _.Model.Intensity(0.80, 0.80);

res = _.Model.Intensity.combine([i90, i80], [1, 1]).getValue();
expect_eq_nbr(0.85, res);

// TSS tests
var int1hri75 = new _.Model.ArrayInterval("", [createSimpleInterval(0.75, 3600)]);
expect_eq_nbr(56.25, int1hri75.getTSS());

var int1hri85 = new _.Model.ArrayInterval("", [createSimpleInterval(0.85, 3600)]);
expect_eq_nbr(72.25, int1hri85.getTSS());

// IntervalParser
expect_eq_nbr(123, _.Model.IntervalParser.parseDouble("123", 0).value);
expect_eq_nbr(123.456, _.Model.IntervalParser.parseDouble("123.456", 0).value);

// Parser tests
var up = new _.Model.UserProfile(310, "6:00min/mi");
var of_bike = new _.Model.ObjectFactory(up, _.Model.SportType.Bike);
var of_run = new _.Model.ObjectFactory(up, _.Model.SportType.Run);

var int_par_1hr_75 = _.Model.IntervalParser.parse(of_bike, "(1hr, 75)");
expect_eq_nbr(56.25, int_par_1hr_75.getTSS());

var int_par_2hr_75_85 = _.Model.IntervalParser.parse(of_bike, "(1hr, 75), (1hr, 85)");
expect_eq_nbr(129.5, int_par_2hr_75_85.getTSS());


// UserProfile 
var up_6tpace = new _.Model.UserProfile(310, "6:00min/mi");
expect_eq_nbr(6, up_6tpace.getPaceMinMi(new _.Model.Intensity(1, 1)));
expect_eq_nbr(7.05, up_6tpace.getPaceMinMi(new _.Model.Intensity(0.85, 0.85)));
expect_eq_nbr(8, up_6tpace.getPaceMinMi(new _.Model.Intensity(0.75, 0.75)));

for (var i = 50; i <= 100; i=i+5) {
	var garbage = new _.Model.UserProfile(310, "6:00min/mi");
	var ifv = i / 100.0;
}

var int_par_bug = _.Model.IntervalParser.parse(of_bike, "(1hr, 75), (20mi, 85)");
expect_eq_nbr(2, int_par_bug.getIntensities().length);

// Parsing of units bug
var int_par_unit_bike = _.Model.IntervalParser.parse(of_bike, "(1s, 50), (2s, 155w), (3s, 50%)");
expect_eq_nbr(_.Model.IntensityUnit.IF, int_par_unit_bike.getIntervals()[0].getIntensity().getOriginalUnit());
expect_eq_nbr(0.5, int_par_unit_bike.getIntervals()[0].getIntensity().getOriginalValue());

expect_eq_nbr(_.Model.IntensityUnit.Watts, int_par_unit_bike.getIntervals()[1].getIntensity().getOriginalUnit());
expect_eq_nbr(155, int_par_unit_bike.getIntervals()[1].getIntensity().getOriginalValue());

expect_eq_nbr(_.Model.IntensityUnit.IF, int_par_unit_bike.getIntervals()[2].getIntensity().getOriginalUnit());
expect_eq_nbr(0.5, int_par_unit_bike.getIntervals()[2].getIntensity().getOriginalValue());

var int_par_unit_run = _.Model.IntervalParser.parse(of_run, "(4s, 10mph), (5s, 6min/mi)");
expect_eq_nbr(_.Model.IntensityUnit.Mph, int_par_unit_run.getIntervals()[0].getIntensity().getOriginalUnit());
expect_eq_nbr(10, int_par_unit_run.getIntervals()[0].getIntensity().getOriginalValue());

expect_eq_nbr(_.Model.IntensityUnit.MinMi, int_par_unit_run.getIntervals()[1].getIntensity().getOriginalUnit());
expect_eq_nbr(6, int_par_unit_run.getIntervals()[1].getIntensity().getOriginalValue());


// MRC testing
var zwift = new _.Model.ZwiftDataVisitor("untitled_workout");
var zwift_interval = _.Model.IntervalParser.parse(of_bike, "(10min, 55, 75), (1hr, 80), (5min, 75, 55)");
_.Model.VisitorHelper.visit(zwift, zwift_interval);
zwift.finalize();
var expected_content = `<workout_file>
	<author>Workout Planner Author</author>
	<name>untitled_workout</name>
	<description>Auto generated by https://github.com/sergioclemente/WorkoutPlanner</description>
	<tags>
		<tag name="INTERVALS"/>
	</tags>
	<workout>
		<Warmup Duration='600' PowerLow='0.55' PowerHigh='0.75'/>
		<SteadyState Duration='3600' Power='0.8'>
			<textevent timeoffset='0' message='80% for 1hr'/>
		</SteadyState>
		<Cooldown Duration='300' PowerLow='0.75' PowerHigh='0.55'/>
	</workout>
</workout_file>`;
expect_eq_str(expected_content, zwift.getContent());

// Repeat interval bug
var repeat_85_1 = _.Model.IntervalParser.parse(of_bike, `1[(1hr, 85)]`);
var repeat_85_2 = _.Model.IntervalParser.parse(of_bike, `2[(1hr, 85)]`);

expect_eq_nbr(72.25, repeat_85_1.getTSS());
expect_eq_nbr(0.85, repeat_85_1.getIntensity().getValue());

expect_eq_nbr(144.5, repeat_85_2.getTSS());
expect_eq_nbr(0.85, repeat_85_2.getIntensity().getValue());

var baseLinePlusRepeat = _.Model.IntervalParser.parse(of_bike, `(1hr, 75) 2[(1hr, 85)]`);
expect_eq_nbr(202, baseLinePlusRepeat.getTSS(), 0.1);
expect_eq_nbr(3 * 3600, baseLinePlusRepeat.getDuration().getSeconds());
expect_eq_nbr(0.816, baseLinePlusRepeat.getIntensity().getValue());
