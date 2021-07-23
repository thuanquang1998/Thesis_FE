import { Button, Card, Col, Rate, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import doctorAPI from '../../../../../api/doctorAPI';
import patientAPI from '../../../../../api/patientApi';
import LoadingTop from '../../../../../doctor/components/loadingTop';
import logoDoctor from '../../../../assets/img/bsnam.jpg';
import departLogo from '../../../../assets/img/depart.png';
import hospitalLogo from '../../../../assets/img/hospital.png';
import location from '../../../../assets/img/location.png';
import price from '../../../../assets/img/price.png';
import './style.css';

const DetailDoctorPage = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const patient = useSelector(state=> state.patient);
    const doctorData = history.location.state.data;
    const [reviewData, setReviewData] = useState([]);
    const [loadingReview, setLoadingReview] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);

    const [doctorInfo, setDoctorInfo] = useState({
        about: "",
    })

    const [dataReview, setDataReview] = useState({
        star_num: null,
        comment: null,
    })
    const [disableButton, setDisableButton] = useState(true);



    useEffect(()=> {
        setLoadingPage(true);
        const id = doctorData._id;
        getDoctorById(id);
    },[])
    const getDoctorById = async (id) => {
        try {
            const response = await doctorAPI.get_doctors_by_id(id);
            if(response.error) throw new Error("Error getDoctorById");
            setDoctorInfo({...response.data.data[0]});
            setLoadingPage(false);
        } catch (error) {
            setLoadingPage(false);
        }
    }

    useEffect(()=> {
        const {star_num, comment} = dataReview;
        if(star_num!==null&&comment!==null) {
            setDisableButton(false)
        }
    },[dataReview])
    useEffect(()=> {
        getReviewDoctors(doctorData._id);
    },[])
    const getReviewDoctors = async (id) => {
        setLoadingPage(true);
        try {
            const response = await patientAPI.get_doctor_reviews(id);
            if(response.error) throw new Error("Can't get getReviewDoctors")
            setReviewData([...response.data]);
            setLoadingReview(false);
            setLoadingPage(false);
        } catch (error) {
            console.log('error :>> ', error);
            setLoadingPage(false);
        }
    }
    // check login
    
    const handleReview = () => {
        if (patient.isLoggedIn === true) {
            const _data = {
                ...dataReview,
                doctorId: doctorData._id,
            }
            submitReviewApi(_data);
            setLoadingPage(true);
            setDataReview({
                star_num: null,
                comment: null,
            })
        } else {
            Swal.fire({
                title: "Thông báo",
                text: "Bạn cần đăng nhập để thực hiện chức năng này.",
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
                        pathname: `/dang-nhap`,
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
    const submitReviewApi = async (data) => {
        try {
            const response = await patientAPI.create_review(data);
            if(response.error) throw new Error('submitReviewApi error');
            enqueueSnackbar('Đánh giá thành công', {variant: 'success'});
            getReviewDoctors(doctorData._id);
            setLoadingPage(false)
        } catch (error) {
            console.log(`error`, error);
            enqueueSnackbar('Đánh giá thành công.', {variant: 'success'})
            setLoadingPage(false)
        }
    }
    const handleBooking = () => {
        if (patient.isLoggedIn === true) {
            // history.push(`/patient/${props.data?.id}/datlich`)
            history.push({
                pathname: `/dat-kham/${doctorData?._id}`,
                state: {data:{...doctorData}}
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
                    pathname: `/dat-kham/${doctorData?.id}/dang-nhap`,
                    state: {doctorData},
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
        <div>
            {loadingPage && <LoadingTop/>}
            {/* breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-12">
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-bac-si'>Danh sách bác sĩ</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{`${doctorInfo.title || ""} ${doctorInfo.fullName || ""}`}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">{`${doctorInfo.title} ${doctorInfo.fullName}`}</h2>
                        </div>
                    </div>
                </div>
            </div>
        {/* xs sm md lg xl xxl */}
            <div className="content">
                <div className="container doctor-profile-css">
                    <Card className="header-profile">
                        <Row>
                            <Col sm={{span:4, offset:10}} md={{span:4,offset:0}} lg={{span:3}} className="logoDoctor">
                                {/* <div style={{border:"2px solid "}}>
                                    <img src={doctorInfo.avatar||logoDoctor} alt="logo"/>
                                </div> */}
                                <div className="doc-img">
                                    <Link>
                                        {/* {!loadedImage?
                                        <img 
                                            className="img-fluid" 
                                            alt="User" 
                                            src={img} 
                                        />: */}
                                        <img 
                                            className="img-fluid" 
                                            alt="User" 
                                            src={doctorInfo.avatar||logoDoctor} 
                                        />
                                        
                                    </Link>
                                </div>
                            </Col>
                            <Col sm={{span:24}} md={{span:15}} className="infoDoctor">
                                <h3 className="titlee">
                                    {`${doctorInfo.title} ${doctorInfo.fullName}`}
                                </h3>
                                <Rate value={3} />
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="Nội tiết"/></span>
                                        <span>{doctorInfo.spec_detail?.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="Nội tiết"/></span>
                                        <span>{doctorInfo.hospital_info?.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="Nội tiết"/></span>
                                        <span> {doctorInfo.hospital_info?.address}</span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="Nội tiết"/></span>
                                        <span>{doctorInfo.price}</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={{span:24, offset:8}} sm={{span:4, offset:10}} md={{span:5, offset:0}} style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                {/* <Link 
                                    to={{
                                        pathname:`/dat-kham/${props.match.params.doctorID}`,
                                        state: {data}
                                    }} */}
                                {/* > */}
                                <Button onClick={handleBooking} type="primary" style={{borderRadius:"20px"}}>Đặt lịch khám</Button>
                                {/* </Link> */}
                            </Col>
                        </Row>
                    </Card>
                    {/* new content */}
                    <div >
                        <Row gutter={[24,8]}>
                            <Col sm={{span:24}} md={{span:13}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>Giới thiệu</h4>
                                    <ReactQuill 
                                        value={doctorInfo.about?doctorInfo.about:'<p>Là một bác sĩ giàu kinh nghiệm. Có kinh nghiệm công tác lâu năm trong lĩnh vực y tế</p>'} 
                                        readOnly={true} 
                                        theme={"bubble"} 
                                    />
                                </Card>
                            </Col>
                            <Col sm={{span:24}} md={{span:11}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>Đánh giá</h4>
                                    <h4 style={{display:"none"}}>Chưa có đánh giá </h4>
                                {reviewData.map((item,index)=>(
                                    <div className="review__item" key={index}>
                                        <div className="review__item--header" style={{display:"flex"}}>
                                            <div className="review__header--left" style={{paddingRight:"8px"}}><i class="far fa-user"></i></div>
                                            <div className="review__header--right" style={{fontWeight:"600"}}>{item.patient_name} <span>đã nhận xét</span></div>
                                        </div>
                                        <div className="review__item--rating"><Rate value={item.rate.star_num}/></div>
                                        <div className="review__item--comment"><p>{item.rate.comment}</p></div>
                                    </div>
                                ))}
                               
                                    <Card>
                                        Bạn đã sử dụng dịch vụ của {doctorData.title} {doctorData.fullName}. Hãy chia sẽ những nhận xét của bạn.
                                        <Rate value={dataReview.star_num===null?0:dataReview.star_num} onChange={(e)=>setDataReview({...dataReview, star_num:e})}/>
                                            <TextArea value={dataReview.comment===null?"":dataReview.comment} onChange={(e)=>setDataReview({...dataReview, comment:e.target.value})}></TextArea>
                                        <Button style={{margin:"0 auto", marginTop:"15px"}} loading={loadingPage} type="primary" onClick={handleReview} disabled={disableButton}>Gửi</Button>
                                    </Card>
                                </Card>
                            </Col>
                        </Row>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailDoctorPage
