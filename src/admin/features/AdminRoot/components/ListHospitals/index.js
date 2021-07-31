import { Badge, Button, Card, Modal, Table, Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import adminAPI from '../../../../../api/adminAPI'
import LoadingTop from '../../../../components/loadingTop'
import SidebarNav from '../../../../components/SideBar'
import UpdateHospital from '../../../AdminHospital/components/UpdateHospital';

const ListHospitals = () => {
    const [loadingPage, setLoadingPage] = useState(true);
    const [listHospitals, setListHospitals] = useState([]);
    const [currentHospital, setCurrentHospital] = useState({});

    const [modalData, setModalData] = useState({
      visible: false,
      data: {},
    })




    useEffect(()=> {
      getListHospital();
    },[])

    const getListHospital = async () => {
      setLoadingPage(true);
      try {
        const response = await adminAPI.get_list_hospitals();
        console.log('response getListHospital:>> ', response);
        if(response.error) throw new Error("Error");
        setListHospitals(response.data.data);
        setLoadingPage(false);
      } catch (error) {
        setLoadingPage(false);
        console.log('error :>> ', error);
      }
    }

    const getInfoHospital = async (data) => {
      setLoadingPage(true);
      try {
        const response = await adminAPI.get_hospital_info(data._id);
        console.log(`response getInfoHospital`, response);
        if(response.error) throw new Error("error");
        setCurrentHospital(response.data);
        setModalData({...modalData, visible:true})
        setLoadingPage(false);
      } catch (error) {
        console.log('error :>> ', error);
        setLoadingPage(false);
      }
    }

    const updateHospitalInfo = async (data) => {
      console.log('data updateHospitalInfo:>> ', data);
    }

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
            const renderTag = text?<Tag color="green">Đang hoạt động</Tag>:<Tag>Ngừng hoạt động</Tag>
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
        // {
        //   title: 'Sự kiện',
        //   key: 'id',
        //   render: (text, record) => {
        //     return (
        //       <div>
        //           <Button 
        //             type="primary" 
        //             style={{marginRight:"15px"}}
        //             onClick={() => getInfoHospital(record)}
        //           >
        //             Cập nhật
        //           </Button>
        //       </div>
        //     )
        //     }, 
        //   fixed: 'right',
        //   width: 170,
        // },
      ]
   
    return (
        <>
          {loadingPage && <LoadingTop/>}
          <SidebarNav/>
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                      <div className="col-sm-7 col-auto">
                        <h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bệnh viện <Badge count={listHospitals.length} style={{ backgroundColor: '#52c41a' }} /></h3>
                      </div>
                      <div className="col-sm-5 col">
                        <Link className="btn btn-primary float-right mt-2" to="/admin/root/benh-vien/them-benh-vien">Tạo mới bệnh viện</Link>
                      </div>
                    </div>
                </div>
                <Card>
                    <Table
                      bordered={true}
                      scroll={{ y: 450, x: 2000 }}
                      loading={loadingPage}
                      columns={columns}
                      pagination={false}
                      dataSource={listHospitals} 
                    />
                </Card>
                <UpdateHospital
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
									initData={currentHospital}
									updateHospitalInfo={updateHospitalInfo}
								/>
            </div>
          </div>
        </>
    )
}
export default ListHospitals
