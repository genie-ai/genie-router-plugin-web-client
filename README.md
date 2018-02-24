genie-router-plugin-web-client
==============================

This plugin offers a web interface to chat with _genie-router_. It will register itself at _/web-client/_. Optionally,
by configuring `registerOnRoot` to true, it will also listen on `/`.

This plugin requires that the [http-api](https://github.com/matueranet/genie-router-plugin-api-http) plugin is installed.

# Installation

At the plugin location ($HOME/.genie-router), type:

    npm install --save matueranet/genie-router-plugin-web-client

Then add `web-client: {}`, to the `plugins` section of the genie-router configuration. Optionally add
additional configuration items.

# Configuration

There are several config items, each of which are optional:

1. _endpoint_, the HTTP path on genie-router on which _genie-router-plugin api-http_ listens, defaults to _/api/message_
2. _accessToken_, if configured, the accessToken, if configured for invoking the HTTP endpoint
3. _registerOnRoot_, If the web-client endpoint must also be registered at `/`
4. _prefix_, if genie-router is configured on a subdirectory of a domain this must be the prefix to access it.
The prefix will be appended before _/web-client/_

# Room for improvement

- When/if genie-router supports it, get the _http-api_ plugin configuration via an internal API.
- Add voice input if supported in the webbrowser

# Credits

Uses the [unnamed CSS framework](http://smakosh.com/unnamed/index.html) Textballoon via [here](http://nicolasgallagher.com/pure-css-speech-bubbles/).
