import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookStore = create(
    persist(
        (set) => ({
            lectura:[],
            ventana:false,
            libroSeleccionado:{},
            agregarLectura: (i) => {
                set((state) => ({
                    lectura: [...state.lectura,i]
                }))
            },
            eliminarLectura: (i) => {
                set((state) => ({
                    lectura: state.lectura.filter((val) => val!==i)
                }))
            },
            abrirVentana: () => {
                set(() => ({
                    ventana: true
                }))
            },
            cerrarVentana: () => {
                set(() => ({
                    ventana: false
                }))
            },
            seleccionarLibro: (i) => {
                set(() => ({
                    libroSeleccionado: i
                }))
            }
        }),
        {
            name:"book-storage",
            getStorage: () => localStorage
        }
    )
)

export default useBookStore