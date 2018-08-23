/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('ask-sdk-core');
const AmazonDateParser = require('amazon-date-parser');

const APP_ID = 'amzn1.ask.skill.ee67eb19-cfec-4505-bd36-ef27a2e3f451';
const SKILL_NAME = 'Little Sunshine\'s Playhouse and Preschool';
const HELP_MESSAGE = 'All I can do right now is look at the menu. You can ask me about the menu.';
const HELP_REPROMPT = 'What would you like to know?';
const STOP_MESSAGE = 'Goodbye!';
const ERROR_MESSAGE = 'Sorry, an error occurred.';

const data = { meals: [
    {
        "date":"8/23/2018", 
        "breakfast":"Apples", 
        "lunch":"Meat", 
        "snack":"Crackers"
    }, {
        "date":"8/24/2018", 
        "breakfast":"Blueberries", 
        "lunch":"Ziti", 
        "snack":"Yogurt"
    }
]};

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
        const speechText = '';

        // if date slot provided, get data from that date, if not, assume today
        const dateSlot = handlerInput.requestEnvelope.request.intent.slots.date.value;
        var targetDate = dateSlot ? new AmazonDateParser(dateSlot) : new AmazonDateParser(Date.now());

        var meals = data.meals.find(function(element) {
            //I'm sure date comparison won't be this easy
            element.Date = targetDate;
        });

        // if meal slot provided, get that specific meal, if not, assume all meals
        const mealSlot = handlerInput.requestEnvelope.request.intent.slots.meal.value;
        if (mealSlot)
        {
            speechText = `For ${mealSlot}, ${meals.mealSlot} will be served.`
        } 
        else 
        {
            speechText = `For breakfast, ${meals.breakfast} will be served. For lunch, ${meals.lunch} will be served. For snack, ${meals.snack} will be served.`
        }

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
