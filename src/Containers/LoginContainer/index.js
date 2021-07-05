import React from 'react'
import { createUseStyles } from 'react-jss'
import { useHistory } from 'react-router-dom'
/*
background: url(images/comment-author.gif) no-repeat scroll 7px 7px;
padding-left:30px;
*/
import user from '../../assets/icon/user.svg'
import lock from '../../assets/icon/lock.svg'
import mail from '../../assets/icon/mail.svg'

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

const LoginContainer = () => {
    const style = useStyle()
    const history = useHistory()

    const loginEvent = (e) => {
        e.preventDefault()
        console.log("asdfasd")
        localStorage.setItem("token", "prueba")
        history.push('/dashboard')
    }

    return (<>
        <div className={style.Container}>
            <div>
                <label>Email</label>
                <input name="email" type="text" placeholder="Type your Email" />

                <label>Password</label>
                <input name="password" type="password" placeholder="Type your Password" />
                <button onClick={loginEvent}>Log In</button>
            </div>
        </div>
    </>)
}

export default LoginContainer
