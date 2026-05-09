/**
 * Honeypot field utility for spam prevention
 * Creates a hidden form field that bots will fill but humans won't see
 */

export function createHoneypotField(): string {
  // Generate a random field name to avoid detection
  const fieldNames = ['website', 'url', 'homepage', 'company_site', 'business_url'];
  return fieldNames[Math.floor(Math.random() * fieldNames.length)];
}

export function getHoneypotFieldName(): string {
  // Use a consistent name for the honeypot field
  return 'website_url';
}

export function renderHoneypotField(): string {
  const fieldName = getHoneypotFieldName();
  return `
    <input 
      type="text" 
      name="${fieldName}" 
      style="display:none;position:absolute;left:-9999px;" 
      tabindex="-1" 
      autocomplete="off"
      aria-hidden="true"
    />
  `;
}
