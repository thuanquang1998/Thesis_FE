import React from 'react'
import {Row, Col} from 'antd'
import './style.css'
const Advertisement  = () => {
    return (
        <section className="section section-adv">
            <div className="container-fluid">
                <div className="section-header text-center" style={{paddingTop:"50px"}}>
                    <h2>Vì sao nên chọn BKCare?</h2>
                    <hr style={{width:"270px"}}/>
                </div>
                <div className="advertisement">
                    <Row gutter={[20, 20]} justify="center">
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                            <div className="chooseItem">
                                <div className="chooseLogo">
                                    <span className="material-icons">
                                    person
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>BÁC SĨ UY TÍN</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Mạng lưới bác sĩ chuyên khoa giỏi đã/đang công tác tại các viện lớn hàng đầu, với thông tin đã xác thực.</p>
                                </div>
                            </div>
                            
                        </Col>
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                            <div className="chooseItem">
                                <div className="chooseLogo">
                                    <span className="material-icons">
                                        verified_user
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>ĐÚNG NGƯỜI ĐÚNG BỆNH</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Đầy đủ các chuyên khoa, thông tin bác sĩ chi tiết, các bài hướng dẫn dễ hiểu, người bệnh dễ dàng lựa chọn bác sĩ phù hợp.</p>
                                </div>
                            </div>
                        </Col>
                        
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                             <div className="chooseItem">
                                <div className="chooseLogo">
                                    <span className="material-icons">
                                        headset_mic
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>HỖ TRỢ CHU ĐÁO</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Chúng tôi hỗ trợ bệnh nhân trong suốt quá trình trước khám, trong khi đi khám và sau khi đi khám một cách hiệu quả.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                            <div className="chooseItem">
                                <div className="chooseLogo">
                                    <span className="material-icons">
                                        alarm
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>ĐẶT LỊCH 24/7</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Lịch khám của bác sĩ hiển thị 24/7 giúp bạn chủ động lựa chọn lịch khám phù hợp.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                            <div className="chooseItem">
                                <div className="chooseLogo">
                                    <span className="material-icons">
                                        savings
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>MIỄN PHÍ ĐẶT LỊCH</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Đặt khám qua BookingCare là miễn phí đặt lịch. Chi phí khám chữa bệnh, bạn thanh toán trực tiếp tại nơi khám.</p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={{span:"24"}} md={{span:"8"}} className="col-whyChoose">
                            <div className="chooseItem">
                                <div className="chooseLogo" style={{textAlign:"center"}}>
                                    <span className="material-icons">
                                        favorite_border
                                    </span>
                                </div>
                                <div className="chooseTitle">
                                    <h4>KHÁM LẠI MIỄN PHÍ</h4>
                                </div>
                                <div className="chooseContent">
                                    <p>Nếu người bệnh không hài lòng với qui trình khám, tư vấn và phương án điều trị của bác sĩ.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    )
}

export default Advertisement
