import { ZodiacSignProps } from '@/types/zodiac'
import { Card } from '@telegram-apps/telegram-ui'
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell'
import React, { FC } from 'react'

export const ZodiacSign: FC<ZodiacSignProps> = ({ name, dateRange, icon }) => {
	return (
		<Card>
			<React.Fragment key='.0'>
				<img
					alt={name}
					src={icon}
					style={{
						display: 'grid',
						maxWidth: '100%',
						height: 'auto',
					}}
				/>
				<CardCell readOnly subtitle={dateRange}>
					{name}
				</CardCell>
			</React.Fragment>
		</Card>
	)
}
