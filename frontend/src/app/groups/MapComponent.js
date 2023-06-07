import React, { useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
  useLoadScript,
} from "react-google-maps";
import GoogleMapAPI from "../../GoogleMapAPI";

function MapComponent({inputRef}) {
  const mapRef = useRef();
  // const inputRef = useRef();
  const searchBoxRef = useRef();
  const markersRef = useRef([]);

  useEffect(() => {
    const bootstrap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.2934204446, lng: 126.97467286 },
        zoom: 13,
        mapTypeId: "roadmap",
      });
      const input = inputRef.current;
      const searchBox = new window.google.maps.places.SearchBox(input);
      searchBoxRef.current = searchBox;

      // map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        markersRef.current.forEach((marker) => {
          marker.setMap(null);
        });

        markersRef.current = [];
        const bounds = new window.google.maps.LatLngBounds();

        places.forEach((place) => {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          markersRef.current.push(
            new window.google.maps.Marker({
              map,
              icon: place.icon,
              title: place.name,
              position: place.geometry.location,
            })
          );

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPI}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => {
        bootstrap();
      });
      document.body.appendChild(script);
    } else {
      bootstrap();
    }
  }, []);

  return (
    <div style={{ width: "650px", height: "300px" }}>
      {/* <input
        ref={inputRef}
        type="text"
        placeholder="Search Box"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `400px`,
          height: `40px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "5",
        }}
      /> */}
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default MapComponent;

/* import React from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";
import GoogleMapAPI from "../../GoogleMapAPI";

class Map extends React.Component {
  searchBoxRef = React.createRef();

  onMapLoad = (map) => {
    this.map = map;
    const input = this.searchBoxRef.current;

    this.searchBox = new window.google.maps.places.SearchBox(input);

    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      this.searchBox.setBounds(map.getBounds());
    });

    this.markers = [];
    this.searchBox.addListener("places_changed", () => {
      const places = this.searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        this.markers.push(
          new window.google.maps.Marker({
            map,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <input
          ref={this.searchBoxRef}
          type="text"
          placeholder="Search Box"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute", // Add this
            top: "10px", // And this
            left: "10px", // And this
            zIndex: "5", // And this
          }}
        />
        <GoogleMap
          ref={this.mapRef}
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          onLoad={this.onMapLoad}
        >
          <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
      </div>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function MapComponent() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GoogleMapAPI}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: "100%" }} />}
        mapElement={<div style={{ height: `100%`, width: "100%" }} />}
      />
    </div>
  );
}

export default MapComponent; */
