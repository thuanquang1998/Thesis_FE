import React,{useState} from 'react';
import {Modal, Button} from 'antd';
import InfoSchedule from '../InfoSchedule';
function ModalSchedule(props) {
    const {modalData, handleOk, handleClose} = props;
    const {data} = modalData;
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
            <InfoSchedule data={data}/>
        </Modal>
    );
}

export default ModalSchedule;