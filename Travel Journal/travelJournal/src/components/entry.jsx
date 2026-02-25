import React from "react";
import './entry.css'

function Entry(props){
     return( 
        <div className="travel-journal">
            <article className="img-container">
                <img src={props.imgsrc}
                     alt="pangong Lake"
                />
            </article>

            <div className="info-container">
                <div className="marker-name-link">
                    <img className="marker-img"
                         src="../marker.png"
                         alt="map-marker-icon">

                    </img>
                    <div className="location-info">
                       <span className="country-name-j">{props.countryName}</span>   
                    </div>
                    <a href= {props.Gmaplink}>
                       View on Google Maps
                    </a>
                </div>
                <h2 className="place-name">{props.placename}</h2> 
                <p className="trip-dates">12 Jan, 2021 - 24 Jan, 2021</p>

                <p className="place-info">{props.placeinfo} 
                 </p>
            </div>
    
        </div>
    )
} 
export default Entry