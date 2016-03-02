/**
 * @license RRSO.js v0.1
 * (c) 2016 Michał Kordulewski
 * License: GNU General Public License
 */

var RRSO = function() {};

// Rzeczywista Roczna Stopa Oproventowania (RRSO)
RRSO.prototype.RRSO = function(cashflow) {
  var error = "ERROR";
  try {
    if (typeof cashflow !== "object" || cashflow.length === 0 || cashflow.length === 1 || typeof cashflow[0] === "undefined") {
      throw error;
    }
    var bestGuess = -1, currentNPV;
    for (rate = 0.00; rate <= 50000; rate += 0.01) {
      var npv = 0;
      // base case
      for (var i = 0; i < cashflow.length; i++) {
        if (typeof cashflow[i].period !== "number" || typeof cashflow[i].amount !== "number") {
          throw error;
        }
        npv +=(cashflow[i].amount / Math.pow((1 + rate/100), cashflow[i].period));
      }
      currentNPV = Math.round(npv * 100) / 100;
      if (currentNPV <= 0) {
        bestGuess = rate;
        if (bestGuess == -1 || bestGuess <= 0) {
          return "RRSO znajduje się poza zakresem dopuszczalnych obliczeń";
        }
        return Math.round(bestGuess * 100) / 100;
      }
    }
    if (bestGuess == -1 || bestGuess <= 0) {
      return "RRSO znajduje się poza zakresem dopuszczalnych obliczeń";
    }
    return Math.round(bestGuess * 100) / 100;
  } catch(err) {
    return error;
  }
};