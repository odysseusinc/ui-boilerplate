import * as React from 'react';
import { PlainRoute } from 'react-router';

function rootRoute(path: string): PlainRoute {
  return {
    path,
    component: ({ children }) => children,
    indexRoute: {
      onEnter: (nextState, replace) => {
        replace(`/${path}/example`);
      }
    },
    childRoutes: [
      {
        path: 'example',
        component: require('./components/Example').default,
      },
    ],
  };
}

export default rootRoute;
