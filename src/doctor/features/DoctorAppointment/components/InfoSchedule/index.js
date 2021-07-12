import React,{useState, useEffect} from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Card, Tabs, Space } from 'antd';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const INIT_DATA = {
    name: "",
    phone: "",
    sex: "",
    address: "",
    doctorName:"",
    typeSchedule: "",
    hospital:"",                     
    addressHospital:"",



}
function InfoSchedule(props) {
    const {data} = props;
    const [initData, setInitData] = useState({...INIT_DATA});
    const [loadingInitData, setLoadingInitData] = useState(true)
    
    useEffect(()=> {
        const temp = props.data;
        console.log('temp :>> ', temp);
        const {patientInfo, appointmentInfo} = temp;
        if(temp.examineType) {
            // kham moi
            const _initData = {
                ...initData,
                name: patientInfo.name||"",
                phone: patientInfo.phone||"",
                sex: patientInfo.gender==="male"?"Nam":"Nữ",
                address: patientInfo.address||"",
                doctorName: appointmentInfo.doctorName||"",
                typeSchedule: "Khám mới",
                hospital: appointmentInfo.location?.hospitalName||"",                     
                addressHospital: appointmentInfo.location?.hospitalAddress,
            };
            setInitData(_initData);
            setLoadingInitData(false)
        } else {
            // tai kham
        }
    },[props.data]);
    
    
    return (
        <div>
            <Card>
                {!loadingInitData &&
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    initialValues={
                        initData
                    }
                >   
                    <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin bệnh nhân:</h4>
                    <Row style={{width: '100%' }} gutter={[8,8]}>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="name"
                                label="Tên bệnh nhân"
                            >
                                <Input disabled/>
                            </Form.Item> 
                            <Form.Item 
                                name="phone"
                                label="Số điện thoại"
                            >
                                <Input disabled/>
                            </Form.Item> 
                           
                        </Col>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="sex"
                                label="Giới tính"
                            >
                                <Input disabled/>
                            </Form.Item> 
                            <Form.Item 
                                name="address"
                                label="Địa chỉ"
                            >
                                <Input.TextArea multiple disabled/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Thông tin lịch khám:</h4>
                    <Row style={{width: '100%' }} gutter={[8,8]}>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="doctorName"
                                label="Bác sĩ"
                            >
                                <Input disabled/>
                            </Form.Item> 
                            <Form.Item 
                                name="typeSchedule" 
                                label="Loại lịch khám"
                            >
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                        <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                            <Form.Item 
                                name="hospital"
                                label="Bệnh viện"
                            >
                                <Input disabled/>
                            </Form.Item> 
                            <Form.Item 
                                name="addressHospital"
                                label="Địa chỉ"
                            >
                                <Input.TextArea multiple disabled/>
                            </Form.Item> 
                        </Col>
                    </Row>
                    {initData && <div></div>}
                    <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Kết quả khám lần trước:</h4>
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
                </Form>}
            </Card>
     
        </div>
    );
}

export default InfoSchedule;