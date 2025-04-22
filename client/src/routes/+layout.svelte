<script>
	import '../app.css';
</script>

<div class="container mx-auto flex min-h-screen flex-col">
	<header class="my-4">
		<a href="/" target="_self">
			<h1 class="scroll-m-20 font-display text-4xl font-extrabold tracking-tight lg:text-5xl">
				SAUDI CYBERFEMINISM VISUAL INDEX
			</h1>
		</a>
	</header>
	<slot></slot>
	<div class="flex-grow" />
	<footer class="py-4">
		<div class="flex items-center justify-center">
			<a href="/about" class="hover:underline">about</a>
			<span class="px-1 py-1">|</span>
			<a href="/disclaimer" class="hover:underline">disclaimer</a>
			<span class="px-1 py-1">|</span>
			<a href="/submit" class="hover:underline">submit</a>
			<span class="px-1 py-1">|</span>
			<a href="/" class="hover:underline">home</a>
		</div>
	</footer>
</div>
