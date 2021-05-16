import { Card } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { make_appointment } from '../../../../../redux/actions/patientActions';
import BookingConfirm from '../../components/BookingConfirm';
import BookingForm from '../../components/BookingForm';
import HeaderProfile from '../../components/HeaderProfile';
import './style.css';

const INIT_DATA = {
    patientId: "",
    doctorId: "",
    bookingFor: false, 
    bookerInfo: {
        name: "",
        phone: ""
    },
    date:"",
    time: "",    
    room: "",
    patientInfo: {
        name: "",
        phone: "",
        birthDay: "",
        gender: "",
        medicalRecordSumanry: "",
        address: ""
    }
}

const BookingPage = (props) => {
    const {doctorID} = props.match.params;
    const doctorData = props.location.state.data;
    console.log('doctorData :>> ', doctorData);
    const history = useHistory();

    const dispatch = useDispatch()
    const patient = useSelector(state => state.patient)   


    //  handle show option choose schedule for dat dum 
    const [showModal, setShowModal] = useState(false)
    const [submitData, setSubmitData] = useState({
        ...INIT_DATA,
        doctorId: doctorID,
        patientId: patient.currentUser.patientInfo.id,
        doctorName: doctorData.fullName
    })
   
    const handleReturn = () => {
        setShowModal(false)
    }

    // onHandleSubmitForm
    const onHandleSubmitForm = (data) => {
        console.log('data :>> ', data);
        // showModal, showÌno
        setSubmitData(data);
        setShowModal(true)
    }

    const handleSubmit = () => {
        dispatch(make_appointment(submitData));
        setShowModal(false);
        history.push('/');
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
                    <HeaderProfile data={doctorData}/>

                    <Card className="patient-info"> 
                        <h3 style={{textAlign:"center", color:"#1890ff", fontWeight:"600"}}>Thông tin lịch khám</h3>
                        <h4 style={{fontWeight:"600"}}>Chọn thời gian khám</h4>
                        {/* select day */}
                        {doctorData.timeWorkIsNull?(
                            <div style={{margin:"0 auto"}}>
                                <h3>Bác sĩ hiện không có lịch khám</h3>
                            </div>
                        ):
                        (
                            <BookingForm
                                submitData={submitData}
                                onSubmitForm={onHandleSubmitForm}
                                doctorId={doctorID}
                            />
                        )}
                    </Card>
                     {/* Modal Confirm booking */}
                    <BookingConfirm
                        showModal = {showModal}
                        data = {submitData}
                        handleSubmit = {handleSubmit}
                        handleReturn = {handleReturn}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingPage

