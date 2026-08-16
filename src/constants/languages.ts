export interface Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;
}

export const DEFAULT_LANGUAGE: Language = {
  id: 1,
  code: 'en',
  name: 'English',
  nativeName: 'English',
};

export const FALLBACK_LANGUAGES: Language[] = [
  DEFAULT_LANGUAGE,
  {id: 2, code: 'te', name: 'Telugu', nativeName: 'తెలుగు'},
  {id: 3, code: 'hi', name: 'Hindi', nativeName: 'हिन्दी'},
  {id: 4, code: 'ta', name: 'Tamil', nativeName: 'தமிழ்'},
  {id: 5, code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ'},
  {id: 6, code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം'},
  {id: 7, code: 'mr', name: 'Marathi', nativeName: 'मराठी'},
  {id: 8, code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી'},
  {id: 9, code: 'bn', name: 'Bengali', nativeName: 'বাংলা'},
  {id: 10, code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ'},
  {id: 11, code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ'},
  {id: 12, code: 'as', name: 'Assamese', nativeName: 'অসমীয়া'},
  {id: 13, code: 'ur', name: 'Urdu', nativeName: 'اردو'},
  {id: 14, code: 'ar', name: 'Arabic', nativeName: 'العربية'},
  {id: 15, code: 'ne', name: 'Nepali', nativeName: 'नेपाली'},
  {id: 16, code: 'si', name: 'Sinhala', nativeName: 'සිංහල'},
  {id: 29, code: 'es', name: 'Spanish', nativeName: 'Español'},
  {id: 28, code: 'fr', name: 'French', nativeName: 'Français'},
  {id: 27, code: 'de', name: 'German', nativeName: 'Deutsch'},
];

export const normalizeLanguage = (
  item: any,
  index = 0,
): Language => ({
  id: Number(item?.id) || index + 1,
  code: item?.code || item?.language_code || item?.languageCode || '',
  name: item?.name || item?.language_name || item?.languageName || '',
  nativeName:
    item?.nativeName ||
    item?.native_name ||
    item?.name ||
    item?.language_name ||
    '',
});

export const findEnglish = (languages: Language[]): Language =>
  languages.find(
    item => item.code?.toLowerCase() === 'en' || item.name === 'English',
  ) ??
  DEFAULT_LANGUAGE;
