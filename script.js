const tasks = document.getElementById('tasks')
const buttonShowForm = document.getElementById('button-show-form')
const buttonDeleteTasks = document.getElementById('button-delete-tasks')
const modal = document.getElementById('modal')
const form = document.getElementById('form')
const formTitle = document.getElementById('form-title')
const formDescription = document.getElementById('form-description')
const formDate = document.getElementById('form-date')
const formColors = document.getElementsByName('form-color')


const eventListeners = () => {

    addEventListener('DOMContentLoaded', loadTaksDOM)
    tasks.addEventListener("click", deleteTask)
    buttonDeleteTasks.addEventListener('click', deleteTasks)
    buttonShowForm.addEventListener('click', showRegisterModal)
    modal.addEventListener('click', closeModal)
    form.addEventListener('submit', submitForm)

}


const getFormData = () => {
    const formColorsArray = Array.from(formColors)
    const formColor = parseInt(formColorsArray.find(color => color.checked).value)

    return {
        title: formTitle.value,
        description: formDescription.value,
        date: formDate.value.split('-'),
        color: formColor
    }
}

const generateTaskDOM = data => {
    const task = document.createElement("li");
    task.classList.add("task")
    switch (data.color) {
        case 1:
            task.classList.add("color-one")
            break;
        case 2:
            task.classList.add("color-two")
            break;
        case 3:
            task.classList.add("color-three")
            break;
        default:
            break;
    }
    task.innerHTML = `
    <div class="task__header">
        <h3 class="task__title">${data.title}</h3>
        <span class="task__delete" href="#">x</span>
    </div>
    <div class="task__body">
        <p class="task__description">
            ${data.description}
        </p>
        <p class="task__date">
            ${data.date[2]} / ${data.date[1]} / ${data.date[0]}
        </p>
        
    </div>`

    return(task)
}

const insertTaskDOM = taskData => {
    const task = generateTaskDOM(taskData)
    tasks.insertBefore(task, tasks.firstChild)
}

const setTaskLocalStorage = task => {
    const tasks = getTasksLocalStorage()
    tasks.unshift(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const getTasksLocalStorage = () => {
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    return tasks
}

const deleteTaskLocalStorage = id => {
    const tasksLocalStorage = getTasksLocalStorage()

    tasksLocalStorage.splice(id, 1)

    localStorage.setItem('tasks', JSON.stringify(tasksLocalStorage))
}

// EventListeners
const loadTaksDOM = () => {
    const tasksLocalStorage = getTasksLocalStorage();
    const fragment = document.createDocumentFragment()
    tasksLocalStorage.forEach(task => {
        fragment.appendChild(generateTaskDOM(task))
    });
    tasks.appendChild(fragment)

}

const deleteTask = e => {
    if(e.target.tagName == 'SPAN'){        
        const tasksArr = Array.from(tasks.children)
        const taskIndex = tasksArr.indexOf(e.target.parentElement.parentElement)
        deleteTaskLocalStorage(taskIndex)
        tasks.removeChild(e.target.parentElement.parentElement)
    }
}

const deleteTasks = () => {
    localStorage.clear('tasks')
    tasks.innerHTML = ''
}

const showRegisterModal = () => {
    modal.classList.add('register-area-modal--show')
}

const closeModal = e => {
    if (e.target.classList.contains('register-area-modal')) {
        modal.classList.remove('register-area-modal--show')
    }
}

const submitForm = e => {
    e.preventDefault()
    if(true){ // Comprovar que todo este correcto
        const taskData = getFormData()
        setTaskLocalStorage(taskData)
        insertTaskDOM(taskData)
    }
}

eventListeners()