import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import doctorLogo from '../../../../../assets/img/doctor.png';
import specLogo from '../../../../../assets/img/spec.png';
import appointmentLogo from '../../../../../assets/img/appointment.png'
import revenueLogo from '../../../../../assets/img/revenue.png'
import {Link} from 'react-router-dom';

function HeaderHospital(props) {
    return (
        <div className="row">
        <div className="col-md-12">
            <div className="card dash-card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 col-lg-3">
                            <div className="dash-widget dct-border-rht">
                                <ProgressBar
                                    width={20}
                                    radius={100}
                                    progress={100}
                                    rotate={-210}
                                    strokeWidth={16}
                                    strokeColor="#da3f81"
                                    strokeLinecap="square"
                                    trackStrokeWidth={8}
                                    trackStrokeColor="#e6e6e6"
                                    trackStrokeLinecap="square"
                                    pointerRadius={0}
                                    initialAnimation={true}
                                    transition="1.5s ease 0.5s"
                                    trackTransition="0s ease"
                                >
                                    <div className="indicator-volume" style={{width:"40px", height:"40px", margin: "0 auto"}}>
                                        <img src={doctorLogo} className="img-fluid" alt="Patient"/>
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <Link
                                        style={{fontSize:"18px", fontWeight:"600", color:"#272b41"}}
                                        to="/admin/hospital/ds-bac-si"
                                    >Bác sĩ</Link>
                                    <h3>{props.data.num_doctor}</h3>
                                    <p className="text-muted">Tổng số</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                            <div className="dash-widget dct-border-rht">
                            <ProgressBar
                                width={20}
                                radius={100}
                                progress={100}
                                rotate={-210}
                                strokeWidth={16}
                                strokeColor="#68dda9"
                                strokeLinecap="square"
                                trackStrokeWidth={8}
                                trackStrokeColor="#e6e6e6"
                                trackStrokeLinecap="square"
                                pointerRadius={0}
                                initialAnimation={true}
                                transition="1.5s ease 0.5s"
                                trackTransition="0s ease"
                            >
                                <div className="indicator-volume" style={{width:"40px", height:"40px", margin: "0 auto"}}>
                                    <img src={specLogo} className="img-fluid" alt="Patient" />
                                </div>
                            </ProgressBar>
                                <div className="dash-widget-info">
                                    <Link
                                        style={{fontSize:"18px", fontWeight:"600", color:"#272b41"}}
                                        to="/admin/hospital/chuyen-khoa"
                                    >Chuyên khoa</Link>
                                    <h3>{props.data.num_spec}</h3>
                                    <p className="text-muted">Tổng số</p>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-md-12 col-lg-3">
                            <div className="dash-widget">
                                <ProgressBar
                                    width={20}
                                    radius={100}
                                    progress={100}
                                    rotate={-210}
                                    strokeWidth={16}
                                    strokeColor="#1b5a90"
                                    strokeLinecap="square"
                                    trackStrokeWidth={8}
                                    trackStrokeColor="#e6e6e6"
                                    trackStrokeLinecap="square"
                                    pointerRadius={0}
                                    initialAnimation={true}
                                    transition="1.5s ease 0.5s"
                                    trackTransition="0s ease"
                                >
                                    <div className="indicator-volume" style={{width:"40px", height:"40px", margin: "0 auto"}} >
                                        <img src={appointmentLogo} className="img-fluid" alt="Patient" />
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <Link
                                        style={{fontSize:"18px", fontWeight:"600", color:"#272b41"}}
                                        to="/admin/hospital/lich-kham"
                                    >Lượt đặt khám</Link>
                                    <h3>{props.data.num_appointment}</h3>
                                    <p className="text-muted">Tổng số</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                            <div className="dash-widget">
                                <ProgressBar
                                    width={20}
                                    radius={100}
                                    progress={100}
                                    rotate={-210}
                                    strokeWidth={16}
                                    strokeColor="yellow"
                                    strokeLinecap="square"
                                    trackStrokeWidspecLogoecap="square"
                                    pointerRadius={0}
                                    initialAnimation={true}
                                    transition="1.5s ease 0.5s"
                                    trackTransition="0s ease"
                                >
                                    <div className="indicator-volume" style={{width:"40px", height:"40px", margin: "0 auto"}}>
                                        <img src={revenueLogo} className="img-fluid" alt="Patient" />
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <Link
                                        style={{fontSize:"18px", fontWeight:"600", color:"#272b41"}}
                                        to="/admin/hospital/lich-kham"
                                    >Doanh thu</Link>
                                    <h3>{props.data.revenue} VND</h3>
                                    <p className="text-muted">Tổng số</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    );
}

export default HeaderHospital;