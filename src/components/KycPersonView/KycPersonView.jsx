import React, { useState, useEffect } from 'react'
import TextGroup from '../TextGroup/TextGroup'
import './KycPersonView.scss'
import { calcAge, Petition, getCountry } from '../../utils/constanst'
import ActivityIndicator from '../../components/ActivityIndicator/Activityindicator'
import Swal from 'sweetalert2'
import { useSesionStorage } from '../../utils/hooks/useSesionStorage'
import ModalAddBeneficiary from '../ModalAddBeneficiary/ModalAddBeneficiary'

const relationship = [
    'Padre / Madre',
    'Hermano (a)',
    'Tío (a)',
    'Abuelo (a)',
    'Otro',
]

const KycPersonView = ({
    idUser,
    modalAddBeneficiary,
    setModalAddBeneficiary,
}) => {
    const [loader, setLoader] = useState(false)
    const KEY = `kyc-info-${idUser}`
    const [kycInfo, setKycInfo] = useSesionStorage(KEY, {})
    const [userAge, setUserAge] = useState(0)
    const [password, setPassword] = useState('')

    /**Obtener datos del KYC del usuario */
    const getData = async () => {
        try {
            setLoader(true)

            const { data } = await Petition.get(`/kyc/user`).catch(_ => {
                throw String('No se ha podido obtener informacion')
            })

            if (data.error) {
                throw String(data.message)
            } else {
                setKycInfo(data)
            }
        } catch (error) {
            Swal.fire('Ha ocurrido un error', error, 'error')
        } finally {
            setLoader(false)
        }
    }

    const handleAddBeneficiary = async () => {
        const { value } = await Swal.fire({
            title: 'Ingresa tu contraseña',
            input: 'password',
            inputAttributes: {
                maxlength: 32,
                minlength: 3,
                autocapitalize: 'off',
                autocorrect: 'off',
            },
        })

        setLoader(true)

        // Datos de las credenciales a enviar
        const data = {
            email: kycInfo?.email,
            password: value,
            web: true,
        }

        try {
            await Petition.post(`/login`, data).then(response => {
                if (response.data.error) {
                    Swal.fire('Contraseña incorrecta', '', 'warning')
                } else {
                    //Guardamos la contraseña
                    const _userAge = calcAge(kycInfo?.birthday)
                    setPassword(value)
                    //Guardamos la edad del usuario
                    setUserAge(_userAge)

                    setModalAddBeneficiary(true)
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        /*Si este KYC es visto por primera vez hara la petición,
         *en el caso de que encuentre datos en el session storage*/
        Object.keys(kycInfo).length === 0 && getData()
    }, [])

    return (
        <section className='kyc__person--view'>
            {loader && (
                <div className='center__element'>
                    <ActivityIndicator size={100} />
                </div>
            )}
            <div className='two__rows--person'>
                <div className='card__information'>
                    <h3 className='card__information--title'>
                        Información personal
                    </h3>
                    <TextGroup
                        label='Correo'
                        value={kycInfo?.email || 'Sin datos'}
                    />
                    <TextGroup
                        label='Numero de telefono'
                        value={`${kycInfo?.residence} ${kycInfo?.alternativeNumber}`}
                    />
                </div>
                <div className='card__information'>
                    <h3 className='card__information--title'>Beneficiario</h3>
                    {kycInfo?.beneficiary ? (
                        <div>
                            <TextGroup
                                label='Nombre'
                                value={`${kycInfo?.beneficiary?.firstname} ${kycInfo?.beneficiary?.lastname}`}
                            />
                            <TextGroup
                                label='Parentesco'
                                value={
                                    relationship[
                                        kycInfo?.beneficiary?.relationship - 1
                                    ]
                                }
                            />
                        </div>
                    ) : (
                        <div className='empty__beneficiary'>
                            <span className='label white'>
                                No cuenta con un beneficiario
                            </span>
                            <button
                                className='button green'
                                onClick={handleAddBeneficiary}
                            >
                                Agregar beneficiario
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className='card__information'>
                <h3 className='card__information--title'>
                    Nacionalidad y residencia
                </h3>

                <TextGroup
                    label='Pais de residencia '
                    value={getCountry(kycInfo?.residence)}
                />
                <TextGroup
                    label='Ciudad'
                    value={kycInfo?.city || 'Sin datos'}
                />
                <TextGroup
                    label='Codigo postal'
                    value={kycInfo?.postalCode || 'Sin datos'}
                />
                <TextGroup
                    label='Estado / Provincia / Región'
                    value={kycInfo?.province || 'Sin datos'}
                />
                <TextGroup
                    label='Dirección (linea 1)'
                    value={kycInfo?.direction1 || 'Sin datos'}
                />
                <TextGroup
                    label='Dirección (linea 2)'
                    value={kycInfo?.direction2 || 'Sin datos'}
                />
            </div>

            {modalAddBeneficiary && (
                <ModalAddBeneficiary
                    password={password}
                    setPassword={setPassword}
                    setKycInfo={setKycInfo}
                    userAge={userAge}
                    closeModal={() => setModalAddBeneficiary(false)}
                />
            )}
        </section>
    )
}

export default React.memo(KycPersonView)
