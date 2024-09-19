const ical = require('ical');

function parseIcal(icsData) {
  const parsedData = ical.parseICS(icsData);
  const events = [];

  for (const key in parsedData) {
    if (parsedData[key].type === 'VEVENT') {
      const event = parsedData[key];

      events.push({
        name: event.summary,
        description: event.description || '',
        start_time: event.start.toISOString(),
        end_time: event.end.toISOString(),
        recurrenceRule: event.rrule ? event.rrule.toString() : '', // Convert to string if available
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
