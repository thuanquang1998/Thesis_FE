import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux';
import departLogo from '../../../../assets/img/depart.png'
import hospitalLogo from '../../../../assets/img/hospital.png'
import location from '../../../../assets/img/location.png'
import price from '../../../../assets/img/price.png'
import './style.css'
import moment from 'moment'
import { make_appointment } from '../../../../../redux/actions/patientActions'

import TimeStep from '../../../../components/time-step';
// import ConfirmBooking from './confirm-booking';
// import FormBooking from './form-booking';
import patientAPI from '../../../../../api/patientApi';

import BookingForm from '../../components/BookingForm';
import BookingConfirm from '../../components/BookingConfirm';

const INIT_DATA = {
    doctorId:"", 
    doctorName:"",
    patientId:"",
    representOption: {
        status: false,
        name_represent: "",
        phone_represent: "",
    },
    appointmentInfo: {
        timeworkId:'6058bd417348d080953c8b36',
        time: {},
        price: '200000',

    },
    patientInfo: {
        name:"",
        phone:"",
        gender: "",
        address: {
            province:"",
            district:"",
            ward:"",
            street: ""
        },
        birthday: null,
    },
    dateBooking: null,
    timeBooking: null,
}

const BookingPage = (props) => {
    const {doctorID} = props.match.params;
    const doctorData = props.location.state.data;
    const history = useHistory();

    const dispatch = useDispatch()
    const patient = useSelector(state => state.patient)   
    console.log('patient :>> ', patient);

    //  handle show option choose schedule for dat dum 
    const [showModal, setShowModal] = useState(false)
    const [timeWorkData, setTimeWorkData] = useState({
        status: false,
        listDate: [],
    });
    const [timeWorkDay, setTimeWorkDay] = useState(null);
    const [submitData, setSubmitData] = useState({
        ...INIT_DATA,
        doctorId: doctorID,
        patientId: patient.currentUser.patientInfo.id,
        doctorName: doctorData.name
    })
    

    useEffect(()=> {
        getTimeWorks();
    },[])

    // get time working
    const getTimeWorks = async () => {
        try {
            const res = await patientAPI.get_time_works(doctorID);
            console.log("res",res)
            if(res.data.timeTable) {
                const listTime = [...res.data.timeTable];
                // filter day > current day : lay 3 ngay: sau nay so sanh vs today
                const listTimeCurrent = listTime.filter(day=> {
                    return moment(day.date).isSameOrAfter("2021-05-21T00:00:00.000Z",'day')
                })
                let listTimeShow = [];
                if(listTimeCurrent.length < 4) {
                    listTimeShow = [...listTimeCurrent];
                } else {
                    listTimeShow = listTimeCurrent.slice(0,3);
                }
                const _timeWorkData = {
                    status: true,
                    listDate: listTimeShow
                }
                setTimeWorkData(_timeWorkData);
                setTimeWorkDay(_timeWorkData.listDate[0]);
                setSubmitData({
                    ...submitData, 
                    dateBooking:_timeWorkData.listDate[0]?.date,
                    appointmentInfo: {...submitData.appointmentInfo,
                        time: {date:_timeWorkData.listDate[0]?.date}
                    }
                });
            } else {
                setTimeWorkData({
                    ...timeWorkData,
                    status: false
                })
            }
            
        } catch (error) {
            return {
                status: "error",
                msg: error.message
            }
        }
    }
    // for represent
    const onChange = e => {
        setSubmitData({
            ...submitData,
            representOption: {...submitData.representOption, status:e.target.value}
        })
    };
    
    // get data inform and show modal
    const onFinish = (value) => {
        const patientInfo = {...value};
        setSubmitData({
            ...submitData,
            patientInfo, 
           
            representOption: {...submitData.representOption, 
                            name_represent: value.name_represent, 
                            phone_represent: value.phone_represent,}
        })
        setShowModal(true)
    }

    const onReceiveTime = (data) => {
        setSubmitData({
            ...submitData,
            timeBooking: data,
            appointmentInfo: {...submitData.appointmentInfo,
                time: data
            }
        })
    }

    const handleChangeDate =(e)=>{
        const _data = timeWorkData.listDate.filter(item=>{
            return item.date === e;
        }) 
        setSubmitData({
            ...submitData,
            dateBooking: _data[0].date
        })
        setTimeWorkDay(_data[0]);
    }
    
    const handleReturn = () => {
        setShowModal(false)
    }

    const handleSubmit = () => {
        console.log(submitData,"0000")
        dispatch(make_appointment(submitData));
        setShowModal(false);
        history.push('/')
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
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-bac-si'>Danh sách bác sĩ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Bs. {doctorData.fullName}</li>
                                </ol>
                            </nav>
                            
                            <h2 className="breadcrumb-title">Bs. {doctorData.fullName}</h2>
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
                                    <h4 className="chucDanh">{doctorData.title}</h4>
                                    <h3 className="tenBs">{doctorData.fullName}</h3>
                                {/* <h3>Tiến sĩ, Bác sĩ Chuyên Khoa II {doctorData.name}</h3> */}
                                
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="Nội tiết"/></span>
                                        <span>{doctorData.specialization.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                                        <span>{doctorData.hopitaldetails[0].name}</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="Nội tiết"/></span>
                                        <span>
                                            {`${doctorData.hopitaldetails[0].address.number}, 
                                            ${doctorData.hopitaldetails[0].address.street}, 
                                            ${doctorData.hopitaldetails[0].address.ward},
                                            ${doctorData.hopitaldetails[0].address.district},
                                            ${doctorData.hopitaldetails[0].address.city}`}
                                        </span>
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
                        {/* select day */}
                        {!timeWorkData.status?(
                            <div style={{margin:"0 auto"}}>
                                <h3>Bác sĩ hiện không có lịch khám</h3>
                            </div>
                        ):
                        (
                            <>
                            <Select 
                                defaultValue={`Hôm nay, ${moment(timeWorkData.listDate[0].date).format('DD/MM')}`} 
                                style={{ width: 200, border:"none" }} 
                                className="chooseDay"
                                onChange={(e)=>handleChangeDate(e)}
                            >
                                {timeWorkData.listDate.map((item, idx)=> {
                                    let value = "";
                                    switch (idx) {
                                        case 0:
                                            value = `Hôm nay, ${moment(item.date).format('DD/MM')}`;
                                            break;
                                        case 1:
                                            value = `Ngày mai, ${moment(item.date).format('DD/MM')}`;
                                            break;
                                        case 2:
                                            value = `Ngày kia, ${moment(item.date).format('DD/MM')}`;
                                            break;
                                        default:
                                            value = "";
                                            break;
                                    }
                                    return (<Select.Option key={idx} value={item.date}>{value}</Select.Option>)
                                })}
                            </Select>
                            <Row gutter={[8,8]} className="lich">
                                <TimeStep data={timeWorkDay} receiveTime={onReceiveTime}/>
                            </Row>
                            </>
                        )}
                        
                        <hr/>
                        <div className="option">
                            <Radio.Group onChange={onChange} value={submitData.representOption.status}>
                                <Radio value={false} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho bản thân</Radio>
                                <Radio value={true} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho người thân</Radio>
                            </Radio.Group>
                        </div>
                        {/* form booking */}
                        <BookingForm
                            onFinish={onFinish}
                            option={submitData.representOption.status}
                        />
                       
                        {/* Modal Confirm booking */}
                        <BookingConfirm
                            showModal = {showModal}
                            data = {submitData}
                            handleSubmit = {handleSubmit}
                            handleReturn = {handleReturn}
                        />
                       
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default BookingPage

