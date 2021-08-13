import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import './KycUserForm.scss'

// Import utils
import { calcAge, MAX_FILE_SIZE, compressImage } from '../../utils/constanst'
import {
  nameRegex,
  identificationRegex,
  postalCodeRegex,
  floatRegex,
} from '../../utils/regexPatterns'

// Import asset's
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg'
import Countries from '../../utils/countries.json'

// Import components
import TelephoneField from '../TelephoneField/TelephoneField'

const KycUserForm = ({
  state = {},
  setState = _ => {},
  onChangeUserAge = _ => {},
  secondaryTypeForm = 0,
  isReadOnly = false,
  className = '',
}) => {
  const [idFileURL, setIdFileURL] = useState(null)
  const [profileFileURL, setProfileFileURL] = useState(null)

  const [userAge, setUserAge] = useState(0)

  /**
   * Captura el archivo seleccionado y crea un objectURL para generar una vista previa
   * @param {Event} e
   */
  const handleChangeProfileFile = async e => {
    const file = await compressImage(e.target.files[0])

    if (!file) {
      return
    }

    if (file && file.size > MAX_FILE_SIZE) {
      Swal.fire(
        'Archivo demasiado grande',
        '¡Ups! El archivo que intentas subir es demasiado grande, nuestro límite es de 7MB',
        'error'
      )
      return
    }

    setProfileFileURL(URL.createObjectURL(file))
    setState({ ...state, profilePicture: file })
  }

  /**
   * Captura el archivo seleccionado y crea un objectURL para generar una vista previa
   * @param {Event} e
   */
  const handleChangeIdFile = async e => {
    const file = await compressImage(e.target.files[0])

    if (!file) {
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      Swal.fire(
        'Archivo demasiado grande',
        '¡Ups! El archivo que intentas subir es demasiado grande, nuestro límite es de 7MB',
        'error'
      )
      return
    }

    setIdFileURL(URL.createObjectURL(file))
    setState({ ...state, IDPicture: file })
  }

  // Se calcula la edad del usuario según cambia la información del usuario
  const calculateUserAge = async birthDate => {
    let _userAge = calcAge(birthDate)

    setUserAge(_userAge)
    onChangeUserAge(_userAge)
  }

  useEffect(
    _ => {
      if (state.hasOwnProperty('profilePicture')) {
        setProfileFileURL(URL.createObjectURL(state.profilePicture))
      }

      if (state.hasOwnProperty('IDPicture')) {
        setIdFileURL(URL.createObjectURL(state.IDPicture))
      }

      if (state.hasOwnProperty('birthday')) {
        calculateUserAge(state.birthday)
      }
    },
    [state.profilePicture, state.IDPicture]
  )

  useEffect(
    _ => {
      if (state.nationality && isNaN(parseInt(state.nationality))) {
        const index = Countries.findIndex(
          item => item.phoneCode === state.nationality
        )
        setState({ ...state, nationality: index })
      }

      if (state.residence && isNaN(parseInt(state.residence))) {
        const index = Countries.findIndex(
          item => item.phoneCode === state.residence
        )
        setState({ ...state, residence: index })
        console.log('inside')
      }
    },
    [state.nationality, state.residence]
  )

  useEffect(
    _ => {
      const dateRegex = /^([\d]{4})+[\-]+([\d]{2})+[\-]+([\d]{2})$/
      if (isReadOnly && Object.keys(state).length > 0) {
        console.log(!dateRegex.test(state.birthday))
        if (!dateRegex.test(state.birthday)) {
          let value = moment(new Date(state.birthday)).format('YYYY-MM-DD')
          setState({ ...state, birthday: value })
        }
      }
    },
    [state.birthday]
  )

  return (
    <div className={`KycUserForm ${className}`}>
      <div className="section">
        {!isReadOnly && (
          <>
            {secondaryTypeForm === 0 && (
              <h2 className="title">Ingrese su información personal</h2>
            )}

            {secondaryTypeForm === 1 && (
              <h2 className="title">
                Ingrese la información de su tutor o representante legal
              </h2>
            )}

            {secondaryTypeForm === 2 && (
              <h2 className="title">
                Ingrese la información de su beneficiario
              </h2>
            )}
          </>
        )}

        {isReadOnly && <h2 className="title">Información beneficiario</h2>}

        <div className="content">
          <div className="content-item">
            {/**
             *
             * Sección de la información básica
             *
             */}
            <div className="subsection">
              <h3 className="subtitle">1. Información personal</h3>

              {secondaryTypeForm !== 0 && (
                <>
                  <div className="row__kyc--person">
                    <span className="required">Nombre(s)</span>
                    <input
                      autoFocus
                      readOnly={isReadOnly}
                      value={state.firstname || ''}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({ ...state, firstname: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--person">
                    <span className="required">Apellido(s)</span>
                    <input
                      value={state.lastname || ''}
                      readOnly={isReadOnly}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({ ...state, lastname: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </>
              )}

              <div className="row__kyc--person">
                <span className="required">Fecha de nacimiento</span>
                <input
                  value={
                    state.birthday || moment(new Date()).format('YYYY-MM-DD')
                  }
                  onChange={e => {
                    let { value } = e.target

                    if (value) {
                      calculateUserAge(value)
                      setState({ ...state, birthday: value })
                    }
                  }}
                  type="date"
                  className="picker"
                />
              </div>

              {(userAge >= 18 || secondaryTypeForm !== 0) && (
                <>
                  <div className="row__kyc--person toshow">
                    <span className="required">Tipo de identificación</span>

                    <select
                      disabled={isReadOnly}
                      value={state.identificationType || -1}
                      onChange={e => {
                        setState({
                          ...state,
                          identificationType: e.target.value,
                        })
                      }}
                      className="picker"
                    >
                      <option value="-1" disabled hidden>
                        Selecciona un tipo de identificación
                      </option>
                      <option value="1">Identificación personal</option>
                      <option value="2">Pasaporte</option>
                    </select>
                  </div>

                  <div className="row__kyc--person toshow">
                    <span className="required">Número de identificación</span>
                    <input
                      readOnly={isReadOnly}
                      value={state.identificationNumber || ''}
                      onChange={e =>
                        identificationRegex(e.target.value).then(value =>
                          setState({ ...state, identificationNumber: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </>
              )}

              {secondaryTypeForm !== 0 && (
                <div className="row__kyc--person">
                  <span className="required">Parentesco</span>

                  <select
                    disabled={isReadOnly}
                    value={state.relationship || -1}
                    onChange={e =>
                      setState({ ...state, relationship: e.target.value })
                    }
                    className="picker"
                  >
                    <option value="-1" disabled hidden>
                      Selecciona un parentesco
                    </option>
                    <option value="1">Padre / Madre</option>
                    <option value="2">Hermano(a)</option>
                    <option value="3">Tío(a)</option>
                    <option value="4">Abuelo(a)</option>
                    <option value="5">Otro</option>
                  </select>
                </div>
              )}
            </div>

            {/**
             *
             * Sección de la información de contacto
             *
             */}
            <div className="subsection">
              <h3 className="subtitle">2. Información de contacto</h3>

              {secondaryTypeForm !== 0 && (
                <div className="row__kyc--person">
                  <span className="required">Correo electrónico</span>
                  <input
                    value={state.email || ''}
                    onChange={e =>
                      setState({ ...state, email: e.target.value })
                    }
                    type="email"
                    className="text-input"
                  />
                </div>
              )}

              {secondaryTypeForm !== 0 && (
                <div className="row__kyc--person">
                  <span className="required">Número de teléfono principal</span>
                  <TelephoneField
                    readOnly={isReadOnly}
                    value={state.principalNumber || ''}
                    onChange={value =>
                      setState({
                        ...state,
                        principalNumber: value,
                      })
                    }
                    className="text-input"
                  />
                </div>
              )}

              <div className="row__kyc--person">
                <span>Número de teléfono alternativo</span>
                <TelephoneField
                  readOnly={isReadOnly}
                  value={state.alternativeNumber || ''}
                  onChange={value =>
                    setState({
                      ...state,
                      alternativeNumber: value,
                    })
                  }
                  className="text-input"
                />
              </div>
            </div>
          </div>

          <div className="content-item">
            {/**
             *
             * Sección de la nacionalidad y residencia
             *
             */}
            <div className="subsection">
              <h3 className="subtitle">3. Nacionalidad y residencia</h3>

              <div className="row__kyc--person">
                <span className="required">Nacionalidad</span>
                <select
                  disabled={isReadOnly}
                  value={state.nationality || -1}
                  onChange={e =>
                    setState({ ...state, nationality: e.target.value })
                  }
                  className="picker"
                >
                  <option value="-1" disabled hidden>
                    Seleccione un país
                  </option>

                  {Countries.map(({ name }, index) => (
                    <option key={index} value={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row__kyc--person">
                <span className="required">País de residencia</span>
                <select
                  disabled={isReadOnly}
                  value={state.residence || -1}
                  onChange={e =>
                    setState({ ...state, residence: e.target.value })
                  }
                  className="picker"
                >
                  <option value="-1" disabled hidden>
                    Seleccione un país
                  </option>

                  {Countries.map(({ name }, index) => (
                    <option key={index} value={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row__kyc--person">
                <span className="required">Estado / Provincia / Región</span>
                <input
                  readOnly={isReadOnly}
                  value={state.province || ''}
                  onChange={e =>
                    nameRegex(e.target.value).then(value =>
                      setState({ ...state, province: value })
                    )
                  }
                  type="text"
                  className="text-input"
                />
              </div>

              <div className="row__kyc--person">
                <span className="required">Ciudad</span>
                <input
                  readOnly={isReadOnly}
                  value={state.city || ''}
                  onChange={e =>
                    nameRegex(e.target.value).then(value =>
                      setState({ ...state, city: value })
                    )
                  }
                  type="text"
                  className="text-input"
                />
              </div>

              <div className="row__kyc--person">
                <span className="required">Dirección (línea 1)</span>
                <input
                  readOnly={isReadOnly}
                  value={state.direction1 || ''}
                  onChange={e =>
                    setState({ ...state, direction1: e.target.value })
                  }
                  ype="text"
                  className="text-input"
                />
              </div>

              <div className="row__kyc--person">
                <span>Dirección (línea 2)</span>
                <input
                  readOnly={isReadOnly}
                  value={state.direction2 || ''}
                  onChange={e =>
                    setState({ ...state, direction2: e.target.value })
                  }
                  type="text"
                  className="text-input"
                />
              </div>

              <div className="row__kyc--person">
                <span className="required">Código postal</span>
                <input
                  readOnly={isReadOnly}
                  value={state.postalCode || ''}
                  onChange={e =>
                    postalCodeRegex(e.target.value).then(value =>
                      setState({ ...state, postalCode: value })
                    )
                  }
                  type="text"
                  className="text-input"
                />
              </div>
            </div>
          </div>

          <div className="content-item">
            {
              /**
               *
               * Sección de la pregunta de control
               *
               */
              (userAge >= 18 || secondaryTypeForm !== 0) && (
                <div className="subsection toshow">
                  <h3 className="subtitle">4. Pregunta de control</h3>

                  <div className="row__kyc--person">
                    <span className="required">
                      ¿De dónde provienen tus ingresos?
                    </span>
                    <select
                      disabled={isReadOnly}
                      value={state.foundsOrigin || -1}
                      onChange={e =>
                        setState({ ...state, foundsOrigin: e.target.value })
                      }
                      className="picker"
                    >
                      <option value="-1" disabled hidden>
                        Seleccione un origen de ingreso
                      </option>
                      <option value="0">Ahorros</option>
                      <option value="1">Herencia</option>
                      <option value="2">Pensión</option>
                      <option value="3">Salario</option>
                      <option value="4">Otro</option>
                    </select>
                  </div>

                  <div className="row__kyc--person">
                    <span className="required">
                      ¿Cuál es el monto estimado a guardar mensualmente? ($)
                    </span>

                    <input
                      readOnly={isReadOnly}
                      value={state.estimateMonthlyAmount || ''}
                      onChange={e =>
                        floatRegex(e.target.value).then(value =>
                          setState({
                            ...state,
                            estimateMonthlyAmount: value,
                          })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--person">
                    <span className="required">
                      ¿Cuál es su profesión actual?
                    </span>

                    <input
                      readOnly={isReadOnly}
                      value={state.profession || ''}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({
                            ...state,
                            profession: value,
                          })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </div>
              )
            }

            {/**
             *
             * Sección de la subida de archivos
             *
             */}
            <div className="subsection">
              {userAge < 18 && secondaryTypeForm === 0 && (
                <h3 className=" subtitle">4. Foto de perfil y verificación</h3>
              )}

              {(userAge >= 18 || secondaryTypeForm !== 0) && (
                <h3 className=" subtitle">5. Foto de perfil y verificación</h3>
              )}

              {!isReadOnly && (
                <div className="row__kyc--person horizontal upload-section">
                  <span className="required">
                    Adjuntar foto de perfil sosteniendo su identificación
                  </span>

                  <label
                    title="Subir archivo"
                    htmlFor="profile-picture"
                    className="upload"
                  >
                    <UploadIcon />
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    accept=".jpeg,.jpg,.jpe,.png"
                    onChange={handleChangeProfileFile}
                  />
                </div>
              )}

              {isReadOnly && (
                <div className="row__kyc--person horizontal upload-section">
                  <span>Foto de perfil</span>
                </div>
              )}

              {profileFileURL !== null && (
                <div className="row__kyc--person centered">
                  <img src={profileFileURL} alt="" className="img-preview" />
                </div>
              )}

              <div className="row__kyc--person horizontal upload-section">
                {!isReadOnly && (
                  <>
                    {userAge < 18 && secondaryTypeForm === 0 && (
                      <span className="required">
                        Adjuntar foto certificado nacimiento
                      </span>
                    )}

                    {(userAge >= 18 || secondaryTypeForm !== 0) &&
                      state.identificationType != 2 && (
                        <span className="required">
                          Adjuntar foto identificación personal
                        </span>
                      )}

                    {(userAge >= 18 || secondaryTypeForm !== 0) &&
                      state.identificationType == 2 && (
                        <span className="required">
                          Adjuntar foto pasaporte
                        </span>
                      )}
                  </>
                )}

                {isReadOnly && (
                  <>
                    {state.identificationType != 2 && (
                      <span>Foto identificación personal</span>
                    )}

                    {state.identificationType == 2 && (
                      <span>Foto pasaporte</span>
                    )}
                  </>
                )}

                {!isReadOnly && (
                  <>
                    <label
                      title="Subir archivo"
                      htmlFor="id-picture"
                      className="upload"
                    >
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      id="id-picture"
                      accept=".jpeg,.jpg,.jpe,.png"
                      onChange={handleChangeIdFile}
                    />
                  </>
                )}
              </div>

              {idFileURL !== null && (
                <div className="row__kyc--person centered">
                  <img src={idFileURL} alt="" className="img-preview" />
                </div>
              )}

              {userAge >= 18 && secondaryTypeForm === 0 && (
                <div className="subsection">
                  <h3 className="subtitle">6. Beneficiario</h3>

                  <div className="row__kyc--person">
                    <label className="check-input">
                      Añadir beneficiario
                      <input
                        checked={state.addBeneficiary || false}
                        onChange={e => {
                          setState({
                            ...state,
                            addBeneficiary: !state.addBeneficiary && true,
                          })
                        }}
                        type="checkbox"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KycUserForm
