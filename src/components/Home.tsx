
import {  useState } from 'react';
import { useNavigate } from 'react-router'




const Home = () => {
      const [text,setText] = useState("")
      const navigate = useNavigate();
    const handle = (e:any)=>{
      e.preventDefault();

      if(text.length>3) {
            console.log(e.target.room.value)
        navigate(`/document/${e.target.room.value}`)
      }
      else {
        return alert("Room Name should have atleast 4 characters..")
      } 


        // <Navigate to={`/document/${uuidV4()}`}></Navigate>
    }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center my-20  '>
      <div>
        <h1 className='text-4xl font-mono'> <span className='text-green-500'> Auto </span> <span className='text-yellow-500'>Syncing </span> Documents</h1>
     
      </div>

    <div className='flex flex-row  gap-5 my-20'>
      <img src="./gif.gif" className='border border-black h-[200px] ' placeholder='Screen 1'></img>
      <img src="./gif.gif" className='border border-black h-[200px]' ></img>
    </div>
   <form className= {`w-full h-full flex flex-col justify-center items-center m-2 p-5font-mono `}  onSubmit={handle} >
    <input className=' p-5 border border-gray-400 m-2' name="room" type='text' onChange={(e)=>setText(e.target.value)} placeholder='Enter Room...'/> 
     <button   className= {`w-auto  border border-blue-500  text-blue-500 shadow-md ${text.length<=3 ?"hidden " : ""} p-3` } type="submit"> Submit</button>
     </form>
    </div>
  )
}

export default Home
