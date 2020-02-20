/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestEditMachines, requestMachines } from './redux/machines/actions';

import './styles.css';
import Health from './Health';

class EditMachines extends Component {
	constructor (props) {
		super(props);
		const { state } = props.location;
		this.state = {
			name: '',
			health: state.health
		};
	}

	componentDidMount () {
		const data = this;
		window.ws.onmessage = function (event) {
			const eventData = JSON.parse(event.data);
			data.setState({ health: eventData.health });
		};
	}

	componentDidUpdate (prevProps) {
		const { machine, history } = this.props;
		const { machine: prevMachine } = prevProps;
		if (machine && prevMachine !== machine) {
			history.push('/machines');
		}
	}

	handleChange = prop => event => {
		this.setState({ ...this.state, [prop]: event.target.value });
	};

	onSubmit = () => {
		const { state } = this.props.location;
		const { id } = state;
		const { name } = this.state;
		this.props.requestEditMachines({ name, id });
	}

	render () {
		const { state } = this.props.location;
		const { name: machineName, ip_address } = state;
		const { name, health } = this.state;

		return (
			<div>
				<div className='container'>
					<div className='div_width'>
						<h2>{machineName}</h2>
						<div>
							<h3>Update Device</h3>
						</div>
						Name:
						<input type="text" value={name} placeholder={machineName} onChange={this.handleChange('name')} />
						<button type="submit" onClick={this.onSubmit}> Submit </button>
					</div>
					<div className='div_width'>
						<div className="card">
							<h3>{health}</h3>
							<Health value={health} />
						</div>
						<h3>Stats</h3>
						IP Address: {ip_address}
					</div>
				</div>
				<br />
			</div>
		);
	}
}
const mapStateToProps = state => {
	const { Machines } = state;
	const { machine, error, isLoading } = Machines;
	return { machine, error, isLoading };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ requestEditMachines, requestMachines },
		dispatch
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditMachines));

