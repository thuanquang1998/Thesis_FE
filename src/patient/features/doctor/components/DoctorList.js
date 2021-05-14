import React from 'react';
import { Box, Grid } from '@material-ui/core';
import DoctorItem from './DoctorItem';
import { Col, Row, Select, Input } from 'antd'

function DoctorList({ doctors = [] }) {
    const check = doctors.length;
    return (
        <>
            {check === 0?
                <h2></h2>
                :
                <Row gutter={[16, 16]} style={{paddingTop:"0px"}}>
                    {doctors && doctors.map((item,idx)=>(
                        <Col key={idx} xs={{span:24}} sm={{span:12}} md={{span:8}} xl={{span:6}}>
                            <DoctorItem key={idx} data={item}/>
                        </Col>
                    ))}
                </Row>
            }
        </>
        
    );
}

export default DoctorList;