import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '.././components/Spinner.js'

const Register = () =>{
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)

    const submitHandler = async (values) =>{
        try{
            setLoading(true)
            await axios.post('/users/register',values)
            message.success('Registration Successfull')
            setLoading(false)
            navigate('/login')

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
            
           <div className=" flex justify-center border-2 p-5 bg-gray-100 rounded-xl">
            {loading && <Spinner />}
            <Form layout="vertical" onFinish={submitHandler}>
                <h1 className="text-3xl text-center">Register Form</h1>
                <Form.Item label="Name" name="name" >
                    <Input type="text" className="w-96 h-14 text-xl"/>
                </Form.Item>
                <Form.Item label="Email" name="email" >
                    <Input type="email" className="w-96 h-14 text-xl"/>
                </Form.Item>
                <Form.Item label="Password" name="password" >
                    <Input type="password" className="w-96 h-14 text-xl"/>
                </Form.Item>
                    <button className='btn btn-primary text-2xl m-auto w-96 mt-2 h-14'>Register</button>
                <div className='d-flex justify-content-between text-xl mt-4'>
                    <Link to="/login">Already Register ? Click here to login</Link>
                </div>
            </Form>
           </div>

        </div>
    )
}

export default Register