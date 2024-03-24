const express = require('express');
const garmentSize = express();
const gramentSizeController = require('./garementSize');
const catchAsync = require('../../../utils/catchasynch')

//garmentSize.post('/', catchAsync(gramentSizeController.saveGarmentSize));
// garmentSize.put('/:id', catchAsync(gramentSizeController.updateGarmentSize));
//garmentSize.delete('/:id', catchAsync(gramentSizeController.deleteGarmentSize));
//garmentSize.get('/:id', catchAsync(gramentSizeController.getSizeById));
//garmentSize.get('/',catchAsync(gramentSizeController.getAllGarmentSize));

module.exports = garmentSize;
