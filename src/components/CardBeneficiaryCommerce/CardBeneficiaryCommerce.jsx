import React from 'react'
import './CardBeneficiaryCommerce.scss'
import Countries from '../../utils/countries.json'

const CardBeneficiaryCommerce = ({ data = [] }) => {
  return (
    <div className="CardBeneficiaryCommerce">
      {data.length > 0 && (
        <h3 className="label white">Lista de beneficiarios propietarios </h3>
      )}

      {data.length > 0 &&
        data.map((beneficiary, index) => (
          <article className="beneficiary__card" key={index}>
            <div className="beneficiary__group">
              <span className="beneficiary__label">Nombre</span>
              <p className="beneficiary__value name">{beneficiary?.fullname}</p>
            </div>

            <div className="beneficiary__auto-columns">
              <div className="beneficiary__group">
                <span className="beneficiary__label">Participación</span>
                <p className="beneficiary__value">
                  {beneficiary?.participationPercentage} %
                </p>
              </div>

              <div className="beneficiary__group">
                <span className="beneficiary__label">Identificación</span>
                <p className="beneficiary__value">
                  {beneficiary?.identificationNumber || 'Sin Identificación'}
                </p>
              </div>

              <div className="beneficiary__group">
                <span className="beneficiary__label">Cargo</span>
                <p className="beneficiary__value">{beneficiary?.chargeTitle}</p>
              </div>

              <div className="beneficiary__group">
                <span className="beneficiary__label">Pasaporte</span>
                <p className="beneficiary__value">
                  {beneficiary?.passportNumber || 'Sin pasaporte'}
                </p>
              </div>

              <div className="beneficiary__group">
                <span className="beneficiary__label">Pais de origen</span>
                <p className="beneficiary__value">
                  {Countries[beneficiary?.originCountry].name}
                </p>
              </div>

              <div className="beneficiary__group">
                <span className="beneficiary__label">Correo</span>
                <p className="beneficiary__value">
                  {beneficiary?.email || 'Sin correo'}
                </p>
              </div>
            </div>
          </article>
        ))}
    </div>
  )
}

export default CardBeneficiaryCommerce
