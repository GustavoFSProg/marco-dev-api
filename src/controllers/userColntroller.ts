import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'

const prisma = new PrismaClient()

async function RegisterUser(req: Request, res: Response) {
  try {
  const user =  await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: String( md5(req.body.password, process.env.SECRET as string & { asBytes: true }),)
      }
    })

    return res.status(201).send({msg: "Usuario Cadastrado", user})
  } catch (error) {

    return res.status(400).send({msg: "ERRO!!", error})

    
  }
  
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const user = await prisma.users.findMany()
    
    return res.status(200).send(user)
  } catch (error) {
    
    return res.status(400).send({msg: "ERRO!!", error})

  }
}


async function Login(req: Request, res: Response) {
  try {
    const user = await prisma.users.findFirst({
      where:{email: req.body.emai, password: String( md5(req.body.password, process.env.SECRET as string & { asBytes: true }),)
}
    })

    if (!user) {
      return res.status(200).send({ msg: "Login ERROR, emamil ou password invalidos!" })
      
    }

    const token = await generateToken({
      email: req.body.emai, password:
        md5(req.body.password, process.env.SECRET as string & { asBytes: true })})
    
    return res.status(200).send({ msg: "Login success!", token })
  } catch (error) {
    
    return res.status(400).send({msg: "ERRO!!", error})

  }
}

export default {getAllUsers, Login, RegisterUser}