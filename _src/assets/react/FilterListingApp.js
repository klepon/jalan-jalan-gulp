import React, { Component } from 'react';
import PanelRepeater from './PanelRepeater';
import ListRepeater from './ListRepeater';
import GoogleMap from './GoogleMap';
import Pagination from './Pagination';
import FilterFormWisata from './FilterFormWisata';
import FilterFormHotel from './FilterFormHotel';

class FilterListing extends Component {
    get_meta_key_val = () => {
        return {
            dinamyc_filter: this.state.dinamyc_filter,

            open_day: {
                'n-a': 'Jam buka',
                'setiap-hari': "Buka setiap hari",
        		'libur-tutup': "Tutup pada hari libur"
            },

            park_distant: {
                'n-a': 'jarak ?',
                'jauh': "jauh",
                'dekat': "dekat",
                'sedang': "agak jauh"
            },

            park_available: {
                'n-a': 'Parkir ?',
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
            },

            star: {
                'n-a': '-',
                '1': 'Bintang 1',
                '2': 'Bintang 2',
                '3': 'Bintang 3',
                '4': 'Bintang 4',
                '5': 'Bintang 5'
            },

            hotel_price_range: {
              'na': 'N/A',
              '1': '< Rp 100.000',
              '5': 'Rp 101.000 - Rp 500.000',
              '10': 'Rp 501.000 - Rp 1.000.000',
              '20': 'Rp 1.001.000 - Rp 2.000.000',
              '500': 'Rp 2.001.000 - Rp 5.000.000',
              '2000': 'Rp 5.001.000 - Rp 20.000.000',
              'berjuta': ' > Rp 20.001.000'
            }
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            view_type: "map", // list|map
            view_filter: false,
            filter: [],
            sortby: "",
            keyword: "",
            filter_state: "",
            filter_used: [],
            filter_action: "",
            dropdown: {},
            dinamyc_filter: {},
            map_state: [null, -8.658719535191599, 115.2183950000001, 17, false]
        }

        this.on_select_page = this.on_select_page.bind(this);
        this.on_select_sort = this.on_select_sort.bind(this);
        this.on_keyword_change = this.on_keyword_change.bind(this);
        this.on_filter_check_change = this.on_filter_check_change.bind(this);
        this.set_map_state = this.set_map_state.bind(this);
        this.toggle_filter = this.toggle_filter.bind(this);
        this.toggle_view = this.toggle_view.bind(this);
        this.show_filter = this.show_filter.bind(this);
    }

    componentWillMount = () => {
        switch (this.props.type) {
            case 'tempat-wisata':
                this.collect_filter_wisata();
                break;
            case 'bali-hotel':
                this.collect_filter_hotel();
                break;
        }
    }

    reset_page = () => {
        this.setState( (state, props) => {
            return { page: 1 }
        });
    }

    reset_filter = () => {
        this.setState({
            filter_used: [],
            filter_action: ""
        });
    }

    on_select_page = (new_page) => {
        jQuery('html, body').animate({
            scrollTop: jQuery(".list-container").offset().top - 70
        }, 400);

        this.setState( (state, props) => {
            return { page: new_page }
        });
    }

    on_select_sort = (e) => {
        this.setState({
            sortby: e.target.value
        });
    }

    on_keyword_change = (e) => {
        this.setState({
            keyword: e.target.value,
            filter_action: "keyword"
        })
    }

    on_filter_check_change = (e) => {
        let filter_used = this.state.filter_used;

        if( this.state.filter_used.indexOf( e.target.name ) < 0 ) {
            filter_used.push(e.target.name);
        } else {
            filter_used.splice(this.state.filter_used.indexOf( e.target.name ), 1);
        }

        this.setState({
            filter_used: filter_used,
            filter_action: e.target.name
        })
    }

    set_map_state = (infowindow_id, center_lat, center_lng, zoom, show_item_list) => {
        if( ! show_item_list ) {
            if( jQuery(window).width() <= 768 ) {
                jQuery('html, body').animate({
                    scrollTop: jQuery(".map-container").offset().top
                }, 400);
            }
        }

        this.setState({
            map_state: [infowindow_id, center_lat, center_lng, zoom, show_item_list]
        })
    }

    toggle_dropdown = (name) => {
        let dropdown = this.state.dropdown;

        if( typeof( dropdown[name] ) === "undefined" ) {
            dropdown = {}
            dropdown[name] = true;
        } else {
            dropdown = {}
        }

        // dropdown[name] = dropdown[name] === "" ? "expanse" : "";

        this.setState({
            dropdown: dropdown
        })
    }

    toggle_filter = () => {
        this.setState({
            filter_state: this.state.filter_state === "open" ? "" : "open"
        })
    }

    toggle_view = (type) => {
        this.setState({
            view_type: type
        })
    }

    show_filter = () => {
        this.setState({
            view_filter: this.state.view_filter === false
        });
    }

    render_filter = (total) => {
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
                        meta_key_val={ this.get_meta_key_val() }
                        toggle_filter={ this.toggle_filter }
                        filter_state={ this.state.filter_state }
                        total={ total }
                        filter_action={ this.state.filter_action }
                        toggle_dropdown={ this.toggle_dropdown }
                        toggle_view={ this.toggle_view }
                        view_type= { this.state.view_type }
                        dropdown={ this.state.dropdown }
                        reset_filter={ this.reset_filter }
                        show_filter={ this.show_filter }
                        view_filter={ this.state.view_filter } />
                )
                break;
            case 'bali-hotel':
                return (
                    <FilterFormHotel
                        filter={ this.state.filter }
                        filter_used={ this.state.filter_used }
                        sortby={ this.state.sortby }
                        keyword={ this.state.keyword }
                        on_select_sort={ this.on_select_sort }
                        on_keyword_change={ this.on_keyword_change }
                        on_filter_check_change={ this.on_filter_check_change }
                        meta_key_val={ this.get_meta_key_val() }
                        toggle_filter={ this.toggle_filter }
                        filter_state={ this.state.filter_state }
                        total={ total }
                        filter_action={ this.state.filter_action }
                        toggle_dropdown={ this.toggle_dropdown }
                        view_type= { this.state.view_type }
                        toggle_view={ this.toggle_view }
                        dropdown={ this.state.dropdown }
                        reset_filter={ this.reset_filter }
                        show_filter={ this.show_filter }
                        view_filter={ this.state.view_filter } />
                )
                break;
        }
    }

    render_result = (items) => {
        let per_page = 12,
            paging_number = 3;

        if( this.state.view_type === 'list' ) {
            return (
                <div className="list-container">
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
                        on_select_page={ this.on_select_page }
                        reset_page={ this.reset_page } />
                </div>
            )
        } else {
            return (
                <div className="map-container">
                    <GoogleMap
                        data={ items }
                        domain={ this.props.domain }
                        type={ this.props.type }
                        map_state={ this.state.map_state }
                        set_map_state={ this.set_map_state } />

                    <ListRepeater
                        data={ items }
                        domain={ this.props.domain }
                        type={ this.props.type }
                        meta_key_val={ this.get_meta_key_val() }
                        map_state={ this.state.map_state }
                        set_map_state={ this.set_map_state } />
                </div>
            )
        }
    }

    render () {
        let items = this.get_data();

        // console.log(items);

        return (
            <div>
                { this.render_filter(items.length) }

                { this.render_result(items) }
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
        let sortby;

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
            case 'modified':
                data.sort(function(a, b){
                    return new Date(b.modified) - new Date(a.modified);
                });
                break;
            case 'open_hours':
            case 'closed_hours':
                sortby = this.state.sortby;
                data.sort(function(a, b){
                    return new Date('1970/01/01 ' + a.filter[sortby]) - new Date('1970/01/01 ' + b.filter[sortby]);
                });
                break;
            case 'price_range':
            case 'star':
                sortby = this.state.sortby;
                data.sort(function(a, b){
                    return a.filter[sortby] - b.filter[sortby];
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

        // filter here, buat function sesuai filter masing2 aja
        let i, n = this.state.filter_used.length, filters, filter_name;

        for( i = 0; i < n; i++ ) {
            filters = this.state.filter_used[i].split("|");

            if( filters[0] === 'status' ) {
                if( typeof(item.filter[filters[0]]) !== "undefined" ) {
                    if( item.filter[filters[0]].indexOf(filters[1]) >= 0 ) {
                        rs.push(item);
                        break;
                    }
                }
            } else if (filters[0] === 'area' || filters[0] === 'location') {
                if( typeof(item.taxo[filters[1]]) !== "undefined" ) {
                    rs.push(item);
                    break;
                }
            } else {
                filter_name = filters[0] === 'open_day' ? 'day_open' : filters[0];
                if( item.filter[filter_name] === filters[1] ) {
                    rs.push(item);
                    break;
                }
            }
        }

        return rs;
    }

    collect_filter_wisata = () => {
        let open_day = [],
            open_hours = [],
            closed_hours = [],
            park_available = [],
            park_distant = [],
            price_range = [],
            status = [];

        this.props.data.map(function(item){
            if( open_day.indexOf(item.filter.day_open) < 0 ) {
                if( item.filter.day_open != 'n-a') {
                    open_day.push(item.filter.day_open);
                }
            }

            if( open_hours.indexOf(item.filter.open_hours) < 0 ) {
                open_hours.push(item.filter.open_hours);
            }

            if( closed_hours.indexOf(item.filter.closed_hours) < 0 ) {
                closed_hours.push(item.filter.closed_hours);
            }

            if( park_available.indexOf(item.filter.park_available) < 0 ) {
                if( item.filter.park_available != 'n-a') {
                    park_available.push(item.filter.park_available);
                }
            }

            if( park_distant.indexOf(item.filter.park_distant) < 0 ) {
                if( item.filter.park_distant != 'n-a') {
                    park_distant.push(item.filter.park_distant);
                }
            }

            if( price_range.indexOf(item.filter.price_range) < 0 ) {
                price_range.push(item.filter.price_range);
            }

            if( item.filter.status ) {
                item.filter.status.map(function(status_item){
                    if( status.indexOf(status_item) < 0 ) {
                        if( status_item != 'na') {
                            status.push(status_item);
                        }
                    }
                })
            }

        });

        this.setState({
            filter: {
                'open_day': open_day,
                'open_hours': open_hours.sort(function(a, b){
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                }),
                'closed_hours': closed_hours.sort(function(a, b){
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                }),
                'park_available': park_available,
                'park_distant': park_distant,
                'price_range': price_range.sort(function(a, b){
                    if( a === "free" || b === "free") {
                        return -999999999999;
                    }

                    return a - b;
                }),
                'status': status
            }
        });
    }

    collect_filter_hotel = () => {
        let open_hours = [],
            closed_hours = [],
            price_range = [],
            star = [],
            area = [],
            location = [],
            area_text = {},
            location_text = {};

        this.props.data.map(function(item){

            if( open_hours.indexOf(item.filter.open_hours) < 0 ) {
                open_hours.push(item.filter.open_hours);
            }

            if( closed_hours.indexOf(item.filter.closed_hours) < 0 ) {
                closed_hours.push(item.filter.closed_hours);
            }

            if( price_range.indexOf(item.filter.price_range) < 0 ) {
                price_range.push(item.filter.price_range);
            }

            if( star.indexOf(item.filter.star) < 0 ) {
                star.push(item.filter.star);
            }

            for (var key in item.taxo) {
                if (item.taxo.hasOwnProperty(key)) {
                    if( key.split('/')[0] === 'hotel-bali' ) {
                        if( area.indexOf(key) < 0 ) {
                            area.push(key);
                            area_text[key] = item.taxo[key];
                        }
                    }
                }
            }

            for (var key in item.taxo) {
                if (item.taxo.hasOwnProperty(key)) {
                    if( key.split('/')[0] === 'hotel-bali-lokasi' ) {
                        if( location.indexOf(key) < 0 ) {
                            location.push(key);
                            location_text[key] = item.taxo[key];
                        }
                    }
                }
            }
        });

        this.setState({
            dinamyc_filter: {
                'area': area_text,
                'location': location_text
            },

            filter: {
                'open_hours': open_hours.sort(function(a, b){
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                }),
                'closed_hours': closed_hours.sort(function(a, b){
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                }),
                'price_range': price_range.sort(function(a, b){
                    if( a === "free" || b === "free") {
                        return -999999999999;
                    }

                    return a - b;
                }),
                'star': star.sort(function(a, b){
                    return a - b;
                }),
                'area': area.sort(function(a, b){
                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                }),
                'location': location.sort(function(a, b){
                    if (a < b)
                        return -1;
                    if (a > b)
                        return 1;
                    return 0;
                })
            }
        });
    }

    get_taxo_by_name = (name, item) => {
        let rs = [];

        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                if( key.split('/')[0] === name ) {
                    rs.push([key, item[key]])
                }
            }
        }

        return rs;
    }
}

export default FilterListing;
