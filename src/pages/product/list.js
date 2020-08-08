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
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


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
 
    const errorHandler = err => {
        console.log('errorHandler: ', err)
        setError(err)
        setIsLoading(false)
    }

    const statusRequest = res => {
        console.log('status:', res)
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    }

    const fetchData = async _ => {
        fetch('http://localhost:3000/dev/product')
            .then(statusRequest)
            .then(res => res.json())
            .then(res => {
                setProductList(res)
                setIsLoading(false)
            })
            .catch(err => {
                errorHandler(err)
            });
    }
    
    useEffect(_ => {
        fetchData();
    }, []);

    const deleteItem = (id, bt) => {
        console.log('delete: ', id, bt)
        fetch(`http://localhost:3000/dev/product/${id}`, { method: 'DELETE' })
            .then(statusRequest)
            .then(res => {
                setProductList(productList.filter(product => product.id != id))
                setIsLoading(false)
            })
            .catch(err => {
                errorHandler(err)
            });
    }

    if ( error )
        return <ErrorPage error={String(error)}/>

    if ( isLoading )
        return <LoadingPage />

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
                                <Tooltip title="Edit" aria-label="edit">
                                    <IconButton edge="end">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" aria-label="delete">
                                    <IconButton edge="end" onClick={() => { deleteItem(product.id, this) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Header>
    );
}

ReactDOM.render(<ProductListPage />, document.getElementById("root"));
