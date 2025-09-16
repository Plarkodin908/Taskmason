/**
 * Validates and sanitizes image URLs to prevent XSS attacks
 */
export const sanitizeImageUrl = (url: string | undefined): string => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    // Only allow specific image file extensions
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExtension = allowedExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    );
    
    // Only allow http/https protocols
    const isValidProtocol = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    
    if (hasValidExtension && isValidProtocol) {
      return url;
    }
  } catch (e) {
    // Invalid URL, return empty string or default image
    console.error('Invalid image URL:', url);
  }
  
  // Return a default placeholder image URL if validation fails
  return '/placeholder.svg';
}