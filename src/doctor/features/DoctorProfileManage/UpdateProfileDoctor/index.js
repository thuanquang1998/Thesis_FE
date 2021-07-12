import { Button, Col, Form, Input, Modal, Row, Radio, DatePicker } from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import ReactQuill from 'react-quill' // ES6

function UpdateProfileDoctor(props) {
    const {modalData, handleOk, handleClose} = props;
    const [about, setAbout] = useState(null);
    const [fileAvatar, setFileAvatar] = useState(null);
    const fileInput = useRef(null);

    const handleQuillChange = (data) => {
        setAbout(data);
    }
    const onChangeAvatar = () => {
        let { current } = fileInput;
        let file = current.files;
        setFileAvatar(file[0])
    }
    const onHandleSubmit = (data) => {
        // Create a test FormData object
        const submitData = new FormData();
        submitData.append("files", fileAvatar);
        submitData.append("about", about);
        for (const x in data) {
            submitData.append(`${x}`, data[x]);
        }
        // call api update
        // ===
    }
    const updateDoctorProfile = async (data) => {
        try {
            console.log("updateDoctorProfile");
        } catch (error) {
            console.log('error updateDoctorProfile:>> ', error);
        }
    }
    return (
        <div>
            <Modal 
                title="Cập nhật thông tin" 
                width={1000}
                visible={modalData.visible} 
                onOk={handleOk} 
                onCancel={handleClose}
                footer={[
                    <Button key="back" onClick={handleOk}>
                    Ok
                    </Button>
                ]}
            >
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
                    // initialValues={initData}
                    // initialValues={obj}
                >   
                    <Row gutter={[8,8]}>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
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
                        </Col>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item name="avatar" label="Ảnh đại diện:" >
                                <input 
                                    multiple
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    ref={fileInput}
                                    onChange={onChangeAvatar}
                                />
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
                            <Form.Item 
                                name="title" 
                                label="Chức danh"
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
                    </Row>
                    <Form.Item label="Giới thiệu:" className="about">
                        <ReactQuill 
                            theme="snow"
                            onChange={handleQuillChange}
                        />
                    </Form.Item>
                    <Form.Item label="Giới thiệu:" className="about">
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UpdateProfileDoctor;