/// <reference path="../type_definitions/react.d.ts" />
"use strict";
const React = require('react');
class ErrorLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message || "",
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ value: '' + nextProps.value });
    }
    render() {
        return (React.createElement("span", {style: { marginLeft: "10px", color: "#a94442" }}, this.state.message));
    }
    setError(msg) {
        this.setState({ message: msg });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorLabel;