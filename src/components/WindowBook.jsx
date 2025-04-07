import React from 'react'
import useBookStore from '../logic/BookStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function WindowBook() {

  const {lectura, ventana, libroSeleccionado, cerrarVentana, agregarLectura, eliminarLectura} = useBookStore()

  const handleButton = () => {
    if(lectura.includes(libroSeleccionado.ISBN)){
      eliminarLectura(libroSeleccionado.ISBN)
      cerrarVentana()
    } else {
      agregarLectura(libroSeleccionado.ISBN)
      cerrarVentana()
    }
  }

  return (
    <main className={`fixed w-full h-dvh bg-slate-500 z-50 transition-all flex flex-col duration-300 ${ventana ? "top-0":"top-full"}`}>
      <div className='h-20 bg-white p-5 flex items-center text-5xl text-slate-500'>
        <button className='cursor-pointer' onClick={cerrarVentana}>
          <FontAwesomeIcon icon={faXmark}/>
        </button>
      </div>
      {Object.keys(libroSeleccionado).length !== 0 && (
        <div className='p-5 flex flex-col w-full justify-center items-center text-white font-medium gap-10 flex-auto'>
          <img className='w-64' src={libroSeleccionado.cover} alt={libroSeleccionado.title}/>
          <div className='w-96 space-y-2'>
            <h2>Título: {libroSeleccionado.title}</h2>
            <p>Sinopsis: {libroSeleccionado.synopsis}</p>
            <p>Año: {libroSeleccionado.year}</p>
            <p>ISBN: {libroSeleccionado.ISBN}</p>
            <h3>
              Autor: {libroSeleccionado.author.name} - Otras Obras: {libroSeleccionado.author.otherBooks.map((val) => (<span>{val}</span>))}
            </h3>
            <button className={`w-full text-center py-3 rounded-full text-black cursor-pointer transition-all duration-300 hover:scale-95 ${lectura.includes(libroSeleccionado.ISBN) ? "bg-red-400":"bg-green-400"}`} onClick={handleButton}>{lectura.includes(libroSeleccionado.ISBN) ? "Quitar de lista de lectura":"Añadir a lista de lectura"}</button>
          </div>
        </div>
      )}
    </main>
  )
}
