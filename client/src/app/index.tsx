import React from 'react';
import { Provider } from 'react-redux';

import { store } from '@stores';
import '@styles/app.scss'

import Router from './Router';

function App() {
	return (
		<>
			<React.StrictMode>
				<Provider store={store}>
					<Router />
				</Provider>
			</React.StrictMode>
		</>
	);
}


export default App;
