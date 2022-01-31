const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
  name: { required: true, type: String, trim: true },
  email: { required: true, type: String, trim: true, unique: true },
  password: { required: true, type: String, trim: true },
  role: { type: Number, default: 0 },
  cart: { type: Array, default: [] },
})
module.exports = mongoose.model('User', userSchema)
//-----------------------------
const router = require('express').Router()

router.post('/register', userCtrl.register)

//-----------------------------
const 