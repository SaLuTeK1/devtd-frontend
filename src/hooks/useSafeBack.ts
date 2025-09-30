'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useSafeBack(fallback: string = '/') {
	const router = useRouter()

	return useCallback(() => {
		if (typeof window !== 'undefined') {
			const hasHistory = window.history.length > 1
			const ref = document.referrer
			const sameOrigin = ref
				? new URL(ref).origin === window.location.origin
				: false

			if (hasHistory && sameOrigin) {
				router.back()
				return
			}
		}
		router.replace(fallback)
	}, [router, fallback])
}
