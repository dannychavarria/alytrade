import moment from 'moment'
import validator from 'validator'

// Import utils
import { calcAge, commercialCategories } from "./constanst"

let now = moment(new Date(), 'YYYY-MM-DD').subtract(1, 'd')


/**
 * Validaciones para el formulario kyc para los usuarios naturales
 * @param {Object} userData - Datos del usuario
 * @param {Object} tutorData - Datos del tutor 
 * @param {Object} beneficiaryData - Datos del beneficiario 
 */
const userValidations = {
    userInfo: (userData) => (
        (userData.hasOwnProperty('birthday') && calcAge(userData.birthday) > 0) &&
        (
            (calcAge(userData.birthday) < 18)
                ? true
                : (
                    (userData.hasOwnProperty('identificationType') && userData.identificationType !== -1) &&
                    (userData.hasOwnProperty('identificationNumber') && userData.identificationNumber.length > 6) &&
                    (userData.hasOwnProperty('foundsOrigin') && userData.foundsOrigin !== -1) &&
                    (userData.hasOwnProperty('estimateMonthlyAmount') && userData.estimateMonthlyAmount.length > 0) &&
                    (userData.hasOwnProperty('profession') && userData.profession.length > 0)
                )
        ) &&
        (userData.hasOwnProperty('alternativeNumber') && userData.alternativeNumber.length > 6) &&
        (userData.hasOwnProperty('nationality') && userData.nationality !== -1) &&
        (userData.hasOwnProperty('residence') && userData.residence !== -1) &&
        (userData.hasOwnProperty('province') && userData.province.length > 2) &&
        (userData.hasOwnProperty('city') && userData.city.length > 2) &&
        (
            (userData.hasOwnProperty('direction1') && userData.direction1.length > 0) ||
            (userData.hasOwnProperty('direction2') && userData.direction2.length > 0)
        ) &&
        (userData.hasOwnProperty('postalCode') && userData.postalCode.length > 3) &&
        (userData.hasOwnProperty('profilePicture') && userData.profilePicture !== null) &&
        (userData.hasOwnProperty('IDPicture') && userData.IDPicture !== null)
    ),

    beneficiaryInfo: (beneficiaryData) => (
        (beneficiaryData.hasOwnProperty('firstname') && beneficiaryData.firstname.length > 3) &&
        (beneficiaryData.hasOwnProperty('lastname') && beneficiaryData.lastname.length > 3) &&
        (beneficiaryData.hasOwnProperty('identificationType') && beneficiaryData.identificationType !== -1) &&
        (beneficiaryData.hasOwnProperty('identificationNumber') && beneficiaryData.identificationNumber.length > 6) &&
        (beneficiaryData.hasOwnProperty('birthday') && calcAge(beneficiaryData.birthday) >= 18) &&
        (beneficiaryData.hasOwnProperty('relationship') && beneficiaryData.relationship !== -1) &&
        (beneficiaryData.hasOwnProperty('email') && beneficiaryData.email.length > 0 && validator.isEmail(beneficiaryData.email)) &&
        (beneficiaryData.hasOwnProperty('principalNumber') && beneficiaryData.principalNumber.length > 6) &&
        (beneficiaryData.hasOwnProperty('alternativeNumber') && beneficiaryData.alternativeNumber.length > 6) &&
        (beneficiaryData.hasOwnProperty('nationality') && beneficiaryData.nationality !== -1) &&
        (beneficiaryData.hasOwnProperty('residence') && beneficiaryData.residence !== -1) &&
        (beneficiaryData.hasOwnProperty('province') && beneficiaryData.province.length > 3) &&
        (beneficiaryData.hasOwnProperty('city') && beneficiaryData.city.length > 3) &&
        (
            (beneficiaryData.hasOwnProperty('direction1') && beneficiaryData.direction1.length > 0) ||
            (beneficiaryData.hasOwnProperty('direction2') && beneficiaryData.direction2.length > 0)
        ) &&
        (beneficiaryData.hasOwnProperty('postalCode') && beneficiaryData.postalCode.length > 3) &&
        (beneficiaryData.hasOwnProperty('foundsOrigin') && beneficiaryData.foundsOrigin !== -1) &&
        (beneficiaryData.hasOwnProperty('estimateMonthlyAmount') && beneficiaryData.estimateMonthlyAmount.length > 0) &&
        (beneficiaryData.hasOwnProperty('profession') && beneficiaryData.profession.length > 4) &&
        (beneficiaryData.hasOwnProperty('profilePicture') && beneficiaryData.profilePicture !== null) &&
        (beneficiaryData.hasOwnProperty('IDPicture') && beneficiaryData.IDPicture !== null)
    )
}

const ecommerceValidations = {
    commerceBasicInfo: (commerceData) => (
        //(commerceData.hasOwnProperty('name') && commerceData.name.length > 0) &&
        //(commerceData.hasOwnProperty('email') && commerceData.email.length > 0) &&
        //(commerceData.hasOwnProperty('commerceWebsite') && commerceData.commerceWebsite.length > 0) &&
        (commerceData.hasOwnProperty('commerceName') && commerceData.commerceName.length > 4) &&
        (commerceData.hasOwnProperty('commerceType') && commerceData.commerceType !== -1) &&
        (commerceData.hasOwnProperty('commerceIdentificationNumber') && commerceData.commerceIdentificationNumber.length > 6) &&
        (commerceData.hasOwnProperty('commerceIdentificationPicture') && commerceData.commerceIdentificationPicture !== null) &&
        (commerceData.hasOwnProperty('incorporationDate') && Math.floor(moment.duration(moment(commerceData.incorporationDate).diff(now)).asDays()) < 0) &&
        (commerceData.hasOwnProperty('country') && commerceData.country !== -1) &&
        (commerceData.hasOwnProperty('permanentProvince') && commerceData.permanentProvince.length > 3) &&
        (commerceData.hasOwnProperty('commerceCity') && commerceData.commerceCity.length > 3) &&
        (
            (commerceData.hasOwnProperty('commerceDirection') && commerceData.commerceDirection.length > 0) ||
            (commerceData.hasOwnProperty('commerceDirection2') && commerceData.commerceDirection2.length > 0)
        ) &&
        (commerceData.hasOwnProperty('commercePostalCode') && commerceData.commercePostalCode.length > 4) &&
        (commerceData.hasOwnProperty('commerceTelephone') && commerceData.commerceTelephone.length > 6) &&

        (commerceData.hasOwnProperty('commercialActivityCountry') && commerceData.commercialActivityCountry !== -1) &&
        (commerceData.hasOwnProperty('comercialProvince') && commerceData.comercialProvince.length > 3) &&
        (
            commerceData.commerceType == (commercialCategories.length - 1)
                ? commerceData.hasOwnProperty('commerceTypeDescription') && commerceData.commerceTypeDescription.length > 4
                : true
        )
    ),

    commerceBeneficialInfo: (commerceData) => {
        const {
            beneficialOwnerList,
            legalRepresentative
        } = commerceData

        return (
            (beneficialOwnerList && beneficialOwnerList.length > 0) &&
            (commerceData.hasOwnProperty('representativeType')) &&
            (legalRepresentative && (
                legalRepresentative.chargeTitle && legalRepresentative.chargeTitle.length > 4 &&
                legalRepresentative.fullname && legalRepresentative.fullname.length > 0 &&
                (
                    (
                        (legalRepresentative.passportNumber && legalRepresentative.passportNumber.length > 6) &&
                        (legalRepresentative.passportEmissionCountry && legalRepresentative.passportEmissionCountry !== -1)
                    ) ||
                    (legalRepresentative.identificationNumber && legalRepresentative.identificationNumber.length > 6)
                ) &&
                (legalRepresentative.originCountry && legalRepresentative.originCountry !== -1) &&
                (legalRepresentative.direction && legalRepresentative.direction.length > 0) &&
                (legalRepresentative.telephoneNumber && legalRepresentative.telephoneNumber.length > 6) &&
                (legalRepresentative.email && validator.isEmail(legalRepresentative.email)) &&
                (
                    (
                        legalRepresentative.passportNumber &&
                        (legalRepresentative.passportPicture && legalRepresentative.passportPicture !== null)
                    ) ||
                    (
                        legalRepresentative.identificationNumber &&
                        (legalRepresentative.identificationPicture && legalRepresentative.identificationPicture !== null)
                    )
                )
            )) &&
            (commerceData.hasOwnProperty('isDiplomatic'))
        )
    },

    beneficialOwnerItemInfo: (BOData) => (
        (BOData.hasOwnProperty('chargeTitle') && BOData.chargeTitle.length > 4) &&
        (BOData.hasOwnProperty('fullname') && BOData.fullname.length > 2) &&
        (BOData.hasOwnProperty('birthday') && Math.floor(moment.duration(moment(BOData.birthday).diff(now)).asDays()) < 0) &&
        (
            (
                (BOData.hasOwnProperty('passportNumber') && BOData.passportNumber.length > 6) &&
                (BOData.hasOwnProperty('passportEmissionCountry') && BOData.passportEmissionCountry !== -1)
            ) ||
            (BOData.hasOwnProperty('identificationNumber') && BOData.identificationNumber.length > 6)
        ) &&
        (BOData.hasOwnProperty('originCountry') && BOData.originCountry !== -1) &&
        (BOData.hasOwnProperty('province') && BOData.province.length > 3) &&
        (BOData.hasOwnProperty('city') && BOData.city.length > 3) &&
        (BOData.hasOwnProperty('direction') && BOData.direction.length > 0) &&
        (BOData.hasOwnProperty('postalCode') && BOData.postalCode.length > 0) &&
        (BOData.hasOwnProperty('participationPercentage') && BOData.participationPercentage.length > 0) &&
        (BOData.hasOwnProperty('email') && validator.isEmail(BOData.email)) &&
        //(BOData.hasOwnProperty('idTax') && BOData.idTax.length > 0) &&
        (
            (
                BOData.hasOwnProperty('passportNumber') &&
                (BOData.hasOwnProperty('passportPicture') && BOData.passportPicture !== null)
            ) ||
            (
                BOData.hasOwnProperty('identificationNumber') &&
                (BOData.hasOwnProperty('identificationPicture') && BOData.identificationPicture !== null)
            )
        )
    ),

    beneficialOwnerSectionInfo: (BOSInfo) => (
        (BOSInfo.beneficialOwnerList.length > 0)
    ),

    tradeIncomingInfo: (commerceData) => (
        commerceData.hasOwnProperty('commerceNote') && commerceData.commerceNote.length > 4 &&
        commerceData.hasOwnProperty('commerceEstimateTransactions') && commerceData.commerceEstimateTransactions.length > 0 &&
        commerceData.hasOwnProperty('commerceEstimateTransactionsAmount') && commerceData.commerceEstimateTransactionsAmount.length > 0 &&
        commerceData.hasOwnProperty('commerceCertificatePicture') && commerceData.commerceCertificatePicture !== null &&
        commerceData.hasOwnProperty('commerceDirectorsPicture') && commerceData.commerceDirectorsPicture !== null &&
        commerceData.hasOwnProperty('commerceDirectorsInfoPicture') && commerceData.commerceDirectorsInfoPicture !== null &&
        commerceData.hasOwnProperty('commerceLegalCertificate') && commerceData.commerceLegalCertificate !== null
    )
}

export {
    userValidations,
    ecommerceValidations
}