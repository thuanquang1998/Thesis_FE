import React from 'react';
import {Spin} from 'antd';
function LoadingPage(props) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                zIndex: "100000000",
                backgroundColor: "black",
                opacity: 0.3,
            }}
        >
            <Spin></Spin>
        </div>
    );
}

export default LoadingPage;