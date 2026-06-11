import { enUS } from './en-US.js';
import { ptBR } from './pt-BR.js';

export enum TranslationLanguages {
  ptBR,
  enUS,
}

export const SelectedLanguage = {
  [TranslationLanguages.ptBR]: ptBR,
  [TranslationLanguages.enUS]: enUS,
} satisfies Record<TranslationLanguages, Record<string, string>>;
