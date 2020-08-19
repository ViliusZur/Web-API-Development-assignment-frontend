import React from "react"

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "black"
    }
  }
  setColor = () => {
    this.setState({ color: "red" })
  }
  revertColor = () => {
    this.setState({ color: "black" })
  }
  render() {
    return (
      <h1
        onMouseEnter={this.setColor}
        onMouseLeave={this.revertColor}
        style={{ color: this.state.color }}
      >
        Hello {this.props.name}
      </h1>
    )
  }
}
