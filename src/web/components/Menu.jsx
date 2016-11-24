import React, { Component } from 'react';

import classNames from 'classnames';

export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.shouldComponentUpdate = (nextProps, nextState) => {
			return this.props.displayClasses.get('selected') !== nextProps.displayClasses.get('selected');
		};
	};
	render() {
		const active = ((option) => this.props.displayClasses.get('selected') === option ? 'btn-primary' : '');
		return <div id='menu' className='btn-group col-sm-6' role='group'>
			{this.props.displayClasses.get('options').map((option) =>
				<button className={classNames('btn btn-default', active(option))} type='button' key={option} onClick={() => { this.props.setDisplayedDiv(option) }}>
					{option}
				</button>
			)}
		</div>
	};
};