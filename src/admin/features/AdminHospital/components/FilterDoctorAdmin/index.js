import { Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
const { Option } = Select;
const { RangePicker } = DatePicker;
const {Search} = Input;

  
function FilterDoctorAdmin({onSearchDoctor, onSearchStatus, onSearchDate, listDoctor, filter}) {
    const [form] = Form.useForm();
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    
    const [loadingPage, setLoadingPage] = useState(true);
    const [listData, setListData] = useState({
        hospitals:[],
        specialities:[]
    })
    useEffect(()=> {
        if(loadingData===0 && appState.listAllSpecials.length !== 0){
            setListData({
                hospitals: appState.listAllHospitals.data,
                specialities: appState.listAllSpecials,
            });
            setLoadingPage(false);
        }
    },[loadingData])
   

    return (
        <div className="search-input">
            <Row gutter={[36,8]}>
                <Col xs={{span:24}} sm={{span:16}} md={{span:16}}>
                    <Select
                        placeholder="Tìm theo bác sĩ"
                        defaultValue=""
                        onChange={(e)=>onSearchDoctor(e)}
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="">Tất cả</Option>
                        {listDoctor.map((item,index)=>(
                            <Option key={index} value={item._id}>{item.fullName}</Option>
                        ))}
                    </Select>
                    
                </Col>
                <Col xs={{span:24}} sm={{span:8}} md={{span:8}}>
                    <RangePicker 
                        placeholder={["Từ ngày","Đến ngày"]}
                        onChange={onSearchDate}
                    />
                </Col>
            </Row>
            <Radio.Group 
                onChange={(e)=>onSearchStatus(e.target.value)}
                style={{marginTop:"15px"}}
                value={filter.searchStatus}
            >
                <Radio value={1}>Tất cả</Radio>
                <Radio value={2}>Chưa khám</Radio>
                <Radio value={3}>Đang khám</Radio>  
                <Radio value={4}>Đã khám</Radio>
            </Radio.Group>
        </div>
    );
}

export default FilterDoctorAdmin;
