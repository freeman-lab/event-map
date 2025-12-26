# event-map

>> Interactive map of canvassing events

# about

This repo contains an unstyled interactive webmap of canvassing events, inspired by the canvassing event map used during the Zohran Mamdani mayoral campaign. It's built using React, Next.js, MapLibre, and Theme-ui. Rather than use it as a package, it's designed for you to fork it and then customize as needed. It's relatively unopinionated, except for the choice of using Theme-UI; if you prefer Tailwind or another styling approach that would require some refactoring.

A couple aspects are specific to New York City (like the Borough selection, and the default map centering), but it's otherwise generic as to the locality. It's also generic as to the types and timing of events.

## installation

So long as you have a recent installation of node, just use

```
npm i
npm run dev
```

## data

The map consumes data in a fairly simple format. See `data/events.json` for an example file. Data in this format is easily exported from calendar events in Solidarity Tech, but it should be possible to create a similar data file by exporting and integrating events from other sources (like Action Network). It's also easy to modify the app to consume a remotely hosted data file, I just put it here for simplicity.

## base map

To run the app, you'll need to set an environmental variable NEXT_PUBLIC_MAP_STYLE_URL with the URL to a base map (you can specify this in a `.env.local` file). Any style URL that `maplibre-gl` can consume should work.