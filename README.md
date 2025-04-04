**PackRun**

Social running app that lets you connect with nearby runners, track your runs and keep a history of them and their relevant data.

**Running PackRun in an Android/iOS simulator with Expo**

1. Once forked and cloned, run 'npm i' in both the client and server folders.

2. You'll need to get maps from an OSM vector tiles provider (aka 'hosting service'), such as those on this list: https://switch2osm.org/providers/. We recommend Stadia Maps's Outdoors map for its minimal style and the prominence of footpaths. Once you've registered and gotten an API key, set it up in the .env file at the root of the project folder and update l.40 in client/screens/homepage/HomePage.tsx accordingly.

3. You'll also need access to a map matching service, such as e.g. Geoapify (https://www.geoapify.com/map-matching-api/). Once you've registered and gotten an API key, set it up in the same .env file and update l.102 in client/screens/homepage/HomePage.tsx and l.33 in server/src/helpers/tracksFunctions.ts accordingly.

4. Create a SQL database, set up the relevant variables in the .env file, and update server/src/models/model.ts.

5. Create an Expo build and run it following the process starting here: https://docs.expo.dev/get-started/set-up-your-environment/.

**Tech Stack**

Backend: Express - TypeScript - SQL/Sequelize - Socket.io
Frontend: React Native - MapLibre - Gifted Charts - Socket.io

**Contributors**

Archie Maunder-Taylor: https://github.com/a-rchi-e
Vera Kijewski - https://github.com/zwerpirat
David Luque - https://github.com/daiV
Rawad Nounou - https://github.com/rawad123321
Paul Paumier Martinez - https://github.com/manawgh
