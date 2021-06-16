import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'

export default function PropertyInfo(props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [master_bedrooms, setMasterBedrooms] = useState(0);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`/api/property/${props.match.params.id}`)
      .then(res => {
        setTitle(res.data.title);
          setLocation(res.data.location);
          setStatus(res.data.status);
          setType(res.data.type);
          setPrice(res.data.price);
          setArea(res.data.area);
          setMasterBedrooms(res.data.master_bedrooms);
          setBedrooms(res.data.bedrooms);
          setBathrooms(res.data.bathrooms);
          setDescription(res.data.description);
          setImages(res.data.images)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [props.match.params.id]);

  return (
    <div className="container">
      <div className="subTitle">About {title}</div>
      <Carousel>
        {
          images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={require(`../../public/uploads/${image.filename}`)}
                alt="Property"
              />
            </Carousel.Item>
          ))
        }
      </Carousel>
      <div>Location: {location}</div>
      <div>Status: {status}</div>
      <div>Type: {type}</div>
      <div>Price: {price}</div>
      <div>Area: {area}</div>
      <div>Master Bedrooms: {master_bedrooms}</div>
      <div>Bedrooms: {bedrooms}</div>
      <div>Bathrooms: {bathrooms}</div>
      <div>Others: {description}</div>
    </div>
  )
}
