/**
 * Photo Gallery Type System
 *
 * Zod schemas for photo metadata validation at build time.
 * Makes illegal states unrepresentable: invalid data = build failure.
 */

import { z } from "zod";

/**
 * Photo Schema
 *
 * Validates individual photo metadata with strict constraints:
 * - src: Must be /images/*.{jpg,jpeg,png,webp}
 * - alt: 10-200 chars (descriptive, not decorative)
 * - caption: 20-300 chars (1-2 sentences with context)
 * - width/height: Positive integers (for aspect ratio calculation)
 */
export const PhotoSchema = z.object({
  src: z
    .string()
    .regex(
      /^\/images\/.+\.(jpg|jpeg|png|webp)$/,
      "Photo src must be /images/... path ending in .jpg, .jpeg, .png, or .webp",
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
 * Photos Array Schema
 *
 * Validates array of photos with reasonable limits:
 * - Minimum 1 photo (empty galleries fail build)
 * - Maximum 20 photos (performance constraint)
 */
export const PhotosSchema = z
  .array(PhotoSchema)
  .min(1, "Gallery must contain at least 1 photo")
  .max(20, "Gallery cannot exceed 20 photos (performance constraint)");

/**
 * Photo Type (inferred from schema)
 *
 * Use this type in components instead of manually defining interface.
 * Stays in sync with schema automatically.
 */
export type Photo = z.infer<typeof PhotoSchema>;

/**
 * Validate Photos at Build Time
 *
 * Throws descriptive error if validation fails, causing build to fail fast.
 * Call this in Astro components before rendering gallery.
 *
 * @param data - Unknown data to validate (typically imported JSON)
 * @returns Validated array of Photo objects
 * @throws ZodError with detailed field-level error messages
 *
 * @example
 * ```typescript
 * import photos from '@/data/statsbomb-photos.json';
 * import { validatePhotos } from '@/utils/gallery';
 *
 * try {
 *   const validatedPhotos = validatePhotos(photos);
 * } catch (error) {
 *   throw new Error(`Invalid photo data: ${error.message}`);
 * }
 * ```
 */
export function validatePhotos(data: unknown): Photo[] {
  return PhotosSchema.parse(data);
}

/**
 * Gallery Configuration Schema
 *
 * Validates PhotoGallery component props.
 */
export const GalleryConfigSchema = z.object({
  photos: PhotosSchema,
  columns: z
    .union([z.literal(2), z.literal(3)])
    .optional()
    .default(3),
  variant: z.enum(["default", "compact"]).optional().default("default"),
});

export type GalleryConfig = z.infer<typeof GalleryConfigSchema>;
