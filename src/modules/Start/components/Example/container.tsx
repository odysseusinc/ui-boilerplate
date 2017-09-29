import { ContainerBuilder } from 'services/Utils';
import { Component } from 'react';
import { get } from 'lodash';
import presenter from './presenter';
import * as URI from 'urijs';
import {
	IStartComponentProps,
} from './presenter';
import SelectorsBuilder from './selectors';

const selectors = new SelectorsBuilder().build();

interface IStartComponentDispatchProps {
	loadTerms: Function,
}

class Example extends Component<IStartComponentProps & IStartComponentDispatchProps, {}> {
	componentWillMount() {
	}

	componentWillReceiveProps(props: IStartComponentProps) {
	}

	render() {
		return presenter(this.props);
	}
}

export default class ExampleBuilder extends ContainerBuilder {
	getComponent() {
		return Example;
	}
}
