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
    console.log("Hello, first page from express")

    res.status(200)
    res.json({message:'hello',g:"ww"})
})

app.use('/api',protect, router)

//create new user
app.post('/user', createUser)
//sign in user
app.post('/signin', signIn)

export default app