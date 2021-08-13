import React, { useState, useRef, useEffect } from "react"
import "./TelephoneField.scss"

// Import assets
import Countries from "../../utils/countries.json"

const TelephoneField = ({
    value = '',
    onChange = _ => { },
    onBlur = _ => { },
    readOnly = false
}) => {
    const [phone, setPhone] = useState('')
    const [phoneCode, setPhoneCode] = useState(-1)
    const [phoneCodeFocus, setPhoneCodeFocus] = useState(false)

    const inputRef = useRef(null)

    useEffect(_ => {
        // Si se pasa un valor por defecto, se precargan los datos según corresponde
        if (value.length > 0) {
            let filtered = Countries
                .map(({ phoneCode }) => phoneCode)
                .filter(item => item === value.substring(0, `${item}`.length))

            if (filtered.length > 0 && filtered[0].length > 0) {
                setPhoneCode(filtered[0])
                setPhone(value.substring(filtered[0].length))
            } else {
                setPhoneCode(-1)
                setPhone(value)
            }
        } else {
            setPhoneCode(-1)
            setPhone('')
        }
    }, [value])

    useEffect(_ => {
        // Si se escoge un código de país, se emiten los cambios según la entrada del usuario
        if (phoneCode !== -1) {
            onChange(`${phoneCode}${phone}`)
        }
    }, [phoneCode, phone])

    return (
        <div className="TelephoneField">
            <select
                disabled={readOnly}
                value={phoneCode}
                onFocus={_ => setPhoneCodeFocus(true)}
                onBlur={_ => setPhoneCodeFocus(false)}
                onChange={e => {
                    setPhoneCode(e.target.value || -1)
                    inputRef.current.focus()
                }}
                className="picker">
                <option value="-1" disabled hidden>
                    +000
                </option>
                {
                    Countries.map(({ name, phoneCode }, index) => (
                        <option key={index} value={phoneCode}>
                            {phoneCodeFocus ? `${name} (${phoneCode})` : phoneCode}
                        </option>
                    ))
                }
            </select>

            <input
                ref={inputRef}
                value={phone}
                readOnly={readOnly}
                onBlur={onBlur}
                onChange={e => {
                    // Se verifica que el valor ingresado coincida el patron de un teléfono
                    let regex = /^[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                        { value } = e.target

                    if (regex.test(value) || value.length === 0) {
                        setPhone(value)
                    }
                }}
                type="tel"
                className="text-input" />
        </div>
    )
}

export default TelephoneField