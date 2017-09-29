import Duck from 'services/Duck';
import { apiPaths } from 'modules/Auth/const';
import { push as goToPage } from 'react-router-redux';
import { authTokenName } from 'const';
import * as _ from 'lodash';

const actionCoreName = 'AUTH_CORE';

const ducks = new Duck({
  name: actionCoreName,
  urlBuilder: () => '',
});

function setToken(token: string) {
  if (token) {
    window.localStorage.setItem(authTokenName, token);
  } else {
    window.localStorage.removeItem(authTokenName);    
  }
  return {
    type: `${actionCoreName}_FIND_FULFILLED`,
    payload: {
      token,
    },
  };
}

function setBackUrl(url: string) {
  return {
    type: `${actionCoreName}_QUERY_FULFILLED`,
    payload: {
      data: { backurl: url },
    },
  };
}

export default {
  actions: {   
    setToken,
    setBackUrl,
  },
  reducer: ducks.reducer,
};
