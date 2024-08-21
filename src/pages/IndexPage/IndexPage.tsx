import { Link } from '@/components/Link/Link.tsx'
import enTranslations from '@/translations/en.json'
import ruTranslations from '@/translations/ru.json'
import { Translations } from '@/types/translations'
import { Cell, List, Section } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { FC, useMemo } from 'react'
const translations: Translations = {
	en: enTranslations,
	ru: ruTranslations,
}

export const IndexPage: FC = () => {
	const userLanguageCode =
		(WebApp.initDataUnsafe?.user as { language_code?: string })
			?.language_code || 'en'

	const t = useMemo(
		() => translations[userLanguageCode] || translations.en,
		[userLanguageCode]
	)

	return (
		<List>
			<Section
				header={t.applicationLaunchDataHeader}
				footer={t.applicationLaunchDataFooter}
			>
				<Link to='/init-data'>
					<Cell subtitle={t.initDataSubtitle}>Init Data</Cell>
				</Link>
				<Link to='/zodiac'>
					<Cell subtitle={t.initDataSubtitle}>Zodiac</Cell>
				</Link>
				<Link to='/launch-params'>
					<Cell subtitle={t.launchParamsSubtitle}>Launch Parameters</Cell>
				</Link>
				<Link to='/theme-params'>
					<Cell subtitle={t.themeParamsSubtitle}>Theme Parameters</Cell>
				</Link>
			</Section>
		</List>
	)
}
