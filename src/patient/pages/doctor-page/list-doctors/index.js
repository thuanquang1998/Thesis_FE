import React,{useState ,useEffect} from 'react'
import { Col, Row, Select, Input } from 'antd'
import logoDoctor from '../../../assets/img/bsnam.jpg'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import DoctorItem from '../doctor-item'
import {SearchOutlined} from '@ant-design/icons'
import { get_list_hospitals, get_specialities_system } from '../../../../redux/actions/adminActions'
import './style.css'
import { get_doctors_data } from '../../../../redux/actions/doctorActions'
import StickyBox from "react-sticky-box";

import SearchForm from '../search-form'
const DoctorPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const doctors = useSelector(state => state.doctor.doctor_data)
    const specialities = useSelector(state=>state.admin.specialities_system)
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    const [query, setQuery] = useState('');
    const [renderDataDoctor, setRenderDataDoctor] = useState({...doctors});
    const [filters, setFilters] = useState({});
    useEffect(()=> {
        dispatch(get_specialities_system())
        dispatch(get_list_hospitals())
        dispatch(get_doctors_data(history))
        setRenderDataDoctor(doctors);
    },[])
    console.log('history DoctorPage:>> ', history.location.search);
    useEffect(()=>{
        // const params = new URLSearchParams();
        // if (query) {
        // params.append("name", query);
        // } else {
        // params.delete("name");
        // }
        // history.push({ search: params.toString() });
    },[history,query])
    const handleFilterData = (values) => {
        console.log('values :>> ', values);
    }
    return (
        <>
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/patient">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to="/patient/dsbacsi">Danh sách bác sĩ</Link></li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Danh sách bác sĩ</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-12 col-lg-4 col-xl-3">
								<StickyBox offsetTop={20} offsetBottom={20}>
									{/* <SearchFilter /> */}
                                    <SearchForm onFilterData={handleFilterData}/>
								</StickyBox>
							</div>
							<div className="col-md-12 col-lg-8 col-xl-9">
								{/* <SearchList /> */}
                                    <Row gutter={[16, 16]} style={{paddingTop:"0px"}}>
                                        {doctors && doctors.map((item,idx)=>(
                                            <Col key={idx} xs={{span:24}} sm={{span:12}} md={{span:8}} xl={{span:6}}>
                                                {/* <Link to={{
                                                    pathname :`/patient/doctor-list/${item.id}`,
                                                    state:{data :item}                                        
                                                 }}> */}
                                                    <DoctorItem key={idx} img={logoDoctor} data={item}/>
                                                {/* </Link> */}
                                            </Col>
                                        ))}
                                    </Row>
								<div className="load-more text-center">
									<a href="#0" className="btn btn-primary btn-sm">Xem thêm</a>
								</div>
							</div>
						</div>

					</div>

				</div>
            {/* <div className="content">
                <div className="container-fluid">
                    <section className="section list-doctor">
                        <div className="container-fluid ">
                            <div className="row">
                                <div className="container" style={{margin:"0 auto"}}>
                                    <SearchForm/>
                                    <Row gutter={[16, 16]} style={{paddingTop:"50px"}}>
                                        {doctors && doctors.map((item,idx)=>(
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
            </div> */}
        </>
    )
}

export default DoctorPage
