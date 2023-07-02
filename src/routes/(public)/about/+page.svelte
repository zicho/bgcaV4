<script lang="ts">
	import LinkCard from '$lib/components/ui/LinkCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="prose">
	<h1>About</h1>
	<p>
		This web page is a non-profit and non-commercial project built and maintained by <a
			href="https://github.com/zicho">zicho (Github)</a
		>.
	</p>

	<h2>Thanks to</h2>

	<a href="https://boardgamegeek.com/">BoardGameGeek</a>, for maintaining an excellent website which
	hosts most of the data used here.<br />
	<a href="https://github.com/ervwalter/bgg-json">The BGG JSON API</a>, created and maintained by
	<a href="https://github.com/ervwalter">ervwalter</a>

	<hr class="my-8" />

	<h2>Stack</h2>

	<p>
		These are some of the tools used to power this website. Much props to their developers and
		maintainers!
	</p>
</div>

<div
	class="mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
>
	<LinkCard
		title="SvelteKit"
		imgUrl="https://cdn.hashnode.com/res/hashnode/image/upload/v1619358925225/50e2XssdE.png"
		imgAlt="sveltekit logo"
		url="https://kit.svelte.dev/"
	>
		<p>This application is powered by the excellent SvelteKit framework.</p>
	</LinkCard>

	<LinkCard
		title="DaisyUI"
		imgUrl="https://www.saashub.com/images/app/service_logos/177/5calsa790aop/large.png?1677920086"
		imgAlt="daisyui logo"
		url="https://daisyui.com/"
	>
		<p>
			The layout of this website is courtesy of DaisyUI, the awesome TailwindCSS component
			framework.
		</p>
	</LinkCard>

	<LinkCard
		title="Tailwind"
		imgUrl="https://avatars.githubusercontent.com/u/67109815?s=280&v=4"
		imgAlt="tailwind logo"
		url="https://tailwindcss.com/"
	>
		<p>
			Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without
			ever leaving your HTML.
		</p>
	</LinkCard>

	<LinkCard
		title="Supabase"
		imgUrl="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/001/299/square_480/supabase-logo-icon_1.png"
		imgAlt="supabase logo"
		url="https://supabase.com/"
	>
		<p>
			Database and realtime functionality handled by Supabase, an open source Firebase alternative.
		</p>
	</LinkCard>
	<LinkCard
		title="Lucia"
		imgUrl="https://lucia-auth.com/logo.svg"
		imgAlt="lucia logo"
		url="https://lucia-auth.com/"
	>
		<p>
			Lucia is a simple and flexible user and session management library that provides an
			abstraction layer between your app and your database.
		</p>
	</LinkCard>
	<LinkCard
		title="Drizzle ORM"
		imgUrl="https://orm.drizzle.team/_next/static/media/SecondPic.6fac02b5.png"
		imgAlt="drizzle logo"
		url="https://orm.drizzle.team/"
	>
		<p>
			Drizzle ORM is a lightweight and performant TypeScript ORM with developer experience in mind.
		</p>
	</LinkCard>
</div>
