import React, { useState } from 'react'
import Modal from 'react-modal'
import Colors from '../../constants/colors.json'
import { createUseStyles } from 'react-jss'
import { alyTradeLogo, background } from 'assets'
import { useSelector } from 'react-redux'
import { useConfigModal }  from './useConfigModal'

const customStyles = {
    overlay: {
        zIndex: 20,
        background: `${Colors.dashboardBg}7F`,
    },
    content: {
        padding: 0,
        background: Colors.dashboardBg,
        zIndex: 25,
        border: '2px solid #7c8991',
        borderRadius: '10px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

const useStyle = createUseStyles({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    upSection: {
        background: '#04324b',
        display: 'flex',
        with: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    downSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    img: {
        width: "128px",
        height: "128px"
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'row',
        '& div': {
            display: 'flex',
            flexDirection: 'column',
            margin: '10px',
            alignItems: 'center',
            '& input': {
                borderRadius: '15px',
                background: '#162f3e',
                marginTop: '10px',
                color: 'white',
                padding: '5px 5px 5px 10px',
                border: 0
            },            
        }
    },
    buttonSection:{
        width: '100%',
        display: 'flex',
        justifyContent:'flex-end',
        marginTop:'20px',
        alignContent: 'right',
        '& strong': {
            margin: "5px",
            color: 'white',
            '&[type="button"]': {
                borderRadius: "50px",
                padding: "10px 40px 10px 40px",
                fontSize: "12px",
                fontWeight:"bold",
                background: "#062131",
                cursor: 'pointer',
                marginLeft: '25px',
                marginRight: '25px'
            }
        }
    }
})

Modal.setAppElement('#root')
const ConfigModal = ({ isOpen, setOpen }) => {
    const style = useStyle()
    const { onChange, state, submitUserData, formState} = useConfigModal({submitCallback:()=>setOpen(false)})

    return (<Modal
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
        style={customStyles}
    >
        <div className={style.container}>
            <div className={style.upSection}>
                <img
                    className={style.img}
                    src={alyTradeLogo}
                    alt='Alytrade Logo White'
                />
            </div>
            <div className={style.downSection}>
                <strong style={{ margin: '10px 0 20px 0', fontSize: '1.5rem', fontWeight: 'bolder' }}>Configuración</strong>
                <div className={style.formContainer}>
                    <div>
                        <h5>Informacion Personal</h5>
                        <input name="firstname" onChange={onChange} value={state['firstname']} placeholder='Nombre'></input>
                        <input name="lastname" onChange={onChange} value={state['lastname']} placeholder='Apellido'></input>
                        <input name="phone" onChange={onChange} value={state['phone']} placeholder='Telefono'></input>
                        <input name="country" onChange={onChange} value={state['country']} placeholder='Pais'></input>
                    </div>
                    <div>
                        <h5>Cambio de Contraseña</h5>
                        <input name="password" onChange={onChange} type="password" value={state['password']} placeholder='Contraseña Actual'></input>
                        <input name="password1" onChange={onChange} type="password" value={state['password1']} placeholder='Nueva Contraseña'></input>
                        <input name="password2" onChange={onChange} type="password" value={state['password2']} placeholder='Repita Contraseña'></input>
                    </div>
                    <div>
                        <h5>Email</h5>
                        <input name="email" onChange={onChange} value={state['email']}  placeholder='Correo Electrónico Actual'></input>
                        <input name="email1" onChange={onChange} value={state['email1']} placeholder='Nuevo Correo Electrónico'></input>
                    </div>
                </div>
                <div>
                    <h5 style={{color:'red'}}>{formState}</h5>
                </div>
                <div className={style.buttonSection}>
                    <strong onClick={()=>setOpen(false)} type='button'>Cancelar</strong>
                    <strong onClick={submitUserData} type='button' style={{background:'#186491'}}>Guardar</strong>
                </div>
            </div>
        </div>
    </Modal>)
}

export default React.memo(ConfigModal)