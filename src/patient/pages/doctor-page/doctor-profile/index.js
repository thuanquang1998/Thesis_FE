import { Button, Card, Col, Rate, Row, Select, Tabs } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { Link , useLocation, useHistory} from 'react-router-dom'
import logoDoctor from '../../../assets/img/bsnam.jpg'
import departLogo from '../../../assets/img/depart.png'
import hospitalLogo from '../../../assets/img/hospital.png'
import location from '../../../assets/img/location.png'
import price from '../../../assets/img/price.png'
import './style.css'
const { TabPane } = Tabs;
const DoctorInfo = (props) => {
    // console.log(props.match.params)
    const history = useHistory();
    const data = history.location.state.data;
    console.log('data DoctorInfo:>> ', data.hopitaldetails);
    return (
        <div>
            {/* breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/patient/dsbacsi'>Danh sách bác sĩ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{`${data.title} ${data.fullName}`}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">{`${data.title} ${data.fullName}`}</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
            <div className="content">
                <div className="container doctor-profile-css">
                    <Card className="header-profile">
                        <Row>
                            <Col sm={{span:4, offset:10}} md={{span:4,offset:0}} lg={{span:3}} className="logoDoctor">
                                <div>
                                    <img src={logoDoctor} alt="logo"/>
                                </div>
                            </Col>
                            <Col sm={{span:24}} md={{span:15}} className="infoDoctor">
                                <h3 className="titlee">
                                    {`${data.title} ${data.fullName}`}
                                </h3>
                                <Rate value={3} />
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="Nội tiết"/></span>
                                        <span>{data.specialization.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                                        <span>{data.hopitaldetails[0].name}</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="Nội tiết"/></span>
                                        <span>
                                            {`${data.hopitaldetails[0].address.number}, 
                                            ${data.hopitaldetails[0].address.street}, 
                                            ${data.hopitaldetails[0].address.ward},
                                            ${data.hopitaldetails[0].address.district},
                                            ${data.hopitaldetails[0].address.city}`}
                                    </span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="Nội tiết"/></span>
                                        <span>{data.price}</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={{span:24, offset:8}} sm={{span:4, offset:10}} md={{span:5, offset:0}} style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                               <Link to={`/patient/doctor-list/${props.match.params.doctorID}/datlich`}>
                                <Button type="primary" style={{borderRadius:"20px"}}>Đặt lịch khám</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Card>
                    {/* new content */}
                    <Card className="doctor--profile__intro">
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="Giới thiệu" key="1">
                                Giới thiệu
                                Bác sĩ Chuyên khoa I HUỲNH THANH HẢI Là thành viên trong nhóm can thiệp mạch vành của Bệnh viện Thống Nhất. Với hơn 30 năm kinh nghiệm điều trị bệnh tim mạch, nội tổng quát.
                                Quá trình học vấn:
                                BS CK I Nội tổng quát, Siêu âm tim mạch máu, Nội soi tiêu hóa
                                Quá trình công tác:
                                Bác sĩ khoa Nội tim mạch bệnh viện Thống Nhất TP.HCM
                                Trưởng khoa Nội bệnh viện Vũ Anh TP.HCM
                                Trưởng khoa Nội bệnh viện Phúc An Khang TP.HCM
                                Trưởng khoa Hồi sức cấp cứu tại bệnh viện Đa khoa Tân Hưng TP.HCM
                                Điểm nổi bật:
                                Bác sĩ Huỳnh Thanh Hải từng tham gia các lớp học siêu âm mạch máu, lớp can thiệp mạch vành tại Singapore.
                                Nhận tư vấn miễn phí và miễn phí đo điện tim cho khách hàng 50 tuổi trở lên.
                                Nhận khám và điều trị tại nhà.
                                Nhận khám và tư vấn cho người nước ngoài (ngôn ngữ tiếng Anh).
                                Trang thiết bị phòng khám:
                                Phòng khám ngoài giờ của bác sĩ Hải có đầy đủ các trang thiết bị như: máy đo điện tim, máy đo huyết áp, máy đo đường huyết, máy phun khí dung,...hỗ trợ trong việc tư vấn và điều trị các bệnh lý về tim mạch, tiểu đường, tiêu hóa, hô hấp,...
                            </TabPane>
                            <TabPane tab="Vị trí" key="2">
                                <div class="mapouter" style={{position:"relative", textAlign:'center',margin:'0 auto',width:'600px', height:"400px"}}>
                                    <div class="gmap_canvas" style={{overflow:'hidden', background:'none', width:'100%', height:'100%'}}>
                                        <iframe 
                                            className="gmap_iframe" 
                                            style={{width:'100%', height:'100%'}} 
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.490720504262!2d106.65472031496678!3d10.773677562190034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec114d1acab%3A0x850da53a5df7f2e2!2zMjczIEzDvSBUaMaw4budbmcgS2nhu4d0LCBQaMaw4budbmcgMTUsIFF14bqtbiAxMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1610375720290!5m2!1sen!2s">
                                        </iframe>
                                        </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Đánh giá" key="3">
                                <h4 style={{display:"none"}}>Chưa có đánh giá </h4>
                                <div className="review__item">
                                    <div className="review__item--header">
                                        <div className="review__header--left"><i class="far fa-user"></i></div>
                                        <div className="review__header--right">Lưu Quang Thuận <span>Đã khám bệnh tại hệ thống</span></div>
                                    </div>
                                    <div className="review__item--rating"><Rate value={4}/></div>
                                    <div className="review__item--comment"><p>Bác sĩ khám bệnh nhiệt tình</p></div>
                                </div>

                                <Card>
                                    <h4>Nhận xét</h4>
                                    <Rate value={0}/>
                                    Bạn đã sử dụng dịch vụ của Bác sĩ Chuyên khoa I HUỲNH THANH HẢI. Hãy chia sẽ những nhận xét của bạn.
                                   <TextArea></TextArea>
                                </Card>
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default DoctorInfo
