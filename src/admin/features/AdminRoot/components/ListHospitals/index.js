import { Badge, Button, Card, Modal, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { get_list_hospitals } from '../../../../../redux/actions/adminActions'
import SidebarNav from '../../../../components/SideBar'
import moment from 'moment'

const ListHospitals = () => {
    const dispatch = useDispatch()
    const list_hospitals = useSelector(state=>state.admin.list_hospital);
    console.log('list_hospitals :>> ', list_hospitals);
    const [listHospitals, setListHospitals] = useState([]);
    useEffect(()=> {
      dispatch(get_list_hospitals())
    },[])
    useEffect(()=> {
      if(list_hospitals && !list_hospitals?.isNull){
        const list_bv = list_hospitals.data;
        setListHospitals(list_bv);
      }
    },[list_hospitals])

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
            console.log('text :>> ', text);
            return (
              <p>{text}</p>
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
          render: (text) => {
            const renderTag = text?<Tag>Đang hoạt động</Tag>:<Tag>Ngừng hoạt động</Tag>
            return (
              <p>{renderTag}</p>
            )
          }, 
        },
        {
          title: 'Thời hạn hợp đồng',
          dataIndex: 'dateEnd',
          render: (text) => {
            return (
              <p>{moment(text).format("DD/MM/YYYY")}</p>
            )
            }, 
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
                <a href={`#/restaurants/edit/{partner.id}`}>
                  <Button type="danger" style={{marginRight:"15px"}}>Xóa</Button>
                </a>
              </div>
            )
            }, 
          fixed: 'right',
          width: 170,
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
                    <a href="/admin/root/benh-vien/them-benh-vien">
                        <Button type="primary">Tạo mới bệnh viện</Button>
                    </a>
                    }>
                    <Table
                    bordered={true}
                    scroll={{ y: 450, x: 2000 }}
                    // loading={loading}
                    columns={columns}
                    pagination={false}
                    dataSource={listHospitals} 
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
export default ListHospitals
