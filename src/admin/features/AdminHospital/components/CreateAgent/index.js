import React,{useState} from 'react';
import {Modal, Button, Input, Form, Radio} from 'antd';
import { useSnackbar } from 'notistack';
import adminAPI from '../../../../../api/adminAPI';

function CreateAgent(props) {
    const [form] = Form.useForm();
    const {modalData, handleOk, handleClose} = props;
    const { enqueueSnackbar } = useSnackbar();


    const onHandleSubmit = (data) => {
        props.loadingCreate(true);
        createAgentApi(data);
    }
    const createAgentApi = async (data) =>{
        try {
            const response = await adminAPI.create_agent(data);
            console.log('response createAgentApi:>> ', response);
            if(response.error) throw new Error("error createAgentApi");
            enqueueSnackbar('Tạo nhân viên thành công', {variant: 'success'});
            props.handleClose();
            form.resetFields();
        } catch (error) {
            console.log('error :>> ', error);
            enqueueSnackbar('Tạo nhân viên thất bại', {variant: 'error'});
        }
        props.loadingCreate(false)
    }
    return (
        <Modal 
            title="Tạo mới nhân viên" 
            width={600}
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
                    name="fullName"
                    label="Họ và tên"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">Thêm</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateAgent;