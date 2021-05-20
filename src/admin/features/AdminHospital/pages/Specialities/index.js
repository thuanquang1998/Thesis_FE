import { Card } from '@material-ui/core';
import { Badge, Button, Table, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarNav from '../../../../components/SideBar';
import { get_specialities_system } from '../../../../../redux/actions/adminActions';

const Specialities = () => {
	const dispatch = useDispatch()
	const [show, setShow] = useState(null)
	const specialities = useSelector(state=>state.admin.specialities_system)
	
	useEffect(()=> {
		dispatch(get_specialities_system())
	},[])

	const new_columns = [
		{
			title: 'Tên chuyên khoa',
			dataIndex: 'name',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span className="avatar avatar-sm mr-2"><img src={record.image} className="avatar-img" alt=""/></span>
				<span>{record.name}</span>
			  </div>
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
			title: 'Số bác sĩ',
			render: (text, record) => (            
				<Tag color="green">Đã kích hoạt</Tag>
			), 
		},
		{
		title: 'Sự kiện',
		render: (text, record) => (
			<div className="actions">
				<a href="#0" className="btn btn-sm bg-success-light" onClick={()=>handleShow('edit')}><i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Sửa</a>
				<a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>handleShow('delete')}><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Xóa</a>
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
		<div className="page-wrapper">
			<div className="content container-fluid">
				<div className="page-header">
					<div className="row">
						<div className="col-sm-7 col-auto">
							<h3 className="page-title">Chuyên khoa</h3>
							<ul className="breadcrumb">
								<li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
								<li className="breadcrumb-item active">Chuyên khoa</li>
							</ul>
						</div>
						<div className="col-sm-5 col">
							<a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>handleShow('create')}>
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
						columns={new_columns}                 
						dataSource={specialities}
						ascend={true}
						style = {{overflowX : 'auto'}}
						rowKey={record => record.id}
						showSizeChanger={true} 
					/>
				</Card>
			</div> 
			{/* Create Modal */}
			<Modal show={show === 'create'} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title><h5 className="modal-title">Thêm chuyên khoa</h5></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<form>
						<div className="row form-row">
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Tên chuyên khoa</label>
									<input type="text" className="form-control" />
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Logo chuyên khoa</label>
									<input type="file"  className="form-control" />
								</div>
							</div>
							
						</div>
						<button type="submit" className="btn btn-primary btn-block">Lưu thay đổi</button>
					</form>
				</Modal.Body>
			</Modal>
			{/* Create Modal */}
			{/* Edit Modal */}
			<Modal show={show === 'edit'} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title><h5 className="modal-title">Sửa chuyên khoa</h5></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<form>
						<div className="row form-row">
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Tên chuyên khoa</label>
									<input type="text" className="form-control" />
								</div>
							</div>
							<div className="col-12 col-sm-6">
								<div className="form-group">
									<label>Logo chuyên khoa</label>
									<input type="file"  className="form-control" />
								</div>
							</div>
							
						</div>
						<button type="submit" className="btn btn-primary btn-block">Lưu thay đổi</button>
					</form>
				</Modal.Body>
			</Modal>
			{/* Edit Modal */}
			{/* Delete Modal */}
			<Modal show={show === 'delete'} onHide={handleClose} centered>
				<Modal.Body className="text-center">
					<div className="form-content p-2">
						<h4 className="modal-title">Xóa chuyên khoa</h4>
						<p className="mb-4">Bạn có chắc muốn xóa chuyên khoa này?</p>
						<button type="button" className="btn btn-primary">OK </button>
						<button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleClose}>Đóng</button>
					</div>
				</Modal.Body>
			</Modal>
			{/* Delete Modal */}
		</div>
	</>         
	)
}
  
export default Specialities; 