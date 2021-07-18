import { Badge, Button, Table, Tag, Form, Select, Row, Card, Col, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
// import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarNav from '../../../../components/SideBar';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import { useSnackbar } from 'notistack';
import Swal from "sweetalert2";
import moment from 'moment';
import FilterDoctorAdmin from '../../components/FilterDoctorAdmin';
import logoDoctor from '../../../../assets/img/male_logo.png'
import ModalSchedule from '../../../../../doctor/features/DoctorAppointment/components/ModalSchedule';
import doctorAPI from '../../../../../api/doctorAPI';


const Appoinments = () => {
    const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
    const { enqueueSnackbar } = useSnackbar();
	const [listSchedule, setListSchedule] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);
	const [show, setShow] = useState(null);
	const [viewItem, setViewItem] = useState({});

	const [filter, setFilter] = useState({
		searchName: "",
		searchSpec: "",
	})

	// modal xem lịch
	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })

	useEffect(()=> {
		const id = hospitalInfo._id;
		getListSchedule(id);
	},[])
	const getListSchedule = async (id) => {
		setLoadingPage(true);
		try {
			const response = await adminAPI.get_appointment_of_hospital(id);
			if(response.error) throw new Error(response.errors[0].message);
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

					fullData: {...x}
				}
				return obj
			}) 
            setListSchedule(_data);
			setLoadingPage(false)
		} catch (error) {
            console.log('error.message :>> ', error.message);
		}
	}

	const handleViewSchedule = (id) => {
		setLoadingPage(true);	
		getScheduleById(id);
	}

	const getScheduleById =  async (id) => {
		try {
			const response = await doctorAPI.get_appointment_by_id(id);
			if(response.error) throw new Error("error");
			setModalData({
				...modalData,
				visible: true,
				data: {...response.data}
			})
			setLoadingPage(false)
		} catch (error) {
			console.log('error :>> ', error);
			setLoadingPage(false)
			enqueueSnackbar('Lịch khám đã bị hủy', {variant: 'error'});
			getListSchedule(hospitalInfo._id);
		}
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
                    <a href="#0" 
						className="btn btn-sm bg-success-light" 
						onClick={()=>handleViewSchedule(record.id)}
					>
					<i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Xem
					</a>
                </div>
            ),
		},		
	]
	const handleSearchName  = (data) => {
		setFilter({...filter, searchName: data});
		setLoadingPage(true);
	}
	const handleSearchSpec  = (data) => {
		setFilter({...filter, searchSpec: data});
		setLoadingPage(true);
	}
    return (
        <>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách lịch khám</h3>
								{/* <ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">{hospitalInfo.name}</li>
								</ul> */}
							</div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card 
							// title={<>Danh sách lịch khám <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
						>
							<FilterDoctorAdmin
								onSearchName={handleSearchName}
								onSearchSpec={handleSearchSpec}
							/>
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
				<ModalSchedule
					modalData={modalData}
					handleOk={()=>{
						setModalData({
							...modalData,
							visible: !modalData.visible,
						})
					}}
					handleClose={()=>{
						setModalData({
							...modalData,
							visible: !modalData.visible,
						})
					}}
				/>

				{/* <Modal show={show === 'view'} onHide={handleClose} centered className="modal-xl">
					<Modal.Header closeButton>
						<Modal.Title><h5 className="modal-title">Sửa chuyên khoa</h5></Modal.Title>
					</Modal.Header>
				<Modal.Body>
					<Row gutter={[20,20]}>
						<Col span={12} style={{textAlign:'center'}}>
							<h4>Thông tin bệnh nhân:</h4>
							{viewItem.bookingFor &&
								<div className="row">
									<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên người đặt dùm</div>
									<div className="col-sm-8">{viewItem.nameBookerFor}</div>
								</div>
							}
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên bệnh nhân</div>
								<div className="col-sm-8">{viewItem.patient}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Ngày sinh</div>
								<div className="col-sm-8">{viewItem.birthday}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
								<div className="col-sm-8">{viewItem.addressPatient}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Số điện thoại liên hệ</div>
								<div className="col-sm-8">{viewItem.phonePatient}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Giới tính</div>
								<div className="col-sm-8">{viewItem.genderPatient}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Lý do khám</div>
								<div className="col-sm-8">{viewItem.medicalRecordSumanry}</div>
							</div>
						</Col>
						<Col span={12} style={{textAlign:'center'}}>
							<h4>Thông tin bệnh viện:</h4>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên bệnh viện</div>
								<div className="col-sm-8">{viewItem.hospital}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Địa chỉ</div>
								<div className="col-sm-8">{viewItem.addressHospital}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên bác sĩ</div>
								<div className="col-sm-8">{viewItem.doctor}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Chuyên khoa</div>
								<div className="col-sm-8">{viewItem.speciality}</div>
							</div>
							<div className="row">
								<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Phòng khám</div>
								<div className="col-sm-8">{viewItem.room}</div>
							</div>
						</Col>
					</Row>
				</Modal.Body>
			</Modal> */}
            </div>

        </>
    )
}

export default Appoinments;
