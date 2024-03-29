"use client";

import { PlusCircle, Router } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

function DocumentPage() {
	const router = useRouter();
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = () => {
		const promise = create({ title: "Untitled" }).then((documentId) =>
			router.push(`/documents/${documentId}`)
		);

		toast.promise(promise, {
			loading: "Creating a new note...",
			success: "New note created!",
			error: "Failed to create a new note.",
		});
	};

	return (
		<div className='h-full flex flex-col items-center justify-center space-y-4'>
			<Image
				src='/empty.png'
				height='300'
				width='300'
				alt='No documents'
				className='dark:hidden'
			/>
			<Image
				src='/empty-dark.png'
				height='300'
				width='300'
				alt='No documents'
				className='hidden dark:block'
			/>
			<h2>Welcome to {user?.firstName}&apos;s Jotion.</h2>
			<Button onClick={onCreate}>
				<PlusCircle className='h-4 w-4 mr-2' /> Create a note
			</Button>
		</div>
	);
}

export default DocumentPage;
