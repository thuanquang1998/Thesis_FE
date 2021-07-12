import { Button, Modal } from 'antd';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { default as doctorAPI, default as doctorsAPI } from '../../../../../api/doctorAPI';
import patientAPI from '../../../../../api/patientApi';
import BookingForm from '../../../../../patient/features/BookSchedule/components/BookingForm';
import { make_appointment } from '../../../../../redux/actions/patientActions';
import { useHistory } from 'react-router-dom';


const INIT_DATA = {
    patientId: "",
    doctorId: "",
    doctorName:"",
    bookingFor: false, 
    bookerInfo: {
        name: "",
        phone: ""
    },
    date:"",
    time: "",    
    room: "",
    patientInfo: {
        name: "",
        phone: "",
        birthDay: "",
        gender: "",
        medicalRecordSumanry: "",
        address: ""
    }
}
function ReExamination(props) {
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch()
    const {modalData, handleOk, handleClose} = props;
    const {data, visible} = modalData;
    // console.log('data.fullData :>> ', data.fullData);
    const currentTimeNumber = new Date().getTime();
    const [dataSubmit, setDataSubmit] = useState({})
    const [listDateValid, setListDateValid] = useState([]);
    const [listTimeStep, setListTimeStep] = useState([]);
    const [initForm, setInitForm] = useState({});
    const [loadingInitForm, setLoadingInitForm] = useState(true);

    const [submitData, setSubmitData] = useState({
        ...INIT_DATA,
    })
    useEffect(()=> {
        if(visible){
            getCheckedAppointment(data.id);
            getTimeWorks();
        }
        // get checked schedule;
    },[visible])

    // get time working
    const getTimeWorks = async () => {
        // console.log("getTimeWorks");
        try {
            const res = await patientAPI.get_time_works(data.fullData.doctorId);
            // console.log('res getTimeWorks:>> ', res);
            const abc = new Date(res.data.data[0].date);
            const current = new Date();
            if(!res.error && !res.data.isNull) {
                const _listDate = res.data.data;
                const _listDateValid = _listDate.filter(x=> {
                    const itemTimeNumber =  new Date(x.date);
                    const _itemTimeNumber = itemTimeNumber.getTime();
                    const diff = _itemTimeNumber*1 - currentTimeNumber*1;
                    return diff>0;
                })
                setListDateValid(_listDateValid);
            } else {
            }
        } catch (error) {
            return {
                status: "error",
                msg: error.message
            }
        }
    }
    const onChangeDate = (value) => {
        const _dateChoosed = listDateValid.filter(x=>x.date===value);
        let room_temp = '';
        let _listTimeSlot = [];
        if(_dateChoosed.length!==0) {
            _listTimeSlot = _dateChoosed[0].timeSlot.filter(x=>x.booked<_dateChoosed[0].max);
            room_temp = _dateChoosed[0].location;
        }
        setListTimeStep(_listTimeSlot);
        setDataSubmit({
            ...dataSubmit, 
            date: value,
            room: room_temp
        });
    }
    const getCheckedAppointment = async (id) => {
        // console.log("kkkkkkkkkkkkkkkkkkk");
        try {
            const response = await doctorAPI.get_checked_appointment(id);
            if(response.error) throw new Error("Can't getCheckedAppointment");
            const appointmentInfo = response.data.appointmentInfo;
            // convert data to init format
            const test = moment(appointmentInfo.patientInfo.birthDay, 'YYYY-MM-DD')
            const obj = {
                date: "",
                time: "",
                name: appointmentInfo.patientInfo?.name,
                phone: appointmentInfo.patientInfo?.phone,
                address: {
                    province: appointmentInfo.patientInfo.address.split(",")[3],
                    district: appointmentInfo.patientInfo.address.split(",")[2],
                    ward: appointmentInfo.patientInfo.address.split(",")[1],
                    street: appointmentInfo.patientInfo.address.split(",")[0]
                },
                birthday: test,
                gender: appointmentInfo.patientInfo.gender,
                medicalRecordSummary: appointmentInfo.patientInfo.medicalRecordSummary
            }
            setSubmitData({
                ...submitData,
                patientId: appointmentInfo.patientId,
                doctorId: appointmentInfo.doctorId,
                doctorName:appointmentInfo.appointmentInfo?.doctorName||"",
            })
            setInitForm(obj);
            setLoadingInitForm(false);
        } catch (error) {
            console.log('error :>> ', error);
        }
    } 
    // onHandleSubmitForm
    const onHandleSubmitForm = (submitData) => {
        const _submitData = {
            ...submitData,
            examineType: "re-examination"
        }
        console.log(`submitData onHandleSubmitForm`, _submitData);

        // dispatch(make_appointment(_submitData));
        // call api and handle notification
        reCreateSchedule(_submitData);
    }
    
    const reCreateSchedule = async (data) => {
        try {
            const response = patientAPI.make_appointment(data);
            if(response.error) throw new Error("Can't reCreateSchedule");
            props.reExamSuccess();
            handleClose();
            enqueueSnackbar('Tạo lịch tái khám thành công', {variant: 'success'})
        } catch (error) {
            console.log(error) ;
            enqueueSnackbar('Tạo lịch thất bại', {variant: 'error'})
        }
    }

    return (
        <Modal 
            title="Đăng kí tái khám" 
            width={1200}
            visible={modalData.visible} 
            onOk={()=>{
                handleOk();
                setInitForm({});
                setLoadingInitForm(true);
            }} 
            onCancel={()=>{
                setListDateValid([]);
                setListTimeStep([]);
                handleClose();
                setInitForm({});
                setLoadingInitForm(true);
            }}
            footer={[
                <Button key="back" onClick={handleOk}>
                  Ok
                </Button>
              ]}
        >
            {!loadingInitForm && 
                <BookingForm 
                    resetForm={()=>{}} 
                    initData={initForm}

                    submitData={submitData}
                    onSubmitForm={onHandleSubmitForm}
                    doctorId={data.fullData.doctorId}
                />}
        </Modal>
    );
}

export default ReExamination;