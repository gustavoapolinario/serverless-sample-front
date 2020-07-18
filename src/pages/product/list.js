import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Header from "components/Header";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@material-ui/core';
import ErrorPage from 'components/ErrorPage'
import LoadingPage from 'components/LoadingPage'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ProductListPage(props) {
    const classes = useStyles();

    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
 
    const fetchData = async _ => {
        console.log('fetchData')
        fetch('http://localhost:3000/dev/product')
            .then(res => res.json())
            .then(res => {
                setProductList(res)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err)
                setIsLoading(false)
            });
    }
    
    useEffect(_ => {
        fetchData();
    }, []);

    if ( error )
        return <ErrorPage error={error}/>

    if ( isLoading )
        return <LoadingPage />

    console.log('productList', productList)
    return (
        <Header>
            <List dense className={classes.root}>
                {productList.map(product => {
                    const labelId = `product-${product.id}`;
            
                    return (
                        <ListItem key={labelId} role={undefined} dense button>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    value={product.id}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={product.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Header>
    );
}

ReactDOM.render(<ProductListPage />, document.getElementById("root"));
