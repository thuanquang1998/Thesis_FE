import React,{useState} from 'react'
import {Pagination} from 'antd'
const Paging =(props)=>{
    const onChangePage=(page, pageSize)=>{
		props.paging({page , pageSize})
	}
    return(
        <Pagination
            style={{
                margin: '10px',
                float: "right"
            }}
            showSizeChanger
            onChange={onChangePage}
            defaultCurrent={1}
            total={props.total}
        />
    )
}
export default Paging