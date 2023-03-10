# Front-end Style Guide

## Layout

The designs were created to the following widths:

- Mobile: 375px
- Desktop: 1440px

## Colors

### Neutral

- Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
- Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
- Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
- Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
- Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
- White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)

## Typography

### Body Copy

- Homepage Items: 14px
- Detail Page: 16px

### Fonts

- Family: [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans)
- Weights: 300, 600, 800

## Icons

For the icons, you can use a font icon library. Don't worry if the icons that you choose don't look exactly like they do on the design.

Some suggestions can be found below:

- [Font Awesome](https://fontawesome.com)
- [IcoMoon](https://icomoon.io)
- [Ionicons](https://ionicons.com)

Questions :

1. How to center the moon svg icon?
2. How to store rendered SVG icon? (REST API - single char)
3. Await keyword line 40 :
   "
   // FILTERING METHOD
   selectRegion.addEventListener('change', async function () {
   // Why do I need await keyword again here?
   let dane = await getData;
   flagsBox.innerHTML = '';

// Filter - Africa Americas Antarctic Asia Europe Oceania
dane = dane.filter((x) => x.region === this.value);
createAllCountries(dane);
});

" 4. If I use Promise chaining / await, how long they wait for response?
