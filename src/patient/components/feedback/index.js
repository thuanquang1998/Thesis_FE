// import React from 'react'
// import './style.css'
// import {Link} from 'react-router-dom'
// import { Card, Form, Input, Select, Button } from 'antd'
// const FeedBack = () => {
//     const onChangeList = () => {
//         // console.log();
//     }
//     const onFinish = () => {

//     }
//     return (
//         <>
//             <div className="breadcrumb-bar">
//                 <div className="container-fluid">
//                     <div className="row align-items-center">
//                         <div className="col-md-12 col-12">
//                             <nav aria-label="breadcrumb" className="page-breadcrumb">
//                                 <ol className="breadcrumb">
//                                     <li className="breadcrumb-item"><Link to="/home">Trang chủ</Link></li>
//                                     <li className="breadcrumb-item active" aria-current="page">Quản lí tài khoản</li>
//                                     <li className="breadcrumb-item active" aria-current="page">Góp ý</li>
//                                 </ol>
//                             </nav>
//                             <h2 className="breadcrumb-title">Góp ý</h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <div className="content">
//                 <div className="container-fluid">
//                     <div className="container">
//                         <Card 
//                             title="Góp ý xây dựng sản phẩm"
//                             headStyle={{textAlign:"center", fontWeight:"bold", color:'#5898df', fontSize:"22px"}}
//                         >
//                             <Form
//                             labelCol={{
//                             span: 4,
//                             }}
//                             wrapperCol={{
//                             span: 20,
//                             }}
//                             layout="horizontal"
//                             size="large"
//                             onFinish={onFinish}
//                         >   
//                             <Form.Item name="title" label="Tiêu đề:">
//                                 <Input className="input" placeholder="Tiêu đề"/>
//                             </Form.Item>
//                             <Form.Item label="Nội dung góp ý:">
//                                 <Input.TextArea style={{height:"150px"}}/>
//                             </Form.Item>
//                             <Form.Item name="list_feedback" label="Danh mục góp ý:">
//                                 <Select className="province" onChange={onChangeList}>
//                                     <Select.Option value='giaodien'>Giao diện</Select.Option>
//                                     <Select.Option value='cctimkiem'>Công cụ tìm kiếm</Select.Option>
//                                     <Select.Option value='tinhnangkhac'>Tính năng khác</Select.Option>
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item label="Đường dây nóng:">
//                                 <h4>19008168</h4>
//                             </Form.Item>
//                             <Form.Item>
//                                 <Button type="primary" htmlType="submit">Gửi góp ý</Button>
//                             </Form.Item>
//                             </Form>
//                         </Card>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default FeedBack
