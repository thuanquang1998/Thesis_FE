import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Select, Form, Button } from 'antd';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import './style.css';
const { Option } = Select;
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
function SearchForm(props) {
    const [form] = Form.useForm();
    const specialities = useSelector(state=>state.admin.specialities_system)
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    // console.log('specialities :>> ', specialities);
    // console.log('list_hospitals :>> ', list_hospitals);
    
    const handleOnFinish = (values) => {
        // send data to list doctors
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
                        <Form.Item name="filterName" label="Tìm theo tên:" className="search__form--item">
                            <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
                        </Form.Item>
                        <Form.Item name="filterHospital" label="Tìm theo bệnh viện:" className="search__form--item">
                            <Select
                                placeholder="Tìm theo bệnh viện"
                            >
                                <Option value="all_hos">Tất cả</Option>
                                {list_hospitals && list_hospitals.map(item=>(
                                    <Option key={item.id} value={item.name}>{item.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="filterSpecialities" label="Tìm theo chuyên khoa:" className="search__form--item">
                            <Select
                                placeholder="Tìm theo chuyên khoa"
                            >
                                <Option value="all_spec">Tất cả</Option>
                                {specialities && specialities.map(item=>(
                                    <Option key={item.key} value={item.key}>{item.name}</Option>
                                ))}
                            </Select>
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
        // <div className="search-list">
        //     <h2 style={{color:"#0de0fe", fontWeight:"400"}}>Tìm kiếm bác sĩ của bạn</h2>
        //     <Row gutter={[16,16]} className="row_search">
        //         <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_hos">
        //             <Select
        //                 placeholder="Tìm theo bệnh viện"
        //             >
        //                 <Option value="all_hos">Tất cả</Option>
        //                 {list_hospitals && list_hospitals.map(item=>(
        //                     <Option key={item.id} value={item.id}>{item.name}</Option>
        //                 ))}
        //             </Select>
        //         </Col>
        //         <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_speci">
        //             <Select
        //                 placeholder="Tìm theo chuyên khoa"
        //             >
        //                 <Option value="all_spec">Tất cả</Option>
        //                 {specialities && specialities.map(item=>(
        //                     <Option key={item.name} value={item.name}>{item.name}</Option>
        //                 ))}
                       
        //             </Select>
        //         </Col>
        //         <Col xs={{span:24}} md={{span:24}} lg={{span:8}} className="col_name">
        //             <Input placeholder="Tìm theo tên" suffix={<SearchOutlined />}/>
        //         </Col>
        //     </Row>
        // </div>
    );
}

export default SearchForm;