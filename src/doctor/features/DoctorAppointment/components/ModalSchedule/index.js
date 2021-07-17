import React,{useState} from 'react';
import {Modal, Button} from 'antd';
import InfoSchedule from '../InfoSchedule';
import PdfSchedule from '../PdfSchedule';
import './style.css';
function ModalSchedule(props) {
    const {modalData, handleOk, handleClose} = props;
    const {data} = modalData;
    return (
        <Modal 
            title="Xem lịch khám" 
            width={600}
            visible={modalData.visible} 
            onOk={handleOk} 
            onCancel={handleClose}
            footer={[
                <div style={{display:'flex', flexWrap: 'nowrap', flexDirection: 'row', float:'right'}}>
                    <div><PdfSchedule data={data}></PdfSchedule></div>
                    <div>
                        <Button key="back" onClick={handleOk}>
                        Ok
                        </Button>
                    </div>
                </div>
              ]}
        >
            <InfoSchedule data={data}/>
        </Modal>
    );
}

export default ModalSchedule;