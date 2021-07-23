import { Badge, Button, Card, Col, Row, Table, Tabs, Tag } from 'antd';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import patientAPI from '../../../../../api/patientApi';
import { compareDates } from '../../../../../utils';
import LoadingTop from '../../../../components/loadingTop';
// import { get_schedule_patient } from '../../../../../redux/actions/patientActions';
import PatientSidebar from '../../components/PatientSideBar';
import ScheduleCurrent from '../../components/ScheduleCurrent';
import ChangeSchedule from '../../components/ChangeSchedule';

function PatientSchedule(props) {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const patient = useSelector(state=>state.patient)
    const patientInfo = patient.currentUser.patientInfo;
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);


    const [modalReExam, setModalReExam] = useState({
        visible: false,
        data: {},
    })
    useEffect(() => {
        get_schedule_patient(patientInfo);
    }, [])

    const get_schedule_patient = async (patientInfo) => {
        console.log("ddddddddddd", patientInfo);
        setLoadingPage(true);
        try {
            const response = await patientAPI.get_schedule(patientInfo.id);
            console.log('response :>> ', response);
            if (response.error) throw new Error(response.errors[0].message)
            const _data = response.data.map(x=>{
                const { appointmentInfo, patientInfo} = x;
                const obj = {
                    id: x.id,
                    patient: patientInfo.name,
                    doctor: appointmentInfo.doctorName,
                    speciality: 'Tiêu hóa',
                    address: `${appointmentInfo.location.room} ${appointmentInfo.location.hospitalName}`,
                    date: moment(appointmentInfo.date).format('DD/MM/YYYY'),
                    time: appointmentInfo.time,
                    status: x.status,
                    fullData: {...x},
                    dateCheck: appointmentInfo.date,
                    room: appointmentInfo.location.room,
                }
                return obj
            })
            setListSchedule(_data);
            setLoadingPage(false)
        } catch (error) {
            console.log('error.message :>> ', error.message);
            setLoadingPage(false)
        }
    }

    const cancelSchedule = async (record) => {
        let currentTime = moment();
        const check1 = compareDates( new Date(record.dateCheck), new Date(currentTime))
        // const check2 = record.status!=="uncheck"?true:false;
        // const check = check1&&check2;

        if(check1) {
			Swal.fire({
				icon: "error",
                title: "Không thể xóa lịch khám này.",
	 			text: "Chỉ được hủy lịch khám trước 1 ngày."
			});
		} else {
			Swal.fire({
				icon: "info",
                title: "Xác nhận xóa lịch khám?",
				text: "Lịch khám sẽ bị xóa khỏi hệ thống.",
				showCancelButton: true,
				cancelButtonColor: "#3085d6",
				confirmButtonColor: "#d33",
				confirmButtonText: "Xóa",
				cancelButtonText: "Hủy"
			})
			.then((result) => {
				if (result.value) {
					cancelScheduleMethod(record.id);
				} 
			})
			.catch((error) => {
				console.log('error.message :>> ', error.message);
			});
		}
    }
    const cancelScheduleMethod = async (id) => {
        setLoadingPage(true)
        try {
            const response = await patientAPI.cancel_schedule(id);
			if(response.error) throw new Error(response.errors[0].message);
            get_schedule_patient(patientInfo);
            setTimeout(() => {
        		enqueueSnackbar('Xóa lịch khám thành công.', {variant: 'success'});
                setLoadingPage(false)
			}, 300);

        } catch (error) {
			console.log('error.message :>> ', error.message);
        	enqueueSnackbar('Xóa lịch khám không thành công.', {variant: 'error'})
            setLoadingPage(false)
        }
    }

    const changeSchedule = async (record) => {
        console.log('record :>> ', record);
        // check condition
        let currentTime = moment();
        const  check1 = moment(record.dateCheck).isAfter(currentTime);
        const check2 = record.status!=="uncheck"?true:false;
        const check = check1&&check2;
        if(check) {
			Swal.fire({
				icon: "error",
                title: "Không thể đổi lịch khám này.",
	 			text: "Chỉ được đổi lịch khám trước 1 ngày."
			});
		} else {
			Swal.fire({
				icon: "info",
                title: "Xác nhận đổi lịch khám?",
				// text: "Lịch khám sẽ bị xóa khỏi hệ thống.",
				showCancelButton: true,
				cancelButtonColor: "#3085d6",
				confirmButtonColor: "#d33",
				confirmButtonText: "Đổi",
				cancelButtonText: "Hủy"
			})
			.then((result) => {
				if (result.value) {
					// cancelScheduleMethod(record.id);
                    console.log("goi ham doi lich");
                    setModalReExam({
                        ...modalReExam,
                        visible: true,
                        data: {...record}
                    })
				} 
			})
			.catch((error) => {
				console.log('error.message :>> ', error.message);
			});
		}
    }
    const handleChangeSchedule = async (value) => {
        setLoadingPage(true);
        console.log('value change_schedule:>> ', value);
        try {
            const response = await patientAPI.change_schedule(value);
            console.log('response :>> ', response);
            if(response.error) throw new Error(`${response.status}`);
            setTimeout(() => {
                enqueueSnackbar('Đổi lịch khám thành công.', {variant: 'success'});
                get_schedule_patient(patientInfo);
                setLoadingPage(false)
            }, 300);
        } catch (error) {
            console.log('error :>> ', error.message);
            if(error.message==="401") {
                enqueueSnackbar('Bạn chỉ được đổi lịch khám 1 lần.', {variant: 'error'});
            } else {
                enqueueSnackbar('Đổi lịch khám không thành công.', {variant: 'error'});
            }
            setLoadingPage(false)
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
            render: (text, record) => {
                const data = renderStatus(record.status);
                return data
            }
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button onClick={()=>console.log(record.id)} type="primary" style={{marginRight:"5px"}}>
                        Đổi lịch
                    </Button>
                    <Button onClick={()=>cancelSchedule(record)} type="danger">
                        Hủy lịch
                    </Button>
                </div>
            ),
		},		
	]
    console.log('listSchedule :>> ', listSchedule);
    return (
        <>
            {loadingPage && <LoadingTop/>}
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
                            <ScheduleCurrent 
                                data={listSchedule}
                                cancelSchedule={cancelSchedule}
                                changeSchedule={changeSchedule}
                            />
                        </Col>
                        <ChangeSchedule
                            modalData={modalReExam}
                            handleOk={()=>{
                                setModalReExam({
                                    ...modalReExam,
                                    visible: !modalReExam.visible,
                                })
                            }}
                            handleClose={()=>{
                                setModalReExam({
                                    ...modalReExam,
                                    visible: !modalReExam.visible,
                                })
                            }}
                            handleChangeSchedule={handleChangeSchedule}
                        />
                    </Row>
                </div>
            </div>
        </>
    );
}

export default PatientSchedule;