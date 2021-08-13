import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import './KycEcommerceBeneficialOwner.scss'

// Import components
import TelephoneField from '../TelephoneField/TelephoneField'

// Import assets
import Countries from '../../utils/countries.json'
import UploadIcon from '../../assets/icons/Recurso 2.png'
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg'
import { ReactComponent as RemovePhotoIcon } from '../../assets/icons/close.svg'

// Import utils
import { ecommerceValidations } from '../../utils/kycFormValidations'
import { randomKey, MAX_FILE_SIZE, compressImage } from '../../utils/constanst'
import {
  nameRegex,
  identificationRegex,
  postalCodeRegex,
  floatRegex,
} from '../../utils/regexPatterns'

const KycEcommerceBeneficialOwner = ({
  onSubmit = _ => { },
  onChange = null,
}) => {
  // Estado para almacenar la previsualización de la imagen del pasaporte del propietario beneficiario
  const [passportPicturePreview, setPassportPicturePreview] = useState(null)
  // Estado para almacenar la previsualización de la imagen de la cédula
  const [personalIdPreview, setPersonalIdPreview] = useState(null)

  const [state, setState] = useState({})

  const inputFileId = randomKey()
  const [emitOnChange, setEmitOnChange] = useState(true)

  // Se emiten los cambios en el state cuando se usa el componente para completar la
  // info del representante legal
  const dispatchOnChange = {
    onBlur: _ => {
      if (onChange !== null) {
        setEmitOnChange(!emitOnChange)
      }
    },
  }

  /**
   * Captura el archivo seleccionado y crea un objectURL para generar una vista previa
   * @param {Event} e
   * @param {React.setState} dispatch
   */
  const handleLoadPreview = async (e, dispatchPreview, dispatch) => {
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

    dispatchPreview(URL.createObjectURL(file))
    dispatch(file)

    if (onChange !== null) {
      setEmitOnChange(!emitOnChange)
    }
  }

  useEffect(
    _ => {
      if (onChange !== null) {
        onChange(state)
      }
    },
    [emitOnChange]
  )

  return (
    <div className="KycEcommerceBeneficialOwner">
      <section className="inputs__container">
        <section className="form__column">
          <div className="form__group">
            <span>Título del cargo</span>
            <input
              value={state.chargeTitle || ''}
              {...dispatchOnChange}
              onChange={e =>
                nameRegex(e.target.value).then(value =>
                  setState({ ...state, chargeTitle: value })
                )
              }
              type="text"
              className="text-input"
            />
          </div>

          <div className="form__group">
            <span>Nombre completo</span>
            <input
              value={state.fullname || ''}
              {...dispatchOnChange}
              onChange={e =>
                nameRegex(e.target.value).then(value =>
                  setState({ ...state, fullname: value })
                )
              }
              type="text"
              className="text-input"
            />
          </div>

          {onChange === null && (
            <div className="form__group">
              <span>Fecha de nacimiento</span>
              <input
                {...dispatchOnChange}
                value={
                  state.birthday || moment(new Date()).format('YYYY-MM-DD')
                }
                onChange={e => {
                  const { value } = e.target

                  if (value) {
                    setState({ ...state, birthday: value })
                  }
                }}
                type="date"
                className="picker"
              />
            </div>
          )}

          <div className="form__group">
            <span>No. identificación personal</span>
            <input
              {...dispatchOnChange}
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

          <div className="form__group">
            <span>Número de pasaporte</span>
            <input
              {...dispatchOnChange}
              value={state.passportNumber || ''}
              onChange={e =>
                identificationRegex(e.target.value).then(value =>
                  setState({ ...state, passportNumber: value })
                )
              }
              type="text"
              className="text-input"
            />
          </div>

          {state.passportNumber && state.passportNumber.length > 0 && (
            <div className="form__group toshow">
              <span>País de emisión pasaporte</span>
              <select
                {...dispatchOnChange}
                value={state.passportEmissionCountry || -1}
                onChange={e =>
                  setState({
                    ...state,
                    passportEmissionCountry: e.target.value,
                  })
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
          )}

          <div className="form__group">
            <span>País de origen</span>
            <select
              {...dispatchOnChange}
              value={state.originCountry || -1}
              onChange={e =>
                setState({ ...state, originCountry: e.target.value })
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
        </section>

        <section className="form__column">
          {onChange === null && (
            <>
              <div className="form__group">
                <span>Estado / Provincia / Región</span>
                <input
                  {...dispatchOnChange}
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

              <div className="form__group">
                <span>Ciudad</span>
                <input
                  {...dispatchOnChange}
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
            </>
          )}
          <div className="form__group">
            <span>Dirección</span>
            <input
              {...dispatchOnChange}
              value={state.direction || ''}
              onChange={e => setState({ ...state, direction: e.target.value })}
              type="text"
              className="text-input"
            />
          </div>

          {onChange === null && (
            <>
              <div className="form__group">
                <span>Código postal</span>
                <input
                  {...dispatchOnChange}
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

              <div className="form__group">
                <span>Participación (%)</span>
                <input
                  {...dispatchOnChange}
                  value={state.participationPercentage || ''}
                  onChange={e =>
                    floatRegex(e.target.value).then(value =>
                      setState({ ...state, participationPercentage: value })
                    )
                  }
                  type="text"
                  className="text-input"
                />
              </div>
            </>
          )}

          <div className="form__group">
            <span>No. identificación tributaria (opcional)</span>
            <input
              {...dispatchOnChange}
              value={state.identificationTaxNumber || ''}
              onChange={e =>
                identificationRegex(e.target.value).then(value =>
                  setState({ ...state, identificationTaxNumber: value })
                )
              }
              type="text"
              className="text-input"
            />
          </div>

          <div className="form__group">
            <span>Correo</span>
            <input
              {...dispatchOnChange}
              type="email"
              className="text-input"
              value={state.email || ''}
              onChange={e => setState({ ...state, email: e.target.value })}
            />
          </div>

          {onChange !== null && (
            <div className="form__group">
              <span>Teléfono</span>
              <TelephoneField
                value={state.telephoneNumber || ''}
                {...dispatchOnChange}
                onChange={value =>
                  setState({ ...state, telephoneNumber: value })
                }
              />
            </div>
          )}
        </section>
      </section>

      <div className="footer">
        <div className="uploads-container">
          {state.identificationNumber && state.identificationNumber.length > 0 && (
            <div className="photo__item">
              <span className="label white">Foto de identificación</span>
              {personalIdPreview === null && (
                <div className="upload-section toshow">
                  <div>
                    <label
                      title="Subir archivo"
                      htmlFor={`personalId-picture-${inputFileId}`}
                      className="upload required"
                    >
                      <img src={UploadIcon} className="icon__upload" alt="" />
                      Presiona para subir una fotografia
                    </label>
                    <input
                      className="input__hide"
                      type="file"
                      accept=".jpeg,.jpg,.jpe,.png"
                      id={`personalId-picture-${inputFileId}`}
                      onChange={e =>
                        handleLoadPreview(e, setPersonalIdPreview, file =>
                          setState({
                            ...state,
                            identificationPicture: file,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              )}

              {personalIdPreview !== null && (
                <div className="image__container">
                  <div
                    className="remove__image--button"
                    onClick={() => {
                      setPersonalIdPreview(null)
                      setState({
                        ...state,
                        identificationPicture: null,
                      })
                    }}
                  >
                    <RemovePhotoIcon
                      className="close__icon icon"
                      color="#333"
                    />
                  </div>
                  <img src={personalIdPreview} alt="" className="img-preview" />
                </div>
              )}
            </div>
          )}

          {state.passportNumber && state.passportNumber.length > 0 && (
            <div className="photo__item">
              <span className="label white">Foto de pasaporte</span>
              {passportPicturePreview === null && (
                <div className="upload-section toshow">
                  <div>
                    <label
                      title="Subir archivo"
                      htmlFor={`passport-picture-${inputFileId}`}
                      className="upload required"
                    >
                      <img src={UploadIcon} className="icon__upload" alt="" />
                      Presiona para subir una fotografia
                    </label>
                    <input
                      className="input__hide"
                      type="file"
                      accept=".jpeg,.jpg,.jpe,.png"
                      id={`passport-picture-${inputFileId}`}
                      onChange={e =>
                        handleLoadPreview(e, setPassportPicturePreview, file =>
                          setState({
                            ...state,
                            passportPicture: file,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              )}
              {passportPicturePreview !== null && (
                <div className="image__container">
                  <div
                    className="remove__image--button"
                    onClick={() => {
                      setPassportPicturePreview(null)
                      setState({
                        ...state,
                        passportPicture: null,
                      })
                    }}
                  >
                    <RemovePhotoIcon
                      className="close__icon icon"
                      color="#333"
                    />
                  </div>
                  <img
                    src={passportPicturePreview}
                    alt=""
                    className="img-preview"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {onChange === null && (
          <button
            disabled={!ecommerceValidations.beneficialOwnerItemInfo(state)}
            onClick={_ => {
              onSubmit(state)
              setState({})
              setPassportPicturePreview(null)
            }}
            className="button add-button"
          >
            Agregar
            <AddIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default KycEcommerceBeneficialOwner
