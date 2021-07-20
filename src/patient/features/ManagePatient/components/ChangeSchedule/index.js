import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Modal, Spin } from 'antd';

import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import patientAPI from '../../../../../api/patientApi';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";


const INIT_DATA = {
    appointmentId:"",
    date:"",
    time:""
}
function ChangeSchedule(props) {
    // const [form] = Form.useForm();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch()
    const {modalData, handleOk, handleClose} = props;
    const {data, visible} = modalData;
    const currentTimeNumber = new Date().getTime();
    const [dataSubmit, setDataSubmit] = useState({})
    const [listDateValid, setListDateValid] = useState([]);
    const [listTimeStep, setListTimeStep] = useState([]);
   
    const [loadingPage, setLoadingPage] = useState(true);

    const [submitData, setSubmitData] = useState({
        ...INIT_DATA,
    })
    useEffect(()=> {
        // form.resetFields();
        if(visible){
            console.log("get data by id");
            setLoadingPage(true);
            getTimeWorks(data.fullData.doctorId);
        }
    },[visible])
    const getTimeWorks = async (id) => {
        try {
            const res = await patientAPI.get_time_works(id);
            const abc = new Date(res.data.data[0].date);
            const current = new Date();
            console.log('res :>> ', res);
            if(res.error) throw new Error('error');
            if(res.data.isNull){
                handleClose();
                Swal.fire({
                    icon: "error",
                    title: "Đổi lịch không thành công.",
                    text: "Bác sĩ hiện không còn lịch trống."
                });
            } else{
                const _listDate = res.data.data;
                const _listDateValid = _listDate.filter(x=> {
                    const itemTimeNumber =  new Date(x.date);
                    const _itemTimeNumber = itemTimeNumber.getTime();
                    const diff = _itemTimeNumber*1 - currentTimeNumber*1;
                    return diff>0;
                })
                setListDateValid(_listDateValid);
                setLoadingPage(false);
            } 
        } catch (error) {
            console.log('error :>> ', error);
            handleClose();
            Swal.fire({
                icon: "error",
                title: "Đổi lịch không thành công.",
                text: "Bác sĩ hiện không còn lịch trống."
            });
        }
    }
    const onChangeDate = (value) => {
        const _dateChoosed = listDateValid.filter(x=>x.date===value);
        let room_temp = '';
        let _listTimeSlot = [];
        if(_dateChoosed.length!==0) {
            _listTimeSlot = _dateChoosed[0].timeSlot.filter(x=>x.booked<_dateChoosed[0].max);
            room_temp = _dateChoosed[0].location;
        }
        setListTimeStep(_listTimeSlot);
        setDataSubmit({
            ...dataSubmit, 
            date: value,
            room: room_temp
        });
    }
    const onHandleSubmit = (value) => {
        const _submitData = {
            ...submitData, 
            appointmentId: data.fullData.id, 
            date: value.date, 
            time: value.time
        }
        props.handleChangeSchedule(_submitData);
        handleClose();
    }

    return (
        <Modal 
            title="Đổi lịch khám" 
            width={600}
            visible={modalData.visible} 
            onOk={handleOk} 
            onCancel={()=>{
                setListDateValid([]);
                setListTimeStep([]);
                handleClose();
            }}
            footer={null}
        >
            {loadingPage?
                <div>
                    <Spin />
                    <Spin />
                    <Spin />
                </div>: 
                <Form
                    // form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    onFinish={onHandleSubmit}
                    initialValues={{
                        date:"",
                        time:""
                    }}
                >   
                <Row gutter={[8,8]}>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="date" 
                            label="Chọn ngày"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày khám',
                                }
                            ]}
                        >
                            <Select 
                                className="province"
                                placeholder="Vui lòng chọn ngày khám" 
                                style={{ width: 200, border:"none" }} 
                                className="chooseDay"
                                onChange={onChangeDate}
                            >
                                {listDateValid.map((item, idx)=> {
                                    return (<Select.Option key={idx} value={item.date}>{moment(item.date).format('DD/MM/YYYY')}</Select.Option>)
                                })}
                            </Select>
                        </Form.Item> 
                    </Col>
                    <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                        <Form.Item 
                            name="time" 
                            label="Chọn giờ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn giờ',
                                }
                            ]}
                        >
                            <Select 
                                className="province"
                                placeholder="Vui lòng chọn giờ" 
                                style={{ width: 200, border:"none" }} 
                                className="chooseDay"
                                onChange={(value)=>setDataSubmit({...dataSubmit, time:value})}
                            >
                                {listTimeStep.length!==0 && listTimeStep.map((step, idx)=> {
                                    return (<Select.Option key={idx} value={step.time}>{step.time}</Select.Option>)
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            
                <Col span={24} style={{textAlign:'center', marginTop:"10px"}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Đổi lịch</Button>
                    </Form.Item>
                </Col>
            </Form>}
        </Modal>
    );
}

export default ChangeSchedule;