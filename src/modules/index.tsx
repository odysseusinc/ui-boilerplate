import { PlainRoute } from 'react-router';
import IModule from './IModule';
import Start from './Start';
import Auth from './Auth';

const modules: IModule[] = [
	Start,
	Auth,
];

const indexRoute: PlainRoute = {
	onEnter: (nextState, replace) => {
		replace('/start');
	},
};

export {
	indexRoute,
	modules,
};
