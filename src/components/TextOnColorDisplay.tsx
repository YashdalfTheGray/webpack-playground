import * as React from 'react';

// import './TextOnColorDisplay.scss';

interface ITextOnColorDisplayProps {
  text: string;
  color: string;
}

interface ITextOnColorDisplayState {
  colors: string[];
}

export default class TextOnColorDisplay extends React.Component<
  ITextOnColorDisplayProps,
  ITextOnColorDisplayState
> {
  constructor(props: ITextOnColorDisplayProps) {
    super(props);

    this.state = {
      colors: this.generate4BitGrayscale()
    };
  }

  public render() {
    const { text, color } = this.props;
    const { colors } = this.state;

    return (
      <div className="TextOnColorDisplay">
        {colors.map((c, i, arr) => (
          <div
            className="swatch"
            key={c}
            style={{
              backgroundColor: c,
              border: `1px solid ${arr[arr.length - 1 - i]}`
            }}>
            <span style={{ color }}>{text}</span>
          </div>
        ))}
      </div>
    );
  }

  private generate4BitGrayscale = () => {
    let channel = 0;
    return new Array(17).fill('').map(() => {
      const hexChannel = channel.toString(16);
      const color = `#${hexChannel}${hexChannel}${hexChannel}`;
      channel += 16;
      return color;
    });
  };
}
