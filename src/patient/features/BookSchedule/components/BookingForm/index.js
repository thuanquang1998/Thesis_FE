import React, {useState} from 'react';
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import provinceData from '../../../../assets/data/province'
import districtData from '../../../../assets/data/district'
import wardData from '../../../../assets/data/ward'


function BookingForm(props) {
    const {onFinish, option} = props;
    const [province, setProvince]= useState("")
    const [district, setDistrict] = useState("")

    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
    }
    const handleOnFinish = (value) => {
        onFinish(value);
    }
    return (
    <Form
        labelCol={{
            span: 24,
        }}
        wrapperCol={{
            span: 24,
        }}
        layout="vertical"
        size="large"
        onFinish={handleOnFinish}
    >   
        {option === true && <div className="info-nguoithan">
            <h4 style={{fontWeight:"600"}}>Thông tin người đặt lịch</h4>
            <Row gutter={[8,8]}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <Form.Item name="name_represent" label="Họ và tên người đặt lịch:">
                        <Input className="input" placeholder="Họ và tên bệnh nhân (bắt buộc)"/>
                    </Form.Item>
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <Form.Item name="phone_represent" label="Số điện thoại người đặt lịch:">
                        <Input className="input" placeholder="Số điện thoại liện hệ (bắc buộc)"/>
                    </Form.Item>
                </Col>
            </Row>
        </div>}
        <div className="info-benhnhan">                     
            <h4 style={{fontWeight:"600"}}>Thông tin bệnh nhân</h4>
            <Row gutter={[8,8]}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <Form.Item name="name" label="Họ và tên:">
                        <Input className="input" placeholder="Họ và tên bệnh nhân (bắt buộc)"/>
                    </Form.Item>
                    <Form.Item name="phone" label="Số điện thoại:">
                        <Input className="input" placeholder="Số điện thoại liện hệ (bắc buộc)"/>
                    </Form.Item>
                    <Form.Item name="gender" label="Giới tính:">
                        <Radio.Group size="large">
                            <Radio.Button value="male">Nam</Radio.Button>
                            <Radio.Button value="female">Nữ</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="birthday" label="Ngày sinh:">
                        <DatePicker/>
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
                <Col span={24}>
                    <Form.Item label="Tiền sử bệnh - Triệu chứng:" className="form-trieuchung">
                        <Input.TextArea prefix={<PlusCircleOutlined />}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Xác nhận đặt khám</Button>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    </Form>
    );
}

export default BookingForm;