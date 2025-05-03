import { Carrito } from '@/types'
import { createContext, ReactNode, useEffect, useState } from 'react'

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
  // Miramos si está en LocalStorage, si está, usamos ese como valor inicial, si no, ponemos uno vacío
  const [carrito, setCarrito] = useState<Carrito>(() => {
    const saved = localStorage.getItem('carrito')
    return saved ? (JSON.parse(saved) as Carrito) : { productos: [], precioTotal: 0 }
  })

  // Cada vez que se modifique carrito, se va a guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

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
