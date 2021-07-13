import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Select, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const { Option } = Select;

  
function HospitalFilter({filters, onChange}) {
    const [form] = Form.useForm();
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    
    const [loadingPage, setLoadingPage] = useState(true);
    const [listData, setListData] = useState({
        hospitals:[],
        doctors:[]
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
   

    const handleOnFinish = (values) => {
        const { tenBs, ck, bv } = values;
        const newFilters = {
            ...filters,
            tenBs: tenBs?tenBs:'',
            bv: bv?bv:'all-bv',
            ck: ck?ck:'all-ck'
        };
        onChange(newFilters)
    }   
    return (
        <Card>
            <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
           {/* {loadingPage? */}
                                <Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                </Select>
                                :<Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                    {/* {listData.specialities.map(item=>(
                                        <Option key={item.key} value={item._id}>{item.name}</Option>
                                    ))} */}
                                </Select>
                            {/* } */}
        </Card>
    );
}

export default HospitalFilter;