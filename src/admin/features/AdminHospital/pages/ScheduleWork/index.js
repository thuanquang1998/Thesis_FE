import { Badge, Button, Table, Tag, Form, Select, Row, Card, Col, Input } from 'antd';
import { Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import SidebarNav from '../../../../components/SideBar';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import { useSnackbar } from 'notistack';
import Swal from "sweetalert2";
import moment from 'moment';

import logoDoctor from '../../../../assets/img/male_logo.png'


const Appoinments = () => {
    const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [listSchedule, setListSchedule] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);
	const [viewItem, setViewItem] = useState({});
    const [show, setShow] = useState(null);



	useEffect(()=> {
		const id = hospitalInfo._id;
		getListSchedule(id);
	},[])
	const getListSchedule = async (id) => {
		setLoadingPage(true);
		try {
			const response = await adminAPI.get_appointment_of_hospital(id);
			if(response.error) throw new Error(response.errors[0].message);
			console.log('response.data :>> ', response.data);   
			const _data = response.data.map(x=>{
				const { appointmentInfo, patientInfo, bookerInfo} = x;
				const obj = {
					id: x.id,
					patient: patientInfo.name,
					doctor: appointmentInfo.doctorName,
					speciality: appointmentInfo.doctorSpec,
					// address: `${appointmentInfo.location.room} ${appointmentInfo.location.hospitalName}`,
					date: moment(appointmentInfo.date).format('DD/MM/YYYY'),
					time: appointmentInfo.time,
					status: x.status,

					nameBookerFor: bookerInfo.name || "",
					phoneBookerFor: bookerInfo.phone || "",
					bookingFor: x.bookingFor,
					room: appointmentInfo.location.room,
					addressHospital: appointmentInfo.location.hospitalAddress,
					hospital: appointmentInfo.location.hospitalName,

					addressPatient: patientInfo.address,
					genderPatient: patientInfo.gender,
					phonePatient: patientInfo.phone,
					medicalRecordSumanry: patientInfo.medicalRecordSumanry,
				}
				return obj
			}) 
            setListSchedule(_data);
			setLoadingPage(false)
		} catch (error) {
            console.log('error.message :>> ', error.message);
		}
	}

	const handleClose = () => {
		setShow(false)	
	}

	const handleShow = (id) =>{
		setShow(id)
	}

	const handleViewItem = (data) => {
		console.log('data :>> ', data);
		setViewItem(data);
		handleShow('view');
	}

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
					<span className="avatar avatar-sm mr-2"><img src={logoDoctor} className="avatar-img" alt=""  /></span>
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
                    <a href="#0" className="btn btn-sm bg-success-light" onClick={()=>handleViewItem(record)}><i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Xem</a>
                </div>
            ),
		},		
	]
	const onSubmitSchedule = (value) => {
        console.log('value :>> ', value);
        let data = new FormData();
    }
    return (
        <>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							
                            <div className="col-sm-7 col-auto">
							    <h3 className="page-title" style={{paddingTop:"20px"}}>{`Thông tin ${hospitalInfo.name}`}</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">{hospitalInfo.name}</li>
								</ul>
						</div>
						<div className="col-sm-5 col">
							<a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>handleShow('addSchedule')}>
								Thêm lịch</a>
						</div>
						</div>
					</div>
                    
                    <div className="infobv">
                        <h4>Lịch đã được cập nhật đến ngày 30/5/2021</h4>
						<Card 
							title={<>Danh sách lịch khám <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
						>
							<Table className="table-striped"
								columns={columns}                 
								dataSource={listSchedule}
								ascend={true}
								style = {{overflowX : 'auto'}}
								rowKey={record => record.id}
								showSizeChanger={true} 
								loading={loadingPage}
							/>
						</Card>
					</div>
                </div>
            </div>
            <Modal show={show === 'addSchedule'} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title><h5 className="modal-title">Thêm lịch</h5></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				    <Form
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="vertical"
                        size="large"
                        onFinish={onSubmitSchedule}
                    >
                        <Form.Item name="file" label="Chọn file">
                            <input
                                // multiple
                                type="file"
                                accept="csv"
                                // ref={fileInput}
                                onChange={() => {}}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Thêm lịch</Button>
                        </Form.Item>
					</Form>
				</Modal.Body>
			</Modal>
        </>
    )
}

export default Appoinments;
