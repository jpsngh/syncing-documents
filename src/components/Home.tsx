
import { useNavigate } from 'react-router'



const Home = () => {
      
      const navigate = useNavigate();
    const handle = (e:any)=>{
      e.preventDefault();
            console.log(e.target.room.value)
        navigate(`/document/${e.target.room.value}`)
        // <Navigate to={`/document/${uuidV4()}`}></Navigate>
    }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center m-20 '>
   <form className='w-full h-full flex flex-col justify-center items-center m-20 p-5' onSubmit={handle} >
    <input className='w-full p-5 m-5' name="room" type='text' placeholder='Enter Room...'/> 
     <button className='w-auto h-5 border border-black p-5' type="submit"> Submit</button>
     </form>
    </div>
  )
}

export default Home