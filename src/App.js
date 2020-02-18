import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';

import { Provider } from 'react-redux';

import { store, history } from './redux/store';
import Machines from './Machines';
import EditMachines from './EditMachines';
import './App.css';

function App () {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div className='App'>
					<header className='App-header'>
						<img
							alt='logo'
							height='272'
							width='800'
							src='https://i.imgur.com/jcvsFKh.png'
						/>
					</header>

					<nav className='App-nav'>
						<Link to='/'>Home</Link>
						<Link to='/machines'>Machines</Link>
					</nav>

					<Switch>
						<Route exact path='/machines'>
							<Machines />
						</Route>
						<Route path='/machines/:id'>
							<EditMachines />
						</Route>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
