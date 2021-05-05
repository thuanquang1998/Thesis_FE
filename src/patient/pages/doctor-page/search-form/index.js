import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
const { Option } = Select;

  
function SearchForm(props) {
    const [form] = Form.useForm();
    const appState = useSelector(state=>state.app);
    const loadingData = appState.loadingData;
    const handleOnFinish = (values) => {
        props.onFilterData(values)
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
                >   
                    <Col xs={{span:24}} sm={{span:24}} md={{span:24}} className="col_hos"> 
                        <Form.Item name="tenBs" label="Tìm theo tên:" className="search__form--item">
                            <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
                        </Form.Item>
                        <Form.Item name="bv" label="Tìm theo bệnh viện:" className="search__form--item">
                            {loadingData?
                                <Select
                                    placeholder="Tìm theo bệnh viện"
                                >
                                    <Option value="all-bv">Tất cả</Option>
                                </Select>
                                :<Select
                                    placeholder="Tìm theo bệnh viện"
                                >
                                    <Option value="all-bv">Tất cả</Option>
                                    {appState.listAllHospitals.map(item=>(
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>}
                        </Form.Item>
                        <Form.Item name="ck" label="Tìm theo chuyên khoa:" className="search__form--item">
                            {loadingData?
                                <Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                </Select>
                                :<Select
                                    placeholder="Tìm theo chuyên khoa"
                                >
                                    <Option value="all-ck">Tất cả</Option>
                                    {appState.listAllSpecials.map(item=>(
                                        <Option key={item.key} value={item.key}>{item.name}</Option>
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

export default SearchForm;