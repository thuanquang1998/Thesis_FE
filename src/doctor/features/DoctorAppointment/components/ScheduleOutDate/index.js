import { Badge, Button, Card, Input, Table, Tag, Menu, Dropdown } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ModalSchedule from '../ModalSchedule';
import ScheduleSearch from '../ScheduleSearch';
import {Link} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

function ScheduleOutDate(props) {
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })

    const [searchName, setSearchName] = useState(null);

    useEffect(()=> {
        const listData = [...props.data];
        const listUncheck = listData.filter(item=>item.status==="uncheck");
        const listOutDate = listUncheck.filter(item=> {
            const dateFormat = convertDateStringtoDate(item.date);
            const currentDate = moment();
            console.log('date :>> ', dateFormat,"      ", currentDate);
            
            const compareDate = moment(currentDate).isAfter(dateFormat);
            console.log('compareDate :>> ', compareDate);
          
            return compareDate
        })
        let _result = [];
        if(!searchName) {
            _result=[...listOutDate];
        } else {
            _result = listOutDate.filter(item=> {
                return item.patient.toLowerCase().includes(searchName.toLowerCase());
            })
        }
        setListSchedule(_result);
        setTimeout(() => {
            setLoadingSchedule(false);
        }, 300);
    },[props.data, searchName])
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
                const menuChecked = (
                    <Menu>
                      <Menu.Item key="0">
                        <Link 
                            className="btn btn-sm bg-info-light"
                            onClick={()=>{
                                const data = record.fullData;
                                setModalData({
                                    ...modalData,
                                    visible: true,
                                    data: {...data}
                                })
                            }} 
                            >
                            <i className="far fa-eye"></i> Xem lịch
                        </Link>
                      </Menu.Item>
                    </Menu>
                  );
                return (
                    <Dropdown overlay={menuChecked} trigger={['click']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Sự kiện <DownOutlined />
                        </a>
                    </Dropdown>
                )
            }
                
            // ),
		},		
	]
    const handleSearchName = (data) => {
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

export default ScheduleOutDate;