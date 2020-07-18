import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Box from '@material-ui/core/Box';

class Index extends React.Component {
	render() {
		return (
			<Header>
				<Box my={2}>
					<p>Index page: Random text here... entertain hour diplomat automatic grind steep senior pedestrian output wisecrack skip.</p>
				</Box>
			</Header>
			
		);
	}
}

ReactDOM.render(<Index />, document.getElementById("root"));
