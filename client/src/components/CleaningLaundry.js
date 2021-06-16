import React from 'react';

export default class CleaningLaundry extends React.Component {
  render() {
    return (
      <div className="container">
        <p className="subTitle">Cleaning & Laundry</p>
        <p>Although cleaning service is recently launched, the service has been
        available to our real estate clients since late 2018. Our cleaning team
        is well equipped with all the necessary tools and the cleaning detergent.
        Clients "DO NOT" need to provide anything else. We like to consider our
        cleaners as "Cleaning Experts". Our experts are not only industry-experienced
        yet they have been verified by the company prior to the recruitment and
        monitored by a supervisor at all time during the cleaning session.</p>
        <p><i>Note: Currently we are providing our cleaning services only in the
        area where our real estate services are provided.</i></p>
        <table className="table table-sm table-bordered" style={{'text-align': 'center'}}>
          <thead>
            <tr><th colspan="4">Residential Cleaning Services</th></tr>
          </thead>
          <tbody>
            <tr>
              <th>Package</th>
              <td>Daily</td>
              <td>Weekly</td>
              <td>Monthly</td>
            </tr>
            <tr>
              <th>Qty (Days)</th>
              <td>1</td>
              <td>3</td>
              <td>12</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>1.5 hr / session</td>
              <td>1.5 hr / session</td>
              <td>1.5 hr / session</td>
            </tr>
            <tr>
              <th>Provided Personnels</th>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <th>Price (MMK)</th>
              <td>15,000</td>
              <td>45,000</td>
              <td>120,000</td>
            </tr>
            <tr>
              <th>Service</th>
              <td>Routine Cleaning</td>
              <td>Customized By Client</td>
              <td>Customized By Client</td>
            </tr>
          </tbody>
        </table>
        <p><i><b>*No Laundry and Ironing is included at this moment. We charge
        additional fees to the apartments that required deep cleaning services.</b></i></p>
      </div>
    )
  }
}
