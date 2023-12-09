/**
 * Kurze erläuterung
 */
class Task{

    title;
    description;
    prio;
    dueDate;
    category;
    assignedTo;
    subtasks = [];
    id;

    constructor(title, dueDate, category, id) {
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.id = id;
    }

    /**
     * Methoden auf die propertys der Task Klasse.
     * @param {*} description 
     */
    setDescription(description) {
        this.description = description;
    }

    setPrio(prio) {
        this.prio = prio;
    }

    setAsignedTo(contactName) {
        this.assignedTo = contactName;
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    removeSubtask(index) {
        this.subtasks.splice(index, 1)
    }

    async saveTask() {
        let tasks = await getItem("tasks");
        tasks.push(this);
        setItem("tasks", tasks);
    }
    

}