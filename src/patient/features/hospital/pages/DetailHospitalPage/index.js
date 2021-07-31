import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import { Card, Col, Row, Pagination } from 'antd';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import backgroundHospital from '../../../../assets/img/hospital_background.jpg';
import logoHospital from '../../../../assets/img/hospital_logo.png';
import DoctorList from '../../../doctor/components/DoctorList';
import './style.css';
import queryString from 'query-string';
import HospitalFilter from './HospitalFilter';
import { makeStyles } from '@material-ui/core/styles';
import LoadingTop from '../../../../components/loadingTop';

const useStyles = makeStyles((theme) => ({
    pagination: {
        marginTop:"30px",
        textAlign: 'center',
        '& li': {
            borderRadius: "50%",
        },
        '& li button': {
            border: 'none !important'
        },
        '& .ant-pagination-item-link': {
            background: 'none'
        }
    }
  }));

const DetailHospitalPage = () => {
    const patient = useSelector(state=>state.patient);

    const classes = useStyles();

    const location = useLocation();
    const history = useHistory();
    const data = location.state;

    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const [renderDoctor, setRenderDoctor] = useState([]);
    const [totalDoctor, setTotalDoctor] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);

    const [info, setInfo] = useState({});

    const [filter, setFilter] = useState({
        search:'',
        sort: '',
        page: 1, 
        limit: 6
    });

    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    useEffect(()=>{
        const {search, sort, page, limit} = filter;
        const id=location.pathname.split("/")[2];
        const findHos = appState.listAllHospitals.data.filter(item=>item._id===id);
        setInfo(findHos[0]);

        let _renderData = [];
        if(loadingData===0 && appState.listAllDoctors.length!==0) {
            const _doctor = [...appState.listAllDoctors];
            _renderData = _doctor.filter((item,idx)=>{
                return item.hospital_info._id.toLowerCase().includes(id.toLowerCase())===true;
            })
        } else {
            _renderData=[];
        }

        // filter and sort
        const dataName = _renderData.filter(item=>{
            const check = item.fullName.toLowerCase().includes(search.toLowerCase());
            return check;
        });
        const dataSort = dataName.filter(item=>item.spec_detail._id.includes(sort));

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
        const paginationData = dataSort.slice(min, max);
        setTotalDoctor(dataSort);
        setRenderDoctor(paginationData);
        setTimeout(() => {
            setLoadingPage(false);
        }, 300);
    },[location, filter]);

    const onSearchSpec = (data) => {
        setFilter({
            ...filter,
            sort: data,
        })
    }
    const onSearchName = (data) => {
        console.log('data onSearchName:>> ', data);
        setFilter({
            ...filter,
            search: data,
        })
    }
    const handlePageChange = (e, pageSize) => {
        setFilter({
            ...filter,
            page: e,
            limit: pageSize,
        })
    }
    return (
        <div>
            {loadingPage && <LoadingTop/>}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-benh-vien'>Danh sách phòng khám</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{info.name}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">{info.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
        <div className="content">
                <div className="container-fluid">
                    <div className="profile">
                        <div className="profile__img">
                                <img src={backgroundHospital} alt="background hospital"/>
                        </div>
                        <div className="info">
                            <Row>
                                <Col xs={{span:10}} sm={{span:7}} md={{span:5}} lg={{span:4}}>
                                    <div className="profile__logo">
                                        <img src={logoHospital}></img>
                                    </div>
                                </Col>
                                <Col xs={{span:14}} sm={{span:17}} md={{span:19}} lg={{span:20}}>
                                    <h3 className="title">{info.name}</h3>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            <Card title="Thông tin cơ bản" headStyle={{fontSize:"18px", color:"#1890ff"}} className="info-title">
                                    <ul style={{listStyleType:"none", paddingLeft:"5px"}}>
                                        <li>
                                            <span><RoomIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                            {info.address||""}
                                        </li>
                                        <li>
                                            <span><PhoneIcon style={{color:"#17a6df", marginRight:"10px"}}/></span>
                                           {info.phone||""}
                                        </li>
                                    </ul> 
                                </Card> 
                                <Card title="Giới thiệu" headStyle={{fontSize:"18px", color:"#1890ff"}} className="intro">
                                    <div dangerouslySetInnerHTML={{__html: info.about}}></div>
                                </Card> 
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <HospitalFilter 
                                idHos={info.id} 
                                onSearchName={onSearchName}
                                onSearchSpec={onSearchSpec}
                            />
                            <div >
                                {renderDoctor.length===0?
                                    <div style={{minHeight:"300px", margin:"0 auto"}}>
                                        <h3 style={{margin:'0 auto'}}>Đã tìm thấy: 0 bác sĩ</h3>
                                    </div>
                                    :<DoctorList doctors={renderDoctor}/>
                                }
                            </div>
                            <Pagination 
                                className={classes.pagination}
                                defaultCurrent={filter.page}
                                defaultPageSize={6}
                                total={totalDoctor.length} 
                                onChange={(page, pageSize)=>handlePageChange(page, pageSize)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailHospitalPage
