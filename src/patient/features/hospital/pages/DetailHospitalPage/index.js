import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import backgroundHospital from '../../../../assets/img/hospital_background.jpg';
import logoHospital from '../../../../assets/img/hospital_logo.png';
import DoctorList from '../../../doctor/components/DoctorList';
import './style.css';


const DetailHospitalPage = () => {
    const location = useLocation();
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const [renderDoctor, setRenderDoctor] = useState([]);
    const data = location.state;
    // const address = data.address.number +', '+data.address.street+', '+data.address.ward+', '+data.address.district+', '+data.address.city
    useEffect(()=>{
        let _renderData = [];
        if(loadingData===0 && appState.listAllDoctors.length!==0) {
            const _doctor = [...appState.listAllDoctors];
            _renderData = _doctor.filter((item,idx)=>{
                return item.hospital_info._id.toLowerCase().includes(data.id.toLowerCase())===true;
            })
        } else {
            _renderData=[];
        }
        setRenderDoctor(_renderData);
    },[appState])
    return (
        <div>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-benh-vien'>Danh sách phòng khám</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{data.name}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">{data.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
        <div className="content">
                <div className="container-fluid">
                    <div className="profile">
                        <div className="profile__img">
                                <img src={backgroundHospital} alt="background hospital"/>
                        </div>
                        <div className="info">
                            <Row>
                                <Col xs={{span:10}} sm={{span:7}} md={{span:5}} lg={{span:4}}>
                                    <div className="profile__logo">
                                        <img src={logoHospital}></img>
                                    </div>
                                </Col>
                                <Col xs={{span:14}} sm={{span:17}} md={{span:19}} lg={{span:20}}>
                                    <h3 className="title">{data.name}</h3>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            <Card title="Thông tin cơ bản" headStyle={{fontSize:"18px", color:"#1890ff"}} className="info-title">
                                    <ul style={{listStyleType:"none", paddingLeft:"5px"}}>
                                        <li>
                                            <span><RoomIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                            {data.address||""}
                                        </li>
                                        <li>
                                            <span><PhoneIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                           {data.phone||""}
                                        </li>
                                    </ul> 
                                </Card> 
                                <Card title="Giới thiệu" headStyle={{fontSize:"18px", color:"#1890ff"}} className="intro">
                                    <p style={{fontSize:"17px"}}>Chúng tôi là 1 phòng khám đa khoa tọa lạc tại 26-28, Tăng Bạt Hổ, P.12, Q.5, TPHCM. Với đầy đủ trang thiết bị cận lâm sàng ( X-Quang, Siêu âm, xét nghiệm máu, nội soi...), máy tập vật lý trị liệu, và có cả phòng ốc khang trang cho khách xa nghỉ lại.   
                                        Với sứ mệnh “y đức trọn niềm tin” Khánh Minh sẽ là nơi đáng tin cậy để chăm sóc sức khỏe cho gia đình bạn và sẵn sàng đồng hành chia sẽ những giải pháp bảo vệ sức khỏe cho cả nhà bạn!!!  
                                        Cám ơn sự tin tưởng của quí khách, Khánh Minh luôn làm tròn Y Đức!</p>
                                    <p>{data.about}</p>
                                    
                                </Card> 
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <Card>
                                Search form
                            </Card>
                            <DoctorList doctors={renderDoctor}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailHospitalPage
