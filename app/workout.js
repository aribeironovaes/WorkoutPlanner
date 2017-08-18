/// <reference path="../type_definitions/react.d.ts" />
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const UI = require('../ui');
const user_settings_1 = require('./user_settings');
const workout_input_1 = require('./workout_input');
const workout_view_1 = require('./workout_view');
class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.params = UI.QueryParams.createCopy(props);
    }
    _onWorkoutInputChanged(sportType, outputUnit, workout_title, workout_text) {
        this.params.sport_type = sportType.toString();
        this.params.output_unit = outputUnit.toString();
        this.params.workout_text = workout_text;
        this.params.workout_title = workout_title;
        this.refresh();
    }
    _onUserSettingsChanged(ftp, t_pace, swim_css, email, efficiency_factor) {
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
        var view = this.refs['view'];
        view.refresh(this.params);
        this.refreshUrls();
        this.params.saveToStorage();
    }
    refreshUrls() {
        // TODO: Merge pushing into the history with the UI.QueryParams
        var url_parameters = this.params.getURL();
        this._setHref("email_send_workout", "send_mail" + url_parameters);
        this._setHref("player_link", "player.html" + url_parameters);
        window.history.pushState('Object', 'Title', url_parameters);
    }
    _setHref(element_ref, url) {
        var anchor = this.refs[element_ref];
        anchor.href = url;
    }
    _setVisibility(element_ref, visible) {
        var anchor = this.refs[element_ref];
        anchor.hidden = !visible;
    }
    _onSaveWorkout() {
        var req = new XMLHttpRequest();
        req.addEventListener("load", this._onWorkoutSaved.bind(this, req));
        req.open("GET", "/save_workout" + this.params.getURL());
        req.send();
    }
    _onWorkoutSaved(req) {
        if (req.status == 200) {
            alert("Workout saved");
        }
        else {
            alert("Error while fetching workouts");
        }
    }
    _onClickLink() {
        let builder = this.params.createWorkoutBuilder();
        // Download both files (mrc and zwo)
        {
            let fileName = builder.getMRCFileName();
            let content = builder.getMRCFile();
            this._downloadFile(fileName, content);
        }
        {
            let fileName = builder.getZWOFileName();
            let content = builder.getZWOFile();
            this._downloadFile(fileName, content);
        }
        {
            let fileName = builder.getPPSMRXFileName();
            let content = builder.getPPSMRXFile();
            this._downloadFile(fileName, content);
        }
    }
    _downloadFile(fileName, content) {
        let uriContent = "data:application/octet-stream," + encodeURIComponent(content);
        var link = document.createElement('a');
        link.download = fileName;
        link.href = uriContent;
        link.click();
    }
    render() {
        return (React.createElement("div", null, 
            React.createElement(user_settings_1.default, __assign({}, this.props, {ref: 'settings', onChange: (f, t, c, e, ef) => this._onUserSettingsChanged(f, t, c, e, ef)})), 
            React.createElement(workout_input_1.default, __assign({}, this.props, {ref: 'input', onChange: (s, o, t, w) => this._onWorkoutInputChanged(s, o, t, w)})), 
            React.createElement("table", null, 
                React.createElement("tbody", null, 
                    React.createElement("tr", null, 
                        React.createElement("td", null, 
                            React.createElement("a", {href: "#", onClick: (e) => this._onClickLink()}, "Download Files")
                        ), 
                        React.createElement("td", null, 
                            React.createElement("a", {ref: "player_link"}, "Player")
                        ), 
                        React.createElement("td", null, 
                            React.createElement("a", {ref: "email_send_workout"}, "Email Workout")
                        ), 
                        React.createElement("td", null, 
                            React.createElement("a", {ref: "save_workout", href: "#", onClick: (e) => this._onSaveWorkout()}, "Save Workout")
                        ), 
                        React.createElement("td", null, 
                            React.createElement("a", {href: "workouts_view.html"}, "List Workouts")
                        ))
                )
            ), 
            React.createElement(workout_view_1.default, __assign({}, this.props, {ref: 'view'}))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Workout;
