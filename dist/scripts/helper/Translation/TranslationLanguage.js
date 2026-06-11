import { enUS } from './en-US.js';
import { ptBR } from './pt-BR.js';
export var TranslationLanguages;
(function (TranslationLanguages) {
    TranslationLanguages[TranslationLanguages["ptBR"] = 0] = "ptBR";
    TranslationLanguages[TranslationLanguages["enUS"] = 1] = "enUS";
})(TranslationLanguages || (TranslationLanguages = {}));
export const SelectedLanguage = {
    [TranslationLanguages.ptBR]: ptBR,
    [TranslationLanguages.enUS]: enUS,
};
