import React from 'react'
import SidebarNav from './../../../../components/SideBar'
import {Card, Tag, Badge, Table} from 'antd'
import logoDoctor from '../../../../assets/img/male_logo.png'


const Appoinments = () => {
	const columns = [
		{
			title: 'Tên bác sĩ',
			dataIndex: 'doctor_name',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span className="avatar avatar-sm mr-2"><img src={logoDoctor} className="avatar-img" alt=""  /></span>
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'specialities',
		},
		{
			title:'Tên bệnh nhân',
			dataIndex:'patient_name',
		},
		{
			title:'Thời gian khám',
			dataIndex:'time',
			render: (text, record) => (            
				<div className="table-avatar">
					<p>5 Nov 2020</p>
					<p>11.00 AM - 11.35 AM</p>
				</div>
			), 
		},
		{
		title: 'Sự kiện',
		render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light"><i className="fe fe-pencil"></i>Sửa</a>
				<a href="#0" className="btn btn-sm bg-danger-light"><i className="fe fe-trash"></i>Xóa</a>
			</div>
		),
		},		
	]
	const data = [
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
		},
		{
			doctor_name: 'Tô Ngọc Bình',
			specialities: 'Tiêu hóa',
			patient_name: 'Nguyễn Văn Khánh',
			time: "aaaaaaaaa"
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
									<li className="breadcrumb-item active">Bệnh viện Hùng Vương</li>
								</ul>
							</div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card 
						title={<>Danh sách lịch khám <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
						>
							<Table className="table-striped"
								columns={columns}                 
								dataSource={data}
								ascend={true}
								style = {{overflowX : 'auto'}}
								rowKey={record => record.id}
								showSizeChanger={true} 
							/>
						</Card>
					</div>

                </div>
            </div>

        </>
    )
}

export default Appoinments;
