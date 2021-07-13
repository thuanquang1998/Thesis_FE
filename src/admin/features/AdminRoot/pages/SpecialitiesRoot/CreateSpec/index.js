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
            title="Xem lịch khám" 
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
                form={form}
                onFinish={onHandleSubmit}
                initialValues={{}}
            >
                <Form.Item
                    name="name"
                    label="Tên chuyên khoa"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Logo chuyên khoa"
                >
                    <input 
                        multiple
                        type="file" 
                        accept="image/png, image/jpeg"
                        ref={fileInput}
                        onChange={onChangeAvatar}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateSpec;