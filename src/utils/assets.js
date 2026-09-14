export const getAssetUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const base = import.meta.env.BASE_URL || '/';
  
  if (path.startsWith(base)) return path;
  
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};
