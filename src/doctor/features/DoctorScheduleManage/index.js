import React, { useState, useEffect } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import {Card, DatePicker, Space} from 'antd'
import {Tab, Tabs, Modal } from 'react-bootstrap';
import moment from 'moment';

const DoctorSchedule = () =>{
    const [currentWeek, setCurrentWeek] = useState([]);
    const [value, setValue] = useState('');
    useEffect(()=> {
        const current = new Date();
        
    },[])
    const onChangeWeek = (date) => {
        const _date = moment(date);
        const array = [0,1,2,3,4,5,6];
        const newListDate = array.map(item => {
            const _item =  moment(_date.weekday(item))
            const obj = {
                dateString: _item.format('DD-MM-YYYY'),
                // dateOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][moment(_item).getDay()],
                date: _item,
            }
            return obj;
        })
        console.log('newListDate :>> ', newListDate);

        // format day
        let arrayDateOfWeek = [];
        const data = {
            string:"Thứ 7, 25/5",
            date: "",
        }
        

    }
    const [key, setKey] = useState(1);
    const [activeModal, setActiveModal] = useState(null)
           
    const handleSelect = (key) => {
        setKey(key)
    }
    const openModal = (id) => {
        setActiveModal(id)
    }
    const handleCloseModal = () => {
        setActiveModal(false)
         
        };
    return(
        <div>
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
                            {/* react-big-calendar */}
                            <Card>
                            <div className="form-group">
                                <label style={{display:"block"}}>Thời gian cho mỗi khung giờ</label>
                                <DatePicker onChange={onChangeWeek} picker="week" placeholder="Chọn thời gian" />
                            </div>


                            {/* tetststs */}

                            <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="card schedule-widget mb-0">
                                                                <div className="schedule-header">
                                                                    < div className="schedule-nav">
                                                                        <Tabs
                                                                            className="tab-view"
                                                                            activeKey={key}
                                                                            onSelect={handleSelect}
                                                                            id="controlled-tab-example"
                                                                        >

                                                        <Tab className="nav-item" eventKey={2} title="Thứ 2">
                                                        <h4 className="card-title d-flex justify-content-between">
															  <span>Time Slots</span> 
																		<a className="edit-link" data-toggle="modal" href="#edit_time_slot" onClick={()=>{}}><i className="fa fa-edit mr-1"></i>Edit</a>
																	</h4>
																	
																
																	<div className="doc-times">
																		<div className="doc-slot-list">
																			8:00 pm - 11:30 pm
																			<a href="#0" className="delete_schedule">
																				<i className="fa fa-times"></i>
																			</a>
																		</div>
																		<div className="doc-slot-list">
																			11:30 pm - 1:30 pm
																			<a href="#0" className="delete_schedule">
																				<i className="fa fa-times"></i>
																			</a>
																		</div>
																		<div className="doc-slot-list">
																			3:00 pm - 5:00 pm
																			<a href="#0" className="delete_schedule">
																				<i className="fa fa-times"></i>
																			</a>
																		</div>
																		<div className="doc-slot-list">
																			6:00 pm - 11:00 pm
																			<a href="#0"  className="delete_schedule">
																				<i className="fa fa-times"></i>
																			</a>
																		</div>
																	</div>
																
                                                        </Tab>
                                                        <Tab className="nav-item" eventKey={3} title="Thứ 3"> 
                                                            <h4 className="card-title d-flex justify-content-between">
                                                                <span>Khung giờ</span> 
                                                                <a className="edit-link" data-toggle="modal" href="#add_time_slot" onClick={()=>{}}>
                                                                <i className="fa fa-plus-circle"></i> Thêm khung giờ</a>
                                                            </h4>
                                                            <p className="text-muted mb-0">Chưa có khung giờ</p>
                                                        </Tab>
                                                        <Tab className="nav-item" eventKey={4} title="Thứ 4"> 
                                                                <h4 className="card-title d-flex justify-content-between">
                                                                    <span>Khung giờ</span> 
                                                                    <a className="edit-link" data-toggle="modal" href="#add_time_slot" onClick={()=>{}}>
                                                                    <i className="fa fa-plus-circle"></i> Thêm khung giờ</a>
                                                                </h4>
                                                                <p className="text-muted mb-0">Chưa có khung giờ</p>
                                                        </Tab>
                                                        <Tab className="nav-item" eventKey={5} title="Thứ 5"> 
                                                            <h4 className="card-title d-flex justify-content-between">
                                                                <span>Khung giờ</span> 
                                                                <a className="edit-link" data-toggle="modal" href="#add_time_slot" onClick={()=>{}}>
                                                                <i className="fa fa-plus-circle"></i> Thêm khung giờ</a>
                                                            </h4>
                                                            <p className="text-muted mb-0">Chưa có khung giờ</p>
                                                        </Tab>
                                                        <Tab className="nav-item" eventKey={6} title="Thứ 6">
                                                            <h4 className="card-title d-flex justify-content-between">
                                                                <span>Khung giờ</span> 
                                                                <a className="edit-link" data-toggle="modal" href="#add_time_slot" onClick={()=>{}}>
                                                                <i className="fa fa-plus-circle"></i> Thêm khung giờ</a>
                                                            </h4>
                                                            <p className="text-muted mb-0">Chưa có khung giờ</p>
                                                        </Tab>
                                                        <Tab className="nav-item" eventKey={7} title="Thứ 7">
                                                            <h4 className="card-title d-flex justify-content-between">
                                                                <span>Khung giờ</span> 
                                                                <a className="edit-link" data-toggle="modal" href="#add_time_slot" onClick={()=>{}}>
                                                                <i className="fa fa-plus-circle"></i> Thêm khung giờ</a>
                                                            </h4>
                                                            <p className="text-muted mb-0">Chưa có khung giờ</p>
                                                        </Tab>
                                                                        </Tabs>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                            {/* tetstststst */}
                            </Card>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
    }


export default DoctorSchedule;
     