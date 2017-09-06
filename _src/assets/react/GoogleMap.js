import React, { Component } from 'react'

class GoogleMap extends Component {
    render_map = () => {
        let latlng = [this.props.map_state[1], this.props.map_state[2]],
        bounds = new google.maps.LatLngBounds(),
        mapLabel,
        marker_clusterer,
        set_map_state = this.set_map_state,
        domain = this.props.domain,
        limit_zoom = this.limit_zoom

        window.map = new google.maps.Map(document.getElementById('gmap'), {
            center: { lat: latlng[0] * 1, lng: latlng[1] * 1 },
            zoom: this.props.map_state[3],
            scrollwheel: false,
        })

        window.markers = [];

        this.props.data.map(function(item) {
            // marker
            latlng = item.filter.lat_long.split(',');
            let marker = new google.maps.Marker({
                icon: domain +"/wp-content/themes/jalan-jalan/images/marker.png",
                position: new google.maps.LatLng(latlng[0] * 1, latlng[1] * 1),
                title: item.title,
                id: item.id
            });

            // marker listerner show infowindow
            marker.addListener('click', function() {
                set_map_state(marker.id, map.getZoom());
            });

            // create and add label to marker for further use in clusterer
            mapLabel = new MapLabel({
                text: item.title,
                fontSize: 15,
                position: marker.position,
                align: 'center'
            });
            marker.label = mapLabel;

            // collect marker
            window.markers.push(marker);

            // update bound
            bounds.extend({ lat: latlng[0] * 1, lng: latlng[1] * 1 });
        });

        map.fitBounds(bounds);

        // init clusterer
        window.mc = new MarkerClusterer(window.map, window.markers, {
            averageCenter: true,
            styles: [{
                url: this.props.domain +'/wp-content/themes/jalan-jalan/images/cluster-1.png',
                height: 40,
                width: 35,
                textColor: '#1b046f',
                textSize: 16
              }, {
                url: this.props.domain +'/wp-content/themes/jalan-jalan/images/cluster-2.png',
                height: 50,
                width: 45,
                textColor: '#1b046f',
                textSize: 20
              }, {
                url: this.props.domain +'/wp-content/themes/jalan-jalan/images/cluster-3.png',
                height: 60,
                width: 55,
                textColor: '#1b046f',
                textSize: 22
              }]
        });

        // end clustering
        google.maps.event.addListener(window.mc, "clusteringend", function (c) {
            var m = c.getMarkers();
            for (var i = 0; i < m.length; i++ ){
                m[i].label.bindTo('map', m[i]);
            }
        });

        // Listen for the dragend event
        var strictBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-8.943243114359708, 114.38373836250378),
            new google.maps.LatLng(-8.011469151843922, 115.74878963203503)
        );

        google.maps.event.addListener(map, 'dragend', function() {
            if (strictBounds.contains(map.getCenter())) return;

            // We're out of bounds - Move the map back within the bounds

            var c = map.getCenter(),
            x = c.lng(),
            y = c.lat(),

            maxX = strictBounds.getNorthEast().lng(),
            maxY = strictBounds.getNorthEast().lat(),
            minX = strictBounds.getSouthWest().lng(),
            minY = strictBounds.getSouthWest().lat();

            if (x < minX) x = minX;
            if (x > maxX) x = maxX;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            map.setCenter(new google.maps.LatLng(y, x));
        });

        // Limit the zoom level
        google.maps.event.addListener(map, 'zoom_changed', function() {
            limit_zoom();
        });

        limit_zoom();

        // console.log(this.props.data);
    }

    open_detail = (item) => {
        switch ( this.props.type ) {
            case 'tempat-wisata':
                return "<span>"+
                    this.props.meta_key_val.open_day[item.filter.day_open] +" "+
                    item.filter.open_hours +" - "+
                    item.filter.closed_hours +
                    "</span>";
                break;
            case 'bali-hotel':
                return "<span>Check in - Out: "+
                    item.filter.open_hours +" - "+
                    item.filter.closed_hours +
                    "</span>"
                break;
        }

        return null;
    }

    get_price = (item) => {
        switch ( this.props.type ) {
            case 'tempat-wisata':
                return "<span>Tiket \u00b1 "+
                    this.props.meta_key_val.price_range[item.filter.price_range] +
                    "</span>";
                break;
            case 'bali-hotel':
                return "<span>Kamar \u00b1 "+
                    this.props.meta_key_val.hotel_price_range[item.filter.price_range] +
                    "</span>"
                break;
        }

        return null;
    }

    infowindow_content = () => {
        // console.log(item);
        let i, item = null;

        for( i in this.props.data ) {
            if( this.props.data[i].id === this.props.map_state[0] ) {
                item = this.props.data[i];
            }
        }

        if( item === null ) {
            return "Ups..<br />Data tidak ditemukan.";
        }

        return '<div class="info-window-container">'+
            '<a class="preview" href="'+ this.props.domain +'/'+ this.props.type +'/'+ item.slug +'">'+
                '<img src="'+ this.props.domain +'/wp-content/uploads/'+ item.thumb +'" />'+
            '</a>'+
            '<h5>'+
                '<a href="'+ this.props.domain +'/'+ this.props.type +'/'+ item.slug +'">'+
                    item.title+
                '</a>'+
            '</h5>'+
            '<p>'+
                this.open_detail(item) +
                '<br />'+ this.get_price(item) +
                '<br /><br />'+ item.excerpt+
                ' &middot; <a href="'+ this.props.domain +'/'+ this.props.type +'/'+ item.slug +'">lihat detail</a> &raquo;'+
            '</p>'+
        '</div>';
    }

    limit_zoom = () => {
        if (map.getZoom() < 9 && jQuery(window).width() <= 768 ) {
            map.setZoom(9);
        }

        if (map.getZoom() < 10 && jQuery(window).width() > 768 ) {
            map.setZoom(10);
        }
    }

    set_map_state = (id, zoom) => {
        this.props.set_map_state(
            id,
            this.props.map_state[1],
            this.props.map_state[2],
            zoom,
            true
        )
    }

    show_list_item = (id) => {
        let list_con = jQuery('.map-list-container');
        list_con.scrollTo(list_con.find('.list-'+ id).offset().top - list_con.find('.list-'+ id).offsetParent().offset().top + list_con.scrollTop());
    }

    componentWillMount = () => {
        window.markers = [];
        window.map;
        window.mc;
        window.iw = new google.maps.InfoWindow();
    }

    componentDidUpdate(prevProps, prevState) {
        if( prevProps.data.length != this.props.data.length ) {
            this.render_map();
        }

        // console.log(this.props.map_state);

        if( prevProps.map_state != this.props.map_state ) {

            if( this.props.map_state[0] !== null ) {
                var i;
                for( i in window.markers ) {
                    if( window.markers[i].id === this.props.map_state[0] ) {

                        window.map.setZoom(this.props.map_state[3]);
                        window.map.panTo(window.markers[i].position);

                        window.iw.close();
                        window.iw = new google.maps.InfoWindow();
                        window.iw.setContent(this.infowindow_content());
                        window.iw.open(window.map, window.markers[i]);

                        if( this.props.map_state[4] ) {
                            this.show_list_item(this.props.map_state[0])
                        }
                    }
                }
            }
        }
    }

    componentDidMount = () => {
        this.render_map();
    }

    render () {
        return (
            <div className="google_map_react" id="gmap">
                Memuat peta Google...
            </div>
        )
    }
}

export default GoogleMap;
