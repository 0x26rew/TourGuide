const StateMachine = require('javascript-state-machine');

let fsm = new StateMachine({
  init: 'initial',
  transitions: [

  ],
  methods: {

  }
});

/*****************************************************************************/
/* Required files */
const fs = require('fs');

let questions = JSON.parse(fs.readFileSync("Questions/questions.json"));

let puzzleMsg = JSON.parse(fs.readFileSync("FlexMsgs/PuzzleMsg.json"));

let startMsg = JSON.parse(fs.readFileSync("FlexMsgs/StartMsg.json"));

let passMsg = JSON.parse(fs.readFileSync("FlexMsgs/PassMsg.json"));

let failMsg = JSON.parse(fs.readFileSync("FlexMsgs/FailMsg.json"));
/*****************************************************************************/
let questionNumber; /* The place of a question in array 'questions.contents' */
let userNum;        /* The place of a question in array 'userLog.users'      */

let maxWrong = 10;  /* User can not made more than 10 wrong guesses or he/she 
                       lose the game */
let maxRight = 10;  /* User must answer 10 puzzles correctly to win the game */
let maxHint = 6;    /* User can be hinted for 6 times in a game */
let maxChange = 5;  /* User can change his/her puzzle at most 5 times in 
                       one game */

let userWrong;      /* <= maxWrong */
let userRight;      /* <= maxRight */
let hintUsed;       /* <= maxHint */
let changeUsed;     /* <= maxChange */

let history = [];   /* The question that the user has seen */
/*****************************************************************************/
let linebot = require('linebot');


/*
let bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});
*/
/*****************************************************************************/
bot.on('message', async function (event) {
  /* Handle message events */
  try {
    if (event.message.text == undefined) {
      event.reply('傳這什麼東西');
    } else {
      let userLog = JSON.parse(fs.readFileSync("Users/users.json"));
      await getUser(event, userLog);

      console.log('user ' + event.source.userId);
      console.log('message is '+ event.message.text);

      if (questionNumber >= 0)
        console.log('answer is ' + questions.contents[questionNumber].answer);

      if (fsm.is('initial')) {
        event.reply(startMsg);
      } else if (fsm.is('end-of-game')) {
        event.reply('本次遊戲已經結束');
      } else {
        checkAnswer(event);
      }

      await saveUserLog(event, userLog);
      fs.writeFileSync('Users/users.json', JSON.stringify(userLog, null, ' '),
                        'utf8');
      
      console.log('state is ' + fsm.state);
    }
  } catch (e) {
    console.log(e);
  }
});
/*****************************************************************************/
bot.on('postback', async function (event) {
  /* Handle postback event */
  try {
    let userLog= JSON.parse(fs.readFileSync("Users/users.json"));
    await getUser(event, userLog);
    
    if (fsm.is('initial')) {
      gameInit(event);
    } else if (fsm.is('end-of-game')) {
      leaveorAgain(event);
    } else {
      giveAssist(event);
    }
    await saveUserLog(event, userLog);
    fs.writeFileSync('Users/users.json', 
      JSON.stringify(userLog, null, ' '), 'utf8');
    console.log('user ' + event.source.userId);
    console.log('postback is ' + event.postback.data);
    console.log('state is ' + fsm.state);
  } catch (e) {
    console.log(e);
  }

});
/*****************************************************************************/
bot.listen('/', process.env.PORT || 5000, function () {
  console.log('Listening');
});