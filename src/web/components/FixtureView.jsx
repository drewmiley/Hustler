import React, { Component } from 'react';

import classNames from 'classnames';

export default class FixtureView extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return false;
		};
	};
	render() {
		return <tr className={classNames(this.props.match.className)}>
			<td>{this.props.match.formattedDate}</td>
			<td>{this.props.match.homePlayer}</td>
			<td>{this.props.match.homeScore}</td>
			<td>V</td>
			<td>{this.props.match.awayScore}</td>
			<td>{this.props.match.awayPlayer}</td>
		</tr> 
	};
};