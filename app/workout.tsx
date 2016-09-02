/// <reference path="../type_definitions/react.d.ts" />

import * as React from 'react';
import * as UI from '../ui';
import * as Model from '../model';
import UserSettings from './user_settings';
import WorkoutInput from './workout_input';
import WorkoutView from './workout_view';

export default class Workout extends React.Component<any, any> {
	params: UI.QueryParams;

	constructor(props: any) {
		super(props);
		this.params = UI.QueryParams.createCopy(props);
	}

	_onWorkoutInputChanged(sportType: Model.SportType, outputUnit: Model.IntensityUnit, workout_title: string, workout_text: string) {
		this.params.sport_type = sportType.toString();
		this.params.output_unit = outputUnit.toString();
		this.params.workout_text = workout_text;
		this.params.workout_title = workout_title;
		this.refresh();
	}

	_onUserSettingsChanged(ftp: number, t_pace: string, swim_css: string, email: string, efficiency_factor: string) {
		this.params.ftp_watts = ftp.toString();
		this.params.t_pace = t_pace;
		this.params.swim_css = swim_css;
		this.params.email = email;
		this.params.efficiency_factor = efficiency_factor;
		this.refresh();
	}

	componentDidMount() {
		// Put here which is guaranteed for the DOM tree to be created
		this.refreshUrls();
	}	

	refresh() {
		var view: WorkoutView = this.refs['view'] as WorkoutView;
		view.refresh(this.params);

		this.refreshUrls();

		this.params.saveToStorage();
	}

	refreshUrls() {
		var url_parameters = this.params.getURL();
		this._setHref("download_mrc", "workout.mrc" + url_parameters);
		this._setHref("download_zwo", "workout.zwo" + url_parameters);
		this._setHref("email_send_workout", "send_mail" + url_parameters);
		this._setHref("save_workout", "save_workout" + url_parameters);
		
		this._setVisibility("save_workout", this.params.experimental);

		window.history.pushState('Object', 'Title', url_parameters);
	}

	_setHref(element_ref: string, url: string) {
		var anchor = this.refs[element_ref] as HTMLAnchorElement;
		anchor.href = url;
	}
	
	_setVisibility(element_ref: string, visible: boolean) {
		var anchor = this.refs[element_ref] as HTMLAnchorElement;
		anchor.hidden = !visible;
	}

	render() {
		return (<div>
					<UserSettings {...this.props} ref='settings' onChange={ (f,t,c,e,ef) => this._onUserSettingsChanged(f,t,c,e,ef) }></UserSettings>
					<WorkoutInput {...this.props} ref='input' onChange={ (s, o, t, w) => this._onWorkoutInputChanged(s,o,t,w) }></WorkoutInput>
					<table>
						<tbody>
							<tr>
								<td><a ref="download_mrc" >Download MRC</a></td>
								<td><a ref="download_zwo" >Download ZWO</a></td>
								<td><a ref="email_send_workout" >Email Workout</a></td>
								<td><a ref="save_workout" >Save Workout</a></td>
							</tr>
							</tbody>
						</table>
					<WorkoutView {...this.props} ref='view'></WorkoutView>					
				</div>);
	}
}
