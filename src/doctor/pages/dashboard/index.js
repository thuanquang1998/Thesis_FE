import React, { useState } from 'react';
import DoctorSidebar from '../sidebar';
import { Link } from 'react-router-dom';
import {Tab, Tabs } from 'react-bootstrap';
import ProgressBar from 'react-customizable-progressbar';
import {Pagination} from 'antd'
import StickyBox from "react-sticky-box";
import { Icon01, Icon02, Icon03, IMG01, IMG02, IMG03, IMG04, IMG05, IMG06} from './img';
import {FolderOpenOutlined} from '@ant-design/icons';
import ApptRow from './apptRow';
import Paging from '../paging';

const  DoctorDashboard =()=>{
    
		const [paging, setpaging] = useState({page:1, pageSize:10})
		console.log(paging)
		const onChangePaging =(page)=>{
			setpaging(page)
		}
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
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card dash-card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-4">
                                                        <div className="dash-widget dct-border-rht">
                                                        <ProgressBar
                                                        width={20}
                                                        radius={100}
                                                        progress={50}
                                                        rotate={-210}
                                                        strokeWidth={16}
                                                        strokeColor="#da3f81"
                                                        strokeLinecap="square"
                                                        trackStrokeWidth={8}
                                                        trackStrokeColor="#e6e6e6"
                                                        trackStrokeLinecap="square"
                                                        pointerRadius={0}
                                                        initialAnimation={true}
                                                        transition="1.5s ease 0.5s"
                                                        trackTransition="0s ease"
                                                    >
                                                    <div className="indicator-volume">
                                                        <img src={Icon01} className="img-fluid" alt="Patient" />
                                                    </div>
                                                            </ProgressBar>
                                                            <div className="dash-widget-info">
                                                                <h6>Tổng số bệnh nhân</h6>
                                                                <h3>1500</h3>
                                                                <p className="text-muted">Tổng số</p>
                                                            </div>
                                                        </div>
                                                      </div>
                                                      <div className="col-md-12 col-lg-4">
                                                        <div className="dash-widget dct-border-rht">
                                                        <ProgressBar
                                                        width={20}
                                                        radius={100}
                                                        progress={60}
                                                       
                                                        rotate={-210}
                                                        strokeWidth={16}
                                                        strokeColor="#68dda9"
                                                        strokeLinecap="square"
                                                        trackStrokeWidth={8}
                                                        trackStrokeColor="#e6e6e6"
                                                        trackStrokeLinecap="square"
                                                        pointerRadius={0}
                                                        initialAnimation={true}
                                                        transition="1.5s ease 0.5s"
                                                        trackTransition="0s ease"
                                                    >
                                                    <div className="indicator-volume">
                                                    <img src={Icon02} className="img-fluid" alt="Patient" />
                                                                </div>
                                                            </ProgressBar>
                                                            <div className="dash-widget-info">
                                                                <h6>Tổng số bệnh nhân hôm nay</h6>
                                                                <h3>160</h3>
                                                                <p className="text-muted">06, Nov 2019</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                <div className="col-md-12 col-lg-4">
													<div className="dash-widget">
                                                    <ProgressBar
                                                        width={20}
                                                        radius={100}
                                                        progress={70}
                                                      
                                                        rotate={-210}
                                                        strokeWidth={16}
                                                        strokeColor="#1b5a90"
                                                        strokeLinecap="square"
                                                        trackStrokeWidth={8}
                                                        trackStrokeColor="#e6e6e6"
                                                        trackStrokeLinecap="square"
                                                        pointerRadius={0}
                                                        initialAnimation={true}
                                                        transition="1.5s ease 0.5s"
                                                        trackTransition="0s ease"
                                                    >
                                                    <div className="indicator-volume">
                                                    <img src={Icon03} className="img-fluid" alt="Patient" />
                                                                </div>
                                                            </ProgressBar>
														<div className="dash-widget-info">
															<h6>Lịch hẹn hôm nay</h6>
															<h3>85</h3>
															<p className="text-muted">06, Apr 2019</p>
														</div>
													</div>
												</div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className="mb-4">Lịch khám</h4>
                                        <div className="appointment-tab">
                                        <Tabs
                                className="tab-view"
                                
                                id="controlled-tab-example"
                                >
                                        <Tab className="nav-item" eventKey={2} title="Today"> 
                                        <div className="card card-table mb-0">
													<div className="card-body">
														<div className="table-responsive">
															<table className="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>Tên bệnh nhân</th>
																		<th>Ngày khám</th>
																		<th>Giá khám</th>
																		<th>Trạng thái</th>
																		<th className="text-center">Hành động</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<tr><td colSpan={6} style={{textAlign:"center" ,color:'lightgrey'}}>
																		<FolderOpenOutlined style={{display: 'block',fontSize:'30px'}} />
																		NO DATA
																	</td></tr>
																	{/* <ApptRow />
																	<ApptRow />
																	<ApptRow />
																	<ApptRow />
																	<ApptRow />
																	<ApptRow />
																	<ApptRow /> */}
																</tbody>
															</table>		
														</div>	
													</div>	
												</div>	
												<Paging paging={onChangePaging} total={0}/>
                                    	</Tab>
                                      <Tab className="nav-item" eventKey={1} title="Upcoming"> 
                                      <div className="tab-pane show active" id="upcoming-appointments">
												<div className="card card-table mb-0">
													<div className="card-body">
														<div className="table-responsive">
															<table className="table table-hover table-center mb-0">
																<thead>
																	<tr>
																		<th>Patient Name</th>
																		<th>Appt Date</th>
																		<th>Purpose</th>
																		<th>Type</th>
																		<th className="text-center">Paid Amount</th>
																		<th></th>
																	</tr>
																</thead>
																<tbody>
																	<ApptRow />
																	<ApptRow />
																	<ApptRow />
																	
																</tbody>
															</table>		
														</div>
													</div>
												</div>
											</div>
											<Paging paging={onChangePaging} total={100}/>
                                      </Tab>
                                    </Tabs>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                     </div>
                </div>
            </div>
           
        )
     }


export default DoctorDashboard;
     