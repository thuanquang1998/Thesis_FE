import { Card } from '@material-ui/core'
import { Badge, Button, Table } from 'antd'
import React from 'react'
import SidebarNav from '../../sidebar'
const DoctorList = () => {
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Danh sách bác sĩ</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
									<li className="breadcrumb-item active">Danh sách bác sĩ</li>
								</ul>
							</div>
						</div>
					</div>
                    
                    <Card 
						title={<>Danh sách bệnh viện <Badge count="10" style={{ backgroundColor: '#52c41a' }} /></>}
						extra={
						<a href="/admin/cosoyte/them-bv">
							<Button type="primary">Tạo mới bệnh viện</Button>
						</a>
                    }>
						<Table
						bordered={true}
						// scroll={{ y: 1000, x: 2000 }}
						// loading={loading}
						// columns={columns}
						// pagination={true}
						// dataSource={partner.data} 
						/>
						<br />
						<div className="d-flex flex-row-reverse">
						{/* {renderPaginate()} */}
						</div>
						<br />
					</Card>

                </div>
            </div>

        </>
    )
}

export default DoctorList
