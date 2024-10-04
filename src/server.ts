import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createUser, signIn } from './handlers/users'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next) => {
    req.holla = 'olaaaa'
    next()
})
app.get('/', (req, res) => {
  throw new Error('waaa waaa waaa kuna error apa')
})

app.use('/api',protect, router)

//create new user
app.post('/user', createUser)
//sign in user
app.post('/signin', signIn)
//error middleware

app.use((err, req, res, next) => {
    console.log(err)
    res.json({message: "Fuuuck an error occured "})

    
})

export default app