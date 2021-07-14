import React from 'react'
import SidebarNav from '../../../../components/SideBar'
import {Row, Col, Card} from 'antd'
import { Bar, Line, Pie } from 'react-chartjs-2';
const data = {
	labels: ['22/7', '23/7', '24/7', '25/7', '26/7', '27/7'],
	datasets: [
	  {
		label: 'Số lịch đã đặt',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: 'rgb(255, 99, 132)',
	  },
	  {
		label: 'Số lịch đã khám',
		data: [2, 3, 20, 5, 1, 4],
		backgroundColor: 'rgb(54, 162, 235)',
	  },
	  {
		label: 'Số lịch bị hủy',
		data: [3, 10, 13, 15, 22, 30],
		backgroundColor: 'rgb(75, 192, 192)',
	  },
	],
  };
  const dataReview = {
	labels: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao'],
	datasets: [
	  {
		label: 'Đánh giá',
		data: [12, 4, 3, 15, 42, 3],
		backgroundColor: 'rgb(255, 99, 132)',
	  },
	],
  };
  const options = {
	scales: {
	  yAxes: [
		{
		  ticks: {
			beginAtZero: true,
		  },
		},
	  ],
	},
  };

  const dataDefault = [
	  {
		date: "1/1",
		schedule: "10",
		scheduleChecked: "8",
		scheduleCancel: "1"
	  }
  ]

  const data2 = {
	labels: ['22/7', '23/7', '24/7', '25/7', '26/7', '27/7'],
	datasets: [
	  {
		label: 'Lịch khám',
		data: [12, 19, 3, 5, 2, 3],
		fill: false,
		backgroundColor: 'rgb(255, 99, 132)',
		borderColor: 'rgba(255, 99, 132, 0.2)',
	  },
	],
  };
  
  const options2 = {
	scales: {
	  yAxes: [
		{
		  ticks: {
			beginAtZero: true,
		  },
		},
	  ],
	},
  };
  const data3 = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
	  {
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
		  'rgba(255, 99, 132, 0.2)',
		  'rgba(54, 162, 235, 0.2)',
		  'rgba(255, 206, 86, 0.2)',
		  'rgba(75, 192, 192, 0.2)',
		  'rgba(153, 102, 255, 0.2)',
		  'rgba(255, 159, 64, 0.2)',
		],
		borderColor: [
		  'rgba(255, 99, 132, 1)',
		  'rgba(54, 162, 235, 1)',
		  'rgba(255, 206, 86, 1)',
		  'rgba(75, 192, 192, 1)',
		  'rgba(153, 102, 255, 1)',
		  'rgba(255, 159, 64, 1)',
		],
		borderWidth: 1,
	  },
	],
  };
const DashboardHospital = () => {
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Trang quản lý cho bệnh viện Hùng Vương</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
								</ul>
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

					<Row gutter={[36,36]}>
						<Col span={12}>
							<Bar data={data} options={options} />
						</Col>
						<Col span={12}>
							<Line data={data2} options={options2} />
						</Col>
					</Row>
					<Row gutter={[36,36]}>
						<Col span={12}>
							<Bar data={dataReview} options={options} />
						</Col>
						<Col span={12}>
							<Pie data={data3} />
						</Col>
					</Row>
                </div>
            </div>

        </>
    )
}

export default DashboardHospital
