const express = require('express');
const routes = require('../constants/routes');
const router = express();
const garmentColors = require("../controllers/garment/garmentColors/index")
const garmentType = require("../controllers/garment/garmentType/index");
const garmentSize = require('../controllers/garment/garmentSize/index');
const user = require('../controllers/user/index');
const auth = require('../controllers/auth/index');
const { authenticate, restrictTo } = require('../middlewares/auth/auth');


router.use(routes.AUTH, auth);
// simple authenticate ==> checks either user belongs to system
router.use(authenticate)

router.use(routes.USER, user);

// role authenticator ==> checks users role is valid to access this route
// router.use(restrictTo(["admin"]))
router.use(routes.GARMENTCOLOR, garmentColors);
router.use(routes.GARMENTTYPE, garmentType);
router.use(routes.GARMENTSIZE, garmentSize);
module.exports= router;