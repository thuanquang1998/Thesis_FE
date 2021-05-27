import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {Card, DatePicker, Space, Modal, Popover, Select, Row, Col, Form} from 'antd';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import SidebarNav from '../../../../components/SideBar';
import LoadingTop from '../../../../components/loadingTop';
import doctorAPI from '../../../../../api/doctorAPI';


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
    selectDoctor: {
        '& .ant-select': {
        }
    }
}));

const ScheduleDoctorPage = ({location}) =>{
    const [dataDoctor, setDataDoctor] = useState(location.state.data);
    const [listDoctor, setListDoctor] = useState(location.state.listDoctor);

    const [loadingPage, setLoadingPage] = useState(false);
    const [events, setEvents] = useState([]);

    const classes = useStyles();
    let formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'DDD', culture),
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
    }
    const localizer = momentLocalizer(moment)
    useEffect(()=> {
        getTimeWorks(dataDoctor.id);
    },[])

    const getTimeWorks = async (id) => {
        try {
            const response = await doctorAPI.get_doctor_timework(id);
            if(response.error) throw new Error(response.errors[0].message);
            const data = response.data?.data;
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
        setTimeout(() => {
            setLoadingPage(false)
        }, 300);
    }

    const handleChangeDoctor = (e) => {
        setLoadingPage(true);
        const findDoctor = listDoctor.filter(x=>x.id===e);
        setDataDoctor({
            ...dataDoctor,
            name: findDoctor[0].name,
            id: findDoctor[0].id,
        })
        getTimeWorks(e);
    }
    return (
        <div className={classes.root}>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row header-row" style={{width:"100%", height:"100%"}}>
							<div className={`col-sm-7 col-auto`}>
								<h3 className="page-title" style={{paddingTop:"20px"}}>{`Lịch làm việc Bác sĩ ${dataDoctor.name}`}</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Lịch làm việc</li>
									<li className="breadcrumb-item active">{`Lịch làm việc Bác sĩ ${dataDoctor.name}`}</li>
								</ul>
							</div>
							<div className={`${classes.selectDoctor}  col-sm-5 col`} style={{width:"100%", height:"100%"}}>
                                <label style={{paddingTop:"20px"}}>chọn bác sĩ</label>
                                <Select placeholder="Chọn bác sĩ" onChange={handleChangeDoctor} loading={loadingPage}>
                                    {listDoctor.map((item,index)=>(
                                        <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
						    </div>
						</div>
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
                                event: (component: any) => {
                                    const targetId = "...."
                                    const {event} = component
                                    return (
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
                                    )
                                },
                            }}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default ScheduleDoctorPage;
     