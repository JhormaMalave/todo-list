const tasks = document.getElementById('tasks')
const form = document.getElementById('form')
const formTitle = document.getElementById('form-title')
const formDescription = document.getElementById('form-description')
const formDate = document.getElementById('form-date')
const formColors = document.getElementById('form-colors')
const formValueValid = {
    title: true,
    description: true,
    date: true,
    coler: true
}

const eventListeners = () => {


tasks.addEventListener("click", e => {
    if(e.target.tagName == 'SPAN'){
        console.log(e.target.parentElement.parentElement)
        
        const tasksArr = Array.from(tasks.children)
        const taskIndex = tasksArr.indexOf(e.target.parentElement.parentElement)
        deleteTaskLocalStorage(taskIndex)
        tasks.removeChild(e.target.parentElement.parentElement)
        
        console.log(taskIndex)

    }
})

form.addEventListener('submit', e => {
    e.preventDefault()
    if(validateForm()){
        const taskData = getFormData()
        setTaskLocalStorage(taskData)
        insertTaskDOM(taskData)
    }
})

addEventListener('DOMContentLoaded', loadTaksDOM)

}

const validateForm = () => {
    const formValues = Object.values(formValueValid)
    const valid = formValues.findIndex(value => value == false)
    if(valid == -1) return 1
    else return 0
}

const getFormData = () => {
    return {
        title: formTitle.value,
        description: formDescription.value,
        color: 2
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
        <p class="task__date">
            20 / 01 / 1999
        </p>
        <p class="task__description">
            ${data.description}
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

const loadTaksDOM = () => {
    const tasksLocalStorage = getTasksLocalStorage();
    const fragment = document.createDocumentFragment()
    tasksLocalStorage.forEach(task => {
        fragment.appendChild(generateTaskDOM(task))
    });
    tasks.appendChild(fragment)

}

eventListeners()