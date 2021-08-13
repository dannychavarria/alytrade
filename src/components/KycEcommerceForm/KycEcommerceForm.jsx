import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'moment/locale/es'
import './KycEcommerceForm.scss'

// Import components
import KycEcommerceBeneficialOwner from '../KycEcommerceBeneficialOwner/KycEcommerceBeneficialOwner'
import TelephoneField from '../TelephoneField/TelephoneField'

// Import assets
import Countries from '../../utils/countries.json'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg'

// Import constants & utils
import {
  commercialCategories,
  randomKey,
  MAX_FILE_SIZE,
  compressImage,
} from '../../utils/constanst'

import {
  nameRegex,
  identificationRegex,
  floatRegex,
  integerRegex,
  postalCodeRegex,
} from '../../utils/regexPatterns'

const KycEcommerceForm = ({
  state = {},
  setState = _ => { },
  activeSection = 1,
  className = '',
}) => {
  // Estados para almacenar las previsualizaciones de las imágenes a subir
  const [businessIdPreview, setBusinessIdPreview] = useState(null)

  // Estado para almacenar la lista de propietarios beneficiarios
  const [beneficialOwnerList, setBeneficialOwnerList] = useState([])

  const [legalRepresentative, setLegalRepresentative] = useState({})

  const inputKey = randomKey()

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
  }

  useEffect(
    _ => {
      setState({ ...state, beneficialOwnerList: beneficialOwnerList })
    },
    [beneficialOwnerList]
  )

  useEffect(
    _ => {
      setState({ ...state, legalRepresentative: legalRepresentative })
    },
    [legalRepresentative]
  )

  return (
    <div className={`KycEcommerceForm ${className}`}>
      {
        // Sección 1 del formulario
        activeSection === 1 && (
          <div className="section">
            <h2 className="title">Información general</h2>

            <div className="content">
              <div className="content-item">
                {/**
                 *
                 * Sección de la información básica
                 *
                 */}
                <div className="subsection">
                  <h3 className="subtitle">1. Información de la cuenta</h3>

                  {/*
                                <div className="row__kyc--commerce">
                                    <span className="required">Nombre de usuario</span>
                                    <input
                                        autoFocus
                                        value={state.name || ''}
                                        onChange={e =>
                                            setState({ ...state, name: e.target.value })
                                        }
                                        type="text"
                                        className="text-input" />
                                </div>

                                <div className="row__kyc--commerce">
                                    <span className="required">Correo electrónico</span>
                                    <input
                                        value={state.email || ''}
                                        onChange={e =>
                                            setState({ ...state, email: e.target.value })
                                        }
                                        type="text"
                                        className="text-input" />
                                    </div>
                                */}

                  <div className="row__kyc--commerce">
                    <span className="required">Sitio web (opcional)</span>
                    <input
                      value={state.commerceWebsite || ''}
                      onChange={e =>
                        setState({
                          ...state,
                          commerceWebsite: e.target.value,
                        })
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </div>

                {/**
                 *
                 * Sección de la información de contacto
                 *
                 */}
                <div className="subsection">
                  <h3 className="subtitle">2. Teléfono</h3>

                  <div className="row__kyc--commerce">
                    <span className="required">Número de Teléfono</span>
                    <TelephoneField
                      value={state.commerceTelephone || ''}
                      onChange={value =>
                        setState({
                          ...state,
                          commerceTelephone: value,
                        })
                      }
                      className="text-input"
                    />
                  </div>
                </div>

                <div className="subsection">
                  <h3 className="subtitle">
                    3. País / Región de actividad comercial
                  </h3>

                  <div className="row__kyc--commerce">
                    <span className="required">País</span>
                    <select
                      value={state.commercialActivityCountry || -1}
                      onChange={e =>
                        setState({
                          ...state,
                          commercialActivityCountry: e.target.value,
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

                  <div className="row__kyc--commerce">
                    <span className="required">
                      Estado / Provincia / Región
                    </span>
                    <input
                      value={state.comercialProvince || ''}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({ ...state, comercialProvince: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </div>
              </div>

              <div className="content-item">
                {/**
                 *
                 * Sección de la entidad legal
                 *
                 */}
                <div className="subsection">
                  <h3 className="subtitle">4. Información de la cuenta</h3>

                  <div className="row__kyc--commerce">
                    <span className="required">Nombre de la entidad legal</span>
                    <input
                      value={state.commerceName || ''}
                      onChange={e =>
                        setState({ ...state, commerceName: e.target.value })
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <span className="required">Tipo</span>
                    <select
                      value={state.commerceType || -1}
                      onChange={e =>
                        setState({ ...state, commerceType: e.target.value })
                      }
                      className="picker"
                    >
                      <option value="-1" disabled hidden>
                        Seleccione un tipo de comercio
                      </option>

                      {commercialCategories.map((name, index) => (
                        <option key={index} value={index}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {state.commerceType == commercialCategories.length - 1 && (
                    <div className="row__kyc--commerce">
                      <span className="required">Tipo de comercio</span>
                      <input
                        value={state.commerceTypeDescription || ''}
                        onChange={e => {
                          setState({
                            ...state,
                            commerceTypeDescription: e.target.value,
                          })
                        }}
                        type="text"
                        className="text-input"
                      />
                    </div>
                  )}

                  <div className="row__kyc--commerce">
                    <span className="required">
                      Número de identificación del negocio
                    </span>
                    <input
                      value={state.commerceIdentificationNumber || ''}
                      onChange={e =>
                        identificationRegex(e.target.value).then(value =>
                          setState({
                            ...state,
                            commerceIdentificationNumber: value,
                          })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce horizontal upload-section">
                    <span className="required">
                      Suba foto de la identificación del negocio
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
                      onChange={e =>
                        handleLoadPreview(e, setBusinessIdPreview, file =>
                          setState({
                            ...state,
                            commerceIdentificationPicture: file,
                          })
                        )
                      }
                    />
                  </div>

                  {businessIdPreview !== null && (
                    <div className="row__kyc--commerce centered">
                      <img
                        src={businessIdPreview}
                        alt=""
                        className="img-preview"
                      />
                    </div>
                  )}

                  <div className="row__kyc--commerce">
                    <span className="required">Fecha de incorporación</span>
                    <input
                      value={
                        state.incorporationDate ||
                        moment(new Date()).format('YYYY-MM-DD')
                      }
                      onChange={e =>
                        setState({
                          ...state,
                          incorporationDate: e.target.value,
                        })
                      }
                      type="date"
                      className="picker"
                    />
                  </div>
                </div>
              </div>

              <div className="content-item">
                {/**
                 *
                 * Sección de la dirección permanente
                 *
                 */}
                <div className="subsection">
                  <h3 className="subtitle">5. Dirección permanente</h3>

                  <div className="row__kyc--commerce">
                    <span className="required">País</span>
                    <select
                      value={state.country || -1}
                      onChange={e =>
                        setState({ ...state, country: e.target.value })
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

                  <div className="row__kyc--commerce">
                    <span className="required">
                      Estado / Provincia / Región
                    </span>
                    <input
                      value={state.permanentProvince || ''}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({ ...state, permanentProvince: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <span className="required">Ciudad</span>
                    <input
                      value={state.commerceCity || ''}
                      onChange={e =>
                        nameRegex(e.target.value).then(value =>
                          setState({ ...state, commerceCity: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <span className="required">Dirección (línea 1)</span>
                    <input
                      value={state.commerceDirection || ''}
                      onChange={e =>
                        setState({
                          ...state,
                          commerceDirection: e.target.value,
                        })
                      }
                      ype="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <span>Dirección (línea 2)</span>
                    <input
                      value={state.commerceDirection2 || ''}
                      onChange={e =>
                        setState({
                          ...state,
                          commerceDirection2: e.target.value,
                        })
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <span className="required">Código postal</span>
                    <input
                      value={state.commercePostalCode || ''}
                      onChange={e =>
                        postalCodeRegex(e.target.value).then(value =>
                          setState({ ...state, commercePostalCode: value })
                        )
                      }
                      type="text"
                      className="text-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        /**
         * Segunda sección del formulario
         */
        activeSection === 2 && (
          <div className="section">
            <h2 className="title">
              Propietarios beneficiarios y agente de control
            </h2>

            <div className="content">
              <div className="content-item beneficiaries">
                <div className="subsection">
                  <h3 className="subtitle">
                    6. Enumere cada propietario / beneficiario / entidad que
                    posee el 10 por ciento o más de la empresa
                  </h3>

                  <div className="table">
                    <div className="header">
                      <span>Titulo y nombre completo</span>
                      <span>participacion %</span>
                      <span>fecha de nacimiento</span>
                      <span>
                        direccion, ciudad, region, codigo postal, pais
                      </span>
                      <span>numero identificacion personal</span>
                      <span>
                        numero de pasaporte, pais de emision pasaporte
                      </span>
                      <span>No. identificación tributaria</span>
                    </div>
                    <div className="body">
                      {beneficialOwnerList.length === 0 && (
                        <h2 className="empty">
                          Sin lista de beneficiarios propietarios para mostrar
                        </h2>
                      )}

                      {beneficialOwnerList.map(
                        (
                          {
                            chargeTitle,
                            fullname,
                            participationPercentage,
                            birthday,
                            direction,
                            city,
                            province,
                            postalCode,
                            originCountry,
                            passportNumber,
                            passportEmissionCountry,
                            identificationTaxNumber,
                            identificationNumber,
                          },
                          index
                        ) => (
                          <div
                            key={`bo-${index}`}
                            className="row__kyc--commerce"
                          >
                            <span>{`${chargeTitle}, ${fullname}`}</span>

                            <span>{participationPercentage} %</span>

                            <span>{birthday}</span>

                            <span>
                              {`${direction}, ${city}, ${province}, ${postalCode}, ${Countries[originCountry].name}`}
                            </span>

                            <span>{identificationNumber || 'No aplica'}</span>

                            <span>
                              {passportNumber && passportEmissionCountry
                                ? `${passportNumber}, ${Countries[passportEmissionCountry].name}`
                                : 'No aplica'}
                            </span>
                            <span>
                              {identificationTaxNumber || 'No aplica'}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <KycEcommerceBeneficialOwner
                    onSubmit={item => {
                      setBeneficialOwnerList([...beneficialOwnerList, item])
                    }}
                  />
                </div>

                <div className="subsection">
                  <p className="paragraph">
                    a) En los siguientes campos deberá proveer información de
                    una persona con responsabilidad significativa de la entidad
                    legal mencionada anteriormente, como:
                  </p>

                  <label className="check-paragraph">
                    <input
                      onClick={_ => {
                        setState({
                          ...state,
                          representativeType: 1,
                        })
                      }}
                      name="typeLegalRepresentative"
                      type="radio"
                    />

                    <span>
                      Un director ejecutivo o gerente senior (por ejemplo,
                      director ejecutivo, director financiero, director de
                      operaciones, miembro gerente, socio general, presidente,
                      visepresidente, tesorero);
                    </span>
                  </label>

                  <label className="check-paragraph">
                    <input
                      onClick={_ => {
                        setState({
                          ...state,
                          representativeType: 2,
                        })
                      }}
                      name="typeLegalRepresentative"
                      type="radio"
                    />

                    <span>
                      Cualquier otro individuo el cual realice labores similares
                      regularmente.
                    </span>
                  </label>

                  <KycEcommerceBeneficialOwner
                    onChange={setLegalRepresentative}
                  />

                  <p className="paragraph">
                    b) ¿Alguno de los individuos enumerados anteriormente es una
                    persona políticamente expuesta?
                    <span className="radios-group">
                      <label>
                        <input
                          onClick={_ => {
                            setState({
                              ...state,
                              isDiplomatic: true,
                            })
                          }}
                          type="radio"
                          name="isDiplomatic"
                        />
                        Sí
                      </label>

                      <label>
                        <input
                          onClick={_ => {
                            setState({
                              ...state,
                              isDiplomatic: false,
                            })
                          }}
                          type="radio"
                          name="isDiplomatic"
                        />
                        No
                      </label>
                    </span>
                  </p>

                  <p className="paragraph-comment">
                    * El término "Persona Políticamente Expuesta" incluye a
                    cualquier individuo (incluidos los miembros de la familia
                    inmediata y los asociados cercanos) que sea un figura
                    política extranjera de alto rango actual o anterior.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {
        /**
         * Tercera sección del kyc para las empresas
         */
        activeSection === 3 && (
          <div className="section">
            <div className="content">
              <div className="content-item beneficiaries">
                <div className="subsection">
                  <p className="paragraph">
                    7. Describa la fuente de los fondos: (pueden ser dividendos
                    o ganancias de una determinada empresa. Indique qué empresa
                    u otra fuente legítima de fondos)
                  </p>

                  <textarea
                    value={state.commerceNote || ''}
                    onChange={e => {
                      setState({
                        ...state,
                        commerceNote: e.target.value,
                      })
                    }}
                    className="text-input"
                  ></textarea>
                </div>

                <div className="subsection">
                  <p className="paragraph">
                    8. Transacciones mensuales esperadas
                  </p>

                  <div className="row-group transactions-section">
                    <div className="col">
                      <span>Número de transacciones</span>

                      <input
                        value={state.commerceEstimateTransactions || ''}
                        onChange={e =>
                          integerRegex(e.target.value).then(value =>
                            setState({
                              ...state,
                              commerceEstimateTransactions: value,
                            })
                          )
                        }
                        type="text"
                        className="text-input"
                      />
                    </div>

                    <div className="col">
                      <span>Valor total de transacciones en USD</span>

                      <input
                        value={state.commerceEstimateTransactionsAmount || ''}
                        onChange={e =>
                          floatRegex(e.target.value).then(value =>
                            setState({
                              ...state,
                              commerceEstimateTransactionsAmount: value,
                            })
                          )
                        }
                        type="text"
                        className="text-input"
                      />
                    </div>
                  </div>

                  <h3 className="subtitle">
                    Adjunte copias de los siguientes documentos de existencia
                    comercial:
                  </h3>

                  {/**
                   * Sección para adjuntar los archivos legales
                   */}
                  <div className="row__kyc--commerce legal-file">
                    <span className="required">
                      Copia del certificado / incorporación / incumbencia
                    </span>

                    <label
                      title="Subir archivo"
                      htmlFor={`estatutos-${inputKey}`}
                      className="upload"
                    >
                      <span className="filename">
                        {state.commerceCertificatePicture?.name || ''}
                      </span>
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      id={`estatutos-${inputKey}`}
                      accept=".pdf"
                      onChange={e =>
                        handleLoadPreview(
                          e,
                          _ => { },
                          file =>
                            setState({
                              ...state,
                              commerceCertificatePicture: file,
                            })
                        )
                      }
                    />
                  </div>

                  <div className="row__kyc--commerce legal-file">
                    <span className="required">
                      Copia de la lista actualizada de directores y accionistas
                    </span>

                    <label
                      title="Subir archivo"
                      htmlFor={`directorsList-${inputKey}`}
                      className="upload"
                    >
                      <span className="filename">
                        {state.commerceDirectorsPicture?.name || ''}
                      </span>
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      id={`directorsList-${inputKey}`}
                      onChange={e =>
                        handleLoadPreview(
                          e,
                          _ => { },
                          file =>
                            setState({
                              ...state,
                              commerceDirectorsPicture: file,
                            })
                        )
                      }
                    />
                  </div>

                  <div className="row__kyc--commerce legal-file">
                    <span className="required">
                      Información de los directores autorizados a firmar un
                      acuerdo en nombre del proveedor y los documentos que
                      confirman sus autoridades
                    </span>

                    <label
                      title="Subir archivo"
                      htmlFor={`directorsAutorization-${inputKey}`}
                      className="upload"
                    >
                      <span className="filename">
                        {state.commerceDirectorsInfoPicture?.name || ''}
                      </span>
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      id={`directorsAutorization-${inputKey}`}
                      onChange={e =>
                        handleLoadPreview(
                          e,
                          _ => { },
                          file =>
                            setState({
                              ...state,
                              commerceDirectorsInfoPicture: file,
                            })
                        )
                      }
                    />
                  </div>

                  <div className="row__kyc--commerce legal-file">
                    <span className="required">Certificado legal</span>

                    <label
                      title="Subir archivo"
                      htmlFor={`legalCertificate-${inputKey}`}
                      className="upload"
                    >
                      <span className="filename">
                        {state.commerceLegalCertificate?.name || ''}
                      </span>
                      <UploadIcon />
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      id={`legalCertificate-${inputKey}`}
                      onChange={e =>
                        handleLoadPreview(
                          e,
                          _ => { },
                          file =>
                            setState({
                              ...state,
                              commerceLegalCertificate: file,
                            })
                        )
                      }
                    />
                  </div>

                  <div className="row__kyc--commerce">
                    <p className="paragraph">
                      Yo,{' '}
                      <strong className="name-legal-representative">
                        {state.legalRepresentative?.fullname ||
                          'harold espinoza'}
                      </strong>
                      , por la presente certifico, según mi saber y entender que
                      la información proporcionada anteriormente es completa y
                      correcta.
                    </p>
                  </div>

                  <div className="row__kyc--commerce">
                    <p className="paragraph">
                      Fecha: {moment(new Date()).format('dddd, Do MMMM YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default KycEcommerceForm
