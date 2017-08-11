import React, { Component } from 'react'
import Select from './Select';
import Input from './Input';
import Checkbox from './Checkbox';

class FilterFormWisata extends Component {
    render () {
        console.log(this.props.filter);
        console.log(this.props.filter_used);

        let filter_used = this.props.filter_used,
            onChange = this.props.on_filter_check_change,
            meta_key_val = this.props.meta_key_val

        return (
            <div className="filter">
                <div className="search">
                    <Input
                        value={ this.props.keyword }
                        onChange={ this.props.on_keyword_change } />
                </div>

                <div className="meta">
                    <div className="filter_group">
                        {this.props.filter.open_day.map(function( item, index ){
                            return (
                                <Checkbox
                                    key={ index }
                                    name={ item }
                                    label={ meta_key_val[item] }
                                    checked={ (filter_used.indexOf(item) >= 0) }
                                    onChange={ onChange } />
                            )
                        })}
                    </div>
                    <div className="filter_group">
                        {this.props.filter.open_hour.map(function( item, index ){
                            return (
                                <Checkbox
                                    key={ index }
                                    name={ item }
                                    label={ meta_key_val[item] }
                                    checked={ (filter_used.indexOf(item) >= 0) }
                                    onChange={ onChange } />
                            )
                        })}
                    </div>
                </div>

                <div className="sort">
                    { <Select
                        onChange={ this.props.on_select_sort }
                        current={ this.props.sortby }
                        options={[
                            ['', 'Urutkan dengan', true],
                            ['name', 'Nama tempat'],
                            ['open_hours', 'Jam Buka'],
                            ['closed_hours', 'Jam Tutup'],
                        ]} /> }
                </div>
            </div>
        )
    }
}

export default FilterFormWisata;
