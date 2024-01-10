class Task {
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
    this.assignedTo = [];
    this.from = from;
  }

  /**
   * Methods on the properties of the task class.
   * @param {*} description
   */
  setDescription(description) {
    this.description = description;
  }

  /**
   * Changes the status of the Task Objects.
   * @param {String} status - <Open|Feedback|Done|Progress|Close>
   */
  setStatus(status) {
    this.status = status;
  }

  /**
   * SSets the priority.
   * @param {String} prio <prio-urgent| prio-medium | prio-low>
   */
  setPrio(prio) {
    this.prio = prio;
  }

  /**
   * Adds a contact name to the array.
   * @param {String} contactName
   */
  addAsignedTo(contactName) {
    this.assignedTo.push(contactName);
  }

  /**
   * Removes an Array Object with the index.
   * @param {Number} index
   */
  removeAssignedTo(index) {
    this.assignedTo.splice(index, 1);
  }

  /**
   * Adds a subtask to an array.
   * @param {String} subtask
   */
  addSubtask(subtask) {
    this.subtasks.push(subtask);
  }

  /**
   * Removes an array object with the index.
   * @param {Number} index
   */
  removeSubtask(index) {
    this.subtasks.splice(index, 1);
  }
}
