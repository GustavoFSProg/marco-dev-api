import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'

const prisma = new PrismaClient()

async function RegisterCategory(req: Request, res: Response) {
  try {
    await prisma.categorys.create({
      data: { name: req.body.name },
    })

    return res.status(201).send({ msg: 'Categoria Cadastrado!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERRO!!', error })
  }
}

async function getAllCategorys(req: Request, res: Response) {
  try {
    const user = await prisma.categorys.findMany()

    return res.status(200).send(user)
  } catch (error) {
    return res.status(400).send({ msg: 'ERRO!!', error })
  }
}


export default { getAllCategorys,  RegisterCategory }
