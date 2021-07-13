import { makeStyles } from '@material-ui/core/styles';
import { Card, Pagination, Spin } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoadingTop from '../../../../components/loadingTop';
import HospitalList from '../../components/HospitalList';
import HospitalSearch from '../../components/HospitalSearch';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  loadingSpin: {
    height: "500px",
    textAlign: "center",
    paddingTop: "40px",
    '& div': {
        marginRight: "20px"
    }
  },
  pagination: {
    textAlign: 'center',
    '& li': {
        borderRadius: "50%",
        
    },
    '& li button': {
        border: 'none !important'
    }
  }
}));

const ListHospitalPage = () => {

    const history = useHistory();
    const location = useLocation();

    
    const classes = useStyles();
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const [defaultData, setDefaultData] = useState([]);
    const [renderData, setRenderData] = useState([]);
    const [filter, setFilter] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);
 

    const queryParams = useMemo(()=>{
        const params = queryString.parse(location.search);
        return {
            ...params,
            page: Number.parseInt(params.page) || 1, 
            limit: Number.parseInt(params.limit) || 3,
        }
    },[location.search]);

    useEffect(() => {
        const {page, limit, search} = queryParams;
        setLoadingPage(true);
        if (loadingData === 0) {
            const _data = [...appState.listAllHospitals.data];
            let _renderDataTemp=[];
            if(!search) {
                _renderDataTemp=[..._data]
            } else {
                _renderDataTemp = _data.filter((item,idx)=>{
                    return item.name.toLowerCase().includes(search.toLowerCase())===true;
                })
            }
            let min = 0;
            let max = 0;
            if (page===1){
                min = 0;
                max = limit;
            } else {
                min = limit*(page-1);
                max = limit*page;
            }
            const _renderData = _renderDataTemp.slice(min, max);
            setTimeout(() => {
                setLoadingPage(false)
            }, 500);
            setDefaultData(_renderDataTemp);
            setRenderData(_renderData);
        } 
    }, [queryParams, loadingData])

    const onHandleSearch = (value) => {
        const filters = {
            ...queryParams,
            search:value,
        }
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters)
        })
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
        <>  
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Danh sách phòng khám</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">Danh sách Cơ sở y tế</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <HospitalSearch searchValue={filter.search} searchName={onHandleSearch}/> 
                        {loadingPage? 
                        <div className={classes.loadingSpin} style={{margin:'0 auto'}}>
                            <Spin size="large"/>
                            <Spin size="large"/>
                            <Spin size="large"/>
                        </div>:
                        <div style={{display: 'flex', flexDirection:"column", margin: '0 auto'}}>
                            {/* <h4>{`${defaultData.length} bệnh viện được tìm thấy`} </h4> */}
                            <HospitalList data={renderData}/>
                            <Pagination 
                                className={classes.pagination}
                                defaultCurrent={queryParams.page}
                                defaultPageSize={3}
                                total={defaultData.length} 
                                onChange={(page, pageSize)=>handlePageChange(page, pageSize)}
                            />
                        </div>}
                    </div>
                </div>
            </div>
            {/* <Card> */}
                
            {/* </Card> */}
        </>
    )
}

export default ListHospitalPage
