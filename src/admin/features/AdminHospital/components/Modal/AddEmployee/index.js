import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const AddEmployee = ({showModal, onCancel, onSubmit}) => {
    return (
        <Modal 
            visible={showModal}
            title={<h4>Thêm nhân viên</h4>}
            width={1000}
            onOk={()=>{}}
            onCancel={()=>onCancel()}
            footer={[
                <Button key="back" onClick={()=>onCancel()}>
                Quay lại
                </Button>,
                <Button key="submit" type="primary" onClick={()=>{}}>
                Xác nhận
                </Button>,
            ]}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
}

export default AddEmployee;