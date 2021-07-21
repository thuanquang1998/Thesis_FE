import React,{useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import {Row, Col, Card, DatePicker} from 'antd'
import { Bar, Line, Pie } from 'react-chartjs-2';
import moment from 'moment';
import adminAPI from '../../../../../api/adminAPI';
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
		data: [3, 10, 13, 15, 22, 35],
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
    const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	})

	// header info
	const [headerInfo, setHeaderInfo] = useState({
		num_doctor: 0,
		num_spec: 0,
		num_appointment: 0,
		revenue: 0
	})
	useEffect(()=> {
		getHeaderData(hospitalInfo._id)
		const chuNhat =  moment().startOf('week'); // Monday
        const thuBay = moment().endOf('week'); //(7); // Sunday
		setDateRange({
			...dateRange,
			start: chuNhat,
			end: thuBay,
		})

	},[])
	useEffect(()=> {
		const startDate = dateRange.mon;
		const endDate = dateRange.sun;
		if(!startDate && !endDate) {
			console.log("call api");
			const _data = {
				id: hospitalInfo._id,
				date_start: startDate,
				date_end: endDate,
			}
			// get Data
			// getHeaderData(_data);
			get_status_of_schedule(_data)

		}
	},[dateRange])
	
	const getHeaderData = async (data) => {
		try {
			const response = await adminAPI.get_common_info_hospital(data);
			// console.log('response getHeaderData:>> ', response);
			if(response.error) throw new Error("error");
			setHeaderInfo({
				...headerInfo,
				num_doctor: response.data.num_doctor,
				num_spec: response.data.num_spec,
				num_appointment: response.data.num_appointment,
				revenue: response.data.revenue
			})
		} catch (error) {
			console.log(`error`, error)
		}
	}

	const get_status_of_schedule = async (data) => {
		try {
			const response = await adminAPI.get_all_status_schedule(data);
			console.log('response get_status_of_schedule:>> ', response);
		} catch (error) {
			
		}
	}

	const onChangeRangeDay = (date, dateString) => {
		
		if(date===null) {
			const chuNhat = moment().startOf('week');
			const thuBay = moment().endOf('week');
			const obj = {
				start: chuNhat,
				end: thuBay,
			}
			setDateRange({
				...dateRange,
				...obj
			})
		} else {
			const chuNhat = moment(date).startOf('week');
			const thuBay = moment(date).endOf('week');
			const obj = {
				start: chuNhat,
				end: thuBay,
			}
			setDateRange({
				...dateRange,
				...obj
				
			})
		}
	}




    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-8">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Thống kê</h3>
								{/* <ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
								</ul> */}
							</div>
							<div className="col-sm-4">
								<div className="page-title" style={{paddingTop:"20px", display:"flex"}}>
									<div>
										<p>Thời gian:</p>
										<p>{`${moment(dateRange.start).format('DD/MM/YYYY')} - ${moment(dateRange.end).format('DD/MM/YYYY')}`}</p>
									</div>
									<div>
										<p>Chọn thời gian</p>
										<DatePicker 
											onChange={onChangeRangeDay} 
											picker="week" 
											placeholder="Chọn khoảng thời gian"
										/>
									</div>
								</div>
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
											<h3>{headerInfo.num_doctor}</h3>
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
											<i className="fa fa-credit-card"></i>
										</span>
										<div className="dash-count">
											<h3>{headerInfo.num_spec}</h3>
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
											<i className="fa fa-money"></i>
										</span>
										<div className="dash-count">
											<h3>{headerInfo.num_appointment}</h3>
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
											<i className="fa fa-folder"></i>
										</span>
										<div className="dash-count">
											<h3>{headerInfo.revenue}</h3>
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
