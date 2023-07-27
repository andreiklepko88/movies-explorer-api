const router = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validation');

const {
  updateProfile, getUserInfo, logOut,
} = require('../controllers/users');

router.get('/me', getUserInfo);

router.patch('/me', validateUpdateProfile, updateProfile);

router.delete('/logout', logOut);

module.exports = router;
