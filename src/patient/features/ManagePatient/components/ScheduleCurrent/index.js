import React, {useState, useEffect} from 'react';
import {Tabs, Input, Radio, Card, Table, Badge, Button, Tag, Form, Select, Col, Row, DatePicker} from 'antd';
import moment from 'moment';
import ModalSchedule from '../../../../../doctor/features/DoctorAppointment/components/ModalSchedule';
// import ReExamination from '../ReExamination';
import ChangeSchedule from '../ChangeSchedule';
import { useHistory } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import doctorAPI from '../../../../../api/doctorAPI';
import ViewResultSchedule from '../ViewResultSchedule';
import LoadingTop from '../../../../components/loadingTop';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
const { Option } = Select;


function ScheduleCurrent(props) {
    const [form] = Form.useForm();
    const history = useHistory();
    const [listSchedule, setListSchedule] = useState([]);
    const [loadingSchedule, setLoadingSchedule] = useState(true);
    const [filterSchedule, setFilterSchedule] = useState({
        search: "",
        status: 1,
        currentPage: 1,
        dateRange:{},
    })
    // modal view schedule
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
    const [modalResult ,setModalResult] = useState({
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
        const {search, status, dateRange} = filterSchedule;
        const listData = [...props.data];
       
        // filter Status
        let scheduleHandlerStatus = [...listData];
        switch (status) {
            case 1:
                scheduleHandlerStatus = [...listData];
                break;
            case 2:
                const validDate = scheduleHandlerStatus.filter(item=>item.status==='uncheck');
                scheduleHandlerStatus = validDate.filter(item=>{
                    const currentDate = new Date();
                    const date = new Date(item.fullData.appointmentInfo.date);
                    date.setHours(23);
                    const compareDate1 = moment(date).isAfter(currentDate);
                    return compareDate1
                })
                break;
            case 3:
                scheduleHandlerStatus = scheduleHandlerStatus.filter(item=>item.status==='checking');
                break;
            case 4:
                scheduleHandlerStatus = scheduleHandlerStatus.filter(item=>item.status==='checked');
                break;
            case 5:
                const validDate1 = scheduleHandlerStatus.filter(item=>item.status==='uncheck');
                let _scheduleHandlerStatus = validDate1.filter(item=>{
                    const currentDate = new Date();
                    const date = new Date(item.fullData.appointmentInfo.date);
                    date.setHours(23);
                    const compareDate1 = moment(currentDate).isAfter(date);
                    // const compareDate1 = currentDate.getTime()-date.getTime();
                    const checkDate = compareDate1 > 0 ? true : false;
                    return compareDate1
                })
                scheduleHandlerStatus =  _scheduleHandlerStatus.map(item=>{
                    return {
                        ...item,
                        status: "outDate"
                    }
                })
                break;
            default:
                scheduleHandlerStatus = [...listData];
                break;
        }
        console.log('scheduleHandlerStatus :>> ', scheduleHandlerStatus);
        let filterScheduleDate = [];
        if(!dateRange.day1){
            filterScheduleDate = [...scheduleHandlerStatus];
        } else {
            filterScheduleDate = scheduleHandlerStatus.filter(item=>{
                const date = new Date(item.fullData.appointmentInfo.date)
                const compareDate1 = moment(date).isAfter(dateRange.day1);
                const compareDate2 = moment(dateRange.day2).isAfter(date);
                // console.log(`date`, date)
                // console.log('compareDate1 :>> ', compareDate1);
                const check = compareDate1 && compareDate2;
                return check
            })
            
        }
        
        setListSchedule(filterScheduleDate);
        setLoadingSchedule(false);
    },[props.data, filterSchedule])
    const convertDateStringtoDate = (dateStr) => {
        const dateMomentObject = moment(dateStr, "DD/MM/YYYY");
        const dateObject = dateMomentObject.toDate();
        return dateObject
    }
    const onFindDate = (data) => {
        setFilterSchedule({
            ...filterSchedule,
            dateRange: {...data}
        })
    }
    const renderStatus = (record) => {
        const status = record.status;
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
                str = 'Qu?? h???n'
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
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title: 'T??n b??c s??',
            dataIndex: 'doctor',
			render: (text, record) => (            
			  <div className="table-avatar">
				<span>{text}</span>
			  </div>
			), 
			sorter: (a, b) => a.specialities.length - b.specialities.length,
		},
		{
			title:'Ph??ng kh??m',
			dataIndex: 'room',
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
			title:'Tr???ng th??i',
			dataIndex:'status',
            render: (text, record) => {
                const data = renderStatus(record);
                return data
            }
		},
        {
            title: 'S??? ki???n',
            render: (text, record) => {
                const menuChecked = (
                    <Menu>
                      <Menu.Item key="0">
                        <Link 
                            className="btn btn-sm bg-info-light"
                                onClick={()=>onViewResult(record.id)} 
                            >
                            <i className="far fa-eye"></i> Xem k???t qu???
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="1">
                        <Link 
                            className="btn btn-sm bg-success-light"
                            onClick={()=> history.push(`/danh-sach-bac-si/${record.fullData.doctorId}`)}
                            style={{marginBottom:"2px"}}
                        >
                            <i class="fas fa-exchange-alt"></i> ????nh gi??
                        </Link>
                    </Menu.Item>
                    </Menu>
                  );
                 const menuOutDate = (
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
                                <i className="far fa-eye"></i> Xem l???ch
                            </Link>
                        </Menu.Item>
                    </Menu>
                  );
                const menuChecking = (
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
                            <i className="far fa-eye"></i> Xem l???ch
                        </Link>
                    </Menu.Item>
                </Menu>
                );
                const menuUnCheck = (
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
                            style={{marginBottom:"2px"}}
                        >
                            <i className="far fa-eye"></i> Xem l???ch
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link 
                            className="btn btn-sm bg-success-light"
                            onClick={()=>props.changeSchedule(record)}
                            style={{marginBottom:"2px"}}
                        >
                            <i class="fas fa-exchange-alt"></i> ?????i l???ch
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link 
                            className="btn btn-sm bg-danger-light"
                            onClick={()=>props.cancelSchedule(record)}
                        >
                            <i className="fas fa-times"></i> H???y l???ch
                        </Link>
                    </Menu.Item>
                </Menu>
                );
                return (
                    <div className="actions">
                    {record.status==="checked"?
                       <Dropdown overlay={menuChecked} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            S??? ki???n <DownOutlined />
                            </a>
                        </Dropdown>
                        :
                        record.status==="checking"?
                            <Dropdown overlay={menuChecking} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                S??? ki???n <DownOutlined />
                                </a>
                            </Dropdown>
                            :
                            record.status==="outDate"?
                            <Dropdown overlay={menuOutDate} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                S??? ki???n <DownOutlined />
                                </a>
                            </Dropdown>
                            :
                            <Dropdown overlay={menuUnCheck} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                S??? ki???n <DownOutlined />
                                </a>
                            </Dropdown>
                    }
                </div>
                )
            },
		},		
	]
    
    const onViewResult  = (id) => {
        setLoadingSchedule(true);
        getCheckedAppointment(id);
    }
    const getCheckedAppointment = async (id) => {
        try {
            const response = await doctorAPI.get_checked_appointment(id);
            if(response.error) throw new Error("error");
            // convert data schedule
            // const _data = {
            //     doctorName: response.data.appointmentInfo
            // }
            setTimeout(() => {
                setModalResult({
                    ...modalResult,
                    visible: true,
                    data: {...response.data}
                })
                setLoadingSchedule(false);
            }, 300);
            
        } catch (error) {
            console.log('error :>> ', error);
            setLoadingSchedule(false);
        }
    }
    return (
        <div>
            {loadingSchedule && <LoadingTop/>}
            <Card>
                <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Danh s??ch l???ch kh??m:</h4>
                <Form
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    onFinish={onFindDate}
                >   
                    <Row gutter={[8,8]} >
                        <Col xs={{span:24}} sm={{span:12}} md={{span:8}}>
                            <Form.Item name="day1" label="T??? ng??y:" className="search__form--item">
                                <DatePicker placeholder="Ch???n ng??y"/>
                            </Form.Item>
                        </Col>
                        <Col xs={{span:24}} sm={{span:12}} md={{span:8}}>
                            <Form.Item name="day2" label="?????n ng??y:" className="search__form--item">
                                <DatePicker placeholder="Ch???n ng??y"/>
                            </Form.Item>
                        </Col>
                        
                        <Col xs={{span:24}} sm={{span:12}} md={{span:6}} style={{display:"flex",flexDirection:"column", justifyContent:"flex-end", marginBottom:"5px"}}>
                            <Form.Item  className="search__form--item">
                                <Button type="primary" htmlType="submit">T??m ki???m</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                {/* <Input placeholder="T??m ki???m" onChange={onChangeSearch} value={filterSchedule.search}/> */}
                <Radio.Group onChange={onChangeStatus} value={filterSchedule.status} style={{marginTop:"10px", marginBottom:"10px"}}>
                    <Radio value={1}>T???t c???</Radio>
                    <Radio value={2}>Ch??a kh??m</Radio>
                    <Radio value={3}>??ang kh??m</Radio>  
                    <Radio value={4}>???? kh??m</Radio>
                    <Radio value={5}>Qu?? h???n</Radio>
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
            <ViewResultSchedule
                modalData={modalResult}
                handleOk={()=>{
                    setModalResult({
                        ...modalResult,
                        visible: !modalResult.visible,
                    })
                }}
                handleClose={()=>{
                    setModalResult({
                        ...modalResult,
                        visible: !modalResult.visible,
                    })
                }}
            />
        </div>
    );
}


export default ScheduleCurrent;