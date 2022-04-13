const app = require('express')()
const morgan =require('morgan')
const cors =require('cors')
const dotenv =require('dotenv')
const mongoose =require('mongoose')
const multer =require('multer')
const path =require('path')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')
const conversationsRouter = require('./routes/conversations')
const messagesRouter = require('./routes/messages')
const express = require('express')


dotenv.config()
app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use('/images',express.static(path.join(__dirname, 'public/images')))
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);
app.use('/api/conversations', conversationsRouter);
app.use('/api/messages', messagesRouter);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
      cb(null, req.body.name );
    },
  });

  
  var upload = multer({ storage: storage });
  app.post('/api/upload', upload.single('file'), function(req, res, next) {
    try {
        res.status(200).json('upload file success')
    } catch (error) {
        
    }
  });

mongoose.connect(process.env.MONGODB_URL)
.then(res=>console.log('Connected to database'))
.catch(err => console.log('Err '+ err.message));
const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log('app listening on port ' + PORT);
}) 