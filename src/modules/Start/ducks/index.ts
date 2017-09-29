import start from './start';

export default {
  actions: {
    ...start.actions,
  },
  reducer: {
    start: start.reducer,
  },
};
