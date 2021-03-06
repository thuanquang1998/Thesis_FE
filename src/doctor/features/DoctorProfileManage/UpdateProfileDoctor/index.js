import { PortraitSharp } from '@material-ui/icons';
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import '../style.css';

function UpdateProfileDoctor(props) {
    const [form] = Form.useForm();
    const {modalData, handleOk, handleClose} = props;
    const [about, setAbout] = useState(null);
    const [fileAvatar, setFileAvatar] = useState(null);
    const fileInput = useRef(null);
    const [loadingAbout, setLoadingAbout] = useState(true);
    const [initData, setInitData] = useState({});
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
        submitData.append("fullName", data.fullName);
        submitData.append("phone", data.phone);
        submitData.append("email", data.email);
        submitData.append("sex", data.gender);
        submitData.append("birthday", data.birthday);
        submitData.append("title", data.title);
        submitData.append("about", about);
        submitData.append("image", fileAvatar);

        props.handleUpdateProfile(submitData);
    }
    useEffect(() => {
        if(modalData.visible) {
            console.log("1111111111111111111");
            setAbout(props.initData.about);
            setInitData({...props.initData});
            form.setFieldsValue({
                fullName: props.initData.fullName,
                phone: props.initData.phone,
                email:props.initData.email,
                gender: props.initData.gender,
                birthday: props.initData.birthday,
                title: props.initData.title,
                about: props.initData.about,
            });
            setTimeout(() => {
                setLoadingAbout(false);
            }, 300);
        } 
    }, [modalData]);
    console.log('props.initData :>> ', props.initData);
    useEffect(() => form.resetFields(), [props.initState]);
    return (
        <div className="modalUpdateProfile">
            <Modal 
                title={
                    <p 
                        style={{
                            margin: 0,
                            fontSize: '20px !important',
                            fontWeight: '600',
                            color: "#00d0f1",
                        }}
                    >
                        C???p nh???t th??ng tin
                    </p>}
                width={1000}
                visible={modalData.visible} 
                // onOk={handleOk} 
                onCancel={()=>{
                    handleClose();
                    setInitData({});
                }}
                footer={null}
            >
                {loadingAbout? <Spin></Spin>:
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
                    // initialValues={props.initData}
                >   
                    <Row gutter={[8,8]}>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item 
                                name="fullName" 
                                label="T??n"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p t??n',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>  
                            <Form.Item 
                                name="email" 
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng nh???p email',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                name="phone" 
                                label="S??? ??i???n tho???i"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n gi???',
                                    }
                                ]}
                            >
                                <Input/>
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
                                <Radio.Group size="large" className="updateDoctorRadio">
                                    <Radio.Button value="male">Nam</Radio.Button>
                                    <Radio.Button value="female">N???</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                            <Form.Item name="avatar" label="???nh ?????i di???n:" >
                                <input 
                                    type="file" 
                                    accept="image/png, image/jpeg"
                                    ref={fileInput}
                                    onChange={onChangeAvatar}
                                />
                                <a onClick={()=>setFileAvatar(null)}>X??a</a>
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
                            <Form.Item 
                                name="title" 
                                label="Ch???c danh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui l??ng ch???n gi???',
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Gi???i thi???u:" className="about">
                        <ReactQuill 
                            theme="snow"
                            value={about}
                            onChange={handleQuillChange}
                        />
                    </Form.Item>
                    <Form.Item className="submitButton" style={{textAlign: 'center'}}>
                        <Button
                            type="primary" 
                            htmlType="submit"
                            style={{
                                backgroundColor: "#00d0f1",
                                border: "none",
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            C???p nh???t
                        </Button>
                    </Form.Item>
                </Form>}
            </Modal>
        </div>
    );
}

export default UpdateProfileDoctor;