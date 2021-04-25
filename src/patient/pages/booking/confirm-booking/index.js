import { Button, Card, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';

function ConfirmBooking(props) {
    const {handleSubmit, handleReturn, showModal} = props;
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
                        <p>Lưu Quang Thuận</p>
                        <p>02/01/1998</p>
                        <p>Nam</p>
                        <p>0974101702</p>
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
                        <p>Lưu Quang Thuận</p>
                        <p>54/19 đường số 7, KP3, Linh Trung, Thủ Đức</p>
                        <p>19/12/2020</p>
                        <p>8h30-9h00</p>
                    </Col>
                </Row>
            </Card>
        </Modal>
    );
}

export default ConfirmBooking;