# American Panorama toolkit
Visualization components developed for [American Panorama](http://dsl.richmond.edu/panorama/), from the Digital Scholarship Lab at the University of Richmond. [View Examples](http://americanpanorama.github.io/panorama/)

The toolkit is designed for use in the creation of historical maps such as those in the American Panorama Atlas. The components within can be installed via [npm](https://npmjs.com/) and integrated into any web-facing project. American Panorama also includes a [template](https://github.com/americanpanorama/panorama-template) that can be used as a starting point for maps in the American Panorama Atlas, and for other projects that aim to use Panorama components. All of the components within that are "views" (meaning they appear in the DOM) are [React](https://facebook.github.io/react/) components.

For a higher-level overview of the architecture of the [American Panorama](http://dsl.richmond.edu/panorama/) atlas, see: [ARCHITECTURE](ARCHITECTURE.md)

For various server-side database queries that are outside the scope of the toolkit, but which are useful for preparing data for your visualizations, see: [USEFUL QUERIES](USEFUL_QUERIES.md)

---

## Installing components in your project

You might consider starting with the American Panorama [template](https://github.com/americanpanorama/panorama-template). Whether or not you do, please follow these instructions to bring the American Panorama components into your project.

### Install the correct version of Node.js
Ensure that your Node version matches that present in `.nvmrc`.
[`nvm`](https://github.com/creationix/nvm) is the easiest way to do this,
especially when using projects that require multiple versions of Node (see the
`nvm` repo for installation instructions):

```bash
$ nvm install
Found '/Users/foo/src/americanpanorama/panorama-template/.nvmrc' with version <0.12.7>
######################################################################## 100.0%
Now using node v0.12.7 (npm v2.11.3)
```

NOTE: you'll need to run `nvm install` (or `nvm use`) in each shell instance.

Ensure your npm version is > `2.7.0` (required for support of npm scoped packages):

`npm --version`

If <= `2.7.0`, update npm:

`sudo npm install npm -g`

### Install the toolkit
Then, install the toolkit:

`npm install @panorama/toolkit`

---


## Components
The Panorama toolkit comprises a number of components that can be used individually, or wired together with the [Panorama Template](https://github.com/americanpanorama/panorama-template) as a starting point. Below is a list of the components available in the toolkit. Component examples are available [here](http://americanpanorama.github.io/panorama/).

### [AreaChart](./src/AreaChart)

### [CartoDBLoader](./src/CartoDBLoader)

### [CartoDBTileLayer](./src/CartoDBTileLayer)

### [ChartSlider](./src/ChartSlider)

### [DiscreteBarChart](./src/DiscreteBarChart)

### [Donut](./src/Leaflet/Donut)

### [HashManager](./src/HashManager)

### [HorizontalDiscreteBarChart](./src/HorizontalDiscreteBarChart)

### [IntroManager](./src/IntroManager)

### [ItemSelector](./src/ItemSelector)

### [LeafletChoropleth](./src/Leaflet/Choropleth)

### [Legend](./src/Legend)

### [LineChart](./src/LineChart)

### [MapChoropleth](./src/MapChoropleth)

### [Navigation](./src/Navigation)

### [OffsetAreaChart](./src/OffsetAreaChart)

### [Punchcard](./src/Punchcard)

### [ScatterPlot](./src/ScatterPlot)

### [TexturalList](./src/TexturalList)

### [TimeBasedMarkers](./src/TimeBasedMarkers)

### [Tooltip](./src/Leaflet/Tooltip)
---


## Developing components

Developing new components and modifying existing components requires intermediate knowledge of JavaScript and [React](https://facebook.github.io/react/), as well as basic familiarity with [npm](https://npmjs.com/). To get started, clone this repo, `cd` into the root directory, and install all necessary modules via `npm install`.

All components are in the `src/` folder; examples of components are in the `_examples/components/` folder. Note that American Panorama components are written in ES6 and use Babel to transpile to ES5 JavaScript. Luke Hoban offers [clear examples of features new in ES6](https://github.com/lukehoban/es6features); Mozilla Developer Network provides a [solid reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).


#### 1. Add the component

To create a new component, add a folder to `src/` with the name of the component, e.g. `MyComponent/`. Within, create two files:
* `MyComponent.jsx`: The React component
* `style.scss`: Any required styles for the component (optional)

Ensure that `MyComponent.jsx` imports the style sheet toward the top of the file, like so:
```
import './style.scss';
```

_Note: if your component is not a view component, it does not need to use React; just create a vanilla JavaScript (`.js`) file instead. See [`HashManager.js`](./src/HashManager/) for an example._

When you are ready to test your component, expose its module to the toolkit bundler by adding it to [`src/main.js`](./src/main.js). `import` the module at the top of the file, and add the module name to the `export default` block below.

##### A note on component design:

As a general rule, React components should be stateless, and should derive their state from `this.props`. [This article](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d) describes the pattern in more detail. Be sure to specify a `static propTypes` block at the top of the class that both documents and enforces the public API of your component. As much as possible, avoid using state (either React's `this.state` or property instances, e.g. `this.someVar`). This ensures maximum flexibility and reusability of your component, and minimizes state-related bugs; state will always flow into the component from the component's parent (usually the root `App.jsx` file).

Try to avoid adding any but the most basic styles to your component's `style.scss` file. Consumers of your component should be able to customize appearance as desired, so avoid being overly-specific with your CSS rules, and add classes to any elements that might be styled by an end user so that they can be selected in CSS.


#### 2. Add an example and documentation

Add an example for your component to `_examples/`. Create a React component in `_examples/components/` that will load and display your new component. Pass any required and optional props into your new component from this file. Then, `import` your example component into [`_examples/app.js`](./_examples/app.js).

Add documentation for your component as a `README.md` within your component's folder (`src/MyComponent/`).


#### 3. Build

To test your component on the examples page, fire up a local development server by running `npm start` from the root directory. The server runs on [http://localhost:8888/](http://localhost:8888/); open a browser to that page to see the examples page.


#### 4. Export

There are a few ways to make your component available to other projects.

##### A. Push builds to GitHub

You can point a project's `package.json` to a GitHub repository in order to pull down and use the `HEAD` of that repo as the dependency. To do this with the American Panorama toolkit, you would add this to the `package.json` of your project (not to the toolkit itself!):

```
"dependencies": {
    "@panorama/toolkit": "americanpanorama/panorama",
    ...
}
```

Since the toolkit's [`package.json`](./package.json) specifies `dist/components.js` as the entry point for any application using the toolkit via npm, we need to ensure that our new component is built into `dist/components.js` and pushed to GitHub. To build your new component, run `npm run build:dist` from the root directory. (*Note: This will lint all the source as well -- watch for and fix any build or lint errors before proceeding!*).

Then, `git commit` the build and `git push` it to the toolkit repo.

Finally, switch over to your application that is using `@panorama/toolkit` and uninstall and reinstall the toolkit with these commands:

```
npm uninstall @panorama/toolkit
npm install @panorama/toolkit
```

Now, your new component will be available to your project.

##### B. `npm link`

You can also link one local project directly to another via `npm link`. The procedure is explained [here](https://docs.npmjs.com/cli/link); basically this involves setting up a system-wide pointer to your local install of `@panorama/toolkit` and then symlinking to that install from your application using the toolkit.

This process is less foolproof than pushing builds to GitHub because `npm link` also symlinks dependencies from `@panorama/toolkit`'s `node_modules` folder, and this can cause conflicts between / multiple copies of dependencies in the toolkit and in your application. That said, if you get it working it allows you to develop your new component and consume it in your application simultaneously, without the build/push steps above.

##### C. Publish to npm

Once you're satisfied with the state of your new component, and you have a working example in place, it's time to make it available to the npm-using public! The toolkit has scripts (run from the root directory) set up to ease this process. Here's a quick overview of the process automated by those scripts.

##### `npm run publish:dist`

**Be certain you know what you're doing and are sure the toolkit is in working order before you run this script!** Publishing broken code can break other people's projects if they run `npm install`, and then you will get angry emails. We don't want angry emails.

*Before running this script, you'll have to be logged into npm with username: `panorama` / email: `ericsoco@stamen.com`.* Contact a `@panorama/toolkit` administrator for the password. You can either login via [`npm login`](https://docs.npmjs.com/cli/adduser) or via [npm's website](https://www.npmjs.com/login).

This script will automatically bump the toolkit version and publish the repo in its current state to npm. It runs [`.bin/publish-dist.sh`](./.bin/publish-dist.sh), which does these things:

- rebuild the components
- patch the version (`M.m.p` -> `M.m.(p+1)`)
- commit and push those changes to GitHub
- publish to npm

The script is fairly robust, but if you see any errors, you may need to run these steps manually. They're all visible in [the script](./.bin/publish-dist.sh).

##### `npm run publish:examples`

This script updates the [examples page](http://americanpanorama.github.io/panorama/). It runs [`.bin/publish-examples.sh`](./.bin/publish-examples.sh), which simply builds and deploys the examples. There's not much to it, and it's much less risky than `npm run publish:dist`.

---


## Acknowledgements
American Panorama is created by the [Digital Scholarship Lab at the University of Richmond](http://dsl.richmond.edu/). [Stamen Design](http://stamen.com/) designed and developed the initial maps and this toolkit. The [Andrew W. Mellon Foundation](https://mellon.org/) and the [University of Richmond](http://www.richmond.edu/) have generously provided funding for American Panorama.
