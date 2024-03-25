import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/login';



function App() {
 

  return (
    <div>
    <BrowserRouter>
     <Routes>
       <Route path='/Home' element= {<Home/>}/>
       <Route path='/Register' element={<Register/>}/>
       <Route path="/" element= { <Login/>} />
     </Routes>
  </BrowserRouter> 
    </div>

)

}

export default App
