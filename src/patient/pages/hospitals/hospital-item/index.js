import React from 'react'
import location from '../../../assets/img/location.png'
import logoDoctor from '../../../assets/img/bsnam.jpg'
import { Card, Button, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
const HospitalItem = (props) => {
    console.log(props.data,"9999999999999999999999");
    const data = props.data
    const address = props.data.address.number +', '+props.data.address.street+', '+props.data.address.ward+', '+props.data.address.district+', '+props.data.address.city
    return (
        <Card style={{marginTop:"30px", borderRadius:"10px", boxShadow:"5px 5px 13px rgba(0, 0, 0, 0.1)"}}>
            <Row> 
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Col span={6}>
                            <img src={data.logo} alt="" style={{width:"100%", height:"100%",objectFit:"cover"}}/>
                        </Col>
                        <Col span={17} offset={1}>
                            <Link><h3 style={{color:"#0096d4"}}>{data.name}</h3></Link>
                            <div>
                                <span><i class="fas fa-map-marker-alt" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px", color:"#17a6df"}}></i></span>
                                <span>{address}</span>
                            </div>
                            <div>
                                <span><i class="fas fa-phone" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px", color:"#17a6df"}}></i></span>
                                <span>{data.phone}</span>
                            </div>
                        </Col>
                    </Row>
                    <Link to='/patient/cosoyte/profile'>
                        <Button type="primary" style={{position:"relative", left:"40%"}}>Đặt khám</Button>  
                    </Link>
                </Col>
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%", paddingLeft:"25px", borderLeft:"2px solid #31b9f2", display:"block"}}>
                    <h4 style={{position:"relative",left:"40%", color:"#0096d4"}}>Giới thiệu</h4>
                    <p
                        style={{
                            textAlign:"justify",
                            fontSize:'17px',
                            display:'-webkit-box',
                            WebkitBoxOrient:"vertical",
                            WebkitLineClamp:"4",
                            overflow:"hidden",
                            textOverflow:'ellipsis'
                        }}
                        >{data.about}</p>
                    <Link to="/patient/cosoyte/profile">Xem thêm...</Link>
                </Col>
            </Row>
        </Card>
    )
}

export default HospitalItem
