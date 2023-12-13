let tasksForTesting= [
    {
        id: 0,
        title: 'eins',
        description: 'erste Aufgabe zum testen von Board',
        prio: 'urgent', //string oder number?
        category: 'testing Board', //Farbe für Kategorien muss wo gespeichert werden
        assignedTo: [], //eigene Klasse für Kontake bzw. User?
        subtasks: [],
        status: 'in progress' //brauchen wir zum Einordnen in eine section (bzw. spalte). Vielleicht statt finished?
    },
    {
        id: 1,
        title: 'zwo',
        description: 'zweite Aufgabe kommt in Spalte await feedback',
        prio: 'medium',
        category: 'another category', //
        assignedTo: [],
        subtasks: [],
        status: 'await feedback'
    },
    {
        id: 2,
        title: 'drei',
        description: 'lorem ipsum',
        prio: 'medium',
        category: 'third category',
        assignedTo: [],
        subtasks: [],
        status: 'done'
    },
    {
        id: 3,
        title: 'vier',
        description: 'eine zweite Aufgabe für die Spalte in progress',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: [],
        subtasks: [],
        status: 'in progress'
    },
    {
        id: 4,
        title: 'fünf',
        description: 'Ich habe sogar Unteraufgaben ;)',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: [],
        subtasks: [0, 1],
        status: 'done'
    },
    {
        id: 5,
        title: 'sechs',
        description: 'Die Spalte ToDo braucht auch eine Aufgabe.',
        prio: 'low',
        category: 'farbe',
        assignedTo: [],
        subtasks: [],
        status: 'todo'
    },
];

let subtasks= [
    {
        id: 0,
        title: 'erste Unteraufgabe',
        finished: false
    },
    {
        id: 1,
        title: 'zweite Unteraufgabe',
        finished: true
    }
];