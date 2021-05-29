import { Box, Chip, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles (theme=> ({
    root: {
        display:'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',

        padding: 0,
        margin: theme.spacing(2, 0),
        listStyleType: 'none',

        '& > li': {
            margin: 0,
            padding: theme.spacing(1),
        }
    },
    chip: {
        marginRight: theme.spacing(2)
    }
}))


function FilterViewer({ data ,filters = {}, onChange = null }) {
    const classes = useStyles();
    const appState = useSelector(state=>state.app);
    const [nameBv, setNameBv] = useState('');
    const [nameCk, setNameCk] = useState('');
    const {listAllHospitals, listAllSpecials, loadingData} = appState;
    useEffect(()=> {

        
    },[filters])
    
    useEffect(()=> {
        if(listAllHospitals.length!==0 && listAllSpecials.length!==0 ) {
            const listBv = listAllHospitals.data.filter(x=>x.id===filters.bv);
            if (listBv.length!==0) {
                setNameBv(listBv[0].name)
            } else {
                setNameBv('')
            }
            const listCk = listAllSpecials.filter(x=>x._id===filters.ck);
            if (listCk.length!==0) {
                setNameCk(listCk[0].name)
            } else {
                setNameCk('');
            }
        }
    },[listAllHospitals,listAllSpecials, filters])

    return (
        <Box component="ul" className={classes.root}>
            {nameCk!=='' && 
                <Chip
                    className={classes.chip}
                    label={`Chuyên khoa: ${nameCk}`}
                    color='primary'
                    clickable={true}
                    size="small"
                    // onDelete={(filters)=>{

                    // }}
                />
            }
            {nameBv!=='' && 
                <Chip
                    className={classes.chip}
                    label={`${nameBv}`}
                    color='primary'
                    clickable={true}
                    size="small"
                    // onDelete={()=>{

                    // }}
                />
            }
            
        </Box>
    );
}

export default FilterViewer;