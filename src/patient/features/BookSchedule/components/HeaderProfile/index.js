import { Card, Col, Row } from 'antd'
import React from 'react'
import { formatPrice } from '../../../../../utils'
import departLogo from '../../../../assets/img/depart.png'
import hospitalLogo from '../../../../assets/img/hospital.png'
import location from '../../../../assets/img/location.png'
import price from '../../../../assets/img/price.png'

function HeaderProfile({data = {}}) {
    return (
        <Card className="header-profile">
            <Row gutter={[10,10]}>
                <Col span={4}>
                    <div className="avatar">
                        <img src={data.avatar} alt="logoDoctor"/>
                    </div>
                    {/* <Rate value={3} /> */}
                </Col>
                <Col span={14} className="infoDoctor">
                    <div className="header-info">
                        <h4 className="chucDanh">{data.title}</h4>
                        <h3 className="tenBs">{data.fullName}</h3>
                    
                    <ul className="available-info">
                        <li>
                            <span><img src={departLogo} alt="Nội tiết"/></span>
                            <span>{data.spec_detail?.name}</span>
                        </li>
                        <li>
                            <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                            <span>{data.hospital_info?.name}</span>
                        </li>
                        <li>
                            <span><img src={location} alt="Nội tiết"/></span>
                            <span> {data.hospital_info?.address} </span>
                        </li>
                        <li>
                            <span><img src={price} alt="Nội tiết"/></span>
                            <span>{formatPrice(data.price)}</span>
                        </li>
                    </ul>
                </div>
                </Col>
            </Row>
        </Card>
    );
}

export default HeaderProfile;