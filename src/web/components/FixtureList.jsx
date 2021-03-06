import React, { Component } from 'react';

import FixtureView from './FixtureView';

export default class FixtureList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show ||
				this.state.divisionFilter !== nextState.divisionFilter ||
				this.state.playerFilter !== nextState.playerFilter ||
				this.state.dateFilter !== nextState.dateFilter ||
				this.state.statusFilter !== nextState.statusFilter;
		};
		this.state = {
			divisionFilter: this.divisionOptions()[0].filter,
			playerFilter: this.playerOptions()[0].filter,
			dateFilter: this.dateOptions()[0].filter,
			statusFilter: this.statusOptions()[0].filter
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
	divisionOptions() {
		const divisionStatuses = [
			{ display: 'All', filter: (() => true) },
			{ display: 'A', filter: ((match) => this.props.api.player.get().find(player => player.id === match.homePlayerID).division === 'A' &&
				this.props.api.player.get().find(player => player.id === match.awayPlayerID).division === 'A') },
			{ display: 'B', filter: ((match) => this.props.api.player.get().find(player => player.id === match.homePlayerID).division === 'B' &&
				this.props.api.player.get().find(player => player.id === match.awayPlayerID).division === 'B') }
		];
		return divisionStatuses;
	}
	playerOptions() {
		return [{ display: 'All', filter: (() => true) }]
			.concat(this.props.api.player.get().map(player => {
				return {
					display: player.name,
					filter: ((match) => match.homePlayerID === player.id || match.awayPlayerID === player.id)
				};
			}));
	};
	dateOptions() {
		return [
				{ display: 'All', filter: (() => true)},
				{ display: 'Current', filter: ((match) => match.gameWeek === this.props.api.gameweek.getByDate(new Date()).number)},
				{ display: 'Future', filter: ((match) => match.gameWeek > this.props.api.gameweek.getByDate(new Date()).number)},
				{ display: 'Past', filter: ((match) => match.gameWeek < this.props.api.gameweek.getByDate(new Date()).number)}
			].concat(this.props.api.gameweek.get().map(gameWeek => {
				return {
					display: gameWeek.formattedDate,
					filter: ((match) => match.gameWeek === gameWeek.number)
				};
			}));
	};
	statusOptions() {
		const gameStatuses = [
			{ display: 'All', filter: (() => true) },
			{ display: 'Played', filter: ((match) => match.isPlayed) },
			{ display: 'Unplayed', filter: ((match) => !match.isPlayed) },
			{ display: 'Walkover', filter: ((match) => match.homeScore === 'W' || match.awayScore === 'W') },
			{ display: 'Whitewash', filter: ((match) => (match.homeScore === 6 && match.awayScore === 0) || (match.awayScore === 6 && match.homeScore === 0))}
		];
		return gameStatuses;
	};
	filterMatch(match) {
		return this.state.divisionFilter(match) && this.state.playerFilter(match) && this.state.dateFilter(match) && this.state.statusFilter(match);
	};
	render() {   
		return <div id='fixtureList' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }} >
			<div className='panel panel-default'>
				<div className='panel-heading'>Division:</div>
				<select
					className='form-control'
					onChange={(e) => this.setState({ divisionFilter: this.divisionOptions().find(option => option.display === e.target.value).filter})}>
					{this.divisionOptions().map(option =>
						<option key={option.display} value={option.display}>{option.display}</option>
					)}
				</select>
			</div>
			<div className='panel panel-default'>
				<div className='panel-heading'>Player:</div>
				<select
					className='form-control'
					onChange={(e) => this.setState({ playerFilter: this.playerOptions().find(option => option.display === e.target.value).filter})}>
					{this.playerOptions().map(option =>
						<option key={option.display} value={option.display}>{option.display}</option>
					)}
				</select>
			</div>
			<div className='panel panel-default'>
				<div className='panel-heading'>Date:</div>
				<select
					className='form-control'
					onChange={(e) => this.setState({ dateFilter: this.dateOptions().find(option => option.display === e.target.value).filter})}>
					{this.dateOptions().map(option =>
						<option key={option.display} value={option.display}>{option.display}</option>
					)}
				</select>
			</div>
			<div className='panel panel-default'>
				<div className='panel-heading'>Status:</div>
				<select
					className='form-control'
					onChange={(e) => this.setState({ statusFilter: this.statusOptions().find(option => option.display === e.target.value).filter})}>
					{this.statusOptions().map(option =>
						<option key={option.display} value={option.display}>{option.display}</option>
					)}
				</select>
			</div>
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
				{this.props.api.match.get()
					.filter(match => this.filterMatch(match))
					.sort((a, b) => a.gameWeek - b.gameWeek)
					.map(match =>
					<FixtureView 
						key={match.id}
						match={this.format(match)} />
				)}
				</tbody>
			</table>
		</div>
	};
};