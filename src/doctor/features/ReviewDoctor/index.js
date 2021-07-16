import { Card, Input, Rate, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import patientAPI from '../../../api/patientApi';
import DoctorSidebar from '../../components/DoctorSideBar';
import LoadingTop from '../../components/loadingTop';
import ScheduleSearch from '../DoctorAppointment/components/ScheduleSearch';


const ReviewDoctor = (props) =>{
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;
    const {doctor} = props.doctorData.currentDoctor;
    const [loadingPage, setLoadingPage] = useState(true);
    const [reviewData, setReviewData] = useState([]);
    const [filterSchedule, setFilterSchedule] = useState({
        search: "",
        status: 1,
        currentPage: 1,
    })
   
    useEffect(()=> {
        getReviewDoctors(currentDoctor.doctor._id);
    },[]);
    useEffect(()=> {
        const {search} = filterSchedule;
        const _data = [...reviewData];
        let result = [];
        if(!result) {
            result = [..._data];
        } else {
            result = _data.filter(item=>item.name.toUpperCase().includes(search.toUpperCase()));
        }
        setReviewData([...result]);
        setTimeout(() => {
            setLoadingPage(false);
        }, 400);
    },[props.data, filterSchedule])
    const getReviewDoctors = async (id) => {
        try {
            const response = await patientAPI.get_doctor_reviews(id);
            if(response.error) throw new Error("Can't get getReviewDoctors")
            const data = response.data;
            const _data = data.map(item => {
                return {
                    name: item.patient_name,
                    date: "1/1/2021",
                    star: item.rate.star_num,
                    comment: item.rate.comment
                }
            })
            setReviewData([..._data]);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    const columns = [
        {
			title: 'Bệnh nhân',
            dataIndex: 'name',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
        {
			title:'Ngày khám',
			dataIndex:'date',
		},
        {
			title:'Điểm đánh giá',
			dataIndex:'star',
            render: (text) => {
				return (
					<Rate count={5} value={text}/>
				)
			  }, 
		},
        {
            title:'Đánh giá',
            dataIndex: 'comment'
        },
	]
    const handleSearchName = (data) => {
        setFilterSchedule({
            ...filterSchedule,
            search: data
        })
    }
    const onChangeSearch = (e) => {
        setReviewData({
            ...reviewData,
            loading: true,
        })
        setFilterSchedule({
            ...filterSchedule,
            search: e.target.value
        })
    }
    return(
        <div>
            {loadingPage && <LoadingTop/>}
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
                            <h2 className="breadcrumb-title">ReviewDoctor</h2>
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
                            <h2>Đánh giá bác sĩ</h2>
                            <Card>
                                <ScheduleSearch
                                    searchName={handleSearchName}
                                />
                                <Table className="table-striped"
                                    columns={columns}                 
                                    dataSource={reviewData}
                                    ascend={true}
                                    style = {{overflowX : 'auto'}}
                                    rowKey={record => record.id}
                                    showSizeChanger={true} 
                                    loading={loadingPage}
                                />
                            </Card>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default ReviewDoctor;
     