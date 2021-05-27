import React from 'react';
import { Link } from 'react-router-dom';
import {Col, Row} from 'antd';
import logo from '../../assets/img/bk-logo.png';
import logo_finace from '../../assets/img/congthuong.png';
import './style.css';
import { Box, makeStyles ,LinearProgress, Grid, Paper, Typography, Container} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#15558d",
        lineHeight: "1.5",
        '& p':{
            color: "white"
        }
    },
    top: {
        paddingTop: "15px",
        paddingBottom: "10px",
        '& h4': {
            fontWeight: "600",
            color: "white"
        }
    },
    bottom: {
        paddingBottom:"15px",
        paddingTop: "15px",
        borderTop: "1px solid #37a0af",
    },
    menuIcon: {
        margin:"0",
        '& li':{
            float: "left",
            listStyleType: 'none',
            color: 'white',
            fontSize: "20px",
            marginRight: '10px',
            marginBottom:"8px"
        },
    },
    item1: {
        lineHeight: "2",
        '& img': {
            width: "250px",
        },
        '& p': {
            fontSize: "14px",
            margin: "0"
        },
        '& i':{
            marginRight: "8px"
        }
    },
    item2: {
        paddingTop:"20px",
        '& ul': {
            margin: "0",
            padding: "0",
            lineHeight: "2"

        },
        '& li': {
            listStyleType: "none",
            
        },
        '& li a': {
           fontSize: "15px",
            fontWeight: "400",
            color: "white"
        },
    },
    item3: {
       paddingTop:"20px",

    }
}))
const Footer = (props) => {
    const classes = useStyles();
	return (
        <Box className={classes.root}>
            <Container className={classes.top}>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <div className={classes.item1}>
                            <div>
                                <img src={logo} alt="logo"/>
                            </div>
                            <p style={{width:"80%"}}><i className="fa fa-map-marker" aria-hidden="true"></i>268 Lý Thường Kiệt, phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
                            <p><i className="fa fa-phone" aria-hidden="true"></i>
                                +1 315 369 5943
                            </p>
                            <p className="mb-0"><i className="fa fa-envelope" aria-hidden="true"></i>
                                bkcare@gmail.com
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.item2}>
                            <h4>Về BKCare</h4>
                            <ul>
                                <li><Link to="#">Giới thiệu</Link></li>
                                <li><Link to="#">Tuyển dụng</Link></li>
                                <li><Link to="#">Liên hệ</Link></li>
                                <li><Link to="#">Điều khoản</Link></li>
                                <li><Link to="#">Chính sách bảo mật</Link></li>
                                <li><Link to="#">Quy chế hoạt động</Link></li>
                            </ul>
                        </div>
                                
                    </Grid>
                    <Grid item xs={3}>
                        <div className={classes.item3}>
                            <h4>Liên hệ</h4>
                            <p style={{fontSize:"40px"}}><i className="fa fa-phone" aria-hidden="true"></i>
                                +1 315 369 5943
                            </p>
                            <h4>Kết nối với BkCare</h4>
                            <div className={classes.menuIcon}>
                                <ul>
                                    <li>
                                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-twitter"></i> </a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-instagram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fab fa-dribbble"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.bottom}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={9}>
                        <div className="copyright-text">
                            <p className="mb-0">&copy; 2021 YouMed. All Rights Reserved</p>
                        </div>
                    </Grid>
                    <Grid item>
                        <div >
                            <img src={logo_finace} alt="" style={{width:"122px", height:"38px"}}/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
                
        </Box>
        // <footer className="patient__footer">
        //     <div className="patient__footer--top">
        //         <div className="footer-top">
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-about">
        //                         <div className="footer-logo">
        //                             <img src="" alt="logo" />
        //                         </div>
        //                         <div className="footer-about-content">
        //                             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                   
        //                         </div>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-menu">
        //                         <h2 className="footer-title">For Patients</h2>
        //                         <ul>
        //                             <li><Link to="/patient/search-doctor">Search for Doctors</Link></li>
        //                             <li><Link to="/login">Login</Link></li>
        //                             <li><Link to="/register">Register</Link></li>
        //                             <li><Link to="/patient/booking">Booking</Link></li>
        //                             <li><Link to="/patient/dashboard">Patient Dashboard</Link></li>
        //                         </ul>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-menu">
        //                         <h2 className="footer-title">For Doctors</h2>
        //                         <ul>
        //                             <li><Link to="/doctor/appointments">Appointments</Link></li>
        //                             <li><Link to="/doctor/chat-doctor">Chat</Link></li>
        //                             <li><Link to="/login">Login</Link></li>
        //                             <li><Link to="/doctor/doctor-register">Register</Link></li>
        //                             <li><Link to="/doctor/doctor-dashboard">Doctor Dashboard</Link></li>
        //                         </ul>
        //                     </div>
        //                 </div>
                        
        //                 <div className="col-lg-3 col-md-6">
        //                     <div className="footer-widget footer-contact">
        //                         <h2 className="footer-title">Liên hệ</h2>
        //                         <div className="footer-contact-info">
        //                             <div className="footer-address">
        //                                 <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
        //                                 <p> 268 Lý Thường Kiệt, phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</p>
        //                             </div>
        //                             <p>
        //                             <i className="fa fa-phone" aria-hidden="true"></i>
        //                                 +1 315 369 5943
        //                             </p>
        //                             <p className="mb-0">
        //                             <i className="fa fa-envelope" aria-hidden="true"></i>
        //                                 bkcare@gmail.com
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     </div>
        //     <div className="patient__footer--bottom">
        //         <div className="container-fluid">
        //             <div className="copyright">
        //                 <div className="row">
        //                     <div className="col-md-6 col-lg-6">
        //                         <div className="copyright-text">
        //                             <p className="mb-0">&copy; 2020 BKCare</p>
        //                         </div>
        //                     </div>
        //                     <div className="col-md-6 col-lg-6" style={{display:"float-right"}}>
        //                         <div className="copyright-menu">
        //                             <div className="social-icon">
        //                                 <ul>
        //                                     <li>
        //                                         <a href="#"><i className="fab fa-facebook-f"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#"><i className="fab fa-twitter"></i> </a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#"><i className="fab fa-linkedin-in"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#"><i className="fab fa-instagram"></i></a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="#"><i className="fab fa-dribbble"></i> </a>
        //                                     </li>
        //                                 </ul>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
	);
};

export default Footer;