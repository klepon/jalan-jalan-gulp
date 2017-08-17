import React, { Component } from 'react'
import Icon from './Icon';

class Dropdown extends Component {
    render () {
        if( ! this.props.children ) {
            return null;
        }

        let expanse = this.props.dropdown[ this.props.name ] === true ? "expanse" : "";

        return (
            <div className={ "dropdown "+ expanse }>
                <h4 className="toggle" onClick={ () => this.props.toggle_dropdown(this.props.name) }>
                    <span>{ this.props.title }</span>
                    <Icon icon="icon-angle-down" />
                </h4>
                <div className="collaps_content">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default Dropdown;
