import * as React from 'react';
import {
  PageContent,
  LoadingPanel,
} from 'arachne-components';
import BEMHelper from 'services/BemHelper';

require('./style.scss');

interface IStartComponentProps {
  searchStr: string;
  isLoading: boolean;
};

type locationDescriptor = {
  pathname: string;
  search: string;
  query?: { [key: string]: string | number | Array<string> };
};

function Example(props: IStartComponentProps) {
  const { isLoading } = props;
  const classes = BEMHelper('example');

  return (    
    <div {...classes()}>
      <div {...classes({ element: 'content'})}>
        This is an example module
      </div>
      <LoadingPanel active={isLoading} />
    </div>
  );
}

export default Example;
export {
  IStartComponentProps,
  locationDescriptor,
};
