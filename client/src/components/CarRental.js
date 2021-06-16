import React from 'react';

export default class CarRental extends React.Component {
  render() {
    return (
      <div className="container">
        <p className="subTitle">Car Rental</p>
        <p>Car Rental Service is offered exclusively at affordable rate to our
        clients only who has engaged in our real estate services.</p>
        <ul>
          <li>Applicable for lower Rental Rate by 5-10% than the Market</li>
          <li>Unlimited Free Oil Changes</li>
          <li>Unlimited Mileage Usage in the City</li>
          <li>Free 100 KM every month to travel outside of Yangon for long term client</li>
        </ul>
        <p><b>Please inform us if you intend to go on a trip outside Yangon.</b></p>
      </div>
    )
  }
}
