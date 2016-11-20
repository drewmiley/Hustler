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

export default connect(mapStateToProps, actionCreators)(App);