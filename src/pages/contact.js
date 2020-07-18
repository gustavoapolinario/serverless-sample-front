import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Box from '@material-ui/core/Box';

function Contact() {
	return (
		<Header>
			<Box my={2}>
				<p>Contact page: Create by Gustavo Apolinario gustavo.guss@gmail.com</p>
			</Box>
		</Header>
		
	);
}

ReactDOM.render(<Contact />, document.getElementById("root"));
