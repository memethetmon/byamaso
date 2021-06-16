import React from 'react';

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="container">
        <p className="subTitle">About Us</p>
        <p>Byamaso HomeServices is a real estate division of Byamaso Group
        Company Limited, a privately held Burmese multi-industries company based
        in Yangon, Myanmar. The Group’s CEO, U Myo Thu, is a seasoned entrepreneur
        who has played a crucial role in implementation of current business model
        for the group and its subsidies.</p>
        <p>Why Us???</p>
        <ul>
          <li>Our exceptional clients' retaining rate at 71% indicates our
          ability to meet the clients' expectation as a service provider is well
          above industry standard.</li>
          <li>We are the only firm in Myanmar that provides tenant services at
          FOC and we charge only on other value-added services provided for the
          client.</li>
        </ul>
      </div>
    )
  }
}
