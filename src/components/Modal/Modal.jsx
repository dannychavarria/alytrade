import React, { useEffect, useCallback } from 'react'

// Import styles and asstes
import "./Modal.scss"

const Modal = ({ children, onlyChildren = false, onClose = () => { }, persist = false, className="" }) => {
    const onHandledCallback = useCallback(() => onClose(), [])

    /**Metodo que comprueba si la ventana modal es persistente */
    const tryClose = () => {
        if (!persist) {
            onHandledCallback()
        }
    }

    useEffect(() => {
        if (!persist) {
            document.body.style.overflow = "hidden"

            document.onkeyup = (key) => {
                if (key.code === "Escape") {
                    onHandledCallback()
                }
            }
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <div className="modal">
            <div className="background-modal" onClick={tryClose} />

            {
                !onlyChildren &&
                <div className={`container ${className}`}>
                    {children}
                </div>
            }

            {
                onlyChildren &&
                <>
                    {children}
                </>
            }

        </div>
    )
}

export default Modal