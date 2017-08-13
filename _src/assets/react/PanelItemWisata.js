
/* panel item khusus tempat wisata di bali,
* taxonya hard code wisata bali */

import React, { Component } from 'react';
import Link from './Link';

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

    open_detail = () => {
        return (
            <span>{ this.props.meta_key_val.open_day[this.props.data.filter.day_open] } { this.props.data.filter.open_hours } - { this.props.data.filter.closed_hours }</span>
        )
    }

    render_status = () => {
        let rs = [],
            status = this.props.meta_key_val.status;

        if( typeof( this.props.data.filter.status ) === 'string' || typeof( this.props.data.filter.status ) === 'undefined' ) {
            return null;
        };

        rs = this.props.data.filter.status.map(function(item){
            return status[item];
        });

        return rs.join(', ');
    }

    render () {
        return (
            <div className="tile">
                { this.thumbnail() }

                <div className="detail">
                    <h3><a href={ this.props.domain +'/tempat-wisata/'+ this.props.data.slug } title={ this.props.data.title }>{ this.props.data.title }</a></h3>
                    <small>{ this.provinsi() } - { this.area() } - { this.terrain() }</small>

                    <p className="info">
                        <span>{ this.render_status() }</span><br />

                        { this.open_detail() }<br />

                        <span>{ this.props.meta_key_val.park_available[this.props.data.filter.park_available] }, { this.props.meta_key_val.park_distant[this.props.data.filter.park_distant] }</span><br />

                        <span>Tiket {'\u00b1'} { this.props.meta_key_val.price_range[this.props.data.filter.price_range] }</span>
                    </p>
                    <span className="plus"></span>
                    <div className="desc">
                        <p>{ this.props.data.excerpt }</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PanelItemWisata;
