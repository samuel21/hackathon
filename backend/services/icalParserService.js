const ical = require('ical');

function parseIcal(icsData) {
  const parsedData = ical.parseICS(icsData);
  const events = [];

  for (const key in parsedData) {
    if (parsedData[key].type === 'VEVENT') {
      events.push({
        name: parsedData[key].summary,
        description: parsedData[key].description || '',
        start_time: parsedData[key].start.toISOString(),
        end_time: parsedData[key].end.toISOString(),
        category: 'work', // Default category or use logic to determine this
        priority: 'medium', // Default priority or use logic to determine this
        labels: '', // Default labels or use logic to determine this
        status: 'pending' // Default status or use logic to determine this
      });
    }
  }

  return events;
}

module.exports = parseIcal;
