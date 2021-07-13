import { Button, Card, Col, Rate, Row, Tabs, Form } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from "react-quill"
import { Link, useHistory } from 'react-router-dom'
import patientAPI from '../../../../../api/patientApi'
import logoDoctor from '../../../../assets/img/bsnam.jpg'
import departLogo from '../../../../assets/img/depart.png'
import hospitalLogo from '../../../../assets/img/hospital.png'
import location from '../../../../assets/img/location.png'
import price from '../../../../assets/img/price.png'
import Swal from 'sweetalert2';
import './style.css'
import { useSnackbar } from 'notistack';
import LoadingTop from '../../../../../doctor/components/loadingTop';

const DetailDoctorPage = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const history = useHistory();
    const patient = useSelector(state=> state.patient);
    const data = history.location.state.data;
    const [reviewData, setReviewData] = useState([]);
    const [loadingReview, setLoadingReview] = useState(true);
    const [loadingPage, setLoadingPage] = useState(true);
    const [dataReview, setDataReview] = useState({
        star_num: null,
        comment: null,
    })
    const [disableButton, setDisableButton] = useState(true);
    useEffect(()=> {
        const {star_num, comment} = dataReview;
        if(star_num!==null&&comment!==null) {
            setDisableButton(false)
        }
    },[dataReview])
    useEffect(()=> {
        getReviewDoctors(data._id);
    },[])
    const getReviewDoctors = async (id) => {
        setLoadingPage(true);
        try {
            const response = await patientAPI.get_doctor_reviews(id);
            if(response.error) throw new Error("Can't get getReviewDoctors")
            console.log('response getReviewDoctors:>> ', response);
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
            // call api submit review
            const _data = {
                ...dataReview,
                doctorId: data._id,
            }
            console.log('dataReview handleReview:>> ', _data);
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
            getReviewDoctors(data._id);
        } catch (error) {
            console.log(`error`, error);
            enqueueSnackbar('Đánh giá thành công', {variant: 'success'})
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
                                    <li className="breadcrumb-item active" aria-current="page">{`${data.title} ${data.fullName}`}</li>
                                </ol>
                            </nav>
                            <h2 className="breadcrumb-title">{`${data.title} ${data.fullName}`}</h2>
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
                                <div>
                                    <img src={data.avatar_image||logoDoctor} alt="logo"/>
                                </div>
                            </Col>
                            <Col sm={{span:24}} md={{span:15}} className="infoDoctor">
                                <h3 className="titlee">
                                    {`${data.title} ${data.fullName}`}
                                </h3>
                                <Rate value={3} />
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
                                        <span> {data.hospital_info?.address}</span>
                                    </li>
                                    <li>
                                        <span><img src={price} alt="Nội tiết"/></span>
                                        <span>{data.price}</span>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={{span:24, offset:8}} sm={{span:4, offset:10}} md={{span:5, offset:0}} style={{width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Link 
                                    to={{
                                        pathname:`/dat-kham/${props.match.params.doctorID}`,
                                        state: {data}
                                    }}
                                ><Button type="primary" style={{borderRadius:"20px"}}>Đặt lịch khám</Button></Link>
                            </Col>
                        </Row>
                    </Card>
                    {/* new content */}
                    <div >
                        <Row gutter={[24,8]}>
                            <Col sm={{span:24}} md={{span:13}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>Giới thiệu</h4>
                                    <ReactQuill value={`<p>${data.about||'Là một bác sĩ giàu kinh nghiệm. Có kinh nghiệm công tác lâu năm trong lĩnh vực y tế'}</p>`} readOnly={true} theme={"bubble"} />
                                </Card>
                            </Col>
                            <Col sm={{span:24}} md={{span:11}}>
                                <Card className="doctor--profile__intro" style={{minHeight:"350px"}}>
                                    <h4>Đánh giá</h4>
                                    <h4 style={{display:"none"}}>Chưa có đánh giá </h4>
                                {reviewData.map((item,index)=>(
                                    <div className="review__item" key={index}>
                                        <div className="review__item--header">
                                            <div className="review__header--left"><i class="far fa-user"></i></div>
                                            <div className="review__header--right">{item.patient_name} <span>đã nhận xét</span></div>
                                        </div>
                                        <div className="review__item--rating"><Rate value={item.rate.star_num}/></div>
                                        <div className="review__item--comment"><p>{item.rate.comment}</p></div>
                                    </div>
                                ))}
                               
                                <Card>
                                    
                                            <Rate value={dataReview.star_num===null?0:dataReview.star_num} onChange={(e)=>setDataReview({...dataReview, star_num:e})}/>
                                        
                                        Bạn đã sử dụng dịch vụ của {data.title} {data.fullName}. Hãy chia sẽ những nhận xét của bạn.
                                        
                                            <TextArea value={dataReview.comment===null?"":dataReview.comment} onChange={(e)=>setDataReview({...dataReview, comment:e.target.value})}></TextArea>
                                        <Button loading={loadingPage} type="primary" onClick={handleReview} disabled={disableButton}>Gửi</Button>
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
