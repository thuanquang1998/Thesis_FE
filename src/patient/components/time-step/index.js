import React from 'react'
import { Radio } from 'antd';
import moment from 'moment';
import "antd/dist/antd.css";
import './styles.css';



export default function TimeStep(props) {
    // const {step, max, timeSlot} = props.data;
    const onChange = (e) => {
        props.receiveTime(e.target.value);
    }
    const checkBookedNum = (num,max) => {
        let checked = false;
        if(num===max) {
            checked = true;
        } else {
            checked = false;
        }
        return checked;
    }
    const checkStatusBooked = (num,max) => {
        let statusBooked = "";
        if(num===max) {
            statusBooked = "statusBooked_full";
        } else if(num===max-2) {
            statusBooked = "statusBooked_day";
        } else {
            statusBooked = ""
        }
        return statusBooked;
    }
    return (
        <div className="time-step">
            {props.data && 
                (<Radio.Group className="radio-group" size="large" onChange={onChange}>
                    {props.data.timeSlot.map((item,idx)=>{
                        const finish = moment(item.start,'hh:mm').add(+props.data.step,'minutes').format('hh:mm');
                        return (<Radio.Button 
                                    className={`radio-button ${checkStatusBooked(item.booked_num,props.data?.max)}`}
                                    key={idx} 
                                    value={`${item.start}-${finish}`}
                                    disabled={ checkBookedNum(item.booked_num,props.data?.max)}
                                >
                                    {`${item.start} - ${finish}`}
                                </Radio.Button>)
                    })}
                </Radio.Group>)
            }
            
        </div>
        
    )
}
