import React, { useState, useEffect} from 'react';
import { Badge, Button, Table } from 'antd';
import {useDispatch, useSelector} from 'react-redux'

import { Link } from 'react-router-dom';
import SidebarNav from '../../sidebar';
import { Modal } from 'react-bootstrap';
import IMG01 from '../../../assets/images/specialities-01.png';
import IMG02 from '../../../assets/images/specialities-02.png';
import IMG03 from '../../../assets/images/specialities-03.png';
import IMG04 from '../../../assets/images/specialities-04.png';
import IMG05 from '../../../assets/images/specialities-05.png';
import { Card } from '@material-ui/core';
import { get_hospital_byId } from '../../../../actions/adminActions'

const SpecialitiesHospital = () => {
	const [show, setShow] = useState(null)
	const dispatch = useDispatch()
	const hospital = useSelector(state=>state.admin.hospitalById)
	console.log(hospital,"lllllllllllllll");
	useEffect(()=> {
		dispatch(get_hospital_byId('5ffa9e2e1c8cbb1f801e71c4'))
	},[])


	const [data, setData] = useState([
		{id:'1', image:IMG01, specialities:'Cardiologist'},
		{id:'2', image:IMG02, specialities:'Dentist'},
		{id:'3', image:IMG03, specialities:'Neurology'},
		{id:'4', image:IMG04, specialities:'Orthopedic'},
		{id:'5', image:IMG05, specialities:'Urology'},
		{id:'6', image:IMG02, specialities:'Dentist'},
		{id:'7', image:IMG03, specialities:'Neurology'},
		{id:'8', image:IMG04, specialities:'Orthopedic'},
		{id:'9', image:IMG02, specialities:'Dentist'},
		{id:'10', image:IMG03, specialities:'Neurology'},
		{id:'11', image:IMG04, specialities:'Orthopedic'},
		{id:'12', image:IMG03, specialities:'Neurology'},
		{id:'13', image:IMG04, specialities:'Orthopedic'},
		{id:'14', image:IMG03, specialities:'Neurology'},
		{id:'15', image:IMG04, specialities:'Orthopedic'},
		{id:'16', image:IMG03, specialities:'Neurology'},
		{id:'17', image:IMG04, specialities:'Orthopedic'},
		{id:'18', image:IMG03, specialities:'Neurology'},
		{id:'19', image:IMG04, specialities:'Orthopedic'},
	])

	const new_columns = [
		{
			title: 'Tên chuyên khoa',
			dataIndex: 'name',
			render: (text, record) => (            
			  <h2 className="table-avatar">
				<Link to="/admin/profile" className="avatar avatar-sm mr-2"><img src={record.image} className="avatar-img" alt=""  /></Link>
				<Link to="/admin/profile">{text}</Link>
			  </h2>
			), 
		},
		{
			title: 'Số bác sĩ',
			render: (text, record) => (            
			  <h4 className="table-avatar">
				{Math.random(1,10),1}
			  </h4>
			), 
		},
		{
		title: 'Hành động',
		render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light" onClick={()=>handleShow('edit')}><i className="fa fa-pencil-alt"></i>Sửa</a>
				<a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>handleShow('delete')}><i className="fa fa-trash"></i>Xóa</a>
			</div>
		),
		},		
      ]	

	const handleClose = () => {
		setShow(false)	
	}

	const handleShow = (id) =>{
		setShow(id)
	}
	return(
		<>
		<SidebarNav />
		{ hospital && <div className="page-wrapper">
			<div className="content container-fluid">
				<div className="page-header">
					<div className="row">
						<div className="col-sm-7 col-auto">
							<h3 className="page-title">Chuyên khoa</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
								<li className="breadcrumb-item active">Chuyên khoa của {hospital.name}</li>
							</ul>
						</div>
						<div className="col-sm-5 col">
						<a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>handleShow('edit')}>
							Thêm chuyên khoa</a>
							
						</div>
					</div>
				</div>
				<Card 
					title={<>Danh sách chuyên khoa <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
					extra={
					<a href="/admin/cosoyte/them-ck">
						<Button type="primary">Tạo mới chuyên khoa</Button>
					</a>
				}>
					<Table className="table-striped"
										
										style = {{overflowX : 'auto'}}
										columns={new_columns}                 
										// bordered
										dataSource={hospital.specialization}
										ascend={true}
										rowKey={record => record.id}
										showSizeChanger={true} 
										// pagination= { {total : data.length,
										// 	showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
										// 	showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
										/>
					
				</Card>
			</div> 


			
			{/* Edit Modal */}
			<Modal show={show === 'edit'} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title><h5 className="modal-title">Edit Specialities</h5></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<form>
						<div className="row form-row">
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Specialities</label>
									<input type="text" className="form-control" />
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Image</label>
									<input type="file"  className="form-control" />
								</div>
							</div>
							
						</div>
						<button type="submit" className="btn btn-primary btn-block">Save Changes</button>
					</form>
				</Modal.Body>
			</Modal>
			{/* Edit Modal */}
			{/* Delete Modal */}
			<Modal show={show === 'delete'} onHide={handleClose} centered>
				
				<Modal.Body className="text-center">
			
					<div className="form-content p-2">
						<h4 className="modal-title">Delete</h4>
						<p className="mb-4">Are you sure want to delete?</p>
						<button type="button" className="btn btn-primary">Save </button>
						<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
					</div>
			
				</Modal.Body>
			</Modal>
			{/* Delete Modal */}
		</div>}
	</>         
	)
}
  
export default SpecialitiesHospital; 