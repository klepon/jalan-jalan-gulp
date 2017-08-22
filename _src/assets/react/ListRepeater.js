import React, { Component } from 'react';
import ListItemWisata from './ListItemWisata';
import ListItemHotel from './ListItemHotel';

class PanelRepeater extends Component {
    render () {
        let type = this.props.type,
            domain = this.props.domain,
            end = this.props.page * this.props.per_page,
            start = this.props.page * this.props.per_page - this.props.per_page,
            meta_key_val = this.props.meta_key_val,
            map_state = this.props.map_state,
            set_map_state = this.props.set_map_state;

        // console.log( meta_key_val );

        if( start > this.props.data.length ) {
            return (
                <p>Tidak ditemukan tempat wisata</p>
            )
        }

        return (
            <div className="map-list-container">
                {this.props.data.map(function(item, index) {
                    switch (type) {
                        case 'tempat-wisata':
                            return (
                                <ListItemWisata
                                    key={ index }
                                    data={ item }
                                    domain={ domain }
                                    meta_key_val={ meta_key_val }
                                    map_state={ map_state }
                                    set_map_state={ set_map_state } />
                            )
                            break;
                        case 'bali-hotel':
                            return (
                                <ListItemHotel
                                    key={ index }
                                    data={ item }
                                    domain={ domain }
                                    meta_key_val={ meta_key_val }
                                    map_state={ map_state }
                                    set_map_state={ set_map_state } />
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
