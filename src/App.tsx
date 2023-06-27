import { nanoid } from 'nanoid'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './App.module.css'
import plusSvg from './assets/plus.svg'
import rocketSvg from './assets/rocket.svg'
import { TodoList } from './components/TodoList'

import './global.css'

function App() {
  const [newTask, setNewTask] = useState('')
  const [todoList, setTodoList] = useState<object[]>([])

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    const content = event.target.value
    setNewTask(content)
  }

  function handleTodoList(event: FormEvent) {
    event.preventDefault()

    const todoItem = {
      id: nanoid(),
      complete: false,
      text: newTask,
    }
    setTodoList([...todoList, todoItem])
    setNewTask('')
  }
  const taskNumber = todoList.length
  const checkedTaskList = todoList.filter((task) => task.complete === true)
  const checkedTaskListNumber = checkedTaskList.length
  const newTaskIsEmpty = newTask === ''
  return (
    <>
      <header className={styles.header}>
        <img src={rocketSvg} alt="rocketSvgIcon" />
        <h1>
          to<span>do</span>
        </h1>
      </header>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleTodoList}>
          <input
            type="text"
            value={newTask}
            onChange={handleNewTask}
            required
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit" disabled={newTaskIsEmpty}>
            Criar <img src={plusSvg} alt="plusSvg" />
          </button>
        </form>
        <div className={styles.todoWrapper}>
          <section className={styles.todoInfoBar}>
            <strong className={styles.createdJobs}>
              Tarefas Criadas<span>{taskNumber}</span>
            </strong>
            <strong className={styles.completedJobs}>
              Concluídas{' '}
              <span>{`${checkedTaskListNumber} de ${taskNumber}`}</span>
            </strong>
          </section>
          <TodoList todoArray={todoList} setTodoList={setTodoList} />
        </div>
      </div>
    </>
  )
}

export default App
