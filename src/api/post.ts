export interface HoroscopeResponse {
	horoscope: string
}

export const fetchHoroscope = async (
	sign: string,
	language: string
): Promise<HoroscopeResponse> => {
	const response = await fetch('https://poker247tech.ru/get_horoscope/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			sign: sign.toLowerCase(),
			language,
			period: 'today',
		}),
	})
	if (!response.ok) {
		throw new Error('Failed to fetch horoscope')
	}
	return response.json()
}
