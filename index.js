/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('ask-sdk-core');
const APP_ID = 'amzn1.ask.skill.ee67eb19-cfec-4505-bd36-ef27a2e3f451';
const SKILL_NAME = 'Little Sunshine\'s Playhouse and Preschool';
const HELP_MESSAGE = 'All I can do right now is look at the menu. You can ask me about the menu.';
const HELP_REPROMPT = 'What would you like to know?';
const STOP_MESSAGE = 'Goodbye!';
const ERROR_MESSAGE = 'Sorry, an error occurred.';

const data = [];

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const GetMenuIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GetMenuIntent';
    },
    handle(handlerInput) {
        //todo: do something with data array, or even move to another file
        const speechText = '';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    }, 
    handle(handlerInput) {
        const speechText = STOP_MESSAGE;
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(SKILL_NAME, speechText)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);

      const speechText = ERROR_MESSAGE;
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    },
};

const RequestHandlers = [LaunchRequestHandler, CancelAndStopIntentHandler]

exports.handler = Alexa.SkillBuilders.custom()
    .addReuestHandlers(RequestHandlers)
    .addErrorHandlers(ErrorHandler)
    .lambda();
