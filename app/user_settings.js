/// <reference path="../type_definitions/react.d.ts" />
"use strict";
const React = require('react');
const Model = require('../model');
const number_input_1 = require('./number_input');
const email_input_1 = require('./email_input');
const text_input_1 = require('./text_input');
class UserProperty extends React.Component {
    constructor(params) {
        super(params);
        this.ftp = parseInt(params.ftp_watts);
        this.email = params.email;
        this.t_pace = params.t_pace;
        this.swim_css = params.swim_css;
        this.efficiency_factor = params.efficiency_factor;
    }
    onFtpChange(ftp) {
        var ftpInput = this.refs['ftp'];
        if (ftp < 100 || ftp > 500) {
            ftpInput.setError("Set a value between 100 and 500");
        }
        else {
            ftpInput.setError("");
        }
        this.ftp = ftp;
        this.fireOnChange();
    }
    onTPaceChange(t_pace) {
        var tPaceInput = this.refs['t_pace'];
        var t_pace_mph = Model.SpeedParser.getSpeedInMph(t_pace);
        if (t_pace != null && t_pace_mph > 0) {
            tPaceInput.setError("");
        }
        else {
            tPaceInput.setError("Enter a value speed for your running t-pace. Allowed units are: min/mi, km/h, mi/h, min/km");
        }
        this.t_pace = t_pace;
        this.fireOnChange();
    }
    onSwimCSSChange(swim_css) {
        var tSwimCss = this.refs['swim_css'];
        var swim_css_mph = Model.SpeedParser.getSpeedInMph(swim_css);
        if (swim_css != null && swim_css_mph) {
            tSwimCss.setError("");
        }
        else {
            tSwimCss.setError("Enter a value for the swim css. Allowed units are: mph, /100yards");
        }
        this.swim_css = swim_css;
        this.fireOnChange();
    }
    onEmailChange(email) {
        this.email = email;
        this.fireOnChange();
    }
    onEfficiencyFactorChange(efficiency_factor) {
        this.efficiency_factor = efficiency_factor;
        this.fireOnChange();
    }
    fireOnChange() {
        if (this.props.onChange) {
            this.props.onChange(this.ftp, this.t_pace, this.swim_css, this.email, this.efficiency_factor);
        }
    }
    render() {
        return (React.createElement("div", null, 
            React.createElement("h1", null, " User Settings "), 
            "Swim CSS: ", 
            React.createElement(text_input_1.default, {ref: "swim_css", width: "20", placeholder: "1:30 min/100yards", value: this.swim_css, onChange: this.onSwimCSSChange.bind(this)}), 
            " ", 
            React.createElement("br", null), 
            "Bike FTP: ", 
            React.createElement(number_input_1.default, {ref: "ftp", width: "20", placeholder: "245", value: this.ftp, onChange: this.onFtpChange.bind(this)}), 
            React.createElement("br", null), 
            "Run T-Pace: ", 
            React.createElement(text_input_1.default, {ref: "t_pace", width: "20", placeholder: "7:30 min/mi", value: this.t_pace, onChange: this.onTPaceChange.bind(this)}), 
            " ", 
            React.createElement("br", null), 
            "Email: ", 
            React.createElement(email_input_1.default, {ref: "email", width: "20", placeholder: "foo@gmail.com", value: this.email, onChange: this.onEmailChange.bind(this)}), 
            " ", 
            React.createElement("br", null), 
            "Efficiency Factor: ", 
            React.createElement(number_input_1.default, {ref: "efficiency_factor", width: "20", placeholder: "1.2", value: this.efficiency_factor, onChange: this.onEfficiencyFactorChange.bind(this)}), 
            " ", 
            React.createElement("br", null), 
            React.createElement("br", null)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserProperty;