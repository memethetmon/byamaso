import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function PropertiesList(props) {
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('/api/getAll')
      .then(res => {
        if(res.data) {
          setData(data => data.concat(res.data));
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const editProperty = id => {
    props.history.push('/edit-property/'+ id);
  }

  const deleteProperty = id => {
    confirmAlert({
      title: "Confirmation",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios.delete('/api/property/'+ id)
              .then(res => {
                // update the state to re-render the list after deleting
                setData(data.filter(d => d._id !== id));
                alert("Successfully Removed!!!");
              })
              .catch(err => {
                console.log(err);
                alert("Access Denied!!! Please login to continue.");
                props.history.push('/login');
              })
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    })
  }

  const logout = () => {
    axios.get('/api/logout')
      .then(res => {
        if(res.data.success) {
          alert("Successfully Logged out!");
          history.push('/login');
        }
      })
  }

  return (
    <div>
      <div style={{ paddingBottom: 20 }}>
        <span className="subTitle">Real Estate</span>
        <button style={{ margin: 10 }} type="button" className="btn btn-outline-dark btn-sm" onClick={() => history.push('/create-property')}>Add New</button>
        <button style={{ float: "right", margin: 10 }} type="button" className="btn btn-danger btn-sm" onClick={logout}>Logout</button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Location</th>
            <th scope="col">Status</th>
            <th scope="col">Type</th>
            <th scope="col">Price</th>
            <th scope="col">Area</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((property) => {
              return <tr key={property._id}>
                      <td>{property.title}</td>
                      <td>{property.location}</td>
                      <td>{property.status}</td>
                      <td>{property.type}</td>
                      <td>{property.price}</td>
                      <td>{property.area}</td>
                      <td>
                        <i className="fa fa-pencil-square-o fa-lg fa-fw green" aria-hidden="true" onClick={() => editProperty(property._id)}></i>
                        <i className="fa fa-trash-o fa-lg fa-fw red" aria-hidden="true" onClick={() => deleteProperty(property._id)}></i>
                      </td>
                    </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}