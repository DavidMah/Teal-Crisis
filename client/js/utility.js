// utility.js
//
// This file is for utility functions, such as
// debugging logging

function debug_log(message) {
  if (DEBUG_MESSAGES_ENABLED) {
    console.log(message);
  }
}
