"use client"

import type { FC } from "react"
import type { ITarea } from "../../../types/ITarea"
import styles from "./CardList.module.css"
import { useTareas } from "../../../hooks/useTareas"

type ICardList = {
  tarea: ITarea
  handleOpenModalEdit: (tarea: ITarea) => void
}

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit }) => {
  const { eliminarTarea } = useTareas()

  const eliminarTareaById = () => {
    eliminarTarea(tarea.id!)
  }

  const editarTarea = () => {
    handleOpenModalEdit(tarea)
  }

  return (
    <div className={styles.containerCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{tarea.titulo}</h3>
        <p className={styles.cardDescription}>{tarea.descripcion}</p>
        <span className={styles.cardDate}>{tarea.fechaLimite}</span>
      </div>
      <div className={styles.actionCard}>
        <button className={styles.editButton} onClick={editarTarea}>
          Editar
        </button>
        <button className={styles.deleteButton} onClick={eliminarTareaById}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
