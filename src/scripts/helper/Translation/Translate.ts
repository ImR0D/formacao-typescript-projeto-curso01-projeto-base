import {
  SelectedLanguage,
  TranslationLanguages,
} from './TranslationLanguage.js';

export default function translate(
  message: string,
  lang?: TranslationLanguages,
): string {
  let selectedLang;
  if (!lang) {
    lang = TranslationLanguages.ptBR;
  }
  selectedLang = SelectedLanguage[lang] as Record<string, string>;
  return selectedLang[message] ?? message;
}
