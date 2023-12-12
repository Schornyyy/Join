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
    status;

    constructor(title, dueDate, category, id, status) {
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.id = id;
        this.status = status;
    }

    /**
     * Methoden auf die propertys der Task Klasse.
     * @param {*} description 
     */
    setDescription(description) {
        this.description = description;
    }

    /**
     * 
     * @param {String} status - <Done|Feedback|Done|Progress> 
     */
    setStatus(status) {
        this.status = status;
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