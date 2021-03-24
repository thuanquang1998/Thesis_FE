import { Input } from 'antd';
import React from 'react';
import './style.css';
const { Search } = Input;

function onSearch(val) {
  console.log('search:', val);
}
const SearchClinic = () => {
    return (
        <div className="container-fluid search-doctor" style={{padding:0}}>
            <div className="search-form container">
                <h2 style={{color:"white"}}>Bệnh viện, phòng khám</h2>
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

export default SearchClinic
