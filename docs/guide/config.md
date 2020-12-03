# Configuration

The Jade Tree backend server accepts several configuration keys to control
aspects of the server operation. Configuration keys may be specified in
multiple ways. More information about how configuration values are loaded can
be found in the Developer Documentation.

:::warning TODO
Add link to Developer Documentation
:::

Default values are overridden by values in the following order:

* A file path provided in the ``JADETREE_CONFIG`` environment variable. An
  absolute path is preferred. Relative paths are interpreted as relative to the
  internal `jadetree` Python module.
* Environment variables for each configuration key, with the name prefixed
  by ``JADETREE_`` (so to override the ``DB_URI`` configuration value, the
  environment variable is named ``JADETREE_DB_URI``).
* A configuration dictionary object passed to the server's factory function.
  This method is only applicable to developers extending or testing the code.

## Database Connection

The Jade Tree database connection can be specified as a single URI which is
passed directly to [Flask-SQLalchemy][1], or with individual configuration keys
to specify driver, hostname, database, etc. The individual keys are used to
construct a Database URI as in the following template:

``{DB_DRIVER}://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}``

[1]: https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/#connection-uri-format

:::warning
Jade Tree requires that all URI portions are URL-escaped when the ``DB_URI``
configuration key is used.  When the individual configuration keys are
provided, the ``DB_USERNAME`` and ``DB_PASSWORD`` values are escaped by Jade
Tree prior to being passed to SQLalchemy.
:::

Individual configuration keys and their descriptions are given in the following
table.

| Configuration Key | Description |
|-|-|
| `DB_URI` | Database URI to be passed directly to SQLAlchemy. This will override the other `DB_*` keys.  Examples:<br>- `sqlite:///data/jadetree.db`<br>- `mysql://user:pw@server:port/jadetree` |
| `DB_DRIVER` | Database Driver string (e.g. `sqlite`, `mysql`, `postgresql`, or any other driver/dialect string supported by SQLalchemy. |
| `DB_FILENAME` | Database file name for `SQLite` databases. Using this key with other database drivers will cause an error. |
| `DB_NAME` | Database name on the remote database server. |
| `DB_HOST` | Database server host name or IP address. Using this key or any of the other server keys with `SQLite` databases will cause an error. |
| `DB_PORT` | Database server port. If not specified, will default to the preferred port of the database driver (e.g. 3306 for MySQL, 5432 for PostgreSQL). |
| `DB_USERNAME` | Database server user name. |
| `DB_PASSWORD` | Database server password. |

:::tip Note
SQLite, MySQL/MariaDB (via the `pymysql` driver), and PostgreSQL (via the
`psycopg2` driver) are supported by default. Other databases may require
additional Python DBAPI drivers to be installed using a custom Docker image.
See the Developer Documentation for additional details.
:::

## Mail Server

Jade Tree sends emails to users and site administrators in response to events
happening on the server, so configuring an SMTP server is critical for proper
server operation. Internally Jade Tree uses the [Flask-Mail][2] library, and
specifics about the configuration can be found at that site.

[2]: https://pythonhosted.org/Flask-Mail/

Basic setup using an internal forwarding SMTP server only requires that the
`MAIL_SERVER` and `MAIL_SENDER` values are set appropriately, which will
instruct Jade Tree to use unencrypted SMTP without any authentication.

:::warning
Only use this if you have a properly configured SMTP forwarder on your
network. Messages sent through public SMTP relays may be flagged as spam by
email providers.
:::

A more typical setup might use a public mail hosting service such as Google
Mail, which requires third party applications to log in with a username and
password with a secured connection. The complete configuration would look
similar to the below snippet

```python
MAIL_ENABLED = True
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = '<user>@gmail.com'
MAIL_PASSWORD = 'your_gmail_password'
```

:::danger
Jade Tree and Flask-Mail require a plaintext password to authenticate with
Google Mail and other third-party mail providers. To keep your password safe,
take care that the Jade Tree configuration file has the appropriate file
permissions (readable only by the root user) and is located outside the web
server's document root so that it cannot be inadvertently served to a user.
:::

For Google Mail specifically, we also recommend setting up an [App Password][3]
for Jade Tree so that your main password is never used in the configuration
file, and if it is ever compromised, the App Password can be revoked without
affecting your Google Mail account or any other apps.  The setup for that is
very similar to the above, just using the app password in place of your email
password

```python
MAIL_ENABLED = True
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = '<user>@gmail.com'
MAIL_PASSWORD = 'abcdefghijklmnop'
```

[3]: https://support.google.com/accounts/answer/185833?hl=en

Individual configuration keys and their descriptions are given in the following
table.

| Configuration Key | Description |
|-|-|
| `MAIL_ENABLED` | Set to `True` to enable email messages sent from the server. |
| `MAIL_SERVER` | SMTP server hostname or address used to send system email messages. |
| `MAIL_PORT` | SMTP server port. Defaults to 25 if `MAIL_USE_TLS` is false or not set, otherwise defaults to 587. |
| `MAIL_USE_TLS` | Use a TLS encrypted connection to the SMTP server using `STARTTLS`. |
| `MAIL_USERNAME` | SMTP server user name or `None`. |
| `MAIL_PASSWORD` | SMTP server password or `None`. |
| `MAIL_SENDER` | Sender address for system email messages, usually an administrator account like `info@jadetree.io` or an unmonitored mailbox like `do-not-reply@jadetree.io`. |


## Logging

Jade Tree uses the Flask logging facilities, which internally rely on the
Python Logging backend for all server logging. Jade Tree does override some of
Flask's configuration so that the setup can be customized for individual
applications.

The main logging destination is set with the `LOGGING_DEST` setting. By
default, log messages are sent to the WSGI Error Stream for handling by the
WSGI server. Typically this will be printed to the `stderr` console, but
could also be set up for logging to file or another backend by the WSGI server.
This behavior can be overridden by setting the `LOGGING_DEST` setting to either
`stdout` or `stderr`, which directs log messages to the console directly.

:::warning
Setting `LOGGING_DEST` to a value other than `wsgi` means that log
messages are no longer sent to the WSGI server at all. Users should be aware
that this does not mirror messages, but redirects them completely.
:::

Further customization of logging happens with the `LOGGING_LEVEL` and
`LOGGING_FORMAT` settings. Setting the `LOGGING_LEVEL` to either a string
corresponding to a Python Logging Level or a Syslog Severity code will inhibit
logging messages with lower severity.

Recognized values for `LOGGING_LEVEL` are (all are case insensitive):
| Keywords | Python Level |
|-|-|
| `panic`, `alert`, `critical`, `crit` | `CRITICAL` |
| `error`, `err` | `ERROR` |
| `warning`, `warn` | `WARNING` |
| `notice`, `info` | `INFO` |
| `debug` | `DEBUG` |

:::warning
The `LOGGING_LEVEL` configuration value sets the global level for the root
logger, and is effectively a lower limit on the log messages processed by
all handlers.  Take care to set this correctly, especially if using the
email logging function, as if the `LOGGING_LEVEL` is set higher than the
`LOG_EMAIL_LEVEL`, no emails will be sent.
:::

Log message formatting is controlled by the `LOGGING_FORMAT` setting, and
defaults to `[%(asctime)s] %(levelname)s in %(module)s: %(message)s`. Jade
Tree will inject additional Flask `Request` object information into log
records if available, making it available for use in format strings. New
request variables available are:

| Attribute | Value |
|-|-|
| `request` | Complete Flask `Request` object |
| `remote_addr` | Remote IP Address |
| `url` | Request URL |

Stack backtrace reporting is suppressed by default by Jade Tree for log
messages sent to the WSGI error stream. This behavior can be reverted to the
standard Python behavior by setting `LOGGING_BACKTRACE` to `True`.

In addition to WSGI and console reporting, Jade Tree supports sending email
alerts to system administrators when high severity log messages are recorded
in production mode (this function is disabled by default in development mode).
To enable email reporting, set the `LOG_EMAIL` setting to True and set the
`LOG_EMAIL_` settings as follows:

```python
LOG_EMAIL = True
LOG_EMAIL_LEVEL = 'error'
LOG_EMAIL_ADMINS = ['admin1@your-site.com', 'admin2@your-site.com']
LOG_EMAIL_SUBJECT = '[Jade Tree] Production Site Error'
LOG_EMAIL_BODY_TMPL = 'email/text/adm-error.text.j2'
LOG_EMAIL_HTML_TMPL = 'email/html/adm-error.html.j2'
```

The email is generated using Jinja2 templates rendered with the default Flask
`render_template` function. Special variables available within the template are
given in the table below:

| Template Variable | Value |
|-|-|
| `record` | Complete Python `LogRecord` object |
| `request` | Complete Flask `Request` object |
| `formatted_record` | Formatted log message |
| `exc_class` | Python `Exception` subclass name |
| `stack_trace` | Python backtrace as extracted by `sys.exc_info` and `traceback.extract_tb` |

The stack backtrace is a collection of stack entries, and can be rendered by
a template similar to this (taken from `email/text/adm-error.text.j2`):

```jinja2
{% if stack_trace %}
A stack trace for the exception is below:
-----------------------------------------
{% for trace in stack_trace %}
File "{{ trace.filename }}", line {{ trace.lineno }}, in {{ trace.name }}
{{ trace.line }}

{% endfor %}
{% endif %}
```

## API Security Configuration

These configuration settings are used to secure the Javascript Web Tokens sent
sent by the client to the API server for authentication.

:::danger
The `APP_SESSION_KEY` and `APP_TOKEN_KEY` must be protected since they can be
used to spoof user credentials. It is recommended to set them via environment
variables or with a configuration file that is kept secure, not published to
version control, and access-controlled on the server.
:::

| Configuration Key | Description |
|-|-|
| `APP_SESSION_KEY` | The encryption key used for browser session data. This should be a random character string, ideally at least 64 characters long. |
| `APP_TOKEN_KEY` | The encryption key used for authentication tokens. This should be a random character string, ideally at least 64 characters long. |
| `APP_TOKEN_ISSUER` | Set the `iss` field in the [JavaScript Web Token][4] used to authenticate API clients. Defaults to `urn:jadetree.auth` |
| `APP_TOKEN_AUDIENCE` | Set the `aud` field in the [JavaScript Web Token][4] used to authenticate API clients. Defaults to `urn:jadetree.auth` |
| `TOKEN_VALID_INTERVAL` | Set the validity interval for API authentication tokens. Defaults to 7200 seconds (2 hours) |

It is recommended to generate the `APP_SESSION_KEY` and `APP_TOKEN_KEY` values
by generating random characters using a command similar to the following:

```shell
$ LC_CTYPE=C tr -dc A-Za-z0-9 < /dev/urandom | fold -w ${1:-64} | head -n 1
```

[4]: https://jwt.io/introduction/

## Server Settings

These settings are only used during initial server setup, and can be used to
auto-populate fields in the Server Setup screen.

| Configuration Key | Description |
|-|-|
| `SERVER_MODE` | Force the Server Mode used (Personal, Family, or Public). |
| `USER_EMAIL` | Force the User Email used for initial user creation. |
| `USER_NAME` | Force the User Name used for initial user creation. |
| `USER_LANGUAGE` | Force the User Language used for initial user creation. |
| `USER_LOCALE` | Force the User Locale used for initial user creation. |
| `USER_CURRENCY` | Force the User Currency used for initial user creation. |
