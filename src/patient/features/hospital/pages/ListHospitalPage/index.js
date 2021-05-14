import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import HospitalSearch from '../../components/HospitalSearch';
import HospitalList from '../../components/HospitalList';
// import HospitalList from './list-hospital'
// import SearchClinic from './search-clinic'

const ListHospitalPage = () => {
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const [renderData, setRenderData] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(() => {
        if (loadingData === 0 && appState.listAllHospitals.length !==0) {
            const _data = [...appState.listAllHospitals];
            const _renderData = _data.filter((item,idx)=>{
                    return item.name.toLowerCase().includes(filter.toLowerCase())===true;
            })
            setRenderData(_renderData);
        } 
    }, [filter, loadingData])
    const onHandleSearch = (value) => {
        setFilter(value)
    }
    return (
        <>
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
            {loadingData? 
                <div>Loading Page</div>
                :<HospitalList data={renderData}/>
            }
        </>
    )
}

export default ListHospitalPage
