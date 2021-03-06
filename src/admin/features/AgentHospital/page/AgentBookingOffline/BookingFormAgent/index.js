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
        
        const listResult = _listTimeSlot.filter(item=>{
            const timeStart = item.time.split("-")[0];
            const numberTime = 1*(timeStart.split(":")[0]+timeStart.split(":")[1]);
            const currentTime = moment().format('hh:mm');
            const numberCurrentTime = 1*(currentTime.split(":")[0]+currentTime.split(":")[1]);
            const check = numberTime-numberCurrentTime;
            if(check>=30) {
                return true;
            } else {
                return false;
            }
        })

        setListTimeStep(listResult);
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
                    {/* <div>Ng??y: {props.currentDate}</div> */}
                    <Form.Item 
                        name="date" 
                        label="Ch???n ng??y"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n ng??y kh??m',
                            }
                        ]}
                    >
                        <Select 
                            className="province"
                            placeholder="Vui l??ng ch???n ng??y kh??m" 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={onChangeDate}
                        >
                            {props.listDateValid.map((item, idx)=> {
                                return (<Select.Option key={idx} value={item.date}>{moment(item.date).format('DD/MM/YYYY')}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item> 
                </Col>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                    <Form.Item 
                        name="time" 
                        label="Ch???n gi???"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng ch???n gi???',
                            }
                        ]}
                    >
                        <Select 
                            className="province"
                            placeholder="Vui l??ng ch???n gi???" 
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
                <h4 style={{fontWeight:"600"}}>Th??ng tin b???nh nh??n</h4>
                <Row gutter={[8,8]}>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="name" 
                            label="H??? v?? t??n:"
                            rules={[
                                {
                                  required: true,
                                  message: 'Vui l??ng ??i???n ?????y ????? h??? t??n',
                                }]}
                        >
                            <Input className="input" placeholder="H??? v?? t??n b???nh nh??n (b???t bu???c)"/>
                        </Form.Item>
                        <Form.Item 
                            name="phone" 
                            label="S??? ??i???n tho???i:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="S??? ??i???n tho???i li???n h??? (b???c bu???c)"/>
                        </Form.Item>
                        <Form.Item 
                            name="gender" 
                            label="Gi???i t??nh:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng ch???n gi???i t??nh',
                                }
                            ]}
                        >
                            <Radio.Group size="large">
                                <Radio.Button value="male">Nam</Radio.Button>
                                <Radio.Button value="female">N???</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item 
                            name="birthday" 
                            label="Ng??y sinh:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng ch???n ng??y sinh',
                                }
                            ]}
                        >
                            <DatePicker/>
                        </Form.Item>
                    </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name={["address","province"]} 
                            label="T???nh/ Th??nh ph???:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????a ch???',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="T???nh/ Th??nh ph???" 
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
                            label="Qu???n/ Huy???n:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????a ch???',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="Qu???n/ Huy???n" 
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
                            label="Ph?????ng/ X??:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????a ch???',
                                }
                            ]}
                        >
                            <Select 
                                className="province" 
                                placeholder="Ph?????ng/ X??"
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
                            label="?????a ch???:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????a ch???',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="?????a ch???"/>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="medicalRecordSumanry" label="Ti???n s??? b???nh - Tri???u ch???ng:" className="form-trieuchung">
                            <Input.TextArea prefix={<PlusCircleOutlined />}/>
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{textAlign:'center'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">X??c nh???n ?????t kh??m</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </Form>
    );
}

export default BookingFormAgent;