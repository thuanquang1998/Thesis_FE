import { Col, Row } from 'antd'
import React from 'react'
import HospitalItem from '../HospitalItem'

const HospitalList = (props) => {
    const listAllHospitals = props.data; 
    return (
        <div className="container" style={{margin: "0 auto", paddingBottom:"50px"}}>
             {listAllHospitals.length === 0?
            <h2>Không tìm thấy Cơ sở y tế</h2>
            :
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    {listAllHospitals.map((item,idx)=> (
                        <HospitalItem key={idx} data = {item}/>
                    ))}
                </Col>
            </Row>
        }
        </div>
    )
}

export default HospitalList
