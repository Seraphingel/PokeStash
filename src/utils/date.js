export function formatEventDateRange(start, end, type) {
  if (!start) return '';
  
  const formatDate = (dateStr) => {
    try {
      const [y, m, d] = dateStr.split('-');
      const dateObj = new Date(y, m - 1, d);
      return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch(e) {
      return dateStr;
    }
  };

  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : startFormatted;

  let timeString = '';
  const typeStr = (type || '').toLowerCase();
  
  if (typeStr.includes('spotlight')) {
    timeString = ' (6:00 PM - 7:00 PM Local Time)';
  } else if (typeStr.includes('raid-hour') || typeStr.includes('raid hour')) {
    timeString = ' (6:00 PM - 7:00 PM Local Time)';
  } else if (typeStr.includes('max-monday')) {
    timeString = ' (6:00 PM - 7:00 PM Local Time)';
  } else if (typeStr.includes('community-day') || typeStr.includes('community day')) {
    timeString = ' (2:00 PM - 5:00 PM Local Time)';
  } else if (typeStr.includes('raid-day') || typeStr.includes('raid day') || typeStr.includes('mega-raid-day')) {
    timeString = ' (2:00 PM - 5:00 PM Local Time)';
  } else if (typeStr === 'event') {
    // Only add default time to events if they are multi-day, otherwise it's just a placeholder, 
    // but the safest generic time for major events is 10:00 AM - 8:00 PM.
    timeString = ' (10:00 AM - 8:00 PM Local Time)';
  }

  // The user explicitly requested "September 17, 2026 - September 17, 2026" even for single day events
  return `${startFormatted} - ${endFormatted}${timeString}`;
}

export function formatUntilDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return 'Next Rotation';
  try {
    const parts = dateStr.split('-');
    if (parts.length >= 3) {
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const months = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 
        'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'
      ];
      if (m >= 1 && m <= 12 && !isNaN(d)) {
        return `Until ${months[m - 1]} ${d}`;
      }
    }
    return `Until ${dateStr}`;
  } catch (e) {
    return `Until ${dateStr}`;
  }
}

export function getSubtleRegionDisplay(regions) {
  if (!regions || !Array.isArray(regions) || regions.length === 0) return null;
  if (regions.length === 1) return regions[0];
  return `${regions[0]}...`;
}
