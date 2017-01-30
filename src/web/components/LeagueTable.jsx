import React, { Component } from 'react';

import LeagueTable from './LeagueTable';

export default class FixtureList extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show;
		};
	};
	formPlayerRow(player) {
		const playerMatches = this.props.api.match.getForPlayer(player.id, true).map(match => {
			return match.homePlayerID === player.id ?
				{ framesWon: match.homeScore, framesLost: match.awayScore } :
				{ framesWon: match.awayScore, framesLost: match.homeScore };
		});
		const id = player.id;
		const name = player.name;
		const played = playerMatches.length;
		const won = playerMatches.filter(match => match.framesWon > match.framesLost || match.framesWon === 'W').length;
		const drew = playerMatches.filter(match => match.framesWon === match.framesLost).length;
		const lost = playerMatches.filter(match => match.framesWon < match.framesLost || match.framesLost === 'W').length;
		const framesWon = playerMatches.map(match => match.framesWon === 'W' ? 6 : match.framesWon ).reduce(((a, b) => a + b), 0);
		const framesLost = playerMatches.map(match => match.framesLost === 'W' ? 6 : match.framesLost ).reduce(((a, b) => a + b), 0);
		const bonus = playerMatches.filter(match => match.framesWon === 6).length;
		const points = 3 * won + drew + framesWon + bonus;
		return { id, name, played, won, drew, lost, framesWon, framesLost, bonus, points };
	};
	sortRows(a, b) {
		return a.points === b.points ?
			(a.bonus === b.bonus ? this.headToHeadSort(a, b): b.bonus - a.bonus):
			b.points - a.points;
	};
	headToHeadSort(a, b) {
		const match = this.props.api.match.getForPair([a.id, b.id]);
		return match.homePlayerID === a.id ?
			match.awayScore - match.homeScore :
			match.homeScore - match.awayScore;
	};
	render() {   
		return <div id='leagueTable' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }}>
			<table className='table table-striped'>
				<thead className='thead-default'>
					<tr>
						<th>{this.props.division}</th>
						<th>P</th>
						<th>W</th>
						<th>D</th>
						<th>L</th>
						<th>F</th>
						<th>A</th>
						<th>+/-</th>
						<th>B</th>
						<th>Pts</th>
					</tr>
				</thead>
				<tbody>
					{this.props.api.player.get()
						.filter(player => player.division === this.props.division)
						.map(player => this.formPlayerRow(player))
						.sort((a, b) => this.sortRows(a, b))
						.map((player, index) =>
						<tr style={index < 4 ? { 'backgroundColor': '#E6BE8A' }: {}} key={player.id}>
							<th>{player.name}</th>
							<td>{player.played}</td>
							<td>{player.won}</td>
							<td>{player.drew}</td>
							<td>{player.lost}</td>
							<td>{player.framesWon}</td>
							<td>{player.framesLost}</td>
							<td>{player.framesWon - player.framesLost}</td>
							<td>{player.bonus}</td>
							<td>{player.points}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	};
};