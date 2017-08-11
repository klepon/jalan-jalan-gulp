import React, { Component } from 'react'

class Link extends Component {
    render () {
        return (
            <a href={this.props.link} title={this.props.title}>{this.props.title}</a>
        )
    }
}

export default Link;
