const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const expressSession = require('express-session')

const storeUserController = require('./controllers/storeUser')
const newPictureController = require('./controllers/newPicture')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const boardRenewalController = require('./controllers/boardRenewal')
const rankSaveController = require('./controllers/rankSave')
const rankGetController = require('./controllers/rankGet')
const rankGet2Controller = require('./controllers/rankGet2')

const authMiddleware = require('./middleware/authMiddleware')
const reviseMiddleware = require('./middleware/reviseMiddleware')
const redirectIfAuthenticatedMiddleware =
    require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const storePictureController = require('./controllers/storePicture')

const validateMiddleware = require("./middleware/validateMiddleware");

mongoose.connect('mongodb+srv://lkns0989:lkns0907@cluster0.7tm1y.mongodb.net/test1', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser: true})
//mongoose.connect('mongodb://localhost/test_database', {useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser: true})
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



app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/categories', (req, res) => {
    res.render('categories')
})
app.get('/new_games', (req, res) => {
    res.render('newgames')
})
app.get('/popular_games', (req, res) => {
    res.render('populargames')
})
app.get('/game/tetris', (req, res) => {
    res.render('tetris')
})
app.get('/game/2048', (req, res) => {
    res.render('2048')
})
app.get('/game/mole', (req, res) => {
    res.render('mole')
})
app.get('/game/submit', (req, res) => {
    ;
})
app.get('/game/baseball', (req, res) => {
    res.render('baseball')
})
app.get('/game/baseball2', (req, res) => {
    res.render('baseball2')
})
app.get('/game/memory', (req, res) => {
    res.render('memory')
})
app.get('/ranking', (req, res) => {
    res.render('ranking')
})
app.get('/ranking-detail', (req, res) => {
    res.render('ranking-detail')
})
app.get('/community', boardRenewalController)
app.get('/community-detail', (req, res) => {
    res.render('community-detail')
})

global.loggedIn = null; //세션 상태 (로그인 비로그인 구분)
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.get('/auth/logout', logoutController)

app.get('/login', redirectIfAuthenticatedMiddleware, loginController)

app.get('/mypage', authMiddleware, reviseMiddleware, newPictureController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/post/:id', getPostController)

app.get('/rank/get', rankGetController)

app.get('/rank/get2', rankGet2Controller)

app.post('/users/signup', redirectIfAuthenticatedMiddleware, storeUserController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.post('/users/update', storePictureController)

app.post('/posts/store', authMiddleware, storePostController)

app.post('/rank/new', rankSaveController)

var port = process.env.PORT || 4000;
app.listen(port, () => { console.log('App listening on port ' + port) })