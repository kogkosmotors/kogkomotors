const LOVABLE_ASSET_ORIGIN = "https://kogkomotors.lovable.app";

function googleDriveFileId(url: URL): string | null {
  const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  const directId = url.searchParams.get("id");
  if (directId) return directId;

  const foldersMatch = url.pathname.match(/\/d\/([^/]+)/);
  return foldersMatch?.[1] ?? null;
}

/**
 * Makes project CDN assets work on Vercel too. The asset JSON URLs are relative
 * to Lovable domains, so self-hosted deploys need the public Lovable origin.
 */
export function assetUrl(url: string): string {
  const value = url.trim();
  if (value.startsWith("/__l5e/")) return `${LOVABLE_ASSET_ORIGIN}${value}`;
  return value;
}

/**
 * Accepts normal direct image URLs plus common Google Drive share links.
 * Drive links must be shared as "Anyone with the link can view".
 */
export function imageUrl(url: string): string {
  const value = assetUrl(url);
  if (!value) return "";

  try {
    const parsed = new URL(value);

    if (parsed.hostname === "drive.google.com") {
      const id = googleDriveFileId(parsed);
      if (id) return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`;
    }

    if (parsed.hostname === "www.dropbox.com" || parsed.hostname === "dropbox.com") {
      parsed.hostname = "dl.dropboxusercontent.com";
      parsed.searchParams.delete("dl");
      return parsed.toString();
    }
  } catch {
    // Leave non-URL values untouched so normal browser behavior applies.
  }

  return value;
}
