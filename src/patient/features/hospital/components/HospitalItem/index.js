import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {set_current_hospital} from '../../../../../redux/actions/patientActions';
import ReactQuill from 'react-quill' // ES6

const HospitalItem = (props) => {
    const dispatch = useDispatch();
    const data = props.data;
    console.log('props.data :>> ', props.data);
    const handleShowHospital = () => {
        // dispatch(set_current_hospital(data.id));
    }
    return (
        <Card style={{marginTop:"30px", borderRadius:"10px", boxShadow:"5px 5px 13px rgba(0, 0, 0, 0.1)"}}>
            <Row> 
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Col span={6}>
                            <img src={data.logo} alt="" style={{width:"100%", height:"100%",objectFit:"cover"}}/>
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
                    {/* <Link to='/patient/cosoyte/profile'> */}
                        <Button type="primary" style={{position:"relative", left:"40%"}}>
                            <Link 
                                    to={{
                                        pathname:`/chi-tiet-benh-vien/${data._id}`,
                                        state: data 
                                    }}
                            >Đặt khám
                            </Link>
                        </Button>  
                    {/* </Link> */}
                </Col>
                <Col md={{span:24}} lg={{span:12}} style={{width:"100%", paddingLeft:"25px", borderLeft:"2px solid #31b9f2", display:"block"}}>
                    <h4 style={{position:"relative",left:"40%", color:"#0096d4"}}>Giới thiệu</h4>

                    {/* <p
                        style={{
                            textAlign:"justify",
                            fontSize:'17px',
                            display:'-webkit-box',
                            WebkitBoxOrient:"vertical",
                            WebkitLineClamp:"4",
                            overflow:"hidden",
                            textOverflow:'ellipsis'
                        }}
                        dangerouslySetInnerHTML={{__html: data.about}}
                        >{data.about}</p> */}
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
                        {/* <p
                         style={{
                            textAlign:"justify",
                            fontSize:'17px',
                            display:'-webkit-box',
                            WebkitBoxOrient:"vertical",
                            WebkitLineClamp:"4",
                            overflow:"hidden",
                            textOverflow:'ellipsis'
                        }}
                        >
                            <ReactQuill 
                                value={data.about?data.about:'<p>Là một bệnh viện lớn. Với những bác sĩ giàu kinh nghiệm, cơ cở vật chất hiện đại. Thái độ phục vụ tốt.</p>'} 
                                readOnly={true} 
                                theme={"bubble"} 
                            />
                        </p>
                         */}
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
