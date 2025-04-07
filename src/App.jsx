import { useEffect, useState } from 'react'
import './App.css'
import books from "./data/books.json"
import useBookStore from './logic/BookStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import WindowBook from './components/WindowBook'

const opciones = ["Fantasía","Ciencia ficción","Zombies","Terror"]

function App() {

  const [lectVentana, setLectVentana] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [genero,setGenero] = useState("")
  const [data,setData] = useState([])
  const {lectura, abrirVentana, eliminarLectura, seleccionarLibro} = useBookStore()

  useEffect(() => {
    setData(books.library)
  },[])

  const toggleVentana = (val) => {
    setIsChanging(true)
    setTimeout(() => {
      setLectVentana(val)
    }, 450)
    setTimeout(() => {
      setIsChanging(false)
    }, 450)
  }

  const handleInformation = (val) => {
    seleccionarLibro(val)
    abrirVentana()
  }

  const handleEliminacion = (val) => {
    eliminarLectura(val)
  }

  return (
    <>
    <WindowBook/>
    <div className='mx-auto w-[1200px] max-w-full p-5'>
        <div className='flex gap-0'>
          <button className={`p-5 pb-[21px] bordeado-nav cursor-pointer text-slate-600 text-lg relative bg-white ${!lectVentana ? "z-30":"z-10"} ${isChanging ? "cursor-not-allowed":""}`} onClick={() => toggleVentana(false)}>Libros disponibles</button>
          <button className={`p-5 pb-[21px] bordeado-nav cursor-pointer text-slate-600 text-lg relative bg-white ${lectVentana ? "z-30":"z-10"} ${isChanging ? "cursor-not-allowed":""}`} onClick={() => toggleVentana(true)}>Lista de lectura</button>
        </div>
        <div className={`bg-white -mt-[1px] border bordeado w-full min-h-96 relative z-20 p-5`}>
          {!lectVentana ? (
            <div className={`transition-all delay-150 duration-300 ${!lectVentana && !isChanging ? "opacity-100 scale-100" : !lectVentana && isChanging ?  "opacity-0 scale-95" : lectVentana && isChanging ? "opacity-0 scale-95" : ""}`}>
              <h2>{books.library.length} Libros Disponibles</h2>
              <section className='py-5'>
                <div className='flex gap-2 items-center'>
                  <label htmlFor='select-genero'>Selecciona el género:</label>
                  <select
                    id='select-genero'
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    className='border rounded-full py-2 px-5'
                  >
                    <option value={""}>-- Todos --</option>
                    {opciones.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div></div> {/* crear un input range */}
              </section>
              <section className='flex flex-wrap gap-5 justify-around items-baseline'>
                {data.filter((item) => item.book.genre.includes(genero)).map((item,i) => (
                  <div className='text-center flex flex-col justify-center items-center w-40 gap-3 cursor-pointer group transition-all duration-300 hover:scale-95 relative' key={i} onClick={() => {
                    seleccionarLibro(item.book)
                    abrirVentana()
                  }}>
                    <div className={`absolute w-10 h-10 right-0 text-2xl flex justify-center items-center text-gray-100 -top-5 ${lectura.includes(item.book.ISBN) ? "bg-green-600":"bg-red-600"}`}>
                      {lectura.includes(item.book.ISBN) ? (
                        <FontAwesomeIcon icon={faBookOpen} />
                      ):(
                        <FontAwesomeIcon icon={faBook} />
                      )}
                    </div>
                    <img className='w-32' src={item.book.cover} alt={item.book.title}/>
                    <p className='font-bold group-hover:text-yellow-700 transition-all duration-300'>{item.book.title}</p>
                  </div>
                ))}
              </section>
            </div>
          ):(
            <div className={`transition-all delay-150 duration-300 ${lectVentana && !isChanging ? "opacity-100 scale-100" : lectVentana && isChanging ?  "opacity-0 scale-95" : !lectVentana && isChanging ? "opacity-0 scale-95" : ""}`}>
              {data.filter((item) => lectura.includes(item.book.ISBN)).map((val,i) => (
                <div key={i} className='flex flex-wrap justify-between m-2 p-3 border rounded-md'>
                  <div className='flex gap-3'>
                    <img src={val.book.cover} className='h-64' />
                    <div className='max-w-64 space-y-3'>
                      <h2 className='font-black text-xl'>{val.book.title}</h2>
                      <p className='font-light'>{val.book.synopsis}</p>
                      <p>Género:{" "}<span className='px-5 py-2 rounded-full bg-amber-500'>{val.book.genre}</span></p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-95 bg-green-400 px-5 py-2 rounded-full font-black' onClick={() => handleInformation(val.book)}>Más información</button>
                    <button className='cursor-pointer transition-all duration-300 hover:scale-95 bg-red-400 px-5 py-2 rounded-full font-black' onClick={() => handleEliminacion(val.book.ISBN)}>Quitar de la lista</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
    </>
  )
}

export default App
