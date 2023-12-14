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
    from;

    constructor(title, dueDate, category, id, status, from) {
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.id = id;
        this.status = status;
        this.assignedTo = []
        this.from = from;
    }

    

    /**
     * Methoden auf die propertys der Task Klasse.
     * @param {*} description 
     */
    setDescription(description) {
        this.description = description;
    }

    /**
     * Ändert den Status des Tasks Objects.
     * @param {String} status - <Open|Feedback|Done|Progress|Close> 
     */
    setStatus(status) {
        this.status = status;
    }

    /**
     * Setzt die Prio.
     * @param {String} prio <prio-urgent| prio-medium | prio-low> 
     */
    setPrio(prio) {
        this.prio = prio;
    }

    /**
     * Fügt ein Kontaktnamen in die Array hinzu.
     * @param {String} contactName 
     */
    addAsignedTo(contactName) {
        this.assignedTo.push(contactName);
    }

    /**
     * Entfernt ein Array Object mit dem index.
     * @param {Number} index 
     */
    removeAssignedTo(index) {
        this.assignedTo.splice(index, 1);
    }

    /**
     * Fügt ein Subtask in ein Array hinzu.
     * @param {String} subtask 
     */
    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    /**
     * Entfernt ein Array Objekt mit dem Index.
     * @param {Number} index 
     */
    removeSubtask(index) {
        this.subtasks.splice(index, 1)
    }

}