import * as React from 'react';
import BEMHelper from 'services/BemHelper';
import { Link, Panel } from 'arachne-components';
import { paths } from 'modules/Start/const';

require('./style.scss');

function Welcome() {
  const classes = BEMHelper('welcome');
  const panelClasses = BEMHelper('welcome-panel');

  return (
    <div {...classes()}>
      <Panel
        {...panelClasses()}
        title="Welcome"
      >
        <div {...panelClasses('content')}>
          <p {...panelClasses('line')}>
            Thank you for registering.<br/>
            We have just sent you an email<br/>
            to confirm your account.
          </p>
          <p {...panelClasses('line')}>
            Please <Link to={paths.example()}>click here</Link> to return to start page.
          </p>
        </div>
       </Panel>
    </div>
  );
}

export default Welcome;
