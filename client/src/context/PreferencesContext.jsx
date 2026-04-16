import { createContext, useState, useEffect } from 'react'

// Contexto de preferências do utilizador
// Gere a moeda selecionada e o nome do utilizador
// Os valores são persistidos no localStorage para manter entre sessões
export const PreferencesContext = createContext()

export function PreferencesProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'EUR'
  })

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || ''
  })

  // Cada valor tem o seu próprio useEffect
  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  return (
    <PreferencesContext.Provider value={{ currency, setCurrency, userName, setUserName }}>
      {children}
    </PreferencesContext.Provider>
  )
}
