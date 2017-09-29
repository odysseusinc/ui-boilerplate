import * as numeral from 'numeral';
import keyMirror = require('keymirror');
import { Reducer } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { ModalUtils } from 'arachne-components';
import { reduxForm, SubmissionError } from 'redux-form';
import errors from 'const/errors';
import ConnectedComponentBuilder  from 'interfaces/ConnectedComponentBuilder';
import FetchersParams from 'interfaces/FetchersParams';

numeral.register('locale', 'arachne', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: keyMirror({
    thousand: null,
    million: null,
    billion: null,
    trillion: null,
  }),
  ordinal: (num: number) => '',
  currency: {
    symbol: '',
  },
});

numeral.register('locale', 'arachne-short', {
  delimiters: {
    thousands: ' ',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'mil',
    billion: 'bn',
    trillion: 'tn',
  },
  ordinal: (num: number) => '',
  currency: {
    symbol: '',
  },
});

const numberFormatter = {
  format: (value: number, form: string = 'full') => {
    if (form === 'short') {
      numeral.locale('arachne-short');
    } else {
      numeral.locale('arachne');
    }
    return numeral(value).format('0[.]0 a');
  },
};

const validators = {
  checkValidationError(response) {
    if (typeof response.errorCode !== 'undefined') {
      if ([errors.VALIDATION_ERROR, errors.ALREADY_EXIST].includes(response.errorCode)) {
        throw new SubmissionError({
          _error: response.errorMessage,
          ...response.validatorErrors,
        });
      } else if (response.errorCode !== errors.NO_ERROR) {
        throw new SubmissionError({
          _error: response.errorMessage,
        });
      }
    }
  },
};

class Utils {
  static buildConnectedComponent({
    Component = null,
    mapStateToProps = null,
    getMapDispatchToProps = null, // if it should be defined as Object (this is done due to unavailability of extending of getters in TS)
    mapDispatchToProps = null, // if it should be defined as Function
    mergeProps = null,
    getModalParams = () => null,
    getFormParams = () => null,
    getFetchers = (params?: FetchersParams) => null,
  } = {}) {
    let WrappedComponent = Component;

    if (getModalParams()) {
      WrappedComponent = ModalUtils.connect(getModalParams())(WrappedComponent);
    }

    if (getFormParams()) {
      WrappedComponent = reduxForm(getFormParams())(WrappedComponent);
    }

    let ConnectedComponent = connect(
      mapStateToProps,
      getMapDispatchToProps ? getMapDispatchToProps() : mapDispatchToProps,
      mergeProps
    )(WrappedComponent);

    if (getFetchers()) {
      ConnectedComponent = asyncConnect([{
        promise: ({ params, store: { dispatch, getState } }) => {
          const state = getState();
          const fetchers = getFetchers({ params, state, dispatch });
          return Utils.fetchAll({ fetchers, dispatch });
        },
      }])(ConnectedComponent);
    }

    return ConnectedComponent;
  }

  static fetchAll({ fetchers, dispatch }) {
    return Promise.all(Object.values(fetchers).map(action => dispatch(action())));
  }
}

class ContainerBuilder implements ConnectedComponentBuilder {
  getComponent() {
    return null;
  }

  mapStateToProps(state: Object) {
    return {};
  }

  mapDispatchToProps;

  mergeProps(stateProps, dispatchProps, ownProps) {
    return {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
    };
  }

  getModalParams() {
    return null;
  }

  getFormParams() {
    return null;
  }

  getFetchers(params: FetchersParams) {
    return {};
  }

  build() {
    return Utils.buildConnectedComponent({
      Component: this.getComponent(),
      mapStateToProps: this.mapStateToProps,
      mapDispatchToProps: this.mapDispatchToProps,
      mergeProps: this.mergeProps,
      getModalParams: this.getModalParams,
      getFormParams: this.getFormParams,
      getFetchers: this.getFetchers,
    });
  }
}

export {
  numberFormatter,
  ContainerBuilder,
  validators,
};
