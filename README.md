# Remake of [winf.at](winf.at)

## Problems with internationalization

I experimented a lot with the Inlang libary but unfortunetly it seems like that the libary is way too SSR specific. It doesn't want to optimally generate the pages based on the different language settings. I have to find and own solution.

The video guide I used for my implementation: https://www.youtube.com/watch?v=Y6IbPfMU1xM&t=163s

Here it also gets mentioned that there are still some issues open when it comes to static rendering and he didn't even use adapter-static just set `export const prerender = true` in the root ˛`layout.svelte`.

## My own solution (idea)

The current website functions this way:

- winf.at/[german-slug] for german pages
- winf.at/en/[english-slug] for english pages

I really don't like this setup since this way for the same content there are two different formats involved and the slugs are also in two different languages which is a really ugly practice in my opinon.

Therefore, my desired configuration for the redesign would be:

- winf.at/de/[english-slug] for german pages
- winf.at/en/[english-slug] for english pages

Only one pattern and a single shared english slug.

This way the old English URLs would be perfectly functional and for the German ones a redirect has to be implemented. This could be solved the following way:

request comes in with old German URL, for example:
winf.at/beratung

this request would be matched to the [lang] route in SvelteKit but since it isn't de or en it is interpreted as an old url. Let's say that the new German page is at winf.at/de/consulting, this is our target for the redirect.

In Markdown file there has to be a meta tag then to mark that this is the new page for the old winf.at/beratung. Then the load function after determining that this is an old URL request starts looking for the Markdown file with this tag and then if it found throws a 301 redirect to winf.at/de/consulting.

If it didn't find such a match because the tag wasn't given or the page doesn't exist anymore we redirect either to the homepage or to a simple 404.

## Internationalization Solution

All hail the creator of this libary
https://github.com/sveltekit-i18n/lib/tree/master

Fantastic no dependency, minimal and elegant solution EVEN for static sites. Based on i18n I don't understand everything yet but there really isn't a lot of code behind this one so eventually I will get it.
