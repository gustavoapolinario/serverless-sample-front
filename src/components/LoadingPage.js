import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "components/Header";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
}));

function LoadingPage(props) {
    console.log(props)
    const classes = useStyles();
	return (
		<Header>
            <div className={classes.root}>
			    <CircularProgress />
            </div>
		</Header>
		
	);
}

export default LoadingPage;
