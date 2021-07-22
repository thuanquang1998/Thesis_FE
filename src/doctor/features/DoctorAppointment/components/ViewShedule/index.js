import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Space, Tabs } from 'antd';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import doctorAPI from '../../../../../api/doctorAPI';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import InfoSchedule from '../InfoSchedule';
import LoadingTop from '../../../../components/loadingTop';
import Swal from "sweetalert2";

const { TabPane } = Tabs;
function ViewSchedule(props) {
    const history = useHistory();
    const location = useLocation();
    const {enqueueSnackbar} = useSnackbar();
    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState({});
    const [loadingInit, setLoadingInit] = useState(true);

    const [stateForm, setStateForm] = useState(0);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const submitForm = (data) => {
        setLoadingSubmit(true);
        const submit_data = {
            ...data,
            appointmentId: location.state.data.id,
        }
        if(stateForm==='checking') {
            checkingUpdateData(submit_data);
        } else if(stateForm==='checked') {
            finish_exam_schedule(submit_data);
        } else {
            return
        }
    }
    
    useEffect(()=> {
        // convert to checking
        if(location.state.data.status==="uncheck") {
            transferToChecking(location.state.data.id);
            getRecordData(location.state.data.id);
        } else {
            getRecordData(location.state.data.id);
        }
        
    },[])
    
    const transferToChecking = async (id) => {
        try {
            const response = await doctorAPI.transfer_schedule_to_checking(id);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    const checkingUpdateData = async (data) => {
        try {
            const response = await doctorAPI.update_data_checking(data);
            console.log('response checkingUpdateData:>> ', response);
            if(response.error) throw new Error ('Khong the luu lich kham');
            setLoadingSubmit(false);
            Swal.fire({
				icon: "info",
				text: "Lưu lịch khám thành công. Đợi kết quả xét nghiệm.",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Khám cho bệnh nhân khác",
				cancelButtonText: "Đóng"
			})
			.then((result) => {
                if(result.isConfirmed) {
                    history.push({
                        pathname: `/bac-si/lich-kham`,
                    })
                }
			})
        } catch (error) {
            console.log('error :>> ', error);
            // notification
            enqueueSnackbar('Lỗi kết nối mạng. Thử lại sau ít phút.', 'error');
            setLoadingSubmit(false);
        }
    }
    const finish_exam_schedule = async (submitData) => {
        try {
            const response = await doctorAPI.transfer_schedule_to_checked(submitData);
            if(response.error) throw new Error("Can't finish_exam_schedule");
            enqueueSnackbar('Hoàn thành khám', {variant: 'success'})
        } catch (error) {
            console.log('error finish_exam_schedule:>> ', error);
            enqueueSnackbar('Đã có lỗi xảy ra, mời thử lại', {variant: 'error'})
        }
        setLoadingSubmit(false);
    }
    
    const getRecordData = async (id) => {
        try {
            const response = await doctorAPI.get_record_by_id(id);
            console.log('response getRecordData:>> ', response);
            if(response.error) throw new Error("Don't getRecordData ")
            setInitForm(response.data);
            setLoadingInit(false);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    return (
        <div>
            {loadingSubmit&& <LoadingTop/>}
            <div className="breadcrumb-bar" style={{marginTop:"80px"}}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Dashboard</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorSidebar />
                            </StickyBox>
                        </div>
                        <div className="col-md-7 col-lg-8 col-xl-9">
                            <h2>Thông tin lịch khám</h2>
                            <Tabs defaultActiveKey="2" >
                                <TabPane tab="Thông tin" key="1">
                                    <InfoSchedule data={location.state.data}/>
                                </TabPane>
                                <TabPane tab="Khám bệnh" key="2">
                                <Card>
                                        <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Khám lâm sàng:</h4>
                                        {!loadingInit && 
                                        <Form
                                            form={form}
                                            labelCol={{
                                                span: 12,
                                            }}
                                            wrapperCol={{
                                                span: 12,
                                            }}
                                            layout="inline"
                                            size="large"
                                            onFinish={submitForm}
                                            initialValues={
                                                initForm
                                            }
                                        >   
                                            <Row gutter={[8,8]}>
                                                <div style={{width:"100%"}}>
                                                    <p>Khám lâm sàng</p>
                                                </div>
                                                <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                                                    <Form.Item 
                                                        name={["clinnical_examination","heart_rate"]}
                                                        label="Nhịp tim"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                    <Form.Item 
                                                        name={["clinnical_examination","temperature"]}
                                                        label="Nhiệt độ"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                    <Form.Item 
                                                        name={["clinnical_examination","weight"]}
                                                        label="Cân nặng"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                </Col>
                                                <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                                                    <Form.Item 
                                                        name={["clinnical_examination","blood_pressure"]}
                                                        label="Huyết áp"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                        name={["clinnical_examination","breathing"]} 
                                                        label="Nhịp thở"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                        name={["clinnical_examination","height"]}
                                                        label="Chiều cao"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                </Col>
                                                <Form.Item 
                                                        name="diagnostic" 
                                                        label="Chuẩn đoán bệnh"
                                                    >
                                                    <Input.TextArea/>
                                                </Form.Item>
                                                <div style={{width:"100%"}}>
                                                    <p>Chỉ định</p>
                                                </div>
                                                <Form.List name="medical_test">
                                                    {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(field => (
                                                        <Space key={field.key} align="baseline">
                                                            <Form.Item
                                                            noStyle
                                                            shouldUpdate={(prevValues, curValues) =>
                                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                                            }
                                                            >
                                                            {() => (
                                                            <Form.Item
                                                                {...field}
                                                                label="Loại xét nghiệm"
                                                                name={[field.name, 'name']}
                                                                fieldKey={[field.fieldKey, 'name']}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            )}
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                label="Kết quả"
                                                                name={[field.name, 'result']}
                                                                fieldKey={[field.fieldKey, 'result']}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                                        </Space>
                                                        ))}

                                                        <Form.Item>
                                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                            Thêm
                                                        </Button>
                                                        </Form.Item>
                                                    </>
                                                    )}
                                                </Form.List>
                                                <Form.Item 
                                                    name="summary" 
                                                    label="Kết luận & Hướng điều trị"
                                                >
                                                    <Input.TextArea/>
                                                </Form.Item>
                                            </Row>
                                            <Col span={24} style={{display:"flex"}}>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={()=>setStateForm('checking')}>Lưu thông tin</Button>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={()=>setStateForm('checked')}>Hoàn thành khám</Button>
                                                </Form.Item>
                                            </Col>
                                        </Form>
                                        }   
                                    </Card> 
                                </TabPane>
                            </Tabs>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default ViewSchedule;