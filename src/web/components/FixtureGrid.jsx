import React, { Component } from 'react';

export default class FixtureGrid extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show;
		};
		this.state = {
			players: this.props.api.player.get()
		};
	};
	formatMatchForGrid(firstPlayerID, secondPlayerID) {
		if (firstPlayerID === secondPlayerID) {
			return 'X';
		};
		const match = this.props.api.match.getForPair([firstPlayerID, secondPlayerID]);
		return match.isPlayed ?
			(firstPlayerID === match.homePlayerID ? match.homeScore + '-' + match.awayScore : match.awayScore + '-' + match.homeScore) :
			this.props.api.gameweek.getByWeekNumber(match.gameWeek).formattedDate;
	};
	format
	render() {   
		return <div id='fixtureGrid' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }} >
			<table className='table table-striped'>
				<thead className='thead-default'>
					<tr>
						<th></th>
						{this.state.players.map(player =>
							<th key={player.id}>
								{player.name}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{this.state.players.map(outerPlayer =>
						<tr key={outerPlayer.id}>
							<th>
								{outerPlayer.name}
							</th>
							{this.state.players.map(innerPlayer =>
								<td key={outerPlayer.id + '-' + innerPlayer.id}>
									{this.formatMatchForGrid(outerPlayer.id, innerPlayer.id)}
								</td>
							)}
						</tr>
					)}
				</tbody>
			</table>
		</div>
	};
};