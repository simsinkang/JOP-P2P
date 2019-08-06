import React from 'react';
import GoogleMapReact from 'google-map-react';
import Location from './Location.png'
import '../Detail.css'
 
const AnyReactComponent = ({ text }) => <div style={Im} className="ingeun2">{text}</div>;


function GoogleMap(){
    return (
    <div>
      <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key:"AIzaSyCX4elAhSF-1mAFON3hiV0JrhMmIxLugz4"}}
        defaultCenter={{lat:37.5172363,lng:127.04732481}}
        defaultZoom={18}
      >
        <AnyReactComponent 
          lat={37.5172363}
          lng={127.04732481}
          text=""
        />
      </GoogleMapReact>
    </div>
    </div>
    )
}
const Im ={
  backgroundImage: `url(${Location})`,
  backgroundSize:`100% 100%`,
  backgroundRepeat :`no-repeat` 
}
 
export default GoogleMap;