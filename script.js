const taskList = []

function addTask(a, d){
    const date = new Date().toLocaleDateString()
    const taskId = crypto.randomUUID()
    taskList.push({title: a, description: d, date: date, id: taskId, completed: false})
    
    document.querySelector('#titleInput').value = ''
    document.querySelector('#descriptionInput').value = ''
    {}
    renderTasks()
}

function createTask(title, description, date, id, completed){
    const task = document.createElement('div')
    task.classList.add('task')
    task.dataset.id = id
    task.innerHTML = `
        <input class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
        <h1 class="title">${title}</h1>
        <p class="description">${description}</p>
        <span class="date">${date}</span>
        <button class="delete">🗑</button>`
    return task
}

function renderTasks(){
    const taskContainer = document.querySelector('#taskContainer')
    taskContainer.innerHTML = ''
    
    taskList.forEach(task => {
        taskContainer.appendChild(createTask(task.title, task.description, task.date, task.id, task.completed))
    })
    updateCounters()
}

function updateCounters(){
    const completed = taskList.filter(t => t.completed).length
    const total = taskList.length

    document.querySelector('#completedCount').textContent = completed
    document.querySelector('#earringsCount').textContent = total - completed
}

document.querySelector('body').addEventListener('click', (event) => {
    const target = event.target
    const addContainerSection = document.querySelector('#addContainerSection')

    if(target.matches('#openAddContainer')){
        addContainerSection.style.display = 'flex'
    }else if(target.matches('#closeContainerSection')){
        addContainerSection.style.display = 'none'
    }
    
    const titleText = document.querySelector('#titleInput').value
    const descriptionText = document.querySelector('#descriptionInput').value
    
    if(target.matches('#addTaskButton')){
        if (titleText.trim() && descriptionText.trim()) {
            addTask(titleText, descriptionText)
            addContainerSection.style.display = 'none'
        }        
    }

    if(target.matches('.delete')){
        const taskId = target.closest('.task').dataset.id
        const index = taskList.findIndex(task => task.id === taskId)

        taskList.splice(index, 1)
        renderTasks()
    }

    if(target.matches('.checkbox')){
        const taskId = target.closest('.task').dataset.id
        const task = taskList.find(t => t.id === taskId)

        task.completed = target.checked
        updateCounters()
    }
})
// console.log(taskId)