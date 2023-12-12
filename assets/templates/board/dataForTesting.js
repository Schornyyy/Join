let tasks= [
    {
        title: 'eins',
        description: 'erste Aufgabe zum testen von Board',
        prio: 'urgent', //string oder number?
        category: 'testing Board', //Farbe für Kategorien muss wo gespeichert werden
        assignedTo: [], //eigene Klasse für Kontake bzw. User?
        subtasks: [],
        status: 'in progress' //brauchen wir zum Einordnen in eine section (bzw. spalte)
    },
    {
        title: 'zwo',
        description: 'zweite Aufgabe kommt in Spalte await feedback',
        prio: 'medium',
        category: 'another category', //
        assignedTo: [],
        subtasks: [],
        status: 'await feedback'
    },
    {
        title: 'drei',
        description: 'lorem ipsum',
        prio: 'medium',
        category: 'third category',
        assignedTo: [],
        subtasks: [],
        status: 'done'
    }
];