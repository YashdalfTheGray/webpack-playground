import * as React from 'react';

import './TextPicker.scss';

interface ITextPickerProps {
  text: string;
  color: string;
  onTextChange: (newText: string) => void;
  onColorChange: (newColor: string) => void;
}

interface ITextPickerState {
  colorValue: string;
}

export default class TextPicker extends React.Component<
  ITextPickerProps,
  ITextPickerState
> {
  constructor(props: ITextPickerProps) {
    super(props);

    this.state = {
      colorValue: props.color,
    };
  }

  public handleTextChange = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.onTextChange(event.currentTarget.value);
  };

  public handleColorChange = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ colorValue: event.currentTarget.value });
  };

  public handleColorBlur = () => {
    const { colorValue } = this.state;
    if (this.validateColorString(colorValue)) {
      this.props.onColorChange(colorValue);
    }
  };

  public render() {
    const { text } = this.props;
    const { colorValue } = this.state;

    return (
      <div className="TextPicker">
        <div className="field">
          <label htmlFor="text-entry-field">Text to use</label>
          <input
            id="text-entry-field"
            type="text"
            value={text}
            placeholder="Enter some text"
            maxLength={20}
            onChange={this.handleTextChange}
          />
        </div>
        <div className="field">
          <label htmlFor="text-color-field">Text color to use</label>
          <input
            id="text-color-field"
            type="text"
            value={colorValue}
            placeholder="Enter a color"
            maxLength={7}
            onChange={this.handleColorChange}
            onBlur={this.handleColorBlur}
          />
        </div>
      </div>
    );
  }

  private validateColorString = (cs: string) => /^#[A-Fa-f0-9]{6}$/.test(cs);
}
