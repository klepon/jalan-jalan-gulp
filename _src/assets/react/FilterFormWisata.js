import React, { Component } from 'react'
import Select from './Select';
import Input from './Input';
import Icon from './Icon';
import Checkbox from './Checkbox';

class FilterFormWisata extends Component {
    render_filter = (filter_params, label_params, title, ucword) => {
        let filter = this.props.filter,
            filter_used = this.props.filter_used,
            onChange = this.props.on_filter_check_change,
            label = label_params,
            render_total = this.render_total,
            label_text,
            make_ucword = ucword

        if( filter[filter_params].length <= 1 ) {
            return null;
        }

        return (
            <div className="filter_group">
                <h4>{ title }</h4>
                {filter[filter_params].map(function( item, index ){
                    label_text = filter_params === 'open_hours' || filter_params === 'closed_hours'
                        ? label + item
                        : label[item];

                    if( make_ucword != undefined ) {
                        label_text = label_text.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                            return letter.toUpperCase();
                        });
                    }

                    return (
                        <div key={ index }>
                            <Checkbox

                                name={ filter_params +"|"+ item }
                                label={ label_text }
                                checked={ (filter_used.indexOf(filter_params +"|"+ item) >= 0) }
                                onChange={ onChange } />
                            { render_total(filter_params +"|"+ item) }
                        </div>
                    )
                })}
            </div>
        )
    }

    render_total = ( param ) => {
        if( param != this.props.filter_action ) {
            return null;
        }

        return (
            <span className="info">{ this.props.total } hasil</span>
        )
    }

    render () {
        // console.log(this.props.filter);
        // console.log(this.props.filter_used);

        let icon = this.props.filter_state === 'open' ? 'icon-close' : 'icon-setting';

        return (
            <div className={"filter "+ this.props.filter_state }>
                <div className="filter-togle" onClick={ () => this.props.toggle_filter() }>
                    <Icon icon={ icon } />
                </div>

                <div className="sort filter-field">
                    { <Select
                        onChange={ this.props.on_select_sort }
                        current={ this.props.sortby }
                        options={[
                            ['', 'Urutkan dengan', true],
                            ['modified', 'Terbaru'],
                            ['name', 'Nama tempat'],
                            ['open_hours', 'Jam Buka'],
                            ['closed_hours', 'Jam Tutup'],
                        ]} /> }
                </div>

                <div className="search filter-field">
                    <Input
                        value={ this.props.keyword }
                        onChange={ this.props.on_keyword_change } />
                    { this.render_total('keyword') }
                </div>

                { this.render_filter('open_day', this.props.meta_key_val.open_day, 'Hari buka') }
                { this.render_filter('open_hours', "buka jam ", 'Jam buka') }
                { this.render_filter('closed_hours', "tutup jam ", 'Jam tutup') }
                { this.render_filter('park_available', this.props.meta_key_val.park_available, 'Ketersedian parkir') }
                { this.render_filter('park_distant', this.props.meta_key_val.park_distant, 'Jarak parkiran', true) }
                { this.render_filter('price_range', this.props.meta_key_val.price_range, 'Range harga/tiket') }
                { this.render_filter('status', this.props.meta_key_val.status, 'Status tempat') }
            </div>
        )
    }
}

export default FilterFormWisata;
