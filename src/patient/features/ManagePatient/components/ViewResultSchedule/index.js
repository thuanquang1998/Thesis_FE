
import React,{useState} from 'react';
import {Modal, Button, Row, Col} from 'antd';
const ShowData = (props) => {
    // const {clinnical_examination} = props.summary;
    console.log('props :>> ', props);
    return(
        <div className="info-schedule">
            <Row gutter={[20,20]}>
                {/* <p className="titlee">Thông tin lịch khám:</p> */}
                <Col span={12} style={{textAlign:'center'}}>
                    {/* <div className="row">
                        <p className="titlee">Thông tin bệnh nhân</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bệnh nhân</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.name}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giới tính</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.gender==="male"?"Nam":"Nữ"}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Năm sinh</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.birthDay}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Số điện thoại</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.phone}</div>
                    </div> */}
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <p className="titlee">Thông tin bệnh viện:</p>
                    </div>
                    {/* <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bệnh viện</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.location.hospitalName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.location.hospitalName}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bác sĩ</div>
                        <div className="col-sm-8 text-sm-left" >{appointmentInfo.doctorName}</div>
                    </div> */}
                    
                </Col>
                
            </Row>
            <Row>
            <p className="titlee">Kết quả khám</p>
            </Row>
            <Row gutter={[20,20]}>
                {/* <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhịp tim</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination?.heart_rate}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhiệt độ</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination.temperature}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Cân nặng</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination.weight}</div>
                    </div>
                </Col>
                <Col span={12} style={{textAlign:'center'}}>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Huyết áp</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination.blood_pressure}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Nhịp thở</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination.breathing}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Chiều cao</div>
                        <div className="col-sm-8 text-sm-left" >{props.summary.clinnical_examination.height}</div>
                    </div>
                    
                </Col> */}
                
            </Row>
            <Row gutter={[20,20]}>
                {/* <Col span={24} style={{textAlign:'center'}}>
                    {props.summary.medical_test.length!==0 && 
                    props.summary.medical_test.map((item,index)=>(
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
                </Col> */}
            </Row>
        </div> 
    )
}
function ViewResultSchedule(props) {
    const {modalData, handleOk, handleClose} = props;
    // const {summary, appointmentInfo} = modalData.data;
    // const patientInfo = modalData.data.appointmentInfo.patientInfo;
    // const appointmentInfo = modalData.data.appointmentInfo.appointmentInfo;
    // const {medical_test} = summary;
    const {summary, appointmentInfo} = modalData.data;
    

    return (
        <Modal 
            title="Kết quả khám" 
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
