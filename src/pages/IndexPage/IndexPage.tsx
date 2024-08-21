import { fetchHoroscope } from '@/api/post'
import { ZodiacSign } from '@/components/ZodiacSign'
import enTranslations from '@/translations/en.json'
import ruTranslations from '@/translations/ru.json'
import { Card, Modal, Placeholder, Section } from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import WebApp from '@twa-dev/sdk'
import { FC, useMemo, useState } from 'react'

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
export const IndexPage: FC = () => {
	const [selectedSign, setSelectedSign] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const userLanguageCode =
		(WebApp.initDataUnsafe?.user as { language_code?: string })
			?.language_code || 'en'
	const t = useMemo(
		() => translations[userLanguageCode] || translations.en,
		[userLanguageCode]
	)

	const handleSignClick = async (sign: string) => {
		setSelectedSign(sign)
		const language = userLanguageCode === 'en' ? 'translated' : 'original'
		try {
			const data = await fetchHoroscope(sign, language)
			setDescription(data.horoscope)
		} catch (error) {
			console.error('Failed to fetch horoscope', error)
		}
	}

	return (
		<Section header={t.zodiacPageHeader}>
			<Modal
				header={<ModalHeader>{selectedSign}</ModalHeader>}
				trigger={
					<Placeholder>
						{zodiacSigns.map(sign => (
							<Card key={sign.name} onClick={() => handleSignClick(sign.name)}>
								<ZodiacSign
									name={t[sign.name] || sign.name}
									dateRange={t[`${sign.name}DateRange`] || sign.dateRange}
									icon={sign.iconUrl}
								/>
							</Card>
						))}
					</Placeholder>
				}
			>
				<Placeholder
					description={description}
					header={t[selectedSign || ''] || selectedSign}
				>
					<img
						src={
							zodiacSigns.find(sign => sign.name === selectedSign)?.iconUrl ||
							''
						}
						style={{
							display: 'block',
							height: '144px',
							width: '144px',
							marginBottom: '16px',
						}}
					/>
				</Placeholder>
			</Modal>
		</Section>
	)
}
