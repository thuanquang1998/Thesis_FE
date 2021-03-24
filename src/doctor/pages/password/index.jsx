import React,{ Component } from 'react';
import DashboardSidebar from '../sidebar/index';

class Password extends Component{
    render(){
        return(
            <div>
                <div className="breadcrumb-bar">
				<div className="container-fluid">
					<div className="row align-items-center">
						<div className="col-md-12 col-12">
							<nav aria-label="breadcrumb" className="page-breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="/home">Doctor</a></li>
									<li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
								</ol>
							</nav>
							<h2 className="breadcrumb-title">Profile Settings</h2>
						</div>
					</div>
				</div>
			</div>
            <div class="content">
				<div class="container-fluid">
					<div class="row">
					    <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                        < DashboardSidebar />
                       </div>

                       <div className="col-md-7 col-lg-8 col-xl-9">
                                <div className="card">
                                     <div className="card-body">
                                     <form>
												<div class="form-group">
													<label>Old Password</label>
													<input type="password" class="form-control" />
												</div>
												<div class="form-group">
													<label>New Password</label>
													<input type="password" class="form-control" />
												</div>
												<div class="form-group">
													<label>Confirm Password</label>
													<input type="password" class="form-control" />
												</div>
												<div class="submit-section">
													<button type="submit" class="btn btn-primary submit-btn">Save Changes</button>
												</div>
											</form>
                                         
                                     </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>      
            </div>
        );
   }
} 
export default Password;   
        

