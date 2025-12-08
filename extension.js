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

import Meta from "gi://Meta";
import Shell from "gi://Shell";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as PutWindowUtils from "./putWindow/utils.js";

export default class QuarterWindowExtension extends Extension {
  constructor(metadata) {
    super(metadata);
    this.corners = ["ne", "nw", "se", "sw"];
    this.directions = ["w", "s", "n", "e"];
  }

  tileWindow(location) {
    global.get_window_actors().every((w) => {
      if (w.meta_window.has_focus()) {
        var monitorIdx = w.meta_window.get_monitor();
        var workArea = Main.layoutManager.getWorkAreaForMonitor(monitorIdx);

        var monitorUpperLeftX = workArea.x;
        var monitorUpperLeftY = workArea.y;
        var monitorHalfWidth = Math.floor(workArea.width / 2);
        var monitorHalfHeight = Math.floor(workArea.height / 2);

        if (w.meta_window.is_maximized()) {
          w.meta_window.unmaximize(3); // META_MAXIMIZE_BOTH
        }
        switch (location) {
          case "ne":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX + monitorHalfWidth,
              monitorUpperLeftY,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "nw":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX,
              monitorUpperLeftY,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "se":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX + monitorHalfWidth,
              monitorUpperLeftY + monitorHalfHeight,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "sw":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX,
              monitorUpperLeftY + monitorHalfHeight,
              monitorHalfWidth,
              monitorHalfHeight,
            );
            break;
          case "n":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX,
              monitorUpperLeftY,
              workArea.width,
              monitorHalfHeight,
            );
            break;
          case "s":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX,
              monitorUpperLeftY + monitorHalfHeight,
              workArea.width,
              monitorHalfHeight,
            );
            break;
          case "w":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX,
              monitorUpperLeftY,
              monitorHalfWidth,
              workArea.height,
            );
            break;
          case "e":
            this.moveAndResizeWindow(
              w.meta_window,
              monitorUpperLeftX + monitorHalfWidth,
              monitorUpperLeftY,
              monitorHalfWidth,
              workArea.height,
            );
            break;
        }
        return false;
      }
      return true;
    });
  }

  moveFocus(direction) {
    let otherWindows = [];
    let focusedWindow;
    let candidates = [];

    for (let i = 0; i < global.get_window_actors().length; i++) {
      if (global.get_window_actors()[i].meta_window.has_focus()) {
        focusedWindow = global.get_window_actors()[i];
      } else {
        otherWindows.push(global.get_window_actors()[i]);
      }
    }
    if (focusedWindow == null || otherWindows.length == 0) {
      return false;
    } else {
      for (let i = 0; i < otherWindows.length; i++) {
        if (
          PutWindowUtils.isFocusCandidate(
            focusedWindow,
            otherWindows[i],
            direction,
          )
        ) {
          if (!otherWindows[i].meta_window.is_hidden()) {
            candidates.push({
              window: otherWindows[i],
              dist: PutWindowUtils.getDistance(focusedWindow, otherWindows[i]),
            });
          }
        }
      }
      PutWindowUtils.findAndActivateNearestCandidate(candidates);
    }
  }

  moveAndResizeWindow(window, x, y, width, height) {
    window.move_frame(true, x, y);
    window.move_resize_frame(true, x, y, width, height);
  }

  enable() {
    let settings = this.getSettings();
    let mode = Shell.ActionMode.NORMAL;
    let flag = Meta.KeyBindingFlags.NONE;

    for (let i = 0; i < this.corners.length; i++) {
      Main.wm.addKeybinding(
        "put-to-corner-" + this.corners[i],
        settings,
        flag,
        mode,
        () => {
          this.tileWindow(this.corners[i]);
        },
      );
    }

    for (let i = 0; i < this.directions.length; i++) {
      Main.wm.addKeybinding(
        "move-focus-" + this.directions[i],
        settings,
        flag,
        mode,
        () => {
          this.moveFocus(this.directions[i]);
        },
      );
      Main.wm.addKeybinding(
        "put-to-half-" + this.directions[i],
        settings,
        flag,
        mode,
        () => {
          this.tileWindow(this.directions[i]);
        },
      );
    }
  }

  disable() {
    for (let i = 0; i < this.corners.length; i++) {
      Main.wm.removeKeybinding("put-to-corner-" + this.corners[i]);
    }

    for (let i = 0; i < this.directions.length; i++) {
      Main.wm.removeKeybinding("move-focus-" + this.directions[i]);
      Main.wm.removeKeybinding("put-to-half-" + this.directions[i]);
    }
  }
}
