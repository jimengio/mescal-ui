import React from "react";

interface IProps {
  width?: number;
  height?: number;
}

export default class Space extends React.Component<IProps, any> {
  render() {
    return (
      <div
        style={{
          display: this.props.width ? "inline-block" : "block",
          width: this.props.width || 1,
          height: this.props.height || 1,
        }}
      />
    );
  }
}
