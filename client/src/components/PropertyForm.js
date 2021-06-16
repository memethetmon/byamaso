import React from 'react';
import axios from 'axios';

export default class PropertyForm extends React.Component {
  fileArr = [];

  // componentWillUnmount() {
  //   if(this.fileArr.length !== 0) {
  //     for(let i = 0; i < this.fileArr.length; i++) {
  //       // release existing object URL to let the browser know not to keep reference to the file any longer
  //       URL.revokeObjectURL(this.fileArr[i]);
  //       console.log(this.fileArr);
  //     }
  //   }
  // }

  // validation for uploading too many Images
  maxSelectFile = (e) => {
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
  checkMimeType = (e) => {
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
  checkFileSize = (e) => {
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

  uploadMultipleFiles(e) {
    this.fileArr.length = 0;
    let imgArr = [];
    let files = e.target.files;
    if(this.maxSelectFile(e) && this.checkMimeType(e) && this.checkFileSize(e)) {
      for(let i = 0; i < files.length; i++) {
        this.fileArr.push(URL.createObjectURL(e.target.files[i])); // create a temp local URL that is tied to the document in which it's created
        imgArr.push(e.target.files[i].name);
      }
      this.setState({
        images: imgArr
      });
    }
  }

}
