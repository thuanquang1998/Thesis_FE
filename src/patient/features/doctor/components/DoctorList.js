import React, { useState, useEffect} from 'react';
import { Box, Grid } from '@material-ui/core';
import DoctorItem from './DoctorItem';
import { Col, Row, Select, Input } from 'antd'

function DoctorList({ doctors = [] }) {
    const check = doctors.length;
    const [renderData, setRenderData] = useState([]);
    useEffect(()=> {
        if (doctors.length !==0) {
            const _doctors = [...doctors];
            const new_doctors = _doctors.filter(x=>x.timeWorkIsNull===false);
            setRenderData(new_doctors);
        } else {
            setRenderData([])
        }
    },[doctors])
    return (
        <>
            {check === 0?
                <h2></h2>
                :
                <Row gutter={[24, 24]} style={{paddingTop:"0px"}}>
                    {renderData && renderData.map((item,idx)=>(
                        <Col key={idx} xs={{span:24}} sm={{span:24}} md={{span:12}} xl={{span:8}}>
                            <DoctorItem key={idx} data={item}/>
                        </Col>
                    ))}
                </Row>
            }
        </>
        
    );
}

export default DoctorList;