import React, { useState } from 'react'

export const useValidateForm = () => {
    const [errorName, seterrorName] = useState(false)
    const [errorEmail, seterrorEmail] = useState(false)
    const [errorPass, seterrorPass] = useState(false)
    const [errorPassRepeat, seterrorPassRepeat] = useState(false)

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const regexp_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/;

    const validateRegister = (formState) => {
        const { name, email, pass, repeatPass } = formState

        //Validar formulario

        if (!(name.length >= 3 && name.length <= 50 && emailRegex.test(email) && regexp_password.test(pass) && pass === repeatPass)) {
            if (!(name.length >= 3 && name.length <= 50)) {
                seterrorName(true)
            } else seterrorName(false)

            if (!(emailRegex.test(email))) {
                seterrorEmail(true)
            } else seterrorEmail(false)

            if (!(regexp_password.test(pass))) {
                seterrorPass(true)
            } else seterrorPass(false)

            if (pass != repeatPass) {
                seterrorPassRepeat(true)
            } else seterrorPassRepeat(false)

            return false
        } else {
            seterrorName(false)
            seterrorEmail(false)
            seterrorPass(false)
            seterrorPassRepeat(false)

            return true
        }

    }

    const validateSesion = (formState) => {
        const { email, pass } = formState

        //Validar formulario

        if (!(emailRegex.test(email) && regexp_password.test(pass))) {

            if (!(emailRegex.test(email))) {
                seterrorEmail(true)
            } else seterrorEmail(false)

            if (!(regexp_password.test(pass))) {
                seterrorPass(true)
            } else seterrorPass(false)

            return false
        } else {
            seterrorEmail(false)
            seterrorPass(false)

            return true
        }

    }
    const validateRecoverPass = (formState) => {
        const { pass, repeatPass } = formState

        //Validar formulario

        if (!(regexp_password.test(pass) && pass === repeatPass)) {

            if (!(regexp_password.test(pass))) {
                seterrorPass(true)
            } else seterrorPass(false)

            if (pass != repeatPass) {
                seterrorPassRepeat(true)
            } else seterrorPassRepeat(false)

            return false
        } else {
            seterrorPassRepeat(false)
            seterrorPass(false)

            return true
        }

    }

    return {
        errorName,
        errorEmail,
        errorPass,
        errorPassRepeat,
        validateRegister,
        validateSesion,
        validateRecoverPass
    }
}
