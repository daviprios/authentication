import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import database from '../Database/connection'

import { Response } from 'express'
import { CustomRequestBody } from '../Types/CustomRequestBody'
import { UserModel } from '../Models/UserModel'

class AuthenticationController {
  async signup (request: CustomRequestBody<UserModel>, response: Response) {
    const { username, email, password } = request.body

    const salt = randomBytes(16).toString('base64')
    const hash = scryptSync(password, salt, 64).toString('base64')

    const userData: UserModel = {
      username,
      email,
      password: `${salt}:${hash}`
    }

    try {
      const userExists = await database.table('user').select('*').where({ username }).orWhere({ email })
      if(userExists.length > 0) return response.status(406).send(`user/email already in use`)

      const result = await database.table('user').havingNotIn('username', [userData.username]).andHavingNotIn('email', [userData.email]).insert(userData)
      return response.status(201).send(`Account for ${username} created`)
    }
    catch (error) {
      return response.status(500).send(error)
    }

  }

  async login (request: CustomRequestBody<UserModel>, response: Response){
    const { username, password } = request.body

    const userData = {
      username,
      password
    }

    try{
      const databaseUser = await database.table('user').select('*').where({ username: userData.username }).orWhere({ password: userData.password }).first()
      
      const storedPassword = String(databaseUser.password)
      const [salt, hash] = storedPassword.split(':')
      const password = scryptSync(userData.password, salt, 64)

      const match = timingSafeEqual(password, Buffer.from(hash, 'base64'))

      if(!match) return response.status(400).send(`Wrong username/password`)

      return response.status(200).send(`Loging ${username} account`)
    }
    catch(error){
      return response.status(500).send(error)
    }
  }
}

export default AuthenticationController