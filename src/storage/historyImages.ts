import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system/legacy';

/** Max longest edge for stored history thumbnails (px). */
const HISTORY_MAX_EDGE = 512;
/** JPEG quality 0–1; lower = smaller files. */
const HISTORY_JPEG_QUALITY = 0.72;

const HISTORY_DIR = `${FileSystem.documentDirectory ?? ''}history/`;

function historyFileUri(id: string): string {
  return `${HISTORY_DIR}${id}.jpg`;
}

function isManagedHistoryUri(uri: string): boolean {
  return uri.startsWith(HISTORY_DIR);
}

async function ensureHistoryDir(): Promise<void> {
  if (!FileSystem.documentDirectory) {
    throw new Error('Document directory is not available');
  }
  await FileSystem.makeDirectoryAsync(HISTORY_DIR, { intermediates: true });
}

/**
 * Resize, compress, and copy a scan image into app document storage.
 * Returns a stable file:// URI that survives app restarts.
 */
export async function persistHistoryImage(
  sourceUri: string,
  id: string,
): Promise<string> {
  await ensureHistoryDir();

  const ctx = ImageManipulator.manipulate(sourceUri);
  ctx.resize({ width: HISTORY_MAX_EDGE });
  const ref = await ctx.renderAsync();
  const saved = await ref.saveAsync({
    format: SaveFormat.JPEG,
    compress: HISTORY_JPEG_QUALITY,
  });

  const dest = historyFileUri(id);
  await FileSystem.copyAsync({ from: saved.uri, to: dest });
  return dest;
}

export async function deleteHistoryImage(imageUri: string): Promise<void> {
  if (!isManagedHistoryUri(imageUri)) return;
  try {
    const info = await FileSystem.getInfoAsync(imageUri);
    if (info.exists) {
      await FileSystem.deleteAsync(imageUri, { idempotent: true });
    }
  } catch {
    // Best-effort cleanup
  }
}

export async function clearAllHistoryImages(): Promise<void> {
  if (!FileSystem.documentDirectory) return;
  try {
    const info = await FileSystem.getInfoAsync(HISTORY_DIR);
    if (info.exists && info.isDirectory) {
      await FileSystem.deleteAsync(HISTORY_DIR, { idempotent: true });
    }
    await ensureHistoryDir();
  } catch {
    // Best-effort cleanup
  }
}
