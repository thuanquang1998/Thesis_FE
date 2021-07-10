import React, {useState, useEffect} from 'react';
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Card, Tabs, Space } from 'antd';
import DoctorSidebar from '../../../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import InfoSchedule from '../InfoSchedule';
import doctorAPI from '../../../../../api/doctorAPI';
const { TabPane } = Tabs;
function ViewSchedule(props) {
    // console.log('props.data :>> ', props.location.state.data);
    const [form] = Form.useForm();
    const [initForm, setInitForm] = useState({});
    const [loadingInit, setLoadingInit] = useState(true);
    const [submitAction, setSubmitAction] = useState({
        action: null,
        data: null
    })
    const obj = {
        clinical: {
            heartbeat:""
        },
        // test: [
        //     {
        //         sight: "a",
        //         price: "a"
        //     },
        //     {
        //         sight: "a",
        //         price: "a"
        //     }
        // ]
    }
    
    const submitForm = (data) => {
        console.log('data :>> ', data);
        setSubmitAction({
            ...submitAction,
            data: {...data}
        })
    }
    const submit1 = () => {
        setSubmitAction({
            ...submitAction,
            action: "checking"
        })
        form.submit();
    }
    const submit2 = () => {
        setSubmitAction({
            ...submitAction,
            action: "checked"
        })
        form.submit();
    }
    useEffect(()=> {
        // convert to checking
        transferToChecking(props.location.state.data.id);
        getRecordData(props.location.state.data.id);
    },[])
    useEffect(() => {
        const {action, data} = submitAction;
        const submit_data = {
            ...data,
            appointmentId: props.location.state.data.id,
        }
        // console.log('action :>> ', action);
        // console.log('data :>> ', data);
        if(action!==null && data!==null) {
            switch (action) {
                case "checking":
                    // call api checking
                    checkingUpdateData(submit_data)
                    break;
                case "checked":
                    // call api checked
                    break;
                default:
                    break;
            }
        }
       
    }, [submitAction]);
    const transferToChecking = async (id) => {
        try {
            const response = await doctorAPI.transfer_schedule_to_checking(id);
            console.log('response transferToChecking:>> ', response);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    const checkingUpdateData = async (data) => {
        try {
            const response = await doctorAPI.update_data_checking(data);
            console.log('response checkingUpdateData:>> ', response);
           
        } catch (error) {
            console.log('error :>> ', error);
        }
    }
    const submitToChecked = async (data) => {
        try {
            const response = await doctorAPI.update_data_checking(data);
            console.log('response checkingUpdateData:>> ', response);
           
        } catch (error) {
            console.log('error :>> ', error);
        }
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
    console.log('initForm :>> ', initForm);
    return (
        <div>
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
                                    <InfoSchedule data={props.location.state.data}/>
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
                                                            Add sights
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
                                            <Col span={24}>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={submit1}>Lưu</Button>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" onClick={submit2}>Hoàn thành khám</Button>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Thoát</Button>
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