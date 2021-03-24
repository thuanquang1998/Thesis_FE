import React from 'react'
import {Link } from 'react-router-dom'
import { Icon01, Icon02, Icon03, IMG01, IMG02, IMG03, IMG04, IMG05, IMG06} from './img';

const ApptRow =()=>{
    return(
        <tr>
            <td>
                <h2 className="table-avatar">
                <Link to="/doctor/patient-profile" className="avatar avatar-sm mr-2">
                <img className="avatar-img rounded-circle" src={IMG01} alt="User" /></Link>
                <Link to="/doctor/patient-profile">Richard Wilson 
                <span>#PT0016</span></Link>
                </h2>
            </td>
            <td>11 Nov 2019 <span className="d-block text-info">10.00 AM</span></td>
            <td>General</td>
            <td>New Patient</td>
            <td className="text-center">$150</td>
            <td className="text-right">
                <div className="table-action">
                    <Link className="btn btn-sm bg-info-light">
                        <i className="far fa-eye"></i> View
                    </Link>

                    <Link className="btn btn-sm bg-success-light">
                        <i className="fas fa-check"></i> Accept
                    </Link>
                    <Link className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times"></i> Cancel
                    </Link>
                </div>
            </td>
        </tr>
    )
}
export default ApptRow