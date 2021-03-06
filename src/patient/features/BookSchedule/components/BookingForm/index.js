import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import patientAPI from '../../../../../api/patientApi';
import districtData from '../../../../assets/data/district';
import provinceData from '../../../../assets/data/province';
import wardData from '../../../../assets/data/ward';

function BookingForm(props) {
    const {submitData, onSubmitForm, doctorId} = props;
    const initData = props.initData||{};
    const [dataSubmit, setDataSubmit] = useState({...submitData})
    const currentTimeNumber = new Date().getTime();
    const [listDateValid, setListDateValid] = useState([]);
    const [listTimeStep, setListTimeStep] = useState([]);
    
    

   
    // state for address
    const [province, setProvince]= useState("");
    const [district, setDistrict] = useState("");

    // state Bookingfor
    const [bookingFor, setBookingFor] = useState(false)

    useEffect(()=> {

        getTimeWorks();
    },[])

    // get time working
    const getTimeWorks = async () => {
        try {
            const res = await patientAPI.get_time_works(doctorId);
            const abc = new Date(res.data.data[0].date);
            const current = new Date();
            if(!res.error && !res.data.isNull) {
                const _listDate = res.data.data;
                const _listDateValid = _listDate.filter(x=> {
                    const itemTimeNumber =  new Date(x.date);
                    const _itemTimeNumber = itemTimeNumber.getTime();
                    const diff = _itemTimeNumber*1 - currentTimeNumber*1;
                    return diff>0;
                })
                setListDateValid(_listDateValid);
            } else {
            }
        } catch (error) {
            return {
                status: "error",
                msg: error.message
            }
        }
    }
    

    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
    }
    

    const onChangeDate = (value) => {
        const _dateChoosed = listDateValid.filter(x=>x.date===value);
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
        console.log('data :>> ', data);
        const _district = data.address.district.split(" ");
        const _province = data.address.province.split(" ");
        _district.splice(0,1);
        _province.splice(0,1);
        const patientInfo = {
            name: data.name,
            phone: data.phone,
            birthDay: moment(data.birthday).format(),
            gender: data.gender,
            medicalRecordSumanry: data.medicalRecordSumanry||'',
            address: `${data.address.street}, ${data.address.ward}, ${_district.join(" ")}, ${_province.join(" ")}`
        }
        const bookerInfo = {
            name: data.name_represent||"",
            phone: data.phone_represent||""
        };
        const newData = {
            ...dataSubmit,
            patientInfo, 
            bookerInfo,
            bookingFor: bookingFor,
        }
        onSubmitForm(newData);
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
            initialValues={initData}
            // initialValues={obj}
        >   
            <Row gutter={[8,8]}>
                <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
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
                        {/* <DatePicker
                            // defaultValue={moment("2015-01-01", "YYYY-MM-DD")}
                            format={"YYYY-MM-DD"}
                            disabledDate={(current)=>{
                                const listGetTime = listDateValid.map(item =>{
                                    const time = new Date(item.date);
                                    return time.getTime();
                                } )
                                console.log('listGetTime :>> ', listGetTime);
                                return listGetTime.includes(current.valueOf());
                            }}
                        /> */}
                        <Select 
                            className="province"
                            placeholder="Vui l??ng ch???n ng??y kh??m" 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={onChangeDate}
                        >
                            {listDateValid.map((item, idx)=> {
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
                        >
                            {listTimeStep.length!==0 && listTimeStep.map((step, idx)=> {
                                return (<Select.Option key={idx} value={step.time}>{step.time}</Select.Option>)
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <hr/>
            <div className="option">
                <Radio.Group 
                    onChange={(e=>setBookingFor(e.target.value))} 
                    value={bookingFor}
                >
                    <Radio value={false} style={{color:"#1890ff", fontWeight:"600"}}>?????t cho b???n th??n</Radio>
                    <Radio value={true} style={{color:"#1890ff", fontWeight:"600"}}>?????t cho ng?????i th??n</Radio>
                </Radio.Group>
            </div>
            {bookingFor === true && <div className="info-nguoithan">
                <h4 style={{fontWeight:"600"}}>Th??ng tin ng?????i ?????t l???ch</h4>
                <Row gutter={[8,8]}>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="name_represent" 
                            label="H??? v?? t??n ng?????i ?????t l???ch:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="H??? v?? t??n b???nh nh??n (b???t bu???c)"/>
                        </Form.Item>
                    </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="phone_represent" 
                            label="S??? ??i???n tho???i ng?????i ?????t l???ch:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui l??ng nh???p ?????y ????? th??ng tin',
                                }
                            ]}
                        >
                            <Input className="input" placeholder="S??? ??i???n tho???i li???n h??? (b???c bu???c)"/>
                        </Form.Item>
                    </Col>
                </Row>
            </div>}
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

export default BookingForm;