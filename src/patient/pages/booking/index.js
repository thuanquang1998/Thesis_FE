import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import departLogo from '../../assets/img/depart.png'
import hospitalLogo from '../../assets/img/hospital.png'
import location from '../../assets/img/location.png'
import price from '../../assets/img/price.png'
import './style.css'
import moment from 'moment'
import { make_appointment } from '../../../actions/patientActions'
import TimeStep from '../../components/time-step';
import ConfirmBooking from './confirm-booking';
import FormBooking from './form-booking';
import patientAPI from '../../../api/patientApi';
const timeShift=[
        { 
            time : 7,
            count: 0,
            defaultCount:5
        },
        { 
            time : 8,
            count: 0,
            defaultCount:5
        },
        { 
            time : 9,
            count: 0,
            defaultCount:5
        },
        { 
            time : 10,
            count: 0,
            defaultCount:5
        },
        { 
            time : 11,
            count: 0,
            defaultCount:5
        },
        { 
            time : 13,
            count: 0,
            defaultCount:5
        },
        { 
            time : 14,
            count: 0,
            defaultCount:5
        },
        { 
            time : 15,
            count: 0,
            defaultCount:5
        },
        { 
            time : 16,
            count: 0,
            defaultCount:5
        },
    ]
const today = new Date()
let date = [moment(today).format('YYYY-MM-DD'), moment(moment(today, "YYYY-MM-DD").add(1, 'days')).format('YYYY-MM-DD'),moment(moment(today, "YYYY-MM-DD").add(2, 'days')).format('YYYY-MM-DD')]
const PatientInfo = (props) => {
    const {doctorID} = props.match.params;
    const doctorData = props.location.state.data;

    console.log('doctorID :>> ', doctorID);
    console.log('doctorData :>> ', doctorData);

    const dispatch = useDispatch()
    const patient = useSelector(state => state.patient)   
    
    //  handle show option choose schedule for dat dum 
    const [option, setOption] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [apptDate , setApptDate] = useState(date[0])
    const [time, setTime] = useState(0)
    

    useEffect(()=> {
        getTimeWorks();
    },[])

    // get time working
    const getTimeWorks = async () => {
        try {
            const res = await patientAPI.get_time_works(doctorID);

            console.log("res",res)
        } catch (error) {
            return {
                status: "error",
                msg: error.message
            }
        }
    }

    const onChange = e => {
        setOption(e.target.value);
    };
    
    // get data inform and show modal
    const onFinish = (value) => {
        setShowModal(true)
    }

    const handleChangeDate =(e)=>{
        setApptDate(e)
    }
    const handleSetTime=(item)=>{
        setTime(item.time)
    }
    const handleReturn = () => {
        setShowModal(false)
    }
    console.log(apptDate)
    console.log(time)
    console.log(`${apptDate} ${time}:00:00`)

    const handleSubmit = () => {
        const date = `${apptDate}T${time<10 &&0}${time}:00:00`
        const dateFM = moment(date).format('YYYY-MM-DD HH:mm:ss')
        
        const appointment ={
            patientId : patient.data.id,
            doctorId : props.match.params.doctorID,
            appointmentTime : dateFM,
            price : 300000,
            sumary : 'this is sumary !',
            bookingFor: "cho nguoi than",
            forPatient : {}
        }
        dispatch(make_appointment(appointment)) 
    }
    
    return (
        <div className="patient-datkham">
            {/* breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/patient/doctor-list'>Danh sách bác sĩ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Bs. {doctorData.name}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Bs. {doctorData.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
            <div className="contentt">
                <div className="container">
                    <Card className="header-profile">
                        <Row gutter={[10,10]}>
                            <Col span={4}>
                                <div className="avatar">
                                    <img src={`http://localhost:3002/${doctorData.avatar}`} alt="logoDoctor"/>
                                </div>
                                {/* <Rate value={3} /> */}
                            </Col>
                            <Col span={14} className="infoDoctor">
                                <div className="header-info">
                                <h3>Tiến sĩ, Bác sĩ Chuyên Khoa II {doctorData.name}</h3>
                                
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="Nội tiết"/></span>
                                        <span>{doctorData.specialization.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                                        <span>{doctorData.hospitalId}</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="Nội tiết"/></span>
                                        <span>273 Lý Thường Kiệt, P5, Q8, TP.HCM</span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="Nội tiết"/></span>
                                        <span>{doctorData.price}</span>
                                    </li>
                                </ul>
                            </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="patient-info"> 
                        <h3 style={{textAlign:"center", color:"#1890ff", fontWeight:"600"}}>Thông tin lịch khám</h3>
                        <h4 style={{fontWeight:"600"}}>Chọn thời gian khám</h4>
                        <Select 
                            defaultValue={`${date[0]}`} 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={(e)=>handleChangeDate(e)}
                        >
                            <Select.Option value={`${date[0]}`}>{date[0]}</Select.Option>
                            <Select.Option value={`${date[1]}`}>{date[1]}</Select.Option>
                            <Select.Option value={`${date[2]}`}>{date[2]}</Select.Option>
                        </Select>
                        <Row gutter={[8,8]} className="lich">
                            {/* list time step */}
                            
                            {timeShift.map(item=>(
                                <button onClick={()=>handleSetTime(item)} className="time-step">{`${item.time}:00 - ${item.time+1}:00`}</button>
                            ))}
                        </Row>
                        <hr/>
                        <div className="option">
                            <Radio.Group onChange={onChange} value={option}>
                                <Radio value={false} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho bản thân</Radio>
                                <Radio value={true} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho người thân</Radio>
                            </Radio.Group>
                        </div>
                        {/* form booking */}
                        <FormBooking
                            onFinish={onFinish}
                            option={option}
                        />
                        
                        {/* Modal Confirm booking */}
                        <ConfirmBooking 
                            showModal = {showModal}
                            handleSubmit = {handleSubmit}
                            handleReturn = {handleReturn}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PatientInfo

