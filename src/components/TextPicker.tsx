import * as React from 'react';

import './TextPicker.scss';

interface ITextPickerProps {
  text: string;
  color: string;
  onTextChange: (newText: string) => void;
  onColorChange: (newColor: string) => void;
}

export default class TextPicker extends React.Component<ITextPickerProps> {
  public handleTextChange = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.onTextChange(event.currentTarget.value);
  };

  public handleColorChange = (event: React.FocusEvent<HTMLInputElement>) => {
    this.props.onColorChange(event.currentTarget.value);
  };

  public render() {
    const { text, color } = this.props;

    return (
      <div className="TextPicker">
        <div className="field">
          <label htmlFor="text-entry-field">Text to use</label>
          <input
            id="text-entry-field"
            type="text"
            value={text}
            onChange={this.handleTextChange}
            placeholder="Enter some text"
          />
        </div>
        <div className="field">
          <label htmlFor="text-color-field">Text color to use</label>
          <input
            id="text-color-field"
            type="text"
            value={color}
            onChange={this.handleColorChange}
            placeholder="Enter a color"
          />
        </div>
      </div>
    );
  }
}
