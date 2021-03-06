import React,{useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import {Row, Col, Card, DatePicker, Table} from 'antd'
import { Bar, Line, Pie } from 'react-chartjs-2';
import moment from 'moment';
import adminAPI from '../../../../../api/adminAPI';
import HeaderRoot from './HeaderRoot'

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

const listColor = [
	"Red",
	"Lime",
	"Blue",
	"Yellow",
	"Aqua",
	"Navy",
	"Teal",
	"Purple",
	"Green",
	"Olive",
	"Maroon",
	"#eb4924",
	"#e12828",
]

const DashboardSystem = () => {
    const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [dateRange, setDateRange] = useState({
		start: null,
		end: null,
	})

	// header info
	const [headerInfo, setHeaderInfo] = useState({
		num_hospital: 0,
		num_spec: 0,
		num_doctor: 0,
		num_user: 0
	})

	// state for chart 3 status - schedule-checked-cancel
	const [chartThree, setChartThree] = useState({
		labels: [],
		datasets: [
		  {
			label: 'Số lịch đã đặt',
			data: [],
			backgroundColor: 'rgb(255, 99, 132)',
		  },
		  {
			label: 'Số lịch đã khám',
			data: [],
			backgroundColor: 'rgb(54, 162, 235)',
		  },
		  {
			label: 'Số lịch bị hủy',
			data: [],
			backgroundColor: 'rgb(75, 192, 192)',
		  },
		],
	})
	// state for line chart
	const [lineChart, setLineChart] = useState({
		labels: [],
		datasets: [
		  {
			label: 'Lịch khám',
			data: [],
			fill: false,
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgba(255, 99, 132, 0.2)',
		  },
		],
	})

	// state for circle chart
	const [specChart, setSpecChart] = useState({
		labels: [],
		datasets: [
		  {
			label: '# of Votes',
			data: [],
			backgroundColor: [
			 
			],
			borderColor: [
			  
			],
			borderWidth: 1,
		  },
		],
	})

	// state for list typical doctor
	const [listTypicalDoctor, setListTypicalDoctor] = useState([]);

	useEffect(()=> {
		getHeaderData();
		get_review_chart_api();
		const chuNhat =  moment().startOf('week'); // Monday
        const thuBay = moment().endOf('week'); //(7); // Sunday
		setDateRange({
			...dateRange,
			start: chuNhat,
			end: thuBay,
		})
	},[])
	useEffect(()=> {
		if(dateRange.start!==null && dateRange.end!==null) {
			const startDate = moment(dateRange.start).format('YYYY-MM-DD');
			const endDate = moment(dateRange.end).format('YYYY-MM-DD');
			const _data = {
				date_start: startDate,
				date_end: endDate,
			}
			get_status_of_schedule(_data);
		}
	},[dateRange])
	
	const getHeaderData = async (data) => {
		try {
			const response = await adminAPI.get_common_info_root();
			if(response.error) throw new Error("error");
			setHeaderInfo({
				...headerInfo,
				num_hospital: response.data.num_hospital,
				num_spec: response.data.num_spec,
				num_doctor: response.data.num_doctor,
				num_user: response.data.num_user
			})
		} catch (error) {
			console.log(`error`, error)
		}
	}

	const get_status_of_schedule = async (data) => {
		try {
			const response = await adminAPI.get_all_status_schedule_root(data);
			let temp = {
				labels: [],
				datasets: [
				  {
					label: 'Số lịch đã đặt',
					data: [],
					backgroundColor: 'rgb(255, 99, 132)',
				  },
				  {
					label: 'Số lịch đã khám',
					data: [],
					backgroundColor: 'rgb(54, 162, 235)',
				  },
				  {
					label: 'Số lịch bị hủy',
					data: [],
					backgroundColor: 'rgb(75, 192, 192)',
				  },
				],
			}
			let labels = [];
			let scheduleBooking  = [];
			let checkedSchedule = [];
			let cancelSchedule = [];
			response.data.forEach(item=>{
				const date = item.title;
				const _scheduleBooking = item.cancel + item.checked + item.uncheck;
				const _checkedSchedule = item.checked;
				const _cancelSchedule = item.cancel;
				labels.push(date);
				scheduleBooking.push(_scheduleBooking)
				checkedSchedule.push(_checkedSchedule)
				cancelSchedule.push(_cancelSchedule)
			})
			temp.labels = [...labels];
			temp.datasets[0].data = [...scheduleBooking]
			temp.datasets[1].data = [...checkedSchedule]
			temp.datasets[2].data = [...cancelSchedule]
			setChartThree({...temp});

			const _lineChart = {...lineChart};
			_lineChart.labels = [...labels];
			_lineChart.datasets[0].data = [...scheduleBooking];
			setLineChart(_lineChart);
		} catch (error) {
			console.log('error :>> ', error);
		}
	}
	const get_review_chart_api = async () => {
		try {
			const response = await adminAPI.get_review_chart_root();
			if(response.error) throw new Error("error");
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
			};
			const labels = ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"];
			const dataNumberReview = [	response.data.one_star, 
										response.data.two_star,
										response.data.three_star,
										response.data.four_star,
										response.data.five_star, 
									]
			temp.labels = [...labels];
			temp.datasets[0].data = [...dataNumberReview]
			setSpecChart(temp);
		} catch (error) {
			console.log('error :>> ', error);
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



	const new_columns = [
        {
          title: 'Tên bác sĩ',
		  key:'doctor_name',
		  dataIndex:'doctor_name',
		  render: (text, record) => (
			<div>
				<i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i>
				<span>{text}</span>
			</div>
		),
          fixed: 'left',
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'spec_name',
			key:'spec_name'
		},
        {
          title: 'Số lượt đặt',
		  dataIndex: 'num_appointment',
		  key:'num_appointment'
        },
        {
          title: 'Tỉ lệ đánh giá',
		  dataIndex: 'rate_average',
		  key:'rate_average'
        },
      ]
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-8">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Thống kê</h3>
							</div>
							<div className="col-sm-4">
								<div style={{paddingTop:"20px", display:"flex", justifyContent:"flex-end"}}>
										<DatePicker 
											onChange={onChangeRangeDay} 
											picker="week" 
											placeholder="Chọn khoảng thời gian"
										/>
								</div>
							</div>
						</div>
					</div>
					<HeaderRoot data={headerInfo}/>

					<Row gutter={[36,36]}>
						<Col span={12}>
							<Card 
								title={
									<div style={{display: 'flex', justifyContent:"space-between"}}>
										<p style={{fontSize:"18px !important", fontWeight:"600", marginBottom:"0"}}>Biểu đồ lịch khám theo trạng thái</p>
										<p style={{marginBottom:"0"}}>{`${moment(dateRange.start).format('DD')} - ${moment(dateRange.end).format('DD/MM/YYYY')}`}</p>
									</div>
								}
							>
								<Bar data={chartThree} options={options} />
							</Card>
							<Card 
								style={{marginTop:"15px"}}
								title={
									<div style={{display: 'flex', justifyContent:"space-between"}}>
										<p style={{fontSize:"18px !important", fontWeight:"600",  marginBottom:"0"}}>Biểu đồ tỉ lệ đặt khám theo ngày</p>
										<p style={{marginBottom:"0"}}>{`${moment(dateRange.start).format('DD')} - ${moment(dateRange.end).format('DD/MM/YYYY')}`}</p>
									</div>
								}
							>
								<Line data={lineChart} options={options2} />
							</Card>
						</Col>
						<Col span={12}>
							<Card 
								title={
									<div style={{display: 'flex', justifyContent:"space-between"}}>
										<p style={{fontSize:"18px !important", fontWeight:"600", marginBottom:"0"}}>Biểu đồ tỉ lệ đánh giá của bệnh nhân</p>
										{/* <p style={{marginBottom:"0"}}>{`${moment(dateRange.start).format('DD')} - ${moment(dateRange.end).format('DD/MM/YYYY')}`}</p> */}
									</div>
								}	
							>
								<Pie data={specChart} />
							</Card>
						</Col>
					</Row>
                </div>
            </div>

        </>
    )
}

export default DashboardSystem

