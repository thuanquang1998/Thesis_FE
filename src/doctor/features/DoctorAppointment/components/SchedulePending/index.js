import { Badge, Button, Card, Input, Table, Tabs, Tag, Menu, Dropdown } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ModalSchedule from '../ModalSchedule';
import ScheduleSearch from '../ScheduleSearch';
import {Link} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


function SchedulePending(props) {
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const history = useHistory();

    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
    const [searchName, setSearchName] = useState(null);

    // handle outdate schedule
    useEffect(()=> {
        const listData = [...props.data];
        const listChecking = listData.filter(item=>item.status==="checking");
        let _result = [];
        if(!searchName) {
            _result=[...listChecking];
        } else {
            _result = listChecking.filter(item=> {
                return item.patient.toLowerCase().includes(searchName.toLowerCase());
            })
        }
        setTimeout(() => {
            setLoadingSchedule(false);
            setListSchedule(_result);
        }, 400);
    },[props.data,searchName]);

    const convertDateStringtoDate = (dateStr) => {
        const dateMomentObject = moment(dateStr, "DD/MM/YYYY");
        const dateObject = dateMomentObject.toDate();
        return dateObject
    }
   
    const renderStatus = (status) => {
        let str = "";
        let color = "";
        switch (status) {
            case 'uncheck':
                str = 'Chưa khám';
                color = "red"
                break;
            case 'checking':
                str = 'Đang xử lí'
                color = "green"
                break;
            case 'checked':
                str = 'Đã khám';
                color = "blue"
                break;
            default:
                str = 'Chưa khám'
                color = "red"
                break;
        }
        return <Tag style={{fontSize:"13px"}} color={`${color}`}>{str}</Tag>
    }
    const columns = [
        {
			title: 'Bệnh nhân',
            dataIndex: 'patient',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
        {
			title:'Ngày khám',
			dataIndex:'date',
		},
        {
			title:'Giờ khám',
			dataIndex:'time',
		},
        {
            title:'Phòng khám',
            dataIndex: 'room'
        },
        {
			title:'Trạng thái',
			dataIndex:'status',
            render: (text, record) => {
                const data = renderStatus(record.status);
                return data
            }
		},
		{
            title: 'Sự kiện',
            render: (text, record) => {

                const menuChecking = (
                    <Menu>
                        <Menu.Item key="0">
                            <Button 
                                style={{width:"100%"}}
                                className="btn btn-sm bg-info-light"
                                onClick={()=>props.onViewSchedule(record.id)}
                            >
                                <i className="far fa-eye"></i> Xem lịch
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="0">
                            <Button 
                                style={{width:"100%"}}
                                className="btn btn-sm bg-success-light"
                                onClick={()=>{
                                    const data = record.fullData;
                                    history.push({
                                        pathname: `/bac-si/lich-kham/${data._id}`,
                                        state: {
                                            data: {...data},
                                        }
                                    })
                                }} 
                            >
                                <i className="far fa-eye"></i> Khám bệnh
                            </Button>
                        </Menu.Item>
                    </Menu>)
                return (
                    <Dropdown overlay={menuChecking} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Sự kiện <DownOutlined />
                        </a>
                    </Dropdown>
                )
            },
		},		
	]
   
    const handleSearchName = (data) => {
        setLoadingSchedule(true);
        setSearchName(data);
    }
    return (
        <div>
            <Card style={{borderRadius:"10px"}}>
                <ScheduleSearch
                    searchName={handleSearchName}
                />
                <Table className="table-striped"
                    columns={columns}                 
                    dataSource={listSchedule}
                    ascend={true}
                    style = {{overflowX : 'auto'}}
                    rowKey={record => record.id}
                    showSizeChanger={true} 
                    loading={loadingSchedule}
                    pagination={{position:["bottomCenter"]}}
                />
            </Card>
            <ModalSchedule
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
            />
        </div>
    );
}

export default SchedulePending;