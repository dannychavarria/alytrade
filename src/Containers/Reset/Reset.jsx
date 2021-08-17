import React, { useState, useReducer } from "react"

// Import Components
import Recaptcha from "react-recaptcha"

import ActivityIndicator from "../../components/ActivityIndicator/Activityindicator"

// Import functions and constants
import { siteKeyreCaptcha, Petition } from "../../utils/constanst"
import validator from "validator"

// import assets and styles
import "./Reset.scss"
import logo from "../../assets/img/Alytrade_Orbe.png"//"../../static/images/logo.png"
import Swal from "sweetalert2"

import { createUseStyles } from "react-jss"

const useStyle = createUseStyles({
    input: {
        margin:'10px',
        backgroundColor: '#1d1d1d',
        border: '2px solid #000',
        borderRadius: '3px',
        color: '#fff',
        padding: '8px',
        transition: 'all 0.2s ease',
        outline: 'none',
        '&[name="code"]':{
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: '1.5em'
        }
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#9ed3da',
        border: 'none',
        borderRadius: '25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#1a1a1a',
        textTransform: 'uppercase',
        padding: '8px 15px',
        fontWeight: 'bold',
        fontSize: '14px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:disabled':{
            background:'darkgray'
        },
        /*margin: "10px",
        display: "flex",
        justifyContent: 'left',
        alignItems: 'center',*/
        '&:hover': {
            background: 'lightgray',
            cursor: 'pointer'
        }
    }
})

const initialState = {
    code: "",

    verifyCaptcha: "",

    // Email form
    email: "",

    password: "",
    otherPassword: "",

    // Loader component
    loader: false,
}

const reducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload
    }
}


const Reset = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const style = useStyle()

    // Estado que indica la vista final
    const [showPassword, setShowPassword] = useState(false)

    // Estado que indica que muestra opcion de escribir codigo
    const [writeCode, setWrite] = useState(false)

    /**
     * Metodo que se ejecuta cuando el usuario quiere escribir el codifo de seguridad
     * @param {*} e 
     */
    const onWrite = (e) => {
        e.preventDefault()

        setWrite(true)
    }

    /**
     * Metodo quer se ejecuta cuando el usuario decide cambiar 
     * 
     * @param {*} e 
     */
    const onWriteEmail = (e) => {
        e.preventDefault()

        setWrite(false)
    }


    /**
     * Metodo que envia la peticion para genera un codigo
     */
    const generateCode = async () => {
        try {
            if (!validator.isEmail(state.email)) {
                throw String("El correo electronico no es correcto")
            }

            dispatch({ type: "loader", payload: true })

            // ejecutamos la peticion para solicitar el PIN
            const { data } = await Petition.post("/alytrade/reset-password/generate", { email: state.email })

            // validamos si hay un error en el server
            if (data.error) {
                throw String(data.message)
            }

            if (data.response === "success") {
                Swal.fire("Pin generado", "Revise su correo para obtener el codigo de seguridad", "success").then(() => setWrite(true))
            } else {
                throw String("El pin no se ha podido generar, contacte a soporte")
            }
        } catch (error) {
            Swal.fire("Ha ocurrido un error", error.toString(), "error")
        } finally {
            dispatch({ type: "loader", payload: false })
        }
    }

    /**
     * Metodo q
     */
    const sendSecurityCode = async () => {
        try {
            dispatch({ type: "loader", payload: true })

            const { code } = state

            // validamos todos los codigos
            if (code.trim().length !== 6) {
                throw String("Pin incorrecto, intente de nuevo")
            }

            // validamos si el pin tiene un formato correcto
            if (!validator.isInt(code)) {
                throw String("Formato de PIN no es correcto")
            }

            // validamos si el capctha es correcto
            if (state.verifyCaptcha.length === 0) {
                throw String("Verifique el reCaptcha")
            }

            // creamos el datos que enviaremos del server
            const dataSend = {
                pin: code,
                password: state.password,
                "g-recaptcha-response": state.verifyCaptcha
            }

            // Ejecutamos la peticion para generar el pin
            const { data } = await Petition.post("/alytrade/reset-password/pin", dataSend, {
                params: {
                    secret: state.verifyCaptcha
                }
            })

            // verificamos si hay error en el server
            if (data.error) {
                throw String(data.message)
            }

            // verificamos si todo esta correcto
            if (data.response === "success") {
                Swal.fire("Listo", "Tu contraseña se ha actualizado", "success")
                    .then(_ => {
                        window.location.hash = "#/"
                    })
            }

        } catch (error) {
            Swal.fire("Ha ocurrido un incoveniente", error.toString(), "warning")
        } finally {
            dispatch({ type: "loader", payload: false })
        }
    }

    /**
     * Funcion que valida el pin de seguridada
     */
    const onNextToPassword = () => {
        try {
            // validamos si el pin tiene un formato correcto
            if (!validator.isInt(state.code)) {
                throw String("Formato de PIN no es correcto")
            }

            setShowPassword(true)
        } catch (error) {
            Swal.fire("Ha ocurrido un incoveniente", error.toString(), "warning")
        }
    }

    return (
        <div className="container-reset" style={{background:'#1d1d1d'}}>

            <div className="content">
                <img className="logo" style={{width:'100px',height:'100px'}} src={logo} alt="logo" />

                {
                    !showPassword &&
                    <>
                        {
                            !writeCode &&
                            <>
                                <h3>Escribe tu correo</h3>

                                <div className="row code">
                                    <input
                                        value={state.email}
                                        onChange={e => dispatch({ type: "email", payload: e.target.value })}
                                        type="email"
                                        placeholder="Correo electrónico"
                                        autoFocus
                                        className={style.input}/>

                                </div>

                                <div className="row buttons">
                                    {
                                        !state.loader &&
                                        <>
                                            <a href="#" onClick={onWrite} className="write">Escribir PIN de seguridad</a>

                                            <button className={style.button} disabled={state.loader} onClick={generateCode}>Enviar PIN</button>
                                        </>
                                    }

                                    {
                                        state.loader &&
                                        <ActivityIndicator size={64} />
                                    }
                                </div>

                                <p>
                                    Para que todo este seguro, enviaremos un PIN de seguridad a tu correo electrónico.

                                    Ten en cuenta que si ya tienes un Pin de seguridad tienes que escribirlo ya que no podrás volverlo a solicitar.
                                </p>
                            </>
                        }

                        {
                            writeCode &&
                            <>
                                <h3>Escribe el PIN de seguridad</h3>

                                <div className="row code">
                                    <input
                                        value={state.code}
                                        onChange={e => dispatch({ type: "code", payload: e.target.value })}
                                        className={style.input}
                                        name='code'
                                        maxLength={6}
                                        type="text"
                                        autoFocus />
                                </div>

                                {
                                    state.loader &&
                                    <ActivityIndicator size={64} />
                                }

                                {
                                    !state.loader &&
                                    <div className="row buttons">
                                        <a href="#" onClick={onWriteEmail} className="write">Ingresar correo</a>

                                        <button onClick={onNextToPassword} className={style.button}>Siguiente</button>
                                    </div>
                                }
                            </>
                        }
                    </>
                }

                {
                    showPassword &&
                    <>
                        <div className="row password">
                            <input className={style.input} placeholder="Escribe tu contraseña" type="password" value={state.password} onChange={e => dispatch({ type: "password", payload: e.target.value })} />

                            <input className={style.input} placeholder="Confirma tu contraseña" type="password" value={state.otherPassword} onChange={e => dispatch({ type: "otherPassword", payload: e.target.value })} />
                        </div>

                        <div className="row captcha">
                         <Recaptcha
                                size={128}
                                verifyCallback={payload => dispatch({ type: "verifyCaptcha", payload })} sitekey={siteKeyreCaptcha} /> 
                        </div>


                        {
                            state.loader &&
                            <ActivityIndicator size={64} />
                        }

                        {
                            !state.loader &&
                            <div className="row buttons">
                                <button onClick={_ => setShowPassword(false)} className={style.button}>Cancelar</button>

                                <button disabled={state.password === "" || state.password !== state.otherPassword} onClick={sendSecurityCode} className={style.button}>Finalizar</button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Reset