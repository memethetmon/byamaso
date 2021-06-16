import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RealEstate from "./components/RealEstate";
import CarRental from "./components/CarRental";
import CleaningLaundry from "./components/CleaningLaundry";
import AdHoc from "./components/AdHoc";
import AboutUs from "./components/AboutUs";

import Login, { useAuth } from "./components/Login";
import PropertiesList from "./components/PropertiesList";
import CreateProperty from "./components/CreateProperty";
import EditProperty from "./components/EditProperty";
import PropertyInfo from "./components/PropertyInfo";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return (
    <Route 
      {...rest} render={props => (
      isAuthenticated === true
        ? (<Component {...props} />)
        : (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />)
    )} />
  )
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <br/>
          <Route exact path="/" component={Home} />
          <Route path="/real-estate" component={RealEstate} />
          <Route path="/car-rental" component={CarRental} />
          <Route path="/cleaning&Laundry" component={CleaningLaundry} />
          <Route path="/ad-hoc" component={AdHoc} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/properties-list" component={PropertiesList} />
          <PrivateRoute path="/create-property" component={CreateProperty} />
          <PrivateRoute path="/edit-property/:id" component={EditProperty} />
          <Route path="/property/:id" component={PropertyInfo} />
        </div>
      </Router>
    );
  }
}
export default App;
