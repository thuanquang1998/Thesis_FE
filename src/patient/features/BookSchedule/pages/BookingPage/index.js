import { Card } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { make_appointment } from '../../../../../redux/actions/patientActions';
import BookingConfirm from '../../components/BookingConfirm';
import BookingForm from '../../components/BookingForm';
import HeaderProfile from '../../components/HeaderProfile';
import patientAPI from '../../../../../api/patientApi';
import { SwalAlert } from '../../../../../utils/alert';
import LoadingTop from '../../../../components/loadingTop';

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

    const [loadingPage, setLoadingPage] = useState(false);
   
    const handleReturn = () => {
        setShowModal(false)
    }

    // onHandleSubmitForm
    const onHandleSubmitForm = (data) => {
        setSubmitData(data);
        setShowModal(true)
    }

    const handleSubmit = async () => {
        setLoadingPage(true);
        // dispatch(make_appointment(submitData));
        try {
            const response = await patientAPI.make_appointment(submitData);
            console.log('response :>> ', response);
            if(response.error) {
                if(response.errors[0].message==="Appointment already existed in day") 
                    throw "Appointment already existed in day"
                throw new Error("Can't make_appointment");
            }
            setTimeout(() => {
                setLoadingPage(false);
                SwalAlert( `?????t l???ch kh??m th??nh c??ng.` ,'', 'success')
                setShowModal(false);
                history.push('/quan-li-lich-kham');
            }, 300);
        } catch (error) {
            setTimeout(() => {
                setLoadingPage(false);
                if(error === "Appointment already existed in day") {
                    SwalAlert( `Ch??? ???????c ?????t t???i ??a 1 l???ch trong 1 ng??y v???i 1 b??c s??.` ,'', 'error')
                } else {
                    SwalAlert( `L???i k???t n???i m???ng. Th??? l???i sau ??t ph??t.` ,'', 'error')
                }
            }, 300);
        }
    }

    return (
        <div className="patient-datkham">
            {loadingPage && <LoadingTop/>}
            {/* breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang ch???</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-bac-si'>Danh s??ch b??c s??</Link></li>
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
                        <h3 style={{textAlign:"center", color:"#1890ff", fontWeight:"600"}}>Th??ng tin l???ch kh??m</h3>
                        <h4 style={{fontWeight:"600"}}>Ch???n th???i gian kh??m</h4>
                        {/* select day */}
                        {doctorData.timeWorkIsNull?(
                            <div style={{margin:"0 auto"}}>
                                <h3>B??c s?? hi???n kh??ng c?? l???ch kh??m</h3>
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
                        data = {{...submitData,address:doctorData.hospital_info.address}}
                        handleSubmit = {handleSubmit}
                        handleReturn = {handleReturn}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingPage

