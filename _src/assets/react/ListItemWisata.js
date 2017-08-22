
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
            <a href={ this.props.domain +'/tempat-wisata/'+ this.props.data.slug } title={ this.props.data.title } className="lead_img"><img src={ this.props.domain +'/wp-content/uploads/'+ this.props.data.thumb } alt={ this.props.data.title } /></a>
        )
    }

    provinsi = () => {
        let taxo = this.get_taxo_by_name('wisata', 'single')
        return (
            <Link
                link={ this.props.domain +'/'+ taxo[0] }
                title={ taxo[1] }
            />
        )
    }

    area = () => {
        let taxo = this.get_taxo_by_name('wisata-bali', 'single')
        return (
            <Link
                link={ this.props.domain +'/'+ taxo[0] }
                title={ taxo[1] }
            />
        )
    }

    terrain = () => {
        let domain = this.props.domain,
            links = this.get_taxo_by_name('wisata-bali-lokasi'),
            coma = "";

        return links.map(function(item, index){
            coma = index === links.length - 1 ? "" : ", ";

            return (
                <span
                    key={ index } >
                    <Link
                        link={ domain +'/'+ item[0] }
                        title={ item[1] }
                    />{coma}
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
                        return [key, this.props.data.taxo[key]];
                    } else {
                        rs.push([key, this.props.data.taxo[key]])
                    }
                }
            }
        }

        return rs;
    }

    render () {
        return (
            <div className="list">
                <div className="anchor" onClick={ () => this.props.set_map_state(
                    this.props.data.id, this.props.map_state[1], this.props.map_state[2], this.props.map_state[3]
                ) }>
                    <Icon icon="icon-pin" />
                </div>

                <div className="detail">
                    <h3><a href={ this.props.domain +'/tempat-wisata/'+ this.props.data.slug } title={ this.props.data.title }>{ this.props.data.title }</a></h3>
                    <small>{ this.provinsi() } - { this.area() } - { this.terrain() }</small>
                </div>

                { this.thumbnail() }
            </div>
        )
    }
}

export default PanelItemWisata;
