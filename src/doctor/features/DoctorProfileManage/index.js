import React, { useState } from 'react';
import DoctorSidebar from '../../components/DoctorSideBar';
import { Link } from 'react-router-dom';
import StickyBox from "react-sticky-box";

const DoctorProfile = () =>{
        return(
            <div>
                <div className="breadcrumb-bar">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-md-12 col-12">
                                <nav aria-label="breadcrumb" className="page-breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                                <h2 className="breadcrumb-title">Dashboard</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                                <StickyBox offsetTop={20} offsetBottom={20}>
                                    <DoctorSidebar />
                                </StickyBox>
                            </div>
                            <div className="col-md-7 col-lg-8 col-xl-9">
                                DoctorProfile
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
           
        )
     }


export default DoctorProfile;
     