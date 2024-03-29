import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Cookies from 'js-cookie';
import { AppBar, Container, Toolbar, Typography,Link,createMuiTheme,ThemeProvider, CssBaseline, Switch } from '@material-ui/core';

export default function Layout({title,description,children}){
    const { state, dispatch} = useContext(Store);
    const { darkMode } = state;
    const theme = createMuiTheme({
        typography:{
            h1:{
                fontSize:'1.6rem',
                fontWeight:400,
                margin:'1rem 0',
            },
            h2:{
                fontSize:'1.4rem',
                fontWeight:400,
                margin:'1rem 0',
            },
            body1:{
                fontWeight:'normal',
            },
        },
        palette:{
            type:darkMode ? 'dark':'light',
            primary:{
                main:'#f0c000',
            },
            secondary:{
                main:'#208080',
            },
        },
    });
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({type: darkMode ? 'DARK_MODE_OFF':'DARK_MODE_ON'});
        const newDarkMode = !darkMode;
        Cookies.set('darkMode',newDarkMode? 'ON':'OFF');
    };
    return (
        <div>
            <Head>
                <title>{title? `${title} - Next Amazon`:'Next Amazon'}</title>
                {description && <meta name="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography className={classes.brand}>amazon</Typography>
                            </Link>
                        </NextLink>
                        <div className={classes.grow}></div>  
                        <div>
                            <Switch checked={darkMode}
                            onChange={darkModeChangeHandler}
                            ></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>Cart</Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        </div> 
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>{children}</Container>
                <footer className={classes.footer}>
                    <Typography>All rights reserved. Next Amazon</Typography>
                </footer>
            </ThemeProvider>
        </div>
    )
}