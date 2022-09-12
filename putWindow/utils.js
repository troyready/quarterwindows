// These functions adapted from Put Window and are bound by the following license terms
// https://github.com/negesti/gnome-shell-extensions-negesti
// Copyright (c) 2011-2022 negesti
// Copyright (c) 2022 Troy Ready
//
// This program is free software; you can redistribute it and/or modify it under the terms of VERSION 3 of the GNU General Public License as published by the Free Software Foundation provided that the above copyright notice is included.
//
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. Go to http://www.gnu.org/licenses/gpl-3.0.html to get a copy of the license (or check the licence file)

let angleCorrection = 20;
let distanceCorrection = 10;

function findAndActivateNearestCandidate(candidates) {
  if (candidates.length == 0) return;

  candidates.sort(function (a, b) {
    // if the difference between distances is within the distance correction
    // value we will make our decision based on recent usage
    return Math.abs(a.dist - b.dist) <= distanceCorrection
      ? -1
      : a.dist - b.dist;
  });

  candidates[0].window.meta_window.activate(global.get_current_time());
}

function getDistance(focusWin, candidateWin) {
  let focus = getWindowCenter(focusWin.meta_window.get_frame_rect());
  let candidate = getWindowCenter(candidateWin.meta_window.get_frame_rect());

  let dx = focus.x - candidate.x;
  let dy = focus.y - candidate.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function getWindowCenter(windows_frame_rect) {
  return {
    x: windows_frame_rect.x + windows_frame_rect.width / 2,
    y: windows_frame_rect.y + windows_frame_rect.height / 2,
  };
}

function isFocusCandidate(focusWin, candidateWin, direction) {
  let focusRect = focusWin.meta_window.get_frame_rect();
  let focus = getWindowCenter(focusRect);

  let candidateRect = candidateWin.meta_window.get_frame_rect();
  let candidate = getWindowCenter(candidateRect);

  // a window is candidate if:
  // 1. the center of the candidate window is further in the direction you want
  //	to change to then the center of the focused window
  // 2. the edge of the candidate window is further in the direction you want
  //	to change to then the edge of the focused window
  // 3. the center of the candidate ist in a 90-ish° angle to the direction
  //	you want to change to from the center of the focused window

  switch (direction) {
    case "n":
      if (focus.y <= candidate.y) {
        return false;
      }
      if (focusRect.y <= candidateRect.y + distanceCorrection) {
        return false;
      }
      if (
        Math.abs(focus.y - candidate.y) + angleCorrection <
        Math.abs(focus.x - candidate.x)
      ) {
        return false;
      }
      return true;
    case "e":
      if (focus.x >= candidate.x) {
        return false;
      }
      if (
        focusRect.x + focusRect.width + distanceCorrection >=
        candidateRect.x + candidateRect.width
      ) {
        return false;
      }
      if (
        Math.abs(focus.y - candidate.y) >
        Math.abs(focus.x - candidate.x) + angleCorrection
      ) {
        return false;
      }
      return true;
    case "s":
      if (focus.y >= candidate.y) {
        return false;
      }
      if (
        focusRect.y + focusRect.height + distanceCorrection >=
        candidateRect.y + candidateRect.height
      ) {
        return false;
      }
      if (
        Math.abs(focus.y - candidate.y) + angleCorrection <
        Math.abs(focus.x - candidate.x)
      ) {
        return false;
      }
      return true;
    case "w":
      if (focus.x <= candidate.x + distanceCorrection) {
        return false;
      }
      if (focusRect.x <= candidateRect.x) {
        return false;
      }
      if (
        Math.abs(focus.y - candidate.y) >
        Math.abs(focus.x - candidate.x) + angleCorrection
      ) {
        return false;
      }
      return true;
    default:
      // in case of doubt: mumble
      return true;
  }
}
