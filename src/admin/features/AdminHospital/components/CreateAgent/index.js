import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect } from 'react';

function CreateAgent(props) {
    const [form] = Form.useForm();
    form.resetFields();
    const {modalData, handleOk, handleClose, loadingPage} = props;


    const onHandleSubmit = (data) => {
        props.createAgent(data);
    }
    
    return (
        <Modal 
            title="Tạo mới nhân viên" 
            width={600}
            visible={modalData.visible} 
            onOk={handleOk} 
            onCancel={()=>{
                handleClose();
                form.resetFields();

            }}
            footer={null}
        >
             <Form
                form={form}
                onFinish={onHandleSubmit}
                initialValues={{}}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập đầy đủ thông tin',
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
                            message: 'Vui lòng nhập đầy đủ thông tin',
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
                            message: 'Vui lòng nhập đầy đủ thông tin',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item 
                    name="sex" 
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
                <div style={{textAlign: 'center', marginTop:"20px"}}>
                    <Button type="primary" htmlType="submit">Hoàn thành</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default CreateAgent;