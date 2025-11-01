/**
 * Media Gallery Type System
 *
 * Zod schemas for image metadata validation at build time.
 * Makes illegal states unrepresentable: invalid data = build failure.
 */

import { z } from "zod";

/**
 * Image Schema
 *
 * Validates individual image metadata with strict constraints:
 * - type: Must be 'image' (discriminator for future extensibility)
 * - src: Must be /images/*.{jpg,jpeg,png,webp}
 * - alt: 10-200 chars (descriptive, not decorative)
 * - caption: 20-300 chars (1-2 sentences with context)
 * - width/height: Positive integers (for aspect ratio calculation)
 */
export const ImageSchema = z.object({
  type: z.literal("image"),
  src: z
    .string()
    .regex(
      /^\/images\/.+\.(jpg|jpeg|png|webp)$/,
      "Image src must be /images/... path ending in .jpg, .jpeg, .png, or .webp",
    ),
  alt: z
    .string()
    .min(
      10,
      "Alt text must be at least 10 characters (descriptive, not decorative)",
    )
    .max(200, "Alt text must be 200 characters or less"),
  caption: z
    .string()
    .min(
      20,
      "Caption must be at least 20 characters (1-2 sentences with context)",
    )
    .max(300, "Caption must be 300 characters or less"),
  width: z
    .number()
    .positive("Width must be positive")
    .int("Width must be an integer"),
  height: z
    .number()
    .positive("Height must be positive")
    .int("Height must be an integer"),
});

/**
 * Media Item Schema
 *
 * Currently only supports images. Type field allows future extensibility.
 */
export const MediaItemSchema = ImageSchema;

/**
 * Photo Schema (Backward Compatibility)
 *
 * @deprecated Use ImageSchema instead. Kept for backward compatibility.
 */
export const PhotoSchema = ImageSchema.omit({ type: true });

/**
 * Media Items Array Schema
 *
 * Validates array of media items (images + videos) with reasonable limits:
 * - Minimum 1 item (empty galleries fail build)
 * - Maximum 20 items (performance constraint)
 */
export const MediaItemsSchema = z
  .array(MediaItemSchema)
  .min(1, "Gallery must contain at least 1 media item")
  .max(20, "Gallery cannot exceed 20 media items (performance constraint)");

/**
 * Photos Array Schema (Backward Compatibility)
 *
 * @deprecated Use MediaItemsSchema instead. Kept for backward compatibility.
 */
export const PhotosSchema = z
  .array(PhotoSchema)
  .min(1, "Gallery must contain at least 1 photo")
  .max(20, "Gallery cannot exceed 20 photos (performance constraint)");

/**
 * Media Item Type (inferred from schema)
 *
 * Use this type in components instead of manually defining interface.
 * Stays in sync with schema automatically.
 */
export type MediaItem = z.infer<typeof MediaItemSchema>;

/**
 * Photo Type (inferred from schema)
 *
 * @deprecated Use MediaItem instead. Kept for backward compatibility.
 */
export type Photo = z.infer<typeof PhotoSchema>;

/**
 * Validate Media Items at Build Time
 *
 * Throws descriptive error if validation fails, causing build to fail fast.
 * Call this in Astro components before rendering gallery.
 *
 * @param data - Unknown data to validate (typically imported JSON)
 * @returns Validated array of MediaItem objects
 * @throws ZodError with detailed field-level error messages
 *
 * @example
 * ```typescript
 * import media from '@/data/statsbomb-media.json';
 * import { validateMediaItems } from '@/utils/gallery';
 *
 * try {
 *   const validatedMedia = validateMediaItems(media);
 * } catch (error) {
 *   throw new Error(`Invalid media data: ${error.message}`);
 * }
 * ```
 */
export function validateMediaItems(data: unknown): MediaItem[] {
  return MediaItemsSchema.parse(data);
}

/**
 * Validate Photos at Build Time
 *
 * @deprecated Use validateMediaItems instead. Kept for backward compatibility.
 */
export function validatePhotos(data: unknown): Photo[] {
  return PhotosSchema.parse(data);
}

/**
 * Gallery Configuration Schema
 *
 * Validates MediaGallery component props.
 */
export const GalleryConfigSchema = z.object({
  items: MediaItemsSchema,
  columns: z
    .union([z.literal(2), z.literal(3)])
    .optional()
    .default(3),
  variant: z.enum(["default", "compact"]).optional().default("default"),
});

export type GalleryConfig = z.infer<typeof GalleryConfigSchema>;
