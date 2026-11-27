import { Flex, Text, Button } from "@radix-ui/themes";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16 text-white">
      <section className="w-full max-w-2xl text-center">
        <p className="mb-6 text-sm font-semibold tracking-[0.3em] text-cyan-300 uppercase">
          Play together
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          NexPlay
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-300">
          Your living room is the console. Every phone is a controller. Let the
          games begin.
        </p>
        <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-emerald-400"
          />
          Frontend ready
        </p>
      </section>
      <Flex direction="column" gap="2">
			  <Text>Hello from Radix Themes :)</Text>
			  <Button>Let's go</Button>
		  </Flex>

    </main>
  );
}

export default App;
