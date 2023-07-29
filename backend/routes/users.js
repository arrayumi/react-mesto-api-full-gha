const router = require('express').Router();

const {
  getUsers, getUser, updateProfile, updateAvatar, getUserinfo,
} = require('../controllers/users');

const { validateUpdateProfile, validateUpdateAvatar, validateUserId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserinfo);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUpdateProfile, updateProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
