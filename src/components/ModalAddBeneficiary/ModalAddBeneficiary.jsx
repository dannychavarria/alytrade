import React, { useState } from 'react'
import KycUserForm from '../KycUserForm'
import Modal from '../Modal/Modal'
import { Petition } from '../../utils/constanst'
import { kycUserBeneficiaryData } from '../../services/kycUser.service'
//import reduxStorage from '../../store/store'
import Swal from 'sweetalert2'
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg'
import ActivityIndicator from '../../components/ActivityIndicator/Activityindicator'
import { userValidations } from '../../utils/kycFormValidations'

import './ModalAddBeneficiary.scss'

const ModalAddBeneficiary = ({
    userAge,
    closeModal,
    password,
    setKycInfo,
    setPassword,
}) => {
    const { globalStorage } = {} //reduxStorage.getState()

    const [beneficiary, setBeneficiary] = useState({})
    const [loader, setLoader] = useState(false)

    /**
     * Función para realizar el submit de los datos del kyc
     */
    const submitBeneficiary = async (_) => {
        try {
            setLoader(true)

            const dataSend = {
                passwordUser: password,
                emailUser: globalStorage.email,
                ...(await kycUserBeneficiaryData(beneficiary, userAge)),
            }

            const { data } = await Petition.post(
                '/kyc/user/beneficiary',
                dataSend
            )

            if (data.error) {
                throw String(data.message)
            }
            //Resetear la contraseña
            setPassword('')

            //Actualizar beneficiario en la interfaz
            setKycInfo((prevKycInfo) => {
                return { ...prevKycInfo, beneficiary: beneficiary }
            })
            Swal.fire(
                'Speed Tradings',
                'Tus datos se han actualizado',
                'success'
            )
            closeModal()
        } catch (error) {
            console.error(error)
            Swal.fire('Speed Tradings', error.toString(), 'error')
        } finally {
            setLoader(false)
        }
    }
    
    return (
        <Modal persist={true} onlyChildren>
            <div className="overlay">
                {loader && (
                    <div className="center__element">
                        <ActivityIndicator size={100} />
                    </div>
                )}
                <div className="modal__beneficiary">
                    <KycUserForm
                        state={beneficiary}
                        setState={setBeneficiary}
                        secondaryTypeForm={userAge < 18 ? 1 : 2}
                    />
                    <div className="beneficiary__button--container">
                        <button
                            disabled={
                                !userValidations.beneficiaryInfo(beneficiary)
                            }
                            className="button yellow"
                            onClick={submitBeneficiary}
                        >
                            Guardar
                            <SaveIcon className="icon" />
                        </button>
                        <button className="button red" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalAddBeneficiary
