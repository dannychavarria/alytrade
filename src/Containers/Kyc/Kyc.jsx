import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import './Kyc.scss'

// Import components
import ActivityIndicator from '../../components/ActivityIndicator/Activityindicator'
import Modal from '../../components/Modal/Modal'
import KycUserForm from '../../components/KycUserForm/'
import KycEcommerceForm from '../../components/KycEcommerceForm/'

// Import utils
import {
  userValidations,
  ecommerceValidations,
} from '../../utils/kycFormValidations'
import {
  kycUserData,
  kycUserBeneficiaryData,
} from '../../services/kycUser.service'
import { kycEcommerceData } from '../../services/kycEcommerce.service'
import { LogOut, Petition, getStorage, setStorage } from '../../utils/constanst'

// Import assets
import { ReactComponent as BackIcon } from '../../assets/icons/arrow-back.svg'
import { ReactComponent as ForwardIcon } from '../../assets/icons/arrow-forward.svg'
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg'
import { ReactComponent as InformationIcon } from '../../assets/icons/information.svg'
import { ReactComponent as EnterpriseIcon } from '../../assets/icons/enterprise.svg'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { ReactComponent as CancelIcon } from '../../assets/icons/cancel.svg'
import Logo from '../../assets/img/Alytrade_Logo.svg'//import Logo from '../../assets/images/logo.png'
import { useHistory } from 'react-router-dom'
import { logOut } from '../../reducers/DashboardReducer'
import { useSelector } from 'react-redux'
const Kyc = () => {
  // Estado para controlar la visibilidad del indicador de carga
  const [loader, setLoader] = useState(false)
  const [showWaitMessage, setShowWaitMessage] = useState(false)

  const [showIntro, setShowIntro] = useState(true)
  const [showKyc, setShowKyc] = useState(true)
  const [USERAGE, setUSERAGE] = useState(0)
  const [isUser, setIsUser] = useState(false)
  const [activeSection, setActiveSection] = useState(1)
  const userInfoState = useSelector(state => state.userInfo)
  const history = useHistory()
  useEffect(() => {
    console.log('userInfoState', userInfoState)
    setIsUser(userInfoState.kyc_type === 1)
    if(userInfoState.kyc===1){
      history.push('/dashboard')
    }
  }, [])

  /**
   * Estados para los campos del formulario de KYC
   */
  // Estados para almacenar la infromación de un usuario natural
  const [userInfo, setUserInfo] = useState({})
  const [beneficiaryInfo, setBeneficiaryInfo] = useState({})

  // Estados para almacenar la información de un comercio
  const [ecommerceInfo, setEcommerceInfo] = useState({})

  /**
   * Verifica que los campos de la sección activa estén completos
   * para poder habilitar el avance a la siguiente sección
   * @return {Boolean}
   */
  const checkSectionValid = _ => {
    switch (activeSection) {
      // Validaciones para la sección 1
      case 1:
        return isUser
          ? userValidations.userInfo(userInfo)
          : ecommerceValidations.commerceBasicInfo(ecommerceInfo)

      // Validaciones para la sección 2
      case 2:
        return isUser
          ? userValidations.beneficiaryInfo(beneficiaryInfo)
          : ecommerceValidations.commerceBeneficialInfo(ecommerceInfo)

      // Validaciones para la sección 3
      case 3:
        return ecommerceValidations.tradeIncomingInfo(ecommerceInfo)

      default:
        return false
    }
  }

  const checkNextVisibility = () => {
    switch (activeSection) {
      case 1:
        return isUser ? USERAGE < 18 || userInfo.addBeneficiary : true

      case 2:
        /**
         * Si no es el formulario de usuario, se muestra el botón de siguiente
         * cuando se está en la segunda sección
         */
        return !isUser

      default:
        return false
    }
  }

  /**
   * Muestra la siguiente sección del formulario cuando se presiona el
   * botón 'siguiente'
   */
  const nextSection = _ => {
    /**
     * Sí el usuario es menor de edad (es menor de 18 años) se habilita el formulario
     * del tutor
     */
    let section =
      activeSection === 1 && USERAGE < 18
        ? activeSection + 1
        : activeSection + 1

    setActiveSection(activeSection === 3 ? activeSection : section)
  }

  /**
   * Muestra la sección previa del formulario cuando se presiona el
   * botón 'siguiente'
   */
  const prevSection = _ => {
    let section =
      activeSection === 3 && USERAGE < 18
        ? activeSection - 1
        : activeSection - 1

    setActiveSection(activeSection === 1 ? activeSection : section)
  }

  /**
   * Función que realiza la redirección a la vista principal una vez que el usuario
   * haya completado su formulario kyc
   */
  const redirectToDashboard = () => {
    // Añade el atributo verificando el tipo de kyc a los datos guardados localmente del usuario
    setStorage({
      ...getStorage(),
      kyc_type: isUser ? 1 : 2,
    })

    // Recarga el sitio
    history.push('/dashboard')
    //window.location.hash = '/'
    //window.location.reload()
  }

  /**
   * Función para realizar el submit de los datos del kyc
   */
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoader(true)
      let dataSend = {}
      let endpointKyc = ''

      // Se construye el objeto a enviar al servidor con la info del usuario
      if (isUser) {
        endpointKyc = '/kyc/user'
        dataSend = await kycUserData(userInfo)

        if (userInfo.addBeneficiary || USERAGE < 18) {
          // Se añade la información del tutor/beneficiario a la data a enviar al server
          dataSend.beneficiary = await kycUserBeneficiaryData(
            beneficiaryInfo,
            USERAGE
          )
        }
      } else {
        endpointKyc = '/kyc/ecommerce'
        dataSend = await kycEcommerceData(ecommerceInfo)
      }

      const { data } = await Petition.post(endpointKyc, dataSend)

      if (data.error) {
        throw String(data.message)
      }

      Swal.fire(
        'Felicidades',
        'Información actualizada con éxito',
        'success'
      ).then(_ => redirectToDashboard())
    } catch (error) {
      console.error(error)
      Swal.fire('Ha ocurrido un error', error.toString(), 'error')
    } finally {
      setLoader(false)
      setShowWaitMessage(false)
    }
  }

  return (
    <div className="Kyc">
      {/*
      {!showKyc && (
        <div className="welcome">
          {showIntro && (
            <div className="toshow">
              <InformationIcon className="indicator" />
              <p>
                Para brindarle un mejor servicio y seguridad a nuestros
                usuarios, hemos agregado el formulario kyc. Para poder seguir
                disfutando de <strong>Alytrade</strong>, por favor
                completar la siguiente información
              </p>

              <div className="action-buttons">
                <button
                  onClick={_ => setShowIntro(false)}
                  className="button forward"
                >
                  Continuar
                  <ForwardIcon className="icon" />
                </button>
                <button onClick={_ => logOut()} className="button back">
                  Cerrar sesion
                </button>
              </div>
            </div>
          )}

          {!showIntro && (
            <div className="toshow">
              <p className="selector-title">Seleccione su tipo de cuenta</p>

              <div className="action-buttons center">
                <button
                  onClick={_ => {
                    setIsUser(false)
                    setShowKyc(true)
                  }}
                  className="selector"
                >
                  <EnterpriseIcon className="icon" />
                  Empresarial
                </button>

                <button
                  onClick={_ => {
                    setIsUser(true)
                    setShowKyc(true)
                  }}
                  className="selector"
                >
                  <UserIcon className="icon" />
                  Personal
                </button>
              </div>
            </div>
          )}
        </div>
      )} */}

      {showKyc && (
        <div className="container">
          <header className="header">
            <img src={Logo} alt="logo" className="logo" />

            {userInfoState.kyc_type === 1 ? <h1>Kyc Personal</h1> : ''}

            {userInfoState.kyc_type === 2 ? <h1>Kyc Empresarial</h1> : ''}
          </header>

          {isUser  ? (
            <>
              {activeSection === 1 && (
                <KycUserForm
                  state={userInfo}
                  setState={setUserInfo}
                  onChangeUserAge={setUSERAGE}
                />
              )}

              {activeSection === 2 && (
                <KycUserForm
                  state={beneficiaryInfo}
                  setState={setBeneficiaryInfo}
                  secondaryTypeForm={USERAGE < 18 ? 1 : 2}
                />
              )}
            </>
          ) : !isUser ? (
            <KycEcommerceForm
              state={ecommerceInfo}
              setState={setEcommerceInfo}
              activeSection={activeSection}
            />
          ) : ''}

          <div className="footer">
            {!isUser && (
              <div className="pager-dotted">
                {Array(3)
                  .fill(1)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`dotted ${activeSection === index + 1 ? 'active' : ''
                        }`}
                    ></div>
                  ))}
              </div>
            )}

            <div className="pager">
              {activeSection !== 1 && (
                <button
                  onClick={prevSection}
                  style={{ opacity: activeSection === 1 ? 0 : 1 }}
                  className="back"
                  title="Sección anterior"
                >
                  <BackIcon className="icon" />
                  Regresar
                </button>
              )}

              {activeSection === 1 && (
                <button
                  onClick={_ => {
                    // Reicia los estados a su valor inicial
                    setShowIntro(true)
                    setShowKyc(false)
                    setUserInfo({})
                    setBeneficiaryInfo({})
                    setEcommerceInfo({})
                  }}
                  className="back cancel"
                >
                  <CancelIcon className="icon" />
                  Cancelar
                </button>
              )}

              {checkNextVisibility() && (
                <button
                  disabled={!checkSectionValid()}
                  onClick={nextSection}
                  style={{
                    opacity: activeSection === 3 && !isUser ? 0 : 1,
                  }}
                  className="forward"
                  title="Siguiente sección"
                >
                  Siguiente
                  <ForwardIcon className="icon" />
                </button>
              )}

              {((isUser &&
                ((USERAGE >= 18 && !userInfo.addBeneficiary) ||
                  activeSection === 2)) ||
                (!isUser && activeSection === 3)) && (
                  <button onClick={onSubmit} className="forward">
                    Guardar
                    <SaveIcon className="icon" />
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {loader && (
        <Modal persist={true} onlyChildren>
          <div className="content-modal">
            {window.setTimeout(_ => setShowWaitMessage(true), 5000) && <></>}
            <h2 className="message">Guardando información</h2>
            {!showWaitMessage && (
              <p>Esto proceso puede demorar un momento...</p>
            )}

            {showWaitMessage && <p>Ya casi terminamos...</p>}
            <ActivityIndicator size={64} />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Kyc
