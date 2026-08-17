/**
 * Novaria Social Number (NSN) & Novaria Resident Number (NRN) Generator & Validator
 *
 * Rules:
 * - 12 numeric digits total.
 * - First 11 digits generated securely / randomly.
 * - 12th digit is calculated using the Luhn (mod-10) algorithm.
 * - Format for display: XXXX-XXXX-XXXX.
 * - Dashes are not stored in database.
 * - Does NOT encode any citizen metadata (no DOB, sex, state, etc.).
 * - NSN and NRN belong to separate number series.
 */

/**
 * Calculates the Luhn mod-10 check digit for a string of numbers.
 */
export function calculateLuhnCheckDigit(numberString: string): number {
  const digits = numberString.replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  let isEven = true; // Processing right to left for check digit calculation

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }

  const remainder = sum % 10;
  return remainder === 0 ? 0 : 10 - remainder;
}

/**
 * Verifies if a 12-digit string passes the Luhn check algorithm.
 */
export function validateLuhnNumber(fullNumber: string): boolean {
  const clean = fullNumber.replace(/\D/g, '');
  if (clean.length !== 12) return false;

  const payload = clean.slice(0, 11);
  const actualCheckDigit = parseInt(clean.slice(11), 10);
  const expectedCheckDigit = calculateLuhnCheckDigit(payload);

  return actualCheckDigit === expectedCheckDigit;
}

/**
 * Generates a valid 12-digit NSN or NRN with a verified Luhn check digit.
 * Prefix convention:
 * - NSNs start with non-zero random digits (e.g. 10000000000 to 89999999999)
 * - NRNs use a distinct series (e.g. starting with 90000000000 to 99999999999)
 */
export function generateIdentityNumber(type: 'NSN' | 'NRN', existingNumbers: Set<string> = new Set()): string {
  let attempts = 0;
  while (attempts < 1000) {
    attempts++;
    let payload = '';

    if (type === 'NSN') {
      // First 11 digits: random number between 10000000000 and 89999999999
      const min = 10000000000;
      const max = 89999999999;
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      payload = num.toString();
    } else {
      // NRN series: starts with 9
      const min = 90000000000;
      const max = 99999999999;
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      payload = num.toString();
    }

    const checkDigit = calculateLuhnCheckDigit(payload);
    const fullNumber = `${payload}${checkDigit}`;

    if (!existingNumbers.has(fullNumber)) {
      return fullNumber;
    }
  }

  throw new Error('Failed to generate a unique NSN/NRN after 1000 attempts.');
}

/**
 * Formats a 12-digit string as XXXX-XXXX-XXXX.
 */
export function formatIdentityNumber(rawNumber: string): string {
  const clean = rawNumber.replace(/\D/g, '');
  if (clean.length !== 12) return rawNumber;
  return `${clean.slice(0, 4)}-${clean.slice(4, 8)}-${clean.slice(8, 12)}`;
}

/**
 * Masks an identity number for default UI display (e.g. ••••-••••-9050).
 */
export function maskIdentityNumber(rawNumber: string): string {
  const formatted = formatIdentityNumber(rawNumber);
  if (formatted.length < 14) return '••••-••••-••••';
  const lastFour = formatted.slice(-4);
  return `••••-••••-${lastFour}`;
}
