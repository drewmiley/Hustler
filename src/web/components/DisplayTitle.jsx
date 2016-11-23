import React, { Component } from 'react';

export default class DisplayTitle extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.displayedClass !== nextProps.displayedClass;
		};
	};
	render() {
		return <div className='col-md-10 col-sm-12'>
			<p className='h2'>{this.props.displayedClass}</p>
		</div>
	};
};