const express = require('express');
const router = express.Router();
const { UserDB, AuthDB } = require('../db/index');
const passwordServise = require('../servises/password-servise');
const jwtServise = require('../servises/jwt-servise');
const { sendMailForUs } = require('../servises/email-servise');
// const sendGrid = require('@sendgrid/mail');


router.get('/', async function (req, res) {
  try {
    const users = await UserDB.find();

    res.json(users);
  } catch (e) {
    console.log(e);
  }
});
router.post('/registration', async function (req, res, next) {
  try {

    const createdUser = await UserDB.createUserWithHashPassword(req.body);

    res.json(createdUser);
  } catch (e) {
    next(e);
  }
});
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await UserDB.findOne({ email });

    if (!user) {
      res.status(404).join({ message: 'User not found' })
    }

    const isPassValid = await passwordServise.compare(password, user.password);

    if (!isPassValid) {
      res.status(404).join({ message: 'User not found2' })
    }

    const tokenPair = jwtServise.generateTokenPair(user._id);


    await AuthDB.create({
      ...tokenPair,
      user_id: user._id
    });

    res.cookie('refresh_token', tokenPair.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
      // domain: '.o-node.onrender.com',
      // sameSite: 'none',
      // secure: true
    });


    return res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      ...tokenPair
    });
  } catch (e) {
    next(e);
  }
});

router.get('/refresh', async function (req, res) {
  try {

    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      console.log(111)
      res.status(404).join({ message: 'User not found' })
    }

    const decoder = await jwtServise.verifyToken(refresh_token, 'refresh_world');

    const tokenRespons = await AuthDB.findOne({ refresh_token: refresh_token }).populate('user_id');


    if (!decoder || !tokenRespons) {
      console.log(222)
      //res.status(404).join({ message: 'Token not found' });
    }

    const tokenPair = jwtServise.generateTokenPair(decoder.verifyToken.id);

    if (!tokenPair) {
      
      res.status(404).join({ message: 'Token not found' });
    }

    await AuthDB.updateOne({ refresh_token: refresh_token },
      {
        access_token: tokenPair.access_token,
        refresh_token: tokenPair.refresh_token
      });

    const user = tokenRespons.user_id;

    res.cookie('refresh_token', tokenPair.refresh_token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // domain: '.o-node.onrender.com',
      // sameSite: 'none',
      // secure: true
    });

    res.json({ tokenPair, 
      user: {
      id: user._id,
      email: user.email,
      role: user.role
    }, });
  } catch (e) {
    console.log(e);
  }
});
router.post('/send', async function (req, res, next) {
  try {

    const {user_email, text}= req.body;

    const send = await sendMailForUs(user_email, text);

    res.json(send);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
