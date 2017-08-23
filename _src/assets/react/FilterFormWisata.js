import React, { Component } from 'react'
import Select from './Select';
import Input from './Input';
import Checkbox from './Checkbox';
import Dropdown from './Dropdown';
import Button from './Button';

class FilterFormWisata extends Component {
    render_filter = (filter_params, label_params, title) => {
        let filter = this.props.filter,
            filter_used = this.props.filter_used,
            onChange = this.props.on_filter_check_change,
            label = label_params,
            render_total = this.render_total,
            label_text

        if( filter[filter_params].length <= 1 ) {
            return null;
        }

        return (
            <div className="filter_group">
                <h5>{ title }</h5>
                {filter[filter_params].map(function( item, index ){
                    label_text = filter_params === 'open_hours' || filter_params === 'closed_hours'
                        ? label + item
                        : label[item];

                    return (
                        <Checkbox
                            key={ index }
                            name={ filter_params +"|"+ item }
                            label={ label_text }
                            info_label={ render_total(filter_params +"|"+ item) }
                            checked={ (filter_used.indexOf(filter_params +"|"+ item) >= 0) }
                            onChange={ onChange } />
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
                <p>{ this.props.total } tempat wisata</p>
                <div className="row row_filter">
                    <Dropdown
                        name="open_day_hour"
                        title="Operasional"
                        toggle_dropdown={ this.props.toggle_dropdown }
                        dropdown={ this.props.dropdown } >

                        { this.render_filter('open_day', this.props.meta_key_val.open_day, "Hari buka") }
                        { this.render_filter('open_hours', "buka jam ", "Jam buka") }
                        { this.render_filter('closed_hours', "tutup jam ", "Jam tutup") }
                    </Dropdown>

                    <Dropdown
                        name="parkiran"
                        title="Parkiran"
                        toggle_dropdown={ this.props.toggle_dropdown }
                        dropdown={ this.props.dropdown } >
                        { this.render_filter('park_available', this.props.meta_key_val.park_available, "Tempat parkir") }
                        { this.render_filter('park_distant', this.props.meta_key_val.park_distant, 'Jarak parkiran') }
                    </Dropdown>

                    <Dropdown
                        name="price_range"
                        title="Range harga"
                        toggle_dropdown={ this.props.toggle_dropdown }
                        dropdown={ this.props.dropdown } >
                        { this.render_filter('price_range', this.props.meta_key_val.price_range, 'Range harga/tiket') }
                    </Dropdown>

                    <Dropdown
                        name="status"
                        title="Status"
                        toggle_dropdown={ this.props.toggle_dropdown }
                        dropdown={ this.props.dropdown } >
                        { this.render_filter('status', this.props.meta_key_val.status, 'Status tempat') }
                    </Dropdown>
                </div>

                <div className="row row_sort">
                    <div className="search filter-field">
                        <Input
                            placeholder="cari tempat wisata"
                            value={ this.props.keyword }
                            onChange={ this.props.on_keyword_change } />
                        { this.render_total('keyword') }
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

                    <div className="view_type filter-field">
                        <Button
                            key={0}
                            onClick={ this.props.toggle_view }
                            value='list'
                            current={ this.props.view_type }
                            title="List"
                        />
                        <Button
                            key={1}
                            onClick={ this.props.toggle_view }
                            value='map'
                            current={ this.props.view_type }
                            title="Peta"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterFormWisata;
