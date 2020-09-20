import React, { useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const SignupForm = () =>
{
    const classes = useStyles();
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const clickHandler = () =>
    {
        const body =
        {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        //console.log( emailRef.current.value)
        Axios.post('http://localhost:3000/api/signup', body)
        .then(res =>
            {
                //console.log(res.data)
                if(res.data.already) emailRef.current.value=""
                else router.push('/')
                
            })
    }




    return (
        <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
            Sign Up
            </Typography>
            <div className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                   // ref={emailRef}
                    inputRef={emailRef}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={passwordRef}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={clickHandler}
                >
                    Sign Up
                </Button>
            </div>
        </div>
        </Container>
    )
}



export default SignupForm