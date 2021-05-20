import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SidebarNav from '../../../../components/SideBar'
import {Card, Row, Col, Form, Input, Button, Modal} from 'antd'
import img_logo from '../../../../assets/img/logobv.jpg' 
import img_background from '../../../../assets/img/hospital_background.jpg'
import './style.css'
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import { get_hospital_byId } from '../../../../../redux/actions/adminActions'
import { useHistory } from 'react-router'


const HospitalInfo = () => {
	const dispatch = useDispatch()
	const hospital = useSelector(state=>state.admin.hospitalById)
	console.log(hospital,"lllllllllllllll");
	useEffect(()=> {
		dispatch(get_hospital_byId('5ffa9e2e1c8cbb1f801e71c4'))
	},[])
	const history = useHistory();
	console.log(history,"history");
  
	const [showModal, setShowModal] = useState(false)
	const [initialData, setInitialData] = useState(null)
	//**************** handle modal ***********************
	const handleEditInfo = () => {
		setShowModal(true)
	}
	const handleSubmit = () => {
		console.log('submit modal');
		setShowModal(false)
	}
	const handleReturn = () => {
		setShowModal(false)
	}
	//**************** end of handle modal ***********************
	const onFinishModal=(dataModal)=> {
		console.log('dataModal: ',dataModal);
	}
	const handleChange = (event) => {
		console.log(event,"aaaaaaaaaaaaa");
	}
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-7 col-auto">
								<h3 className="page-title">Thông tin bệnh viện Hùng Vương</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Bệnh viện Hùng Vương</li>
								</ul>
							</div>
							<div className="col-sm-5 col">
							<a href="#0" className="btn btn-primary float-right mt-2" onClick={handleEditInfo}>
								Chỉnh sửa thông tin</a>
						</div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card>
							<Row gutter={[20,20]}>
								<Col span={10} style={{textAlign:'center'}}>
									<div className="img_logo">
										<img src={img_logo} alt=""/>
									</div>
									<h4 style={{paddingTop:'15px'}}>Logo bệnh viện</h4>
								</Col>
								<Col span={14} style={{textAlign:'center'}}>
									<div className="img_background">
										<img src={img_background} alt=""/>
									</div>
									<h4 style={{paddingTop:'15px'}}>Background bệnh viện</h4>
								</Col>
							</Row>
						</Card>
						<Card className="card_detail_info" >
							{hospital && <Row gutter={[20,20]}>
								<Col sm={{span:24}} md={{span:10}}>
									<h4>Thông tin chi tiết:</h4>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên bệnh viện</div>
										<div className="col-sm-8">{hospital.name}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Số điện thoại:</div>
										<div className="col-sm-8">{hospital.phone}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Email:</div>
										<div className="col-sm-8">{hospital.email}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Địa chỉ:</div>
										<div className="col-sm-8">{hospital.address}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Loại hợp đồng:</div>
										<div className="col-sm-8">{hospital.contractType}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Quy mô cơ sở y tế:</div>
										<div className="col-sm-8">{hospital.scale}</div>
									</div>
								</Col>
								<Col sm={{span:24}} md={{span:14}}>
									<h4>Giới thiệu:</h4>
									<div className="info_gioithieu">
										{hospital.about}
									</div>
								</Col>
								
								<Modal
								visible={showModal}
								title="Xác nhận thông tin"
								width={1000}
								onOk={handleSubmit}
								onCancel={handleReturn}
								footer={[
									<Button key="back" onClick={handleReturn}>
									Quay lại
									</Button>,
									<Button key="submit" type="primary" onClick={handleSubmit}>
									Xác nhận
									</Button>,
								]}
								>
									<Form
										labelCol={{
										span: 24,
										}}
										wrapperCol={{
										span: 24,
										}}
										layout="vertical"
										size="large"
										onFinish={onFinishModal}
										// initialValues={}
									>   
										<div className="info-benhnhan">                     
											<Row gutter={[8,8]}>
												<Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
													<Form.Item name="name" label="Tên bệnh viện:">
														<Input className="input" placeholder="Tên bệnh viện"/>
													</Form.Item>
													<Form.Item name="phone" label="Số điện thoại:">
														<Input className="input" placeholder="Số điện thoại"/>
													</Form.Item>
												</Col>
												<Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
													<Form.Item name="email" label="Email:">
														<Input className="input" placeholder="Email"/>
													</Form.Item>
													<Form.Item name="address" label="Địa chỉ:">
														<Input className="input" placeholder="Địa chỉ"/>
													</Form.Item>
												</Col>
												<Col span={24}>
													<Form.Item label="Giới thiệu:" className="form-trieuchung">
														<ReactQuill 
															theme="snow"
															onChange={handleChange}
														/>
													</Form.Item>
												</Col>
												<Col span={24}>
													<Form.Item>
														<Button type="primary" htmlType="submit">Xác nhận đặt khám</Button>
													</Form.Item>
												</Col>
											</Row>
										</div>
									</Form>
								</Modal>
							</Row>}
						</Card>
					</div>

                </div>
            </div>

        </>
    )
}

export default HospitalInfo
