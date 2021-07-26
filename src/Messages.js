
export let languages  = {
    // /**
    //  * lang for Arabic.
    //  */
    // ar : "ar",
    // /**
    //  * lang for Azeri.
    //  */
    // az : "az",
    // /**
    //  * lang for Belarusian.
    //  */
    // be : "be",
    // /**
    //  * lang for Bulgarian.
    //  */
    // bg : "bg",
    // /**
    //  * lang for Bosnian.
    //  */
    // bs : "bs",
    // /**
    //  * lang for Catalan.
    //  */
    // ca : "ca",
    // /**
    //  * lang for Czech.
    //  */
    // cs : "cs",
    // /**
    //  * lang for Welsh.
    //  */
    // cy : "cy",
    // /**
    //  * lang for Danish.
    //  */
    // da : "da",
    // /**
    //  * lang for German.
    //  */
    // de : "de",
    // /**
    //  * lang for Greek.
    //  */
    // el : "el",
    // /**
    //  * lang for English.
    //  */
    en : "en",
    // /**
    //  * lang for Spanish.
    //  */
    // es : "es",
    // /**
    //  * lang for Estonian.
    //  */
    // et : "et",
    // /**
    //  * lang for Basque.
    //  */
    // eu : "eu",
    // /**
    //  * lang for Farsi.
    //  */
    // fa : "fa",
    // /**
    //  * lang for Finnish.
    //  */
    // fi : "fi",
    // /**
    //  * lang for French.
    //  */
    // fr : "fr",
    // /**
    //  * lang for Croatian.
    //  */
    // hr : "hr",
    // /**
    //  * lang for Hungarian.
    //  */
    // hu : "hu",
    // /**
    //  * lang for Indonesian.
    //  */
    // id : "id",
    // /**
    //  * lang for Italian - Switzerland.
    //  */
    // it : "it",
    // /**
    //  * lang for Japanese.
    //  */
    // ja : "ja",
    // /**
    //  * lang for Georgian.
    //  */
    // ka : "ka",
    // /**
    //  * lang for Korean.
    //  */
    // ko : "ko",
    // /**
    //  * lang for Italian - Italy.
    //  */
    // It : "It",
    // Iv : "Iv",
    // /**
    //  * lang for FYRO Macedonia.
    //  */
    // mk : "mk",
    // /**
    //  * lang for Mongolian.
    //  */
    // mn : "mn",
    // /**
    //  * lang for Malay.
    //  */
    // ms : "ms",
    // /**
    //  * lang for Norwegian - Bokml.
    //  */
    // nb_NO : "nb_NO",
    // /**
    //  * lang for Dutch.
    //  */
    // nl : "nl",
    // /**
    //  * lang for Polish.
    //  */
    // pl : "pl",
    // /**
    //  * lang for Portuguese - Portugal.
    //  */
    // pt : "pt",
    // /**
    //  * lang for Portuguese - Brazil.
    //  */
    // pt_BR : "pt_BR",
    // /**
    //  * lang for Romanian.
    //  */
    // ro : "ro",
    // /**
    //  * lang for Russian.
    //  */
    // ru : "ru",
    // se : "se",
    // /**
    //  * lang for Slovenian.
    //  */
    // sl : "sl",
    // /**
    //  * lang for Albanian.
    //  */
    // sq : "sq",
    // /**
    //  * lang for Serbian.
    //  */
    // sr : "sr",
    // /**
    //  * lang for Swedish.
    //  */
    // sv : "sv",
    // /**
    //  * lang for Turkish.
    //  */
    // tr : "tr",
    // ua : "ua",
    // /**
    //  * lang for Ukrainian.
    //  */
    // uk : "uk",
    // /**
    //  * lang for Vietnamese.
    //  */
    vi : "vi",
    // /**
    //  * lang for Chinese.
    //  */
    // zh : "zh",
    // /**
    //  * lang for Chinese - Taiwan.
    //  */
    // zh_TW : "zh_TW",
}


/**
 * @type {string}
 */
export let defaultMessage = 'Incorrect Value';
export let defaultLocale = 'en';

/**
 * @type {*}
 */
import messageEN from "./lang/en"
import messageVI from "./lang/vi"

let LANG_MESS = []
LANG_MESS[`${languages.en}`] = messageEN
LANG_MESS[`${languages.vi}`] = messageVI

export let messages = LANG_MESS[`${languages.en}`]


/**
 * @param {object} Message set ... 
 */
export function setMessages(m) {
    if (typeof m !== 'object') {
        throw 'Messages must be object';
    }

    messages = { ...messages, ...m };
}

/**
 * @param {string} msg
 */
export function setDefaultMessage(msg) {
    if (typeof msg !== 'string') {
        throw 'Default message must be a string';
    }

    defaultMessage = msg;
}


/**
 * @param {object} Message set ... 
 */
 export function setLocale( locale = 'en' ) {
    if (typeof locale !== 'string') {
        throw 'Locale must be string';
    }

    defaultLocale = locale
    if( typeof LANG_MESS[locale] === undefined ){
        throw `Locale - ${locale} is not supported`;
    }
    messages = { ...messages, ...LANG_MESS[locale] };
}


