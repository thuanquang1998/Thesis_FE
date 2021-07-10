import React from 'react';
import {Table, Button, Badge} from 'antd';

function ScheduleOutDate(props) {
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
			title: 'Tên bác sĩ',
            dataIndex: 'doctor',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title:'Chuyên khoa',
			dataIndex: 'speciality',
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
			title:'Trạng thái',
			dataIndex:'status',
            render: (text, record) => (
                <Badge style={{ backgroundColor: '#52c41a' }}>{record.status?'Chưa khám':'Đã khám'}</Badge>
            )
		},
		{
            title: 'Sự kiện',
            render: (text, record) => (
                <div className="actions">
                    <Button onClick={()=>console.log(record.id)} type="primary" style={{marginRight:"5px"}}>
                        Đổi lịch
                    </Button>
                    <Button onClick={()=>{}} type="danger">
                        Hủy lịch
                    </Button>
                </div>
            ),
		},		
	]
    return (
        <div>
            <Table className="table-striped"
                columns={columns}                 
                dataSource={props.data}
                ascend={true}
                style = {{overflowX : 'auto'}}
                rowKey={record => record.id}
                showSizeChanger={true} 
                // loading={loadingPage}
            />
        </div>
    );
}

export default ScheduleOutDate;