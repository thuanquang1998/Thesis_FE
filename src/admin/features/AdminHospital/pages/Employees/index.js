import { Card } from '@material-ui/core'
import { Badge, Button, Table, Tag } from 'antd'
import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import AddEmployee from '../../components/Modal/AddEmployee';
import adminAPI from '../../../../../api/adminAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Employees = () => {
	const dispatch = useDispatch();
	const admin = useSelector(state=> state.admin);
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [isAddEmployee, setIsAddEmployee] = useState(false);

	const appState = useSelector(state=>state.app);
    const {loadingData, listAllSpecials, listAllHospitals} = appState;

	useEffect(() => {
		if(loadingData===0 && listAllSpecials.length !==0 && listAllHospitals.length !==0){
			console.log('listAllSpecials :>> ', listAllSpecials);
			console.log('listAllHospitals :>> ', listAllHospitals);
		}
	},[loadingData])
	useEffect(()=> {
		// (async ()=>{
		// 	try {
		// 		const response = await adminAPI.get_doctors_of_hospital(hospitalInfo.id);
		// 		// console.log('response Employees:>> ', response);
		// 	} catch (error) {
				
		// 	}
		// })();
		
	},[])


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
							<div className="col-sm-7 col-auto">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bác sĩ</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Danh sách bác sĩ</li>
								</ul>
							</div>
							<div className="col-sm-5 col">
							    {/* <a href="#0" className="btn btn-primary float-right mt-2" onClick={()=>setIsAddEmployee(true)}>
								    Thêm bác sĩ
                                </a> */}
								<Link to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link>
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
				<AddEmployee
					showModal={isAddEmployee}
					onCancel={()=>setIsAddEmployee(false)}
					onSubmit={()=>{}}
				/>
            </div>

        </>
    )
}

export default Employees
