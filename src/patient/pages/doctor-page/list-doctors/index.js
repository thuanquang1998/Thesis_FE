import React from 'react';
import { Col, Row, Select, Input } from 'antd'
import logoDoctor from '../../../assets/img/bsnam.jpg';
import DoctorItem from '../doctor-item'
function ListDoctor(props) {
    const list_doctors = props.list_doctors;
    const check = list_doctors.length;
    return (
        <>
        {check === 0?
            <h2>Không tìm thấy bác sĩ</h2>
            :
            <Row gutter={[16, 16]} style={{paddingTop:"0px"}}>
                {list_doctors && list_doctors.map((item,idx)=>(
                    <Col key={idx} xs={{span:24}} sm={{span:12}} md={{span:8}} xl={{span:6}}>
                        <DoctorItem key={idx} img={logoDoctor} data={item}/>
                        {/* </Link> */}
                    </Col>
                ))}
            </Row>
        }
        </>
        
    );
}

export default ListDoctor;