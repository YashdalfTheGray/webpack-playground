import * as React from 'react';

// import './AppHeader.scss';

interface IAppHeaderProps {
  name: string;
}

export default class AppHeader extends React.Component<IAppHeaderProps> {
  public render() {
    const { name } = this.props;
    return (
      <div className="AppHeader">
        <h1>{name}</h1>
      </div>
    );
  }
}
