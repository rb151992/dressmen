const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  
  correo: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('admin', adminSchema);



