import React,{useState, useEffect} from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Card, Tabs, Space } from 'antd';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './style.css'
import moment from 'moment';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const { Option } = Select;
const INIT_DATA = {
    name: "",
    phone: "",
    sex: "",
    address: "",
    doctorName:"",
    typeSchedule: "",
    hospital:"",                     
    addressHospital:"",



}
function InfoSchedule(props) {
    const {data} = props;
    const {patientInfo, appointmentInfo} = data;
    const [initData, setInitData] = useState({...INIT_DATA});
    const [loadingInitData, setLoadingInitData] = useState(true)
    
    useEffect(()=> {
        const temp = props.data;
        const {patientInfo, appointmentInfo} = temp;
        if(temp.examineType) {
            // kham moi
            const _initData = {
                ...initData,
                name: patientInfo.name||"",
                phone: patientInfo.phone||"",
                sex: patientInfo.gender==="male"?"Nam":"Nữ",
                address: patientInfo.address||"",
                doctorName: appointmentInfo.doctorName||"",
                typeSchedule: "Khám mới",
                hospital: appointmentInfo.location?.hospitalName||"",                     
                addressHospital: appointmentInfo.location?.hospitalAddress,
            };
            setInitData(_initData);
            setLoadingInitData(false)
        } else {
            // tai kham
        }
    },[props.data]);
    
    
    return (
        <div className="info-schedule">
            <Row gutter={[20,20]}>
                <Col span={24} style={{textAlign:'center'}}>
                    <p className="titlee">Thông tin bệnh nhân:</p>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Tên bệnh nhân:</div>
                        <div className="col-sm-8 text-sm-left" >{patientInfo.name||""}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Ngày sinh</div>
                        <div className="col-sm-8 text-sm-left">{moment(patientInfo.birthDay).format('DD-MM-YYYY')}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
                        <div className="col-sm-8 text-sm-left">{patientInfo.address}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Số điện thoại liên hệ</div>
                        <div className="col-sm-8 text-sm-left">{patientInfo.phone}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Giới tính</div>
                        <div className="col-sm-8 text-sm-left">{patientInfo.gender==="male"?"Nam":"Nữ"}</div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Lý do khám</div>
                        <div className="col-sm-8 text-sm-left">{patientInfo.medicalRecordSumanry}</div>
                    </div>
                </Col>
                <Col span={24} style={{textAlign:'center'}}>
                    <p className="titlee">Thông tin lịch khám:</p>
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
                    <div className="row">
                        <div className="col-sm-4 text-sm-right mb-0 mb-sm-3">Loại lịch khám</div>
                        <div className="col-sm-8 text-sm-left" >{props.data.examineType==="new"?"Khám mới":"Tái khám"}</div>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default InfoSchedule;