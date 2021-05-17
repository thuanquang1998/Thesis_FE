import { Card } from '@material-ui/core'
import { Badge, Button, Table, Tag } from 'antd'
import React from 'react'
import SidebarNav from '../../sidebar'

const Employees = () => {
	const data_nhanvien = [
		{
			name:'Nguyễn Văn Khánh',
			specialities: 'Tim mạch',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Bác sĩ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: 'Tim mạch',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Bác sĩ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: '',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Nv Hỗ trợ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: 'Tim mạch',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Bác sĩ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: '',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Nv Hỗ trợ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: '',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Nv Hỗ trợ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: '',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Nv Hỗ trợ',
		},
		{
			name:'Nguyễn Văn Khánh',
			specialities: '',
			phone_number:'0975585249',
			email: 'thuanquang2009@gmail.com',
			role: 'Nv Hỗ trợ',
		},
	]
	const new_columns = [
        {
          title: 'Tên nhân viên',
		  key:'name',
		  dataIndex:'name',
		  render: (text, record) => (
			<div>
				<i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i>
				<span>{text}</span>
			</div>
		),
          fixed: 'left',
        //   width: 200,
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'specialities',
			key:'specialities'
		},
        {
          title: 'Số điện thoại',
		  dataIndex: 'phone_number',
		  key:'phone_number'
        },
        {
          title: 'Email',
		  dataIndex: 'email',
		  key:'email'
        },
        {
          title: 'Loại tài khoản',
		  dataIndex: 'role',
		  key:'role', 
		  render: (text) => text==='Bác sĩ'?(<Tag color="green">{text}</Tag>):(<Tag color="purple">{text}</Tag>),
		//   sorter: (a, b) => 
        },
        {
          title: 'Hành động',
          key: 'id',
          render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light"><i className="fa fa-pencil-alt"></i>Sửa</a>
				<a href="#0" className="btn btn-sm bg-danger-light"><i className="fa fa-trash"></i>Xóa</a>
			</div>
		),
          fixed: 'right',
          width: 170,
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
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bác sĩ</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Danh sách bác sĩ</li>
								</ul>
							</div>
						</div>
					</div>
                    
                    <Card 
						title={<>Danh sách nhân viên <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
					>
						<Table
							bordered={true}
							columns={new_columns}
							dataSource={data_nhanvien} 
							/>
							<br />
							<div className="d-flex flex-row-reverse">
							</div>
							<br />
					</Card>

                </div>
            </div>

        </>
    )
}

export default Employees
