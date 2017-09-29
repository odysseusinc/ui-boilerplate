import auth from './auth';
import core from './core';

export default {
  actions: {
    auth: auth.actions,
    core: core.actions,
  },
  reducer: {
    auth: auth.reducer,
    core: core.reducer,
  },
};
