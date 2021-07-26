import { Card, Input, Row, Select, Badge, Table, Tag } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import SidebarNav from '../../../../components/SideBar';
import moment from 'moment';

const ScheduleCancel = () => {
    const {enqueueSnackbar} = useSnackbar();
    const admin = useSelector(state=>state.admin);
    const hospitalInfo = admin.currentAdmin.hospital;

    const [loadingPage, setLoadingPage] = useState(true);

    const [listCancel, setListCancel] = useState([]);

    const [modalView, setModalView] = useState({
        visible: false,
        data: {}
    })

    useEffect(() => {
        getListCancelSchedule(hospitalInfo._id);
    },[])
    const new_columns = [
        {
          title: 'Tên bệnh nhân',
		  key:'name',
		  dataIndex:'name',
		  render: (text, record) => (
                <div>
                    <i className='fa fa-user' style={{fontSize:'20px', marginRight:'10px'}}></i>
                    <span>{text}</span>
                </div>
		    ),
		},
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key:'sex'
        },
		{
			title:'Số điện thoại',
			dataIndex: 'phone',
			key:'phone'
		},
        {
          title: 'Tên bác sĩ',
		  dataIndex: 'doctorName',
		  key:'doctorName'
        },
        {
            title: 'Ngày khám',
            dataIndex: 'date',
            key:'date'
          },
          {
            title: 'Giờ khám',
            dataIndex: 'time',
            key:'time'
          },
        {
            title: 'Người hủy lịch',
            dataIndex: 'cancel_by',
            key:'cancel_by'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key:'status',
            render: (text, record) => (
                <Tag color={text==="Đã tư vấn"?"blue":"red"}>{text}</Tag>
            )
        },
        {
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <a href="#0" className="btn btn-sm bg-success-light" onClick={()=>{}}><i className="fa fa-pencil-alt" style={{paddingRight:'5px'}}></i>Xác nhận tư vấn</a>
                
                </div>
            ),
            },	
       
      ]
    const getListCancelSchedule = async (id) => {
        try {
            const response = await adminAPI.get_list_schedule_cancel(id);
            if(response.error) throw new Error('Khong the lay danh sach lich bi huy');
            console.log('response :>> ', response);
            const _list = response.data.map(item=>{
                const obj = {
                    name: item.patientInfo.name,
                    phone: item.patientInfo.phone,
                    sex: item.patientInfo.gender==="male"?"Nam":"Nữ",
                    doctorName: item.appointmentInfo.doctorName,
                    date: moment(item.appointmentInfo.date).format('DD/MM/YYYY'),
                    time: item.appointmentInfo.time,
                    cancel_by: item.cancel_by_doctor?'Bác sĩ': 'Bệnh nhân',
                    status: item.agent_resolve?'Đã tư vấn':'Chưa tư vấn'
                }
                return obj
            })
            setListCancel(_list);
            setLoadingPage(false);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }


  
    return (
        <>
            {loadingPage && <LoadingTop/>}
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bệnh nhân cần hỗ trợ</h3>
							</div>
						</div>
					</div>
                    
					<Row gutter={[36,36]}>
        
					</Row>
                    {/* table */}
					<Card 
						title={<>Danh sách lịch bị hủy <Badge count={listCancel.length} style={{ backgroundColor: '#52c41a' }} /></>}
					>
						<Table
							bordered={true}
							columns={new_columns}
							dataSource={listCancel} 
							loading={loadingPage}
							pagination={{position:["bottomCenter"]}}
						/>
					</Card>
					
                </div>
            </div>

        </>
    )
}

export default ScheduleCancel
