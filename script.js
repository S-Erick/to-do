const taskList = []

function addTask(a, d){
    const date = new Date().toLocaleDateString()
    taskList.push({title: a, description: d, date: date})
    
    document.querySelector('#titleInput').value = ''
    document.querySelector('#descriptionInput').value = ''
    
    renderTasks()
}

function createTask(title, description, date){
    const task = document.createElement('div')
    task.classList.add('task')
    task.innerHTML = `
    <input class="checkbox" type="checkbox">
    <h1 class="title">${title}</h1>
    <p class="description">${description}</p>
    <span class="date">${date}</span>
    <button class="delete">🗑</button>`
    return task
}

function renderTasks(){
    const taskContainer = document.querySelector('#task-container')
    taskContainer.innerHTML = ''
    
    taskList.forEach(task => {
        taskContainer.appendChild(createTask(task.title, task.description, task.date))
    })
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
})
// console.log(titleText)