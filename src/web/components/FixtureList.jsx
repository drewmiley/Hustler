import React, { Component } from 'react';

import FixtureView from './FixtureView';

export default class FixtureList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show;
		};
		this.state = {
			gameWeek: this.props.api.gameweek.getByDate(new Date()),
			matches: this.props.api.match.get().map(match => this.formMatch(match))
		};
	};
	formMatch(match) {
		let formattedMatch = Object.assign({}, match);
		formattedMatch.formattedDate = this.props.api.gameweek.getByWeekNumber(match.gameWeek).formattedDate;
		formattedMatch.homePlayer = this.props.api.player.get().find(player => player.id === match.homePlayerID).name;
		formattedMatch.awayPlayer = this.props.api.player.get().find(player => player.id === match.awayPlayerID).name;
		return formattedMatch;
	};
	render() {   
		return <div id='fixtureList' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }} >
			<table className='table'>
				<thead className='thead-default'>
					<tr>
						<th>Date</th>
						<th>Home</th>
						<th></th>
						<th>V</th>
						<th></th>
						<th>Away</th>
					</tr>
				</thead>
				<tbody>
				{this.state.matches.map(match =>
					<FixtureView 
						key={match.id}
						className={match.gameWeek === this.state.gameWeek.number ? 'current' : (match.gameWeek < this.state.gameWeek.number && !match.isPlayed ? 'overdue' : '')}
						match={match} />
				)}
				</tbody>
			</table>
		</div>
	};
};