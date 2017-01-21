import React from 'react';
import Tours from './Tours';

const ToursList = ({tours}) => {

    // map data to components
    const toursList = tours.map(
        (tours, index)=>(
            <Tours
                name={tours.name}
                price={tours.price}
                address_street = {tours.address_street}
                styleIndex = {index}
                key={index}
            />
        )
    );

    return (
        <div>
            {toursList}
        </div> );
};

export default ToursList;
