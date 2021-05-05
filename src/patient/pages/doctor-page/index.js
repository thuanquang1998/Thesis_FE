import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import { get_list_hospitals, get_specialities_system } from '../../../redux/actions/adminActions';
import { get_doctors_data } from '../../../redux/actions/doctorActions';
import ListDoctor from './list-doctors';
import SearchForm from './search-form';
import './style.css';

const DoctorPage = () => {
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const queryParams = queryString.parse(location.search);
    const [filters, setFilters] = useState({
        ...queryParams,
     });
    const [renderDataDoctor, setRenderDataDoctor] = useState([]);
    
    useEffect(()=>{
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    },[filters, history])
    useEffect(()=>{
        let _renderData = [];
        if(loadingData===0 && appState.listAllDoctors.length!==0) {
            const _data = [...appState.listAllDoctors];
            const tenBs = filters.tenBs || "";
            const bv = filters.bv?filters.bv==='all-bv'?'':filters.bv:'';
            const ck = filters.ck?filters.ck==='all-ck'?'':filters.ck:'';
            const new_list_name = _data.filter((item,idx)=>{
                return item.fullName.toLowerCase().includes(tenBs.toLowerCase())===true;
            })
            const new_list_bv = new_list_name.filter((item,idx)=> {
                return item.hopitalId.toLowerCase().includes(bv.toLowerCase())===true;
            })
            const new_list_ck = new_list_bv.filter((item,idx)=> {
                return item.specialization.key.toLowerCase().includes(ck.toLowerCase())===true;
            })
            _renderData = new_list_ck;
        } else {
            _renderData = [];
        }
        setRenderDataDoctor(_renderData);
    },[filters, loadingData])
   
    const handleFilterData = (values) => {
        setFilters({...values});
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
                                <SearchForm onFilterData={handleFilterData}/>
                            </StickyBox>
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {/* handle loading */}
                            <div style={{minHeight:"600px"}}>
                                {loadingData? 
                                    <div>Loading Page</div>
                                    :<ListDoctor list_doctors={renderDataDoctor}/>
                                }
                            </div>
                            
                            <div className="load-more text-center">
                                <a href="#0" className="btn btn-primary btn-sm">Xem thêm</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DoctorPage
