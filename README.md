genie-router-plugin-web-client
==============================

# Configuration

There are several config items, each of which are optional:

1. _endpoint_, the HTTP path on genie-router on which _genie-router-plugin api-http_ listens, defaults to _/api/message_
2. _accessToken_, if configured, the accessToken, if configured for invoking the HTTP endpoint
3. _registerOnRoot_, If the web-client endpoint must also be registered at `/`
4. _prefix_, if genie-router is configured on a subdirectory of a domain this must be the prefix to access it.
The prefix will be appended before _/web-client/_

# Room for improvement

- When/if genie-router supports it, get the _http-api_ plugin configuration via an internal API.
