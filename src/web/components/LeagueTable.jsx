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
		return {
			id: player.id,
			name: player.name,
			played: playerMatches.length,
			won: playerMatches.filter(match => match.framesWon > match.framesLost || match.framesWon === 'W').length,
			drew: playerMatches.filter(match => match.framesWon === match.framesLost).length,
			lost: playerMatches.filter(match => match.framesWon < match.framesLost || match.framesLost === 'W').length,
			framesWon: playerMatches.map(match => match.framesWon === 'W' ? 6 : match.framesWon ).reduce(((a, b) => a + b), 0),
			framesLost: playerMatches.map(match => match.framesLost === 'W' ? 6 : match.framesLost ).reduce(((a, b) => a + b), 0),
			bonus: playerMatches.filter(match => match.framesWon === 6).length
		};
	};
	sortPlayerRows(playerRows) {
		return playerRows;
	};
	render() {   
		return <div id='leagueTable' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }}>
			<table className='table table-striped'>
				<thead className='thead-default'>
					<tr>
						<th>Name</th>
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
					{this.sortPlayerRows(this.props.api.player.get().map(player => this.formPlayerRow(player))).map(player =>
						<tr key={player.id}>
							<th>{player.name}</th>
							<td>{player.played}</td>
							<td>{player.won}</td>
							<td>{player.drew}</td>
							<td>{player.lost}</td>
							<td>{player.framesWon}</td>
							<td>{player.framesLost}</td>
							<td>{player.framesWon - player.framesLost}</td>
							<td>{player.bonus}</td>
							<td>{3 * player.won + player.drew + player.framesWon + player.bonus}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	};
};