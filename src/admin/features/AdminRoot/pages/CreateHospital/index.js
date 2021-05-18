import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Steps } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import districtData from '../../../../assets/data/district'
import provinceData from '../../../../assets/data/province'
import wardData from '../../../../assets/data/ward'
import SidebarNav from '../../../../components/SideBar'
const { Step } = Steps;


const CreateHospital = () => {
    const [current, setCurrent] = useState(0);
    const [province, setProvince]= useState("")
    const [district, setDistrict] = useState("")
    // handle next page
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    // handle form
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishBasicInfo = (values) => {
        console.log('BasicInfo', values)
        next()
    }
    const onFinishContract = (values) => {
        console.log('Contract', values)
        next()
    }
    const onFinishAdmin = (values) => {
        console.log("Account Admin", values)
    }

    // handle address
    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
    }
    
    // handle submit step by step
    const step1 = () => {
        onFinishBasicInfo();
    }
    return (
        <>
          <SidebarNav/>
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-7 col-auto">
                            <h3 className="page-title">Thêm bệnh viện</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                                <li className="breadcrumb-item active"><Link to="/admin/cosoyte">Danh sách bệnh viện</Link></li>
                                <li className="breadcrumb-item active">Tạo mới bệnh viện</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Card 
                    title={
                    <Steps current={current}>
                        <Step title="Thông tin cơ bản"/>
                        <Step title="Thông tin hợp đồng"/>
                        <Step title="Tạo tài khoản admin bệnh viện"/>
                    </Steps>
                    }>
                    <div className="steps-content">
                        {current===0 && (
                        <Form
                            labelCol={{
                            span: 24,
                            }}
                            wrapperCol={{
                            span: 24,
                            }}
                            layout="vertical"
                            size="large"
                            onFinish={onFinishBasicInfo}
                        >   
                            <div className="info-benhnhan">                     
                                <Row gutter={[8,8]}>
                                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                        <Form.Item name="hospitalName" label="Tên bệnh viện:" rules={[{required: true, message: 'Nhập tên bệnh viện!'}]}>
                                            <Input className="input" placeholder="Vd: Bệnh viện/Phòng khám A"/>
                                        </Form.Item>
                                        <Form.Item name="hospitalPhone" label="Số điện thoại:">
                                            <Input className="input" placeholder="Số điện thoại liện hệ"/>
                                        </Form.Item>
                                        <Form.Item name="hospitalEmail" label="Email:">
                                            <Input className="input" placeholder="Email"/>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                        <Form.Item name={["address","province"]} label="Tỉnh/ Thành phố:">
                                            <Select className="province" placeholder="Tỉnh/ Thành phố" onChange={onChangeProvince}>
                                                {Object.entries(provinceData).map(entry=> {
                                                    const [key, value] = entry;
                                                    return (
                                                        <Select.Option key={key} value={`${key} ${value.name}`}>{value.name}</Select.Option>
                                                    )
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name={["address","district"]} label="Quận/ Huyện:">
                                            <Select className="province" placeholder="Quận/ Huyện" onChange={onChangeDistrict}>
                                                {Object.entries(districtData).filter(item=>
                                                    province.includes(item[1].parent_code)
                                                )
                                                .map(district=>(
                                                    <Select.Option key={district[0]} value={`${district[0]} ${district[1].name}`}>{district[1].name}</Select.Option>
                                                ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name={['address','ward']} label="Phường/ Xã:">
                                            <Select className="province" placeholder="Phường/ Xã">
                                                {Object.entries(wardData).filter(item=>
                                                    
                                                    district.includes(item[1].parent_code)
                                                )
                                                .map(ward=>(
                                                    <Select.Option key={ward[0]} value={ward[1].name}>{ward[1].name}</Select.Option>
                                                ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name={['address','street']} label="Địa chỉ:">
                                            <Input className="input" placeholder="Địa chỉ"/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                            <Button type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
                                Tiếp tục
                            </Button>
                        </Form>
                        )}
                        {current===1 && (
                        <Form
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            name="basic"
                            initialValues={{
                              remember: true,
                            }}
                            onFinish={onFinishContract}
                        >
                            <Form.Item
                              label="Loại hợp đồng"
                              name={['contract', 'contractType']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Chọn loại hợp đồng!',
                                },
                              ]}
                            >
                                <Select className="province" placeholder="Loại hợp đồng" onChange={onChangeDistrict}>
                                    <Select.Option value="tamThoi">Hợp đồng tạm thời</Select.Option>
                                    <Select.Option value="nganHan">Hợp đồng ngắn hạn</Select.Option>
                                    <Select.Option value="daiHan">Hợp đồng dài hạn</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                              label="Ngày bắt đầu"
                              name={['contract', 'timeStart']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Chọn thời gian bắt đầu hợp đồng!',
                                },
                              ]}
                            >
                                <DatePicker/>
                            </Form.Item>
                            <Form.Item
                              label="Quy mô cơ sở y tế"
                              name={['contract', 'size']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Chọn quy mô cơ sở y tế!',
                                },
                              ]}
                            >
                                <Select className="province" placeholder="Loại hợp đồng" onChange={onChangeDistrict}>
                                    <Select.Option value="sizeA">Loại A</Select.Option>
                                    <Select.Option value="sizeB">Loại B</Select.Option>
                                    <Select.Option value="sizeC">Loại C</Select.Option>
                                </Select>
                            </Form.Item>
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Quay lại
                            </Button>
                            <Button type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
                                Tiếp tục
                            </Button>
                          </Form>
                        )}
                        {current===2 && (
                            <Form
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                name="basic"
                                initialValues={{
                                remember: true,
                                }}
                                onFinish={onFinishAdmin}
                            >
                                <Form.Item
                                label="Tên đăng nhập"
                                name="adminUsername"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Nhập đầy đủ thông tin!',
                                    },
                                ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Quay lại
                                </Button>
                                <Button type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
                                    Hoàn thành
                                </Button>
                            </Form>
                        )}
                    </div>
                    
                </Card>
            </div>
          </div>
        </>
    )
}

export default CreateHospital
