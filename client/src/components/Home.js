import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <p>Byamaso HomeServices is a real estate agency from Yangon that specializes in residential rental condominium and homeservices. We provide a one stop real estate service for our clients from an initial apartment hunting to arrangement for stamp duty and application of FORM C in prior to and after apartment selection respectively. Most of our services are offered on an exclusive basis as the business focuses on providing the quality services to our clients and strategized for the tremendous growth in the future.</p>
        <video controls><source src="/byamaso.mp4" type="video/mp4" /></video>
      </div>
    )
  }
}
