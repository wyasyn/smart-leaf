/**
 * Bundled (offline) hero images for each disease class.
 *
 * These are shipped inside the app so the detail-screen hero never depends on
 * the network or on Wikimedia rate limits. The remote `image_urls` in
 * `disease_guide_data.ts` are still used for the secondary "More images"
 * gallery. Class 38 ("Not a Leaf") has no hero.
 *
 * Metro requires static `require()` literals, so each entry is listed explicitly.
 */
export const diseaseHeroImages: Record<string, number> = {
  '0': require('@/assets/images/diseases/0.jpg'),
  '1': require('@/assets/images/diseases/1.jpg'),
  '2': require('@/assets/images/diseases/2.jpg'),
  '3': require('@/assets/images/diseases/3.jpg'),
  '4': require('@/assets/images/diseases/4.jpg'),
  '5': require('@/assets/images/diseases/5.jpg'),
  '6': require('@/assets/images/diseases/6.jpg'),
  '7': require('@/assets/images/diseases/7.jpg'),
  '8': require('@/assets/images/diseases/8.jpg'),
  '9': require('@/assets/images/diseases/9.jpg'),
  '10': require('@/assets/images/diseases/10.jpg'),
  '11': require('@/assets/images/diseases/11.jpg'),
  '12': require('@/assets/images/diseases/12.jpg'),
  '13': require('@/assets/images/diseases/13.jpg'),
  '14': require('@/assets/images/diseases/14.jpg'),
  '15': require('@/assets/images/diseases/15.jpg'),
  '16': require('@/assets/images/diseases/16.jpg'),
  '17': require('@/assets/images/diseases/17.jpg'),
  '18': require('@/assets/images/diseases/18.jpg'),
  '19': require('@/assets/images/diseases/19.jpg'),
  '20': require('@/assets/images/diseases/20.jpg'),
  '21': require('@/assets/images/diseases/21.jpg'),
  '22': require('@/assets/images/diseases/22.jpg'),
  '23': require('@/assets/images/diseases/23.jpg'),
  '24': require('@/assets/images/diseases/24.jpg'),
  '25': require('@/assets/images/diseases/25.jpg'),
  '26': require('@/assets/images/diseases/26.jpg'),
  '27': require('@/assets/images/diseases/27.jpg'),
  '28': require('@/assets/images/diseases/28.jpg'),
  '29': require('@/assets/images/diseases/29.jpg'),
  '30': require('@/assets/images/diseases/30.jpg'),
  '31': require('@/assets/images/diseases/31.jpg'),
  '32': require('@/assets/images/diseases/32.jpg'),
  '33': require('@/assets/images/diseases/33.jpg'),
  '34': require('@/assets/images/diseases/34.jpg'),
  '35': require('@/assets/images/diseases/35.jpg'),
  '36': require('@/assets/images/diseases/36.jpg'),
  '37': require('@/assets/images/diseases/37.jpg'),
};

/** Local hero image (require id) for a class index, or undefined if none. */
export function getDiseaseHeroImage(classIndex: number): number | undefined {
  return diseaseHeroImages[String(classIndex)];
}
