import { Badge, Table, Card, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import SidebarNav from '../../../../components/SideBar';
import CreateAgent from '../../components/CreateAgent';
import { useSnackbar } from 'notistack';
import './style.css'
const { Search } = Input;

const ListAgent = () => {
	const hospitalInfo = JSON.parse(localStorage.getItem('currentAdmin')).hospital;
	const [loadingPage, setLoadingPage] = useState(true);
	const [listEmployees, setListEmployees] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

	// create agent
	const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
	const [searchName, setSearchName] = useState(null);
	useEffect(()=> {
		// setLoadingPage(true);
		getListAgent();
	},[searchName])
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
			let filterName = [];
			if(!searchName) {
				filterName = _data;
			} else {
				filterName = _data.filter(item=>{
					return item.name.toLowerCase().includes(searchName.toLowerCase())
				})
			}
			setListEmployees(filterName);
			setTimeout(() => {
				setLoadingPage(false);
			}, 300);
		} catch (error) {
			console.log(`error.message`, error.message);
			setLoadingPage(false);
		}
	}

	const onSearch = (value) => {
		setLoadingPage(true);
		setSearchName(value);
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
	const onCreateAgent = async (data) => {
		setLoadingPage(true)
		try {
            const response = await adminAPI.create_agent(data);
            if(response.error) throw new Error("error createAgentApi");
            enqueueSnackbar('Tạo nhân viên thành công', {variant: 'success'});
			setTimeout(() => {
				setModalData({
					...modalData,
					visible: false,
				})
				getListAgent();
				setLoadingPage(false)
			}, 300);
        } catch (error) {
            console.log('error :>> ', error);
			setTimeout(() => {
				enqueueSnackbar('Lỗi kết nối. Thử lại sau ít phút.', {variant: 'error'});
				setLoadingPage(false)
			}, 300);
        }
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
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách nhân viên <Badge count={listEmployees.length} style={{ backgroundColor: '#52c41a' }} /></h3>
							</div>
							<div className="col-sm-5 col">
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
                    
					<Card>
						<div className="search-input">
							<Search
								placeholder="Tìm theo tên nhân viên"
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
						createAgent={onCreateAgent}
						loadingPage={loadingPage}
					/>
                </div>
				
            </div>

        </>
    )
}

export default ListAgent
