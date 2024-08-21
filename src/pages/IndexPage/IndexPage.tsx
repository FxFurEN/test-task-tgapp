import { fetchHoroscope } from '@/api/post'
import { ZodiacSign } from '@/components/ZodiacSign'
import { useLanguage } from '@/context/LanguageContext'
import {
	Button,
	Card,
	Image,
	Modal,
	Placeholder,
	Section,
	Text,
	Title,
} from '@telegram-apps/telegram-ui'
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader'
import WebApp from '@twa-dev/sdk'
import { FC, useCallback, useMemo, useState } from 'react'

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

export const IndexPage: FC = () => {
	const { language, setLanguage, translations } = useLanguage()
	const [selectedSign, setSelectedSign] = useState<string | null>(null)
	const [description, setDescription] = useState<string | null>(null)
	const userLanguageCode =
		(WebApp.initDataUnsafe?.user as { language_code?: string })
			?.language_code || 'en'
	const t = useMemo(
		() => translations[userLanguageCode] || translations.en,
		[userLanguageCode]
	)

	const handleSignClick = useCallback(
		async (sign: string) => {
			setSelectedSign(sign)
			const lang = language === 'en' ? 'translated' : 'original'
			try {
				const data = await fetchHoroscope(sign.toLowerCase(), lang)
				setDescription(data.horoscope)
			} catch (error) {
				console.error('Failed to fetch horoscope', error)
			}
		},
		[language]
	)

	return (
		<Section header={translations.zodiacPageHeader}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}>
					{language === 'en' ? 'RU' : 'ENG'}
				</Button>
			</div>
			<Modal
				header={<ModalHeader>{selectedSign}</ModalHeader>}
				trigger={
					<Placeholder>
						{zodiacSigns.map(sign => (
							<Card key={sign.name} onClick={() => handleSignClick(sign.name)}>
								<ZodiacSign
									name={translations[sign.name] || sign.name}
									dateRange={
										translations[`${sign.name}DateRange`] || sign.dateRange
									}
									icon={sign.iconUrl}
								/>
							</Card>
						))}
					</Placeholder>
				}
			>
				<Placeholder>
					<Image
						src={
							zodiacSigns.find(sign => sign.name === selectedSign)?.iconUrl ||
							''
						}
						alt={selectedSign || 'Zodiac sign'}
						style={{
							display: 'block',
							height: '144px',
							width: '144px',
							marginBottom: '16px',
						}}
					/>
					<Title>{translations[selectedSign] || selectedSign}</Title>
					<Text>{translations.todayHoroscope}</Text>
					<Text>{description}</Text>
				</Placeholder>
			</Modal>
		</Section>
	)
}
