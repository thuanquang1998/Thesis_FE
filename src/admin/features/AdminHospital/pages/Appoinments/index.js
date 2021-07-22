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
	const [listRender, setListRender] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);
	const [listDoctor, setListDoctor] = useState([]);

	const [filter, setFilter] = useState({
		searchDoctor:"",
		searchDate: {
			start: null,
			end: null,
		},
		searchStatus: 1,
	})

	// modal xem lịch
	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })

	useEffect(()=> {
		const id = hospitalInfo._id;
		getListSchedule(id);
		getListDoctor(id);
	},[]);
	useEffect(() => {
		const {searchStatus, searchDate, searchDoctor} = filter;
		const {start, end} = searchDate;
		let _resultList = [];
		if(!searchStatus && !searchDoctor && !start && !end) {
			_resultList = [...listSchedule];
		} else {
			let temp = [...listSchedule];
			// filter doctor
			const filterDoctor = temp.filter(item=>item.doctorId.includes(searchDoctor));
			// filter status
			let _resultFilterStatus = [];
			switch (searchStatus) {
				case 1:
					_resultFilterStatus = filterDoctor;
					break;
				case 2:
					_resultFilterStatus = filterDoctor.filter(item=>item.status === 'uncheck');
					break;
				case 3:
					_resultFilterStatus = filterDoctor.filter(item=>item.status === 'checking');
					break;
				case 4:
					_resultFilterStatus = filterDoctor.filter(item=>item.status === 'checked');
					break;
				default:
					break;
			}
			// filter Date
			let _resultFilterDate = [];
			if(!start && !end) {
				_resultFilterDate = _resultFilterStatus;
			} else {
				_resultFilterDate = _resultFilterStatus.filter(item=>{
					const dateFormat = convertDateStringtoDate(item.date);
					const checkStart = moment(dateFormat).isAfter(start);
					const checkEnd = moment(end).isAfter(dateFormat);
					const check = checkStart && checkEnd;
					return check;
				})
			}
			_resultList = [..._resultFilterDate]
		}
		setTimeout(() => {
			setListRender(_resultList);
			setLoadingPage(false)
		}, 300);
	}, [filter])
	const convertDateStringtoDate = (dateStr) => {
        const dateMomentObject = moment(dateStr, "DD/MM/YYYY");
        const dateObject = dateMomentObject.toDate();
        return dateObject
    }

	const getListDoctor = async (id) => {
		setLoadingPage(true);
		try {
			const response = await adminAPI.get_doctors_of_hospital(id);
			if(response.error) throw new Error(response.errors[0].message);
            setListDoctor(response.data.data);
			setLoadingPage(false)
		} catch (error) {
            console.log('error.message :>> ', error.message);
		}
	}
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
					doctorId:x.doctorId,
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
			setListRender(_data)
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

	const renderStatus = (status) => {
        let str = "";
        let color = "";
        switch (status) {
            case 'uncheck':
                str = 'Chưa khám';
                color = "red"
                break;
            case 'checking':
                str = 'Đang xử lí'
                color = "green"
                break;
            case 'checked':
                str = 'Đã khám';
                color = "blue"
                break;
            default:
                str = 'Chưa khám'
                color = "red"
                break;
        }
        return <Tag style={{fontSize:"13px"}} color={`${color}`}>{str}</Tag>
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
            render: (text, record) => {
                const data = renderStatus(record.status);
                return data
            }
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
	const onSearchStatus  = (data) => {
		setLoadingPage(true);
		setFilter({
			...filter,
			searchStatus: data
		})
	}
	const onSearchDoctor  = (data) => {
		setLoadingPage(true);
		setFilter({
			...filter,
			searchDoctor: data
		})
	}
	const onSearchDate  = (data) => {
		setLoadingPage(true);
		
		if(data===null) {
			setFilter({
				...filter,
				searchDate: {
					start: null,
					end: null
				}
			})
		} else {
			setFilter({
				...filter,
				searchDate: {
					start: data[0],
					end: data[1]
				}
			})
		}
		
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
							</div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card>
							<FilterDoctorAdmin
								listDoctor={listDoctor}
								onSearchStatus={onSearchStatus}
								onSearchDate={onSearchDate}
								onSearchDoctor={onSearchDoctor}
								filter={filter}
							/>
							<Table className="table-striped"
								columns={columns}                 
								dataSource={listRender}
								ascend={true}
								style = {{overflowX : 'auto'}}
								rowKey={record => record.id}
								showSizeChanger={true} 
								loading={loadingPage}
								pagination={{position:["bottomCenter"]}}
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
            </div>
        </>
    )
}

export default Appoinments;
