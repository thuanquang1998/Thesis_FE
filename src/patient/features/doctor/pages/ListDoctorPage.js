import { Box, makeStyles } from '@material-ui/core';
import { Card, Pagination } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import LoadingTop from '../../../components/loadingTop';
import DoctorFilter from '../components/DoctorFilter';
import DoctorList from '../components/DoctorList';
import FilterViewer from '../components/FilterViewer';



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
    },
    pagination: {
        textAlign: 'center',
        '& li': {
            borderRadius: "50%",
            
        },
        '& li button': {
            border: 'none !important'
        }
    },
    card: {
        borderRadius: "15px"
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
            page: Number.parseInt(params.page) || 1, 
            limit: Number.parseInt(params.limit) || 6,
        }
    },[location.search]);

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] =  useState(true);
    const [listDoctor, setListDoctor] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [label, setLabel] = useState({});

    
    useEffect( () => {
        setLoadingPage(true);
        let _renderData = [];
        let _totalData = [];
        const label = {
            ck:"",
            bv:"",
        }
        if(!loadingData && listAllDoctors.length!==0){
            const { tenBs, bv, ck, page, limit } = queryParams;
            const _tenBs = tenBs || "";
            const _bv = bv?bv==='all-bv'?'':bv:'';
            const _ck = ck?ck==='all-ck'?'':ck:'';
            const _data = [...listAllDoctors];
            console.log('_bv :>> ', _bv);
            // check null Schedule
            const _dataUnNull = _data.filter(x=>x.timeWorkIsNull===false);

            // filter
            const new_list_name = _dataUnNull.filter((item,idx)=>{
                return item.fullName.toLowerCase().includes(_tenBs.toLowerCase())===true;
            })
            const new_list_bv = new_list_name.filter((item,idx)=> {
                return item.hospital_info._id.toLowerCase().includes(_bv.toLowerCase())===true;
            })
            const new_list_ck = new_list_bv.filter((item,idx)=> {
                return item.spec_detail?item.spec_detail?._id.toLowerCase().includes(_ck.toLowerCase())===true:true;
            })
            _totalData=[...new_list_ck];

            // pagination
            let min = 0;
            let max = 0;
            if (page===1){
                min = 0;
                max = limit;
            } else {
                min = limit*(page-1);
                max = limit*page;
            }
            _renderData = new_list_ck.slice(min, max);
        } else {
            _renderData = [];
            _totalData= [];
        }
        setTimeout(() => {
            setLoadingPage(false);
        }, 500);
        setTotalData([..._totalData])
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

    const handlePageChange = (e, pageSize) => {
      
        const _temp = {
            page: e,
            limit: pageSize,
        }
        const filters = {
            ...queryParams,
            ..._temp,
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
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
                            <Card className={classes.card}>
                                {/* Title */}
                                <h2>{`Đã tìm thấy: ${totalData.length} bác sĩ`}</h2>
                                {/* View */}
                                <FilterViewer filters={queryParams} onChange={handleFilterViewer}/>
                                {/* list */}
                                <div style={{minHeight:"600px"}}>
                                    {loadingData? 
                                        <div>Loading Page</div>
                                        :<DoctorList doctors={listDoctor}/>
                                    }
                                </div>
                                
                                <div style={{marginTop:"30px"}}>
                                    <Pagination 
                                        className={classes.pagination}
                                        defaultCurrent={queryParams.page}
                                        defaultPageSize={6}
                                        total={totalData.length} 
                                        onChange={(page, pageSize)=>handlePageChange(page, pageSize)}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </Box>
    );
}

export default ListDoctorPage;