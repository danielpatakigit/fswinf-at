# Remake of [winf.at](winf.at)

## Problems with internationalization

I experimented a lot with the Inlang libary but it seems like that it is way too SSR specific. The build really doesn't want to optimally generate the pages based on the different language settings. I have to find an own/simplified solution.

The video guide I used for my implementation: https://www.youtube.com/watch?v=Y6IbPfMU1xM&t=163s

Here it also gets mentioned that there are still some issues open when it comes to static rendering and he didn't even use adapter-static just set `export const prerender = true` in the root ˛`layout.svelte`.

## My own solution (idea)

The current website functions this way:

- winf.at/[german-slug] for german pages
- winf.at/en/[english-slug] for english pages

I really don't like this setup since this way for the same content there are two different formats involved and the slugs are also in two different languages which is a really unususal and impractical in my opinon.

Therefore, my desired configuration for the redesign would be:

- winf.at/de/[english-slug] for german pages
- winf.at/en/[english-slug] for english pages

Only one pattern and a single shared english slug.

This way the old English URLs would be perfectly functional and for the German ones a redirect has to be implemented. This could be solved the following way:

Request comes in with old German URL, for example:
winf.at/beratung

this request would be matched to the [lang] route in SvelteKit but since it isn't de or en it is interpreted as an old url. Let's say that the new German page is at winf.at/de/consulting, this is our target for the redirect.

In Markdown file there has to be a meta tag then to mark that this is the new page for the old winf.at/beratung. Then the load function after determining that this is an old URL request starts looking for the Markdown file with this tag and then if it found throws a 301 redirect to winf.at/de/consulting.

If it didn't find such a match because the tag wasn't given or the page doesn't exist anymore we redirect either to the homepage or to a simple 404.

## Internationalization Solution

All hail the creator of this libary
https://github.com/sveltekit-i18n/lib/tree/master

Fantastic no dependency, minimal and elegant solution EVEN for static sites. Based on i18n I don't understand everything yet but there really isn't a lot of code behind this one so eventually I will get it.

# Proof of concept with internationalization and Markdown file generation ready

Everything seems to be working now as it should. The thing took a lot of learning and experimenting but it seems that I just overcomplicated stuff that I've seen in tutorials.

Proven features:

- Content generation from MD (multiple languages)
- Full internationalization with the abovementionend libary
  (Only setup for en and de right now but these two aren't hardcoded in of course, later we could publish all pages in any languages we want)
- Simple dark-light mode switch
- Global values (Svelte stores) still work when switching between pages ("You have x new Messages)
- Everything result in one static output (see build folder)
- Some basic page transition (fade) just to showcase that eventhough whole HTML pages get rendered out on navigation, normal svelte animations and browser view transitions still work as with traditional SSR or CSR.

`pnpm run build` for the build generation
`pnpm run preview` to inspect the actual results of the build

Missing features:

- The also abovementioned auto-redirect for the old links, it should be hard to implement later down the line however
