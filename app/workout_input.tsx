/// <reference path="../type_definitions/react.d.ts" />

import * as React from 'react';
import * as UI from '../ui';
import * as Model from '../model';
import Select from './select';
import SelectOption from './select_option';

export default class WorkoutInput extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	getSportType(): Model.SportType {
		var sltSportType = this.refs['sportType'] as Select;
		return parseInt(sltSportType.getSelectedValue());
	}

	getUnitType(): Model.IntensityUnit {
		var sltUnit = this.refs['unit'] as Select;
		return parseInt(sltUnit.getSelectedValue());
	}

	getWorkoutText() : string {
		var workoutText = this.refs['workout_text'] as HTMLTextAreaElement;
		return workoutText.value;
	}

	_onSportTypeChange(sport_type_str) {
		var sport_type: Model.SportType = parseInt(sport_type_str);
		var sltUnit: Select = this.refs['unit'] as Select;
		if (sport_type == Model.SportType.Run) {
			sltUnit.setSelectedValue(Model.IntensityUnit.MinMi.toString());
		} else if (sport_type == Model.SportType.Bike) {
			sltUnit.setSelectedValue(Model.IntensityUnit.Watts.toString());
		}
		this._loadWorkout();
	}

	_onUnitChanged(e) {
		this._loadWorkout();
	}

	_onWorkoutTextChange(e) {
		this._loadWorkout();
	}

	_loadWorkout() {
		if (this.props.onChange) {
			this.props.onChange(this.getSportType(), this.getUnitType(), this.getWorkoutText());
		}
	}

	render() {
		return (<div>
					<h1> Workout Settings </h1>
					<form>
					Sport type:
					<Select ref="sportType" defaultValue={this.props.sport_type} onChange={e => this._onSportTypeChange(e) }>
						<SelectOption value={Model.SportType.Bike}>Bike</SelectOption>
						<SelectOption value={Model.SportType.Run}>Run</SelectOption>
					</Select>
					<br />
					Unit:
					<Select ref="unit" defaultValue={this.props.output_unit} onChange={e => this._onUnitChanged(e)}>
						<SelectOption value={Model.IntensityUnit.Watts}>Watts</SelectOption>
						<SelectOption value={Model.IntensityUnit.MinMi}>min/mi</SelectOption>
						<SelectOption value={Model.IntensityUnit.Mph}>mi/h</SelectOption>
						<SelectOption value={Model.IntensityUnit.MinKm}>min/km</SelectOption>
						<SelectOption value={Model.IntensityUnit.Kmh}>km/h</SelectOption>
					</Select>
					<br />	
					<textarea ref="workout_text" defaultValue={this.props.workout_text} style={{ height: "200px", width: "100%" }} onChange={e => this._onWorkoutTextChange(e) }>
					</textarea>
					<br />
				</form>
			</div>);
	}
}
