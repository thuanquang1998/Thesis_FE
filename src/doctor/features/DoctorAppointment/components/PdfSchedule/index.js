import React,{useState, useEffect} from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Card, Tabs, Space } from 'antd';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import font from './OpenSansCondensed-Light.ttf';

Font.register({ family: 'Open Sans Condensed Light', src: font, format: "truetype"});

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

const MyDoc = (props) => {
    const {data} = props;
    const {patientInfo, appointmentInfo} = data;
    const [initData, setInitData] = useState({...INIT_DATA});
    const [loadingInitData, setLoadingInitData] = useState(true)
    
    useEffect(()=> {
        const temp = props.data;
        console.log('temp :>> ', temp);
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

    const styles = StyleSheet.create({
        page: {
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Open Sans Condensed Light',
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        },
        titlee: {
            fontSize: '24px',
            fontWeight: 800,
            textAlign: 'left',
            marginBottom: '10px',
            fontWeight: 'bold',
        }
      });

    return (
        <Document className="info-schedule">
            <Page size="A4" style={styles.page}>
                <View style={{display:'flex', flexDirection:'column', padding: '30px 0 0 30px'}}>
                    <View><Text style={styles.titlee}>Thông tin bệnh nhân:</Text></View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Tên bệnh nhân: </Text></View>
                        <View style ={{width: '50%'}}><Text>{patientInfo.name||""}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Ngày sinh: </Text></View>
                        <View style ={{width: '50%'}}><Text>{moment(patientInfo.birthDay).format('DD-MM-YYYY')}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Địa chỉ: </Text></View>
                        <View style ={{width: '50%'}}><Text>{patientInfo.address}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Số điện thoại liên hệ: </Text></View>
                        <View style ={{width: '50%'}}><Text>{patientInfo.phone}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Giới tính: </Text></View>
                        <View style ={{width: '50%'}}><Text>{patientInfo.gender==="male"?"Nam":"Nữ"}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Lý do khám: </Text></View>
                        <View style ={{width: '50%'}}><Text>{patientInfo.medicalRecordSumanry}</Text></View>
                    </View>
                </View>
                <View style={{display:'flex', flexDirection:'column', padding: '30px 0 0 30px'}}>
                    <View style={styles.titlee}><Text>Thông tin lịch khám:</Text></View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Tên bệnh viện: </Text></View>
                        <View style ={{width: '50%'}}><Text>{appointmentInfo.location.hospitalName}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Địa chỉ: </Text></View>
                        <View style ={{width: '50%'}}><Text>{appointmentInfo.location.hospitalAddress}</Text></View>
                    </View>
                    <View  style={{display:'flex', flexDirection:'row', marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Tên bác sĩ: </Text></View>
                        <View style ={{width: '50%'}}><Text>{appointmentInfo.doctorName}</Text></View>
                    </View>
                    <View style={{display:'flex', flexDirection:'row' , marginBottom: '10px', width: '80%', justifyContent:'space-around'}}>
                        <View style ={{width: '50%'}}><Text>Phòng: </Text></View>
                        <View style ={{width: '50%'}}><Text>{appointmentInfo.location.room}</Text></View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default function PdfSchedule(props){
    const loadingButton = <Button>Loading document...</Button>
    const downloadButton = <Button>Download PDF</Button>
    return (
        <div className="App">
            <PDFDownloadLink document={<MyDoc data = {props.data}/>} fileName="lichkham.pdf">
                {({ blob, url, loading, error }) => (loading ?  loadingButton: downloadButton)}
            </PDFDownloadLink>
        </div>
    )
}

