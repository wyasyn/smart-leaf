/**
 * The dedicated out-of-distribution class produced by the retrained model.
 * `NOT_A_LEAF_LABEL` is the class-name string (index 38 in the 39-class model);
 * `NOT_A_LEAF_VERDICT` is the user-facing verdict the app renders for it.
 *
 * Everything keys off these strings rather than a hardcoded index, so the
 * rejection UI stays inert on the current 38-class model and activates
 * automatically once class_names.json gains the "Not_A_Leaf" entry.
 */
export const NOT_A_LEAF_LABEL = 'Not_A_Leaf';
export const NOT_A_LEAF_VERDICT = 'Not a leaf';

export const NOT_A_LEAF_MESSAGE =
  "This doesn't look like a leaf. Point the camera at a single plant leaf.";
