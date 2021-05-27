import { Card } from '@material-ui/core'
import { Badge, Button, Table, Tag } from 'antd'
import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import AddEmployee from '../../components/Modal/AddEmployee';
import adminAPI from '../../../../../api/adminAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import LoadingTop from '../../../../components/loadingTop';
import VisibilityIcon from '@material-ui/icons/Visibility';

const ScheduleWork = () => {
	const history = useHistory();
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);

	useEffect(()=> {
		(async ()=>{
			try {
				const response = await adminAPI.get_doctors_of_hospital(hospitalInfo.id);
				if(response.error) throw new Error(response.errors[0].message);
				const data = response.data;
				const _data = data.map(item=>{
					const _item = {
						name: item.fullName,
						specialization: item.spec_detail[0].name,
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

	const handleViewSchedule = (record) => {
		console.log('record :>> ', record);
		// send list doctor Array<Object>: Object:{name, id} => select
		const listDoctor = {
			data: [...listEmployees]
		}
		history.push({
			pathname: `/admin/hospital/lich-lam-viec/${record.id}`,
			state: {
				data: {...record},
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
					<i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i>
					<span>{text}</span>
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
          title: 'Loại tài khoản',
		  dataIndex: 'typeAccount',
		  key:'typeAccount1', 
		  render: (text) => text==='Bác sĩ'?(<Tag color="green">{text}</Tag>):(<Tag color="purple">{text}</Tag>),
		//   sorter: (a, b) => 
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
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Danh sách bác sĩ</li>
								</ul>
							</div>
							<div className="col-sm-5 col">
								{/* <Link className="btn btn-primary float-right mt-2" to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link> */}
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
							rowKey="name"
						/>
						<br />
						<div className="d-flex flex-row-reverse">
						</div>
						<br />
					</Card>
                </div>
				
            </div>

        </>
    )
}

export default ScheduleWork
