import React, { Component } from 'react'

class Button extends Component {
    render () {
        let class_name = this.props.class_name === undefined ? "" : this.props.class_name;
        if( this.props.current != undefined && this.props.current === this.props.value ) {
            class_name += ' active';
        }
        return (
            <button
                className={ class_name }
                onClick={() => this.props.onClick( this.props.value )}
                >{ this.props.title }</button>
        )
    }
}

export default Button;
