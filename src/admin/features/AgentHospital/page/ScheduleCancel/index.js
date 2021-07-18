import React,{useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar';
import {Row, Col, Card, Button, Select, Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import LoadingTop from '../../../../components/loadingTop';
import LoadingPage from '../../../../components/loadingPage';
import adminAPI from '../../../../../api/adminAPI';
import doctorAPI from '../../../../../api/doctorAPI';
import patientAPI from '../../../../../api/patientApi';
import {useSnackbar} from 'notistack';
const { Option } = Select;
const {Search} = Input;
const currentTimeNumber = new Date().getTime();

const ScheduleCancel = () => {
    const {enqueueSnackbar} = useSnackbar();
    const admin = useSelector(state=>state.admin);
    const hospitalInfo = admin.currentAdmin.hospital;

    const [loadingPage, setLoadingPage] = useState(true);

    const [listCancel, setListCancel] = useState([]);

    const [modalView, setModalView] = useState({
        visible: false,
        data: {}
    })

    useEffect(() => {
        getListCancelSchedule(hospitalInfo._id);
    },[])

    const getListCancelSchedule = async (id) => {
        try {
            const response = await adminAPI.get_list_schedule_cancel(id);
            if(response.error) throw new Error('Khong the lay danh sach lich bi huy');

        } catch (error) {
            
        }
    }


  
    return (
        <>
            {/* {loadingPage && <LoadingTop/>} */}
            <SidebarNav/>
            <div className="page-wrapper">
			    <div className="content container-fluid">
					<div className="page-header">
						<div className="row">
							<div className="col-sm-12">
								<h3 className="page-title" style={{paddingTop:"20px"}}>Trang quản lý cho bệnh viện Hùng Vương</h3>
								<ul className="breadcrumb">
									<li className="breadcrumb-item active">Dashboard</li>
								</ul>
							</div>
						</div>
					</div>
                    
					<Row gutter={[36,36]}>
        
					</Row>
                    {/* table */}
					ScheduleCancelScheduleCancelScheduleCancelScheduleCancel
                </div>
            </div>

        </>
    )
}

export default ScheduleCancel
