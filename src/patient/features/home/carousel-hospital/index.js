import React from 'react';
import Slider from "react-slick";
import iconHospital from '../../../assets/img/icon_hospital.jpg';
import {Link} from 'react-router-dom'
import './style.css';

const settings = {
    // className: "center",
    width:400,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "10px",
    arrows: true,
    responsive: [
      {
          breakpoint: 800,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              centerPadding: "0px",
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


const CardHospital = (props) => {
    const {data} = props;
    return (
        <Link 
          to={{
            pathname:`/chi-tiet-benh-vien/${data._id}`,
            state: data 
          }}
        >
           <div className="feature-item text-center" style={{textAlign: 'center'}}>
                <img src={props.data && props.data.logo} className="img-fluid" alt="Feature" />
                <p>{props.data && props.data.name}</p>
            </div>
        </Link>
    )
}
const HomeHospital = (props) => {
  console.log('data CardHospital:>> ', props.data);

    return (
        <section className="section section-features">
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-5 features-img">
              <img src={iconHospital} className="img-fluid" alt="Feature" />
            </div>
            <div className="col-md-7">
              <div className="section-header" style={{display:"inline-block", marginLeft:"38%"}}>
                <h2 className="mt-2" style={{color:"#272b41", fontWeight:"500"}}>Cơ sở y tế</h2>
                <hr style={{width:"120px", borderTop:"3px solid #f9a870"}}/>
              </div>
              <div className="features-slider slider" style={{marginTop:"20px"}}>
                <Slider {...settings}>
                    {props.data && props.data.map(item=>(
                        <CardHospital key={item.id} data={item}/>
                    ))}
                </Slider>
              </div>
            </div>
          </div> 
        </div>
      </section>
       
    )
}

export default HomeHospital

