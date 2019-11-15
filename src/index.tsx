import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import CSSBaseline from './components/CSSBaseline';

const AppFrame = () => (
  <CSSBaseline>
    <App name={APP_NAME} />
  </CSSBaseline>
);

ReactDOM.render(<AppFrame />, document.querySelector('div#app-root'));
