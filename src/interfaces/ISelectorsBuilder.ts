import { Selector } from 'reselect';

interface ISelectorsBuilder {
  build: () => { [x: string]: Selector<Object, any> };
}

export default ISelectorsBuilder;
