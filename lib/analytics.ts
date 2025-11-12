// Simple client-side analytics for tracking contact attempts
// This stores data in localStorage for now, can be integrated with a backend later

export interface ContactAttempt {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  service: string;
  message: string;
  source: string;
}

export const trackContactAttempt = (data: Omit<ContactAttempt, 'id' | 'timestamp' | 'source'>, source: string = 'website') => {
  const attempt: ContactAttempt = {
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    source,
    ...data
  };

  // Store in localStorage
  const existingAttempts = getContactAttempts();
  existingAttempts.push(attempt);
  
  // Keep only last 100 attempts to prevent localStorage bloat
  const recentAttempts = existingAttempts.slice(-100);
  localStorage.setItem('ai_engineer_labs_contacts', JSON.stringify(recentAttempts));

  // Log to console for debugging (remove in production)
  console.log('Contact attempt tracked:', attempt);

  return attempt;
};

export const getContactAttempts = (): ContactAttempt[] => {
  try {
    const stored = localStorage.getItem('ai_engineer_labs_contacts');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading contact attempts:', error);
    return [];
  }
};

export const clearContactAttempts = () => {
  localStorage.removeItem('ai_engineer_labs_contacts');
};

// Export data as CSV for easy import to spreadsheet
export const exportContactsAsCSV = () => {
  const contacts = getContactAttempts();
  if (contacts.length === 0) {
    alert('No contacts to export');
    return;
  }

  const headers = ['ID', 'Timestamp', 'Name', 'Email', 'Service', 'Message', 'Source'];
  const rows = contacts.map(c => [
    c.id,
    c.timestamp,
    c.name,
    c.email,
    c.service,
    c.message.replace(/\n/g, ' '),
    c.source
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai_engineer_labs_contacts_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
