/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestMachines } from './redux/machines/actions';

import './styles.css';
import Health from './Health';

class Machines extends Component {

	componentDidMount () {
		this.props.requestMachines();
		const data = this.props;
		window.ws.onmessage = function (event) {
			data.requestMachines();
		};
	}

	handleEdit = (obj) => {
		return this.props.history.push(`/machines/${obj.id}`, obj);
	}

	render () {
		return (
			<div className='container'>
				<table id="machine">
					<thead>
						<tr>
							<th>Name</th>
							<th>IP Address</th>
							<th>Health</th>
						</tr>

					</thead>
					<tbody>
						{
							this.props.machines && this.props.machines.length && this.props.machines.map((obj, index) => {
								return (
									<tr key={index} onClick={() => this.handleEdit(obj)}>
										<td>{obj.name}</td>
										<td>{obj.ip_address}</td>
										<td><Health value={obj.health} /></td>
									</tr>
								);
							})
						}
					</tbody>

				</table>
			</div>

		);
	}
}

const mapStateToProps = state => {
	const { Machines } = state;
	const { machines, machine, error, isLoading } = Machines;
	return { machines, machine, error, isLoading };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ requestMachines },
		dispatch
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Machines));
