import { Button, Card, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React from 'react';

function BookingConfirm(props) {
    const {handleSubmit, handleReturn, showModal, data} = props;
    return (
        <Modal
            visible={showModal}
            title="Xác nhận thông tin"
            onOk={handleSubmit}
            onCancel={handleReturn}
            footer={[
                <Button key="back" onClick={handleReturn}>
                Quay lại
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                Xác nhận
                </Button>,
            ]}
            >
            <Card title="Thông tin bệnh nhân" headStyle={{color:"#3487db", fontSize:"20px"}}>
                <Row gutter={[8,8]}>
                    <Col span={7}>
                        <p><b>Họ tên:</b></p>
                        <p><b>Ngày sinh:</b></p>
                        <p><b>Giới tính:</b></p>
                        <p><b>Điện thoại:</b></p>
                    </Col>
                    <Col span={15}>
                        <p>{data.patientInfo?.name}</p>
                        <p>{moment(data.patientInfo?.birthday).format('DD/MM/YYYY')}</p>
                        <p>{data.patientInfo?.gender==='male'?'Nam':"Nữ"}</p>
                        <p>{data.patientInfo?.phone}</p>
                    </Col>
                </Row>
            </Card>
            <Card title="Thông tin đăng kí khám" headStyle={{color:"#3487db", fontSize:"20px"}}>
                <Row gutter={[8,8]}>
                    
                    <Col span={7}>
                        <p><b>Bác sĩ:</b></p>
                        <p><b>Địa chỉ:</b></p>
                        <p><b>Ngày khám:</b></p>
                        <p><b>Giờ khám:</b></p>
                    </Col>
                    <Col span={15}>
                        <p>{data.doctorName}</p>
                        <p>{data.patientInfo.address}</p>
                        <p>{moment(data.date).format('DD/MM/YYYY')}</p>
                        <p>{data.time}</p>
                    </Col>
                </Row>
            </Card>
        </Modal>
    );
}

export default BookingConfirm;