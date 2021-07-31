import { Card } from '@material-ui/core';
import { Badge, Button, Table, Tag } from 'antd';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SidebarNav from '../../../../components/SideBar';
import LoadingTop from '../../../../components/loadingTop';
import adminAPI from '../../../../../api/adminAPI';
import CreateSpec from './CreateSpec';
import { useSnackbar } from 'notistack';

const SpecialitiesRoot = () => {
    const { enqueueSnackbar } = useSnackbar();

	const [show, setShow] = useState(null)
	
	const [specSystem, setSpecSystem] = useState([]);
	const [loadingPage, setLoadingPage] = useState(true);

	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
	useEffect(()=> {
		// dispatch(get_specialities_system())
		get_specialities_system();
	},[])
	const get_specialities_system = async () => {
		setLoadingPage(true);
		try {
			const response = await adminAPI.get_speacialities();
			if(response.error) throw new Error("error");
			console.log('response :>> ', response);
			setSpecSystem(response.data);
			setLoadingPage(false);
		} catch (error) {
			console.log('error get_specialities_system:>> ', error);
			setLoadingPage(false);
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
			  record.num_doctor
			), 
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (text) => {
			  return (
				<Tag color="green">Đã kích hoạt</Tag>
			  )
			}, 
		  },
		// {
		// title: 'Sự kiện',
		// render: (text, record) => (
		// 	<div className="actions">
		// 		<a href="#0" className="btn btn-sm bg-success-light" onClick={()=>{}}><i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Sửa</a>
		// 		<a href="#0" className="btn btn-sm bg-danger-light" onClick={()=>{}}><i className="fa fa-trash" style={{paddingRight:'5px'}}></i>Xóa</a>
		// 	</div>
		// ),
		// },		
      ]	

	const submitCreateSpec = async (data) => {
		setLoadingPage(true);
		// call api
		createApi(data);
	}
	const createApi = async (data) => {
		try {
			const response = await adminAPI.create_spec_root(data);
			if(response.error) throw new Error(response.status);
            enqueueSnackbar('Thêm chuyên khoa thành công', {variant: 'success'})
			get_specialities_system();

		} catch (error) {
			console.log('error submitCreateSpec:>> ', error);
			if(error==="403"){
				enqueueSnackbar('Tên chuyên khoa đã tồn tại.', {variant: 'error'})
			} else {
				enqueueSnackbar('Tên chuyên khoa đã tồn tại.', {variant: 'error'})
			}
		}
		setLoadingPage(false);
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
							<h3 className="page-title" style={{paddingTop:"20px"}}>Chuyên khoa <Badge count={specSystem.length} style={{ backgroundColor: '#52c41a' }} /></h3>
						</div>
						<div className="col-sm-5 col">
							<a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>setModalData({...modalData, visible:true})}>
								Thêm chuyên khoa</a>
						</div>
					</div>
				</div>
				<Card>
					<Table className="table-striped"
						columns={new_columns}                 
						dataSource={specSystem}
						ascend={true}
						style = {{overflowX : 'auto'}}
						rowKey={record => record.id}
						showSizeChanger={true} 
						loading={loadingPage}
						pagination={{position:["bottomCenter"]}}
					/>
				</Card>
				<CreateSpec
					modalData={modalData}
					handleOk={()=>{
						setModalData({
							...modalData,
							visible: !modalData.visible,
						})
					}}
					handleClose={()=>{
						setModalData({
							...modalData,
							visible: !modalData.visible,
						})
					}}
					submitCreateSpec={submitCreateSpec}
				/>
			</div> 
			
		</div>
	</>         
	)
}
  
export default SpecialitiesRoot; 