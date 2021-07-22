import { Button, Card, Col, Row } from 'antd';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import doctorAPI from '../../../api/doctorAPI';
import IMG01 from '../../assets/images/doctor-thumb-02.jpg';
import DoctorSidebar from '../../components/DoctorSideBar';
import LoadingTop from '../../components/loadingTop';
import './style.css';
import UpdateProfileDoctor from './UpdateProfileDoctor';


const DoctorProfile = (props) =>{
    const doctor = useSelector(state=> state.doctor);
    const doctorId = doctor.currentDoctor.doctor._id;
    const { enqueueSnackbar} = useSnackbar();
    const [doctorData, setDoctorData ] = useState({});
    const [loadingPage, setLoadingPage] = useState(true);
    const [initData, setInitData] = useState({
        about: "",
    });
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })

    useEffect(()=> {
        setLoadingPage(true);
        getDoctorById();
    },[])

    const getDoctorById = async () => {
        const id = doctorId;
        try {
            const response = await doctorAPI.get_doctors_by_id(id);
            if(response.error) throw new Error("error getDoctorById");
            const _data = response.data.data[0];
            setDoctorData({..._data});
            const birthday = moment(_data.birthday);
            const obj = {
                fullName: _data.fullName,
                email: _data.email,
                phone: _data.phone,
                gender: _data.sex,
                title: _data.title,
                about: _data.about,
                birthday: birthday,
            }
            setInitData({...obj});
        } catch (error) {
            console.log('error getDoctorById:>> ', error);
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 300);
    }

    const handleUpdateProfile = (dataSubmit) => {
        setLoadingPage(true);
        updateDoctorProfileApi(dataSubmit);
    }
    const updateDoctorProfileApi = async (data) => {
        try {
            const response = await doctorAPI.update_doctor_info({data,id:doctorId});
            if(response.error) throw new Error("error updateDoctor");
            enqueueSnackbar('Cập nhật thành công.', {variant: 'success'});
            getDoctorById(doctorId);
            setTimeout(() => {
                setLoadingPage(false);
                setModalData({
                    ...modalData, 
                    visible:false, 
                })
            },400)
        } catch (error) {
            console.log('error :>> ', error);
            enqueueSnackbar('Cập nhật không thành công', {variant: 'error'});
            setLoadingPage(false);
        }
    }
    const handleUpdateDoctor = async () => {
		setLoadingPage(true)
		try {
            const response = await doctorAPI.get_doctors_by_id(doctorId);
            if(response.error) throw new Error("error getDoctorById");
            const _data = response.data.data[0];
            const birthday = moment(_data.birthday);
            const obj = {
                fullName: _data.fullName,
                email: _data.email,
                phone: _data.phone,
                gender: _data.sex,
                title: _data.title,
                about: _data.about,
                birthday: birthday,
            }
            setInitData({...obj});
			setTimeout(() => {
				setModalData({...modalData, visible:true, data: {...obj}})
			},300)

        } catch (error) {
            console.log('error getDoctorById:>> ', error);
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 300);

	}
    console.log('doctorData :>> ', doctorData);
    return(
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Thông tin tài khoản</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Thông tin tài khoản</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                {/* <img
                    src={doctorData.avatar}
                    onLoad={()=>console.log("loading image 111111111111111111")}
                    onError={()=>console.log("loading image  false 2222222222222222222222")}
                /> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorSidebar />
                            </StickyBox>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <div style={{display: 'flex', justifyContent:"space-between"}}>
                                <h2>Thông tin cá nhân</h2>
                                <Button  
                                    // onClick={()=>setModalData({...modalData, visible:true, data: {...doctorData}})}
                                    onClick={()=>handleUpdateDoctor()}
                                    style={{
                                        backgroundColor: "#00d0f1",
                                        border: "none",
                                        fontWeight: "bold",
                                        color: "white",
                                        fontSize:"15px",
                                    }}
                                >
                                    Cập nhật thông tin
                                </Button>
                            </div>
                            <Card>
                                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin chi tiết:</h4>
                                {doctorData && 
                                <Row gutter={[20,20]}>
                                    <Col sm={{span:24}} md={{span:10}}>
                                        <div style={{width:"300px", height:"300px"}}>
                                            <img 
                                                src={doctorData.avatar||IMG01} 
                                                alt="doctorAvatar"
                                                style={{width:"100%", height:"100%"}}
                                            >
                                            </img>
                                        </div>
                                    </Col>
                                    <Col sm={{span:24}} md={{span:14}}>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Tên bác sĩ:</div>
                                            <div className="col-sm-9">{doctorData.fullName}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Chức danh:</div>
                                            <div className="col-sm-9">{doctorData.title}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Tên bệnh viện:</div>
                                            <div className="col-sm-9">{doctorData.hospital_info?.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Chuyên khoa:</div>
                                            <div className="col-sm-9">{doctorData.spec_detail?.name}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Địa chỉ:</div>
                                            <div className="col-sm-9">{doctorData.hospital_info?.address}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Ngày sinh:</div>
                                            <div className="col-sm-9">{moment(doctorData.birthday).format("DD/MM/YY")}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Giới tính:</div>
                                            <div className="col-sm-9">{doctorData.sex==='male'?'Nam':'Nữ'}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Email:</div>
                                            <div className="col-sm-9">{doctorData.email}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3 text-muted text-sm-left mb-0 mb-sm-3">Số điện thoại:</div>
                                            <div className="col-sm-9">{doctorData.phone}</div>
                                        </div>
                                    </Col>
                                </Row>}
                            </Card>

                             <Card style={{marginTop:"30px"}}>
                                {doctorData && 
                                <>
                                    <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Giới thiệu:</h4>
                                    
                                    <ReactQuill 
                                        theme="bubble"
                                        value={`${doctorData.about}`}
                                        readOnly={true}
                                    />
                                </>}
                            </Card>
                            <UpdateProfileDoctor
                                modalData={modalData}
                                initData = {initData}
                                handleOk={()=>{
                                    setModalData({
                                        ...modalData,
                                        visible: !modalData.visible,
                                    })
                                }}
                                handleClose={()=>{
                                    setInitData({...doctorData})
                                    setModalData({
                                        ...modalData,
                                        visible: !modalData.visible,
                                    })
                                    
                                }}
                                handleUpdateProfile={handleUpdateProfile}
                                onChangeAbout={(data)=>setInitData({...initData, about:data})}
                            />
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
    }


export default DoctorProfile;
     