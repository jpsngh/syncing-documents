import { Server } from "socket.io";
import mongoose from "mongoose";
import Document from "./Doc.js";


export const DocModel = mongoose.model("Document", Document);
await mongoose.connect('mongodb+srv://jpsngh:dondondonX1@pos.tarufnj.mongodb.net/Document?retryWrites=true&w=majority').then(()=>{
    console.log("connection established");
});



const PORT = 3000;

const io = new Server(PORT,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET', 'POST' ]
    }
} )

io.on("connection",socket =>{

    socket.on("get-document", async documentId=>{
     const document =   await  findOrCreateDocument(documentId);
        const data = ""
        socket.join(documentId );
        socket.emit("load-document",document.data,()=>{
            console.log(document.data);
        })
        socket.on('send-changes',delta =>{
            console.log(delta)
            socket.broadcast.to(documentId).emit("receive-change",delta)
        })
        socket.on("save-document",async data =>{
          await DocModel.findByIdAndUpdate(documentId,{data}).then(console.log("data saved",mongoose.connection.readyState))
        })
    })
  
     const  findOrCreateDocument = async(id) => { 
        if(id == null) return ;
        
        const document = await  DocModel.findById(id).then(console.log("data found"))
        if (document )
        return document
        
            return await DocModel.create({_id:id, data:""}).then(console.log("data not found"))
            
        
    
     }
    

    console.log("connection")
});
