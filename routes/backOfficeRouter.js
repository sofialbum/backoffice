const express = require("express");
const router = express.Router();
const backOfficeController = require('./../controllers/backOfficeController');


router.post('/', backOfficeController.createModule);

router.get('/:id', backOfficeController.getComponentName);



module.exports = router;