import { Input } from 'antd';
import React from 'react';
import './style.css';
const { Search } = Input;


const HospitalSearch = (props) => {
    function onSearch(value) {
        props.searchName(value);
    }
    return (
        <div className="container-fluid search-doctor" style={{padding:0}}>
            <div className="search-form container">
                <h2 style={{color:"rgb(39, 43, 65)", marginBottom:"30px"}}>Bệnh viện, phòng khám</h2>
                <div className="search-input">
                    <Search
                        placeholder="Tìm kiếm theo bệnh viện, phòng khám"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        onSearch={onSearch}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default HospitalSearch
