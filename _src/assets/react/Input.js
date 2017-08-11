import React, { Component } from 'react'

class Input extends Component {
    render () {
        return (
            <input type="text"
                className={ this.props.class_name }
                onChange={ (e) => this.props.onChange(e) }
                value={ this.props.value }
                />
        )
    }
}

export default Input;
