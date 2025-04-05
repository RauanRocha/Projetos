// Settings
    const settings = [
        // Categories
    [
        {
            name: "Any",
            id:0
        }
        ,{
            name: "General",
            id: 9,
        },{
            name: "Books",
            id: 10,
        },{
            name: "Films",
            id: 11,
        },{
            name: "Music",
            id: 12,
        },{
            name: "Theatres",
            id: 13,
        },{
            name: "Television",
            id: 14,
        },{
            name: "Games",
            id: 15,
        },{
            name: "BoardGames",
            id: 16,
        },{
            name: "Nature",
            id: 17,
        },{
            name: "Computers",
            id: 18,
        },{
            name: "Mathematics",
            id: 19,
        },{
            name: "Mythology",
            id: 20,
        },{
            name: "Sports",
            id: 21,
        },{
            name: "Geography",
            id: 22,
        },{
            name: "History",
            id: 23,
        },{
            name: "Politics",
            id: 24,
        },{
            name: "Art",
            id: 25,
        },{
            name: "Celebrities",
            id: 26,
        },{
            name: "Animals",
            id: 27,
        },{
            name: "Vehicles",
            id: 28,
        },{
            name: "Comics",
            id: 29,
        },{
            name: "Gadgets",
            id: 30,
        },{
            name: "Anime",
            id: 31,
        },{
            name: "Animations",
            id: 32,
        },
    ],
    // Difficulty 
    [
        {
            name: "Random",
            id: 0
        },{
            name: "Easy",
            id: 'easy'
        },
        {
            name: "Medium",
            id: 'medium'
        },
        {
            name: "Hard",
            id: 'hard'
        }
    ],
    // Time
    [
        {
            name: "unlimited",
            id: 0
        },{
            name: "10s",
            id: 10
        },
        {
            name: "15s",
            id: 15
        },
        {
            name: "30s",
            id: 30
        },
        {
            name: "60s",
            id: 60
        }
    ]
]

/*
let historyQuizzes = [
    {
        questions: [{
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: 'What company created and developed the game "Overwatch"?',
            correct_answer: "Blizzard Entertainment",
            chosen_answer: "Blizzard Entertainment",
            response: "correct",
            all_answers: ["Valve", "Hi-Rez Studios", "Gearbox Software", "Blizzard Entertainment"]
          },
          {
            category: "Entertainment: Music",
            difficulty: "easy",
            question: 'The music video to The Buggle\'s "Video Killed the Radio Star" was the first music video to broadcast on MTV.',
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science: Mathematics",
            difficulty: "easy",
            question: "The sum of any two odd integers is odd.",
            correct_answer: "False",
            chosen_answer: "False",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "Psychology is the science of behavior and mind.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
            correct_answer: "Sputnik 1",
            chosen_answer: "Explorer 1",
            response: "correct",
            all_answers: ["Sputnik 1", "Explorer 1", "Luna 2", "Vostok 1"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: "What's the second book in George R. R. Martin's 'A Song of Ice and Fire' series?",
            correct_answer: "A Clash of Kings",
            chosen_answer: "A Clash of Kings",
            response: "correct",
            all_answers: ["A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "A Feast for Crows"]
          },
          {
            category: "Sports",
            difficulty: "easy",
            question: "Which country hosted the 2022 FIFA World Cup?",
            correct_answer: "Qatar",
            chosen_answer: "Qatar",
            response: "correct",
            all_answers: ["Qatar", "Russia", "Brazil", "Germany"]
          },
          {
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: "When was the game 'Portal 2' released?",
            correct_answer: "2011",
            chosen_answer: "2011",
            response: "correct",
            all_answers: ["2007", "2011", "2015", "2004"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: 'Who was the author of the 1954 novel, "Lord of the Flies"?',
            correct_answer: "William Golding",
            chosen_answer: "William Golding",
            response: "correct",
            all_answers: ["William Golding", "J. D. Salinger", "George Orwell", "F. Scott Fitzgerald"]
          },
          {
            category: "Animals",
            difficulty: "easy",
            question: "The internet browser Firefox is named after the Red Panda.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          }
        ],

        setting: [
            {
                id: 0,
                name: "Mathematics"
            },
            {
                id: "hard",
                name: "Hard" 
            },
            {
                id: 0,
                name: "Unlimited"
            }
        ]
    },
    
    {
        questions: [{
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: 'What company created and developed the game "Overwatch"?',
            correct_answer: "Blizzard Entertainment",
            chosen_answer: "Blizzard Entertainment",
            response: "correct",
            all_answers: ["Valve", "Hi-Rez Studios", "Gearbox Software", "Blizzard Entertainment"]
          },
          {
            category: "Entertainment: Music",
            difficulty: "easy",
            question: 'The music video to The Buggle\'s "Video Killed the Radio Star" was the first music video to broadcast on MTV.',
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science: Mathematics",
            difficulty: "easy",
            question: "The sum of any two odd integers is odd.",
            correct_answer: "False",
            chosen_answer: "False",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "Psychology is the science of behavior and mind.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
            correct_answer: "Sputnik 1",
            chosen_answer: "Sputnik 1",
            response: "correct",
            all_answers: ["Sputnik 1", "Explorer 1", "Luna 2", "Vostok 1"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: "What's the second book in George R. R. Martin's 'A Song of Ice and Fire' series?",
            correct_answer: "A Clash of Kings",
            chosen_answer: "A Clash of Kings",
            response: "correct",
            all_answers: ["A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "A Feast for Crows"]
          },
          {
            category: "Sports",
            difficulty: "easy",
            question: "Which country hosted the 2022 FIFA World Cup?",
            correct_answer: "Qatar",
            chosen_answer: "Qatar",
            response: "correct",
            all_answers: ["Qatar", "Russia", "Brazil", "Germany"]
          },
          {
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: "When was the game 'Portal 2' released?",
            correct_answer: "2011",
            chosen_answer: "2011",
            response: "correct",
            all_answers: ["2007", "2011", "2015", "2004"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: 'Who was the author of the 1954 novel, "Lord of the Flies"?',
            correct_answer: "William Golding",
            chosen_answer: "William Golding",
            response: "correct",
            all_answers: ["William Golding", "J. D. Salinger", "George Orwell", "F. Scott Fitzgerald"]
          },
          {
            category: "Animals",
            difficulty: "easy",
            question: "The internet browser Firefox is named after the Red Panda.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          }
        ],

        setting: [
            {
                id: 0,
                name: "Any"
            },
            {
                id: "medium",
                name: "Medium" 
            },
            {
                id: 10,
                name: "10s"
            }
        ]
    },

    {
        questions: [{
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: 'What company created and developed the game "Overwatch"?',
            correct_answer: "Blizzard Entertainment",
            chosen_answer: "Blizzard Entertainment",
            response: "correct",
            all_answers: ["Valve", "Hi-Rez Studios", "Gearbox Software", "Blizzard Entertainment"]
          },
          {
            category: "Entertainment: Music",
            difficulty: "easy",
            question: 'The music video to The Buggle\'s "Video Killed the Radio Star" was the first music video to broadcast on MTV.',
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science: Mathematics",
            difficulty: "easy",
            question: "The sum of any two odd integers is odd.",
            correct_answer: "False",
            chosen_answer: "False",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "Psychology is the science of behavior and mind.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          },
          {
            category: "Science & Nature",
            difficulty: "easy",
            question: "What was the name of the first artificial Earth satellite, launched by the Soviet Union in 1957?",
            correct_answer: "Sputnik 1",
            chosen_answer: "Sputnik 1",
            response: "correct",
            all_answers: ["Sputnik 1", "Explorer 1", "Luna 2", "Vostok 1"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: "What's the second book in George R. R. Martin's 'A Song of Ice and Fire' series?",
            correct_answer: "A Clash of Kings",
            chosen_answer: "A Clash of Kings",
            response: "correct",
            all_answers: ["A Game of Thrones", "A Clash of Kings", "A Storm of Swords", "A Feast for Crows"]
          },
          {
            category: "Sports",
            difficulty: "easy",
            question: "Which country hosted the 2022 FIFA World Cup?",
            correct_answer: "Qatar",
            chosen_answer: "Qatar",
            response: "correct",
            all_answers: ["Qatar", "Russia", "Brazil", "Germany"]
          },
          {
            category: "Entertainment: Video Games",
            difficulty: "easy",
            question: "When was the game 'Portal 2' released?",
            correct_answer: "2011",
            chosen_answer: "2011",
            response: "correct",
            all_answers: ["2007", "2011", "2015", "2004"]
          },
          {
            category: "Entertainment: Books",
            difficulty: "easy",
            question: 'Who was the author of the 1954 novel, "Lord of the Flies"?',
            correct_answer: "William Golding",
            chosen_answer: "William Golding",
            response: "correct",
            all_answers: ["William Golding", "J. D. Salinger", "George Orwell", "F. Scott Fitzgerald"]
          },
          {
            category: "Animals",
            difficulty: "easy",
            question: "The internet browser Firefox is named after the Red Panda.",
            correct_answer: "True",
            chosen_answer: "True",
            response: "correct",
            all_answers: ["True", "False"]
          }
        ],

        setting: [
            {
                id: 0,
                name: "History"
            },
            {
                id: "easy",
                name: "Easy" 
            },
            {
                id: 20,
                name: "20s"
            }
        ]
    }  
]*/

    