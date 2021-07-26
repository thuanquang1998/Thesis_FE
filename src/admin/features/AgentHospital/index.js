import React from 'react'
import SidebarNav from '../../components/SideBar';
import {Row, Col, Card} from 'antd'
import { Bar, Line, Pie } from 'react-chartjs-2';

const Agent = () => {
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Đặt lịch khám cho bệnh nhân</h3>
							</div>
						</div>
					</div>
                    
					<Row gutter={[36,36]}>
						<Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-primary border-primary">
											<i className="fa fa-user"></i>
										</span>
										<div className="dash-count">
											<h3>168</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h4 className="text-muted">Bác sĩ</h4>
										<div className="progress progress-sm">
											<div className="progress-bar bg-primary w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-success">
											<i className="fe fe-credit-card"></i>
										</span>
										<div className="dash-count">
											<h3>10</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										
										<h4 className="text-muted">Chuyên khoa</h4>
										<div className="progress progress-sm">
											<div className="progress-bar bg-success w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
							<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-danger border-danger">
											<i className="fe fe-money"></i>
										</span>
										<div className="dash-count">
											<h3>485</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h4 className="text-muted">Lượt đặt khám</h4>
										<div className="progress progress-sm">
											<div className="progress-bar bg-danger w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={{span:24}} sm={{span:12}} lg={{span:6}}>
						<div className="card">
								<div className="card-body">
									<div className="dash-widget-header">
										<span className="dash-widget-icon text-warning border-warning">
											<i className="fe fe-folder"></i>
										</span>
										<div className="dash-count">
											<h3>$62523</h3>
										</div>
									</div>
									<div className="dash-widget-info">
										<h4 className="text-muted">Doanh thu</h4>
										<div className="progress progress-sm">
											<div className="progress-bar bg-warning w-50"></div>
										</div>
									</div>
								</div>
							</div>
						</Col>
					</Row>
					
                </div>
            </div>

        </>
    )
}

export default Agent
