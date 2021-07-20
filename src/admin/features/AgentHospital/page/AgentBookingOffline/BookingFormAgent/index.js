import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import districtData from '../../../../../assets/data/district';
import provinceData from '../../../../../assets/data/province';
import wardData from '../../../../../assets/data/ward';

function BookingFormAgent(props) {

    const [dataSubmit, setDataSubmit] = useState({
        time:"",
        room: "",
        patientInfo: {
            name: "",
            phone: "",
            age: "",
            gender: "",
            medicalRecordSumanry: "",
            address: ""
        }
    })
    const [listTimeStep, setListTimeStep] = useState([]);
   
    // state for address
    const [province, setProvince]= useState("");
    const [district, setDistrict] = useState("");

    const [currentTime, setCurrentTime] = useState(null)

    // state Bookingfor
    const [bookingFor, setBookingFor] = useState(false)

    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
    }


    

    const onChangeDate = (value) => {
        setCurrentTime(null);
        const _dateChoosed = props.listDateValid.filter(x=>x.date===value);
        let room_temp = '';
        let _listTimeSlot = [];
        if(_dateChoosed.length!==0) {
            _listTimeSlot = _dateChoosed[0].timeSlot.filter(x=>x.booked<_dateChoosed[0].max);
            room_temp = _dateChoosed[0].location;
        }
        setListTimeStep(_listTimeSlot);
        setDataSubmit({
            ...dataSubmit, 
            date: value,
            room: room_temp
        });
    }
   
    // submit data
    const onHandleSubmit = (data) => {
        const _district = data.address.district.split(" ");
        const _province = data.address.province.split(" ");
        _district.splice(0,1);
        _province.splice(0,1);
        const patientInfo = {
            name: data.name,
            phone: data.phone,
            birthDay: moment(data.birthday).format(),
            age: 20,
            gender: data.gender,
            medicalRecordSumanry: data.medicalRecordSumanry||'',
            address: `${data.address.street}, ${data.address.ward}, ${_district.join(" ")}, ${_province.join(" ")}`
        }
        // const bookerInfo = {
        //     name: data.name_represent||"",
        //     phone: data.phone_represent||""
        // };
        const newData = {
            ...dataSubmit,
            patientInfo, 
        }
        props.onSubmitForm(newData);
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
            onFinish={onHandleSubmit}
        >   
            <Row gutter={[8,8]}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <div>Ngày: {props.currentDate}</div>
                    {/* <Form.Item 
                        name="date" 
                        label="Chọn ngày"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày khám',
                            }
                        ]}
                    >
                        <Select 
                            className="province"
                            placeholder="Vui lòng chọn ngày khám" 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={onChangeDate}
                        >
                            {props.listDateValid.map((item, idx)=> {
                                return (<Select.Option key={idx} value={item.date}>{moment(item.date).format('DD/MM/YYYY')}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item>  */}
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <Form.Item 
                        name="time" 
                        label="Chọn giờ"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giờ',
                            }
                        ]}
                    >
                        <Select 
                            className="province"
                            placeholder="Vui lòng chọn giờ" 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={(value)=>setDataSubmit({...dataSubmit, time:value})}
                            value={currentTime}
                        >
                            {listTimeStep.length!==0 && listTimeStep.map((step, idx)=> {
                                return (<Select.Option key={idx} value={step.time}>{step.time}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <div className="info-benhnhan">                     
                <h4 style={{fontWeight:"600"}}>Thông tin bệnh nhân</h4>
                <Row gutter={[8,8]}>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="name" 
                            label="Họ và tên:"
                            rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng điền đầy đủ họ tên',
                                }]}
                        >
                            <Input className="input" placeholder="Họ và tên bệnh nhân (bắt buộc)"/>
                        </Form.Item>
                        <Form.Item 
                            name="phone" 
                            label="Số điện thoại:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đầy đủ thông tin',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="Số điện thoại liện hệ (bắc buộc)"/>
                        </Form.Item>
                        <Form.Item 
                            name="gender" 
                            label="Giới tính:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn giới tính',
                                }
                            ]}
                        >
                            <Radio.Group size="large">
                                <Radio.Button value="male">Nam</Radio.Button>
                                <Radio.Button value="female">Nữ</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                            name="birthday" 
                            label="Ngày sinh:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày sinh',
                                }
                            ]}
                        >
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name={["address","province"]} 
                            label="Tỉnh/ Thành phố:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="Tỉnh/ Thành phố" 
                                onChange={onChangeProvince}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                            >
                                {Object.entries(provinceData).map(entry=> {
                                    const [key, value] = entry;
                                    return (
                                        <Select.Option key={key} value={`${key} ${value.name}`}>{value.name}</Select.Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name={["address","district"]} 
                            label="Quận/ Huyện:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="Quận/ Huyện" 
                                onChange={onChangeDistrict}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                            >
                                {Object.entries(districtData).filter(item=>
                                    province.includes(item[1].parent_code)
                                )
                                .map(district=>(
                                    <Select.Option key={district[0]} value={`${district[0]} ${district[1].name}`}>{district[1].name}</Select.Option>
                                ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name={['address','ward']} 
                            label="Phường/ Xã:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="Phường/ Xã"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                            >
                                {Object.entries(wardData).filter(item=>
                                    
                                    district.includes(item[1].parent_code)
                                )
                                .map(ward=>(
                                    <Select.Option key={ward[0]} value={ward[1].name}>{ward[1].name}</Select.Option>
                                ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name={['address','street']} 
                            label="Địa chỉ:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="Địa chỉ"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="medicalRecordSumanry" label="Tiền sử bệnh - Triệu chứng:" className="form-trieuchung">
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

export default BookingFormAgent;