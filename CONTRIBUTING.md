## Overview

Contributions are welcome and encouraged.

## Development Notes

* gjs API docs [are available here](https://gjs-docs.gnome.org/meta7~7_api/)
* Nested Wayland session for testing can be launched via: `env GNOME_SHELL_SLOWDOWN_FACTOR=2 MUTTER_DEBUG_DUMMY_MODE_SPECS=1024x768 dbus-run-session -- gnome-shell --nested --wayland`
* After changing schemas, they must be compiled: `glib-compile-schemas schemas/`
