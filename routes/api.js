const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const secretkey = "meme";
const expirySeconds = 86400;    // 24hr

// check isLoggedIn
function isLoggedIn(req, res, next){
  // We can obtain the session token from the requests cookies, which come with every request
  const token = req.cookies.token;
  // if the cookie is not set, return an unauthorized error
	if (!token) {
		return res.status(401).send("Access Denied!!!");
	}
  var payload;
  try {
    // Parse the JWT string and store the result in 'payload'.
    // Note that we are passing the key in this method as well. This method will throw an error
    // if the token is invalid (if it has expired according to the expiry time we set on sign in)
    // or if the signature does not match
    payload = jwt.verify(token, secretkey)
  } catch (e) {
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  // finally, successfully authenticated
  next();
}

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(error, user, info) {
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
          res.status(401).send(error);
      } else if (!user) {
          res.status(401).send(info);
      } else {
          // next();
          const token = jwt.sign({userId : user._id,  
            username:user.username}, secretkey, {algorithm: "HS256", expiresIn: expirySeconds});
          // set the cookie as the token string, with a similar max age as the token
          // here, the max age is in milliseconds, so we multiply by 1000
          res.cookie("token", token, { httpOnly: true, maxAge: expirySeconds * 1000 });
          res.json({success: true, message: "Authentication successful", token: token});
          res.send();
      }
  })(req, res, next);
},
function (req, res) {
    res.status(200).send('logged in!');
});

router.get('/logout', (req, res, next) => {
  res.clearCookie("token");
  res.send({success: true});
  req.logout();
})

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'client/public/uploads');
  },
  filename: function(req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname);
  }
})

const imageFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// for parsing multipart/form-data
const upload = multer({storage: storage, limits: {fileSize: 1024 * 1024 * 10}, fileFilter: imageFilter}).array('images');

// get a list of properties
router.get('/getAll', (req, res, next) => {
  // this will return all the data
  Property.find({}, (err, properties) => {
    if(err)
      console.log(err);
    res.json(properties);
  })
});

// get a property based on its id
router.get('/property/:id', (req, res, next) => {
  Property.findById(req.params.id)
    .then(data => res.json(data))
    .catch(next)
});

// update a property based on id
router.post('/update/:id', isLoggedIn, upload, (req, res, next) => {
  const updatedData = {
    title: req.body.title,
    location: req.body.location,
    status: req.body.status,
    type: req.body.type,
    price: req.body.price,
    area: req.body.area,
    master_bedrooms: req.body.master_bedrooms,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    description: req.body.description,
    images: req.files
  }
  Property.updateOne({"_id": req.params.id}, updatedData)
    .then(data => res.json(data))
    .catch(next)
})

// post a new property
router.post('/property', isLoggedIn, upload, (req, res, next) => {
  // const imgArr = [];
  // console.log(req.files);
  // if(req.files.length >= 1) {
  //   for(let i = 0; i < req.files.length; i++) {
  //     let imgPath = req.files[i].path;
  //     imgArr.push(imgPath);
  //   }
  // }

  const newProperty = new Property({
    title: req.body.title,
    location: req.body.location,
    status: req.body.status,
    type: req.body.type,
    price: req.body.price,
    area: req.body.area,
    master_bedrooms: req.body.master_bedrooms,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    description: req.body.description,
    images: req.files
  });

  newProperty.save()
    .then(() => res.send('New property added!'))
    .catch(next)
});

// delete a specific property
router.delete('/property/:id', isLoggedIn, (req, res, next) => {
  Property.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;
