import Router from 'koa-router';
import EducatorController from './Educator.controller';
import EducatorValidator from './Educator.validator';

const validator = new EducatorValidator()
const controller = new EducatorController()
const router = new Router({ prefix: '/api' })

router.post(
    '/educators',
    validator.surname(),
    validator.name(),
    validator.patronymic(),
    validator.department(),
    validator.accessToken(),
    controller.create
)
router.get('/educators', controller.read)
router.get('/educators/:id', controller.readOne)
router.put('/educators/:id', controller.update)
router.delete('/educators/:id', controller.delete)

export default router;