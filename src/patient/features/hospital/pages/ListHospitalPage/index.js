import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HospitalSearch from '../../components/HospitalSearch';
import HospitalList from '../../components/HospitalList';
import LoadingTop from '../../../../components/loadingTop';

const ListHospitalPage = () => {
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const [renderData, setRenderData] = useState([]);
    const [filter, setFilter] = useState('');
    const [loadingPage, setLoadingPage] = useState(true);

    useEffect(() => {
        setLoadingPage(true);
        if (loadingData === 0) {
            const _data = [...appState.listAllHospitals.data];
            const _renderData = _data.filter((item,idx)=>{
                    return item.name.toLowerCase().includes(filter.toLowerCase())===true;
            })
            setTimeout(() => {
                setLoadingPage(false)
            }, 500);
            setRenderData(_renderData);
        } 
    }, [filter, loadingData])

    const onHandleSearch = (value) => {
        setFilter(value)
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
            <HospitalSearch searchName={onHandleSearch}/> 
            {loadingPage? 
                <div>...</div>
                :<HospitalList data={renderData}/>
            }
        </>
    )
}

export default ListHospitalPage
