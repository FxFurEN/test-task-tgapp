import { ZodiacSign } from '@/components/ZodiacSign'
import enTranslations from '@/translations/en.json'
import ruTranslations from '@/translations/ru.json'
import { List, Section } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { FC, useMemo } from 'react'

const zodiacSigns = [
	{
		name: 'Aries',
		dateRange: 'March 21 - April 19',
		iconUrl: 'https://www.svgrepo.com/show/474316/aries.svg',
	},
	{
		name: 'Taurus',
		dateRange: 'April 20 - May 20',
		iconUrl: 'https://www.svgrepo.com/show/474311/taurus.svg',
	},
	{
		name: 'Gemini',
		dateRange: 'May 21 - June 20',
		iconUrl: 'https://www.svgrepo.com/show/445808/horoscope-gemini.svg',
	},
	{
		name: 'Cancer',
		dateRange: 'June 21 - July 22',
		iconUrl: 'https://www.svgrepo.com/show/474317/cancer.svg',
	},
	{
		name: 'Leo',
		dateRange: 'July 23 - August 22',
		iconUrl: 'https://www.svgrepo.com/show/441671/leo.svg',
	},
	{
		name: 'Virgo',
		dateRange: 'August 23 - September 22',
		iconUrl: 'https://www.svgrepo.com/show/441777/virgo.svg',
	},
	{
		name: 'Libra',
		dateRange: 'September 23 - October 22',
		iconUrl: 'https://www.svgrepo.com/show/441668/libra.svg',
	},
	{
		name: 'Scorpio',
		dateRange: 'October 23 - November 21',
		iconUrl: 'https://www.svgrepo.com/show/441727/scorpio.svg',
	},
	{
		name: 'Sagittarius',
		dateRange: 'November 22 - December 21',
		iconUrl: 'https://www.svgrepo.com/show/498362/sagittarius.svg',
	},
	{
		name: 'Capricorn',
		dateRange: 'December 22 - January 19',
		iconUrl: 'https://www.svgrepo.com/show/441598/capricorn.svg',
	},
	{
		name: 'Aquarius',
		dateRange: 'January 20 - February 18',
		iconUrl: 'https://www.svgrepo.com/show/497696/aquarius.svg',
	},
	{
		name: 'Pisces',
		dateRange: 'February 19 - March 20',
		iconUrl: 'https://www.svgrepo.com/show/474313/pisces.svg',
	},
]

const translations = {
	en: enTranslations,
	ru: ruTranslations,
}

export const ZodiacPage: FC = () => {
	const userLanguageCode =
		(WebApp.initDataUnsafe?.user as { language_code?: string })
			?.language_code || 'en'
	const t = useMemo(
		() => translations[userLanguageCode] || translations.en,
		[userLanguageCode]
	)

	return (
		<Section header={t.zodiacPageHeader}>
			<List>
				{zodiacSigns.map(sign => (
					<ZodiacSign
						key={sign.name}
						name={t[sign.name] || sign.name}
						dateRange={t[`${sign.name}DateRange`] || sign.dateRange}
						icon={sign.iconUrl}
					/>
				))}
			</List>
		</Section>
	)
}
