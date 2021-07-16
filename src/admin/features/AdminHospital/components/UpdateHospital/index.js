import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Steps, Modal, Spin } from 'antd'
import React, {useState, useEffect, useRef} from 'react';
import ReactQuill from 'react-quill' // ES6
import districtData from '../../../../assets/data/district'
import provinceData from '../../../../assets/data/province'
import wardData from '../../../../assets/data/ward'
function UpdateHospital(props) {
    const [form] = Form.useForm();
    const {modalData, handleOk, handleClose, initData} = props;
    const [about, setAbout] = useState(null);
    const [fileAvatar, setFileAvatar] = useState(null);
    const [fileBackground, setFileBackground] = useState(null);
    const fileInputAvatar = useRef(null);
    const fileInputBackground = useRef(null);


    const [province, setProvince]= useState("")
    const [district, setDistrict] = useState("")
    const [loadingAbout, setLoadingAbout] = useState(true);
    const handleQuillChange = (data) => {
        setAbout(data);
    }
    const onChangeAvatar = () => {
        let { current } = fileInputAvatar;
        let file = current.files;
        setFileAvatar(file[0])
    }
    const onChangeBackground = () => {
        let { current } = fileInputBackground;
        let file = current.files;
        setFileBackground(file[0])
    }
    const onHandleSubmit = (data) => {
        // Create a test FormData object
        const _district = data.address.district.split(" ");
        const _province = data.address.province.split(" ");
        _district.splice(0,1);
        _province.splice(0,1);
        const addressString = `${data.address.street}, ${data.address.ward}, ${_district.join(" ")}, ${_province.join(" ")}`
        const submitData = new FormData();
        submitData.append("name", data.name);
        submitData.append("phone", data.phone);
        submitData.append("email", data.email);
        submitData.append("address", addressString);
        submitData.append("about", about);
        submitData.append("logo", fileAvatar);
        submitData.append("background", fileBackground);
        props.updateHospitalInfo(submitData);
    }
   
    useEffect(() => {
        if(modalData.visible) {
            setAbout(initData.about);
            setTimeout(() => {
                setLoadingAbout(false);
            }, 300);
        }
    }, [modalData])
    return (
        <div>
            <Modal 
                title="Cập nhật thông tin" 
                width={1000}
                visible={modalData.visible} 
                onOk={handleOk} 
                onCancel={handleClose}
                footer={null}
            >
                {loadingAbout?<Spin/>:
                <Form
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    onFinish={onHandleSubmit}
                    initialValues={initData||{}}
                >   
                    <Row gutter={[8,8]}>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item name="avatar" label="Ảnh đại diện:" >
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    ref={fileInputAvatar}
                                    onChange={onChangeAvatar}
                                />
                            </Form.Item>
                            <Form.Item name="background" label="Background:" >
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    ref={fileInputBackground}
                                    onChange={onChangeBackground}
                                />
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="Tên"
                            >
                                <Input/>
                            </Form.Item>  
                            <Form.Item 
                                name="email" 
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giờ',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name="phone" 
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn giờ',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item name={["address","province"]} label="Tỉnh/ Thành phố:" rules={[{required: true, message: 'Nhập đầy đủ địa chỉ'}]}>
                                <Select className="province" placeholder="Tỉnh/ Thành phố" onChange={(value)=>setProvince(value)}>
                                    {Object.entries(provinceData).map(entry=> {
                                        const [key, value] = entry;
                                        return (
                                            <Select.Option key={key} value={`${key} ${value.name}`}>{value.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item name={["address","district"]} label="Quận/ Huyện:" rules={[{required: true, message: 'Nhập đầy đủ địa chỉ'}]}>
                                <Select className="province" placeholder="Quận/ Huyện" onChange={(value)=>setDistrict(value)}>
                                    {Object.entries(districtData).filter(item=>
                                        province.includes(item[1].parent_code)
                                    )
                                    .map(district=>(
                                        <Select.Option key={district[0]} value={`${district[0]} ${district[1].name}`}>{district[1].name}</Select.Option>
                                    ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item name={['address','ward']} label="Phường/ Xã:" rules={[{required: true, message: 'Nhập đầy đủ địa chỉ'}]}>
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
                            <Form.Item name={['address','street']} label="Địa chỉ:" rules={[{required: true, message: 'Nhập đầy đủ địa chỉ'}]}>
                                <Input className="input" placeholder="Địa chỉ"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Giới thiệu:" className="about">
                        <ReactQuill 
                            theme="snow"
                            value={about}
                            onChange={handleQuillChange}
                        />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">Cập nhật</Button>
                    </Form.Item>
                </Form>}
            </Modal>
        </div>
    );
}

export default UpdateHospital;