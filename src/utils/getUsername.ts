export const getUsernameFromURL = (url: string): string => {
  try {
    const { hostname, pathname } = new URL(url);
    const pathParts = pathname.replace(/\/$/, '').split('/');
    let username = pathParts[pathParts.length - 1];
    if (hostname.includes('linkedin.com') && pathParts[1] === 'in') {
      username = pathParts[2] || username;
    }
    if (
      (hostname.includes('twitter.com') || hostname.includes('x.com')) &&
      pathParts[1]
    ) {
      username = pathParts[1];
    }
    if (hostname.includes('instagram.com') && pathParts[1]) {
      username = pathParts[1];
    }
    if (hostname.includes('github.com') && pathParts[1]) {
      username = pathParts[1];
    }
    if (hostname.includes('youtube.com')) {
      if (
        pathParts[1] === 'channel' ||
        pathParts[1] === 'user' ||
        pathParts[1] === 'c'
      ) {
        username = pathParts[2] || username;
      }
    }
    return username || '';
  } catch {
    return '';
  }
};