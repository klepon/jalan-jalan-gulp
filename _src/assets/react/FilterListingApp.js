import React, { Component } from 'react';
import PanelRepeater from './PanelRepeater';
import Pagination from './Pagination';
import FilterFormWisata from './FilterFormWisata';

class FilterListing extends Component {
    get_meta_key_val = () => {
        return {
            park_dist: {
           'jauh': "jauh",
           'dekat': "dekat",
           'sedang': "agak jauh"
            },

            park_ava: {
               'susah-parkir': "Susah parkir",
               'susah-mobil': "Mobil susah parkir",
               'bisa-mobil': "Parkir mobil ada",
               'bisa-bis': "Bis bisa parkir"
            },

            price_range: {
               'free': 'Gratis',
               '5000': '< Rp 5.000',
               '10000': 'Rp 6.000 - Rp 10.000',
               '20000': 'Rp 11.000 - Rp 20.000',
               '30000': 'Rp 21.000 - Rp 30.000',
               '40000': 'Rp 31.000 - Rp 40.000',
               '50000': 'Rp 41.000 - Rp 50.000',
               '75000': 'Rp 51.000 - Rp 75.000',
               '100000': 'Rp 76.000 - Rp 100.000',
               '150000': 'Rp 101.000 - Rp 150.000',
               '200000': 'Rp 151.000 - Rp 200.000',
               '300000': 'Rp 201.000 - Rp 300.000',
               '500000': 'Rp 301.000 - Rp 500.000',
               '1000000': 'Rp 501.000 - Rp 1.000.000',
               'berjuta': '> Rp 1.001.000',
            },

            status: {
               'hit': "Ngehit",
               'free': "Indie",
               'new': "Tempat baru"
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            filter: [],
            sortby: "",
            keyword: "",
            filter_used: []
        }

        this.on_select_page = this.on_select_page.bind(this);
        this.on_select_sort = this.on_select_sort.bind(this);
        this.on_keyword_change = this.on_keyword_change.bind(this);
        this.on_filter_check_change = this.on_filter_check_change.bind(this);
    }

    componentWillMount = () => {
        switch (this.props.type) {
            case 'tempat-wisata':
                this.collect_filter_wisata();
                break;
        }
    }

    on_select_page = (new_page) => {
        this.setState({
            page: new_page
        });
    }

    on_select_sort = (e) => {
        this.setState({
            sortby: e.target.value
        })
    }

    on_keyword_change = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    on_filter_check_change = (e) => {
        let filter_used = this.state.filter_used;

        if( this.state.filter_used.indexOf( e.target.name ) < 0 ) {
            filter_used.push(e.target.name);
        } else {
            filter_used.splice(this.state.filter_used.indexOf( e.target.name ));
        }

        this.setState({
            filter_used: filter_used
        })
    }

    render_filter = () => {
        switch (this.props.type) {
            case 'tempat-wisata':
                return (
                    <FilterFormWisata
                        filter={ this.state.filter }
                        filter_used={ this.state.filter_used }
                        sortby={ this.state.sortby }
                        keyword={ this.state.keyword }
                        on_select_sort={ this.on_select_sort }
                        on_keyword_change={ this.on_keyword_change }
                        on_filter_check_change={ this.on_filter_check_change }
                        meta_key_val={ this.get_meta_key_val() } />
                )
                break;
        }
    }

    render () {
        let per_page = 5,
            paging_number = 3,
            items = this.get_data();

        console.log(items);

        return (
            <div>
                { this.render_filter() }

                <PanelRepeater
                    page={this.state.page}
                    per_page={per_page}
                    data={ items }
                    domain={ this.props.domain }
                    type={ this.props.type }
                    meta_key_val={ this.get_meta_key_val() } />

                <Pagination
                    page={ this.state.page }
                    paging_number={ paging_number }
                    per_page={ per_page }
                    total={ items.length }
                    on_select_page={ this.on_select_page } />
            </div>
        )
    }

    get_data = () => {
        let i,
            n = this.props.data.length,
            rs = [],
            keyword = this.state.keyword.toLowerCase();

        // loop data
        for( i = 0; i < n; i++ ) {
            if( keyword !== "" ) {
                if(
                    this.props.data[i].title.toLowerCase().indexOf(keyword) >= 0 || this.props.data[i].excerpt.toLowerCase().indexOf(keyword) >= 0
                ) {
                    // filter
                    rs = this.filter_data(this.props.data[i], rs);
                }
            } else {
                // filter
                rs = this.filter_data(this.props.data[i], rs);
            }
        }

        return this.sort_data(rs);
    }

    sort_data = (data) => {
        switch (this.state.sortby) {
            case 'name':
                data.sort(function(a, b){
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title)
                        return 1;
                    return 0;
                });
                break;
            case 'open_hours':
            case 'closed_hours':
            let sortby = this.state.sortby;
                data.sort(function(a, b){
                    return new Date('1970/01/01 ' + a.filter[sortby]) - new Date('1970/01/01 ' + b.filter[sortby]);
                });
                break;
        }

        return data;
    }

    filter_data = ( item, rs ) => {
        // no filter active
        if( this.state.filter_used.length < 1 ) {
            rs.push(item);
        }

        // filter ist here, buat function sesuai filter masing2 aja
        // if( this.state.filter_used.open_day )

        return rs;
    }

    collect_filter_wisata = () => {
        let open_day = [],
            open_hour = [],
            closed_hours = [],
            park = [],
            park_dist = [],
            price_range = [],
            status = [];

        this.props.data.map(function(item){
            if( open_day.indexOf(item.filter.day_open) < 0 ) {
                open_day.push(item.filter.day_open);
            }

            if( open_hour.indexOf(item.filter.open_hours) < 0 ) {
                open_hour.push(item.filter.open_hours);
            }

            if( closed_hours.indexOf(item.filter.closed_hours) < 0 ) {
                closed_hours.push(item.filter.closed_hours);
            }

            if( park.indexOf(item.filter.park_available) < 0 ) {
                park.push(item.filter.park_available);
            }

            if( park_dist.indexOf(item.filter.park_distant) < 0 ) {
                park_dist.push(item.filter.park_distant);
            }

            if( price_range.indexOf(item.filter.price_range) < 0 ) {
                price_range.push(item.filter.price_range);
            }

            if( status.indexOf(item.filter.status) < 0 ) {
                status.push(item.filter.day_open);
            }
        });

        this.setState({
            filter: {
                'open_day': open_day,
                'open_hour': open_hour,
                'park': park,
                'park_dist': park_dist,
                'price_range': price_range,
                'status': status
            }
        })
    }
}

export default FilterListing;
