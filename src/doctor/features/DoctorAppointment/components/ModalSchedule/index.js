import React,{useState} from 'react';
import {Modal, Button} from 'antd';
import InfoSchedule from '../InfoSchedule';
function ModalSchedule(props) {
    const {modalData, handleOk, handleClose} = props;
    console.log(`modalData.fullData`, modalData.fullData)
    return (
        <Modal 
            title="Xem lịch khám" 
            visible={modalData.visible} 
            onOk={handleOk} 
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleOk}>
                  Ok
                </Button>
              ]}
        >
            <InfoSchedule data={props.fullData}/>
        </Modal>
    );
}

export default ModalSchedule;