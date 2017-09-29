import Duck from 'services/Duck';
import { apiPaths } from 'modules/Start/const';

const ducks = new Duck({
  name: 'START',
  urlBuilder: apiPaths.download,
});

export default {
  actions: ducks.actions,
  reducer: ducks.reducer,
};
