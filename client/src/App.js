import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import {useNavigate} from 'react-router-dom'



function App() {
  
  return (
    <>
        <Routes>
          <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>

    </>
  );
}

export function ProtectedRoutes(props){
  const navigate = useNavigate()
    if(localStorage.getItem("user")){
      return props.children
    }else{
      // return <Navigate to="/login" />
      return navigate("/login")
    }
}

export default App;
