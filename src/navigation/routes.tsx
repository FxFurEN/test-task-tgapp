import type { ComponentType, JSX } from 'react'

import { IndexPage } from '@/pages/IndexPage/IndexPage'
import { LaunchParamsPage } from '@/pages/LaunchParamsPage/LaunchParamsPage.tsx'

interface Route {
	path: string
	Component: ComponentType
	title?: string
	icon?: JSX.Element
}

export const routes: Route[] = [
	{ path: '/', Component: IndexPage },
	{
		path: '/launch-params',
		Component: LaunchParamsPage,
		title: 'Launch Params',
	},
]
