import { Button, Card, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import React from 'react';

function BookingConfirm(props) {
    const {handleSubmit, handleReturn, showModal, data} = props;
    console.log('data :>> ', data);
    return (
        <Modal
            visible={showModal}
            title={<h3 style={{margin:0, color:"rgb(52, 135, 219)"}}>Xác nhận thông tin</h3>}
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
                {data.bookingFor &&
                    <>
                        <div className="row">
                            <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Người đặt lịch:</div>
                            <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.bookerInfo?.name}</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Số điện thoại người đặt:</div>
                            <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.bookerInfo?.phone}</div>
                        </div>
                    </>
                }
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bệnh nhân:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.patientInfo?.name}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Ngày sinh:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{moment(data.patientInfo?.birthDay).format('DD/MM/YYYY')}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giới tính:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.patientInfo?.gender==='male'?'Nam':"Nữ"}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Điện thoại:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.patientInfo?.phone}</div>
                </div>
            </Card>
            <Card title="Thông tin đăng kí khám" headStyle={{color:"#3487db", fontSize:"20px"}} style={{marginTop:"15px"}}>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bác sĩ:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.doctorName}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Địa chỉ:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.patientInfo.address}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Phòng khám:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.room}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Ngày khám:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{moment(data.date).format('DD/MM/YYYY')}</div>
                </div>
                <div className="row">
                    <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giờ khám:</div>
                    <div className="col-sm-8 text-sm-left" style={{fontWeight:"600"}}>{data.time}</div>
                </div>
            </Card>
        </Modal>
    );
}

export default BookingConfirm;