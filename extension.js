/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

const { Meta, Shell } = imports.gi;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

class Extension {
  constructor() {
    this.directions = ["ne", "nw", "se", "sw"];
  }

  moveWindow(corner) {
    global.get_window_actors().every((w) => {
      if (w.meta_window.has_focus()) {
        var monitorGeometry = global.display.get_monitor_geometry(
          w.meta_window.get_monitor(),
        );
        var monitorUpperLeftX = monitorGeometry.x;
        var monitorUpperLeftY = monitorGeometry.y;
        var monitorHalfWidth = Math.floor(monitorGeometry.width / 2);
        var monitorHalfHeight = Math.floor(monitorGeometry.height / 2);

        if (w.meta_window.get_maximized()) {
          w.meta_window.unmaximize(3); // META_MAXIMIZE_BOTH
        }
        switch (corner) {
          case "ne":
            w.meta_window.move_resize_frame(
              0,
              monitorUpperLeftX + monitorHalfWidth,
              monitorUpperLeftY,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "nw":
            w.meta_window.move_resize_frame(
              0,
              monitorUpperLeftX,
              monitorUpperLeftY,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "se":
            w.meta_window.move_resize_frame(
              0,
              monitorUpperLeftX + monitorHalfWidth,
              monitorUpperLeftY + monitorHalfHeight,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "sw":
            w.meta_window.move_resize_frame(
              0,
              monitorUpperLeftX,
              monitorUpperLeftY + monitorHalfHeight,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
        }
        return false;
      }
      return true;
    });
  }

  enable() {
    let settings = ExtensionUtils.getSettings(
      "org.gnome.shell.extensions.com-troyready-quarterwindows",
    );
    let mode = Shell.ActionMode.NORMAL;
    let flag = Meta.KeyBindingFlags.NONE;

    for (let i = 0; i < this.directions.length; i++) {
      Main.wm.addKeybinding(
        "put-to-corner-" + this.directions[i],
        settings,
        flag,
        mode,
        () => {
          this.moveWindow(this.directions[i]);
        },
      );
    }
  }

  disable() {
    for (let i = 0; i < this.directions.length; i++) {
      Main.wm.removeKeybinding("put-to-corner-" + this.directions[i]);
    }
  }
}

function init() {
  return new Extension();
}
