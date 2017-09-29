import * as React from 'react';
import {
  NavItem,
} from 'components';
import rootRoute from './routes';
import IModule from '../IModule';
import { paths } from './const';
import ducks from './ducks';

const module: IModule = {
	namespace: 'start',
  rootRoute: () => rootRoute('start'),
	actions: () => ducks.actions,
	reducer: () => ducks.reducer,
	navbarElement: () => [
		<NavItem module='start' name='Search' path={paths.example()} />,
	],
};

export default module;
