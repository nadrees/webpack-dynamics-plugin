# webpack-dynamics-plugin

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Build Status](https://travis-ci.org/nadrees/webpack-dynamics-plugin.svg?branch=master)](https://travis-ci.org/nadrees/webpack-dynamics-plugin)

A small plugin that can upload bundle files to Microsoft Dynamics as web resources.

## Installation

```npm install webpack-dynamics-plugin```

## Configuration

Modify your ```webpack.config.js``` as follows:

```js
var WebpackDynamicsPlugin = require('webpack-dynamics-plugin');

module.exports = {
    ...
    plugins: [
        new WebpackDynamicsPlugin(options)
    ]
    ...
};
```

### Options

This plugin supports configuration through the passed in arguments. The ```options``` paramater has the structure:

```js
{
    // TODO: figure out the needed parameters
}
```