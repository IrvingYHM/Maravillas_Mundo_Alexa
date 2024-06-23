/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
  en: {
    translation: {
      WELCOME_MESSAGE: 'Welcome Irving, you can say Help or Tell me something interesting about the wonders of the world. Which prefer?',
      HELP_MESSAGE: 'You can tell me "tell me a fact about wonders of the world" or "cancel" to leave. What do you want to do?',
      GOODBYE_MESSAGE: 'Goodbye Irving!',
      REFLECTOR_MESSAGE: 'You just activated %s',
      FALLBACK_MESSAGE: 'Sorry, I don\'t know anything about that. Please try again.',
      ERROR_MESSAGE: 'Sorry, there was a problem. Please try again.',
      Get_FRASES_MSG:"A curious fact is...",
       Get_MSG_Salida: "...you can ask for another curious fact...tell me a fact about wonders of the world or cancel. What can I do for you?",
     
      DATA : [
        'Christ the Redeemer (Rio de Janeiro, Brazil): The “art deco” statue of Christ of Corcovado measures 38 meters and is the third largest statue of Jesus Christ in the world.',
        'Christ the Redeemer (Rio de Janeiro, Brazil): He wears a kind of crown of thorns on his head, which actually works as a lightning rod.',
        'Machu Picchu (Cuzco, Peru): This ancient Inca city sits high in the Andes and offers stunning views.',
        'Machu Picchu (Cuzco, Peru): It was rediscovered in 1911 by the archaeologist Hiram Bingham.',
        'Great Wall of China: It is a system of fortifications built to protect China from invasion.',
        'Great Wall of China: Its total length is approximately 21,196 km.',
        'Petra (Jordan): Known as the “pink city”, Petra is famous for its rock-carved buildings.',
        'Petra (Jordan): It was the capital of the Nabataean Kingdom in ancient times.',
        'Taj Mahal (Agra, India): This iconic mausoleum was built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
        'Taj Mahal (Agra, India): Its architectural beauty and symbolism make it a unique wonder.',
        'Rome Colosseum (Italy): The largest amphitheater ever built, with capacity for 50,000 spectators.',
        'Rome Colosseum (Italy): Scene of gladiatorial fights and public events in ancient Rome.',
        'Chichén Itzá (Mexico): Important Mayan city with the Kukulcán pyramid as its central structure.',
        'Chichén Itzá (Mexico): The play of light and shadow at the equinox creates the illusion of a snake descending the pyramid.'
        ]
    }
  },
  es:{
    translation: {
      WELCOME_MESSAGE: 'Bienvenido Irving, puedes decir Ayuda o Cuéntame algo interesante sobre las maravillas del mundo. ¿Cual prefieres?',
      HELP_MESSAGE: 'Puedes decirme "dime un dato de maravillas del mundo" o "cancelar" para salir. ¿Que deseas hacer?' ,
      GOODBYE_MESSAGE: 'Adiós Irving!',
      REFLECTOR_MESSAGE: 'Acabas de activar %s',
      FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.',
      Get_FRASES_MSG:"Un dato curioso es ... ",
      Get_MSG_Salida: "...puedes pedir otro dato curioso...di dime un dato de maravillas del mundo o cancelar.¿Que puedo hacer por ti?",
      DATA : [
        'Cristo Redentor (Río de Janeiro, Brasil): La estatua “art decó” del Cristo del Corcovado mide 38 metros y es la tercera estatua de Jesucristo más grande del mundo.',
        'Cristo Redentor (Río de Janeiro, Brasil): Lleva una especie de corona de espinas en la cabeza, que en realidad funciona como pararrayos.',
        'Machu Picchu (Cuzco, Perú): Esta antigua ciudad inca se encuentra en lo alto de los Andes y ofrece vistas impresionantes.',
        'Machu Picchu (Cuzco, Perú): Fue redescubierta en 1911 por el arqueólogo Hiram Bingham.',
        'Gran Muralla China: Es un sistema de fortificaciones construido para proteger China de invasiones.',
        'Gran Muralla China: Su longitud total es de aproximadamente 21,196 km.',
        'Petra (Jordania): Conocida como la “ciudad rosa”, Petra es famosa por sus edificios tallados en roca.',
        'Petra (Jordania): Fue la capital del Reino Nabateo en la antigüedad.',
        'Taj Mahal (Agra, India): Este icónico mausoleo fue construido por el emperador Shah Jahan en memoria de su esposa Mumtaz Mahal.',
        'Taj Mahal (Agra, India): Su belleza arquitectónica y simbolismo lo convierten en una maravilla única.',
        'Coliseo de Roma (Italia): El anfiteatro más grande jamás construido, con capacidad para 50,000 espectadores.',
        'Coliseo de Roma (Italia): Escenario de luchas de gladiadores y eventos públicos en la antigua Roma.',
        'Chichén Itzá (México): Importante ciudad maya con la pirámide de Kukulcán como su estructura central.',
        'Chichén Itzá (México): El juego de luces y sombras en el equinoccio crea la ilusión de una serpiente descendiendo por la pirámide.'
        ]
    }
  }
}

const MaravillasIntentHandler ={
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) ===  'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CurioMaravillasIntent';
    },
    handle(handlerInput){
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const FrasesArray = requestAttributes.t('DATA');
        let response;
        const FrasesIndice = Math.floor(Math.random() * FrasesArray.length);
        const ramdomFrase = FrasesArray[FrasesIndice];
        const speakOutput = requestAttributes.t('Get_FRASES_MSG') + ramdomFrase + requestAttributes.t('Get_MSG_Salida')
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speechText = requestAttributes.t('WELCOME_MESSAGE');
                    
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MaravillasIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();