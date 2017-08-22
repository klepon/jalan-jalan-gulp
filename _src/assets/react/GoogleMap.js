import React, { Component } from 'react'

class GoogleMap extends Component {
    render_map = () => {
        let latlng = [this.props.map_state[1], this.props.map_state[2]],
        bounds = new google.maps.LatLngBounds(),
        infowindow_content = this.infowindow_content,
        mapLabel,
        marker_clusterer

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
                icon: "https://goo.gl/jC6pF4",
                position: new google.maps.LatLng(latlng[0] * 1, latlng[1] * 1),
                title: item.title,
                id: item.id
            });

            // marker listerner show infowindow
            marker.addListener('click', function() {
                window.iw.setContent(infowindow_content(item));
                window.iw.open(window.map, marker);
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
            map.fitBounds(bounds);
        });

        window.mc = new MarkerClusterer(window.map, window.markers, {
            averageCenter: true,
            styles: [{
                url: 'https://goo.gl/LXGz5c',
                height: 40,
                width: 35,
                textColor: '#1b046f',
                textSize: 16
              }, {
                url: 'https://goo.gl/bZiwQa',
                height: 50,
                width: 45,
                textColor: '#1b046f',
                textSize: 20
              }, {
                url: 'https://goo.gl/69DM5d',
                height: 60,
                width: 55,
                textColor: '#1b046f',
                textSize: 22
              }]
        });

        google.maps.event.addListener(window.mc, "clusteringend", function (c) {
            var m = c.getMarkers();
            for (var i = 0; i < m.length; i++ ){
                m[i].label.bindTo('map', m[i]);
            }
        });

        // console.log(this.props.data);
    }

    infowindow_content = (item) => {
        let infowindow = '<div class="info-window-container">'+
            '<a class="preview" href="'+ this.props.domain +'/tempat-wisata/'+ item.slug +'">'+
                '<img src="'+ this.props.domain +'/wp-content/uploads/'+ item.thumb +'" />'+
            '</a>'+
            '<h5>'+
                '<a href="'+ this.props.domain +'/tempat-wisata/'+ item.slug +'">'+
                    item.title+
                '</a>'+
            '</h5>'+
            '<p>'+
                item.excerpt
            '</p>'+
        '</div>';

        return infowindow;
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
                        window.iw.setContent(this.infowindow_content(this.props.data[i]));
                        window.iw.open(window.map, window.markers[i]);
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
