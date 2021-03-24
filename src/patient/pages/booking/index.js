import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, DatePicker, Form, Input, Radio, Rate, Row, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import logoDoctor from '../../assets/img/bsnam.jpg'
import departLogo from '../../assets/img/depart.png'
import hospitalLogo from '../../assets/img/hospital.png'
import location from '../../assets/img/location.png'
import price from '../../assets/img/price.png'
import './style.css'
import provinceData from '../../assets/data/province'
import districtData from '../../assets/data/district'
import wardData from '../../assets/data/ward'
import moment from 'moment'
import { make_appointment } from '../../../actions/patientActions'
const timeShift=[
        { 
            time : 7,
            count: 0,
            defaultCount:5
        },
        { 
            time : 8,
            count: 0,
            defaultCount:5
        },
        { 
            time : 9,
            count: 0,
            defaultCount:5
        },
        { 
            time : 10,
            count: 0,
            defaultCount:5
        },
        { 
            time : 11,
            count: 0,
            defaultCount:5
        },
        { 
            time : 13,
            count: 0,
            defaultCount:5
        },
        { 
            time : 14,
            count: 0,
            defaultCount:5
        },
        { 
            time : 15,
            count: 0,
            defaultCount:5
        },
        { 
            time : 16,
            count: 0,
            defaultCount:5
        },
    ]
const today = new Date()
let date = [moment(today).format('YYYY-MM-DD'), moment(moment(today, "YYYY-MM-DD").add(1, 'days')).format('YYYY-MM-DD'),moment(moment(today, "YYYY-MM-DD").add(2, 'days')).format('YYYY-MM-DD')]
const PatientInfo = (props) => {
    const dispatch = useDispatch()
    const patient = useSelector(state => state.patient)   
    const [province, setProvince]= useState("")
    const [district, setDistrict] = useState("")
    //  handle show option choose schedule for dat dum 
    const [option, setOption] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [apptDate , setApptDate] = useState(date[0])
    const [time, setTime] = useState(0)
    console.log(apptDate)
    console.log(time)
    console.log(patient.data.id)
    console.log(props.match.params.doctorID)
    const onChange = e => {
        setOption(e.target.value);
    };
    
    const onFinish = (value) => {
        setShowModal(true)
    }
    const handleChangeDate =(e)=>{
        setApptDate(e)
    }
    const handleSetTime=(item)=>{
        setTime(item.time)
    }
    const handleReturn = () => {
        setShowModal(false)
    }
    console.log(apptDate)
    console.log(time)
    console.log(`${apptDate} ${time}:00:00`)
    const handleSubmit = () => {
        const date = `${apptDate}T${time<10 &&0}${time}:00:00`
        const dateFM = moment(date).format('YYYY-MM-DD HH:mm:ss')
        
        const appointment ={
            patientId : patient.data.id,
            doctorId : props.match.params.doctorID,
            appointmentTime : dateFM,
            price : 300000,
            sumary : 'this is sumary !',
            bookingFor: option,
            forPatient : {}
        }
        dispatch(make_appointment(appointment))
    }
    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
    }
    return (
        <div className="patient-datkham">
            {/* breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/patient/doctor-list'>Danh sách bác sĩ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Bs. Tô Ngọc Bình</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Bs. Tô Ngọc Bình</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
            <div className="contentt">
                <div className="container">
                    <Card className="header-profile">
                        <Row gutter={[10,10]}>
                            <Col span={4}>
                                <div className="avatar">
                                    <img src={logoDoctor} alt="logoDoctor"/>
                                </div>
                                {/* <Rate value={3} /> */}
                            </Col>
                            <Col span={14} className="infoDoctor">
                                <div className="header-info">
                                <h3>Tiến sĩ, Bác sĩ Chuyên Khoa II Tô Ngọc Bình</h3>
                                
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="Nội tiết"/></span>
                                        <span>Nội tiết</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                                        <span>Bv. Hùng vương</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="Nội tiết"/></span>
                                        <span>273 Lý Thường Kiệt, P5, Q8, TP.HCM</span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="Nội tiết"/></span>
                                        <span>300.000 VNĐ</span>
                                    </li>
                                </ul>
                            </div>
                            </Col>
                        </Row>
                    </Card>
                    <Card className="patient-info"> 
                        <h3 style={{textAlign:"center", color:"#1890ff", fontWeight:"600"}}>Thông tin lịch khám</h3>
                        <h4 style={{fontWeight:"600"}}>Chọn thời gian khám</h4>
                        <Select 
                            defaultValue={`${date[0]}`} 
                            style={{ width: 200, border:"none" }} 
                            className="chooseDay"
                            onChange={(e)=>handleChangeDate(e)}
                        >
                            <Select.Option value={`${date[0]}`}>{date[0]}</Select.Option>
                            <Select.Option value={`${date[1]}`}>{date[1]}</Select.Option>
                            <Select.Option value={`${date[2]}`}>{date[2]}</Select.Option>
                        </Select>
                        <Row gutter={[8,8]} className="lich">
                            {/* list time step */}
                            
                            {timeShift.map(item=>(
                                <button onClick={()=>handleSetTime(item)} className="time-step">{`${item.time}:00 - ${item.time+1}:00`}</button>
                            ))}
                        </Row>
                        <hr/>
                        <div className="option">
                            <Radio.Group onChange={onChange} value={option}>
                                <Radio value={false} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho bản thân</Radio>
                                <Radio value={true} style={{color:"#1890ff", fontWeight:"600"}}>Đặt cho người thân</Radio>
                            </Radio.Group>
                        </div>
                        
                        <Form
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            layout="vertical"
                            size="large"
                            onFinish={onFinish}
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
                        <Modal
                            visible={showModal}
                            title="Xác nhận thông tin"
                            onOk={handleSubmit}
                            onCancel={handleReturn}
                            footer={[
                                <Button key="back" onClick={handleReturn}>
                                Quay lại
                                </Button>,
                                <Button key="submit" type="primary" onClick={handleSubmit}>
                                Xác nhận
                                </Button>,
                            ]}
                            >
                            <Card title="Thông tin bệnh nhân" headStyle={{color:"#3487db", fontSize:"20px"}}>
                                <Row gutter={[8,8]}>
                                    <Col span={7}>
                                        <p><b>Họ tên:</b></p>
                                        <p><b>Ngày sinh:</b></p>
                                        <p><b>Giới tính:</b></p>
                                        <p><b>Điện thoại:</b></p>
                                    </Col>
                                    <Col span={15}>
                                        <p>Lưu Quang Thuận</p>
                                        <p>02/01/1998</p>
                                        <p>Nam</p>
                                        <p>0974101702</p>
                                    </Col>
                                </Row>
                            </Card>
                            <Card title="Thông tin đăng kí khám" headStyle={{color:"#3487db", fontSize:"20px"}}>
                                <Row gutter={[8,8]}>
                                   
                                    <Col span={7}>
                                        <p><b>Bác sĩ:</b></p>
                                        <p><b>Địa chỉ:</b></p>
                                        <p><b>Ngày khám:</b></p>
                                        <p><b>Giờ khám:</b></p>
                                    </Col>
                                    <Col span={15}>
                                        <p>Lưu Quang Thuận</p>
                                        <p>54/19 đường số 7, KP3, Linh Trung, Thủ Đức</p>
                                        <p>19/12/2020</p>
                                        <p>8h30-9h00</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Modal>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PatientInfo
