import React,{useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import {Card, Button, Table, Rate, Tag} from 'antd'
import LoadingTop from '../../../../components/loadingTop';
import adminAPI from '../../../../../api/adminAPI';

const Reviews = () => {
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [listReview, setListReview] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);

	useEffect(()=> {
		const id = hospitalInfo._id;
		getReviewsData(id);
	},[])
	const getReviewsData = async (id) => {
		console.log("123123123");
		try {
			const response = await adminAPI.get_review_hospital(id);
			if(response.error) throw new Error("Can't load review Data")
			console.log('response getReviewsData:>> ', response);
			const _data = response.data.map(x=>{
				const obj = {
					...x,
					star_num: x.rate.star_num,
					comment: x.rate.comment,
				}
				return obj
			})
			setListReview(_data)
		} catch (error) {
			console.log('error :>> ', error);
		}
		setLoadingPage(false);
	}

	const columns = [
		{
			title: 'Tên bệnh nhân',
			dataIndex: 'patient_name',
		},
		{
			title: 'Tên bác sĩ',
			dataIndex:'doctor_name',
		},
		{
			title:'Đánh giá',
			dataIndex: 'star_num',
			render: (text, record) => {
				return (
					<Rate value={text}/>
				)
			  }, 
		},
		{
			title:'Mô tả',
			dataIndex:'comment',
		}
	]
    return (
        <>
			{loadingPage && <LoadingTop/>}
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách đánh giá bác sĩ</h3>
							</div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card>
							<Table className="table-striped"
								bordered={true}
								ascend={true}
								rowKey={record => record.id}
								showSizeChanger={true} 
								columns={columns}
								dataSource={listReview} 
								pagination={{position:["bottomCenter"]}}
								loading={loadingPage}
							/>
						</Card>
					</div>

                </div>
            </div>

        </>
    )
}

export default Reviews
