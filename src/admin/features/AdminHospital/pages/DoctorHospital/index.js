import { Badge, Table, Card, Input } from 'antd';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminAPI from '../../../../../api/adminAPI';
import doctorAPI from '../../../../../api/doctorAPI';
import UpdateProfileDoctor from '../../../../../doctor/features/DoctorProfileManage/UpdateProfileDoctor';
import LoadingTop from '../../../../components/loadingTop';
import SidebarNav from '../../../../components/SideBar';
import './style.css'
const { Search } = Input;


const DoctorHospital = () => {
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);

    const { enqueueSnackbar} = useSnackbar();
	
    const [initData, setInitData] = useState({
        about: "",
    });
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
	const [currentDoctorId, setCurrentDoctorId] = useState(null);

	const [searchName, setSearchName] = useState(null);

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

				let filterName = [];
				if(!searchName) {
					filterName = _data;
				} else {
					filterName = _data.filter(item=>{
						return item.name.toLowerCase().includes(searchName.toLowerCase())
					})
				}
				
				setListEmployees(filterName)
			} catch (error) {
				console.log(`error.message`, error.message)
			}
			setTimeout(() => {
				setLoadingPage(false);
			}, 300);
		})();
	},[searchName])


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
				doctorId: _data._id,
                email: _data.email,
                phone: _data.phone,
                gender: _data.sex,
                title: _data.title,
                about: _data.about,
                birthday: birthday,
            }
			setCurrentDoctorId(obj.doctorId)
            setInitData({...obj});
			setTimeout(() => {
				setModalData({...modalData, visible:true, data: {...obj}})
			},300)

        } catch (error) {
            console.log('error getDoctorById:>> ', error);
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 300);

	}

	const handleUpdateProfile = (dataSubmit) => {
        setLoadingPage(true);
        updateDoctorProfileApi(dataSubmit);
    }
    const updateDoctorProfileApi = async (data) => {
        try {
            const response = await adminAPI.update_doctor_info_admin({data,id:currentDoctorId});
            if(response.error) throw new Error("error updateDoctor");
            enqueueSnackbar('Cập nhật thành công.', {variant: 'success'});
            setTimeout(() => {
                setLoadingPage(false);
                setModalData({
                    ...modalData, 
                    visible:false, 
                })
            },400)
        } catch (error) {
            console.log('error :>> ', error);
            enqueueSnackbar('Cập nhật không thành công', {variant: 'error'});
            setLoadingPage(false);
        }
    }

	const onSearch = (value) => {
		setLoadingPage(true);
		setSearchName(value);
	}

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
    return (
        <>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-7 col-auto">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bác sĩ <Badge count={listEmployees.length} style={{ backgroundColor: '#52c41a' }} /></h3>
							</div>
							<div className="col-sm-5 col">
								<Link className="btn btn-primary float-right mt-2" to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link>
							</div>
						</div>
					</div>
                    
					<Card>
						<div className="search-input">
							<Search
								placeholder="Tìm theo tên bác sĩ"
								allowClear
								enterButton="Tìm kiếm"
								size="large"
								onSearch={onSearch}
							/>
						</div>
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
						handleClose={()=>{
							setInitData({about: ""});
							setModalData({
								...modalData,
								visible: !modalData.visible,
							})
						}}
						handleUpdateProfile={handleUpdateProfile}
						onChangeAbout={(data)=>setInitData({...initData, about:data})}
					/>
                </div>
				
            </div>

        </>
    )
}

export default DoctorHospital
