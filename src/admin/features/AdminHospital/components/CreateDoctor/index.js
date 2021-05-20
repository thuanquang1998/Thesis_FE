import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Steps, Radio } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import districtData from '../../../../assets/data/district'
import provinceData from '../../../../assets/data/province'
import wardData from '../../../../assets/data/ward'
import SidebarNav from '../../../../components/SideBar'
import moment from 'moment';
import adminAPI from '../../../../../api/adminAPI';
import LoadingTop from '../../../../components/loadingTop';
import ReactQuill from 'react-quill'; // ES6

const { Step } = Steps;



const INIT_DATA = {
    name: "",
    phone:"",
    email:"",
    address: "",
    about:"Đội ngũ bác sĩ chuyên nghiệp, tận tình, chu đáo!...",
    dateStart: "",
    contractType: "",
    scale: "",
    adminPhone: "",
    adminEmail:""
}

const CreateDoctor = () => {
    /* goi api lay danh sach benh vien, loc ra ten, email, sdt
        gop chung 3 form lam 1
    */
    const [province, setProvince]= useState("")
    const [district, setDistrict] = useState("")
    const [ loadingPage, setLoadingPage ] = useState(false);
    const [ listHospital, setListHospital ] = useState([]);

    const [ submitData, setSubmitData ] = useState({...INIT_DATA})

    useEffect(()=> {
        setLoadingPage(true);
        // call api 
        (async ()=>{
            try {
                const response = await adminAPI.get_list_hospitals();
                const _list = response.data.map((item,index)=>{
                    const _data = {
                        hospitalName: item.name,
                        hospitalEmail: item.email,
                        hospitalPhone: item.phone,
                    }
                    return _data
                })
                setListHospital([..._list]);
            } catch (error) {
                console.log('error.message :>> ', error.message);
            }
            setLoadingPage(false)
        })()
    },[])

    const create_hos = async (data) => {
        try {
            const response = await adminAPI.create_hospital(data);
            console.log('response :>> ', response);
        } catch (error) {
            console.log('error.message :>> ', error.message);
        }
    }
    
    const onHandleSubmitForm = (data) => {
        const _district = data.address.district.split(" ");
        const _province = data.address.province.split(" ");
        _district.splice(0,1);
        _province.splice(0,1);
        const _data = {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: `${data.address.street}, ${data.address.ward}, ${_district.join(" ")}, ${_province.join(" ")}`,
            dateStart: moment(data.dateStart).format(),
            contractType: data.contract.contractType,
            scale: data.contract.scale,
            adminPhone: data.adminPhone||"",
            adminEmail: data.adminEmail,
        }
        const _submitData = {...submitData,..._data};
        console.log('_submitData :>> ', _submitData);
        // call api
        create_hos(_submitData);
    }


  
    // handle address
    const onChangeProvince = (value) => {
        setProvince(value)
    }
    const onChangeDistrict = (value) => {
        setDistrict(value)
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
                            <h3 className="page-title">Thêm bệnh viện</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/admin">Dashboard</Link></li>
                                <li className="breadcrumb-item active"><Link to="/admin/cosoyte">Danh sách bệnh viện</Link></li>
                                <li className="breadcrumb-item active">Tạo mới bệnh viện</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Card
                    title={<h4 style={{fontWeight:"600"}}>Thêm mới nhân viên</h4>}
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
                        <h5 style={{fontWeight:"600"}}>Thông tin cơ bản</h5>
                        <Row gutter={[8,8]}>
                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                <Form.Item name="name" label="Tên nhân viên:" rules={[{required: true, message: 'Nhập tên bệnh viện!'}]}>
                                    <Input className="input" placeholder="Vd: Bệnh viện/Phòng khám A"/>
                                </Form.Item>
                                <Form.Item name="phone" label="Số điện thoại:" rules={[{required: true, message: 'Nhập số điện thoại bệnh viện'}]}>
                                    <Input className="input" placeholder="Số điện thoại liện hệ"/>
                                </Form.Item>
                                <Form.Item name="email" label="Email:" rules={[{required: true, message: 'Nhập email bệnh viện'},{type:'email', message:'Email sai định dạng'}]}>
                                    <Input className="input" placeholder="Email"/>
                                </Form.Item>
                                <Form.Item 
                                    name="gender" 
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
                                    <DatePicker/>
                                </Form.Item>
                            </Col>
                            <Col xs={{span:24}} sm={{span:24}} md={{span:12}}>
                                <Form.Item name="email" label="Ảnh đại diện:" rules={[{required: true, message: 'Nhập email bệnh viện'},{type:'email', message:'Email sai định dạng'}]}>
                                    {/* <Input className="input" placeholder="Email"/> */}
                                    <input type="file"/>
                                </Form.Item>
                                <Form.Item name="email" label="Chức danh:" rules={[{required: true, message: 'Nhập email bệnh viện'},{type:'email', message:'Email sai định dạng'}]}>
                                    <Input className="input" placeholder="Email"/>
                                </Form.Item>
                               <Form.Item
                                    label="Bệnh viện"
                                    name={['contract', 'contractType']}
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Chọn loại hợp đồng!',
                                        },
                                    ]}
                                >
                                    <Select className="province" placeholder="Loại hợp đồng" onChange={()=>{}}>
                                        <Select.Option value="tamThoi">Hợp đồng tạm thời</Select.Option>
                                        <Select.Option value="nganHan">Hợp đồng ngắn hạn</Select.Option>
                                        <Select.Option value="daiHan">Hợp đồng dài hạn</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Chuyên khoa"
                                    name={['contract', 'contractType']}
                                    rules={[
                                        {
                                        required: true,
                                        message: 'Chọn loại hợp đồng!',
                                        },
                                    ]}
                                >
                                    <Select className="province" placeholder="Loại hợp đồng" onChange={()=>{}}>
                                        <Select.Option value="tamThoi">Hợp đồng tạm thời</Select.Option>
                                        <Select.Option value="nganHan">Hợp đồng ngắn hạn</Select.Option>
                                        <Select.Option value="daiHan">Hợp đồng dài hạn</Select.Option>
                                    </Select>
                                </Form.Item>
                               
                                </Col>
                        </Row>
                         <Form.Item label="Giới thiệu:" className="form-trieuchung">
														<ReactQuill 
															theme="snow"
															onChange={()=>{}}
														/>
													</Form.Item>
                        <Button type="primary" htmlType="submit" style={{background:"#00d0f1 !important", marginTop:"30px"}}>
                            Save
                        </Button>
                    </Form>
                </Card>
            </div>
          </div>
        </>
    )
}

export default CreateDoctor
