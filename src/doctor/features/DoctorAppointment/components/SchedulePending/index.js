import { Badge, Button, Card, Input, Table, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ModalSchedule from '../ModalSchedule';

function SchedulePending(props) {
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
    const [filterSchedule, setFilterSchedule] = useState({
        search: "",
        status: 1,
        currentPage: 1,
    })
    // handle outdate schedule
    useEffect(()=> {
        const {search, status} = filterSchedule;
        const listData = [...props.data];
        const listUncheck = listData.filter(item=>item.status==="checking");
        const listScheduleSearch = listUncheck.filter(item=>{
            const name = item.patient.toUpperCase();
            const searchS = search.toUpperCase();
            return name.includes(searchS)
        });
        setListSchedule(listScheduleSearch);
        setLoadingSchedule(false);
    },[props.data,filterSchedule])
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
                <Badge style={{ backgroundColor: 'red' }}>{record.status==='uncheck'?'Quá hạn':'Chưa khám'}</Badge>
            )
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button 
                        onClick={()=>{
                            const data = record.fullData;
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
                </div>
            ),
		},		
	]
    const onChangeSearch = (e) => {
        setFilterSchedule({
            ...filterSchedule,
            search: e.target.value
        })
    }
    return (
        <div>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh sách lịch khám:</h4>
                <Input placeholder="Tìm kiếm" onChange={onChangeSearch} value={filterSchedule.search}/>
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

export default SchedulePending;