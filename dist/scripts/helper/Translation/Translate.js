import { SelectedLanguage, TranslationLanguages, } from './TranslationLanguage.js';
export default function translate(message, lang) {
    let selectedLang;
    if (!lang) {
        lang = TranslationLanguages.ptBR;
    }
    selectedLang = SelectedLanguage[lang];
    return selectedLang[message] ?? message;
}
