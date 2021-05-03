import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.css'
const HomeSearch = () => {
    return (
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center" style={{marginTop: "80px"}}>
                        <h1>BKCare, Ứng dụng đặt lịch khám hàng đầu Việt Nam</h1>
                        <h3>Tìm bác sĩ nhanh chóng, đặt lịch khám dễ dàng</h3>
                    </div>
            
                    {/* <div className="search-box">
                        <form action="/home">
                            <div className="form-group search-location">
                                <input type="text" className="form-control" placeholder="Search Location" />
                                <span className="form-text">Based on your Location</span>
                            </div>
                            <div className="form-group search-info">
                                <input type="text" className="form-control" placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc" />
                                <span className="form-text">Ex : Dental or Sugar Check up etc</span>
                            </div>
                            <button type="submit" className="btn btn-primary search-btn">  
                                <FontAwesomeIcon icon={faSearch} /> <span>Search</span></button>
                        </form>
                    </div> */}
                    
                </div>
            </div>
        </section>
    )
}

export default HomeSearch;
	
    