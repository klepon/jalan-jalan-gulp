import React, { Component } from 'react'

class Button extends Component {
    render () {
        return (
            <button
                className={this.props.class_name}
                onClick={() => this.props.onClick(this.props.value)}
                >{this.props.title}</button>
        )
    }
}

export default Button;
