import * as React from 'react';
import { get } from 'lodash';
import { ReactElement } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Router, RouteConfig, PlainRoute, RouteComponent } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';

import configureStore from 'stores/configureStore';
import { IStoreAsync, injectReducer } from 'stores/configureStore';
import ApiService from 'services/Api';
import IModule from './modules/IModule';
import { injectAction } from 'actions';
import modulesActions from 'actions/modules';
import { IModuleMetadata } from 'actions/modules';
import { indexRoute as modulesIndexRoute, modules } from './modules';

import AuthService from 'services/Auth';

interface IInitedModule {
	moduleRoute: RouteConfig,
	navbarElement: Array<ReactElement<any>>
}

let globalStore: IStoreAsync;

function getAppContainer(menuItems) {
	const AppContainer = require('./AppContainer').default;
  return props => (
    <AppContainer
      {...props}
      navItems={menuItems}
    />
  );
}

function buildRoutes(
	container: RouteComponent,
	indexRoute: PlainRoute,
	moduleRouteList: PlainRoute[]
): RouteConfig {
	const routes: PlainRoute = {
	  path: '/',
	  component: container,
	  indexRoute,
	  childRoutes: moduleRouteList,
	};

	return routes;
}

function registerModule(moduleMetadata: IModuleMetadata) {
	globalStore.dispatch(
		modulesActions.register(moduleMetadata)
	);
}

function setActiveModule(activeModulePath: string) {
	globalStore.dispatch(
		modulesActions.setActive(activeModulePath)
	);
}

function initModule(module: IModule): IInitedModule {
	// Inject module's action creators
	if (module.actions) {
		injectAction(module.namespace, module.actions());
	}
	// Inject module's reducer
	if (module.reducer) {
		const reducers = module.reducer();
		injectReducer(globalStore, module.namespace, combineReducers({ ...reducers }));
	}

	let navbarElement = null;
	if (module.navbarElement) {
		navbarElement = module.navbarElement();
	}
	
	let moduleRoute = null;
	if (module.rootRoute) {
		moduleRoute = module.rootRoute();
		moduleRoute.onEnter = (nextState, replace) => setActiveModule(moduleRoute.path);
		// Register module in store
		registerModule({
			path: moduleRoute.path,
		});
	}
	// Return module's Route
	return {
		moduleRoute,
		navbarElement,
	};
}

function buildStore() {
	return configureStore({});
}

function initializeApi() {
  ApiService
    .setUserTokenGetter(() => AuthService.getAuthToken())
    .setUnauthorizedHandler(() => AuthService.onAccessDenied());
}

function bootstrap() {
	const store = globalStore = buildStore();
	const history = syncHistoryWithStore(browserHistory, store);

	AuthService.setStore(store);
	initializeApi();
	
	const modulesRoutes: PlainRoute[] = [];
	let navbarElements: Array<ReactElement<any>> = [];

	modules.forEach(module => {
		const { moduleRoute, navbarElement } = initModule(module);
		if (moduleRoute) {
			modulesRoutes.push(moduleRoute);
		}
		if (navbarElement) {
			navbarElements = navbarElements.concat(navbarElement);
		}
	});

	const appRoutes: RouteConfig = buildRoutes(
		getAppContainer(navbarElements),
		modulesIndexRoute,
		modulesRoutes
	);

	AuthService.loadAuthTokenFromLS();

	return (
		<Provider store={store}>
			<Router routes={appRoutes} history={history} />
		</Provider>
	);
}

export default bootstrap;
