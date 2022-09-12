## Overview

This extension adds shortcuts for window management.

### Shortcuts

1. Move window to upper right ("northeast") corner: `Ctrl + Win + i`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-ne "['<Primary><Super>i']"`
1. Move window to upper left ("northwest") corner: `Ctrl + Win + u`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-nw "['<Primary><Super>u']"`
1. Move window to lower right ("southeast") corner: `Ctrl + Win + k`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-se "['<Primary><Super>k']"`
1. Move window to lower left ("southwest") corner: `Ctrl + Win + j`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/put-to-corner-sw "['<Primary><Super>j']"`
1. Move window focus to the left ("west"): `Shift + Win + h`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/move-focus-w "['<Shift><Super>h']"`
1. Move window focus down ("south"): `Shift + Win + j`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/move-focus-s "['<Shift><Super>j']"`
1. Move window focus up ("north"): `Shift + Win + k`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/move-focus-n "['<Shift><Super>k']"`
1. Move window focus to the right ("east"): `Shift + Win + l`
    * Can be customized via: `dconf write /org/gnome/shell/extensions/com-troyready-quarterwindows/move-focus-w "['<Shift><Super>l']"`

#### Determining Shortcut Keys

An easy way to determine custom shortcut key values is to:

* Watch for dconf changes by opening a terminal and running `dconf watch /`
* Set a temporary custom GNOME shortcut (Settings -> Keyboard -> View and Customize Shortcuts -> Custom Shortcuts)

The dconf command will display the chosen shortcut keys. Delete the shortcut and use the displayed shortcut in the above customization commands.
