import React,{useState, useRef} from 'react';
import {Modal, Button, Form, Input} from 'antd';

function CreateSpec(props) {
    const [form] = Form.useForm();
    const {modalData, handleOk, handleClose} = props;
    const {data} = modalData;

    const [fileAvatar, setFileAvatar] = useState(null);
    const fileInput = useRef(null);

    const onHandleSubmit = (data) => {
        // Create a test FormData object
        const submitData = new FormData();
        submitData.append("image", fileAvatar);
        submitData.append("name", data.name);
        
        props.submitCreateSpec(submitData)
        form.resetFields();
        props.handleClose();
    }

    const onChangeAvatar = () => {
        let { current } = fileInput;
        let file = current.files;
        setFileAvatar(file[0])
    }
    return (
        <Modal 
            title={
                <p style={{fontSize:"18px !important", fontWeight:"600", marginBottom:"0"}}>Tạo chuyên khoa</p>
            } 
            width={800}
            visible={modalData.visible} 
            onOk={handleOk} 
            onCancel={handleClose}
            footer={null}
            centered
        >
            <Form
                form={form}
                onFinish={onHandleSubmit}
                initialValues={{}}
            >
                <Form.Item
                    name="name"
                    label="Tên chuyên khoa"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên chuyên khoa',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Logo chuyên khoa"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn logo chuyên khoa',
                        }
                    ]}
                >
                    <input 
                        // multiple
                        type="file" 
                        accept="image/png, image/jpeg"
                        ref={fileInput}
                        onChange={onChangeAvatar}
                    />
                </Form.Item>
                <div style={{textAlign: 'center', margin:"20px"}}>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default CreateSpec;