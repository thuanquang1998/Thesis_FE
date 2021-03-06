import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
// import DoctorItem from '../../doctor-page/doctor-item'
import DoctorItem from '../../doctor/components/DoctorItem';



const HomeBookDoctor = (props)  => {
    const {data} = props;
    console.log('data HomeBookDoctor:>> ', data);

    const settings = {
        width:400,
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        centerPadding: '10px',
        arrows: true,
        centerMode: true,
             responsive: [
            {
                breakpoint: 690,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    
                }
            },
            {
                breakpoint: 1550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    
                }
            },
        ]
      };

        return(
            <section className="section section-doctor" style={{backgroundColor:"#f3f7ff"}}>
                <div className="container-fluid">
                <div className="row">
                        <div className="col-lg-4">
                            <div className="section-header" style={{display:"inline-block", marginLeft:"35%", paddingTop:"20px !important"}}>
                                <h2 style={{color:"#272b41"}}>Đội ngũ Bác sĩ</h2>
                                <hr style={{width:"200px", borderTop:"3px solid #f9a870"}}/>
                            </div>
                            <div className="about-content">
                                <p>Đội ngũ Bác sĩ ưu tú với thâm niên trung bình 10 năm kinh nghiệm hiện công tác tại các Bệnh viện hàng đầu Việt Nam, thăm khám trên nhiều chuyên khoa đa dạng, tận tâm chăm sóc bạn cùng gia đình.</p>
                                <Link to="/danh-sach-bac-si" >Xem thêm...</Link>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="doctor-slider slider">
                                <Slider {...settings}>
                                    {data && data.map((item,idx)=> {
                                        return (<DoctorItem key={idx} data={item}/>)
                                    })}
                                </Slider>   
                            </div>
                        </div>
                </div>
                </div>
            </section>
        );
}
export default HomeBookDoctor;