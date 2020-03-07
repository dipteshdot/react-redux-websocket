import React from 'react';
import ReactDOM from 'react-dom';
import Machines from './Machines';
import { shallow } from 'enzyme';
import WS from 'jest-websocket-mock';

class MachinesComponent extends React.Component {
	render() {
		return (<Machines />);
	}
}

it('should render MachinesComponent', () => {
	const wrapper = shallow(<MachinesComponent />);
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