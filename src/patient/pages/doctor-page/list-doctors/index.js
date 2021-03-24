import React,{useEffect} from 'react'
import { Col, Row, Select, Input } from 'antd'
import logoDoctor from '../../../assets/img/bsnam.jpg'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import DoctorItem from '../doctor-item'
import {SearchOutlined} from '@ant-design/icons'
import { get_list_hospitals, get_specialities_system } from '../../../../actions/adminActions'
import './style.css'
import { get_doctors_data } from '../../../../actions/doctorActions'
const DoctorPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const doctors = useSelector(state => state.doctor.doctor_data)
    const specialities = useSelector(state=>state.admin.specialities_system)
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    useEffect(()=> {
        dispatch(get_specialities_system())
        dispatch(get_list_hospitals())
        dispatch(get_doctors_data(history))
        // get list docotrs
    },[])
    // console.log(specialities,"0000000000000000");
    // console.log(list_hospitals,"111111111111111111");
    const array = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    
    return (
        <>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Danh sách bác sĩ</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Danh sách bác sĩ</h2>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="content">
                <div className="container-fluid">
                    <section className="section list-doctor">
                        <div className="container-fluid ">
                            <div className="row">
                                <div className="container" style={{margin:"0 auto"}}>
                                    <div className="search-list">
                                        <h2 style={{color:"#0de0fe", fontWeight:"400"}}>Tìm kiếm bác sĩ của bạn</h2>
                                        <Row gutter={[16,16]} className="row_search">
                                            <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_hos">
                                                <Select
                                                    placeholder="Tìm theo bệnh viện"
                                                >
                                                    <Select.Option value="all_hos">Tất cả</Select.Option>
                                                    {/* {list_hospitals && list_hospitals.map(item=>(
                                                         <Select.Option key={list_hospitals.id} value={list_hospitals.name}>{list_hospitals.name}</Select.Option>
                                                    ))} */}
                                                </Select>
                                            </Col>
                                            <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_speci">
                                                <Select
                                                    placeholder="Tìm theo chuyên khoa"
                                                >
                                                    <Select.Option value="all_spec">Tất cả</Select.Option>
                                                    {/* {specialities && specialities.map(item=>(
                                                         <Select.Option value={specialities.name}>{specialities.name}</Select.Option>
                                                    ))} */}
                                                </Select>
                                            </Col>
                                            <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_name">
                                                <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row gutter={[16, 16]} style={{paddingTop:"50px"}}>
                                        {doctors.map(item=>(
                                            <Col xs={{span:24}} sm={{span:12}} md={{span:8}} xl={{span:6}}>
                                                <Link to={{
                                                    pathname :`/patient/doctor-list/${item.id}`,
                                                    state:{data :item}                                        
                                                 }}>
                                                    <DoctorItem img={logoDoctor} data={item}/>
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default DoctorPage
