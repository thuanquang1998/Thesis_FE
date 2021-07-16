import { Input } from 'antd';
import React from 'react';
import './style.css';
const { Search } = Input;


const ScheduleSearch = (props) => {
    function onSearch(value) {
        setTimeout(() => {
            props.searchName(value);
        }, 300);
    }
    return (
        <div className="container-fluid search-schedule">
            <div className="search-form">
                <div className="search-input">
                    <Search
                        placeholder="Tìm theo tên bệnh nhân"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        onSearch={onSearch}
                        defaultValue={props.searchValue}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default ScheduleSearch
