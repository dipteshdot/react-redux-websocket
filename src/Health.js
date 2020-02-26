/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './styles.css';

export default class Health extends Component {
	render () {
		const { value } = this.props;
		let className = '';
		if (value <= 50) {
			className = 'color0_50';
		} else if (value >= 51 && value <= 70) {
			className = 'color51_70';
		} else {
			className = 'color71_100';
		}

		return (
			<div>
				<progress className={className} min="0" max="100" value={value} />
			</div>
		);
	}
}
