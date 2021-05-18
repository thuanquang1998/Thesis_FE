import React from 'react';
import { Box, makeStyles ,LinearProgress} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    loading: {
        position:'fixed',
        top: '0',
        width:"100%",
        // zIndex:"999"
    }
}))
function LoadingTop(props) {
    const classes = useStyles();
    return (
        <Box className={classes.loading}>
            <LinearProgress />
        </Box>
    );
}

export default LoadingTop;