import Countries from "../utils/countries.json"
import { uploadFile, commercialCategories } from "../utils/constanst"


/**
 * Función para construir el arreglo con la lista de beneficiarios del comercio
 * @param {Array} beneficiariesData - Lista de beneficiarios
 * @param {Object} credentials - credenciales de acceso al endpoint
 */
export const kycEcommerceBeneficiariesData = (beneficiariesData, credentials) => new Promise(async (resolve, reject) => {
    try {
        const result = []

        for (let beneficiary of beneficiariesData) {
            // Se obtiene la información a enviar sobre los paises
            const passportOrigin = (beneficiary.passportNumber)
                ? Countries[beneficiary.passportEmissionCountry]
                : { name: null, phoneCode: null, code: null }

            const originCountry = Countries[beneficiary.originCountry]

            /**
             * Subida de los archivos al servidor
             */
            // imagen del pasaporte
            const uploadPassportPicture = (beneficiary.passportNumber)
                ? await uploadFile(beneficiary.passportPicture, credentials)
                : { fileId: null }

            if (uploadPassportPicture && uploadPassportPicture.error) {
                throw String(uploadPassportPicture.message)
            }

            // Imagen de la indentificaión personal
            const uploadIdentificationPicture = (beneficiary.identificationNumber)
                ? await uploadFile(beneficiary.identificationPicture, credentials)
                : { fileId: null }

            if (uploadIdentificationPicture && uploadIdentificationPicture.error) {
                throw String(uploadIdentificationPicture.message)
            }

            result.push({
                chargeTitle: beneficiary.chargeTitle,
                fullname: beneficiary.fullname,
                birthday: beneficiary.birthday,
                email: beneficiary.email,
                identificationNumber: beneficiary.identificationNumber || null,
                passportNumber: beneficiary.passportNumber || null,
                passportCountry: passportOrigin.name,
                passportPhoneCode: passportOrigin.phoneCode,
                passportCurrency: passportOrigin.code,
                originCountry: originCountry.name,
                originPhoneCode: originCountry.phoneCode,
                originCurrency: originCountry.code,
                province: beneficiary.province,
                city: beneficiary.city,
                direction: beneficiary.direction,
                postalCode: beneficiary.postalCode,
                participationPercentage: beneficiary.participationPercentage,
                identificationTaxNumber: beneficiary.identificationTaxNumber || null,
                passportPicture: uploadPassportPicture.fileId,
                identificationPicture: uploadIdentificationPicture.fileId
            })
        }

        resolve(result)
    } catch (error) {
        console.error("benef", error)
        reject(error.toString())
    }
})


/**
 * Función para construir el objeto con la info del representante legal del comercio
 * @param {Object} legalRepresentativeData 
 * @param {Object} credentials 
 */
export const kycEcommerceLegalRepresentative = (legalRepresentativeData, credentials) => new Promise(async (resolve, reject) => {
    try {
        // Se obtienen los datos de los países
        const passportOrigin = (legalRepresentativeData.passportNumber)
            ? Countries[legalRepresentativeData.passportEmissionCountry]
            : { name: null, phoneCode: null, code: null }

        const originCountry = Countries[legalRepresentativeData.originCountry]

        /**
         * Subida de los archivos al servidor
         */
        // imagen del pasaporte
        const uploadPassportPicture = (legalRepresentativeData.passportNumber)
            ? await uploadFile(legalRepresentativeData.passportPicture, credentials)
            : { fileId: null }

        if (uploadPassportPicture && uploadPassportPicture.error) {
            throw String(uploadPassportPicture.message)
        }

        // Imagen de la indentificaión personal
        const uploadIdentificationPicture = (legalRepresentativeData.identificationNumber)
            ? await uploadFile(legalRepresentativeData.identificationPicture, credentials)
            : { fileId: null }

        if (uploadIdentificationPicture && uploadIdentificationPicture.error) {
            throw String(uploadIdentificationPicture.message)
        }

        const result = {
            representativeType: legalRepresentativeData.representativeType,
            chargeTitle: legalRepresentativeData.chargeTitle,
            fullname: legalRepresentativeData.fullname,
            identificationNumber: legalRepresentativeData.identificationNumber || null,
            passportNumber: legalRepresentativeData.passportNumber || null,
            passportCountry: passportOrigin.name,
            passportPhoneCode: passportOrigin.phoneCode,
            passportCurrency: passportOrigin.code,
            originCountry: originCountry.name,
            originPhoneCode: originCountry.phoneCode,
            originCurrency: originCountry.code,
            direction: legalRepresentativeData.direction,
            identificationTaxNumber: legalRepresentativeData.identificationTaxNumber || null,
            telephoneNumber: legalRepresentativeData.telephoneNumber,
            passportPicture: uploadPassportPicture.fileId,
            identificationPicture: uploadIdentificationPicture.fileId,
            politicallyExposed: legalRepresentativeData.politicallyExposed,
            email: legalRepresentativeData.email
        }

        resolve(result)
    } catch (error) {
        console.error("legal", error)
        reject(error.toString())
    }
})


/**
 * Función que construye el objeto base a enviar al servidor
 * @param {Object} commerceData - Información del comercio
 * @param {Object} credentials - Credenciales de acceso
 */
export const kycEcommerceData = (commerceInfo, credentials) => new Promise(async (resolve, reject) => {
    try {
        // Se obtiene el name, phoneCode, y currency según la actividad comercial
        const ecommerceComercial = Countries[commerceInfo.commercialActivityCountry]

        // Se obtiene el name, phoneCode, y currency según la ubicación permanente
        const ecommercePermanent = Countries[commerceInfo.country]

        /**
         * Subida de archivos al servidor
         */

        // Se almacena en el servidor la imagen de la indentificación
        const uploadIdentificationPicture = await uploadFile(commerceInfo.commerceIdentificationPicture, credentials)

        if (uploadIdentificationPicture.error) {
            throw String(uploadIdentificationPicture.message)
        }

        const uploadCommerceCertificatePicture = await uploadFile(commerceInfo.commerceCertificatePicture, credentials)

        if (uploadCommerceCertificatePicture.error) {
            throw String(uploadCommerceCertificatePicture.message)
        }

        const uploadCommerceDirectorsPicture = await uploadFile(commerceInfo.commerceDirectorsPicture, credentials)

        if (uploadCommerceDirectorsPicture.error) {
            throw String(uploadCommerceDirectorsPicture.message)
        }

        const uploadCommerceDirectorsInfoPicture = await uploadFile(commerceInfo.commerceDirectorsInfoPicture, credentials)

        if (uploadCommerceDirectorsInfoPicture.error) {
            throw String(uploadCommerceDirectorsInfoPicture.message)
        }

        const uploadCommerceLegalCertificate = await uploadFile(commerceInfo.commerceLegalCertificate, credentials)

        if (uploadCommerceLegalCertificate.error) {
            throw String(uploadCommerceLegalCertificate.message)
        }

        // Se construye la lista de los beneficiarios
        const beneficiaries = await kycEcommerceBeneficiariesData(commerceInfo.beneficialOwnerList, credentials)

        if (beneficiaries.error) {
            throw String(beneficiaries.error)
        }

        // Se construye el objeto del representante legal
        const legalRepresentative = await kycEcommerceLegalRepresentative({
            ...commerceInfo.legalRepresentative,
            representativeType: commerceInfo.representativeType,
            politicallyExposed: commerceInfo.isDiplomatic ? 1 : 0
        }, credentials)


        const result = {
            commerceWebsite: commerceInfo.commerceWebsite,
            comercialCountry: ecommerceComercial.name,
            comercialPhoneCode: ecommerceComercial.phoneCode,
            comercialCurrency: ecommerceComercial.code,
            comercialProvince: commerceInfo.comercialProvince,
            permanentCountry: ecommercePermanent.name,
            permanentPhoneCode: ecommercePermanent.phoneCode,
            permanentCurrency: ecommercePermanent.code,
            permanentProvince: commerceInfo.permanentProvince,
            commerceName: commerceInfo.commerceName,
            commerceType: commerceInfo.commerceType != (commercialCategories.length - 1)
                ? commerceInfo.commerceType
                : commerceInfo.commerceTypeDescription
            ,
            commerceTelephone: commerceInfo.commerceTelephone,
            commerceIdentificationNumber: commerceInfo.commerceIdentificationNumber,
            commerceIdentificationPicture: uploadIdentificationPicture.fileId,
            incorporationDate: commerceInfo.incorporationDate,
            commerceCity: commerceInfo.commerceCity,
            commerceDirection: commerceInfo.commerceDirection,
            commerceDirection2: commerceInfo.commerceDirection2 || null,
            commercePostalCode: commerceInfo.commercePostalCode,
            commerceNote: commerceInfo.commerceNote,
            commerceEstimateTransactions: commerceInfo.commerceEstimateTransactions,
            commerceEstimateTransactionsAmount: commerceInfo.commerceEstimateTransactionsAmount,
            commerceCertificatePicture: uploadCommerceCertificatePicture.fileId,
            commerceDirectorsPicture: uploadCommerceDirectorsPicture.fileId,
            commerceDirectorsInfoPicture: uploadCommerceDirectorsInfoPicture.fileId,
            commerceLegalCertificate: uploadCommerceLegalCertificate.fileId,
            beneficiaries,
            legalRepresentative
        }

        resolve(result)
    } catch (error) {
        console.error("main", error)
        reject(error.toString())
    }
})