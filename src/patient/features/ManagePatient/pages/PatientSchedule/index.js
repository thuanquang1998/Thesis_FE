import { Badge, Button, Card, Col, Row, Table, Tabs } from 'antd';
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
import ScheduleOutDate from '../../components/ScheduleOutDate';
import ScheduleCurrent from '../../components/ScheduleCurrent';
import ScheduleFuture from '../../components/ScheduleFuture';
const { TabPane } = Tabs;


function PatientSchedule(props) {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const patient = useSelector(state=>state.patient)
    const patientInfo = patient.currentUser.patientInfo;
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        get_schedule_patient(patientInfo);
    }, [])

    const get_schedule_patient = async (patientInfo) => {
        setLoadingPage(true);
        try {
            const response = await patientAPI.get_schedule(patientInfo.id);
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

                    dateCheck: appointmentInfo.date
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
        const check = compareDates(new Date(currentTime), new Date(record.dateCheck))

        if(check) {
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
                    <Button onClick={()=>cancelSchedule(record)} type="danger">
                        Hủy lịch
                    </Button>
                </div>
            ),
		},		
	]
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
                            <Card 
                                title={<>Quản lí lịch khám <Badge count={listSchedule.length} style={{ backgroundColor: '#52c41a' }} /></>}
                            >
                                <Tabs defaultActiveKey="2" >
                                    <TabPane tab="Lịch khám quá hạn" key="1">
                                        <ScheduleOutDate data={listSchedule}/>
                                    </TabPane>
                                    <TabPane tab="Lịch khám hôm nay" key="2">
                                        <ScheduleCurrent data={listSchedule}/>
                                        <Table className="table-striped"
                                            columns={columns}                 
                                            dataSource={listSchedule}
                                            ascend={true}
                                            style = {{overflowX : 'auto'}}
                                            rowKey={record => record.id}
                                            showSizeChanger={true} 
                                            loading={loadingPage}
                                        />
                                    </TabPane>
                                    <TabPane tab="Lịch khám sắp diễn ra" key="3">
                                        <ScheduleFuture data={listSchedule}/>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default PatientSchedule;