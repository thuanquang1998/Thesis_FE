import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
const { Option } = Select;

  
function ProductFilter({filters, onChange}) {

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
        <div className="card search-filter" style={{marginBottom:"40px"}}>
            <div className="card-header">
                <h4 className="card-title mb-0">Lọc</h4>
            </div>
            <div className="card-body">
                <Form
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="vertical"
                    size="large"
                    onFinish={handleOnFinish}
                    initialValues = {
                        {
                            tenBs:`${filters.tenBs || ""}`,
                            ck:`${filters.ck || 'all-ck'}`,
                            bv:`${filters.bv || 'all-bv'}`
                        }

                    }
                >   
                    <Col xs={{span:24}} sm={{span:24}} md={{span:24}} className="col_hos"> 
                        <Form.Item name="tenBs" label="Tìm theo tên:" className="search__form--item">
                            <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
                        </Form.Item>
                        <Form.Item name="bv" label="Tìm theo bệnh viện:" className="search__form--item">
                            {loadingPage?
                                <Select
                                    placeholder="Tìm theo bệnh viện"
                                >
                                    <Option value="all-bv">Tất cả</Option>
                                </Select>
                                :<Select
                                    placeholder="Tìm theo bệnh viện"
                                >
                                    <Option value="all-bv">Tất cả</Option>
                                    {listData.hospitals.map(item=>(
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>}
                        </Form.Item>
                        <Form.Item name="ck" label="Tìm theo chuyên khoa:" className="search__form--item">
                            {loadingPage?
                                <Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                </Select>
                                :<Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                    {listData.specialities.map(item=>(
                                        <Option key={item.key} value={item._id}>{item.name}</Option>
                                    ))}
                                </Select>
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button
                                style={{
                                margin: '0 8px',
                                }}
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Clear
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Col>
                </Form>
            </div>
        </div>
    );
}

export default ProductFilter;