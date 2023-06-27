import clipboardPng from '../assets/clipboard.png'
import styles from './TodoList.module.css'
import { TodoRow } from './TodoRow'

// TODO renderizar uma TodoRow para cada item dentro da lista

export interface Todo {
  id: string
  text: string
  complete: boolean
}

interface TodoArrayProps {
  todoArray: Todo[]
  setTodoList: (value: object[]) => void
  onCheckedTask: () => void
}

export function TodoList({ todoArray, setTodoList }: TodoArrayProps) {
  const todoIsEmpty = todoArray.length === 0

  function onCompleteTask(id: string, complete: boolean) {
    const newTodoArray = todoArray.map((todo) => {
      if (todo.id === id) {
        todo.complete = complete
      }
      return todo
    })
    setTodoList(newTodoArray)
    console.log(` A task: ${id} está completa ? ${complete}`)
  }

  function deleteTask(id: string) {
    const filteredTodoList = todoArray.filter((todo) => todo.id !== id)

    setTodoList(filteredTodoList)
  }

  if (todoIsEmpty) {
    return (
      <ul className={styles.todoListEmpty}>
        <div className={styles.emptyTodo}>
          <img src={clipboardPng} alt="ClipboardSvg" />
          <p>
            <strong>Você ainda não tem tarefas cadastradas</strong> Crie tarefas
            e organize seus itens a fazer
          </p>
        </div>
      </ul>
    )
  }

  return (
    <ul className={styles.todoList}>
      {todoArray.map((todo) => {
        return (
          <TodoRow
            key={todo.id}
            content={todo.text}
            id={todo.id}
            complete={todo.complete}
            setCompleteTask={onCompleteTask}
            onDeleteTask={deleteTask}
          />
        )
      })}
    </ul>
  )
}
