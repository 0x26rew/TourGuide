const StateMachine = require('javascript-state-machine');

let fsm = new StateMachine({
  init: 'initial',
  transitions: [
    { name: 'toJealous',    from: 'initial', to: 'j1' },
    { name: 'toAttraction', from: 'initial', to: 'a1' }, 
    { name: 'toErotic',     from: 'initial', to: 'e1' }, 

    { name: 'next',     from: 'j1',     to: 'j2' },
    { name: 'next',     from: 'j2',     to: 'j3' },
    { name: 'next',     from: 'j3',     to: 'j4' },
    { name: 'next',     from: 'j4',     to: 'j5' },
    { name: 'next',     from: 'j5',     to: 'j6' },
    { name: 'next',     from: 'j6',     to: 'j7' },
    { name: 'next',     from: 'j7',     to: 'j8' },
    { name: 'next',     from: 'j8',     to: 'j9' },
    { name: 'next',     from: 'j9',     to: 'j10' },
    { name: 'next',     from: 'j10',    to: 'j11' },

    { name: 'next',     from: 'e1',     to: 'e2' },
    { name: 'next',     from: 'e2',     to: 'e3' },
    { name: 'next',     from: 'e3',     to: 'e4' },
    { name: 'next',     from: 'e4',     to: 'e5' },
    { name: 'next',     from: 'e5',     to: 'e6' },
    { name: 'next',     from: 'e6',     to: 'e7' },
    { name: 'next',     from: 'e7',     to: 'e8' },
    { name: 'next',     from: 'e8',     to: 'e9' },
    { name: 'next',     from: 'e9',     to: 'e10' },
    { name: 'next',     from: 'e10',    to: 'e11' },
    { name: 'next',     from: 'e11',    to: 'e12' },
    { name: 'next',     from: 'e12',    to: 'e13' },
    { name: 'next',     from: 'e13',    to: 'e14' },
    { name: 'next',     from: 'e14',    to: 'e15' },

    { name: 'next',     from: 'a1',     to: 'a2' },
    { name: 'next',     from: 'a2',     to: 'a3' },
    { name: 'next',     from: 'a3',     to: 'a4' },
    { name: 'next',     from: 'a4',     to: 'a5' },
    { name: 'next',     from: 'a5',     to: 'a6' },
    { name: 'next',     from: 'a6',     to: 'a7' },
    { name: 'next',     from: 'a7',     to: 'a8' },
    { name: 'next',     from: 'a8',     to: 'a9' },
    { name: 'next',     from: 'a9',     to: 'a10' },
    { name: 'next',     from: 'a10',    to: 'a11' },
    { name: 'next',     from: 'a11',    to: 'a12' },
    { name: 'next',     from: 'a12',    to: 'a13' },
    { name: 'next',     from: 'a13',    to: 'a14' },
    { name: 'next',     from: 'a14',    to: 'a15' },
    { name: 'next',     from: 'a15',    to: 'a16' },
    { name: 'next',     from: 'a16',    to: 'a17' },
    { name: 'next',     from: 'a17',    to: 'a18' },
    { name: 'next',     from: 'a18',    to: 'a19' },
    { name: 'next',     from: 'a19',    to: 'a20' },

    { name: 'back',     from: 'j11',   to: 'initial' },
    { name: 'back',     from: 'e15',   to: 'initial' },
    { name: 'back',     from: 'a20',   to: 'initial' },

    { name: 'goto',      from: '*', to: function(s) { return s } }
  ],
  methods: {
    onNext:         function() { console.log('next') },
    onBack:         function() { console.log('back') },
    onToJealous:    function() { console.log('start jealous') },
    onToAttraction: function() { console.log('start attraction') },
    onToErotic:     function() { console.log('start erotic') },
    onGoto:         function() { console.log('go to') }
  }
});

/*****************************************************************************/
/* Required files */
const fs = require('fs');

let q11 = JSON.parse(fs.readFileSync("Flex/Q1-1.json"));

let q12 = JSON.parse(fs.readFileSync("Flex/Q1-2.json"));

let q13 = JSON.parse(fs.readFileSync("Flex/Q1-3.json"));

let q14 = JSON.parse(fs.readFileSync("Flex/Q1-4.json"));

let q15 = JSON.parse(fs.readFileSync("Flex/Q1-5.json"));

let q21 = JSON.parse(fs.readFileSync("Flex/Q2-1.json"));

let q22 = JSON.parse(fs.readFileSync("Flex/Q2-2.json"));

let q23 = JSON.parse(fs.readFileSync("Flex/Q2-3.json"));

let q24 = JSON.parse(fs.readFileSync("Flex/Q2-4.json"));

let button = JSON.parse(fs.readFileSync("Flex/next.json"));

let menu = JSON.parse(fs.readFileSync("Flex/menu.json"));

let back = JSON.parse(fs.readFileSync("Flex/back.json"));

let jealous = JSON.parse(fs.readFileSync("Jealous/jealous.json"));

let attraction = JSON.parse(fs.readFileSync("Attraction/attraction.json"));

let erotic = JSON.parse(fs.readFileSync("Erotic/erotic.json"));
/*****************************************************************************/
let rankofGroup;

let history = [];   /* The chapter that the user has finished */

let image = {
  "type": 'image',
  "originalContentUrl": '',
  "previewImageUrl": ''
};
let audio = {
  "type": "audio",
  "originalContentUrl": "",
  "duration": 3000
};
let video;
let text;
let notice;
/*****************************************************************************/
async function getGroup(event, groupLog) {
  /* While receive a message or postback from a user, check if the userId is in 
     userLog or not. If the user is new, initializing the state and other 
     attributes, or load back the attribute of the user otherwise. */
  let destId = (event.source.groupId === undefined) ? 
                event.source.userId : event.source.groupId;
  for (let i = 0; i < groupLog.group.length; i++) {
    if (groupLog.group[i].id === destId) {
      fsm.goto(groupLog.group[i].state);
      history = groupLog.group[i].history;
      rankofGroup = i;
      return;
    }
  }
  console.log('new comer: ' + destId);
  fsm.goto('initial');
  history = [];
  rankofGroup = -1;
}
/*****************************************************************************/
async function saveGroupLog(event, groupLog) {
  /* Save the attrbutes and state of user in users.json */
  let destId = (event.source.groupId === undefined) ? 
                event.source.userId : event.source.groupId;
  if (rankofGroup == -1) {
    groupLog.group.push({
      id: destId,
      state: fsm.state,
      history: history
    })
  } else {
    groupLog.group[rankofGroup].state = fsm.state;
    groupLog.group[rankofGroup].history = history;
  }
}
/*****************************************************************************/
let linebot = require('linebot');

require('dotenv').config();

let bot = linebot({
  channelId: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});
/*****************************************************************************/
bot.on('message', async function (event) {
  /* Handle message events */
  try {
    if (event.message.text == undefined) {
      event.reply('快來救救我，別傳這些有的沒的...');
    } else {
      let groupLog = JSON.parse(fs.readFileSync("Groups/groups.json"));
      await getGroup(event, groupLog);
      console.log(event.message.text);
      let msg = '救救我...';

      let video;
      
      switch (fsm.state) {
        case 'initial':
          msg = menu;
          break
        /* Erotic */
        case 'e1':
          if (event.message.text == '開門') {
            fsm.next();
            video = erotic.videos[0].url;

            msg = [video, button];
          } else {
            msg = '請輸入「開門」！';
          }
          break;
        case 'e3':
          if (event.message.text == '可以色色') {
            fsm.next();
            image.originalContentUrl = erotic.images[1].url;
            image,previewImageUrl = erotic.images[1].url;
            text = erotic.texts[2].content;
            msg = [image, text, button];
          } else {
            msg = '請輸入「可以色色」！';
          }
          break; 
        case 'e5':
          fsm.next();
          video = erotic.videos[1].url;
          msg = [video, button];
          break; 
        /* Attraction */
        case 'a3':
          if (event.message.text == '心裡的話')  {
            fsm.next();
            msg = q24;
          } else {
            msg = '請輸入「心裡的話」！';
          }
          break;  
        case 'a8':
          if (event.message.text == '老師') {
            fsm.next();
            video = attraction.videos[3].url;
            msg = [video, button];
          } else {
            msg = '不是...';
          }
          break;
        case 'a15':
          if (event.message.text == '看看Dora') {
            fsm.next();
            video = attraction.videos[5].url;
            msg = [video, button];
          } else {
            msg = '請輸入「看看Dora」！';
          }
          break;
        case 'a19':
          if (event.message.text == '看文本') {
            fsm.next();
            image.originalContentUrl = attraction.images[3].url;
            image.previewImageUrl = attraction.images[3].url;
            text = attraction.texts[12].content;
            msg = [image, text, back];
          }
          break; 
        default:
          msg = '救救我...';
          break;
      } 
      event.reply(msg);

      await saveGroupLog(event, groupLog);
      fs.writeFileSync('Groups/groups.json', JSON.stringify(groupLog, null, ' '),
                        'utf8');      

      console.log('message is ' + event.message.text);
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

    let groupLog = JSON.parse(fs.readFileSync("Groups/groups.json"));
    await getGroup(event, groupLog);
    let msg = "救救我...";

    switch (fsm.state) {
      case 'initial':
        switch (event.postback.data) {
          case 'start jealous':
            if (history.includes('jealous')) {
              msg = '這一章已經完成了喔！';
            } else {
              fsm.toJealous();
              image.originalContentUrl = jealous.images[0].url;
              image.previewImageUrl = jealous.images[0].url;
              notice = '進入章節：嫉妒';
              msg = [notice, image, button];
            }
            break;
          case 'start erotic':
            if (history.includes('erotic')) {
              msg = '這一章已經完成了喔！';
            } else {
              fsm.toErotic();
              text = erotic.texts[0].content;
              notice = '進入章節：情色';
              msg = [notice, text];
            }
            break;
          case 'start attraction':
            if (history.includes('attraction')) {
              msg = '這一章已經完成了喔！';
            } else {
              fsm.toAttraction();
              image.originalContentUrl = attraction.images[0].url;
              image.previewImageUrl = attraction.images[0].url;
              text = attraction.texts[0].content;
              notice = '進入章節：吸引目光';
              msg = [notice, image, text, button];
            }
            break;
        }
        break;
      /* Jealous */
      case 'j1':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q11;
        }
        break;
      case 'j2':
          if (event.postback.data == '1-1A' || event.postback.data == '1-1B' || 
              event.postback.data == '1-1C') {
            fsm.next();
            image.originalContentUrl = jealous.images[1].url;
            image.previewImageUrl = jealous.images[1].url;
            msg = [image, button];
          }
          break;
      case 'j3':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q22;
        }
        break;  
      case 'j4':
        if (event.postback.data == '2-2A' || event.postback.data == '2-2B' || 
            event.postback.data == '2-2C') {
          fsm.next();
          image.originalContentUrl = jealous.images[2].url;
          image.previewImageUrl = jealous.images[2].url;
          msg = [image, button];
        }
        break;
      case 'j5':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q12;
        }
        break;
      case 'j6':
        if (event.postback.data == '1-2A' || event.postback.data == '1-2B' || 
            event.postback.data == '1-2C') {
          fsm.next();
          image.originalContentUrl = jealous.images[3].url;
          image.previewImageUrl = jealous.images[3].url;
          msg = [image, button];
        }
        break;    
      case 'j7':
        if (event.postback.data == 'next') {
          fsm.next();
          image.originalContentUrl = jealous.images[4].url;
          image.previewImageUrl = jealous.images[4].url;
          msg = [image, button];
        }
        break;
      case 'j8':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q22;
        }
        break;
      case 'j9':
        if (event.postback.data == '2-2A' || event.postback.data == '2-2B' || 
            event.postback.data == '2-2C') {
          fsm.next();
          image.originalContentUrl = jealous.images[5].url;
          image.previewImageUrl = jealous.images[5].url;
          msg = [image, button];
        }
        break;
      case 'j10':
        if (event.postback.data == 'next') {
          fsm.next();
          text = jealous.texts[0].content;
          msg = [text, back];
        }
        break;
      case 'j11':
        if (event.postback.data == 'back') {
          fsm.back();
          history.push('jealous');
          msg = menu;
        }
        break;
      /* Erotic */
      case 'e2': 
        if (event.postback.data == 'next') {
          fsm.next();
          image.originalContentUrl = erotic.images[0].url;
          image.previewImageUrl = erotic.images[0].url;
          text = erotic.texts[1].content;
          msg = [image, text];
        }
        break;
      case 'e4':
        if (event.postback.data == 'next') {
          fsm.next();
          audio.originalContentUrl = erotic.audios[0].url;
          audio.duration = erotic.audios[0].duration;
          text = erotic.texts[3].content;
          msg = [audio, text];
        }
        break;  
      case 'e6':
        if (event.postback.data == 'next') {
          fsm.next();
          text = erotic.texts[4].content;
          msg = [text, button];
        }
        break;
      case 'e7':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q13;
        }
        break;    
      case 'e8':
        if (event.postback.data == '1-3A' || event.postback.data == '1-3B' || 
            event.postback.data == '1-3C') {
          fsm.next();
          image.originalContentUrl = erotic.images[2].url;
          image.previewImageUrl = erotic.images[2].url;
          switch (event.postback.data) {
            case '1-3A':
              audio.originalContentUrl = erotic.audios[1].url;
              audio.duration = erotic.audios[1].duration;
              break;
            case '1-3B':
              audio.originalContentUrl = erotic.audios[2].url;
              audio.duration = erotic.audios[2].duration;
              break;
            case '1-3C':
              audio.originalContentUrl = erotic.audios[3].url;
              audio.duration = erotic.audios[3].duration;
              break;                            
          }
          msg = [image, audio, button];
        }
        break;
      case 'e9':
        if (event.postback.data == 'next') {
          fsm.next();
          text = erotic.texts[5].content;
          msg = [text, button];
        }
        break;
      case 'e10':
        if (event.postback.data == 'next') {
          fsm.next();
          audio.originalContentUrl = erotic.audios[4].url;
          audio.duration = erotic.audios[2].duration;
          msg = [audio, button];
        }
        break;
      case 'e11':
        if (event.postback.data == 'next') {
          fsm.next();
          text = erotic.texts[6].content;
          msg = [text, button];
        }
        break;
      case 'e12':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q23;
        }
        break;
      case 'e13':
        if (event.postback.data == '2-3A' || event.postback.data == '2-3B' || 
            event.postback.data == '2-3C') {
          fsm.next();
          video = erotic.videos[3].url;
          msg = [video, button];
        }
        break;
      case 'e14':
        if (event.postback.data == 'next') {
          fsm.next();
          text = erotic.texts[7].content;
          msg = [text, back];
        }
        break;
      case 'e15':
        if (event.postback.data == 'back') {
          fsm.back();
          history.push('erotic');
          msg = menu;
        }
        break; 
      /* Attraction */
      case 'a1':
        if (event.postback.data == 'next') {
          fsm.next();
          video = attraction.videos[0].url;
          msg = [video, button];
        }
        break;
      case 'a2':
        if(event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[1].content;
          msg = text;
        }
        break;
      case 'a4':
        if (event.postback.data == '2-4A' || event.postback.data == '2-4B' || 
        event.postback.data == '2-4C') {
          fsm.next();
          video = attraction.videos[1].url;
          msg = [video, button];
        }
        break;
      case 'a5':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[2].content;
          msg = [text, button];
        }
        break;
      case 'a6':
        if (event.postback.data) {
          fsm.next();
          video = attraction.videos[2].url;
          msg = [video, button];
        }
        break;    
      case 'a7':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[3].content;
          msg = text;
        }
        break;
      case 'a9':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[4].content;
          msg = [text, button];
        }
        break;
      case 'a10':
        if (event.postback.data == 'next') {
          fsm.next();
          image.originalContentUrl = attraction.images[1].url;
          image.previewImageUrl = attraction.images[1].url;
          msg = [image, q14];
        }
        break;
      case 'a11':
        if (event.postback.data == '1-4A' || event.postback.data == '1-4B' || 
        event.postback.data == '1-4C') {
          fsm.next();
          switch (event.postback.data) {
            case '1-4A':
              text = attraction.texts[5].content;
              break;
            case '1-4B':
              text = attraction.texts[6].content;
              break;
            case '1-4C':
              text = attraction.texts[7].content;
              break;
          }
          video = attraction.videos[4].url;
          msg = [text, video, button];
        }
        break;
      case 'a12':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[8].content;
          msg = [text, button];
        }
        break;
      case 'a13':
        if (event.postback.data == 'next') {
          fsm.next();
          msg = q15;
        }
        break;
      case 'a14':
        if (event.postback.data == '1-5A' || event.postback.data == '1-5B' || 
        event.postback.data == '1-5C') {
          fsm.next();
          image.originalContentUrl = attraction.images[2].url;
          image.previewImageUrl = attraction.images[2].url;
          text = attraction.texts[9].content;
          msg = [image, text];
        }
        break;
      case 'a16':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[10].content;
          msg = [text, button];
        }
        break;
      case 'a17':
        if (event.postback.data == 'next') {
          fsm.next();
          video = attraction.videos[6].url;
          msg = [video, button];
        }
        break;
      case 'a18':
        if (event.postback.data == 'next') {
          fsm.next();
          text = attraction.texts[11].content;
          msg = text;
        }
        break;
      case 'a20':
        if (event.postback.data == 'back') {
          fsm.back();
          history.push('attraction');
          msg = menu;
        }
        break;
      default: 
        msg = '救救我...';
        break;
    } 
    event.reply(msg);

    await saveGroupLog(event, groupLog);
    fs.writeFileSync('Groups/groups.json', JSON.stringify(groupLog, null, ' '),
                      'utf8');

    console.log('postback is ' +　event.postback.data);
    console.log('state is ' + fsm.state);
  } catch (e) {
    console.log(e);
  }

});
/*****************************************************************************/
bot.listen('/', process.env.PORT || 5000, function () {
  console.log('Listening');
});