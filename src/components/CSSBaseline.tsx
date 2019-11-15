import * as React from 'react';

// import './CSSBaseline.scss';

export default class CSSBaseline extends React.Component {
  public render() {
    const { children = null } = this.props;

    return <>{children}</>;
  }
}
