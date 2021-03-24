import PhoneIcon from '@material-ui/icons/Phone'
import RoomIcon from '@material-ui/icons/Room'
import { Button, Card, Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import backgroundHospital from '../../../assets/img/hospital_background.jpg'
import logoHospital from '../../../assets/img/hospital_logo.png'
import './style.css'
const HospitalProfile = () => {
    return (
        <div>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/patient/clinic'>Danh sách phòng khám</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Phòng khám SVCare</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Phòng khám SVCare</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
            <div className="content hospital-profile">
                <div className="container">
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
                                    <h3 className="title">Bệnh viện Đại học y dược TP.HCM</h3>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="main_profile">
                        <Row gutter={[16,16]}>
                            <Col span={8}>
                                <Card title="Thông tin" headStyle={{fontSize:"18px", color:"#1890ff"}} className="info-title">
                                    <ul style={{listStyleType:"none", paddingLeft:"5px"}}>
                                        <li>
                                            <span><RoomIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                            273 Lý Thường Kiệt, quận 10, Thành Phố Hồ Chí Minh
                                        </li>
                                        <li>
                                            <span><PhoneIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                           0975585249
                                        </li>
                                    </ul> 
                                </Card> 
                                <div className="info-button">
                                    <Row gutter={[8,8]}>
                                        <Col span={12}>
                                            <Card className="card_ck">
                                                <h5>Chuyên khoa</h5>
                                                <div className="chuyekhoa">
                                                    <div className="left"><h1>3</h1></div>
                                                    <div><img src="" alt=""/></div>
                                                </div>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card>
                                                <h5>Đội ngũ bác sĩ </h5>
                                                <div className="chuyekhoa">
                                                    <div className="left"><h1>3</h1></div>
                                                    <div><img src="" alt=""/></div>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={16}>
                                <Card title="Giới thiệu" headStyle={{fontSize:"18px", color:"#1890ff"}} className="intro">
                                    <p style={{fontSize:"17px"}}>Chúng tôi là 1 phòng khám đa khoa tọa lạc tại 26-28, Tăng Bạt Hổ, P.12, Q.5, TPHCM. Với đầy đủ trang thiết bị cận lâm sàng ( X-Quang, Siêu âm, xét nghiệm máu, nội soi...), máy tập vật lý trị liệu, và có cả phòng ốc khang trang cho khách xa nghỉ lại.   
                                        Với sứ mệnh “y đức trọn niềm tin” Khánh Minh sẽ là nơi đáng tin cậy để chăm sóc sức khỏe cho gia đình bạn và sẵn sàng đồng hành chia sẽ những giải pháp bảo vệ sức khỏe cho cả nhà bạn!!!  
                                        Cám ơn sự tin tưởng của quí khách, Khánh Minh luôn làm tròn Y Đức!</p>
                                    
                                </Card> 
                                <Card title="Chuyên khoa"  headStyle={{fontSize:"18px", color:"#1890ff"}} className="ck">
                                    <div className="ck-item">
                                        <div className="ck-name">
                                            <div className="ck-logo"><img src="" alt=""/></div>
                                            <h3>Y học cổ truyền</h3>
                                        </div>
                                        <Button>Đặt khám</Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default HospitalProfile
