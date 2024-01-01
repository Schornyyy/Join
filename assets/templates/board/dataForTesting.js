let tasksForTesting= [
    {
        id: 0,
        title: 'eins',
        description: 'erste Aufgabe zum testen von Board',
        prio: 'prio-urgent', //string oder number?
        dueDate: 1704031200000,
        category: 'testing Board', //Farbe für Kategorien muss wo gespeichert werden
        assignedTo: ['hermann@li.df', 'tom@slayer.com', 'friedrich@schiller.de', 'modulfee@da.de'], //eigene Klasse für Kontake bzw. User?
        subtasks: [],
        status: 'in progress' //brauchen wir zum Einordnen in eine section (bzw. spalte). Vielleicht statt finished?
    },
    {
        id: 1,
        title: 'zwo',
        description: 'zweite Aufgabe kommt in Spalte await feedback',
        prio: 'prio-medium',
        dueDate: 1704031200000,
        category: 'another category', //
        assignedTo: ['hermann@li.df', 'modulfee@da.de'],
        subtasks: [],
        status: 'await feedback'
    },
    {
        id: 2,
        title: 'drei',
        description: 'lorem ipsum',
        prio: 'prio-medium',
        dueDate: 1704031200000,
        category: 'third category',
        assignedTo: ['hermann@li.df'],
        subtasks: [],
        status: 'done'
    },
    {
        id: 3,
        title: 'vier',
        description: 'eine zweite Aufgabe für die Spalte in progress',
        prio: 'prio-low',
        dueDate: 1704031200000,
        category: 'irgendwas',
        assignedTo: ['hermann@li.df', 'tom@slayer.com'],
        subtasks: [],
        status: 'in progress'
    },
    {
        id: 4,
        title: 'fünf',
        description: 'Ich habe sogar Unteraufgaben ;)',
        prio: 'prio-low',
        dueDate: 1704031200000,
        category: 'irgendwas',
        assignedTo: ['hermann@li.df'],
        // subtasks: [0, 1],
        subtasks: [
            {
                title: 'erste Unteraufgabe',
                finished: false
            },
            {
                title: 'zweite Unteraufgabe',
                finished: true
            },
        ],
        status: 'done'
    },
    {
        id: 5,
        title: 'sechs',
        description: 'Die Spalte ToDo braucht auch eine Aufgabe.',
        prio: 'prio-low',
        dueDate: 1704031200000,
        category: 'farbe',
        assignedTo: ['hermann@li.df'],
        subtasks: [],
        status: 'Open'
    },
    {
        id: 6,
        title: 'sieben',
        description: 'Zum Testen von der Progressbar mit drei Subtasks',
        prio: 'prio-urgent',
        dueDate: 1704031200000,
        category: 'TuEs!',
        assignedTo: ['hermann@li.df'],
        // subtasks: [2,3,4],
        subtasks: [
            {
                title: 'TuEs eins',
                finished: false
            },
            {
                title: 'TuEs zwo',
                finished: true
            },
            {
                title: 'TuEs drei',
                finished: true
            }
        ],
        status: 'Open'
    },
    {
        id: 7,
        title: 'acht',
        description: 'Da steht sehr viel :O Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        prio: 'prio-medium',
        dueDate: 1704031200000,
        category: 'TuEs!',
        assignedTo: ['friedrich@schiller.de'],
        subtasks: [],
        status: 'Open'
    },
];

/*
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
*/

let contactsForTesting= [
    {
        name: 'Hermann Li',
        colorCode: '#230C33',
        email: 'hermann@li.df',
        phone: '123456'
    },
    {
        name: 'Tom Araya',
        // colorCode: '#131515',
        colorCode: '#982649',
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