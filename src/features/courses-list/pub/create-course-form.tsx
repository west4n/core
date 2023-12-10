'use client'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCourseAction } from '../actions'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/ui/utils'

const createCourseSchema = z.object({
	name: z.string().min(1, 'Минимум 1 символ'),
	description: z.string().min(1, 'Минимум 1 символ'),
})

export function CreateCourseForm({
	className,
	revalidatePagePath,
}: {
	className: string
	revalidatePagePath: string
}) {
	const [isCreateTransition, startCreateTransition] = useTransition()
	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(data => {
					startCreateTransition(async () => {
						createCourseAction(data, revalidatePagePath)
					})
				})}
				className={cn(className, 'space-y-8')}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Название</FormLabel>
							<FormControl>
								<Input placeholder='Название...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Описание</FormLabel>
							<FormControl>
								<Textarea placeholder='Описание...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={isCreateTransition}>
					Добавить
				</Button>
			</form>
		</Form>
	)
}
