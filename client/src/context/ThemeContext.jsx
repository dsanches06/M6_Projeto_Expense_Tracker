import { createContext, useState, useEffect, useContext } from 'react'

// Contexto do tema da aplicação
// Gere a alternância entre tema claro e escuro
// O tema é persistido no localStorage para manter a preferência entre sessões
export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // 1. Ler do localStorage ao inicializar o estado
  //    Se não existir valor guardado, usa 'light' como default
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // 2. Escrever no localStorage sempre que o tema muda
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]) // ← corre sempre que 'theme' muda

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook personalizado para aceder facilmente ao contexto do tema
export function useTheme() {
  return useContext(ThemeContext)
}
