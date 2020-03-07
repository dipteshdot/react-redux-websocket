

import React from 'react';
import ReactDOM from 'react-dom';
import Foo from './Machines';
import Health from './Health';
import { mount, shallow } from 'enzyme';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import WS from 'jest-websocket-mock';
import createRouterContext from 'react-router-test-context';
import { createStore } from 'redux';
import reducer from './redux/machines/reducer';
import EditMachines from './EditMachines';

class EditMachinesComponent extends React.Component {
	render() {
		return (<EditMachines />);
	}
}

it('should render EditMachinesComponent', () => {
	const wrapper = shallow(<EditMachinesComponent />);
	const inst = wrapper.instance();
	expect(inst).toBeTruthy();
});

test('the mock server sends messages to connected clients', async () => {
	const server = new WS('ws://localhost:1337');
	const client1 = new WebSocket('ws://localhost:1337');
	await server.connected;
	const client2 = new WebSocket('ws://localhost:1337');
	await server.connected;

	const messages = { client1: [], client2: [] };
	client1.onmessage = e => {
		messages.client1.push(e.data);
	};
	client2.onmessage = e => {
		messages.client2.push(e.data);
	};

	server.send('Hello');
	expect(messages).toEqual({
		client1: ['Hello'],
		client2: ['Hello']
	});
});
