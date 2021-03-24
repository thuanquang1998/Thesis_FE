import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import logo_female from '../../../assets/img/female_logo.png';
import logo_male from '../../../assets/img/male_logo.png';
import DoctorItem from '../../doctor-page/doctor-item'



const HomeBookDoctor = ()  => {

    const array = [1,2,3,4,5,6,1,2,3,4,5,6,8]
    const settings = {
        width:400,
        dots:false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerPadding: '10px',
        arrows: true,
        centerMode: true,
             responsive: [
            {
                breakpoint: 600,
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
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    
                }
            },
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    
                }
            },
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    
                }
            }
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
                                <Link to="/patient/doctor-list" >Xem thêm...</Link>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="doctor-slider slider">
                                <Slider {...settings}>
                                    {array.map((index,item)=> {
                                        if (item%2===0)
                                        {
                                        return (<DoctorItem key={index} img={logo_male}/>)
                                    } else {
                                        return <DoctorItem key={index} img={logo_female}/>
                                    }  
                                    })}
                                </Slider>   
                            </div>
                        </div>
                </div>
                </div>
            </section>


            // <section className="section section-doctor">
            //     <div className="container-fluid ">
            //         <div className="section-header col-lg-10" style={{margin: "0 auto",display:"flex", justifyContent:"flex-start", position:"relative"}}>
            //             <h3>Bác sĩ nổi bật</h3>
            //             <Link style={{position:"absolute", right:0}}>Xem thêm</Link>
            //         </div>
            //         <div className="row">
            //             <div className="col-lg-10" style={{margin:"0 auto"}}>
            //                 <div className="doctor-slider slider">
                            
            //                 <Slider {...settings}>
            //                     {array.map(item=> {
            //                         if (item%2===0)
            //                         {
            //                         return (<DoctorItem img={logo_male}/>)
            //                     } else {
            //                         return <DoctorItem img={logo_female}/>
            //                     }  
            //                     })}
            //                 </Slider>    
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </section>
        );
}
export default HomeBookDoctor;