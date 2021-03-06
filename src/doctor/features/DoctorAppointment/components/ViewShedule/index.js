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
				text: "L??u l???ch kh??m th??nh c??ng. ?????i k???t qu??? x??t nghi???m.",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Kh??m cho b???nh nh??n kh??c",
				cancelButtonText: "????ng"
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
            enqueueSnackbar('L???i k???t n???i m???ng. Th??? l???i sau ??t ph??t.', 'error');
            setLoadingSubmit(false);
        }
    }
    const finish_exam_schedule = async (submitData) => {
        try {
            const response = await doctorAPI.transfer_schedule_to_checked(submitData);
            if(response.error) throw new Error("Can't finish_exam_schedule");
            enqueueSnackbar('Ho??n th??nh kh??m', {variant: 'success'})
            setLoadingSubmit(false);
            history.push({
                pathname: `/bac-si/lich-kham`,
            })
            // Swal.fire({
			// 	icon: "info",
			// 	text: "L??u h??? s?? th??nh c??ng.",
			// 	showCancelButton: true,
			// 	confirmButtonColor: "#3085d6",
			// 	cancelButtonColor: "#d33",
			// 	confirmButtonText: "Kh??m cho b???nh nh??n kh??c",
			// 	cancelButtonText: "T??i kh??m"
			// })
			// .then((result) => {
            //     if(result.isConfirmed) {
            //         console.log("11111111111111");
            //         // history.push({
            //         //     pathname: `/bac-si/lich-kham`,
            //         // })
            //     } else {
            //         console.log("22222222222");
            //     }
			// })
        } catch (error) {
            console.log('error finish_exam_schedule:>> ', error);
            enqueueSnackbar('???? c?? l???i x???y ra, m???i th??? l???i', {variant: 'error'})
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
                                    <li className="breadcrumb-item"><Link to="/home">Trang ch???</Link></li>
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
                            <h2>Trang kh??m b???nh</h2>
                            <Tabs defaultActiveKey="2" >
                                <TabPane tab="Th??ng tin" key="1">
                                    <InfoSchedule data={location.state.data}/>
                                </TabPane>
                                <TabPane tab="Kh??m b???nh" key="2">
                                <Card>
                                        <h4 style={{fontWeight:"600", marginBottom:"20px"}}>Kh??m l??m s??ng:</h4>
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
                                                    <p>Kh??m l??m s??ng</p>
                                                </div>
                                                <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                                                    <Form.Item 
                                                        name={["clinnical_examination","heart_rate"]}
                                                        label="Nh???p tim"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                    <Form.Item 
                                                        name={["clinnical_examination","temperature"]}
                                                        label="Nhi???t ?????"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                    <Form.Item 
                                                        name={["clinnical_examination","weight"]}
                                                        label="C??n n???ng"
                                                    >
                                                        <Input/>
                                                    </Form.Item> 
                                                </Col>
                                                <Col xs={{span:12}} sm={{span:12}} md={{span:12}}>
                                                    <Form.Item 
                                                        name={["clinnical_examination","blood_pressure"]}
                                                        label="Huy???t ??p"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                        name={["clinnical_examination","breathing"]} 
                                                        label="Nh???p th???"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item 
                                                        name={["clinnical_examination","height"]}
                                                        label="Chi???u cao"
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                </Col>
                                                <Form.Item 
                                                        name="diagnostic" 
                                                        label="Chu???n ??o??n b???nh"
                                                    >
                                                    <Input.TextArea/>
                                                </Form.Item>
                                                <div style={{width:"100%"}}>
                                                    <p>Ch??? ?????nh</p>
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
                                                                label="Lo???i x??t nghi???m"
                                                                name={[field.name, 'name']}
                                                                fieldKey={[field.fieldKey, 'name']}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            )}
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                label="K???t qu???"
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
                                                            Th??m
                                                        </Button>
                                                        </Form.Item>
                                                    </>
                                                    )}
                                                </Form.List>
                                                <Form.Item 
                                                    name="summary" 
                                                    label="K???t lu???n & H?????ng ??i???u tr???"
                                                >
                                                    <Input.TextArea/>
                                                </Form.Item>
                                            </Row>
                                            <Col span={24} style={{display:"flex"}}>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={()=>setStateForm('checking')}>L??u th??ng tin</Button>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={()=>setStateForm('checked')}>Ho??n th??nh kh??m</Button>
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