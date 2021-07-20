import { Card } from '@material-ui/core'
import { Badge, Button, Table, Tag } from 'antd'
import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import AddEmployee from '../../components/Modal/AddEmployee';
import adminAPI from '../../../../../api/adminAPI';
import doctorAPI from '../../../../../api/doctorAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingTop from '../../../../components/loadingTop';
import UpdateProfileDoctor from '../../../../../doctor/features/DoctorProfileManage/UpdateProfileDoctor';
import moment from 'moment';

const DoctorHospital = () => {
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);

	// update Doctor
	// const [doctorData, setDoctorData ] = useState({});
    const [initData, setInitData] = useState({
        about: "",
    });
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
	const [about, setAbout] = useState("");
	useEffect(()=> {
		(async ()=>{
			try {
				const response = await adminAPI.get_doctors_of_hospital(hospitalInfo.id);
				if(response.error) throw new Error(response.errors[0].message);
				const {data} = response.data;
				const _data = data.map(item=>{
					const _item = {
						name: item.fullName,
						specialization: item.spec_detail.name,
						id: item._id,
						phone: item.phone,
						email: item.email,
						typeAccount: 'Bác sĩ'
					}
					return _item;
				})
				
				setListEmployees(_data)
			} catch (error) {
				console.log(`error.message`, error.message)
			}
			setTimeout(() => {
				setLoadingPage(false);
			}, 300);
		})();
		
	},[])


	const handleUpdateDoctor = async (record) => {
		setLoadingPage(true)
		try {
            const response = await doctorAPI.get_doctors_by_id(record.id);
            if(response.error) throw new Error("error getDoctorById");
            const _data = response.data.data[0];
            // setDoctorData({..._data});
            const birthday = moment(_data.birthday);
            const obj = {
                fullName: _data.fullName,
                email: _data.email,
                phone: _data.phone,
                gender: _data.sex,
                title: _data.title,
                about: _data.about,
                birthday: birthday,
            }
            setInitData({...initData,...obj});
			setTimeout(() => {
				setModalData({...modalData, visible:true})
			},300)

        } catch (error) {
            console.log('error getDoctorById:>> ', error);
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 300);

	}

	// const handleUpdateProfile = (dataSubmit) => {
    //     setLoadingPage(true);
    //     updateDoctorProfileApi(dataSubmit);
    // }
    // const updateDoctorProfileApi = async (data) => {
    //     try {
    //         const response = await doctorAPI.update_doctor_info({data,id:doctorId});
    //         if(response.error) throw new Error("error updateDoctor");
    //         enqueueSnackbar('Cập nhật thành công.', {variant: 'success'});
    //         getDoctorById(doctorId);
    //         setTimeout(() => {
    //             setLoadingPage(false);
    //             setModalData({
    //                 ...modalData, 
    //                 visible:false, 
    //             })
    //         },400)
    //     } catch (error) {
    //         console.log('error :>> ', error);
    //         enqueueSnackbar('Cập nhật không thành công', {variant: 'error'});
    //         setLoadingPage(false);
    //     }
    // }
	const new_columns = [
        {
          title: 'Tên bác sĩ',
		  key:'name',
		  dataIndex:'name',
		  render: (text, record) => (
			<div>
				<i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i>
				<span>{text}</span>
			</div>
		),
          fixed: 'left',
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'specialization',
			key:'specialization'
		},
        {
          title: 'Số điện thoại',
		  dataIndex: 'phone',
		  key:'phone'
        },
        {
          title: 'Email',
		  dataIndex: 'email',
		  key:'email'
        },
        {
          title: 'Sự kiện',
          key: 'id',
          render: (text, record) => (
			<div className="actions">
				<a href="#0" 
					className="btn btn-sm bg-success-light" 
					onClick={()=>handleUpdateDoctor(record)}
				>
				<i className="fa fa-pencil-alt"></i>Cập nhật</a>
			</div>
		),
          fixed: 'right',
          width: 170,
        },
      ]
	  console.log('initData 1111:>> ', initData);
    return (
        <>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-7 col-auto">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bác sĩ</h3>
							</div>
							<div className="col-sm-5 col">
								<Link className="btn btn-primary float-right mt-2" to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link>
							</div>
						</div>
					</div>
                    
                    <Card 
						title={<>Danh sách nhân viên <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
					>
						<Table
							bordered={true}
							columns={new_columns}
							dataSource={listEmployees} 
							loading={loadingPage}
							pagination={{position:["bottomCenter"]}}
						/>
					</Card>
					<UpdateProfileDoctor
						modalData={modalData}
						initData = {initData}
						// handleOk={()=>{
						// 	setModalData({
						// 		...modalData,
						// 		visible: !modalData.visible,
						// 	})
						// }}
						handleClose={()=>{

							setInitData({});
							setModalData({
								...modalData,
								visible: !modalData.visible,
							})
							
						}}
						handleUpdateProfile={()=>{}}
						onChangeAbout={(data)=>setInitData({...initData, about:data})}
					/>
                </div>
				
            </div>

        </>
    )
}

export default DoctorHospital
