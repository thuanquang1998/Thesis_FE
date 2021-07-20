import React,{useState} from 'react';
import {Modal, Button} from 'antd';
// import BookingForm from '../BookingForm';
function BookingFormModal(props) {
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
                <Button key="back" onClick={handleOk}>
                  Ok
                </Button>
              ]}
        >
            BookingFormModal
            {/* <BookingForm data={data}/> */}
        </Modal>
    );
}

export default BookingFormModal;




