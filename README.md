# War
This is a War 2 bootleg we created in middle school. This is a war game based on classes and to which the end goal instead of drawing a card, comes from the selected class.

Classes may or may not have a predefined starting place. The classes are the following:
- Anarchism
- Capitalism
- Fascism
- Feudalism
- Church
- ISIS
- ~~Joeyismo~~
- Nazism
- ONU (UN)
- Pirates
- Puritanism
- Resistance
- Socialism
- SPQR
- Vikings
- Zombies

I may add later a proper .md for each class, though this will not be of any priority. for now you can have a ~~not so pleasant~~ read at `frontend/scripts/game_rules.js`.

For now all the user interface is in **brazilian portuguese**, I may add an english translation too, but not anytime soon.

## Project Structure, Building, Dependencies and Running
The project is developed using [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/) for the backend and plain HTML/JavaScript/CSS for the frontend. Though I may translate the frontend to TypeScript some day.

The backend is located in `src/` and the frontend in `frontend/`.

The backend uses [Express](https://expressjs.com/) and [Socket.io](https://socket.io/), while the frontend uses [JQuery](https://jquery.com/), [Bootstrap](https://getbootstrap.com/), [ImageMapster](https://github.com/jamietre/ImageMapster), and of course, the [Socket.io](https://socket.io/) client side js.

To start working or run the project (after cloning it), you need to follow the following steps:
1. Clone the project and navigate to the project root folder.
```
git clone https://github.com/tcklpl/War.git
cd War/
```
2. Install required NPM packages.
```
npm install
```
3. Create `dist/` folder and compile the typescript (this folder will contain the result of the backend typescript compilation)
```
mkdir dist
tsc
```
4. And then you can run the project by using:
```
node dist/index.js
```
> For development and testing reasons, I caped the maximum of games running at the same time to 1. You can change this at `src/index.ts`, it is a const named `max_games`.

## Current state and to-do
The project currently is at it's quarter-barebones. You can currently create lobbies and join/leave them, as well as "start" the games. (by start I mean you can broadcast the start package, but the actual game is not implemented yet)

The To-Do list currently is:
- ~~Lobby join/selection screen (main screen)~~
- ~~Lobby class selection~~
- ~~Lobby class icons and visual representation of available classes~~
- ~~Game start~~
- Let players select the starting country
- Client-side sidebar with what player is currently playing and the play order
- Class-specific movement and ground armies
- Client-side visual army representation with icons
- Class-specific special units
- Client-side visual special units representation with icons
- Class-specific country modifications
- Client-side country modification depending on player actions
- Win conditions

