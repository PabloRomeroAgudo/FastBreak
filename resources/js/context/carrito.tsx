
import { Carrito } from '@/types'
import { createContext, ReactNode, useState } from 'react'

interface Contexto {
  carrito: Carrito
  setCarrito: (newCarrito: Carrito) => void  
}

// Lo que hay que consumir
export const CarritoContext = createContext<Contexto | null>(null)  

interface Props {
  children: ReactNode
}

// Nos provee el acceso al contexto
export function CarritoProvider({ children }: Props) {
  // Estado de carrito
  const [carrito, setCarrito] = useState<Carrito>({ productos: [], precioTotal: 0 })

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}
