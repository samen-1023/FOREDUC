import Router from 'koa-router';
import UserController from '../controllers/User.controller';
import AuthValidator from '../validators/Auth.validator';

const router = new Router({
    prefix: '/api'
})

router.post(
    '/auth/registration',
    AuthValidator.email(),
    AuthValidator.phone(),
    AuthValidator.username(),
    AuthValidator.password(),
    UserController.registration
)
router.get('/users', UserController.getUsers)
router.post(
    '/auth/login',
    AuthValidator.email(),
    AuthValidator.password(),
    UserController.login
)
router.put('/auth/logout', UserController.logout)
router.put('/auth/refresh', UserController.refresh)
router.delete('/auth/remove-user', UserController.delete)

export default router;
