import React, {useState, useEffect} from 'react';
import {Tabs, Input, Radio, Card, Table, Badge, Button} from 'antd';
import moment from 'moment';
import ModalSchedule from '../ModalSchedule';
import { useHistory } from 'react-router-dom';

function ScheduleCurrent(props) {
    const history = useHistory();
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const [filterSchedule, setFilterSchedule] = useState({
        search: "",
        status: 1,
        currentPage: 1,
    })
    // modal view schedule
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })


    const onChangeStatus = (e) => {
        setFilterSchedule({
            ...filterSchedule,
            status: e.target.value
        })
    };
    const onChangeSearch = (e) => {
        setFilterSchedule({
            ...filterSchedule,
            search: e.target.value
        })
    }
    // handle coming schedule
    useEffect(()=> {
        const {search, status} = filterSchedule;
        const listData = [...props.data];
        // list Data in today
        // const listScheduleCurrent = listData.filter(item=>{
        //     const dateFormat = convertDateStringtoDate(item.date);
        //     const currentDate = new Date();
        //     const compareDate = moment(dateFormat).isAfter(currentDate);
        // })
        // filter Name
        const listScheduleSearch = listData.filter(item=>{
            const name = item.patient.toUpperCase();
            const searchS = search.toUpperCase();
            return name.includes(searchS)
        });
        // filter Status
        let scheduleHandlerStatus = [...listScheduleSearch];
        switch (status) {
            case 1:
                scheduleHandlerStatus = [...listScheduleSearch];
                break;
            case 2:
                scheduleHandlerStatus = scheduleHandlerStatus.filter(item=>item.status==='uncheck');
                break;
            case 3:
                scheduleHandlerStatus = scheduleHandlerStatus.filter(item=>item.status==='checking');
                break;
            case 4:
                scheduleHandlerStatus = scheduleHandlerStatus.filter(item=>item.status==='checked');
                break;
        
            default:
                scheduleHandlerStatus = [...listScheduleSearch];
                break;
        }
        setListSchedule(scheduleHandlerStatus);
        setLoadingSchedule(false);
    },[props.data, filterSchedule])
    const convertDateStringtoDate = (dateStr) => {
        const dateMomentObject = moment(dateStr, "DD/MM/YYYY");
        const dateObject = dateMomentObject.toDate();
        return dateObject
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
            render: (text, record) => (
                <Badge style={{ backgroundColor: 'red' }}>{checkStatus(record.status)}</Badge>
            )
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button 
                        onClick={()=>{
                            const data = record;
                            setModalData({
                                ...modalData,
                                visible: true,
                                data: {...data}
                            })
                        }} 
                        type="primary" 
                        style={{marginRight:"5px"}}
                    >
                        Xem lịch
                    </Button>
                    <Button 
                        onClick={()=>{
                            const data = record.fullData;
                            history.push({
                                pathname: `/bac-si/lich-lam-viec/${data._id}`,
                                state: {
                                    data: {...data},
                                }
                            })
                        }} 
                        type="primary" 
                        style={{marginRight:"5px"}}
                    >
                        Khám bệnh
                    </Button>
                </div>
            ),
		},		
	]
    console.log('listSchedule :>> ', listSchedule);
    return (
        <div>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh sách lịch khám:</h4>
                <Input placeholder="Tìm kiếm" onChange={onChangeSearch} value={filterSchedule.search}/>
                <Radio.Group onChange={onChangeStatus} value={filterSchedule.status}>
                    <Radio value={1}>Tất cả</Radio>
                    <Radio value={2}>Chưa khám</Radio>
                    <Radio value={3}>Đang khám</Radio>  
                    <Radio value={4}>Đã khám</Radio>
                </Radio.Group>
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
const checkStatus = (status) => {
    let str = "";
    switch (status) {
        case 'uncheck':
            str = 'Chưa khám'
            break;
        case 'checking':
            str = 'Đang xử lí'
            break;
        case 'checked':
            str = 'Đã khám';
            break;
        default:
            str = 'Chưa khám'
            break;
    }
    return str;
}

export default ScheduleCurrent;