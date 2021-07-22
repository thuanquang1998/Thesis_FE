import React from 'react';
import ProgressBar from 'react-customizable-progressbar';
import doctorLogo from '../../../../../assets/img/doctor.png';


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
                                    <div className="indicator-volume" style={{width:"50px", height:"50px", margin: "0 auto"}}>
                                        <img src={doctorLogo} className="img-fluid" alt="Patient"/>
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <h6>Bác sĩ</h6>
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
                                <div className="indicator-volume">
                                    <img src="" className="img-fluid" alt="Patient" />
                                </div>
                            </ProgressBar>
                                <div className="dash-widget-info">
                                    <h6>Chuyên khoa</h6>
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
                                    <div className="indicator-volume">
                                        <img src="" className="img-fluid" alt="Patient" />
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <h6>Lượt đặt khám</h6>
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
                                    trackStrokeWidth={8}
                                    trackStrokeColor="#e6e6e6"
                                    trackStrokeLinecap="square"
                                    pointerRadius={0}
                                    initialAnimation={true}
                                    transition="1.5s ease 0.5s"
                                    trackTransition="0s ease"
                                >
                                    <div className="indicator-volume">
                                        <img src="" className="img-fluid" alt="Patient" />
                                    </div>
                                </ProgressBar>
                                <div className="dash-widget-info">
                                    <h6>Doanh thu</h6>
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