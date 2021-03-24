import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from 'antd'
import HospitalItem from '../hospital-item'
// import { get_list_hospitals } from '../../../../actions/adminActions'
import { get_list_hospitals} from '../../../../actions/adminActions'
const array = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

const HospitalList = () => {
    const dispatch = useDispatch()
    const list_hospitals = useSelector(state=>state.admin.list_hospital)
    useEffect(()=> {
      dispatch(get_list_hospitals())
    },[])
    return (
        <div className="container" style={{margin: "0 auto", paddingBottom:"50px"}}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    {list_hospitals && list_hospitals.map(item=> (
                        <HospitalItem data = {item}/>
                    ))}
                </Col>
            </Row>
        </div>
    )
}

export default HospitalList
