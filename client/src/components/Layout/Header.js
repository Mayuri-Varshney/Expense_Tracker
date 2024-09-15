import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {message} from 'antd'

const Header=()=>{

  const navigate = useNavigate()
  const [loginUser,setLoginUser] = useState('')
  useEffect(()=>{
      const user= JSON.parse(localStorage.getItem('user'))
      //console.log(user);
      if (user && user.name) {
        // const { _id, name, email, password } = user;
        const {name} = user;
        console.log(name);
        // console.log(name);
        setLoginUser(name);
      }
  },[]);

  const logoutHandler = () =>{
      localStorage.removeItem("user")
      navigate('/login')
      message.success("Logout successfully")
  }
    return (
        <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
        <Link className="navbar-brand" to="/">Expense Management</Link>
        <h2 className="nav-item mx-4 mt-2">
          <p className='ml-100 mt-3'>{loginUser}</p>
        </h2>
    <button className="btn btn-primary bg-black h-10 ml-80" onClick={logoutHandler}>
          Logout
        </button>
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button> */}
    {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
      </ul>
    </div> */}
  </div>
</nav>

        </>
    )
}

export default Header