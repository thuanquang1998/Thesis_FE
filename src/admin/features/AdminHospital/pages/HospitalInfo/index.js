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
import UpdateHospital from '../../components/UpdateHospital';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import {useSnackbar} from 'notistack';

const HospitalInfo = () => {
    const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const hospitalId = hospitalInfo._id;
	const {enqueueSnackbar} = useSnackbar();
	const [loadingPage, setLoadingPage] = useState(true);
	const [hospitalData, setHospitalData] = useState({});
	const [initData, setInitData] = useState({
		// about:""
	});

	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })






	const updateHospitalInfo = async (data) => {
		setLoadingPage(true);
		try {
			const response = await adminAPI.update_hospital_info({data,id:hospitalInfo._id})
			if(response.error) throw new Error('Error updating');
			enqueueSnackbar("Cập nhật thông tin thành công", {variant: 'success'});
			setModalData({...modalData, visible:false});
			getHospitalInfo();
			setLoadingPage(false);
		} catch (error) {
			console.log('error updateHospitalInfo:>> ', error);
			setLoadingPage(false);
			enqueueSnackbar("Đã có lỗi xảy ra. Thử lại sau.", {variant: 'error'});


		}

	}


	const getHospitalInfo = async () => {
		try {
			const response = await adminAPI.get_hospital_info(hospitalId);
			if(response.error) throw new Error('error gethospitalInfo');
			setHospitalData(response.data.data[0]);
			// handleDAta
			const _data = {...response.data.data[0]};
			const addressStr = _data.address.split(",");
			const new_data = {
				name: _data.name,
				email: _data.email,
				phone: _data.phone,
				about: _data.about,
				address: {
					province: addressStr[3],
					district: addressStr[2],
					ward: addressStr[1],
					street: addressStr[0]
				}
			}
			setInitData({...new_data});

		} catch (error) {
			console.log('error getHospitalInfo:>> ', error);
		}
		setTimeout(() => {
			setLoadingPage(false);
		},300)
	}

	useEffect(()=> {
		getHospitalInfo();
	},[])
    return (
        <>
			{loadingPage && <LoadingTop/>}
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-7 col-auto">
								<h3 className="page-title" style={{paddingTop:"20px"}}>{`Thông tin ${hospitalData.name||""}`}</h3>
							</div>
							<div className="col-sm-5 col">
							    <a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>setModalData({...modalData, visible:true})}>
								    Chỉnh sửa thông tin
                                </a>
						    </div>
						</div>
					</div>
                    
                    <div className="infobv">
						<Card>
							<Row gutter={[20,20]}>
								<Col span={10} style={{textAlign:'center'}}>
									<div className="img_logo">
										<img src={hospitalData.logo||img_logo} alt=""/>
									</div>
									<h4 style={{paddingTop:'15px'}}>Logo bệnh viện</h4>
								</Col>
								<Col span={14} style={{textAlign:'center'}}>
									<div className="img_background">
										<img src={hospitalData.background||img_background} alt=""/>
									</div>
									<h4 style={{paddingTop:'15px'}}>Background bệnh viện</h4>
								</Col>
							</Row>
						</Card>
						<Card className="card_detail_info" >
							{hospitalData && <Row gutter={[20,20]}>
								<Col sm={{span:24}} md={{span:10}}>
									<h4>Thông tin chi tiết:</h4>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Tên bệnh viện</div>
										<div className="col-sm-8">{hospitalData.name}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Số điện thoại:</div>
										<div className="col-sm-8">{hospitalData.phone}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Email:</div>
										<div className="col-sm-8">{hospitalData.email}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Địa chỉ:</div>
										<div className="col-sm-8">{hospitalData.address}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Loại hợp đồng:</div>
										<div className="col-sm-8">{hospitalData.contractType}</div>
									</div>
									<div className="row">
										<div className="col-sm-4 text-muted text-sm-right mb-0 mb-sm-3">Quy mô cơ sở y tế:</div>
										<div className="col-sm-8">{hospitalData.scale}</div>
									</div>
								</Col>
								<Col sm={{span:24}} md={{span:14}}>
									<h4>Giới thiệu:</h4>
									<ReactQuill 
                                        theme="bubble"
                                        value={`${hospitalData.about}`}
                                        readOnly={true}
                                    />
								</Col>
								<UpdateHospital
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
									initData={initData}
									updateHospitalInfo={updateHospitalInfo}
								/>
							</Row>}
						</Card>
					</div>

                </div>
            </div>

        </>
    )
}

export default HospitalInfo
