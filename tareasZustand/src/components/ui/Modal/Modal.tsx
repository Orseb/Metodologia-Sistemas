"use client"

import { type ChangeEvent, type FC, type FormEvent, useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import type { ITarea } from "../../../types/ITarea"
import { useTareas } from "../../../hooks/useTareas"

type IModal = {
  handleCloseModal: VoidFunction
}

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
}

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva)

  const setTareaActiva = tareaStore((state) => state.setTareaActiva)

  const { crearTarea, putTareaEditar } = useTareas()

  const [formValues, setFormValues] = useState<ITarea>(initialState)

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (tareaActiva) {
      putTareaEditar(formValues)
    } else {
      crearTarea({ ...formValues, id: new Date().toDateString() })
    }
    setTareaActiva(null)
    handleCloseModal()
  }

  return (
    <div className={styles.containerPrincipalModal} onClick={handleCloseModal}>
      <div className={styles.contentPopUp} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"}</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              onChange={handleChange}
              placeholder="Ingrese un título"
              type="text"
              required
              autoComplete="off"
              name="titulo"
              value={formValues.titulo}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              onChange={handleChange}
              placeholder="Ingrese una descripción"
              required
              name="descripcion"
              value={formValues.descripcion}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fechaLimite">Fecha Límite</label>
            <input
              id="fechaLimite"
              onChange={handleChange}
              type="date"
              required
              autoComplete="off"
              name="fechaLimite"
              value={formValues.fechaLimite}
            />
          </div>
          <div className={styles.buttonCard}>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              {tareaActiva ? "Guardar Cambios" : "Crear Tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
