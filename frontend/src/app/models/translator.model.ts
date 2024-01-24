export interface Translator {
    response?: string;
    targetLanguage: string;
    sourceLanguage: string;
    inputMessage: string;
}

export interface Language {
    abbreviation: string;
    name: string;
}
