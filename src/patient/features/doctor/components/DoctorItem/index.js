import { Button, Rate } from 'antd';
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import departLogo from '../../../../assets/img/depart.png';
import logo_female from '../../../../assets/img/female_logo.png';
import hospitalLogo from '../../../../assets/img/hospital.png';
import location from '../../../../assets/img/location.png';
import logo_male from '../../../../assets/img/male_logo.png';
import { testImage } from '../../../../../utils';
 
import './style.css';

const DoctorItem = (props) => {
    const data = props.data;
    const img = data.sex==='male'? logo_male:logo_female;
    const test = "https://via.placeholder.com/150C/O https://placeholder.com/"
    const tester = new Image();
    tester.src = test;
    const patient = useSelector(state=> state.patient);
    const history = useHistory();
    const dispatch = useDispatch();

    const [loadedImage, setLoadedImage] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleBooking = () => {
        if (patient.isLoggedIn === true) {
            // history.push(`/patient/${props.data?.id}/datlich`)
            history.push({
                pathname: `/dat-kham/${props.data?._id}`,
                state: {data}
            })
        } else {
            Swal.fire({
                title: "Thông báo",
                text: "Bạn muốn đặt khám",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Đăng nhập",
                cancelButtonText: "Hủy"
              })
            .then((result) => {
                if (result.value) {
                    history.push({
                    pathname: `/dat-kham/${props.data?._id}/dang-nhap`,
                    state: {data},
                })
                } 
            })
            .catch((error) => {
                Swal.fire({
                icon: "error",
                title: "Opps...",
                text: `Something went wrong!, ${error.message}`
                });
            });
        }
    }
    return (
        (data && 
        <div>
            <div className="profile-widget" style={{minWidth:"280px", maxWidth:"400px", margin:"0 auto"}}>
                <div className="doc-img">
                    <Link>
                        <img 
                            className="img-fluid" 
                            alt="User" 
                            src={imageError?img:data.avatar} 
                            onError={()=>setImageError(true)}
                        />
                    </Link>
                </div>
                <div className="pro-content">
                    <h3 className="title">
                    <Link
                        to={{
                            pathname:`/danh-sach-bac-si/${props.data?._id}`,
                            state: {data}
                        }}
                    >
                        <p className="chucDanh">{data.title}</p>
                        <p className="tenBs">{data.fullName}</p>
                    </Link> 
                        <i className="fas fa-check-circle verified"></i>
                    </h3>
                    <Rate value={data.rate_average} />
                    <ul className="available-info" style={{height:"110px"}}>
                        <li>
                            <span><img src={departLogo} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                            <span>{data.spec_detail?.name}</span>
                        </li>
                        <li>
                            <span><img src={hospitalLogo} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                            <span>{data.hospital_info?.name}</span>
                        </li>
                        <li>
                            <span><img src={location} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                            <span> {data.hospital_info?.address}
                            </span>
                        </li>
                        {/* <li>
                            <span><img src={price} alt="Nội tiết" style={{height:"15px", width:"15px", display:"inline-block", marginRight:"15px"}}/></span>
                            <span>300.000 VNĐ</span>
                        </li> */}
                    </ul>
                    <div className="row row-sm">
                        <div className="col-6">
                            <Link 
                                to={{
                                    pathname:`/danh-sach-bac-si/${props.data?._id}`,
                                    state: {data}
                                }}
                                className="btn view-btn">Xem thông tin</Link>
                        </div>
                        <div className="col-6">
                            <Button onClick={handleBooking} className="btn book-btn">Đặt lịch</Button>
                            {/* {props.data? 
                                // <Link to={`/patient/${props.data.id}/datlich`, {params:"aaa"}} className="btn book-btn">Đặt lịch</Link> :
                                <Link to={{
                                    pathname: `${directorURL}`,
                                    state:{data}
                                }} 
                                    className="btn book-btn">Đặt lịch</Link> :
                                <Link to={`/patient/dsbacsi`} className="btn book-btn">Đặt lịch</Link>
                            } */}
                        </div>
                    </div>
                </div>
            </div>	
        </div>)
    )
}

export default DoctorItem
