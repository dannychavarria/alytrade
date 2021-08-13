import { useState, useEffect } from 'react'

export const useWindowWidth = () => {
  const [width, setWitdh] = useState(0)

  useEffect(() => {
    // We create a function to update the state with the clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      setWitdh(width)
    }

    //We will update the width when mounting the component
    updateWidth()

    // We subscribe to the window resize () event
    window.addEventListener('resize', updateWidth)

    // We return a function to unsubscribe from the event
    return () => window.removeEventListener('resize', updateWidth)
  }, [width])

  return width
}
