import React from 'react'
import SidebarNav from '../../../../components/SideBar'
import {Card, Button, Table, Rate, Tag} from 'antd'

const Reviews = () => {
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
			dataIndex: 'ratings',
			render: (text) => {
				return (
					<Rate count={5} value={text}/>
				)
			  }, 
		},
		{
			title:'Mô tả',
			dataIndex:'description',
		},
		{
			title:'Thời gian',
			dataIndex:'time',
		},
		{
			title:'Trạng thái',
			dataIndex:'status',
			render: (text, record) => ( 
				
					text==='Đã khám'?<Tag color='green'>{text}</Tag>:<Tag color='red'>{text}</Tag>
				        
				
			), 
		},
		{
			title: 'Sự kiện',
			key: 'id',
			render: () => {
			  return (
				<div>
					<a href={`#/restaurants/edit/{partner.id}`} className="btn btn-sm bg-success-light"><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Kích hoạt</a>
					<a href={`#/restaurants/edit/{partner.id}`} className="btn btn-sm bg-danger-light"><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Xóa</a>
				</div>
			  )
			}, 
		  },
	]
	const data = [
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Đã khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
		{
			patient_name: 'Nguyễn Văn A',
			doctor_name: 'Tô Ngọc Bình',
			ratings: 4,
			description: 'Bác sĩ làm việc tận tâm',
			time:'29/12/2020',
			status: 'Chưa khám',
		},
	]
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Thông tin bệnh viện Hùng Vương</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Bệnh viện Hùng Vương</li>
									<li className="breadcrumb-item active">Đánh giá bác sĩ</li>
								</ul>
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
							pagination={true}
							dataSource={data} 
							/>
						</Card>
					</div>

                </div>
            </div>

        </>
    )
}

export default Reviews
