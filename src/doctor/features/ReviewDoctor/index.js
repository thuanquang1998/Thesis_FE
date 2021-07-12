import { Card, Input, Rate, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import patientAPI from '../../../api/patientApi';
import DoctorSidebar from '../../components/DoctorSideBar';
import LoadingTop from '../../components/loadingTop';


const ReviewDoctor = (props) =>{
    const { isDoctorLoggedIn, currentDoctor} = props.doctorData;
    const {doctor} = props.doctorData.currentDoctor;
    const [reviewData, setReviewData] = useState({
        data: [],
        loading: true,
    })
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
        const _data = [...reviewData.data];
        const result = _data.filter(item=>item.name.toUpperCase().includes(search.toUpperCase()));
        setReviewData({
            ...reviewData,
            loading: false,
            data: [...result]
        })
        
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
            setReviewData({
                data: [..._data],
                loading: false
            })
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
			title:'Rating',
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
            {reviewData.loading && <LoadingTop/>}
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
                            <Card>
                                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh sách đánh giá:</h4>
                                <Input placeholder="Tìm kiếm" onChange={onChangeSearch} value={filterSchedule.search}/>
                                <Table className="table-striped"
                                    columns={columns}                 
                                    dataSource={reviewData.data}
                                    ascend={true}
                                    style = {{overflowX : 'auto'}}
                                    rowKey={record => record.id}
                                    showSizeChanger={true} 
                                    loading={reviewData.loading}
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
     