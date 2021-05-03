import { Badge, Button, Card, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_list_hospitals } from '../../../../redux/actions/adminActions'
import SidebarNav from '../../sidebar'
const HospitalsList = () => {
    const dispatch = useDispatch()
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    useEffect(()=> {
      dispatch(get_list_hospitals())
    },[])

    const columns = [
        {
          title: 'Tên bệnh viện',
          dataIndex: 'name',
          fixed: 'left',
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          render: (text) => {
            return (
              <p>{text.number.toString() +' '+ text.street+' '+text.ward+' '+text.district+' '+text.city}</p>
            )
            }, 
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Loại hợp đồng',
          dataIndex: 'contractType',
        },
        {
          title: 'Quy mô BV',
          dataIndex: 'scale',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'status',
          fixed: 'right',
          width: 150,
        },
        {
          title: 'Sự kiện',
          key: 'id',
          render: () => {
            return (
              <div>
                <a href={`#/restaurants/edit/{partner.id}`}>
                  <Button type="primary" style={{marginRight:"15px"}}>Sửa</Button>
                </a>
              </div>
            )
            }, 
          fixed: 'right',
          width: 170,
        },
      ]

    const data = [
      {
        name:'Bệnh viện Quận Thủ Đức',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dùng thử',
        Size:'Loại A',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 5',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng ngắn hạn',
        Size:'Loại B',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 10',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dài hạn',
        Size:'Loại C',
        status: 'Dừng hoạt động',
      },
      {
        name:'Bệnh viện Quận Thủ Đức',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dùng thử',
        Size:'Loại A',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 5',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng ngắn hạn',
        Size:'Loại B',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 10',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dài hạn',
        Size:'Loại C',
        status: 'Dừng hoạt động',
      },
      {
        name:'Bệnh viện Quận Thủ Đức',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dùng thử',
        Size:'Loại A',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 5',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng ngắn hạn',
        Size:'Loại B',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 10',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dài hạn',
        Size:'Loại C',
        status: 'Dừng hoạt động',
      },
      {
        name:'Bệnh viện Quận Thủ Đức',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dùng thử',
        Size:'Loại A',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 5',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng ngắn hạn',
        Size:'Loại B',
        status: 'Đang hoạt động',
      },
      {
        name:'Bệnh viện Quận 10',
        address:'54/17 đường số 7, Linh Trung, Thủ Đức, TP. Hồ Chí Minh',
        phone_number:'097558249',
        email:'thuanquang23009@gmail.com',
        contractType:'Hợp đồng dài hạn',
        Size:'Loại C',
        status: 'Dừng hoạt động',
      },
    ]
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showCreateHos = () => {
      setIsModalVisible(true)
    }
    const handleOk = () => {
      setIsModalVisible(false);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return (
        <>
          <SidebarNav/>
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-7 col-auto">
                            <h3 className="page-title">Danh sách bệnh viện</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Danh sách bệnh viện</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Card 
                    title={<>Danh sách bệnh viện <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
                    extra={
                    <a href="/admin/cosoyte/them-bv">
                        <Button type="primary">Tạo mới bệnh viện</Button>
                    </a>
                    }>
                    <Table
                    bordered={true}
                    scroll={{ y: 450, x: 2000 }}
                    // loading={loading}
                    columns={columns}
                    pagination={false}
                    dataSource={list_hospitals} 
                    />
                    <br />
                    <div className="d-flex flex-row-reverse">
                    {/* {renderPaginate()} */}
                    </div>
                    <br />
                </Card>
            </div>
          </div>
          <Modal title="Tạo mới bệnh viện" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </>
    )
}
export default HospitalsList
