import { Badge, Card, Col, Row, Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_schedule_patient } from '../../../../../redux/actions/patientActions';
import PatientSidebar from '../../components/PatientSideBar';
function PatientSchedule(props) {
    const dispatch = useDispatch();
    const patient = useSelector(state=>state.patient)
    const patientInfo = patient.currentUser.patientInfo;
    
    useEffect(() => {
        dispatch(get_schedule_patient(patientInfo))
    }, [])
   

    const defaultValue = {
        name: patientInfo.fullName,
        phone: patientInfo.fullName
    }
    const columns = [
		{
			title: 'Tên bác sĩ',
			// dataIndex: 'doctor_name',
            dataIndex: 'doctorId',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span className="avatar avatar-sm mr-2"><img src='http://localhost:3002/images/avatar/user.png' className="avatar-img" alt=""  /></span>
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'specialities',
		},
		{
			title:'Tên bệnh nhân',
			dataIndex:'patient_name',
		},
		{
			title:'Thời gian khám',
			dataIndex:'time',
			render: (text, record) => (            
				<div className="table-avatar">
					<p>5 Nov 2020</p>
					<p>11.00 AM - 11.35 AM</p>
				</div>
			), 
		},
		{
		title: 'Sự kiện',
		render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light"><i className="fe fe-pencil"></i>Đổi lịch khám</a>
				<a href="#0" className="btn btn-sm bg-danger-light"><i className="fe fe-trash"></i>Hủy lịch khám</a>
			</div>
		),
		},		
	]
    const data = [
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
	]
    return (
        <>
            <div className="breadcrumb-bar">
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
                                title={<>Danh sách lịch khám <Badge count="2" style={{ backgroundColor: '#52c41a' }} /></>}
                            >
                                <Table className="table-striped"
                                    columns={columns}                 
                                    dataSource={data}
                                    ascend={true}
                                    style = {{overflowX : 'auto'}}
                                    rowKey={record => record.id}
                                    showSizeChanger={true} 
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default PatientSchedule;