import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorId, getAllTareas, postNuevaTarea } from "../http/tarea"
import { ITarea } from "../types/ITarea"


export const useTareas = () => {
    const { tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea, editarUnaTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea
    })))

    const getTareas = async () => {
        const data = await getAllTareas()
        if (data) setArrayTareas(data)
    }

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await postNuevaTarea(nuevaTarea)
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.log("Algo salió mal al crear la tarea")
        }
    }

    const putTareaEditar = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id)
        editarUnaTarea(tareaEditada)
        try {
            await editarTarea(tareaEditada)
        } catch (error) {
            if (estadoPrevio) editarUnaTarea(estadoPrevio)
            console.log("Algo salió mal al editar la tarea")
        }
    }

    const eliminarTarea = async (idTarea: string) => {
    const estadoPrevio = [...tareas]

    try {
        eliminarUnaTarea(idTarea)

        await eliminarTareaPorId(idTarea)
    } catch (error) {
        setArrayTareas(estadoPrevio)
        console.log("Algo salió mal al eliminar la tarea")
    }
}

    return {
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        tareas
    }
}
