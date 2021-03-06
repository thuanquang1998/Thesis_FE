import { Button, Card, Col, DatePicker, Form, Input, Radio, Row, Select, Steps } from 'antd'
import moment from 'moment'
import React, { useEffect, useState, useRef } from 'react'
import ReactQuill from 'react-quill' // ES6
import { Link, useHistory } from 'react-router-dom'
import adminAPI from '../../../../../api/adminAPI'
import LoadingTop from '../../../../components/loadingTop'
import SidebarNav from '../../../../components/SideBar'
import { useSnackbar } from 'notistack';

const { Step } = Steps;



const INIT_DATA = {
    hopitalId: "",
    fullName: "",
    sex: "",
    birthday: "",
    phone: "",
    specialization:"",
    email: "",
    about: "",
    title: ""
}

const CreateDoctor = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [ loadingPage, setLoadingPage ] = useState(false);
    const [ listSpec, setListSpec ] = useState([]);

    const [about, setAbout] = useState("Là một bác sĩ giỏi, tận tâm, có trách nhiệm.")

    const [fileAvatar, setFileAvatar] = useState(null);
    const fileInput = useRef(null);

    const [ submitData, setSubmitData ] = useState({...INIT_DATA})

    useEffect(()=> {
        setLoadingPage(true);
        // call api 
        (async ()=>{
            try {
                const response = await adminAPI.get_spec_of_hospital(JSON.parse(localStorage.getItem('currentAdmin')).hospital.id);
                
                if(!response.error){
                    setListSpec(response.data)         
                }
                else {
                    setListSpec([]);
                }      
            } catch (error) {
                console.log('error.message :>> ', error.message);
            }
            setLoadingPage(false)
        })()
    },[])

    const onChangeAvatar = () => {
        let { current } = fileInput;
        let file = current.files;
        setFileAvatar(file[0])
    }

    const onChangeAbout = (value) => {
        setAbout(value);
    }
    
    const onHandleSubmitForm = (data) => {
        const _submitData = new FormData();
        _submitData.append("image", fileAvatar);
        _submitData.append("about", about);
        const _data = {
            hopitalId: JSON.parse(localStorage.getItem('currentAdmin')).hospital.id,
            fullName: data.fullName,
            sex: data.sex,
            birthday: moment(data.birthday).format(),
            phone: data.phone,
            specialization:data.specialization,
            email: data.email,
            title: data.title,
        }

        for (const x in _data) {
            _submitData.append(`${x}`, _data[x]);
        }
        createDoctor(_submitData)
    }
    const createDoctor = async (data) => {
        setLoadingPage(true)
        try {
            const response = await adminAPI.create_doctor(data);
            console.log('response :>> ', response);
            if(response.error) throw new Error(response.errors[0].message);
            enqueueSnackbar('Tạo bác sĩ thành công', {variant: 'success'});
            // reset form
            history.push('/admin/hospital/ds-bac-si')

        } catch (error) {
            enqueueSnackbar(error.message, {variant: 'error'})
        }
        setLoadingPage(false)
    }

    return (
        <>
          <SidebarNav/>
          {loadingPage && <LoadingTop/>}
            <div className="page-wrapper">
              <div className="content container-fluid">
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-7 col-auto">
                            <h3 className="page-title" style={{paddingTop:"20px"}}>Tạo tài khoản bác sĩ</h3>
                            {/* <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                                <li className="breadcrumb-item active"><Link to="/admin/cosoyte">Danh sách bệnh viện</Link></li>
                                <li className="breadcrumb-item active">Tạo mới bệnh viện</li>
                            </ul> */}
                        </div>
                    </div>
                </div>

                <Card
                    title={<h4 style={{fontWeight:"600"}}>Tạo tài khoản bác sĩ</h4>}
                >
                    <Form
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="vertical"
                        size="large"
                        onFinish={onHandleSubmitForm}
                    >   
                        <Row gutter={[8,8]}>
                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                <Form.Item name="fullName" label="Tên bác sĩ:" rules={[{required: true, message: 'Nhập tên nhân viên!'}]}>
                                    <Input className="input" placeholder="Tên bác sĩ"/>
                                </Form.Item>
                                <Form.Item name="phone" label="Số điện thoại:" rules={[{required: true, message: 'Nhập số điện thoại'}]}>
                                    <Input className="input" placeholder="Số điện thoại liện hệ"/>
                                </Form.Item>
                                <Form.Item name="email" label="Email:" rules={[{required: true, message: 'Nhập email nhân viên'},{type:'email', message:'Email sai định dạng'}]}>
                                    <Input className="input" placeholder="Email"/>
                                </Form.Item>
                                <Form.Item 
                                    name="sex" 
                                    label="Giới tính:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn giới tính',
                                        }
                                    ]}
                                >
                                    <Radio.Group size="large">
                                        <Radio.Button value="male">Nam</Radio.Button>
                                        <Radio.Button value="female">Nữ</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                <Form.Item name="avatar" label="Ảnh đại diện:" >
                                    <input 
                                        // multiple
                                        type="file" 
                                        accept="image/png, image/jpeg"
                                        ref={fileInput}
                                        onChange={onChangeAvatar}
                                    />
                                </Form.Item>
                                <Form.Item name="title" label="Chức danh:" rules={[{required: true, message: 'Nhập chức danh'}]}>
                                    <Input className="input" placeholder="Bác sĩ"/>
                                </Form.Item>
                                {/* <Form.Item
                                    label="Loại tài khoản"
                                    name="typeAccount"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Chọn loại tài khoản!',
                                        },
                                    ]}
                                >
                                    <Select className="province" placeholder="Loại hợp đồng" onChange={()=>{}}>
                                        <Select.Option value="doctor">Bác sĩ</Select.Option>
                                        <Select.Option value="agent">Nhân viên hỗ trợ</Select.Option>
                                    </Select>
                                </Form.Item> */}
                                <Form.Item
                                    label="Chuyên khoa"
                                    name="specialization"
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Chọn chuyên khoa!',
                                        },
                                    ]}
                                >
                                    <Select className="province" placeholder="Chuyên khoa" onChange={()=>{}} loading={loadingPage}>
                                        {listSpec.length!==0 && listSpec.map((item, index)=>(
                                            <Select.Option value="agent" key={index} value={item._id}>{item.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="birthday" 
                                    label="Ngày sinh:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày sinh',
                                        }
                                    ]}
                                >
                                    <DatePicker placeholder="Chọn ngày"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Giới thiệu:" className="about">
                            <ReactQuill 
                                theme="snow"
                                onChange={onChangeAbout}
                            />
                        </Form.Item>
                        <Col style={{textAlign:'center'}}>
                            <Button type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
                                Tạo tài khoản
                            </Button>
                        </Col>
                        
                    </Form>
                </Card>
            </div>
          </div>
        </>
    )
}

export default CreateDoctor
