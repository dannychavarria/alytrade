import React, { useState, useEffect } from 'react'
import TextGroup from '../TextGroup/TextGroup'
import './KycEnterpriseView.scss'
import { Petition, getCountry } from '../../utils/constanst'
import ActivityIndicator from '../../components/ActivityIndicator/Activityindicator'
import Swal from 'sweetalert2'
import { useSesionStorage } from '../../utils/hooks/useSesionStorage'

const KycEnterpriseView = ({ idUser }) => {
    const [loader, setLoader] = useState(false)
    const KEY = `kyc-enterprise-info-${idUser}`
    const [kycInfo, setKycInfo] = useSesionStorage(KEY, {})

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
                //Cargar la foto de perfil si esta disponible
                setKycInfo(data)
            }
        } catch (error) {
            Swal.fire('Ha ocurrido un error', error, 'error')
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
        <section className='kyc__enterprise--view'>
            {loader && (
                <div className='center__element'>
                    <ActivityIndicator size={100} />
                </div>
            )}
            <div className='two__rows--enterprise'>
                <div className='card__information'>
                    <h3 className='card__information--title'>
                        Información empresarial
                    </h3>
                    <div className='auto__columns--enterprise'>
                        <TextGroup
                            label='Correo'
                            value={kycInfo?.email || 'Sin datos'}
                        />
                        <TextGroup
                            label='Numero de telefono'
                            value={kycInfo?.commerceTelephone || 'Sin datos'}
                        />
                        <TextGroup
                            label='Sitio web'
                            value={kycInfo?.website || 'Sin datos'}
                        />
                    </div>
                </div>

                <div className='card__information'>
                    <h3 className='card__information--title'>
                        Representante legal
                    </h3>
                    <div className='auto__columns--enterprise'>
                        <TextGroup
                            label='Nombre'
                            value={
                                kycInfo?.legalRepresentative?.fullname ||
                                'Sin datos'
                            }
                        />
                        <TextGroup
                            label='Cargo'
                            value={
                                kycInfo?.legalRepresentative?.chargeTitle ||
                                'Sin datos'
                            }
                        />
                        <TextGroup
                            label='Correo'
                            value={
                                kycInfo?.legalRepresentative?.email ||
                                'Sin datos'
                            }
                        />
                        <TextGroup
                            label='Teléfono'
                            value={
                                kycInfo?.legalRepresentative?.telephoneNumber ||
                                'Sin datos'
                            }
                        />
                        <TextGroup
                            label='Dirección'
                            value={
                                kycInfo?.legalRepresentative?.direction ||
                                'Sin datos'
                            }
                        />
                    </div>
                </div>
            </div>
            <div className='two__rows--enterprise'>
                <div className='card__information'>
                    <h3 className='card__information--title'>
                        Región de actividad comercial
                    </h3>
                    <div className='auto__columns--enterprise'>
                        <TextGroup
                            label='Pais '
                            value={
                                getCountry(kycInfo?.permanentCountry) ||
                                'Sin datos'
                            }
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
                            value={kycInfo?.permanentProvince || 'Sin datos'}
                        />
                        <TextGroup
                            label='Dirección (linea 1)'
                            value={kycInfo?.directionOne || 'Sin datos'}
                        />
                        <TextGroup
                            label='Dirección (linea 2)'
                            value={kycInfo?.directionTwo || 'Sin datos'}
                        />
                    </div>
                </div>

                <div className='card__information'>
                    <h3 className='card__information--title'>Beneficiarios</h3>
                    {!kycInfo?.beneficiaries && (
                        <div className='empty__beneficiary'>
                            <span className='label white'>
                                No cuenta con ningún beneficiario
                            </span>
                        </div>
                    )}
                    {kycInfo?.beneficiaries && (
                        <div className='table__beneficiaries'>
                            <div className='table__head--beneficiaries'>
                                <div className='row--beneficiaries'>
                                    <span className='table__label--beneficiaries'>
                                        Nombre
                                    </span>
                                    <span className='table__label--beneficiaries'>
                                        Cargo
                                    </span>
                                    <span className='table__label--beneficiaries'>
                                        %
                                    </span>
                                </div>
                            </div>
                            <div className='table__body--beneficiaries'>
                                {kycInfo?.beneficiaries.map(
                                    (beneficiary, index) => (
                                        <div key={index}>
                                            <div className='row--beneficiaries'>
                                                <span className='table__value--beneficiaries'>
                                                    {beneficiary?.fullname}
                                                </span>
                                                <span className='table__value--beneficiaries'>
                                                    {beneficiary?.chargeTitle}
                                                </span>
                                                <span className='table__value--beneficiaries'>
                                                    {
                                                        beneficiary?.participationPercentage
                                                    }{' '}
                                                    %
                                                </span>
                                            </div>
                                            <div className='divisor--beneficiaries'></div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default React.memo(KycEnterpriseView)
