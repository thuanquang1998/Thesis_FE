import React from 'react'
import SidebarNav from '../sidebar'
const Dashboard = () => {
	console.log("Dashboard");
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
							</div>
						</div>
					</div>
                    
                    {/* dsafd */}

                </div>
            </div>

        </>
    )
}

export default Dashboard
