import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Select, Card, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css'
const { Option } = Select;
const {Search} = Input;

  
function HospitalFilter({filters, onSearchName, onSearchSpec}) {
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
                    <Search
                        placeholder="Tìm kiếm theo tên"
                        allowClear
                        enterButton="Tìm bác sĩ"
                        size="large"
                        onSearch={(e)=>onSearchName(e)}
                        // defaultValue={}
                    />
                </Col>
                <Col xs={{span:24}} sm={{span:8}} md={{span:8}}>
                    {loadingPage?
                    <Select
                        placeholder="Tìm theo chuyên khoa"
                    >
                        <Option value="all-ck">Tất cả</Option>
                    </Select>:
                    <Select
                        placeholder="Tìm theo chuyên khoa"
                        defaultValue=""
                        onChange={(e)=>onSearchSpec(e)}
                    >
                        <Option value="">Tất cả</Option>
                        {listData.specialities.map((item,index)=>(
                            <Option key={index} value={item._id}>{item.name}</Option>
                        ))}
                    </Select>
                    }
                    
                </Col>

            </Row>
        </div>
    );
}

export default HospitalFilter;