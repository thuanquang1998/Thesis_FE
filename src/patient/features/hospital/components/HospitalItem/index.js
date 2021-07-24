import { Button, Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoBv from '../../../../assets/img/logobv.jpg';

const HospitalItem = (props) => {
    const data = props.data;
    const [imageError, setImageError] = useState(false);
    return (
        <Card style={{marginTop:"30px", borderRadius:"10px", boxShadow:"5px 5px 13px rgba(0, 0, 0, 0.1)"}}>
            <Row> 
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Col span={6}>
                            <img 
                                src={imageError?data.logo:logoBv} 
                                onError={()=>setImageError(true)}
                                alt="" 
                                style={{width:"100%", height:"100%",objectFit:"cover"}}
                            />
                        </Col>
                        <Col span={17} offset={1}>
                            <Link to="#"><h3 style={{color:"#0096d4"}}>{data.name}</h3></Link>
                            <div>
                                <span><i className="fas fa-map-marker-alt" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px", color:"#17a6df"}}></i></span>
                                <span>{data.address}</span>
                            </div>
                            <div>
                                <span><i className="fas fa-phone" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px", color:"#17a6df"}}></i></span>
                                <span>{data.phone}</span>
                            </div>
                        </Col>
                    </Row>
                    <Button type="primary" style={{position:"relative", left:"40%"}}>
                        <Link 
                                to={{
                                    pathname:`/chi-tiet-benh-vien/${data._id}`,
                                    state: data 
                                }}
                        >Đặt khám
                        </Link>
                    </Button>  
                </Col>
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%", paddingLeft:"25px", borderLeft:"2px solid #31b9f2", display:"block"}}>
                    <h4 style={{position:"relative",left:"40%", color:"#0096d4"}}>Giới thiệu</h4>
                        <div 
                            dangerouslySetInnerHTML={{__html: data.about}}
                            style={{
                                textAlign:"justify",
                                fontSize:'17px',
                                display:'-webkit-box',
                                WebkitBoxOrient:"vertical",
                                WebkitLineClamp:"4",
                                overflow:"hidden",
                                textOverflow:'ellipsis'
                            }}
                        />
                    <Link 
                        to={{
                            pathname:`/chi-tiet-benh-vien/${data._id}`,
                            state: data
                        }}
                    >Xem thêm...</Link>
                </Col>
            </Row>
        </Card>
    )
}

export default HospitalItem
