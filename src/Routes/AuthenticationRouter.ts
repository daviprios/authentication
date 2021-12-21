import { Router } from 'express'
import authenticationValidator from '../Validation/AuthenticationValidator'
import AuthenticationController from '../Controllers/AuthenticationController'

const router = Router()
const authenticationController = new AuthenticationController()

router.post('/signup', authenticationValidator.signup, authenticationController.signup)
router.post('/login', authenticationValidator.login, authenticationController.login)

export default router