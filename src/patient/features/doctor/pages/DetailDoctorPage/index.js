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
    // const doctorData = history.location.state.data;

    const doctorId = history.location.pathname.split('/')[2];

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
        window.scrollTo(0,0);
        setLoadingPage(true);
        // const id = doctorData._id;
        getDoctorById(doctorId);
    },[])
    const getDoctorById = async (id) => {
        try {
            const response = await doctorAPI.get_doctors_by_id(id);
            if(response.error) throw new Error("Error getDoctorById");
            setDoctorInfo({...response.data.data[0],id:response.data.data[0]._id});
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
        getReviewDoctors(doctorId);
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
                doctorId: doctorId,
            }
            submitReviewApi(_data);
            setLoadingPage(true);
            setDataReview({
                star_num: null,
                comment: null,
            })
        } else {
            Swal.fire({
                title: "Th??ng b??o",
                text: "B???n c???n ????ng nh???p ????? th???c hi???n ch???c n??ng n??y.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "????ng nh???p",
                cancelButtonText: "H???y"
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
            console.log('response :>> ', response);
            if(response.error) {
                if(response.errors[0].message === "You not axamine yet") throw "You not axamine yet"
                 throw "Server Disconnect"
            } 
            
            enqueueSnackbar('????nh gi?? th??nh c??ng', {variant: 'success'});
            getReviewDoctors(doctorId);
            setLoadingPage(false)
        } catch (error) {
            console.log(`error`, error);
            if(error==="You not axamine yet"){ 
                enqueueSnackbar('B???n ch??a kh??m b???nh v???i b??c s?? n??y. Kh??ng th??? ????nh gi??.', {variant: 'error'})
            } else {
                enqueueSnackbar('L???i k???t n???i m???ng. Th??? l???i sau.', {variant: 'error'})
            }
            setLoadingPage(false)
        }
    }
    const handleBooking = () => {
        if (patient.isLoggedIn === true) {
            // history.push(`/patient/${props.data?.id}/datlich`)
            history.push({
                pathname: `/dat-kham/${doctorId}`,
                state: {data:{...doctorInfo}}
            })
        } else {
            Swal.fire({
                title: "Th??ng b??o",
                text: "B???n mu???n ?????t kh??m",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "????ng nh???p",
                cancelButtonText: "H???y"
              })
            .then((result) => {
                if (result.value) {
                    history.push({
                    pathname: `/dat-kham/${doctorId}/dang-nhap`,
                    state: {data:{...doctorInfo}},
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
                                    <li className="breadcrumb-item"><Link to="/">Trang ch???</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to='/danh-sach-bac-si'>Danh s??ch b??c s??</Link></li>
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
                                <Rate value={doctorInfo.rate_average||5} />
                                <ul className="available-info">
                                    <li>
                                        <span><img src={departLogo} alt="N???i ti???t"/></span>
                                        <span>{doctorInfo.spec_detail?.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={hospitalLogo} alt="N???i ti???t"/></span>
                                        <span>{doctorInfo.hospital_info?.name}</span>
                                    </li>
                                    <li>
                                        <span><img src={location} alt="N???i ti???t"/></span>
                                        <span> {doctorInfo.hospital_info?.address}</span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="N???i ti???t"/></span>
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
                                <Button onClick={handleBooking} type="primary" style={{borderRadius:"20px"}}>?????t l???ch kh??m</Button>
                                {/* </Link> */}
                            </Col>
                        </Row>
                    </Card>
                    {/* new content */}
                    <div >
                        <Row gutter={[24,8]}>
                            <Col sm={{span:24}} md={{span:13}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>Gi???i thi???u</h4>
                                    <ReactQuill 
                                        value={doctorInfo.about?doctorInfo.about:'<p>L?? m???t b??c s?? gi??u kinh nghi???m. C?? kinh nghi???m c??ng t??c l??u n??m trong l??nh v???c y t???</p>'} 
                                        readOnly={true} 
                                        theme={"bubble"} 
                                    />
                                </Card>
                            </Col>
                            <Col sm={{span:24}} md={{span:11}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>????nh gi??</h4>
                                    <h4 style={{display:"none"}}>Ch??a c?? ????nh gi?? </h4>
                                {reviewData.map((item,index)=>(
                                    <div className="review__item" key={index}>
                                        <div className="review__item--header" style={{display:"flex"}}>
                                            <div className="review__header--left" style={{paddingRight:"8px"}}><i className="far fa-user"></i></div>
                                            <div className="review__header--right" style={{fontWeight:"600"}}>{item.patient_name} <span>???? nh???n x??t</span></div>
                                        </div>
                                        <div className="review__item--rating"><Rate value={item.rate.star_num}/></div>
                                        <div className="review__item--comment"><p>{item.rate.comment}</p></div>
                                    </div>
                                ))}
                               
                                    <Card>
                                        B???n ???? s??? d???ng d???ch v??? c???a {doctorInfo.title} {doctorInfo.fullName}. H??y chia s??? nh???ng nh???n x??t c???a b???n.
                                        <Rate value={dataReview.star_num===null?0:dataReview.star_num} onChange={(e)=>setDataReview({...dataReview, star_num:e})}/>
                                            <TextArea value={dataReview.comment===null?"":dataReview.comment} onChange={(e)=>setDataReview({...dataReview, comment:e.target.value})}></TextArea>
                                        <Button style={{margin:"0 auto", marginTop:"15px"}} loading={loadingPage} type="primary" onClick={handleReview} disabled={disableButton}>G???i</Button>
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
