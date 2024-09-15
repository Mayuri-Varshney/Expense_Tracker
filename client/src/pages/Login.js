import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '.././components/Spinner.js'

const Login = () =>{

    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)

    const submitHandler = async (values) =>{
        try{
            setLoading(true)
            const {data} = await axios.post('/users/login',values)
            message.success('Login Successfull')
            setLoading(false)
            //  console.log(data);
            localStorage.setItem('user',JSON.stringify({...data,password:''}))
            navigate('/')
            
            

        }catch(error){
            setLoading(false)
            message.error("something went wrong")
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/")
        }
    },[navigate])

    return (
            <div className="register-page bg-gray-600">
            <div className="flex justify-center border-2 p-5 bg-gray-100 rounded-xl">
            {loading && <Spinner />}
            <Form layout="vertical" onFinish={submitHandler}>
                <h1 className="text-3xl text-center">Login Form</h1>
                <Form.Item label="Email" name="email" style={{ fontSize: '16px' }}>
                    <Input type="email" className="w-96 h-14 text-xl" />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" className="w-96 h-14 text-xl"/>
                </Form.Item>
                    <button className='btn btn-primary text-2xl m-auto w-96 mt-2 h-14'>Login</button>
                <div className='d-flex justify-content-between text-xl mt-4'>
                    <Link to="/register">Not a user ? Click here to register</Link>
                </div>
            </Form>

                </div>
           </div>
    )
}

export default Login