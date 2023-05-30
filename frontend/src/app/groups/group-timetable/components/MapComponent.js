import React, { useEffect, useRef } from "react";
import { Map, SearchBox } from "google-maps-react";

const containerStyle = {
  width: "100%",
  height: "50vh",
};

const center = {
  lat: 37.2934204446,
  lng: 126.97467286,
};

function MapComponent() {
  const mapRef = useRef(null);
  const handleOnLoad = (mapProps, map) => {
    const { google } = mapProps;
    const searchBox = new google.maps.places.SearchBox(
      document.getElementById("search-box-input")
    );
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const val_lat = place.geometry.location.lat();
        const val_lng = place.geometry.location.lng();
        const val_name = place.name;
        console.log(val_lat);
        console.log(val_lng);
        console.log(val_name);
        document.getElementById("print_place").innerHTML = val_name;
        document.pac.place.value = val_name;
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        const marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
        });
        bounds.extend(place.geometry.location);
      });
      map.fitBounds(bounds);
    });
  };

  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCS2a7trf0hsGHMwMH9Ihi9XwO5MAPYN-8&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up the script tag
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Map
        google={window.google}
        style={containerStyle}
        initialCenter={center}
        zoom={15}
        onReady={(mapProps, map) => {
          mapRef.current = map;
          handleOnLoad(mapProps, map);
        }}
      >
        <SearchBox
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          placeholder="Search Box"
          id="search-box-input"
        />
      </Map>
    </div>
  );
}

export default MapComponent;
