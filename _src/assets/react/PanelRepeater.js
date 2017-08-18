import React, { Component } from 'react';
import PanelItemWisata from './PanelItemWisata';
import PanelItemHotel from './PanelItemHotel';

class PanelRepeater extends Component {
    render () {
        let type = this.props.type,
            domain = this.props.domain,
            end = this.props.page * this.props.per_page,
            start = this.props.page * this.props.per_page - this.props.per_page,
            meta_key_val = this.props.meta_key_val;

        // console.log( meta_key_val );

        if( start > this.props.data.length ) {
            return (
                <p>Tidak ditemukan tempat wisata</p>
            )
        }

        return (
            <div className="tile-container">
                {this.props.data.slice(start, end).map(function(item, index) {
                    switch (type) {
                        case 'tempat-wisata':
                            return (
                                <PanelItemWisata
                                    key={ index }
                                    data={ item }
                                    domain={ domain }
                                    meta_key_val={ meta_key_val } />
                            )
                            break;
                        case 'bali-hotel':
                            return (
                                <PanelItemHotel
                                    key={ index }
                                    data={ item }
                                    domain={ domain }
                                    meta_key_val={ meta_key_val } />
                            )
                            break;
                        default:
                    }
                })}
            </div>
        )
    }
}

export default PanelRepeater;
