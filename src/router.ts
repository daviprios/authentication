import { Router } from 'express'
import AuthenticationRouter from './Routes/AuthenticationRouter'

const router = Router()

router.get('/', (req, res) => {
  return res.status(200).send("Res")
})

router.use(AuthenticationRouter)

export default router