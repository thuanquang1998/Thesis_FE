import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import doctorAPI from '../../../api/doctorAPI';
import DoctorSidebar from '../../components/DoctorSideBar';


const DoctorDashboard = (props) => {
    console.log('props DoctorDashboard:>> ', props);
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;

    const {doctor} = props.doctorData.currentDoctor;
    const [dataDashboard, setDataDashboard] = useState({});
    const [headerInfo, setHeaderInfo] = useState({
        currentNum: 0,
        tomorrowNum: 0,
        reviewNum: 0,
    });

    const [reviewChart, setReviewChart] = useState({
		labels: [],
		datasets: [
		  {
			label: '# of Votes',
			data: [],
			backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
			],
			borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
			],
			borderWidth: 1,
		  },
		],
	})


    useEffect(()=> {
        const id = currentDoctor.doctor._id;
        getDashboardHeader(id);
        getDashboardReview(id);
    },[])
    const getDashboardHeader = async (id) => {
        try {
            const response = await doctorAPI.get_doctors_static_header(id);
            setHeaderInfo({
                currentNum: response.data.num_appoinment_checked_today + response.data.num_appoinment_today + response.data.num_appoinment_uncheck_today,
                tomorrowNum: response.data.num_appoinment_tomorrow,
                reviewNum: response.data.num_rating,
            })
        } catch (error) {
            console.log('error getDashboard DoctorDashboard:>> ', error);
        }
    }
    const getDashboardReview = async (id) => {
        try {
            const response = await doctorAPI.get_doctors_static_review(id);
            console.log('response getDashboardReview:>> ', response);
            const _data = [
                response.data.one_star,
                response.data.two_star,
                response.data.three_star,
                response.data.four_star,
                response.data.five_star,
            ]
            let temp = {
                labels: [],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
            }
            temp.labels = ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"];
            temp.datasets[0].data = [..._data];
            setReviewChart({
                ...temp
            })
        } catch (error) {
            console.log('error getDashboard DoctorDashboard:>> ', error);
        }
    }
    return(
        <div>
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
                            <Row gutter={[36,36]} style={{width:"100%"}}>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:8}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-primary border-primary">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>{headerInfo.currentNum}</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Số lịch khám hôm nay</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-primary w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:8}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-success">
                                                    <i className="fa fa-credit-card"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>{headerInfo.tomorrowNum}</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                
                                                <h4 className="text-muted">Số lịch khám ngày mai </h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-success w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{span:24}} sm={{span:12}} lg={{span:8}}>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-danger border-danger">
                                                <i className="fa fa-folder"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>{headerInfo.reviewNum}</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Tổng số đánh giá</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-danger w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                {/* <Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
                                <div className="card">
                                        <div className="card-body">
                                            <div className="dash-widget-header">
                                                <span className="dash-widget-icon text-warning border-warning">
                                                    <i className="fa fa-folder"></i>
                                                </span>
                                                <div className="dash-count">
                                                    <h3>$62523</h3>
                                                </div>
                                            </div>
                                            <div className="dash-widget-info">
                                                <h4 className="text-muted">Số lượt đánh giá</h4>
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-warning w-50"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col> */}
                            </Row>
                            <Card 
                                style={{width:"600px", height:"600px"}}
								title={
									<div style={{display: 'flex', justifyContent:"space-between"}}>
										<p style={{fontSize:"18px !important", fontWeight:"600", marginBottom:"0"}}>Biểu đồ tỉ lệ đánh giá của bệnh nhân</p>
										{/* <p style={{marginBottom:"0"}}>{`${moment(dateRange.start).format('DD')} - ${moment(dateRange.end).format('DD/MM/YYYY')}`}</p> */}
									</div>
								}	
							>
								{/* <Line data={lineChart} options={options2} /> */}
								<Pie data={reviewChart} />

							</Card>
                            {/* <ListScheduleDashboard/> */}
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
}


export default DoctorDashboard;
     