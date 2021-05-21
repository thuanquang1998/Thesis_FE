import { Badge, Card, Col, Row, Table, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { get_schedule_patient } from '../../../../../redux/actions/patientActions';
import PatientSidebar from '../../components/PatientSideBar';
import patientAPI from '../../../../../api/patientApi';
import moment from 'moment';


function DoctorScheduleManage(props) {
    // const dispatch = useDispatch();
    // const patient = useSelector(state=>state.patient)
    // const patientInfo = patient.currentUser.patientInfo;
    // const [listSchedule, setListSchedule] = useState([]);
    // const [loadingSchedule, setLoadingSchedule] = useState(true);

    // useEffect(() => {
    //     console.log("1111111111111111111111");
    //     // dispatch(get_schedule_patient(patientInfo))
    //     setLoadingSchedule(true);
    //     get_schedule_patient(patientInfo);
    // }, [])

    // const get_schedule_patient = async (patientInfo) => {
    //     try {
    //         const response = await patientAPI.get_schedule(patientInfo.id);
    //         console.log('response :>> ', response);
    //         if(!response.error) {
    //             // convert data
    //             const _data = response.data.map(x=>{
    //                 const { appointmentInfo, patientInfo} = x;
    //                 const obj = {
    //                     id: x.id,
    //                     patient: patientInfo.name,
    //                     doctor: appointmentInfo.doctorName,
    //                     speciality: 'Tiêu hóa',
    //                     address: `${appointmentInfo.location.room} ${appointmentInfo.location.hospitalName}`,
    //                     date: moment(appointmentInfo.date).format('DD/MM/YYYY'),
    //                     time: appointmentInfo.time,
    //                     status: x.status
    //                 }
    //                 return obj
    //             })
    //             setListSchedule(_data);
    //         } else {

    //         }
    //         setLoadingSchedule(false)
    //     } catch (error) {
            
    //     }
    // }

    // const cancelSchedule = async (id) => {
    //     try {
    //         const response = await patientAPI.cancel_schedule(id);
    //         console.log('response cancelSchedule:>> ', response);
    //     } catch (error) {
            
    //     }
    // }
   
    const columns = [
        {
			title: 'Bệnh nhân',
            dataIndex: 'patient',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title: 'Tên bác sĩ',
            dataIndex: 'doctor',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'speciality',
		},
        {
			title:'Ngày khám',
			dataIndex:'date',
		},
        {
			title:'Giờ khám',
			dataIndex:'time',
		},
        {
			title:'Trạng thái',
			dataIndex:'status',
            render: (text, record) => (
                <Badge style={{ backgroundColor: '#52c41a' }}>{record.status?'Chưa khám':'Đã khám'}</Badge>
            )
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button onClick={()=>console.log(record.id)} type="primary" style={{marginRight:"5px"}}>
                        Đổi lịch
                    </Button>
                    <Button onClick={()=>cancelSchedule(record.id)} type="danger">
                        Hủy lịch
                    </Button>
                </div>
            ),
		},		
	]
    return (
        <>
            {/* <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Quản lí tài khoản</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Quản lí tài khoản</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Row gutter={[20,20]}>
                        <Col md={{span:10}} lg={{span:8}} xl={{span:6}}>
                            <PatientSidebar />
                        </Col>
                        <Col md={{span:14}} lg={{span:16}} xl={{span:18}}>
                            <Card 
                                title={<>Danh sách lịch khám <Badge count={listSchedule.length} style={{ backgroundColor: '#52c41a' }} /></>}
                            >
                                <Table className="table-striped"
                                    columns={columns}                 
                                    dataSource={listSchedule}
                                    ascend={true}
                                    style = {{overflowX : 'auto'}}
                                    rowKey={record => record.id}
                                    showSizeChanger={true} 
                                    loading={loadingSchedule}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div> */}
        </>
    );
}

export default DoctorScheduleManage;