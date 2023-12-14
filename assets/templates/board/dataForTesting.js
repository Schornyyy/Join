let tasksForTesting= [
    {
        id: 0,
        title: 'eins',
        description: 'erste Aufgabe zum testen von Board',
        prio: 'urgent', //string oder number?
        category: 'testing Board', //Farbe für Kategorien muss wo gespeichert werden
        assignedTo: ['hermann@li.df', 'tom@slayer.com', 'friedrich@schiller.de', 'modulfee@da.de'], //eigene Klasse für Kontake bzw. User?
        subtasks: [],
        status: 'in progress' //brauchen wir zum Einordnen in eine section (bzw. spalte). Vielleicht statt finished?
    },
    {
        id: 1,
        title: 'zwo',
        description: 'zweite Aufgabe kommt in Spalte await feedback',
        prio: 'medium',
        category: 'another category', //
        assignedTo: ['hermann@li.df', 'modulfee@da.de'],
        subtasks: [],
        status: 'await feedback'
    },
    {
        id: 2,
        title: 'drei',
        description: 'lorem ipsum',
        prio: 'medium',
        category: 'third category',
        assignedTo: ['hermann@li.df'],
        subtasks: [],
        status: 'done'
    },
    {
        id: 3,
        title: 'vier',
        description: 'eine zweite Aufgabe für die Spalte in progress',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: ['hermann@li.df', 'Tom Araya'],
        subtasks: [],
        status: 'in progress'
    },
    {
        id: 4,
        title: 'fünf',
        description: 'Ich habe sogar Unteraufgaben ;)',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: ['hermann@li.df'],
        subtasks: [0, 1],
        status: 'done'
    },
    {
        id: 5,
        title: 'sechs',
        description: 'Die Spalte ToDo braucht auch eine Aufgabe.',
        prio: 'low',
        category: 'farbe',
        assignedTo: ['hermann@li.df'],
        subtasks: [],
        status: 'todo'
    },
    {
        id: 6,
        title: 'sieben',
        description: 'Zum Testen von der Progressbar mit drei Subtasks',
        prio: 'urgent',
        category: 'TuEs!',
        assignedTo: ['hermann@li.df'],
        subtasks: [2,3,4],
        status: 'todo'
    },
];

let subtasksForTesting= [
    {
        id: 0,
        title: 'erste Unteraufgabe',
        finished: false
    },
    {
        id: 1,
        title: 'zweite Unteraufgabe',
        finished: true
    },
    {
        id: 2,
        title: 'TuEs eins',
        finished: false
    },
    {
        id: 3,
        title: 'TuEs zwo',
        finished: true
    },
    {
        id: 4,
        title: 'TuEs drei',
        finished: true
    }
];

let contactsForTesting= [
    {
        name: 'Hermann Li',
        colorCode: '#230C33',
        email: 'hermann@li.df',
        phone: '123456'
    },
    {
        name: 'Tom Araya',
        colorCode: '#131515',
        email: 'tom@slayer.com',
        phone: '123456'
    },
    {
        name: 'Friedrich Schiller',
        colorCode: '#7DE2D1',
        email: 'friedrich@schiller.de',
        phone: '123456'
    },
    {
        name: 'Die Mudulfee',
        colorCode: '#BBA0B2',
        email: 'modulfee@da.de',
        phone: '123456'
    },

];