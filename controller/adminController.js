const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation/validation')
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'successfull',
      users: users
    });
  } catch (error) {
    console.log('error ' + error);
  }
};

exports.addUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    else {
      const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: hash
      });
      await user.save()
        .then(result => {
          res.status(200).json({
            message: 'User saved',
            user: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: 'this email is already registered',
            error: err
          });
        })
    }
  });
};

exports.editUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id },
    { new: true },
    (err, doc) => {
      if (err) throw (err)
      else {
        res.json({
          data: doc
        });
      }
    })
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndRemove(id)
      .then(() => {
        console.log('User removed');
      })
  } catch (error) {
    console.log('error ' + error);
  }
};

// login 
exports.loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  //checking if email is exist in the db
  if (!user) return res.status(400).json({ error: 'email not found' });
  //checking the password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ error: 'invalid password' });
  // creating token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).json({ token: token })
}



