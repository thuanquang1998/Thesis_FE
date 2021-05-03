import React, {useState} from 'react';
import { Modal, Button, Space } from 'antd';

function ModalBooking(props) {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
        <div style={{color:"red", position: "absolute", top: "500px", zIndex:"999", textAlign: "center"}}>
            {/* <h1 >
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa
            </h1> */}
           <Modal title="Basic Modal" visible={props.status} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default ModalBooking;