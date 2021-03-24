import React from 'react'
import { Link } from 'react-router-dom'
import HospitalList from './list-hospital'
import SearchClinic from './search-clinic'
const HospitalPage = () => {
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
                        <h2 className="breadcrumb-title">Danh sách phòng khám</h2>
                    </div>
                </div>
            </div>
        </div>
         <SearchClinic/>
         <HospitalList/>
        </>
        
    )
}

export default HospitalPage
