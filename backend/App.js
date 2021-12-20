const express=require('express');
const cors=require('cors')
const http=require('http')
const PORT=8000
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
const httpServer=http.createServer(app);
// const {Server}=require('socket.io')
// const io=new Server(httpServer)
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
const  connect  = require("./database/database");
//load routes
const postRoutes=require('./routes/UserRoutes');
app.use("/api/posts",postRoutes)
const postModel=require('./db/PostSchema')
io.on('connection', (socket) => {
    postModel.find({},(err,data)=>{
        if(err) throw err;
        else{
            socket.emit('op-message',data)
        }
    })
    console.log('User Connected');
    socket.on("message", (data,_id) => {
        
    console.log(data)
        postModel.updateOne(
            { _id: _id },
            {
              $push: {
                comments:data,
              },
            },
            (err) => {
              if (err) throw err;
              else {
                postModel.find({}, (err, data) => {
                          if (err) throw err;
                          else {
                            io.emit("chat message", data);  
                          }
                        });
                console.log("updated");
              }
            }
          );
      });
    });
// io.on('connection', (socket) => {
//   console.log('User Connected')
//     socket.on('comment',(comment)=>{
//         console.log(comment)
//         io.emit('comment demo', comment)
//         connect.then(db  =>  {
//             console.log("connected correctly to the server");
        
//             let  chatMessage  =  new Comment({ comment:comment});

//             chatMessage.save();
//             });
       
           
//         });
  
     
//     //  io.on('connection', (socket) => { 
//     //         console.log('new client connected');
//     //     });
//  });


httpServer.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`Server is running on ${PORT}`)
})