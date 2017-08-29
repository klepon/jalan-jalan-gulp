
/* panel item khusus tempat wisata di bali,
* taxonya hard code wisata bali */

import React, { Component } from 'react';
import Link from './Link';
import Icon from './Icon';

class PanelItemWisata extends Component {
    thumbnail = () => {
        if( !this.props.data.thumb ) {
            return null;
        }

        return (
            <span className="lead_img"><img src={ this.props.domain +'/wp-content/uploads/'+ this.props.data.thumb } alt={ this.props.data.title } /></span>
        )
    }

    terrain = () => {
        let links = this.get_taxo_by_name('wisata-bali-lokasi'),
            coma = "";

        return links.map(function(item, index){
            coma = index === links.length - 1 ? "" : ", ";

            return (
                <span
                    key={ index } >
                    { item }{coma}
                </span>
            )
        });
    }

    get_taxo_by_name = (name, single) => {
        let rs = [];

        for (var key in this.props.data.taxo) {
            if (this.props.data.taxo.hasOwnProperty(key)) {
                if( key.split('/')[0] === name ) {
                    if( single === 'single' ) {
                        return this.props.data.taxo[key];
                    } else {
                        rs.push(this.props.data.taxo[key])
                    }
                }
            }
        }

        return rs;
    }

    render () {
        let active = this.props.map_state[0] === this.props.data.id ? " active" : "";
        return (
            <div className={"list list-"+ this.props.data.id + active } onClick={ () => this.props.set_map_state(
                this.props.data.id,
                this.props.map_state[1],
                this.props.map_state[2],
                17,
                false
            ) }>
                <div className="anchor">
                    <Icon icon="icon-pin" />
                </div>

                <div className="detail">
                    <h3>{ this.props.data.title }</h3>
                    <small>
                        <span>{ this.get_taxo_by_name('wisata', 'single') }</span> -
                        <span>{ this.get_taxo_by_name('wisata-bali', 'single') }</span> -
                        { this.terrain() }
                    </small>
                </div>

                { this.thumbnail() }
            </div>
        )
    }
}

export default PanelItemWisata;
