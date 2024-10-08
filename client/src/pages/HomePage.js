import React,{useState,useEffect} from 'react'
import {Modal,Form,Input,Select,message,Table,DatePicker} from 'antd'
import {UnorderedListOutlined,AreaChartOutlined} from '@ant-design/icons'
import Layout from './../components/Layout/Layout'
import axios from 'axios'
 import Spinner from '.././components/Spinner.js'
 import moment from "moment"
import Analytics from '../components/Analytics.js'
const {RangePicker} = DatePicker;



const HomePage = () =>{
    const [showModal,setShowModal] = useState(false)
     const [loading,setLoading]= useState(false)
    const[selectedDate,setSelectedDate] = useState([])
    const [frequency,setFrequency] = useState('7')
    const [allTransaction,setAllTransaction] = useState([])
    const [viewData,setViewData]=useState('table')
    const [type,setType]=useState('all')

    //table data
const columns=[
    {
        title:'Date',
        dataIndex:'date',
        render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
        title:'Amount',
        dataIndex:'amount'
    },
    {
        title:'Type',
        dataIndex:'type'
    },
    {
        title:'Category',
        dataIndex:'category'
    },
    {
        title:'Reference',
        dataIndex:'reference'
    },
    {
        title:'Actions',
        
    },

]

    
    useEffect(()=>{
        const getAllTransaction = async () =>{
            try{
                
                const user=JSON.parse(localStorage.getItem('user'))
                setLoading(true)
                // console.log(user);
                const res=await axios.post('/transactions/get-transaction',{userid:user._id,frequency,selectedDate,type})
                console.log(res.data);
                console.log("get all transaction working till here")
                 setLoading(false)
                
                setAllTransaction(res.data)
                // console.log(res.data)
                
            }catch(error){
                console.log(error)
                message.error('Fetch issue with transaction')
            }
        }
        getAllTransaction()
    },[frequency,selectedDate])

    const handleSubmit = async (values) =>{
        
        try{
            const user=JSON.parse(localStorage.getItem('user'))
             setLoading(true)
            await axios.post('/transactions/add-transaction',{...values,userid:user._id})
            message.success('Transaction Added successfully')
            setLoading(false)
            setShowModal(false)
        }catch(error){
            setLoading(false)
            
            message.error('Transaction addition failed')
        }

    }
    return (
        <Layout>
             {loading && <Spinner />} 
            <div className='filters'>
                <div>
                    <h6>Select Frequency</h6>
                    <Select value={frequency} onChange={(values)=>setFrequency(values)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="31">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)} />)}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values)=>setType(values)}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                        
                    </Select>
                    {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)} />)}
                </div>
                <div className="switch-icons">
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('table')}/>
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>
               </div>
                <div>
               {/* <div className="mx-2">
                    <UnorderedListOutlined className="mx-2"/>
                    <AreaChartOutlined className="mx-2"/>
               </div> */}
        
                    <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add New</button>
                </div>
            </div>

            <div className='content h-2/5 border-2 p-1'>
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction}/> : <Analytics allTransaction={allTransaction}/>}
                {/* <Table columns={columns} dataSource={allTransaction}/> */}
            </div>

            <Modal title="Add Transaction" open={showModal} onCancel={()=> setShowModal(false)} footer={false}>
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="type" name="type">
                        <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                        
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="tip">Tip</Select.Option>
                        <Select.Option value="project">Project</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="bills">Bills</Select.Option>
                        <Select.Option value="fees">Fees</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="shopping">Shopping</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className='btn btn-primary'>SAVE</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage