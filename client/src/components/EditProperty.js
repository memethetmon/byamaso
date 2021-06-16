import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function EditProperty(props) {
  const history = useHistory();

  const [id, setId] = useState("");
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
          setId(res.data._id);
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

  // validation for uploading too many Images
  const maxSelectFile = (e) => {
    let files = e.target.files // create file object
    if(files.length > 10) {
      const msg = "Only 10 images can be uploaded at a time";
      e.target.value = null; // discard selected file
      alert(msg);
      return false;
    }
    return true;
  }

  // validation for uploading image with wrong file extension
  const checkMimeType = (e) => {
    // getting file object
    let files = e.target.files;
    let err = '';
    // list of allow mime types
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    for(let i = 0; i < files.length; i++) {
      if(types.every(type => files[i].type !== type)) {
        err += files[i].type + ' is not a supported file type\n';
      }
    };
    if(err !== '') {
      e.target.value = null;  // discard selected file
      alert(err);
      return false;
    }
    return true;
  }

  // validation for uploading very large image
  const checkFileSize = (e) => {
    let files = e.target.files;
    let err = '';
    for(let i = 0; i < files.length; i++) {
      if(files[i].size > 1000000) {
        err += files[i].name + ' is too large, please pick a smaller file.\n';
      }
    };
    if(err !== '') {
      alert(err);
      e.target.value = null;
      return false;
    }
    return true;
  }

  const handleTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, [setTitle]);

  const handleLocation = useCallback((e) => {
    setLocation(e.target.value);
  }, [setLocation]);
    
  const handleStatus = useCallback((e) => {
    setStatus(e.target.value);
  }, [setStatus]);
  
  const handleType = useCallback((e) => {
    setType(e.target.value);
  }, [setType]);
  
  const handlePrice = useCallback((e) => {
    setPrice(e.target.value);
  }, [setPrice]);
  
  const handleArea = useCallback((e) => {
    setArea(e.target.value);
  }, [setArea]);
  
  const handleMasterRooms = useCallback((e) => {
    setMasterBedrooms(e.target.value);
  }, [setMasterBedrooms]);
  
  const handleBedrooms = useCallback((e) => {
    setBedrooms(e.target.value);
  }, [setBedrooms]);
  
  const handleBathrooms = useCallback((e) => {
    setBathrooms(e.target.value);
  }, [setBathrooms]);
    
  const handleDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, [setDescription]);

  const uploadMultipleFiles = (e) => {
    if(e.target.files.length && maxSelectFile(e) && checkMimeType(e) && checkFileSize(e)) {
      setImages(e.target.files);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = new FormData();
    finalData.append('id', id);
    finalData.append('title', title);
    finalData.append('location', location);
    finalData.append('status', status);
    finalData.append('type', type);
    finalData.append('price', price);
    finalData.append('area', area);
    finalData.append('master_bedrooms', master_bedrooms);
    finalData.append('bedrooms', bedrooms);
    finalData.append('bathrooms', bathrooms);
    finalData.append('description', description);
    for(let i = 0; i < images.length; i++) {
      finalData.append('images', images[i]);
    }
    axios.post(`/api/update/${id}`, finalData)
      .then(res => alert("Successfully updated!!!"))
      .catch(err => {
        console.log(err);
        alert("Access Denied!!! Please login to continue.");
        props.history.push('/login');
      })
    
    history.push('/properties-list');
  }

  return (
    <div className="container">
      <div className="subTitle">Edit Property Info</div>
      <form encType="multipart/form-data" onSubmit={onSubmit} method="post">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-control form-control-sm" name="title" value={title} onChange={handleTitle} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" className="form-control form-control-sm" name="location" value={location} onChange={handleLocation} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="status">Status</label>
            <select id="status" className="form-control form-control-sm" name="status" value={status} onChange={handleStatus}>
              <option value="For Rent">For Rent</option>
              <option value="For Sale">For Sale</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="type">Type</label>
            <select id="type" className="form-control form-control-sm" name="type" value={type} onChange={handleType}>
              <option value="Home">Home</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" className="form-control form-control-sm" name="price" value={price} onChange={handlePrice} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="area">Area</label>
            <input type="text" id="area" className="form-control form-control-sm" name="area" value={area} onChange={handleArea} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="master">Master Bedrooms</label>
            <input type="text" id="master" className="form-control form-control-sm" name="master" value={master_bedrooms} onChange={handleMasterRooms} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="bedrooms">Bedrooms</label>
            <input type="text" id="bedrooms" className="form-control form-control-sm" name="bedrooms" value={bedrooms} onChange={handleBedrooms} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="bathrooms">Bathrooms</label>
            <input type="text" id="bathrooms" className="form-control form-control-sm" name="bathrooms" value={bathrooms} onChange={handleBathrooms} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea id="desc" className="form-control" name="desc" value={description} onChange={handleDescription}></textarea>
        </div>
        <div className="form-group">
          <label>Images</label>
          <input type="file" name="photos" onChange={uploadMultipleFiles} multiple required />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-danger" onClick={() => history.goBack()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}