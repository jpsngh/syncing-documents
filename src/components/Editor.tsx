

 import { DeltaStatic } from "quill";
import "quill/dist/quill.snow.css"
import {  useEffect ,  useState} from 'react';
import {useQuill} from 'react-quilljs';
import { useParams } from "react-router";
import  {io} from 'socket.io-client'





// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Editor = ({styles}:any) => {
  const {id:documentId} = useParams()

  const [socket,setSocket] = useState< any>();
  const {quill,quillRef} = useQuill();


  useEffect(()=>{
    if (socket== null || quill == null) return;
 
    
  socket.emit("get-document",documentId)

socket.once("load-document",(document:DeltaStatic)=>{

  console.log(document)

  quill.setContents(document);
  quill.enable();
})
     
  },[socket,quill,documentId])


  useEffect(()=>{
    if (socket== null || quill == null) return;

    const interval = setInterval(()=>{
      socket.emit("save-document",quill.getContents())
    },2000)
    
    return ()=>{
     clearInterval(interval);
    }
  })

  useEffect(()=>{
   const socketServer =  io("http://localhost:3000");
   setSocket(socketServer);
  
     
   return ()=> {
       socketServer.disconnect();
   }
  },[])

  useEffect(()=>{
    if (socket== null || quill == null) return;

 const handle = ((delta:DeltaStatic)=>{
   quill.updateContents(delta)
})
 if(socket) {
   socket.on("receive-change",handle)
 }

 return ()=>{
   socket.off('receive-change',handle);
 }


},[socket,quill])



useEffect(()=>{
  quill?.setText("")
  quill?.disable();
})









  useEffect(()=>{
       if (socket== null || quill == null) return;

    const handle = ((delta:DeltaStatic,oldDelta:DeltaStatic,source:string)=>{
      if(source !== "user") return;
            console.log(delta)
            console.log(oldDelta);
      socket.emit("send-changes",delta)
})
    if(quill) {
      quill.on("text-change",handle)
    }

    return ()=>{
      quill.off('text-change',handle);
    }

  
  
  },[socket,quill])




  
  
  return (


    <div className="flex flex-row align-center justify-center m-20"> 
    <div  style={ styles ?styles :{width:700,height:500}} >

      <div  ref={quillRef}  > </div>
    </div>

    </div>
  )
}

export default Editor
