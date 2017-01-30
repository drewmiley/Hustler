import React, { Component } from 'react';

export default class FixtureGrid extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.show !== nextProps.show;
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
	render() {   
		return <div id='fixtureGrid' className='col-md-10 col-sm-12' style={this.props.show ? {} : { 'display': 'none' }} >
			<table className='table table-striped'>
				<thead className='thead-default'>
					<tr>
						<th>{this.props.division}</th>
						{this.props.api.player.get()
							.filter(player => player.division === this.props.division)
							.map(player =>
							<th key={player.id}>
								{player.name}
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{this.props.api.player.get()
						.filter(player => player.division === this.props.division)
						.map(outerPlayer =>
						<tr key={outerPlayer.id}>
							<th>
								{outerPlayer.name}
							</th>
							{this.props.api.player.get()
								.filter(player => player.division === this.props.division)
								.map(innerPlayer =>
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