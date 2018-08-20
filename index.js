/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.ee67eb19-cfec-4505-bd36-ef27a2e3f451';
const SKILL_NAME = 'Little Sunshine\'s Playhouse and Preschool';
const HELP_MESSAGE = 'All I can do right now is look at the menu. You can ask me about the menu.';
const HELP_REPROMPT = 'What would you like to know?';
const STOP_MESSAGE = 'Goodbye!';

const data = [];

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'GetMenuIntent': function () {
        //todo: do something with data array
        const speechOutput = '';
        const cardOutput = '';
    
        this.response.cardRenderer(SKILL_NAME, cardOutput);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
