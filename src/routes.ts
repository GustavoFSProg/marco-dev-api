import { Request, Response, Router } from 'express'
import multer from 'multer'
import categoryController from './controllers/categoryController'
import productsController from './controllers/productsController'
import userColntroller from './controllers/userColntroller'
import uploadConfig from './uploadConfig'

const upload = multer(uploadConfig)

const route = Router()

route.get('/', (req: Request, res: Response) => {
  return res.send({ msg: ` 🏀 Api Running Free`})
}),
route.get('/getAll-users', userColntroller.getAllUsers)
route.post('/register-users', userColntroller.RegisterUser)
route.post('/login', userColntroller.Login)

route.post('/products', upload.single('image'), productsController.registerPost)
route.get('/get-products', productsController.getProduct)
route.put('/update-products/:id', upload.single('image'), productsController.UpdatePost)

route.post('/register-categorys', categoryController.RegisterCategory)
route.get('/get-categorys', categoryController.getAllCategorys)
 

export default route