// utils.js
function getFormattedDate() {
    const currentDate = new Date();
    return currentDate.toISOString().replace(/[-:.TZ]/g, '');
  }
  
  module.exports = { getFormattedDate };