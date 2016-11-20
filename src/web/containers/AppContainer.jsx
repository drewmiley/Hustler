import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/hustler';

class App extends Component {
    render() {
        return <div>
            Hustler
        </div>
    };
};

const mapStateToProps = state => {
    return {};
}

const AppContainer = connect(mapStateToProps, actionCreators)(App);

export default AppContainer;