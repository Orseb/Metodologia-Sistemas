"use client"

import { useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./ListTareas.module.css"
import { CardList } from "../CardList/CardList"
import { Modal } from "../Modal/Modal"
import type { ITarea } from "../../../types/ITarea"
import { useTareas } from "../../../hooks/useTareas"

export const ListTareas = () => {
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const { getTareas, tareas } = useTareas()

  useEffect(() => {
    getTareas()
  }, [])

  const [openModalTarea, setOpenModalTarea] = useState(false)

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea)
    setOpenModalTarea(true)
  }

  const handleCloseModal = () => {
    setOpenModalTarea(false)
    setTareaActiva(null)
  }

  return (
    <>
      <div className={styles.containerPrincipalListTareas}>
        <div className={styles.containerTileAndButton}>
          <h2>Lista de Tareas</h2>
          <button
            onClick={() => {
              setOpenModalTarea(true)
            }}
          >
            + Nueva Tarea
          </button>
        </div>
        <div className={styles.containerList}>
          {tareas.length > 0 ? (
            tareas.map((el) => <CardList key={el.id} handleOpenModalEdit={handleOpenModalEdit} tarea={el} />)
          ) : (
            <div className={styles.emptyState}>
              <h3>No hay tareas</h3>
              <p>Crea una nueva tarea para comenzar</p>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  )
}
