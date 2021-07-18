
import React,{useState} from 'react';
import {Modal, Button, Row, Col} from 'antd';
import moment from 'moment';
const ShowData = (props) => {
    const {clinnical_examination, medical_test} = props.summary;
    const {appointmentInfo, patientInfo } = props.appointmentInfo;
    return(
        <div className="info-schedule">
            <p className="titlee">Thông tin lịch khám:</p>
            <Row gutter={[20,20]}>
                <Col span={12} style={{textAlign:'center'}}>
                    {/* <div className="row">
                        <p className="titlee">Thông tin bệnh nhân</p>
                    </div> */}
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bệnh nhân</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.name}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giới tính</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.gender==="male"?"Nam":"Nữ"}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Ngày sinh</div>
                        <div className="col-sm-8 text-sm-left" >{moment(patientInfo.birthDay).format("DD/MM/YYYY")}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Số điện thoại</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.phone}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.address}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Lý do khám</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.medicalRecordSumanry}</div>
                    </div>
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Bác sĩ điều trị</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.doctorName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Bệnh viện</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.location.hospitalName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.location.hospitalAddress}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Phòng khám</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.location.room}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Ngày khám</div>
                        <div className="col-sm-8 text-sm-left" >{moment(appointmentInfo.date).format('DD/MM/YYYY')}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giờ khám</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.time}</div>
                    </div>
                   
                    
                </Col>
            </Row>
                
            <Row>
            <p className="titlee">Kết quả khám</p>
            </Row>
            <Row gutter={[20,20]}>
                <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhịp tim</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.heart_rate||""}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhiệt độ</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.temperature||""}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Cân nặng</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.weight||""}</div>
                    </div>
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Huyết áp</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.blood_pressure||""}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhịp thở</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.breathing||""}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Chiều cao</div>
                        <div className="col-sm-8 text-sm-left" >{clinnical_examination?.height||""}</div>
                    </div>
                </Col>
            </Row>
            <Row gutter={[20,20]}>
                <Col span={24} style={{textAlign:'center'}}>
                    {medical_test.length!==0 && 
                    medical_test.map((item,index)=>(
                        <div key={index} className="row">
                            <div className="col-sm-4 text-sm-left mb-0 mb-sm-3">Kiểm tra {item.name}</div>
                            <div className="col-sm-8 text-sm-left" >{item.result||""}</div>
                        </div>
                    ))
                        
                    }
                    
                    <div className="row">
                        <div className="col-sm-4 text-sm-left mb-0 mb-sm-3">Kết luận</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.summary}</div>
                    </div>
                </Col>
            </Row>
        </div> 
    )
}
function ViewResultSchedule(props) {
    const {modalData, handleOk, handleClose} = props;
    const {summary, appointmentInfo} = modalData.data;
    return (
        <Modal 
            title={<p style={{margin: 0, fontSize: "25px !important", fontWeight:"600"}}>Kết quả khám</p>}
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
            <ShowData summary={summary} appointmentInfo={appointmentInfo}/>
        </Modal>
    );
}

export default ViewResultSchedule;
