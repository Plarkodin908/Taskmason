/**
 * Validates and sanitizes redirect URLs to prevent open redirects
 */
export const validateRedirectUrl = (url: string): string => {
  // If the URL is relative (starts with / but not //), it's safe
  if (url.startsWith('/') && !url.startsWith('//')) {
    return url;
  }

  try {
    // For absolute URLs, ensure they are within our domain
    const urlObj = new URL(url, window.location.origin);
    const isSameDomain = urlObj.hostname === window.location.hostname;
    
    if (isSameDomain) {
      return url;
    }
  } catch (e) {
    // Invalid URL, fall back to default
    console.error('Invalid redirect URL:', url);
  }

  // Default fallback if URL is invalid or external
  return '/dashboard';
}