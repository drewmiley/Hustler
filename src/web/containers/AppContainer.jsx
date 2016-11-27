import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/hustler';

import DisplayTitle from '../components/DisplayTitle';
import FixtureGrid from '../components/FixtureGrid';
import FixtureList from '../components/FixtureList';
import LeagueTable from '../components/LeagueTable';
import Menu from '../components/Menu';

class App extends Component {
	render() {
		return <div>
			<Menu
				displayClasses={this.props.displayClasses}
				setDisplayedDiv={this.props.setDisplayedDiv} /> 
			<DisplayTitle displayedClass={this.props.displayClasses.get('selected')} />
			<FixtureGrid
				api={this.props.api}
				show={this.props.displayClasses.get('selected') === 'Fixture Grid'} />
			<FixtureList
				api={this.props.api}
				show={this.props.displayClasses.get('selected') === 'Fixture List'} />
			<LeagueTable
				api={this.props.api}
				show={this.props.displayClasses.get('selected') === 'League Table'} />
		</div>
	};
};

const mapStateToProps = state => {
	return {
		api: state.get('api').toJS(),
		displayClasses: state.get('displayClasses')
	};
};

export default connect(mapStateToProps, actionCreators)(App);