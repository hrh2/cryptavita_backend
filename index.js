require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const bodyParser =require('body-parser')
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const localconnection= require('./DB/localdb')
const onlineconnection=require('./DB/onlinedb')

localconnection()
// onlineconnection()

app.use(cors({
  origin: "*",
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
  exposedHeaders: 'Content-Range,X-Content- Range'
}));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(express.json());

const signupRoutes=require('./Controllers/Signup')
const loginRoutes=require('./Controllers/Login')
const emailVerification=require('./Controllers/Verifications')
const chatidRoute=require('./Controllers/UniqueChatID')
const userRoute=require('./Controllers/profile')

app.use('/v1/register',signupRoutes)
app.use('/v1/login',loginRoutes)
app.use('/v1/verify',emailVerification)
app.use('/v1/chat',chatidRoute)
app.use('/v1/user',userRoute)


app.get('/', async (req, res) => {
    try {
        return res.status(200).send("online");
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
