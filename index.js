const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

//const GameUpload = require('./models/GameUpload.js')

const expressSession = require('express-session')

const storeUserController = require('./controllers/storeUser')
const newUserController = require('./controllers/newUser')
const newPictureController = require('./controllers/newPicture')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const boardRenewalController = require('./controllers/boardRenewal')
const authMiddleware = require('./middleware/authMiddleware')
const reviseMiddleware = require('./middleware/reviseMiddleware')
const redirectIfAuthenticatedMiddleware =
    require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const storePictureController = require('./controllers/storePicture')

const validateMiddleware = require("./middleware/validateMiddleware");

mongoose.connect('mongodb+srv://lkns0989:lkns0907@cluster0.7tm1y.mongodb.net/test', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser: true})
const db = mongoose.connection
db.once('open', () => {
    console.log("connected...")
})

const app = new express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

app.set('view engine', 'ejs')

app.use(expressSession( {
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use('/posts/store', validateMiddleware)
//app.use('/posts/store', validateMiddleWare)




/*app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
    console.log(blogposts)

})*/
app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/categories', (req, res) => {
    res.render('categories')
})
app.get('/game/tetris', (req, res) => {
    res.render('tetris')
})
app.get('/community', boardRenewalController)
app.get('/community-detail', (req, res) => {
    res.render('community-detail')
})

/*app.get('/post/:id', async (req, res) => {
    // console.log("req.params" + JSON.stringify(req.params))
    const blogpost = await BlogPost.findById(req.params.id)
    console.log(blogpost)
    res.render('post', {
        blogpost
    });
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req,res)=> {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error) =>
    {
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})
*/
global.loggedIn = null; //세션 상태 (로그인 비로그인 구분)
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.get('/auth/logout', logoutController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.get('/auth/signup', redirectIfAuthenticatedMiddleware, newUserController)

app.get('/mypage', authMiddleware, reviseMiddleware, newPictureController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/post/:id', getPostController)

app.post('/users/signup', redirectIfAuthenticatedMiddleware, storeUserController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.post('/users/update', storePictureController)

app.post('/posts/store', authMiddleware, storePostController)

var port = process.env.PORT || 4000;
app.listen(port, () => { console.log('App listening on port ' + port) })