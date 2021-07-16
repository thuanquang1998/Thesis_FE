import React,{useState, useEffect} from 'react'
import SidebarNav from '../../../../components/SideBar';
import {Row, Col, Card, Button, Select, Input} from 'antd'
import BookingFormModal from './BookingFormModal';
import { useDispatch, useSelector } from 'react-redux'
import LoadingTop from '../../../../components/loadingTop';
import LoadingPage from '../../../../components/loadingPage';
import adminAPI from '../../../../../api/adminAPI';
import doctorAPI from '../../../../../api/doctorAPI';
import patientAPI from '../../../../../api/patientApi';
import BookingFormAgent from './BookingFormAgent';
import {useSnackbar} from 'notistack';
const { Option } = Select;
const {Search} = Input;
const currentTimeNumber = new Date().getTime();

const AgentBooking = () => {
    const {enqueueSnackbar} = useSnackbar();
    const admin = useSelector(state=>state.admin);
    const hospitalInfo = admin.currentAdmin.hospital;
    const [modalData, setModalData] = useState({
        visible: false,
        data: {},
    })
    const [loadingPage, setLoadingPage] = useState(true);
    const [listSpec, setListSpec ] = useState([]);
    const [loadSpec, setLoadSpec] = useState(true);
    const [listDoctor, setListDoctor] = useState([]);
    const [loadDoctor, setLoadDoctor] = useState(true);
    const [listDoctorRender, setListDoctorRender] = useState([]);

    const [currentDoctor, setCurrentDoctor] = useState(null);


    const [listDateValid, setListDateValid] = useState([]);
    const [loadDateWork, setLoadDateWork] = useState(true);


    useEffect(()=> {
        // get list _ck
        getListSpec();
        getListDoctor();
    },[]);
    useEffect(()=> {
        if(!loadDoctor && !loadSpec) {
            setLoadingPage(false);
        }
    },[loadSpec, loadDoctor])
    const getListSpec = async () => {
        setLoadingPage(true);
        try {
            const response = await adminAPI.get_spec_of_hospital(hospitalInfo.id);
            if(response.error) throw new Error(response.errors[0].message);
            setListSpec(response.data);
            setLoadSpec(false)
        } catch (error) {
            console.log('error.message :>> ', error.message);
            setLoadSpec(false)
        }
    }

    // thay bang api get Doctor khac
    const getListDoctor = async () => {
        setLoadingPage(true);
        try {
            const response = await adminAPI.get_doctors();
            if(response.error) throw new Error(response.errors[0].message);
            setListDoctor([...response.data.data]);
            setListDoctorRender([...response.data.data]);
            setLoadDoctor(false)
        } catch (error) {
            console.log('error.message :>> ', error.message);
            setLoadDoctor(false)
        }
    }

   

    const changeSpec = (value) => {
        setLoadDoctor(true);
        let _listDoctor = [];
        if(value==="all") {
            _listDoctor = [...listDoctor];
        } else {
            _listDoctor = listDoctor.filter((item)=>{
                const check = item.spec_detail.name===value;
                return check;
            });
        }
        setTimeout(() => {
            setListDoctorRender(_listDoctor);
            setLoadDoctor(false);
        }, 500);
        setCurrentDoctor(null);
        setLoadDateWork(true);
    }
    const changeDoctor = (value) => {
        setLoadDateWork(true);
        setCurrentDoctor(value);
        // call api
        getTimeWorks(value);
    }
    const getTimeWorks = async (id) => {
        try {
            const res = await patientAPI.get_time_works(id);
            const abc = new Date(res.data.data[0].date);
            const current = new Date();
            if(res.error)  throw new Error('error');
            if(res.data.isNull) throw new Error('error');
            const _listDate = res.data.data;
            const _listDateValid = _listDate.filter(x=> {
                const itemTimeNumber =  new Date(x.date);
                const _itemTimeNumber = itemTimeNumber.getTime();
                const diff = _itemTimeNumber*1 - currentTimeNumber*1;
                return diff>0;
            })
            setListDateValid(_listDateValid);
            setLoadingPage(false);
            setLoadDateWork(false);
        } catch (error) {
            console.log('error :>> ', error);
            setLoadDateWork(false);
        }
    }
    const handleCreateSchedule = (data) => {
        setLoadingPage(true);
        const _data = {
            ...data,
            doctorId: currentDoctor,
        }
        agent_add_appointment(_data);
    }
    const agent_add_appointment = async (data) => {
        try {
            const response = await adminAPI.create_appointment_agent(data);
            if(response.error) throw new Error("error");
            console.log('response agent_add_appointment:>> ', response);
			enqueueSnackbar('Tạo lịch khám thành công', {variant: 'success'});
            setLoadingPage(false);

            // reset form.....


        } catch (error) {
			enqueueSnackbar('Tạo lịch khám không thành công.', {variant: 'error'});
            setLoadingPage(false);
        }
    }
    return (
        <>
            {/* {loadingPage && <div><h1>aaaaaaaaaaaaaaaa</h1></div>} */}
            {loadingPage && <LoadingTop/>}
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
                    <Card>
                        <h3>Đặt lịch khám cho bệnh nhân</h3>
                    </Card>
                    <Card>
                        <h4>Chọn bác sĩ</h4>
                        {/* form chon bac si => get id =>  call api lay thong tin. */}
                        <Row gutter={[36,8]} className="search-input">
                            <Col xs={{span:24}} sm={{span:10}} md={{span:10}}>
                                {loadingPage?
                                <Select
                                    placeholder="Chọn chuyên khoa"
                                    loading={loadSpec}
                                    defaultValue="all"
                                >
                                    <Option value="">Tất cả</Option>
                                </Select>:
                                <Select
                                    placeholder="Chọn chuyên khoa"
                                    onChange={(e)=>changeSpec(e)}
                                >
                                    <Option value="all">Tất cả</Option>
                                    {listSpec.map((item,index)=>(
                                        <Option key={index} value={item.name}>{item.name}</Option>
                                    ))}
                                </Select>
                                }
                                
                            </Col>
                            <Col xs={{span:24}} sm={{span:14}} md={{span:14}}>
                                <Select
                                    placeholder="Chọn bác sĩ"
                                    value={currentDoctor}
                                    onChange={(e)=>changeDoctor(e)}
                                    loading={loadDoctor}
                                >
                                    {listDoctorRender.map((item,index)=>(
                                        <Option key={index} value={item._id}>{item.fullName}</Option>
                                    ))}
                                </Select>
                            </Col>

                        </Row>
                        {!loadDateWork && 
                            <>
                                <hr />
                                <BookingFormAgent
                                    listDateValid={listDateValid}
                                    doctorId={currentDoctor}
                                    onSubmitForm={handleCreateSchedule}
                                />
                            </>
                        }
                    </Card>
                    <Card>
                        
                    </Card>
                    {/* <BookingFormModal
                        modalData={modalData}
                        handleOk={()=>{
                            setModalData({
                                ...modalData,
                                visible: !modalData.visible,
                            })
                        }}
                        handleClose={()=>{
                            setModalData({
                                ...modalData,
                                visible: !modalData.visible,
                            })
                        }}
                    /> */}
					
                </div>
            </div>

        </>
    )
}

export default AgentBooking
