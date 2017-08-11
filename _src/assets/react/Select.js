import React, { Component } from 'react'

class Select extends Component {
    render () {
        return (
            <select onChange={(e) => this.props.onChange(e)} value={ this.props.current }>
                {this.props.options.map( function( item, index ) {
                    if( item[2] ) {
                        return (
                            <option
                                disabled
                                key={ index }
                                value={ item[0] }
                                >{ item[1] }</option>
                        )
                    } else {
                        return (
                            <option
                                key={ index }
                                value={ item[0] }
                                >{ item[1] }</option>
                        )
                    }
                })}
            </select>
        )
    }
}

export default Select;
