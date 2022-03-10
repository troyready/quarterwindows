## Overview

This extension adds shortcuts for window management.

### Shortcuts

1. Move window to upper right ("northeast") corner: `Ctrl + Win + i`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-ne "['<Primary><Super>i']"`
1. Move window to upper right ("northwest") corner: `Ctrl + Win + u`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-nw "['<Primary><Super>u']"`
1. Move window to upper right ("southeast") corner: `Ctrl + Win + k`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-se "['<Primary><Super>k']"`
1. Move window to upper right ("southwest") corner: `Ctrl + Win + j`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-sw "['<Primary><Super>j']"`

#### Determining Shortcut Keys

An easy way to determine custom shortcut key values is to:

* Watch for dconf changes by opening a terminal and running `dconf watch /`
* Set a temporary custom GNOME shortcut (Settings -> Keyboard -> View and Customize Shortcuts -> Custom Shortcuts)

The dconf command will display the chosen shortcut keys. Delete the shortcut and use the displayed shortcut in the above customization commands.
