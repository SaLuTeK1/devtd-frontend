import { BadgePlus, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Card } from '@/components/ui/card'

const MainPage = () => {
	return (
		<main className={'w-wrap mx-auto'}>
			<h1 className={'font-semibold text-center text-[76px]'}>
				Welcome to Quiz Builder
			</h1>
			<div
				className={
					'flex items-center justify-center flex-col pt-[64px]'
				}
			>
				<h4 className={'font-medium text-[32px] mb-6'}>
					What do you want today?
				</h4>
				<section className={'grid grid-cols-2 gap-10'}>
					<Link href={'/quizzes'}>
						<Card className={'items-center px-5 hover:bg-card/50'}>
							Check Quizzes
							<Search size={36} />
						</Card>
					</Link>
					<Link href={'/create'}>
						<Card className={' items-center px-5 hover:bg-card/50'}>
							Create Quiz
							<BadgePlus size={36} />
						</Card>
					</Link>
				</section>
			</div>
		</main>
	)
}

export default MainPage
