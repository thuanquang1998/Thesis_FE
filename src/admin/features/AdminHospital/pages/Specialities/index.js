import { Card } from '@material-ui/core';
import { Badge, Button, Table, Tag, Form, Select, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarNav from '../../../../components/SideBar';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import { useSnackbar } from 'notistack';
import Swal from "sweetalert2";


const Specialities = () => {
    const {enqueueSnackbar} = useSnackbar();
	const [show, setShow] = useState(null);
	const [loadingPage, setLoadingPage] = useState(true);
	const [ listSpec, setListSpec ] = useState([]);
	const [listSpecAdd, setListSpecAdd] = useState([]);
	
	useEffect(()=> {
		getListSpec();
    },[])

	useEffect(()=> {
		(async ()=>{
        	setLoadingPage(true);
            try {
               	const response = await adminAPI.get_speacialities();
                if(response.error) throw new Error(response.errors[0].message);
				const _listSpec = listSpec.map(x=>x._id);
				const _spec = response.data.filter(item=> !_listSpec.includes(item._id));
				setListSpecAdd(_spec);
				setLoadingPage(false)
            } catch (error) {
                console.log('error.message :>> ', error.message);
            }
        })()
	},[listSpec])
	
	const getListSpec = async () => {
        setLoadingPage(true);
		try {
			const response = await adminAPI.get_spec_of_hospital(JSON.parse(localStorage.getItem('currentAdmin')).hospital.id);
			if(!response.error){
				setListSpec(response.data)         
			}
			else {
				setListSpec([]);
			}      
			setLoadingPage(false)
		} catch (error) {
            console.log('error.message :>> ', error.message);
		}
	}


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
				{record.num_doctor}
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
				<a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>handleDeleteSpec(record)}><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Xóa</a>
			
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

	const handleDeleteSpec = (data) => {
		if(data.num_doctor!==0) {
			Swal.fire({
				icon: "error",
				text: "Không thể xóa chuyên khoa này."
			});
		} else {
			const _data = {
				hospital_id: JSON.parse(localStorage.getItem('currentAdmin')).hospital._id,
				spec_id: data._id,
			}
			Swal.fire({
				icon: "info",
				text: "Bạn muốn xóa chuyên khoa này?",
				showCancelButton: true,
				cancelButtonColor: "#3085d6",
				confirmButtonColor: "#d33",
				confirmButtonText: "Xóa",
				cancelButtonText: "Hủy"
			})
			.then((result) => {
				if (result.value) {
					removeSpec(_data);
				} 
			})
			.catch((error) => {
				console.log('error.message :>> ', error.message);
			});
		}
	}
	const removeSpec = async (data) => {
		try {
			const response = await adminAPI.remove_spec_hospital(data);
			if(response.error) throw new Error(response.errors[0].message);
			getListSpec();
			setTimeout(() => {
        		enqueueSnackbar('Xóa chuyên khoa thành công.', {variant: 'success'});
			}, 300);
		} catch (error) {
			console.log('error.message :>> ', error.message);
        	enqueueSnackbar('Xóa chuyên khoa không thành công.', {variant: 'error'})
		}
	}
	const onHandleAddSpec = async (value) => {
		const _data = {
			hospital_id: JSON.parse(localStorage.getItem('currentAdmin')).hospital._id,
			spec_id: value.specialization,
		}
		try {
			const response = await adminAPI.add_spec_hospital(_data)
			if(response.error) throw new Error(response.errors[0].message);
			getListSpec();
			setTimeout(() => {
				handleClose();
        		enqueueSnackbar('Thêm chuyên khoa thành công.', {variant: 'success'});
			}, 300);
		} catch (error) {
			console.log('error.message :>> ', error.message);
        	enqueueSnackbar('Thêm chuyên khoa không thành công.', {variant: 'error'})
		}
	}
	return(
		<>
		<SidebarNav />
		{loadingPage && <LoadingTop/>}
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
						dataSource={listSpec}
						ascend={true}
						style = {{overflowX : 'auto'}}
						rowKey={record => record.id}
						showSizeChanger={true} 
						loading={loadingPage}
					/>
				</Card>
			</div> 
			{/* Create Modal */}
			<Modal show={show === 'create'} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title><h5 className="modal-title">Thêm chuyên khoa</h5></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				 <Form
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="vertical"
                        size="large"
                        onFinish={onHandleAddSpec}
                    >   
                        <Row gutter={[8,8]}>
							<Form.Item
								label="Chuyên khoa"
								name="specialization"
								rules={[
									{
									required: true,
									message: 'Chọn chuyên khoa!',
									},
								]}
							>
								<Select className="province" placeholder="Chuyên khoa" onChange={()=>{}} loading={loadingPage}>
									{listSpecAdd.length!==0 && listSpecAdd.map((item, index)=>(
										<Select.Option value="agent" key={index} value={item._id}>{item.name}</Select.Option>
									))}
								</Select>
							</Form.Item>
                        </Row>
							<Form.Item>
								<Button loading={loadingPage} type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
									Lưu
								</Button>
							</Form.Item>
                    </Form>
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
		</div>
	</>         
	)
}
  
export default Specialities; 