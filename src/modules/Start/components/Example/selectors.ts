import { createSelector } from 'reselect';
import { get, has } from 'lodash';
import ISelectorsBuilder from 'interfaces/ISelectorsBuilder';

export default class SelectorBuilder implements ISelectorsBuilder {
  getRawSamples(state) {
    return get(state, 'start.samples.data', [{ name: 'sample selectors result' }]);
  }

  getSample(item) {
    return item.name;
  }

  createSelectorForSamples() {
    return createSelector(
      this.getRawSamples,
      samples => this.getSample
    );
  }

  build() {
    return {
      getSamples: this.createSelectorForSamples(),
    };
  }
}