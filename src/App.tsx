

 import {BrowserRouter,Routes,Route,} from 'react-router-dom' 
import Editor from './components/Editor'


import Home from './components/Home'
function App() {


  return (
<BrowserRouter>
<Routes>

  
<Route path="/"  element={<Home></Home>}></Route>
  
  <Route path={`/document/:id`}  element={<Editor></Editor>}></Route>
</Routes>
   
</BrowserRouter>

    

  
  )
}

export default App
