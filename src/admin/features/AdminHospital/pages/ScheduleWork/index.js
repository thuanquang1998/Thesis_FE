import { Badge, Button, Table, Tag, Card, Modal } from 'antd'
import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import AddEmployee from '../../components/Modal/AddEmployee';
import adminAPI from '../../../../../api/adminAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LoadingTop from '../../../../components/loadingTop';
import VisibilityIcon from '@material-ui/icons/Visibility';
import maleLogo from   '../../../../assets/img/male_logo.png';
import femaleLogo from '../../../../assets/img/female_logo.png';
import FilterDoctorAdmin from '../../components/FilterDoctorAdmin';


const ScheduleWork = () => {
	const history = useHistory();
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);

	const [filter, setFilter] = useState({
		searchName: "",
		searchSpec: "",
	})
	const [modalAdd, setModalAdd] = useState(false);
	useEffect(()=> {
		const {searchName, searchSpec} = filter;
		
		(async ()=>{
			try {
				const response = await adminAPI.get_doctors_of_hospital(hospitalInfo.id);
				if(response.error) throw new Error(response.errors[0].message);
				const {data} = response.data;
				const _data = data.map(item=>{
					console.log('item :>> ', item);
					const _item = {
						name: item.fullName,
						specialization: item.spec_detail.name,
						spec_id: item.spec_detail._id,
						id: item._id,
						phone: item.phone,
						email: item.email,
						typeAccount: 'Bác sĩ',
						sex: item.sex,
					}
					return _item;
				})
				// filterData
				const filterName = _data.filter(item=>{
					const _search = searchName||"";
					const checkName = item.name.toLowerCase().includes(_search.toLowerCase());
					return checkName;
				})
				const filterSpec = filterName.filter(item=>{
					const checkName = item.spec_id.toLowerCase().includes(searchSpec.toLowerCase());
					return checkName;
				})
				// const data
				setListEmployees(filterSpec)
			} catch (error) {
				console.log(`error.message`, error.message)
			}
			setTimeout(() => {
				setLoadingPage(false);
			}, 300);
		})();
		
	},[filter])
	const filterData = (list, filter) => {
		const _list = [...list];
		const filterName = _list.name.toLowerCase().includes()
	}

	const handleViewSchedule = (record) => {
		console.log('record :>> ', record);
		// send list doctor Array<Object>: Object:{name, id} => select
		const listDoctor = {
			data: [...listEmployees]
		}
		history.push({
			pathname: `/admin/hospital/lich-lam-viec/${record.id}`,
			state: {
				data: {...record.fullData},
				listDoctor: [...listEmployees]
			}
		})
	}
	const new_columns = [
        {
			title: 'Tên nhân viên',
			key:'name1',
			dataIndex:'name',
			render: (text, record) => (
				<div>
					{record.sex==="male"?
						<div style={{width:'25px', height:"25px", float: 'left'}}>
							<img src={maleLogo} alt="male" style={{width:'100%', height:'100%'}}/>
						</div>:
						<div style={{width:'25px', height:"25px", float: 'left'}}>
							<img src={femaleLogo} alt="female" style={{width:'100%', height:'100%'}}/>
						</div>
					}
					{/* <i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i> */}
					<span style={{fontWeight:"500", marginLeft:"10px"}}>{text}</span>
				</div>
			),
          	fixed: 'left',
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'specialization',
			key:'specialization1'
		},
        {
          title: 'Số điện thoại',
		  dataIndex: 'phone',
		  key:'phone1'
        },
        {
          title: 'Email',
		  dataIndex: 'email',
		  key:'email1'
        },
        {
          title: 'Lịch làm việc',
          key: 'id1',
          render: (text, record) => (
			<div className="actions">
				<Button className="btn btn-sm bg-success-light" onClick={()=>handleViewSchedule(record)}><VisibilityIcon/>Xem</Button>
			</div>
		),
          fixed: 'right',
          width: 170,
        },
    ]
	const handleSearchName  = (data) => {
		setFilter({...filter, searchName: data});
		setLoadingPage(true);
	}
	const handleSearchSpec  = (data) => {
		setFilter({...filter, searchSpec: data});
		setLoadingPage(true);
	}
    return (
        <>
            <SidebarNav/>
			{loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-7 col-auto">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách lịch làm việc</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Danh sách lịch làm việc</li>
								</ul>
							</div>
							<div className="col-sm-5 col">
								{/* <Link className="btn btn-primary float-right mt-2" to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link> */}
						    </div>
						</div>
					</div>
					<Card>
						<FilterDoctorAdmin
							onSearchName={handleSearchName}
							onSearchSpec={handleSearchSpec}
						/>
						<Table
							bordered={true}
							columns={new_columns}
							dataSource={listEmployees} 
							loading={loadingPage}
							rowKey="name"
							pagination={{position:["bottomCenter"]}}
						/>
					</Card>

					<Modal 
						title="Basic Modal" 
						visible={modalAdd} 
						onCancel={()=>{
							setModalAdd(false);
							
						}}
						footer={null}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Modal>
                </div>
				
            </div>

        </>
    )
}

export default ScheduleWork
