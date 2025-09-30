import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

import './globals.css'
import Providers from '@/providers'

export const metadata: Metadata = {
	title: 'Quiz Builder',
	description:
		'Create and manage custom quizzes with multiple question types. Build, browse, and test your knowledge in an interactive and user-friendly platform.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	)
}
