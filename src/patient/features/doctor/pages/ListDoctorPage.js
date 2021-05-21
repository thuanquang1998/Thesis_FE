import React, { useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string'; 
import { Box, Container, Grid, makeStyles, Paper, LinearProgress } from '@material-ui/core';
import StickyBox from "react-sticky-box";
import LoadingTop from '../../../components/loadingTop';

import DoctorFilter from '../components/DoctorFilter';
import FilterViewer from '../components/FilterViewer';
import DoctorList from '../components/DoctorList';


const useStyles = makeStyles(theme => ({
    root: {

    },
    left: {
        // width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    loading: {
        position:'fixed',
        top: '0',
        width:"100%",
    }
}))

function ListDoctorPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const appState = useSelector(state=>state.app);
    const { loadingData, listAllDoctors, listAllSpecials, listAllHospitals } = appState;

    const [ loadingPage, setLoadingPage ] = useState(true);


    const queryParams = useMemo(()=>{
        const params = queryString.parse(location.search);
        return {
            ...params,
            // ten:"",
            // ck:"",
            // bv:"",
        }
    },[location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [listDoctor, setListDoctor] = useState([]);
    const [label, setLabel] = useState({});

    useEffect( () => {
        setLoadingPage(true);
        let _renderData = [];
        const label = {
            ck:"",
            bv:"",
        }
        if(!loadingData && listAllDoctors.length!==0){
            const { tenBs, bv, ck } = queryParams;
            const _tenBs = tenBs || "";
            const _bv = bv?bv==='all-bv'?'':bv:'';
            const _ck = ck?ck==='all-ck'?'':ck:'';

            const _data = [...listAllDoctors];
            const new_list_name = _data.filter((item,idx)=>{
                return item.fullName.toLowerCase().includes(_tenBs.toLowerCase())===true;
            })
            const new_list_bv = new_list_name.filter((item,idx)=> {
                return item.hopitalId.toLowerCase().includes(_bv.toLowerCase())===true;
            })
            const new_list_ck = new_list_bv.filter((item,idx)=> {
                return item.spec_detail?item.spec_detail[0]?._id.toLowerCase().includes(_ck.toLowerCase())===true:true;
            })
            const new_doctors = new_list_ck.filter(x=>x.timeWorkIsNull===false);
            _renderData = new_doctors;

        } else {
            _renderData = [];
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 500);
        setListDoctor(_renderData);
    }, [queryParams, loadingData])

    const handleFiltersChange = (newFilters) => {
        const filters = {
            ...queryParams,
            ...newFilters
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
    }

    const handleFilterViewer = (newFilters) => {

    }

    return (
        <Box>
            {loadingPage && <LoadingTop/>}

            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
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
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <DoctorFilter filters={queryParams} onChange={handleFiltersChange}/>
                            </StickyBox>
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {/* Title */}
                            <h2>{`Đã tìm thấy: ${listDoctor.length} bác sĩ`}</h2>
                            {/* View */}
                            <FilterViewer filters={queryParams} onChange={handleFilterViewer}/>
                            {/* list */}
                            <div style={{minHeight:"600px"}}>
                                {loadingData? 
                                    <div>Loading Page</div>
                                    :<DoctorList doctors={listDoctor}/>
                                }
                            </div>
                            
                            <div className="load-more text-center">
                                <a href="#0" className="btn btn-primary btn-sm">Xem thêm</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Box>
    );
}

export default ListDoctorPage;