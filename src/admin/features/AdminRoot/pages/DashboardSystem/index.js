import React, {useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar/index';
import { Button } from '@material-ui/core';
import adminAPI from '../../../../../api/adminAPI';

const DashboardSystem = () => {
	const handleCreateHos = async () => {
		/* dât check 4 field: name, phone, email, adminEmail*/		
		try {
			const response = await adminAPI.create_hospital();
			console.log('response :>> ', response);
		} catch (error) {
			console.log('error.message handleCreateHos:>> ', error.message);
		}
	}
	const handleCreateDoc = async () => {
		try {
			// const response = await adminAPI.
		} catch (error) {
			console.log('error.message handleCreateDoc:>> ', error.message);
		}
	}
    return (
        <>
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title">Welcome Admin!</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
								</ul>
								<h2>Dashboard Root</h2>
								<Button primary onClick={handleCreateHos}>Thêm bệnh viện</Button>
								<Button secondary onClick={handleCreateDoc}>Thêm bác sĩ</Button>

							</div>
						</div>
					</div>
                    
                    {/* dsafd */}

                </div>
            </div>

        </>
    )
}

export default DashboardSystem
