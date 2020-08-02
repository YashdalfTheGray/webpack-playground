import { hot } from 'react-hot-loader/root';

import * as React from 'react';

import AppHeader from './AppHeader';
import TextOnColorDisplay from './TextOnColorDisplay';
import TextPicker from './TextPicker';

interface IAppProps {
  name: string;
}

interface IAppState {
  displayText: string;
  displayColor: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      displayText: 'Sample text',
      displayColor: '#1976D2',
    };
  }

  public handleTextChange = (newText: string) => {
    this.setState({
      displayText: newText,
    });
  };

  public handleColorChange = (newColor: string) => {
    this.setState({
      displayColor: newColor,
    });
  };

  public render() {
    const { name } = this.props;
    const { displayText, displayColor } = this.state;

    return (
      <>
        <AppHeader name={name} />
        <TextPicker
          text={displayText}
          color={displayColor}
          onTextChange={this.handleTextChange}
          onColorChange={this.handleColorChange}
        />
        <TextOnColorDisplay text={displayText} color={displayColor} />
      </>
    );
  }
}

export default hot(App);
