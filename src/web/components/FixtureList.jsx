import React, { Component } from 'react';

import FixtureView from './FixtureView';

export default class FixtureList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show;
		};
	};
	format(match) {
		const gameWeek = this.props.api.gameweek.getByDate(new Date());
		return {
			id: match.id,
			className: match.gameWeek === gameWeek.number ? 'current' : (match.gameWeek < gameWeek.number && !match.isPlayed ? 'overdue' : ''),
			formattedDate: this.props.api.gameweek.getByWeekNumber(match.gameWeek).formattedDate,
			homePlayer: this.props.api.player.get().find(player => player.id === match.homePlayerID).name,
			awayPlayer: this.props.api.player.get().find(player => player.id === match.awayPlayerID).name,
			homeScore: match.homeScore,
			awayScore: match.awayScore
		};
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
				{this.props.api.match.get().map(match =>
					<FixtureView 
						key={match.id}
						match={this.format(match)} />
				)}
				</tbody>
			</table>
		</div>
	};
};