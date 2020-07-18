import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Box from '@material-ui/core/Box';

function ErrorPage(props) {
    console.log(props)
	return (
		<Header>
			<Box my={2}>
				<p>Error: {props.error}</p>
			</Box>
		</Header>
		
	);
}

export default ErrorPage;
