import React, {useState, useEffect} from 'react';
import {Tabs, Input, Radio, Card, Table, Badge, Button} from 'antd';
import moment from 'moment';
const { TabPane } = Tabs;

function ScheduleOutDate(props) {
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
   
    // handle outdate schedule
    useEffect(()=> {
        const listData = [...props.data];
        const listUncheck = listData.filter(item=>item.status==="uncheck");
        const listOutDate = listUncheck.filter(item=> {
             // handle time
            const dateFormat = convertDateStringtoDate(item.date);
            const currentDate = new Date();
            const compareDate = moment(currentDate).isAfter(dateFormat);
            return compareDate
        })
        setListSchedule(listOutDate);
        setLoadingSchedule(false);
    },[props.data])
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
                    <Button onClick={()=>console.log(record.id)} type="primary" style={{marginRight:"5px"}}>
                        Xem lịch
                    </Button>
                </div>
            ),
		},		
	]
    return (
        <div>
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh sách lịch khám:</h4>
                <Input placeholder="Tìm kiếm" />
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
        </div>
    );
}

export default ScheduleOutDate;