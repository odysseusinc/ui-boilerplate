import * as React from 'react';
import rootRoute from './routes';
import IModule from '../IModule';
import { paths } from './const';
import ducks from './ducks';

const module: IModule = {
	namespace: 'auth',
  rootRoute: () => rootRoute('auth'),
	actions: () => ducks.actions,
	reducer: () => ducks.reducer,
	navbarElement: () => {
		const UserMenu = require('./components/UserMenu').default;
		return [
			<UserMenu/>,
		]
	}
};

export default module;
