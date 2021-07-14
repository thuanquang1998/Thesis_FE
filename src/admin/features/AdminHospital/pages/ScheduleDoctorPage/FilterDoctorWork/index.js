import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Select, Card, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.css'
const { Option } = Select;
const {Search} = Input;

  
function FilterDoctorWork({changeSpec, changeDoctor, loadData, listSpec, listDoctor, filter,valueDoctor}) {
    const {loadSpec, loadDoctor} = loadData;

   
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
                
                <Col xs={{span:24}} sm={{span:8}} md={{span:8}}>
                    {loadSpec?
                    <Select
                        placeholder="Tìm theo chuyên khoa"
                        loading={loadSpec}
                        defaultValue="all"
                    >
                        <Option value="">Tất cả</Option>
                    </Select>:
                    <Select
                        placeholder="Chọn chuyên khoa"
                        // value={filter.spec}
                        onChange={(e)=>changeSpec(e)}
                    >
                        <Option value="all">Tất cả</Option>
                        {listSpec.map((item,index)=>(
                            <Option key={index} value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
                    }
                    
                </Col>
                <Col xs={{span:24}} sm={{span:16}} md={{span:16}}>
                    <Select
                        placeholder="Chọn bác sĩ"
                        value={valueDoctor}
                        onChange={(e)=>changeDoctor(e)}
                        loading={loadDoctor}
                    >
                        {listDoctor.map((item,index)=>(
                            <Option key={index} value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>

            </Row>
        </div>
    );
}

export default FilterDoctorWork;
