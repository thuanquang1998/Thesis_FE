import { makeStyles } from '@material-ui/core/styles';
import { Card, Popover, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import doctorAPI from '../../../../../api/doctorAPI';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import SidebarNav from '../../../../components/SideBar';
import FilterDoctorWork from './FilterDoctorWork';

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
    const classes = useStyles();
    let formats = {
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'DDD', culture),
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd', culture),
    }
    const localizer = momentLocalizer(moment);

    const [currentDoctor, setCurrentDoctor] = useState({});
    
    const [listDoctor, setListDoctor] = useState([]);
    const [loadDoctor, setLoadDoctor] = useState(true);
    const [listSpec, setListSpec] = useState([]);
    const [loadSpec, setLoadSpec] = useState(true);

    const [valueDoctor, setValueDoctor] = useState(null);
    const [renderDoctor, setRenderDoctor] = useState([])

    const [filter, setFilter] = useState({
        spec: "",
        doctor: "",
    });

    const [dataDoctor, setDataDoctor] = useState({id:"60537e1d206e99fe96d8d950"});
    

    const [loadingPage, setLoadingPage] = useState(false);
    
    const [events, setEvents] = useState([]);

    
    useEffect(()=> {
        // getTimeWorks(dataDoctor.id);
        getListSpec();
        getListDoctor();
    },[])
    const getListSpec = async () => {
        console.log('getListSpec');
		try {
            let _result = [];
			const response = await adminAPI.get_spec_of_hospital(JSON.parse(localStorage.getItem('currentAdmin')).hospital.id);
			if(!response.error){
                _result = [...response.data];
			}
			else {
                _result = [];
			}     
            setListSpec(_result);
            setLoadSpec(false);
		} catch (error) {
            console.log('error.message :>> ', error.message);
		}
	}
    const getListDoctor = async () => {
        console.log('getListDoctor');
        try {
            const response = await adminAPI.get_doctors_of_hospital(JSON.parse(localStorage.getItem('currentAdmin')).hospital.id);
            if(response.error) throw new Error(response.errors[0].message);
            const {data} = response.data;
            const _data = data.map(item=>{
                const _item = {
                    name: item.fullName,
                    specialization: item.spec_detail.name,
                    spec_id: item.spec_detail._id,
                    id: item._id,
                    phone: item.phone,
                    email: item.email,
                    typeAccount: 'Bác sĩ'
                }
                return _item;
            })
            setRenderDoctor(_data);
            setListDoctor(_data);
            setLoadDoctor(false)
        } catch (error) {
            console.log(`error.message`, error.message)
        }
    }
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

    const handleChangeSpec = (value) => {

        setLoadDoctor(true);
        let _listDoctor = [];
        if(value==="all") {
            _listDoctor = [...listDoctor];
        } else {
            _listDoctor = listDoctor.filter((item)=>{
                const check = item.specialization===value;
                return check;
            });
        }
        setTimeout(() => {
            setRenderDoctor(_listDoctor);
            setLoadDoctor(false);
        }, 500);
        setValueDoctor(null);
        setEvents([]);
    }

    const handleChangeDoctor = (value) => {
        setValueDoctor(value);
        // call api
        console.log('value :>> ', value);
        getTimeWorks(value);
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
								<h3 className="page-title" style={{paddingTop:"20px"}}>{`Lịch làm việc Bác sĩ`}</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Lịch làm việc</li>
									<li className="breadcrumb-item active">{`Lịch làm việc Bác sĩ`}</li>
								</ul>
							</div>
                            <div className="col-sm-5 col">
							<a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>console.log("thêm lịch")}>
								Thêm lịch</a>
						</div>
						</div>
					</div>
                    <Card>
                        <h4>Tìm bác sĩ</h4>
                        <FilterDoctorWork
                            filter={filter}
                            loadData={{
                                loadSpec: loadSpec,
                                loadDoctor: loadDoctor,
                            }}
                            listSpec={listSpec}
                            listDoctor={renderDoctor}
                            changeSpec={handleChangeSpec}
                            changeDoctor={handleChangeDoctor}
                            valueDoctor={valueDoctor}
                        />
                        <h4>Lịch làm việc bác sĩ</h4>
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
     