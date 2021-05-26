import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {Card, DatePicker, Space, Modal, Popover} from 'antd';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';

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

const DoctorSchedule = () =>{
    const classes = useStyles();
    let formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'DDD', culture),
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
    }
    const localizer = momentLocalizer(moment)
   
    useEffect(()=> {
        // get and handle schedule work

    },[])

    const currentDate = moment();
    const events = [
        {
            title: "07:00-11:30",
            start:currentDate,
            end: currentDate,
            data: {
                name:"Thuan",
                room:"Phòng 200"
            }
        },
        {
            title: "13:00-17:30",
            start:currentDate,
            end: currentDate,
            data: {
                name:"Thuan",
                room:"Phòng 200"
            }
        }
    ]

   
    return(
        <div className={classes.root}>
            <div className="breadcrumb-bar">
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
                                            console.log('event :>> ', event);
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
                                    // click cả ô
                                    // onSelectSlot={()=>setVisibleModal(true)}
                                    // click chỉ mỗi event
                                    // onSelectEvent={(event, e)=>handleSelectEvent(event,e)}
                                />
                            </Card>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    )
    }


export default DoctorSchedule;
     