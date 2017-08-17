import React, { Component } from 'react'

class Checkbox extends Component {
    render () {
        return (
            <label>
                <input type="checkbox"
                    name={ this.props.name }
                    checked={ this.props.checked }
                    onChange={ (e) => this.props.onChange(e) }
                    />
                <span>{ this.props.label }</span>
                { this.props.info_label }
            </label>
        )
    }
}

export default Checkbox;
