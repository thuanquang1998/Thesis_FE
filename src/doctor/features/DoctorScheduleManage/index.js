import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {useSelector} from 'react-redux';
import {Card, DatePicker, Space, Modal, Popover, Button, Form, Input, Select} from 'antd';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import doctorAPI from '../../../api/doctorAPI';
import LoadingTop from '../../components/loadingTop';
import {useSnackbar} from 'notistack';
import Swal from "sweetalert2";


moment.updateLocale('en', {
        months : ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        weekdays : ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
    });

const useStyles = makeStyles((theme) => ({
    root: {
        '& .rbc-event': {
            backgroundColor: "#1db9aa !important"
        },
        '& .rbc-toolbar-label': {
            fontWeight:"600 !important",
            fontSize:"20px !important",
        },
        '& .rbc-btn-group > button:focus': {
            backgroundColor:"#20c0f3"
        }
    },
    event: {
        margin: '0',
        fontSize: '12px !important',
        textAlign: 'center',
    },
}));

const DoctorSchedule = (props) =>{
    const doctor = useSelector(state=> state.doctor);
    const { isDoctorLoggedIn, currentDoctor} = doctor;
    const {enqueueSnackbar} = useSnackbar();
    const [form] = Form.useForm();
    const [loadingPage, setLoadingPage] = useState(true);
    const [events, setEvents] = useState([]);
    const classes = useStyles();
    let formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'DDD', culture),
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
    }
    const localizer = momentLocalizer(moment)
   
    const [listDateWork, setListDateWork] = useState([]);
    const [showModalCancel, setShowModalCancel] = useState(false);


    useEffect(()=> {
        setLoadingPage(true);
        if(isDoctorLoggedIn) {
            const id = currentDoctor.doctor._id;
            getTimeWorks(id);    
        }
    },[isDoctorLoggedIn])
    const getTimeWorks = async (id) => {
        try {
            const response = await doctorAPI.get_doctor_timework(id);
            console.log('response getTimeWorks:>> ', response);
            if(response.error) throw new Error(response.errors[0].message);
            const data = response.data?.data;

            // handleData for listDateWork => future;
            const dataComing = data.filter(item=>{
                const currentDate = new Date();
                const checkDate = moment(item.date).isAfter(currentDate);
                return checkDate;
            })
            setListDateWork([...dataComing]);

            let _listEvents = [];
            data.forEach(item => {
                const listTimeWork = item.time_work.split('/');
                const _temp = listTimeWork.map(x=>{
                    let obj = {
                        title: x,
                        start: moment(item.date),
                        end: moment(item.date),
                        data: item,
                    }
                    return obj
                })
                _listEvents = [..._listEvents,..._temp]
            })
            setEvents(_listEvents);
        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
        setLoadingPage(false)
    }

    // hủy lịch làm việc của bác sĩ
    const onCancelSchedule = async (data) => {
        setLoadingPage(true)
        const _data = {
            ...data,
            doctorId: currentDoctor.doctor._id
        }
        console.log('_data :>> ', _data);
        try {
            const response = await doctorAPI.cancel_schedule_work(_data);
            if(response.error) throw new Error("Can't cancel schedule");
            const countAppointment = response.data.appointments.length;
            const date = moment(response.data.timeWork.date).format('DD/MM/YYYY');
            let notification = "";
            if(!countAppointment) {
                notification = `Không có lịch khám bị xóa trong ngày ${date}.`
            } else {
                notification = `Có ${countAppointment} lịch khám bị xóa trong ngày ${date}. Thông báo hủy lịch khám đã được gửi đến bệnh nhân.`
            }
            setShowModalCancel(false);
            Swal.fire({
                icon: "success",
                title: "Xóa lịch làm việc thành công.",
                text: `${notification}`,
                confirmButtonColor: "#d33",
                confirmButtonText: "Đóng",
            })
            .then((result) => {
				if (result.value) {
					const id = currentDoctor.doctor._id;
                    getTimeWorks(id);    
				} 
			})
			.catch((error) => {
				console.log('error.message :>> ', error.message);
			});
            setLoadingPage(false);
        } catch (error) {
            enqueueSnackbar('Hiện không thế xóa lịch làm việc này.', {variant: 'error'});
            setLoadingPage(false);
        }
    }
    return(
        <div className={classes.root}>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Dashboard</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorSidebar />
                            </StickyBox>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <div style={{display: 'flex', justifyContent:"space-between"}}>
                                <h2>Lịch làm việc</h2>
                                <Button onClick={()=>setShowModalCancel(true)}>Hủy lịch</Button>
                            </div>
                            <Card>
                                <Calendar
                                    localizer={localizer}
                                    events={events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 600 }}
                                    views={['month']}
                                    formats={formats}
                                    components={(event,e)=>(
                                        <div>AAAAAA</div>
                                    )}
                                    messages = {
                                        {
                                            "today":'Hôm nay',
                                            "previous": 'Tháng trước',
                                            "next": 'Tháng sau',
                                        }
                                    }
                                    popup={true}
                                    components={{
                                        event: (component) => {
                                            const targetId = "...."
                                            const {event} = component
                                            return (
                                                <>
                                                    <Popover 
                                                        placement="bottom" 
                                                        title={"Lịch làm việc"} 
                                                        content={(
                                                            <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                                                            <div>{event.data.room}</div>
                                                            <div>{event.title}</div> 
                                                            </div>
                                                        )} 
                                                    trigger="hover">
                                                        <p className={classes.event}>{event.title}</p>
                                                    </Popover>
                                                </>
                                            )
                                        },
                                    }}
                                    // click cả ô
                                    // onSelectSlot={()=>setVisibleModal(true)}
                                    // click chỉ mỗi event
                                    // onSelectEvent={(event, e)=>handleSelectEvent(event,e)}
                                />
                            </Card>
                            <Modal 
                                title="Hủy lịch khám" 
                                visible={showModalCancel} 
                                onCancel={()=>{
                                    setShowModalCancel(false)
                                    form.resetFields();
                                }}
                                footer={null}
                            >
                                <Form
                                    form={form}
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    onFinish={onCancelSchedule}
                                    initialValues={{}}
                                    // onFinishFailed={onFinishFailed}
                                >
                                    <Form.Item
                                        label="Chọn ngày"
                                        name="date"
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin.' }]}
                                    >
                                    <Select 
                                        className="province"
                                        placeholder="Chọn này" 
                                        style={{ width: 200, border:"none" }} 
                                        className="chooseDay"
                                        onChange={()=>{}}
                                    >
                                        {listDateWork.map((item, idx)=> {
                                            return (<Select.Option key={idx} value={item.date}>{moment(item.date).format('DD/MM/YYYY')}</Select.Option>)
                                        })}
                                    </Select>
                                    </Form.Item>
                                     
                                    <Form.Item
                                        label="Lý do hủy"
                                        name="reason"
                                        rules={[{ required: true, message: 'Vui lòng nhập đầy đủ thông tin.' }]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button type="primary" htmlType="submit">
                                        Gửi
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
    }


export default DoctorSchedule;
     