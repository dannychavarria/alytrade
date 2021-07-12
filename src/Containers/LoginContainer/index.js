import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router-dom'
import user from '../../assets/icon/user.svg'
import lock from '../../assets/icon/lock.svg'
import mail from '../../assets/icon/mail.svg'
import {  Login } from '../../reducers/DashboardReducer'
import { useDispatch } from 'react-redux'
const useStyle = createUseStyles({
    Container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        '& div ': {
            display: 'flex',
            flexDirection: 'column',
            top: '-20%',
            position: 'relative',
            borderRadius: '10px',
            padding: '2.5rem',

        },
        '& input': {
            minWidth: '20rem',
            padding: '0.8rem',
            borderColor: 'lightgray',
            border: '1px',
            borderStyle: 'solid',
            borderRadius: '0.5rem',
            margin: '0 0 1rem 0',
            '&[type="text"]': {
                background: `url(${user}) no-repeat 7px 7px`,
                paddingLeft: '40px'
            },
            '&[type="password"]': {
                background: `url(${lock}) no-repeat 7px 7px`,
                paddingLeft: '40px',
                marginBottom: '1rem',
            }
        },
        '& button': {
            width: "100%",
            borderStyle: 'solid',
            borderRadius: '5px',
            padding: '0.8rem',
            fontWeight: 'bold',
            '&:hover': {
                background: '#d1d1d1'
            }
        }
    }
})
const initialState = {
    email: 'fedoral10@gmail.com',
    password: 'empires1',
}
const LoginContainer = (props) => { 
    const style = useStyle()
    const history = useHistory()
    const [state, setState] = useState(initialState)
    const dispatcher = useDispatch()
    const onChangeEvent = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const loginEvent = (e) => {
        e.preventDefault()
        // const loginDiv = document.getElementById('login')
        // loginDiv.cursor='wait'
        console.log("Entro al evento")
        console.log(state)

        dispatcher(Login(state.email,state.password,()=>{
            history.push('/dashboard')
            console.log('hizo el push')
        }))
        /*api.login(state.email,state.password).then(token => {
            sessionStorage.setItem("token", token)
            
            loginDiv.cursor='default'
        }).catch(err => {
            console.error(err)
            loginDiv.cursor='default'
        })*/
    }

    return (<>
        <div className={style.Container} id="login">
            <div>
                <label>Email</label>
                <input name="email" type="text" placeholder="Type your Email"
                    onChange={onChangeEvent} value={state['email']}
                />

                <label>Password</label>
                <input name="password" type="password" placeholder="Type your Password"
                    onChange={onChangeEvent} value={state['password']}
                />
                <button onClick={loginEvent}>Log In</button>
            </div>
        </div>
    </>)
}

export default LoginContainer
