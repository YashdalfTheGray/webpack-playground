# webpack-playground

A repository that contains a full webpack setup to act as a playground to mess around with webpack

## Getting started

Pull down this repository and run an `npm install` to start. We will be starting with the branch called `01-start` but you can run an `npm start` on the `master` branch to see the end result.

## Commands

There are a few different `npm` commands that are of interest here.

- `npm start` will start the dev server and webpack in development mode
- `npm run build` will run webpack in development mode but with no dev server
- `npm run prod-build` will run webpack in production mode
- `npm run show-stats` will open the bundle statistics page with your preferred browser

## Glossary

- Loader - a small piece of code that tells webpack how to load a certain kind of file. Loaders exist for code, styles, images, fonts, markup and even markdown.
- Plugin - a plugin can tie into the webpack build process and change the resulting bundle as the compilation happens. Plugins can register hooks against webpack and run before, during and after compilation.
- Webpack load order - you can think of the webpack load order as sort of a nested function call evaluation order. For example, if I have `multiplyBy2(add2(4))`, we would expect that the result of `add2(4)` would be evaluated first and then passed into `multiplyBy2`. Webpack loaders work the same way, right to left or bottom to top depending on how your file is formatted.

## Steps

Below, we'll learn how to build our own Webpack configuration file step-by-step.

### Start

Go ahead and check out the `01-start` branch. This will be our starting position. This is the only branch in the code that is in a "broken" state and that's by design. We are going to add the right configuration for webpack to work in development mode in the next step.

### Code

The first step is to lay down the groundwork for our webpack configuration as well as start building some code.

```diff
-import './AppHeader.scss';
+// import './AppHeader.scss';

-import './CSSBaseline.scss';
+// import './CSSBaseline.scss';

-import './TextOnColorDisplay.scss';
+// import './TextOnColorDisplay.scss';

-import './TextPicker.scss';
+// import './TextPicker.scss';

-module.exports = {};
+module.exports = {
+  entry: [
+    'core-js/stable',
+    'regenerator-runtime',
+    'react-hot-loader/patch',
+    './src/index.tsx'
+  ],
+  output: {
+    path: resolve(__dirname, './public'),
+    filename: '[name].js'
+  },
+  module: {
+    rules: [
+      {
+        test: /\.tsx?$/,
+        exclude: /node_modules/,
+        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }]
+      }
+    ]
+  },
+  resolve: {
+    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
+  },
+  stats: {
+    colors: true
+  }
+};
```

### Plugins

Next, we're going to add a plugin that cleans out the old files as well as a plugin that adds a proper app name for our app. You're going to need to add a file called `.env` in the root of the project with the following contents.

```env
APP_NAME=Typography Tester
```

```diff
-    <App name="Test App" />
+    <App name={APP_NAME} />

-module.exports = {
+module.exports = (_, argv) => ({
   entry: [
     'core-js/stable',
     'regenerator-runtime',
@@ -23,6 +23,7 @@ module.exports = {
     path: resolve(__dirname, './public'),
     filename: '[name].js'
   },
+  devtool: 'source-map',
   module: {
     rules: [
       {
@@ -32,10 +33,19 @@ module.exports = {
       }
     ]
   },
+  plugins: [
+    new CleanWebpackPlugin({
+      verbose: isDev(argv.mode),
+      cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map']
+    }),
+    new webpack.DefinePlugin({
+      APP_NAME: JSON.stringify(APP_NAME)
+    })
+  ],
   resolve: {
     extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
   },
   stats: {
     colors: true
   }
-};
+});
```

### Hot module reloading

Next, we're going to add the ability for webpack to detect changes, rebuild our code and update the browser. This greatly speeds up development cycles is part of most setups.

```diff
+  devServer: {
+    contentBase: resolve(__dirname, './public'),
+    host: '0.0.0.0'
+  },
```

There is one other part that you need to be aware of and that's enabling your react code to support HMR. That's already done for you in this project. Check out `./src/components/App.tsx` if you want to see how that is set up.

### CSS

Next we're going to figure out how to build our CSS. We commented out the CSS lines in an earlier step and we're going to bring them back into the fold. Stop your webpack dev server and we'll go uncomment those lines.

```diff
-// import './AppHeader.scss';
+import './AppHeader.scss';

-// import './CSSBaseline.scss';
+import './CSSBaseline.scss';

-// import './TextOnColorDisplay.scss';
+import './TextOnColorDisplay.scss';

-// import './TextPicker.scss';
+import './TextPicker.scss';

+      },
+      {
+        test: /\.(sa|sc|c)ss$/,
+        exclude: /node_modules/,
+        use: [
+          {
+            loader: MiniCssExtractPlugin.loader,
+            options: {
+              hmr: isDev(argv.mode)
+            }
+          },
+          {
+            loader: 'css-loader',
+            options: { importLoaders: 2 }
+          },
+          {
+            loader: 'postcss-loader',
+            options: {
+              ident: 'postcss',
+              plugins: () =>
+                isProd(argv.mode)
+                  ? [autoprefixer(), cssnano()]
+                  : [autoprefixer()]
+            }
+          },
+          'sass-loader'
+        ]
       }
     ]
   },
   plugins: [
+    new MiniCssExtractPlugin({
+      filename: '[name].css',
+      chunkFilename: '[id].css'
+    }),
     new CleanWebpackPlugin({
       verbose: isDev(argv.mode),
-      cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map']
+      cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map', '*.css', '*.css.map']
     }),
     new webpack.DefinePlugin({
       APP_NAME: JSON.stringify(APP_NAME)
```

### Statistics

Analyzing the bundle created by webpack can help determine the cost of libraries that are in use in the code and can expose code that is being shipped that we either don't expect or don't want. It can also help estimate production bundle size.

```diff
-      cleanOnceBeforeBuildPatterns: ['*.js', '*.js.map', '*.css', '*.css.map']
+      cleanOnceBeforeBuildPatterns: [
+        'artifacts',
+        '*.js',
+        '*.js.map',
+        '*.css',
+        '*.css.map'
+      ]
     }),
     new webpack.DefinePlugin({
       APP_NAME: JSON.stringify(APP_NAME)
+    }),
+    new Visualizer({
+      filename: './artifacts/statistics.html'
     })
```

### Finish

And that's it. We now have a webpack configuration that builds and minifies code, builds and minifies styles, has bundle statistics and hot module reloading for both styling and code. This is a great jumping off point to start and you can add a lot more functionality through other loaders and plugins.
