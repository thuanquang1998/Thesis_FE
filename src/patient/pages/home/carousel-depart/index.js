import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import './style.css';

const HomeDepart = (props) => {
    const specialities = props.data;
    const settings = {
        dots:true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerPadding: '10px',
        arrows: false,
        centerMode: true,
        responsive: [
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    
                }
            },
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    
                }
            }
        ]
        };
    return(
        <section className="section section-specialities">
            <div className="container-fluid">
                <div className="section-header text-center" style={{paddingTop:"50px"}}>
                    <h2 style={{color:"#272b41", fontWeight:"500", fontFamily:"Lora"}}>Chuyên khoa phổ biến</h2>
                    <hr style={{width:"200px", borderTop:"3px solid #f9a870"}}/>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="specialities-slider slider">
                            <Slider {...settings}>
                                {specialities && specialities.map((item,idx) => (
                                    <div>
                                        <div className="speicality-item text-center">
                                            <div className="speicality-img" style={{margin:"0 auto", cursor:"pointer"}}>
                                                <Link to="/linkck">
                                                    <img key={idx} src={item.image} className="img-fluid" alt="Speciality"/>
                                                </Link>
                                            </div>
                                            <Link to="/linkck">{item.name}</Link>
                                        </div>	
                                    </div>
                                ))}
                            </Slider>
                        </div>    
                    </div>
                </div>
            </div>   
        </section>
    );
}

export default HomeDepart;