import React,{useState} from 'react'
import './style.css'
import {Link} from 'react-router-dom'
import { Card, Table } from 'antd'
import { data } from 'jquery'
import PatientSidebar from '../patient-dashboard/patient-sidebar';
const PatientDashboard = () => {
    const [show, setShow] = useState(null)
    const columns = [
		{
			title: 'Bệnh nhân',
			dataIndex: 'name_patient',
		},
		{
			title: 'Bác sĩ',
			dataIndex:'name_doctor'
		},
		{
			title: 'Bệnh viện',
			dataIndex:'hospital',
        },
        {
			title: 'Chuyên khoa',
			dataIndex:'specialitites',
        },
        {
			title: 'Ngày khám',
			dataIndex:'day',
        },
        {
			title: 'Giờ khám',
			dataIndex:'time',
        },
        {
			title: 'Phòng khám',
			dataIndex:'room',
		},
		{
		title: 'Sự kiện',
		render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light" onClick={()=>handleShow('edit')}><i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Đổi lịch</a>
				<a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>handleShow('delete')}><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Hủy lịch</a>
			</div>
		),
		},		
      ]	
      const data = [
          {
              name_patient:"Nguyễn Văn Khánh",
              name_doctor:"Tô Ngọc Bình",
              hospital: "Bệnh viện Hùng Vương",
              specialities: "Tim mạch",
              day: "21/1/2021",
              time:"9:00-10:00",
              room:'9'
          },
      ]
      const handleClose = () => {
		setShow(false)	
	}

	const handleShow = (id) =>{
		setShow(id)
	}
    return (
        <>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Quản lí tài khoản</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Quản lí lịch khám</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <div className="col-md-5 col-lg-4 col-xl-3">
                        <PatientSidebar />
                    </div>
                    <div className="col-md-7 col-lg-8 col-xl-9">
                        <div className="row">
                            <div className="col-sm-12">
                                <Card 
                                    // title={<>Danh sách chuyên khoa <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
                                    // extra={
                                    // <a href="/admin/cosoyte/them-ck">
                                    //     <Button type="primary">Tạo mới chuyên khoa</Button>
                                    // </a>}
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
                        {/* <section className="section list-doctor">
                            <Card 
                                // title={<>Danh sách chuyên khoa <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
                                // extra={
                                // <a href="/admin/cosoyte/them-ck">
                                //     <Button type="primary">Tạo mới chuyên khoa</Button>
                                // </a>}
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
                        </section> */}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default PatientDashboard
