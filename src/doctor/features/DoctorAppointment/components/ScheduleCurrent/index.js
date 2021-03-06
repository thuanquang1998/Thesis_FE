import React, {useState, useEffect} from 'react';
import {Tabs, Input, Radio, Card, Table, Badge, Button, Tag, Menu, Dropdown} from 'antd';
import moment from 'moment';
import ModalSchedule from '../ModalSchedule';
import ReExamination from '../ReExamination';
import { useHistory } from 'react-router-dom';
import ScheduleSearch from '../ScheduleSearch';
import {Link} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

function ScheduleCurrent(props) {
    const {status, changeStatus, viewSchedule} = props;
    const history = useHistory();
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const [filterSchedule, setFilterSchedule] = useState({
        search: "",
        status: 1,
        currentPage: 1,
    })
    const [searchName, setSearchName] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);


    // modal view schedule
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
    const [modalReExam, setModalReExam] = useState({
        visible: false,
        data: {},
    })


    const onChangeStatus = (e) => {
        setLoadingSchedule(true);
        setFilterSchedule({
            ...filterSchedule,
            status: e.target.value
        })
        changeStatus(e.target.value);
    };
    const handleSearchName = (data) => {
        setLoadingSchedule(true);
        setFilterSchedule({
            ...filterSchedule,
            search: data
        })
    }
    // handle coming schedule
    useEffect(()=> {
        const {search, status} = filterSchedule;
        const listData = [...props.data];
        // list Data in today
        const listScheduleCurrent = listData.filter(item=>{
            console.log('item.date :>> ', item.date);
            const dateFormat = convertDateStringtoDate(item.date);
            const timeString = moment(dateFormat).format('DD/MM/YYYY');
            const currentString = moment().format('DD/MM/YYYY');
            console.log('timeString :>> ', timeString, ' currentString :>> ', currentString);
            const check  = timeString===currentString;
            // const dateFormat = convertDateStringtoDate(item.date);
            // const currentDate = new Date();
            // const compareDate = moment(dateFormat).getTime()=moment(currentDate).getTime();
            return check
        })
        // filter Name
        const listScheduleSearch = listScheduleCurrent.filter(item=>{
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
        setTimeout(() => {
            setLoadingSchedule(false);
            setListSchedule(scheduleHandlerStatus);
        },400)
    },[props.data, filterSchedule])
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
                str = 'Ch??a kh??m';
                color = "red"
                break;
            case 'checking':
                str = '??ang x??? l??'
                color = "green"
                break;
            case 'checked':
                str = '???? kh??m';
                color = "blue"
                break;
            default:
                str = 'Ch??a kh??m'
                color = "red"
                break;
        }
        return <Tag style={{fontSize:"13px"}} color={`${color}`}>{str}</Tag>
    }
   
    const columns = [
        {
			title: 'B???nh nh??n',
            dataIndex: 'patient',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			// sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
        {
			title:'Ng??y kh??m',
			dataIndex:'date',
		},
        {
			title:'Gi??? kh??m',
			dataIndex:'time',
		},
        {
            title:'Ph??ng kh??m',
            dataIndex: 'room'
        },
        {
			title:'Tr???ng th??i',
			dataIndex:'status',
            render: (text, record) => {
                const data = renderStatus(record.status);
                return data
            }
		},
		{
            title: 'S??? ki???n',
            render: (text, record) => {
                const menuChecked = (
                    <Menu>
                      <Menu.Item key="0">
                        <Button 
                            style={{width:"100%"}}
                            className="btn btn-sm bg-info-light"
                            onClick={()=>{
                                const data = record;
                                setModalReExam({
                                    ...modalReExam,
                                    visible: true,
                                    data: {...data}
                                })
                            }} 
                        >
                            <i className="far fa-eye"></i> T??i kh??m
                        </Button>
                      </Menu.Item>
                    </Menu>
                  );
                const menuChecking = (
                <Menu>
                    <Menu.Item key="0">
                        <Button 
                            style={{width:"100%"}}
                            className="btn btn-sm bg-info-light"
                            onClick={()=>props.onViewSchedule(record.id)}
                        >
                            <i className="far fa-eye"></i> Xem l???ch
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
                            <i className="far fa-eye"></i> Kh??m b???nh
                        </Button>
                    </Menu.Item>
                </Menu>
                );
                
                return (<div className="actions">
                    {record.status==="checked"?
                        <Dropdown overlay={menuChecked} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            S??? ki???n <DownOutlined />
                            </a>
                        </Dropdown>
                        :
                        <Dropdown overlay={menuChecking} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            S??? ki???n <DownOutlined />
                            </a>
                        </Dropdown>
                        
                        // <>
                        //     <Button 
                        //         onClick={()=>props.onViewSchedule(record.id)}
                        //         type="primary" 
                        //         style={{marginRight:"5px"}}
                        //     >
                        //         Xem l???ch
                        //     </Button>
                        //     <Button 
                        //         onClick={()=>{
                        //             const data = record.fullData;
                        //             history.push({
                        //                 pathname: `/bac-si/lich-kham/${data._id}`,
                        //                 state: {
                        //                     data: {...data},
                        //                 }
                        //             })
                        //         }} 
                        //         type="primary" 
                        //         style={{marginRight:"5px"}}
                        //     >
                        //         Kh??m b???nh
                        //     </Button>
                        // </>
                    }
                </div>
            )},
		},		
	]

    
    return (
        <div>
            <Card style={{borderRadius:"10px"}}>
                <ScheduleSearch
                    searchName={handleSearchName}
                />
                <Radio.Group onChange={onChangeStatus} value={status}>
                    <Radio value={1}>T???t c???</Radio>
                    <Radio value={2}>Ch??a kh??m</Radio>
                    <Radio value={3}>??ang kh??m</Radio>  
                    <Radio value={4}>???? kh??m</Radio>
                </Radio.Group>
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
            <ReExamination
                modalData={modalReExam}
                handleOk={()=>{
                    setModalReExam({
                        ...modalReExam,
                        visible: !modalReExam.visible,
                    })
                }}
                handleClose={()=>{
                    setModalReExam({
                        ...modalReExam,
                        visible: !modalReExam.visible,
                    })
                }}
                reExamSuccess = {props.reExamSuccess}
            />
        </div>
    );
}

const checkStatus = (status) => {
    let str = "";
    switch (status) {
        case 'uncheck':
            str = 'Ch??a kh??m'
            break;
        case 'checking':
            str = '??ang x??? l??'
            break;
        case 'checked':
            str = '???? kh??m';
            break;
        default:
            str = 'Ch??a kh??m'
            break;
    }
    return str;
}

export default ScheduleCurrent;