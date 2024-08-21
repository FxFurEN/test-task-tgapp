import { AppRoot } from '@telegram-apps/telegram-ui'
import WebApp from '@twa-dev/sdk'
import { type FC, useEffect } from 'react'
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom'

import { LanguageProvider } from '@/context/LanguageContext'
import { routes } from '@/navigation/routes.tsx'

function BackButtonManipulator() {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		function onClick() {
			navigate(-1)
		}
		WebApp.BackButton.onClick(onClick)

		return () => WebApp.BackButton.offClick(onClick)
	}, [navigate])

	useEffect(() => {
		if (location.pathname === '/') {
			WebApp.BackButton.isVisible && WebApp.BackButton.hide()
		} else {
			!WebApp.BackButton.isVisible && WebApp.BackButton.show()
		}
	}, [location])

	return null
}

export const App: FC = () => (
	<AppRoot
		appearance={WebApp.colorScheme}
		platform={['macos', 'ios'].includes(WebApp.platform) ? 'ios' : 'base'}
	>
		<LanguageProvider>
			<BrowserRouter>
				<BackButtonManipulator />

				<Routes>
					{routes.map(route => (
						<Route key={route.path} {...route} />
					))}
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			</BrowserRouter>
		</LanguageProvider>
	</AppRoot>
)
