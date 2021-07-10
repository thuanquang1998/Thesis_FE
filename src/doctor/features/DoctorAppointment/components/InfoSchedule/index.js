import React from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Card, Tabs, Space } from 'antd';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
function InfoSchedule(props) {
    const {data} = props;
    const obj = {
        clinical: {
            heartbeat:"aasdfasdf"
        },
        sights: [
            {
                sight: "a",
                price: "a"
            },
            {
                sight: "a",
                price: "a"
            }
        ]
    }
    return (
        <div>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin bệnh nhân:</h4>
                <Form
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="inline"
                    size="large"
                    initialValues={
                        obj
                    }
                >   
                    <Row style={{width: '100%' }} gutter={[8,8]}>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="name"
                                label="Tên bệnh nhân"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name="phone"
                                label="Số điện thoại"
                            >
                                <Input/>
                            </Form.Item> 
                           
                        </Col>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="sex"
                                label="Giới tính"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    
                </Form>
            </Card>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin lịch khám:</h4>
                <Form
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="inline"
                    size="large"
                    initialValues={
                        obj
                    }
                >   
                    <Row style={{width: '100%' }} gutter={[8,8]}>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="doctorName"
                                label="Bác sĩ"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name="hospital"
                                label="Bệnh viện"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input/>
                            </Form.Item> 
                        </Col>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="room"
                                label="Phòng"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name={["clinical","breathing"]} 
                                label="Tái khám"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name={["clinical","height"]}
                                label="Chiều cao"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Kết quả khám lần trước:</h4>
                <Form
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="inline"
                    size="large"
                    initialValues={
                        obj
                    }
                >   
                    <Row style={{width: '100%' }} gutter={[8,8]}>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name={["clinical","heartbeat"]}
                                label="Bác sĩ"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name={["clinical","temperature"]}
                                label="Phòng khám"
                            >
                                <Input/>
                            </Form.Item> 
                            <Form.Item 
                                name={["clinical","weight"]}
                                label="Ngày lập khám"
                            >
                                <Input/>
                            </Form.Item> 
                        </Col>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name={["clinical","bloodPressure"]}
                                label="Loại lịch khám"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name={["clinical","breathing"]} 
                                label="Tái khám"
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name={["clinical","height"]}
                                label="Chiều cao"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}

export default InfoSchedule;