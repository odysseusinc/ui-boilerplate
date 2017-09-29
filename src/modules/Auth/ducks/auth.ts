import Duck from 'services/Duck';
import { apiPaths } from 'modules/Auth/const';

const ducks = new Duck({
  name: 'AUTH',
  urlBuilder: apiPaths.myUserpic,
});

export default {
  actions: ducks.actions,
  reducer: ducks.reducer,
};
