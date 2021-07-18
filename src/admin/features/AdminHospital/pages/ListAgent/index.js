import { Card } from '@material-ui/core'
import { Badge, Button, Table, Tag } from 'antd'
import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar'
import AddEmployee from '../../components/Modal/AddEmployee';
import adminAPI from '../../../../../api/adminAPI';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingTop from '../../../../components/loadingTop';
import CreateAgent from '../../components/CreateAgent';

const ListAgent = () => {
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);

	// create agent
	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
	useEffect(()=> {
		setLoadingPage(true);
		getListAgent();
	},[])
	const getListAgent = async () => {
		try {
			const response = await adminAPI.get_agents_of_hospital(hospitalInfo.id);
			console.log('response get_agents_of_hospital:>> ', response);
			if(response.error) throw new Error(response.errors[0].message);
			const data = response.data;
			const _data = data.map(item=>{
				const _item = {
					name: item.fullName,
					id: item._id,
					phone: item.phone,
					email: item.email,
					sex: item.sex==="male"?"Nam":"Nữ"
				}
				return _item;
			})
			setListEmployees(_data);
			setTimeout(() => {
				setLoadingPage(false);
			}, 300);
		} catch (error) {
			console.log(`error.message`, error.message);
			setLoadingPage(false);
		}
	}

	
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
			title:'Email',
			dataIndex: 'email',
			key:'email'
		},
        {
          title: 'Số điện thoại',
		  dataIndex: 'phone',
		  key:'phone'
        },
        {
          title: 'Giới tính',
		  dataIndex: 'sex',
		  key:'sex'
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
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách nhân viên</h3>
							</div>
							<div className="col-sm-5 col">
								{/* <Link className="btn btn-primary float-right mt-2" to="/admin/hospital/nhan-vien/them">Thêm bác sĩ</Link> */}
								<Link 
									onClick={()=>
										setModalData({
										...modalData,
											visible: true,
									})}  
									className="btn btn-primary float-right mt-2"
								>
									Thêm nhân viên
								</Link>
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
					<CreateAgent
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
						loadingCreate={(data)=>
							setLoadingPage(data)
						}
					/>
                </div>
				
            </div>

        </>
    )
}

export default ListAgent
