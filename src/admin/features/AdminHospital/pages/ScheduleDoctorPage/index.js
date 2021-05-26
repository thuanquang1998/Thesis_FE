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
        // display:"flex",
        // flexDirection:"row",
        '& .ant-select': {
            // position: 'absolute',
            // bottom: '0'
        }
    }
}));

const ScheduleDoctorPage = () =>{
    const history = useHistory();
    const {data} = history.location.state;
    console.log('data :>> ', data);
    const [loadingPage, setLoadingPage] = useState(false);
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
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row header-row" style={{width:"100%", height:"100%"}}>
							<div className={`col-sm-7 col-auto`}>
								<h3 className="page-title" style={{paddingTop:"20px"}}>{`Lịch làm việc Bác sĩ ${data.name}`}</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Lịch làm việc</li>
									<li className="breadcrumb-item active">{`Lịch làm việc Bác sĩ ${data.name}`}</li>
								</ul>
							</div>
							<div className={`${classes.selectDoctor}  col-sm-5 col`} style={{width:"100%", height:"100%"}}>
                                <Form
                                    labelCol={{
                                        span: 6,
                                    }}
                                    wrapperCol={{
                                        span: 14,
                                        offset: 2,
                                    }}
                                    layout="horizontal"
                                    size="medium"
                                    onFinish={()=>{}}
                                >   
                                    <Form.Item name="fullName" label="Chọn bác sĩ:" rules={[{required: true, message: 'Nhập tên nhân viên!'}]}>
                                        <Select placeholder="Chọn bác sĩ" onChange={()=>{}}>
                                            <Select.Option value="doctor">Nguyễn Văn A</Select.Option>
                                            <Select.Option value="agent">Nguyễn Văn B</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Form>
                                {/* <label style={{paddingTop:"20px"}}>chọn bác sĩ</label>
                                <Select placeholder="Chọn bác sĩ" onChange={()=>{}}>
                                            <Select.Option value="doctor">Nguyễn Văn A</Select.Option>
                                            <Select.Option value="agent">Nguyễn Văn B</Select.Option>
                                        </Select> */}
                                
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
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
    }


export default ScheduleDoctorPage;
     