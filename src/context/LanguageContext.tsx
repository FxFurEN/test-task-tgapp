import enTranslations from '@/translations/en.json'
import ruTranslations from '@/translations/ru.json'
import { createContext, FC, ReactNode, useContext, useState } from 'react'

interface LanguageContextType {
	language: 'en' | 'ru'
	setLanguage: (language: 'en' | 'ru') => void
	translations: typeof enTranslations | typeof ruTranslations
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
)

const translations = {
	en: enTranslations,
	ru: ruTranslations,
}

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [language, setLanguage] = useState<'en' | 'ru'>('en')

	return (
		<LanguageContext.Provider
			value={{
				language,
				setLanguage,
				translations: translations[language],
			}}
		>
			{children}
		</LanguageContext.Provider>
	)
}

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}
