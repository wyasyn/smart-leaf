/**
 * Disease guide content for the Smart Leaf model classes.
 *
 * Keyed by the model class index (see `assets/models/class_names.json`).
 * Content is written for a Ugandan smallholder / extension audience: pathogen
 * facts are globally accurate, while `md.favorable` and `md.uganda_notes` tie
 * each disease to local agro-ecological zones, rainfall seasons, varieties and
 * inputs commonly found in Ugandan agrovet shops.
 *
 * The long-form fields under `md` are Markdown strings rendered by
 * `src/components/common/Markdown.tsx`. An empty string hides that section.
 */

export type DiseaseMarkdown = {
  /** What it is, the pathogen, and why it matters. */
  overview: string;
  /** What to look for, staged early -> late. */
  symptoms: string;
  /** Conditions (climate / season) that drive outbreaks. */
  favorable: string;
  /** Cultural + chemical control, with locally available products. */
  management: string;
  /** Resistant varieties, rotation, spacing, sanitation. */
  prevention: string;
  /** Uganda-specific zones, seasons, varieties, extension guidance. */
  uganda_notes: string;
};

export type DiseaseGuideEntry = {
  disease_name: string | null;
  common_names: string[];
  crop: string;
  /** Pathogen binomial, e.g. "Venturia inaequalis". Null for healthy / non-leaf. */
  scientific_name: string | null;
  /** Fungal | Bacterial | Viral | Pest | Oomycete | None. */
  type: string;
  cause: string | null;
  /** Low | Medium | High | Very High. */
  risk_level: string;
  /** Short plain-text summary used on cards and scan results. */
  description: string;
  /** Hero image first, then gallery. Stable Wikimedia / extension URLs. */
  image_urls: string[];
  external_resources: { title: string; url: string }[];
  md: DiseaseMarkdown;
};

export const diseaseGuideData: Record<string, DiseaseGuideEntry> = {
  '0': {
    disease_name: 'Apple Scab',
    common_names: ['Apple scab', 'Black spot'],
    crop: 'Apple',
    scientific_name: 'Venturia inaequalis',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease that produces olive-green to black velvety spots on apple leaves and fruit, causing premature leaf drop and scabby, cracked fruit.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Apple_fruits_scab.jpg/960px-Apple_fruits_scab.jpg',
      'https://extension.umn.edu/sites/extension.umn.edu/files/styles/caption_medium/public/Apple-scab-advanced-leaves-Grabowski.jpg?itok=T4Qvttai',
    ],
    external_resources: [
      { title: 'Apple scab — Wikipedia', url: 'https://en.wikipedia.org/wiki/Apple_scab' },
      { title: 'Apple scab — UMN Extension', url: 'https://extension.umn.edu/plant-diseases/apple-scab' },
    ],
    md: {
      overview: `Apple scab is the most important fungal disease of apple worldwide. It is caused by **_Venturia inaequalis_**, which overwinters in fallen leaves and releases spores during wet spring weather. These spores infect young leaves and fruit, leaving rough, corky "scabs" that lower fruit quality and weaken the tree.`,
      symptoms: `- **Leaves:** olive-green to brown velvety spots, often along veins; spots later turn dark and the leaf yellows and drops early.
- **Fruit:** dark, scabby, corky lesions that crack the skin; badly infected fruit is deformed and unmarketable.
- Heavy infection causes **early defoliation**, which weakens the tree and reduces the next season's crop.`,
      favorable: `The fungus needs **prolonged leaf wetness** and mild temperatures (16–24 °C). Infection peaks during rainy, humid weather in spring and early summer. Dense, poorly pruned canopies that stay wet are at highest risk.`,
      management: `- **Sanitation:** rake up and burn or bury fallen leaves at the end of the season to remove the overwintering source.
- **Pruning:** open up the canopy so leaves dry quickly after rain or dew.
- **Fungicides:** protectant sprays of **mancozeb (e.g. Dithane M-45)** or **captan**, or systemic **myclobutanil**, starting at bud-break and repeating every 7–10 days during wet periods.
- Remove and destroy scabbed fruit and prunings.`,
      prevention: `- Plant **scab-resistant varieties** where available.
- Space trees for good airflow and avoid overhead irrigation.
- Keep trees vigorous but not over-fertilised with nitrogen (soft growth is more susceptible).`,
      uganda_notes: `> Apples are a **minor, high-altitude crop** in Uganda, grown mainly in the cool highlands of **Kigezi (Kabale, Kisoro)** and parts of **Mt Elgon**. Because these zones are cool and wet, scab pressure can be high.

Source low-chill apple varieties through **NARO / Operation Wealth Creation** nurseries, prune for airflow, and use mancozeb or copper from agrovet shops during the two rainy seasons (**March–May** and **September–November**).`,
    },
  },

  '1': {
    disease_name: 'Black Rot',
    common_names: ['Apple black rot', 'Frogeye leaf spot'],
    crop: 'Apple',
    scientific_name: 'Botryosphaeria obtusa',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal disease causing circular "frogeye" leaf spots, fruit rot, and cankers on apple branches, with fruit shrivelling into black mummies.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Botryosphaeria_obtusa.jpg/960px-Botryosphaeria_obtusa.jpg',
    ],
    external_resources: [
      { title: 'Black rot — Wikipedia', url: 'https://en.wikipedia.org/wiki/Black_rot' },
    ],
    md: {
      overview: `Black rot is caused by the fungus **_Botryosphaeria obtusa_**. It attacks **leaves, fruit and bark**, and survives in dead wood, cankers and mummified fruit left on the tree or ground. Stressed or injured trees are most vulnerable.`,
      symptoms: `- **Leaves:** small purple specks that enlarge into circular tan spots with purple margins — the classic **"frogeye" leaf spot**.
- **Fruit:** firm brown rot, often starting at the blossom end, with concentric rings; fruit shrivels into a hard black **mummy**.
- **Branches:** sunken, reddish-brown **cankers** that can girdle and kill limbs.`,
      favorable: `Warm, wet weather favours infection. **Dead wood, cankers and mummified fruit** are the main sources of spores, so neglected, injured or sun-scalded trees are at greatest risk.`,
      management: `- **Prune out** cankered and dead wood well below the infection and burn it.
- Remove and destroy **mummified fruit** from the tree and ground.
- Sanitise pruning tools between cuts.
- Apply **mancozeb** or **captan** fungicides from early season, especially where black rot has occurred before.`,
      prevention: `- Keep trees healthy and avoid bark injuries and sun-scald.
- Practise good orchard sanitation each season.
- Maintain an open canopy for fast drying.`,
      uganda_notes: `> Relevant only in Uganda's small **highland apple plots** (Kigezi, Mt Elgon).

Because the fungus lives in dead wood, the most effective local control is **regular pruning and burning of prunings and mummified fruit** — a low-cost practice that needs no inputs.`,
    },
  },

  '2': {
    disease_name: 'Cedar Apple Rust',
    common_names: ['Cedar rust', 'Cedar-apple rust'],
    crop: 'Apple',
    scientific_name: 'Gymnosporangium juniperi-virginianae',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal rust that needs both apple and juniper/cedar hosts. It produces bright orange-yellow spots on apple leaves and fruit.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Cedar-apple_rust_2.jpg/960px-Cedar-apple_rust_2.jpg',
    ],
    external_resources: [
      { title: 'Cedar-apple rust — Wikipedia', url: 'https://en.wikipedia.org/wiki/Cedar-apple_rust' },
    ],
    md: {
      overview: `Cedar apple rust is caused by **_Gymnosporangium juniperi-virginianae_**, a rust fungus with an unusual life cycle: it needs **two hosts**, apple (or crabapple) and juniper/red cedar. Spores from galls on junipers infect apple leaves in spring; later, spores from apple return to junipers.`,
      symptoms: `- **Leaves:** bright **yellow-orange spots** on the upper surface, often with tiny black dots; tube-like structures form underneath.
- **Fruit:** orange lesions, distortion and early drop.
- On junipers: brown woody **galls** that swell into bright orange gelatinous "horns" when wet.`,
      favorable: `Spring rains trigger the orange spore horns on junipers. Infection of apple needs **wet leaves** and moderate temperatures. Risk is highest where apples and junipers/cedars grow close together.`,
      management: `- **Separate the two hosts:** remove nearby junipers/cedars where practical, or break their galls before they release spores.
- Apply protectant fungicides such as **mancozeb** or **myclobutanil** from pink-bud through early fruit development in wet springs.
- Remove heavily infected leaves.`,
      prevention: `- Plant **rust-resistant apple varieties**.
- Avoid planting apples next to ornamental junipers/cedars.
- Maintain airflow and good tree vigour.`,
      uganda_notes: `> Cedar apple rust is **rare in Uganda** because it depends on juniper/cedar hosts that are uncommon near the few highland apple plots.

If ornamental conifers are grown nearby, **keep apples well away from them**. No routine spraying is usually needed locally.`,
    },
  },

  '3': {
    disease_name: null,
    common_names: [],
    crop: 'Apple',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy apple leaf — no disease detected. Keep up good orchard practices.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/960px-Pink_lady_and_cross_section.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This leaf looks healthy — green, evenly coloured, with no spots, lesions or distortion. Healthy foliage is the foundation of a productive apple tree.`,
      symptoms: `A healthy apple leaf shows:
- Uniform green colour with no spots or yellowing.
- Flat, undistorted shape with no curling or scabbing.
- No powdery growth, rust pustules or webbing.`,
      favorable: ``,
      management: `Keep the tree healthy:
- Inspect leaves weekly, especially during the rains.
- Prune for an open canopy and good airflow.
- Water at the base and avoid wetting foliage.`,
      prevention: `- Maintain balanced nutrition (avoid excess nitrogen).
- Remove fallen leaves and prunings each season.
- A light **preventive fungicide** (e.g. mancozeb) once a month in wet weather only if scab or rust has occurred before.`,
      uganda_notes: `> Keep monitoring during Uganda's two rainy seasons (**March–May**, **September–November**), when most apple diseases appear in the highlands.`,
    },
  },

  '4': {
    disease_name: null,
    common_names: [],
    crop: 'Blueberry',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy blueberry leaf — no disease detected. Maintain good cultural practices.',
    image_urls: ['https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg'],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This blueberry leaf appears healthy, with even green colour and no spots or distortion.`,
      symptoms: `A healthy blueberry leaf shows:
- Smooth green surface free of spots or blotches.
- No reddening (except natural autumn colour), curling or wilting.
- No powdery or rusty growth.`,
      favorable: ``,
      management: `- Inspect bushes regularly and mulch to keep roots cool and moist.
- Maintain **acidic soil** (blueberries need low pH) for vigour.
- Water at the base; avoid prolonged leaf wetness.`,
      prevention: `- Prune out old, weak canes to improve airflow.
- Remove fallen leaves and debris.
- Keep plants well-nourished to resist stress.`,
      uganda_notes: `> Blueberries are a **niche, emerging crop** in Uganda's cooler highlands. Focus on **acidic, well-drained soil and mulching**, which matter more than spraying for keeping plants healthy.`,
    },
  },

  '5': {
    disease_name: 'Powdery Mildew',
    common_names: ['Cherry powdery mildew'],
    crop: 'Cherry (including sour)',
    scientific_name: 'Podosphaera clandestina',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal disease coating cherry leaves and shoots with white powdery growth, distorting young leaves and reducing fruit quality.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Powdery_mildew_9.jpg/960px-Powdery_mildew_9.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Oak_Mildew.JPG/960px-Oak_Mildew.JPG',
    ],
    external_resources: [
      { title: 'Powdery mildew — Wikipedia', url: 'https://en.wikipedia.org/wiki/Powdery_mildew' },
    ],
    md: {
      overview: `Cherry powdery mildew is caused by **_Podosphaera clandestina_**. Unlike most fungi, powdery mildews thrive in **warm, dry weather with high humidity** and do not need leaf wetness to infect. White powdery colonies grow on leaves, shoots and sometimes fruit.`,
      symptoms: `- **White to grey powdery patches** on leaves and young shoots.
- Young leaves **curl, pucker and distort**; growth is stunted.
- On fruit, infection causes blemishes and reduced quality.`,
      favorable: `Warm days (**20–27 °C**), high humidity, shade and dense canopies favour the disease. Vigorous, soft new growth from heavy nitrogen or irrigation is especially susceptible.`,
      management: `- **Prune** infected shoots and open the canopy for airflow and light.
- Apply **sulfur**, **potassium bicarbonate** or systemic **myclobutanil**, repeating every 7–14 days during an outbreak.
- Avoid excess nitrogen that produces soft, susceptible growth.`,
      prevention: `- Plant in **sunny, well-ventilated** sites; avoid shaded, crowded spots.
- Use resistant rootstocks/varieties where available.
- Avoid overhead irrigation late in the day.`,
      uganda_notes: `> Cherries are grown only in small numbers in Uganda's **cool highlands**.

Because powdery mildew does **not** need rain, it can appear even in drier spells. **Sulfur dust** is a cheap, widely available control in local agrovet shops.`,
    },
  },

  '6': {
    disease_name: null,
    common_names: [],
    crop: 'Cherry (including sour)',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy cherry leaf — no disease detected. Keep pruning and sanitation up.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Cherry_season_%2848216568227%29.jpg/960px-Cherry_season_%2848216568227%29.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This cherry leaf is healthy — green and undistorted, with no powdery growth or spots.`,
      symptoms: `A healthy cherry leaf shows:
- Even green colour with no white powder or coloured spots.
- Flat, undistorted blade with no curling.
- No holes, scorching or webbing.`,
      favorable: ``,
      management: `- Prune yearly for an open, airy canopy.
- Remove fallen leaves and fruit to reduce disease carry-over.
- Provide balanced fertilisation for tree vigour.`,
      prevention: `- Space trees properly for airflow.
- Monitor during warm, humid spells for early powdery mildew.
- Avoid overhead watering.`,
      uganda_notes: `> In Uganda's highland cherry plots, **good spacing and pruning** are the simplest ways to keep foliage healthy.`,
    },
  },

  '7': {
    disease_name: 'Gray Leaf Spot',
    common_names: ['Cercospora leaf spot', 'Gray leaf spot', 'GLS'],
    crop: 'Corn (maize)',
    scientific_name: 'Cercospora zeae-maydis',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of maize producing long, rectangular grey-to-tan lesions bounded by leaf veins, which can blight whole leaves and cut yield.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/1/12/Gray_leaf_spot_Cercospora_zeae-maydis_5465607.png',
    ],
    external_resources: [
      { title: 'Corn grey leaf spot — Wikipedia', url: 'https://en.wikipedia.org/wiki/Corn_grey_leaf_spot' },
    ],
    md: {
      overview: `Gray leaf spot (GLS) is caused by **_Cercospora zeae-maydis_** and is one of the most damaging foliar diseases of maize. It survives on **maize residue** left on the soil surface, so continuous maize and minimum tillage increase risk. Severe blighting before grain fill can cause large yield losses.`,
      symptoms: `- Early: small, pinpoint tan spots with yellow halos.
- Later: **long, narrow, rectangular grey-to-tan lesions** that are sharply limited by the leaf veins (giving them straight, "blocky" edges).
- Lesions merge and **blight whole leaves**, drying the canopy from the lower leaves upward.`,
      favorable: `**High humidity, heavy dews and warm temperatures (25–30 °C)** drive GLS. Risk is highest in **continuous maize** with crop residue on the surface and in dense, sheltered fields.`,
      management: `- **Rotate** away from maize and bury/manage residue to reduce the spore source.
- Grow **resistant or tolerant hybrids** — the most cost-effective control.
- Where intensive, apply a **strobilurin or triazole** fungicide if disease appears before tasselling, repeating per label.
- Scout lower leaves from the mid-vegetative stage onward.`,
      prevention: `- Avoid continuous maize on the same plot.
- Choose tolerant varieties suited to your altitude.
- Space and weed well to reduce humidity in the canopy.`,
      uganda_notes: `> GLS is **widespread in Uganda's mid-altitude maize zones** (e.g. the central, western and eastern maize belts) where humidity and dews are high.

For most smallholders, **crop rotation, residue management and tolerant varieties (sourced from NARO/registered seed companies)** are far more practical than spraying. Avoid recycling grain as seed.`,
    },
  },

  '8': {
    disease_name: 'Common Rust',
    common_names: ['Corn rust', 'Common rust of maize'],
    crop: 'Corn (maize)',
    scientific_name: 'Puccinia sorghi',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal rust of maize producing reddish-brown, powdery pustules on both leaf surfaces that can yellow and dry leaves under heavy pressure.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/5/5a/Puccinia_sorghi_Schwein._1538032.jpg',
    ],
    external_resources: [
      { title: 'Puccinia sorghi — Wikipedia', url: 'https://en.wikipedia.org/wiki/Puccinia_sorghi' },
    ],
    md: {
      overview: `Common rust is caused by **_Puccinia sorghi_**. Its spores are carried long distances by wind, so the disease can appear without local residue. Light infections are cosmetic, but heavy, early infection can reduce yield.`,
      symptoms: `- Small, round to elongated **reddish-brown powdery pustules** on **both** the upper and lower leaf surfaces.
- Pustules **rupture**, releasing rusty spores that rub off on the hand.
- Under heavy pressure, leaves yellow and dry prematurely.`,
      favorable: `**Cool to moderate temperatures (16–25 °C)** with high humidity and heavy dews favour common rust — conditions common at **higher altitudes** and in the cooler rainy season.`,
      management: `- Grow **resistant hybrids** — the primary control.
- Most crops need **no spraying**; under severe early infection, **azoxystrobin** or **propiconazole** can be used.
- Remove volunteer maize and heavy residue.`,
      prevention: `- Plant tolerant varieties suited to your altitude.
- Plant early to escape peak rust periods where possible.
- Maintain good plant vigour and spacing.`,
      uganda_notes: `> Common rust is **frequent but usually mild** in Uganda, especially in **cooler high-altitude maize** (e.g. parts of Kigezi and Mt Elgon).

It rarely justifies fungicide on smallholder maize — **tolerant varieties and good agronomy** are enough in most seasons.`,
    },
  },

  '9': {
    disease_name: 'Northern Leaf Blight',
    common_names: ['Northern corn leaf blight', 'Turcicum leaf blight', 'NLB'],
    crop: 'Corn (maize)',
    scientific_name: 'Exserohilum turcicum',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of maize causing long, cigar-shaped grey-green lesions that blight leaves and reduce grain fill, especially in cool, humid weather.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Northern_corn_leaf_blight.JPG/960px-Northern_corn_leaf_blight.JPG',
    ],
    external_resources: [
      { title: 'Northern corn leaf blight — Wikipedia', url: 'https://en.wikipedia.org/wiki/Northern_corn_leaf_blight' },
    ],
    md: {
      overview: `Northern leaf blight (NLB), caused by **_Exserohilum turcicum_**, is a major foliar disease of maize in cool, humid highlands. It survives on **maize residue** and spreads by wind and rain splash. Blighting before and during grain fill steals the leaf area the plant needs to fill the cob.`,
      symptoms: `- Long, **cigar-shaped (elliptical) grey-green to tan lesions**, typically 3–15 cm long.
- Lesions start on lower leaves and spread upward; many lesions give the crop a **scorched, blighted** look.
- Severe blight before grain fill causes **poor cob filling** and yield loss.`,
      favorable: `**Moderate temperatures (18–27 °C) with heavy dew, high humidity and frequent rain** are ideal — typical of Uganda's cooler, wetter maize zones. Continuous maize and surface residue increase risk.`,
      management: `- Grow **resistant/tolerant hybrids** — the most effective and economical control.
- **Rotate** away from maize and manage residue.
- Where intensive, apply a **triazole (e.g. propiconazole)** or **strobilurin (e.g. pyraclostrobin)** if lesions appear before tasselling.`,
      prevention: `- Avoid continuous maize; rotate with legumes.
- Choose tolerant varieties for your altitude.
- Plough in or remove infected residue after harvest.`,
      uganda_notes: `> NLB is a **key constraint in Uganda's cool, high-rainfall maize areas** (highlands and parts of the western and eastern belts).

Use **certified tolerant seed** and **rotate with beans, groundnuts or soybean**. These rotations also fit common Ugandan cropping systems and improve soil fertility.`,
    },
  },

  '10': {
    disease_name: null,
    common_names: [],
    crop: 'Corn (maize)',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy maize leaf — no disease detected. Keep up good agronomy and rotation.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Starr_060916-8827_Zea_mays.jpg/960px-Starr_060916-8827_Zea_mays.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This maize leaf is healthy — broad, green and unblemished, with no lesions, pustules or blighting.`,
      symptoms: `A healthy maize leaf shows:
- Uniform green colour from base to tip.
- No grey rectangular spots, cigar-shaped lesions or rusty pustules.
- No yellowing, streaking or drying.`,
      favorable: ``,
      management: `- Scout fields weekly from the knee-high stage, checking lower leaves.
- Keep fields weed-free and well-spaced to reduce humidity.
- Ensure balanced nutrition (especially nitrogen) for vigour.`,
      prevention: `- **Rotate** maize with legumes (beans, soybean, groundnuts).
- Use **certified, tolerant seed** rather than recycled grain.
- Manage residue after harvest.`,
      uganda_notes: `> Healthy maize is the goal across Uganda's maize belts. **Certified seed + rotation + good spacing** prevent most of the leaf diseases (GLS, NLB, rust) seen locally.`,
    },
  },

  '11': {
    disease_name: 'Black Rot',
    common_names: ['Grape black rot'],
    crop: 'Grape',
    scientific_name: 'Guignardia bidwellii',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of grapevine causing tan leaf spots and, most damagingly, rotting berries that shrivel into hard black mummies.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/28/Guignardia_bidwellii_04.jpg',
    ],
    external_resources: [
      { title: 'Black rot (grape) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Black_rot_(grape_disease)' },
    ],
    md: {
      overview: `Grape black rot is caused by **_Guignardia bidwellii_**. It attacks all green parts of the vine but is most destructive on **fruit**, which can be completely lost. The fungus overwinters in **mummified berries and infected canes**.`,
      symptoms: `- **Leaves:** small tan to brown circular spots with dark borders; tiny black dots (fruiting bodies) form in the centre.
- **Fruit:** a small whitish spot that rots the whole berry within days; the berry then **shrivels into a hard, black, wrinkled mummy**.
- Lesions also appear on shoots and tendrils.`,
      favorable: `Warm, wet weather (**24–27 °C with rain**) during the period from bloom to fruit set is the most dangerous. **Mummified berries** left on the vine or ground are the main spore source.`,
      management: `- **Remove and destroy mummified berries** and infected canes during pruning — the single most important step.
- Open the canopy for airflow and fast drying.
- Apply **mancozeb** or **myclobutanil** from early shoot growth through fruit set, repeating every 7–10 days in wet weather.`,
      prevention: `- Use **resistant cultivars** where available.
- Train and prune for an open, airy canopy.
- Use drip rather than overhead irrigation.`,
      uganda_notes: `> Grapes are a **minor crop** in Uganda, grown in small vineyards and gardens.

In Uganda's warm, wet conditions black rot pressure can be high, so **sanitation (removing mummies) plus canopy management** is essential; mancozeb is widely available locally if spraying is needed.`,
    },
  },

  '12': {
    disease_name: 'Esca (Black Measles)',
    common_names: ['Esca', 'Black measles'],
    crop: 'Grape',
    scientific_name: 'Phaeomoniella chlamydospora (and Phaeoacremonium spp.)',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A complex trunk disease of grapevine causing "tiger-stripe" leaf patterns, black spotting on berries, and sudden vine collapse.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/ESCA_Blattsymptom_1.JPG/960px-ESCA_Blattsymptom_1.JPG',
    ],
    external_resources: [
      { title: 'Esca (grape disease) — Wikipedia', url: 'https://en.wikipedia.org/wiki/Esca_(grape_disease)' },
    ],
    md: {
      overview: `Esca is a **grapevine trunk disease** caused by a complex of wood-invading fungi (including **_Phaeomoniella chlamydospora_** and _Phaeoacremonium_ species). They enter through **pruning wounds** and decay the wood from inside, so there is **no chemical cure**.`,
      symptoms: `- **Leaves:** yellow or red bands between the veins that dry to brown, leaving a green "tiger-stripe" pattern.
- **Berries:** small dark spots or "measles" speckling; fruit may fail to ripen.
- **Vine:** in the acute form, the whole vine can **wilt and collapse suddenly** in mid–late summer; cut trunks show dark streaks and rot.`,
      favorable: `Infection occurs mainly through **fresh pruning wounds**, especially when pruning during wet weather. Older, stressed vines are most affected.`,
      management: `- **No effective spray cure.** Remove and destroy severely affected vines.
- **Prune in dry weather** and apply **wound protectants/sealants** to large cuts.
- **Sterilise pruning tools** between vines.
- Keep vines unstressed (good water and nutrition).`,
      prevention: `- Use **clean, certified planting material**.
- Make pruning cuts in dry conditions and protect wounds.
- Avoid large pruning wounds where possible.`,
      uganda_notes: `> A risk wherever grapes are pruned, including Uganda's small vineyards.

The key local practice is **dry-season pruning with disinfected tools and wound protection** — there is no rescue spray once the wood is infected.`,
    },
  },

  '13': {
    disease_name: 'Leaf Blight (Isariopsis Leaf Spot)',
    common_names: ['Isariopsis leaf spot', 'Grape leaf blight'],
    crop: 'Grape',
    scientific_name: 'Pseudocercospora vitis',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal leaf disease of grapevine causing angular brown-to-black spots that lead to leaf yellowing and premature defoliation.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/960px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg',
    ],
    external_resources: [
      { title: 'Grape diseases — Wikipedia', url: 'https://en.wikipedia.org/wiki/List_of_grape_diseases' },
    ],
    md: {
      overview: `Isariopsis leaf spot (leaf blight) is caused by **_Pseudocercospora vitis_** (formerly _Isariopsis clavispora_). It mainly damages **leaves**, and heavy infection causes early leaf drop that weakens the vine and reduces fruit ripening.`,
      symptoms: `- **Angular brown to black spots** on leaves, often bounded by veins.
- Spots enlarge and merge; the leaf **yellows and drops early**.
- Defoliation exposes fruit and reduces vine vigour.`,
      favorable: `**Warm, wet, humid weather** with frequent rain and dense, poorly ventilated canopies favours the disease, especially later in the season.`,
      management: `- Improve canopy airflow through **trellising and pruning**.
- Remove and destroy fallen leaves.
- Apply **mancozeb** or **copper-based** fungicides during wet weather, repeating every 10–14 days.`,
      prevention: `- Space and trellis vines for good airflow.
- Avoid overhead irrigation.
- Maintain vine vigour and sanitation.`,
      uganda_notes: `> Relevant to Uganda's small grape plantings, where **warm, humid rains** favour leaf blights.

**Trellising and airflow** plus copper or mancozeb from agrovet shops are the practical local controls.`,
    },
  },

  '14': {
    disease_name: null,
    common_names: [],
    crop: 'Grape',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy grape leaf — no disease detected. Keep canopy open and dry.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/960px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This grape leaf is healthy — green and intact, with no spots, mummified berries or tiger-stripe patterns nearby.`,
      symptoms: `A healthy grape leaf shows:
- Even green colour with no angular or circular spots.
- No yellowing between the veins or marginal browning.
- No powdery growth or downy patches underneath.`,
      favorable: ``,
      management: `- Train vines on a **trellis** and prune for an open canopy.
- Remove fallen leaves and any mummified berries.
- Use drip irrigation; keep foliage dry.`,
      prevention: `- Apply a preventive **copper or mancozeb** spray during prolonged wet weather only if disease has occurred before.
- Monitor canopy humidity and airflow.`,
      uganda_notes: `> In Uganda's warm, humid climate, **canopy management and dry foliage** are the most important habits for keeping vines healthy.`,
    },
  },

  '15': {
    disease_name: 'Huanglongbing (Citrus Greening)',
    common_names: ['Citrus greening', 'HLB', 'Yellow dragon disease'],
    crop: 'Orange',
    scientific_name: 'Candidatus Liberibacter spp.',
    type: 'Bacterial',
    cause: 'Bacterial',
    risk_level: 'Very High',
    description:
      'An incurable bacterial disease spread by psyllids. It causes blotchy leaf mottling, yellow shoots, small lopsided bitter fruit, and tree decline.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Huanglongbing.jpg',
    ],
    external_resources: [
      { title: 'Citrus greening disease — Wikipedia', url: 'https://en.wikipedia.org/wiki/Citrus_greening_disease' },
    ],
    md: {
      overview: `Huanglongbing (HLB), or citrus greening, is the **most destructive citrus disease in the world**. It is caused by phloem-living **_Candidatus_ Liberibacter** bacteria and spread by **psyllid insects**. There is **no cure** — infected trees decline and die, and the disease can devastate whole orchards.`,
      symptoms: `- **Blotchy, asymmetric yellow mottling** of leaves (the pattern does not match on the two sides of the midrib).
- **Yellow shoots** standing out in the canopy.
- **Small, lopsided, hard fruit** that stays green at the bottom and tastes **bitter/salty**; seeds abort.
- Twig dieback and overall tree decline.`,
      favorable: `Spread depends on **psyllid vectors**. In Africa the main vector is the **African citrus psyllid (_Trioza erytreae_)**, favoured by cool, moist highland conditions; the Asian psyllid (_Diaphorina citri_) also spreads it. Movement of **infected nursery seedlings** spreads it long distances.`,
      management: `- **There is no cure.** **Remove and destroy infected trees** promptly to protect the rest.
- **Control psyllids** with insecticides and by encouraging natural enemies.
- Plant only **certified, disease-free seedlings**.
- Keep trees vigorous (water, nutrition) to slow decline.`,
      prevention: `- Buy seedlings only from **certified, clean nurseries** — never unknown roadside stock.
- Scout regularly for psyllids and mottled leaves; report suspected cases to extension.
- Use screened nurseries for raising young trees.`,
      uganda_notes: `> **Citrus is a major fruit crop in Uganda** (notably the Teso and northern regions), and Liberibacter bacteria **have been detected in Uganda**, with the African citrus psyllid present in cooler areas.

Protect the industry by **sourcing certified seedlings (via NARO/registered nurseries), removing symptomatic trees, and managing psyllids**. Early reporting to district agricultural officers / MAAIF is important to limit spread.`,
    },
  },

  '16': {
    disease_name: 'Bacterial Spot',
    common_names: ['Peach bacterial spot'],
    crop: 'Peach',
    scientific_name: 'Xanthomonas arboricola pv. pruni',
    type: 'Bacterial',
    cause: 'Bacterial',
    risk_level: 'High',
    description:
      'A bacterial disease of peach causing angular dark leaf spots that fall out ("shot-hole"), cracked sunken fruit lesions, and twig dieback.',
    image_urls: [
      'https://www.canr.msu.edu/ipm/uploads/images/Fruit/leavesBacterialspot.jpg',
    ],
    external_resources: [
      { title: 'Bacterial spot of stone fruit — Wikipedia', url: 'https://en.wikipedia.org/wiki/Bacterial_spot_of_stone_fruit' },
    ],
    md: {
      overview: `Peach bacterial spot is caused by **_Xanthomonas arboricola_ pv. _pruni_**. It infects **leaves, fruit and twigs**, spreads in **wind-driven rain**, and survives in twig cankers. Severe infection defoliates trees and ruins fruit appearance.`,
      symptoms: `- **Leaves:** small, angular, water-soaked spots that turn dark/purple; the dead centres often **fall out, giving a "shot-hole"** look. Heavy infection causes yellowing and leaf drop.
- **Fruit:** small dark sunken spots that **crack and become corky**, downgrading the fruit.
- **Twigs:** dark sunken cankers that ooze and can cause dieback.`,
      favorable: `**Warm, wet, windy weather** drives infection, as rain splash and wind carry the bacteria. Sandy soils and stressed trees worsen severity.`,
      management: `- Apply **copper-based bactericides** early and during wet weather (use carefully — copper can injure peach leaves at high rates/temperatures).
- **Prune out** cankered twigs and destroy them.
- Avoid overhead irrigation and working among wet trees.`,
      prevention: `- Plant **resistant/tolerant cultivars** — the most reliable control.
- Sanitise pruning tools.
- Maintain tree vigour and good airflow.`,
      uganda_notes: `> Peaches are a **minor highland fruit** in Uganda.

Because bactericides only suppress (not cure) the disease, **choosing tolerant varieties and pruning out infected twigs** are the most practical local steps; copper from agrovet shops can help in wet spells.`,
    },
  },

  '17': {
    disease_name: null,
    common_names: [],
    crop: 'Peach',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy peach leaf — no disease detected. Maintain pruning and sanitation.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ripe_peach.jpg/960px-Ripe_peach.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This peach leaf is healthy — long, green and undamaged, with no shot-holes, spots or curling.`,
      symptoms: `A healthy peach leaf shows:
- Even green colour with no angular dark spots or shot-holes.
- No reddening, curling (leaf curl) or blistering.
- No sunken lesions on nearby fruit or twigs.`,
      favorable: ``,
      management: `- Inspect leaves and twigs regularly, especially after rain.
- Prune for an open canopy and remove dead twigs.
- Water at ground level and mulch to conserve moisture.`,
      prevention: `- Choose tolerant varieties and certified planting material.
- Sanitise tools and remove infected prunings.
- Maintain balanced fertilisation.`,
      uganda_notes: `> For Uganda's few peach growers, **mulching, base watering and twig sanitation** keep trees healthy with minimal inputs.`,
    },
  },

  '18': {
    disease_name: 'Bacterial Spot',
    common_names: ['Bell pepper bacterial spot'],
    crop: 'Pepper, bell',
    scientific_name: 'Xanthomonas euvesicatoria',
    type: 'Bacterial',
    cause: 'Bacterial',
    risk_level: 'High',
    description:
      'A bacterial disease of pepper causing water-soaked leaf spots that turn brown with yellow halos, defoliation, and scabby raised fruit lesions.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Bacterial_leaf_spot_of_pepper_%2814954498489%29.jpg/960px-Bacterial_leaf_spot_of_pepper_%2814954498489%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Bacterial_leaf_spot_of_pepper_%28Capsicum_sp.%29_%2843614805831%29.jpg/960px-Bacterial_leaf_spot_of_pepper_%28Capsicum_sp.%29_%2843614805831%29.jpg',
    ],
    external_resources: [
      { title: 'Bacterial spot — Wikipedia', url: 'https://en.wikipedia.org/wiki/Bacterial_spot' },
    ],
    md: {
      overview: `Pepper bacterial spot is caused by **_Xanthomonas euvesicatoria_** (and related species). It spreads through **infected seed/seedlings and rain splash**, and thrives in warm, wet weather. Defoliation exposes fruit to sun-scald and cuts yield.`,
      symptoms: `- **Leaves:** small, water-soaked spots that enlarge into **brown, angular lesions with yellow halos**; heavy spotting causes leaves to yellow and drop.
- **Fruit:** raised, **scabby, cratered spots** that make peppers unmarketable.
- Rapid spread after warm rains.`,
      favorable: `**Warm temperatures (24–30 °C) with rain, overhead irrigation and high humidity** favour spread. The bacteria enter through wounds and natural pores and move with splashing water and handling.`,
      management: `- Start with **clean, certified seed and disease-free seedlings**.
- Apply **copper-based bactericides** (sometimes with mancozeb) preventively from transplanting, repeating in wet weather — note copper resistance can develop.
- Avoid working among **wet plants**; remove badly infected plants and debris.`,
      prevention: `- Use certified seed; treat saved seed (hot-water/where appropriate) — but prefer buying clean seed.
- **Rotate** away from peppers/tomatoes for 2–3 seasons.
- Use **drip irrigation**, mulch, and wide spacing for airflow.`,
      uganda_notes: `> Peppers (including **hot/chilli peppers for export**) are an important Ugandan horticultural crop, and bacterial spot is common in the warm, wet lowlands.

**Certified seed, drip/base irrigation and rotation** are the foundation; copper from agrovet shops helps but cannot rescue a badly infected, overhead-irrigated crop.`,
    },
  },

  '19': {
    disease_name: null,
    common_names: [],
    crop: 'Pepper, bell',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy bell pepper leaf — no disease detected. Keep soil moisture even and airflow good.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This pepper leaf is healthy — green, flat and unspotted, with no water-soaked lesions or halos.`,
      symptoms: `A healthy pepper leaf shows:
- Even green colour with no spots, halos or water-soaking.
- No curling, mottling or yellowing.
- No wilting or scabby lesions on nearby fruit.`,
      favorable: ``,
      management: `- Scout regularly, especially after warm rains.
- Use **drip irrigation** or water at the base; avoid wetting leaves.
- Ensure good drainage and balanced nutrition.`,
      prevention: `- Start with certified, disease-free seedlings.
- Space plants for airflow and mulch to stabilise soil moisture.
- Rotate with non-solanaceous crops.`,
      uganda_notes: `> For Ugandan pepper growers, **clean seedlings, base watering and good spacing** prevent most leaf diseases and protect export-quality fruit.`,
    },
  },

  '20': {
    disease_name: 'Early Blight',
    common_names: ['Potato early blight'],
    crop: 'Potato',
    scientific_name: 'Alternaria solani',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of potato causing brown leaf spots with concentric "target" rings, starting on older leaves, plus dark sunken tuber lesions.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Alternaria_solani_-_leaf_lesions.jpg/960px-Alternaria_solani_-_leaf_lesions.jpg',
      'https://vegpath.plantpath.wisc.edu/wp-content/uploads/sites/210/2023/11/potato-early-blight-leaves.jpg',
    ],
    external_resources: [
      { title: 'Alternaria solani — Wikipedia', url: 'https://en.wikipedia.org/wiki/Alternaria_solani' },
    ],
    md: {
      overview: `Early blight is caused by the fungus **_Alternaria solani_**. It attacks **older, stressed leaves first**, as well as stems and tubers, and survives in crop residue and soil. It is favoured by warm weather and tends to build up on nutrient-stressed crops.`,
      symptoms: `- **Leaves:** dark brown spots with **concentric rings ("target spots" / bull's-eye)**, usually surrounded by a yellow halo; starts on the **oldest lower leaves**.
- Spots merge and leaves dry and drop, working up the plant.
- **Tubers:** dark, sunken, leathery lesions with a dry brown rot beneath.`,
      favorable: `**Warm temperatures (24–29 °C) with alternating wet and dry periods, dews and high humidity** favour early blight. **Nutrient-stressed or ageing** crops are hit hardest.`,
      management: `- Apply protectant fungicides such as **chlorothalonil**, **mancozeb (Dithane M-45)** or **azoxystrobin**, starting when plants are 10–15 cm tall and repeating every 7–10 days in humid weather.
- Remove volunteer potatoes and infected debris.
- Keep the crop **well-nourished** (adequate nitrogen and potassium) to delay onset.`,
      prevention: `- **Rotate** out of potato/tomato for 2–3 years.
- Use **certified seed potatoes**.
- Mulch to reduce soil splash; ensure balanced fertility.`,
      uganda_notes: `> Potato is a major crop in Uganda's **southwestern highlands (Kigezi: Kabale, Kisoro, Kanungu)** and **Mt Elgon**. Early blight is common alongside the more feared late blight.

**Mancozeb (Dithane M-45)** is widely sold in local agrovet shops. Combine **certified seed (e.g. from NARO/Kachwekano), rotation and balanced fertiliser** with protectant sprays.`,
    },
  },

  '21': {
    disease_name: 'Late Blight',
    common_names: ['Potato late blight'],
    crop: 'Potato',
    scientific_name: 'Phytophthora infestans',
    type: 'Oomycete',
    cause: 'Fungal-like oomycete',
    risk_level: 'Very High',
    description:
      'The most destructive potato disease. A water-mould causing fast-spreading dark water-soaked lesions that can destroy a crop within days in cool, wet weather.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Late_blight_on_potato_leaf_2.jpg/960px-Late_blight_on_potato_leaf_2.jpg',
    ],
    external_resources: [
      { title: 'Phytophthora infestans — Wikipedia', url: 'https://en.wikipedia.org/wiki/Phytophthora_infestans' },
    ],
    md: {
      overview: `Late blight, caused by the water-mould **_Phytophthora infestans_**, is the **most destructive disease of potato** (and the cause of the Irish famine). Under cool, wet conditions it can **destroy a field within days**. It also rots tubers in the ground and in store.`,
      symptoms: `- **Leaves:** **dark green to brown, water-soaked blotches**, often starting at leaf tips/edges, that enlarge rapidly.
- In humid weather, a **white downy mould** appears on the underside at the lesion edge.
- Whole plants turn brown and collapse with a distinctive **rotting smell**.
- **Tubers:** reddish-brown firm rot beneath the skin, leading to storage rots.`,
      favorable: `**Cool, wet, humid weather (10–24 °C with rain, fog or heavy dew)** is ideal — exactly the climate of Uganda's southwestern highlands during the rains. The disease explodes when wet weather persists.`,
      management: `- **Act preventively** — once visible, blight is hard to stop. Apply protectant **mancozeb (Dithane M-45)** before/at the first risk, and switch to systemic mixtures like **metalaxyl + mancozeb (Ridomil Gold MZ)** under high pressure, repeating every **5–7 days** in wet weather.
- **Rogue out** and bury/burn infected plants immediately.
- Hill soil well over tubers and harvest in dry weather; cure and store only sound tubers.`,
      prevention: `- Plant **late-blight-resistant/tolerant varieties** (e.g. NARO releases).
- Use **certified, clean seed**; never plant blighted tubers.
- Avoid overhead watering; ensure good drainage and spacing; destroy cull piles and volunteers.`,
      uganda_notes: `> Late blight is **the number-one constraint on Ugandan potato**, with the bulk of the crop in the **Kigezi highlands (Kabale, Kisoro)** above ~1,800 m, where losses of **40–60%** are common.

**Dithane M-45 and Ridomil** are the standard agrovet fungicides used in the region. Combine routine protectant spraying in the rains with **NARO/Kachwekano certified seed and tolerant varieties (e.g. Victoria and newer releases)** for reliable control.`,
    },
  },

  '22': {
    disease_name: null,
    common_names: [],
    crop: 'Potato',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy potato leaf — no disease detected. Stay alert for late blight in wet weather.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/960px-Patates.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This potato leaf is healthy — green and turgid, with no water-soaked blotches, target spots or downy mould.`,
      symptoms: `A healthy potato leaf shows:
- Even green colour with no dark water-soaked patches.
- No concentric "target" spots or yellowing.
- No white downy growth on the underside.`,
      favorable: ``,
      management: `- Scout **daily during wet weather** — late blight moves fast.
- Hill soil over tubers and keep the crop well-nourished.
- Avoid overhead irrigation; ensure good drainage.`,
      prevention: `- Use **certified seed** and resistant varieties.
- **Rotate** crops and destroy volunteers and cull piles.
- Begin **preventive mancozeb** sprays at the first risk of blight weather.`,
      uganda_notes: `> In Uganda's potato highlands, a healthy crop can be lost to late blight in **a few wet days** — so monitor closely and **spray preventively** rather than waiting for symptoms.`,
    },
  },

  '23': {
    disease_name: null,
    common_names: [],
    crop: 'Raspberry',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy raspberry leaf — no disease detected. Keep canes pruned and airy.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Raspberry_-_halved_%28Rubus_idaeus%29.jpg/960px-Raspberry_-_halved_%28Rubus_idaeus%29.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This raspberry leaf is healthy — green and unblemished, with no spots, rust pustules or mildew.`,
      symptoms: `A healthy raspberry leaf shows:
- Even green colour above with no spots or blotches.
- No orange rust pustules underneath.
- No curling, mottling or webbing.`,
      favorable: ``,
      management: `- Prune out old fruited canes to improve airflow.
- Mulch and water at the root zone.
- Inspect regularly for pests and leaf spots.`,
      prevention: `- Maintain wide rows and good airflow.
- Remove fallen leaves and prunings.
- Keep plants vigorous with balanced nutrition.`,
      uganda_notes: `> Raspberries are a **niche crop** in Uganda's cooler highlands. **Cane pruning, mulching and root-zone watering** keep plants healthy with little need for sprays.`,
    },
  },

  '24': {
    disease_name: null,
    common_names: [],
    crop: 'Soybean',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy soybean leaf — no disease detected. Keep rotating and scouting.',
    image_urls: ['https://upload.wikimedia.org/wikipedia/commons/8/82/Soybean.USDA.jpg'],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This soybean leaf is healthy — green and intact, with no rust pustules, leaf spots or mosaic.`,
      symptoms: `A healthy soybean leaf shows:
- Even green colour with no tan/brown spots.
- No reddish-brown rust pustules on the underside.
- No mottling, puckering or yellowing.`,
      favorable: ``,
      management: `- Scout fields regularly, checking lower leaves.
- Ensure balanced soil fertility and good drainage.
- Reduce plant density if the canopy stays wet.`,
      prevention: `- **Rotate** soybean with cereals to break disease cycles.
- Use certified, treated seed.
- Manage residue and volunteers.`,
      uganda_notes: `> Soybean is a growing cash and rotation crop in Uganda (especially the **north and east**). It pairs well in rotation with maize, helping break maize leaf-disease cycles while fixing nitrogen. **Certified seed and rotation** keep it healthy.`,
    },
  },

  '25': {
    disease_name: 'Powdery Mildew',
    common_names: ['Squash powdery mildew'],
    crop: 'Squash',
    scientific_name: 'Podosphaera xanthii',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A common fungal disease of squash and other cucurbits, coating leaves with white powdery growth that yellows and kills foliage and reduces yield.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/K%C3%BCrbis-Cucurbita-Echter_Mehltau-Golovinomyces-4-JS.jpg/960px-K%C3%BCrbis-Cucurbita-Echter_Mehltau-Golovinomyces-4-JS.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Powdery_mildew_9.jpg/960px-Powdery_mildew_9.jpg',
    ],
    external_resources: [
      { title: 'Powdery mildew — Wikipedia', url: 'https://en.wikipedia.org/wiki/Powdery_mildew' },
    ],
    md: {
      overview: `Squash powdery mildew is caused mainly by **_Podosphaera xanthii_** (and _Erysiphe cichoracearum_). It is one of the most common diseases of cucurbits. Unusually, it **does not need leaf wetness** and spreads fast in warm, humid, shaded conditions.`,
      symptoms: `- **White to grey powdery patches**, first on older/shaded leaves and stems, later covering both leaf surfaces.
- Leaves **yellow, curl, dry and die**, exposing fruit to sun-scald.
- Reduced photosynthesis lowers yield and fruit quality.`,
      favorable: `**Warm temperatures (20–30 °C) with high humidity, shade and dense canopies** favour the disease. Crowded, poorly spaced plantings are at greatest risk.`,
      management: `- Apply **sulfur**, **potassium bicarbonate** or systemic fungicides (e.g. **myclobutanil**) at the **first sign**, repeating every 7–10 days; treat leaf undersides too.
- Remove and destroy heavily infected leaves.
- Improve airflow by spacing and pruning excess foliage.`,
      prevention: `- Plant **resistant/tolerant varieties** where available.
- Space plants widely and avoid heavy shade.
- Avoid excess nitrogen; water at the base.`,
      uganda_notes: `> Squash, pumpkin and other cucurbits are widely grown in Ugandan home gardens and markets, and powdery mildew is **very common** in warm, humid weather.

Because it doesn't need rain, it appears even in dry spells. **Sulfur dust** and **wide spacing** are cheap, effective local controls.`,
    },
  },

  '26': {
    disease_name: 'Leaf Scorch',
    common_names: ['Strawberry leaf scorch'],
    crop: 'Strawberry',
    scientific_name: 'Diplocarpon earlianum',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal disease of strawberry causing many small dark-purple spots that merge so leaves look brown and "scorched", weakening plants.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/960px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
    ],
    external_resources: [
      { title: 'Diplocarpon earlianum — Wikipedia', url: 'https://en.wikipedia.org/wiki/Diplocarpon_earlianum' },
    ],
    md: {
      overview: `Strawberry leaf scorch is caused by **_Diplocarpon earlianum_**. It produces many small dark spots that merge until leaves look **dry and scorched**. Heavy infection reduces plant vigour, runner production and yield, and survives in old infected leaves.`,
      symptoms: `- Numerous small, **irregular dark-purple spots** on the upper leaf surface (no pale centre, unlike leaf spot).
- Spots merge; the leaf **edges and tissue turn reddish-brown and "scorched"**, then die.
- Petioles, runners and fruit stalks can also be affected, weakening the plant.`,
      favorable: `**Warm, wet, humid weather** with frequent rain or overhead irrigation, and **dense, poorly ventilated beds**, favour the disease.`,
      management: `- Apply **captan** or **chlorothalonil** fungicides during warm, wet weather, repeating every 7–14 days while conditions persist.
- **Remove and destroy** old and infected leaves, especially after harvest (renovation).
- Improve airflow with proper spacing and weed control.`,
      prevention: `- Plant **resistant cultivars** and clean, certified runners.
- Use **drip irrigation** and avoid wetting foliage.
- Space beds well and renovate (clean up) after harvest.`,
      uganda_notes: `> Strawberries are grown by **peri-urban and highland growers** in Uganda for fresh markets.

**Drip irrigation, wide beds and removing old leaves** are the key low-cost controls; captan or chlorothalonil from agrovet shops help in prolonged wet weather.`,
    },
  },

  '27': {
    disease_name: null,
    common_names: [],
    crop: 'Strawberry',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy strawberry leaf — no disease detected. Keep beds airy and foliage dry.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/960px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This strawberry leaf is healthy — its three leaflets are evenly green with no spots, scorching or mildew.`,
      symptoms: `A healthy strawberry leaf shows:
- Even green leaflets with no dark purple spots.
- No reddish-brown "scorched" margins or drying.
- No powdery growth or mottling.`,
      favorable: ``,
      management: `- Use **drip irrigation**; keep foliage dry.
- Remove old and dying leaves to improve airflow.
- Monitor for pests and leaf spots, especially in wet weather.`,
      prevention: `- Plant certified runners and resistant cultivars.
- Space beds well and mulch to keep fruit clean.
- Renovate beds after harvest.`,
      uganda_notes: `> For Ugandan strawberry growers, **base watering, airy beds and removing old leaves** keep plants healthy and fruit clean.`,
    },
  },

  '28': {
    disease_name: 'Bacterial Spot',
    common_names: ['Tomato bacterial spot'],
    crop: 'Tomato',
    scientific_name: 'Xanthomonas spp.',
    type: 'Bacterial',
    cause: 'Bacterial',
    risk_level: 'High',
    description:
      'A bacterial disease of tomato producing small dark water-soaked leaf spots and scabby fruit lesions, spreading fast in warm, wet weather.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Bacterial_leaf_spot_of_pepper_%2814954498489%29.jpg/960px-Bacterial_leaf_spot_of_pepper_%2814954498489%29.jpg',
    ],
    external_resources: [
      { title: 'Bacterial spot — Wikipedia', url: 'https://en.wikipedia.org/wiki/Bacterial_spot' },
    ],
    md: {
      overview: `Tomato bacterial spot is caused by several **_Xanthomonas_ species**. It spreads through **infected seed/transplants and rain splash** and is favoured by warm, wet weather. It downgrades fruit and, with defoliation, reduces yield.`,
      symptoms: `- **Leaves:** small (≤3 mm) **dark, water-soaked, angular spots**, sometimes with a yellow halo; heavy spotting causes yellowing and leaf drop.
- **Fruit:** small, raised, **scabby/cratered dark spots** that ruin appearance.
- Spread is rapid after warm rain or overhead irrigation.`,
      favorable: `**Warm temperatures (24–30 °C) with rain, overhead irrigation and high humidity** drive infection. The bacteria enter through pores and wounds and move with splashing water and handling.`,
      management: `- Use **certified, disease-free seed and transplants**.
- Apply **copper-based bactericides** (often with mancozeb) preventively, repeating in wet weather; rotate products as copper resistance can develop.
- Avoid overhead irrigation and handling **wet plants**; remove crop debris.`,
      prevention: `- Start clean (certified seed; hot-water treat saved seed where appropriate).
- **Rotate** away from tomato/pepper for 2–3 seasons.
- Use **drip irrigation**, staking and wide spacing for airflow.`,
      uganda_notes: `> Tomato is one of Uganda's most important vegetable cash crops, grown country-wide (e.g. central, eastern and western districts). Bacterial spot is common in the **warm, wet seasons**.

The biggest local wins are **certified seed, drip/base irrigation, staking and rotation**; copper from agrovet shops suppresses spread but cannot cure a soaked, overhead-watered crop.`,
    },
  },

  '29': {
    disease_name: 'Early Blight',
    common_names: ['Tomato early blight'],
    crop: 'Tomato',
    scientific_name: 'Alternaria solani',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of tomato causing brown "bull\'s-eye" leaf spots on older leaves, stem cankers, and fruit rot at the stem end.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Alternaria_solani_-_leaf_lesions.jpg/960px-Alternaria_solani_-_leaf_lesions.jpg',
      'https://content.ces.ncsu.edu/media/images/IMG_1302.jpeg',
    ],
    external_resources: [
      { title: 'Alternaria solani — Wikipedia', url: 'https://en.wikipedia.org/wiki/Alternaria_solani' },
    ],
    md: {
      overview: `Tomato early blight is caused by the fungus **_Alternaria solani_**. It attacks **older, lower leaves first**, plus stems and fruit, and survives in residue and soil. It builds up on stressed crops and in warm, humid weather.`,
      symptoms: `- **Leaves:** brown spots with **concentric rings ("bull's-eye"/target)** and a yellow halo, beginning on the **oldest lower leaves**; spots merge and leaves drop, working upward.
- **Stems:** dark sunken cankers (including "collar rot" on seedlings).
- **Fruit:** dark, sunken, leathery rot at the **stem end**, often with concentric rings.`,
      favorable: `**Warm temperatures (24–29 °C) with alternating wet/dry periods, dews and high humidity** favour early blight. **Nutrient-stressed or ageing** plants are hit hardest.`,
      management: `- Apply protectant fungicides such as **chlorothalonil**, **mancozeb (Dithane M-45)** or **azoxystrobin** when plants are ~10–15 cm tall, repeating every 7–10 days in humid weather.
- **Remove lower infected leaves** and crop debris.
- Keep plants well-nourished and **staked/mulched** to reduce soil splash.`,
      prevention: `- **Rotate** out of tomato/potato for 2–3 seasons.
- Choose tolerant varieties; use certified seed.
- Stake, mulch and space for airflow; maintain balanced fertility.`,
      uganda_notes: `> Early blight is a routine problem on Ugandan tomato. **Mancozeb (Dithane M-45)** is the most common protectant in agrovet shops.

Combine **staking, mulching, rotation and balanced fertiliser** with protectant sprays; removing the lowest leaves slows the disease cheaply.`,
    },
  },

  '30': {
    disease_name: 'Late Blight',
    common_names: ['Tomato late blight'],
    crop: 'Tomato',
    scientific_name: 'Phytophthora infestans',
    type: 'Oomycete',
    cause: 'Fungal-like oomycete',
    risk_level: 'Very High',
    description:
      'A fast-moving water-mould disease that can destroy tomato plants within days in cool, wet weather, with large dark greasy leaf blotches and fruit rot.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Late_blight_on_potato_leaf_2.jpg/960px-Late_blight_on_potato_leaf_2.jpg',
    ],
    external_resources: [
      { title: 'Phytophthora infestans — Wikipedia', url: 'https://en.wikipedia.org/wiki/Phytophthora_infestans' },
    ],
    md: {
      overview: `Tomato late blight, caused by the water-mould **_Phytophthora infestans_** (the same pathogen as potato late blight), is one of the **most destructive tomato diseases**. In cool, wet weather it spreads explosively and can **kill plants within days**.`,
      symptoms: `- **Leaves:** large, **dark green to brown, greasy water-soaked blotches**, often at the leaf tips/edges, that enlarge fast; a **white downy mould** may show on the underside in humid weather.
- **Stems:** dark brown to black lesions that can girdle the stem.
- **Fruit:** firm, **greasy brown blotches** that rot the fruit.`,
      favorable: `**Cool, wet, humid weather (10–24 °C with rain, fog or heavy dew)** is ideal — common in Uganda's highlands and during prolonged rains. The disease blows up when wet conditions persist.`,
      management: `- **Spray preventively** — once visible it is hard to stop. Use protectant **mancozeb (Dithane M-45)** before/at first risk, switching to systemic **metalaxyl + mancozeb (Ridomil Gold MZ)** under high pressure, every **5–7 days** in wet weather.
- **Remove and destroy** infected plants immediately.
- Avoid overhead watering; stake and space for fast drying; remove nearby blighted potatoes/volunteers.`,
      prevention: `- Use **tolerant varieties** and certified, clean seedlings.
- **Rotate** away from tomato/potato; do not plant near blighted potato.
- Stake, mulch and ensure good drainage and airflow.`,
      uganda_notes: `> Late blight is a **severe threat to Ugandan tomato**, especially where tomatoes grow near **potato in the highlands** and during long rains.

The same agrovet fungicides used on potato — **Dithane M-45 and Ridomil** — are used here. **Preventive spraying in wet weather plus staking and rotation** are essential.`,
    },
  },

  '31': {
    disease_name: 'Leaf Mold',
    common_names: ['Tomato leaf mold'],
    crop: 'Tomato',
    scientific_name: 'Passalora fulva',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal disease mainly of greenhouse/high-humidity tomato, with pale yellow upper-leaf spots and olive-green velvety mould on the underside.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/TomateBlattOberseiteSamtfleckenCladosporiumfulvum.jpg/960px-TomateBlattOberseiteSamtfleckenCladosporiumfulvum.jpg',
    ],
    external_resources: [
      { title: 'Passalora fulva — Wikipedia', url: 'https://en.wikipedia.org/wiki/Passalora_fulva' },
    ],
    md: {
      overview: `Tomato leaf mold is caused by **_Passalora fulva_** (formerly _Cladosporium fulvum_). It is mainly a problem of **humid, enclosed environments** such as greenhouses, tunnels and crowded plantings, where humidity stays very high. It mostly affects leaves and can cause heavy defoliation.`,
      symptoms: `- **Upper leaf surface:** pale green to **yellow blotches** with no sharp edge.
- **Lower surface (directly beneath):** **olive-green to brown velvety mould** — the diagnostic sign.
- Affected leaves curl, dry and drop; severe defoliation reduces yield.`,
      favorable: `**High humidity (>85%) with moderate temperatures (20–25 °C)** and poor ventilation — typical of greenhouses/tunnels and dense, wet canopies — strongly favours leaf mold.`,
      management: `- **Lower humidity:** improve ventilation, space/prune plants, and avoid overhead watering — the most important control in protected crops.
- Apply **chlorothalonil**, **mancozeb** or **copper** fungicides, treating leaf undersides, every 7–10 days under high humidity.
- Remove and destroy infected leaves.`,
      prevention: `- Use **resistant varieties** (several carry leaf-mold resistance genes).
- Ventilate greenhouses/tunnels and keep humidity below ~85%.
- Space, stake and prune for airflow; use drip irrigation.`,
      uganda_notes: `> Leaf mold is most important for Uganda's growing number of **greenhouse/tunnel tomato** producers around towns, where humidity is high.

The cheapest control is **ventilation and wider spacing**; choose **resistant varieties** when buying seed for protected production.`,
    },
  },

  '32': {
    disease_name: 'Septoria Leaf Spot',
    common_names: ['Tomato Septoria leaf spot'],
    crop: 'Tomato',
    scientific_name: 'Septoria lycopersici',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'High',
    description:
      'A fungal disease of tomato producing many small circular spots with grey centres and tiny black dots, starting on lower leaves and causing heavy defoliation.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Septoria_lycopersici_malagutii_leaf_spot_on_tomato_leaf.jpg/960px-Septoria_lycopersici_malagutii_leaf_spot_on_tomato_leaf.jpg',
    ],
    external_resources: [
      { title: 'Septoria lycopersici — Wikipedia', url: 'https://en.wikipedia.org/wiki/Septoria_lycopersici' },
    ],
    md: {
      overview: `Septoria leaf spot is caused by the fungus **_Septoria lycopersici_**. It is one of the most common and damaging leaf diseases of tomato, causing **heavy defoliation** that exposes fruit to sun-scald and reduces yield. It survives in residue and on weeds.`,
      symptoms: `- Many **small, circular spots (2–5 mm) with grey/tan centres and dark borders**, starting on the **lowest, oldest leaves**.
- **Tiny black dots (pycnidia)** in the spot centres — visible with a hand lens.
- Spots multiply and merge; leaves yellow and drop, defoliating the plant from the bottom up.`,
      favorable: `**Warm temperatures (20–25 °C) with wet leaves, high humidity and rain splash** favour Septoria. Crowded, unstaked plants and overhead irrigation increase spread.`,
      management: `- Apply **chlorothalonil**, **mancozeb** or **copper** fungicides at first sign, repeating every 7–14 days in humid weather.
- **Remove lower infected leaves** and destroy crop debris.
- Stake/mulch and avoid overhead irrigation to reduce splash.`,
      prevention: `- **Rotate** out of tomato for 2–3 years; control solanaceous weeds.
- Use **drip irrigation** and mulch to stop soil splash.
- Stake and space for airflow; use clean seed.`,
      uganda_notes: `> Septoria is a frequent problem on Ugandan tomato in the **wet seasons**, especially on unstaked, overhead-watered crops.

**Staking, mulching, base watering and removing the lowest leaves** are cheap and effective; mancozeb/copper from agrovet shops back them up.`,
    },
  },

  '33': {
    disease_name: 'Two-Spotted Spider Mite',
    common_names: ['Spider mites', 'Two-spotted mite'],
    crop: 'Tomato',
    scientific_name: 'Tetranychus urticae',
    type: 'Pest',
    cause: 'Pest (Arachnid)',
    risk_level: 'Medium',
    description:
      'A tiny sap-sucking mite that causes fine yellow stippling and webbing on tomato leaves; populations explode in hot, dry, dusty conditions.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tetranychus_urticae_%284883560779%29.jpg/960px-Tetranychus_urticae_%284883560779%29.jpg',
    ],
    external_resources: [
      { title: 'Tetranychus urticae — Wikipedia', url: 'https://en.wikipedia.org/wiki/Tetranychus_urticae' },
    ],
    md: {
      overview: `The two-spotted spider mite (**_Tetranychus urticae_**) is a tiny sap-sucking **pest, not a fungus**. Mites cluster on **leaf undersides**, pierce cells and drain sap. Populations **explode in hot, dry, dusty weather** and on water-stressed plants, and can build resistance to chemicals quickly.`,
      symptoms: `- Fine **yellow/white stippling (tiny pale dots)** on leaves, giving a bronzed, sandblasted look.
- **Fine silk webbing** on leaf undersides and growing tips in heavy infestations.
- Leaves yellow, dry and drop; severe attacks stunt and can kill plants.
- Mites are just visible as moving specks (often with two dark spots) under a hand lens.`,
      favorable: `**Hot, dry, dusty conditions** and **water-stressed plants** strongly favour mites. Outbreaks often follow **broad-spectrum insecticide use** that kills their natural enemies. High nitrogen also boosts them.`,
      management: `- **Spray plants forcefully with water** to dislodge mites and raise humidity.
- Use **insecticidal soap, horticultural oil or registered miticides** — target leaf **undersides** and repeat per label (rotate actives to avoid resistance).
- **Avoid broad-spectrum insecticides** that kill predatory mites and other natural enemies.
- Keep plants **well-watered** and dust-free.`,
      prevention: `- Maintain adequate soil moisture and humidity; avoid drought stress.
- Avoid excess nitrogen.
- Conserve natural enemies (predatory mites, ladybirds); control dust along field edges.`,
      uganda_notes: `> Spider mites are most damaging on Ugandan tomato in **hot, dry spells and in dry-season/irrigated crops**, and can flare after spraying broad insecticides.

Practical local controls are **strong water sprays, keeping plants well-watered, and using soap/oil or a registered miticide** rather than routine insecticides that worsen the problem.`,
    },
  },

  '34': {
    disease_name: 'Target Spot',
    common_names: ['Tomato target spot'],
    crop: 'Tomato',
    scientific_name: 'Corynespora cassiicola',
    type: 'Fungal',
    cause: 'Fungal',
    risk_level: 'Medium',
    description:
      'A fungal disease of tomato causing circular leaf spots with concentric rings, plus stem and fruit lesions, in warm humid weather.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/2/22/Corynespora_cassiicola_Ring-Spot_Symptoms_in_Tomato_Leaves.png',
    ],
    external_resources: [
      { title: 'Corynespora cassiicola — Wikipedia', url: 'https://en.wikipedia.org/wiki/Corynespora_cassiicola' },
    ],
    md: {
      overview: `Tomato target spot is caused by the fungus **_Corynespora cassiicola_**. It affects **leaves, stems and fruit**, and can be confused with early blight. Fruit lesions are especially damaging because they downgrade marketable tomatoes.`,
      symptoms: `- **Leaves:** small brown spots that enlarge into circular lesions with **concentric "target" rings** and yellow halos; heavy spotting causes defoliation.
- **Stems:** elongated brown lesions.
- **Fruit:** small, sunken, circular brown spots that can crack — a key difference from some other leaf spots.`,
      favorable: `**Warm temperatures with high humidity, leaf wetness and rain** favour target spot. Dense, wet canopies and overhead irrigation increase spread.`,
      management: `- Apply **chlorothalonil** or **mancozeb** fungicides at first sign, repeating every 7–10 days in wet weather; treat lower canopy and undersides.
- **Remove diseased leaves** and crop debris.
- Stake, prune and space for airflow; avoid overhead irrigation.`,
      prevention: `- **Rotate** away from tomato; use clean seed and transplants.
- Improve airflow (staking, spacing, pruning).
- Use drip irrigation and mulch.`,
      uganda_notes: `> Target spot occurs on Ugandan tomato in **warm, humid, wet conditions**, often together with early/late blight.

The same practices — **staking, spacing, base watering and mancozeb/chlorothalonil** — manage it alongside the other tomato blights.`,
    },
  },

  '35': {
    disease_name: 'Tomato Yellow Leaf Curl Virus',
    common_names: ['TYLCV'],
    crop: 'Tomato',
    scientific_name: 'Tomato yellow leaf curl virus (Begomovirus)',
    type: 'Viral',
    cause: 'Viral',
    risk_level: 'High',
    description:
      'A whitefly-transmitted virus causing severe upward leaf curling, yellowing and stunting; early infection can cause near-total yield loss.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/1/19/Yellow_curl_leaf_disease_Pj_IMG_3162.jpg',
    ],
    external_resources: [
      { title: 'Tomato yellow leaf curl virus — Wikipedia', url: 'https://en.wikipedia.org/wiki/Tomato_yellow_leaf_curl_virus' },
    ],
    md: {
      overview: `Tomato yellow leaf curl virus (TYLCV) is a **begomovirus spread by the whitefly _Bemisia tabaci_**. There is **no cure** — control depends on managing whiteflies and using resistant varieties. Early infection of young plants can cause **near-total crop loss**.`,
      symptoms: `- **Severe upward curling and cupping** of leaves, which become small.
- **Yellowing (chlorosis)** of leaf margins and between veins.
- Marked **stunting and bushy growth**; heavy **flower drop** and few/small fruit.
- The earlier a plant is infected, the worse the loss.`,
      favorable: `**Warm conditions with high whitefly populations** drive spread — common in warm lowlands and dry seasons. Nearby infected tomato/weeds and continuous cropping maintain the virus.`,
      management: `- **There is no cure.** **Rogue out** infected plants early to remove virus sources.
- **Control whiteflies:** reflective/silver mulches, yellow sticky traps, and registered insecticides used judiciously (rotate to avoid resistance).
- Raise seedlings under **insect-proof nets**; use barrier/border crops.`,
      prevention: `- Plant **TYLCV-resistant/tolerant varieties** — the most effective measure.
- Use **clean, whitefly-free transplants** raised under nets.
- Remove weed hosts and old infected crops; avoid overlapping tomato plantings.`,
      uganda_notes: `> Whitefly-borne viruses are a serious problem for Ugandan tomato in **warm lowland and dry-season** crops.

The strongest local defences are **resistant varieties, net-protected nurseries, prompt roguing of infected plants, and whitefly management** — insecticides alone rarely keep up once whitefly numbers are high.`,
    },
  },

  '36': {
    disease_name: 'Tomato Mosaic Virus',
    common_names: ['ToMV'],
    crop: 'Tomato',
    scientific_name: 'Tomato mosaic virus (Tobamovirus)',
    type: 'Viral',
    cause: 'Viral',
    risk_level: 'Medium',
    description:
      'A highly contagious virus spread by contact and seed, causing light/dark green leaf mosaic, leaf distortion, and stunted, blotchy fruit.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/3/31/12985_2016_676_Fig4_HTML.webp',
    ],
    external_resources: [
      { title: 'Tomato mosaic virus — Wikipedia', url: 'https://en.wikipedia.org/wiki/Tomato_mosaic_virus' },
    ],
    md: {
      overview: `Tomato mosaic virus (ToMV) is a **tobamovirus** that is **extremely stable and contagious**. It spreads **mechanically** — on hands, tools, clothing and through **infected seed** — not by insects. It survives in debris and on surfaces for a long time, so **hygiene is everything**.`,
      symptoms: `- **Light- and dark-green mottling/mosaic** on leaves.
- Leaf **distortion**, narrowing ("fernleaf") and puckering; mild yellowing.
- **Stunted growth**; fruit can be fewer, smaller, with internal browning or uneven (blotchy) ripening.`,
      favorable: `Spread is driven by **handling and tool contact**, especially during pruning/staking, and by **contaminated seed**. It is worsened by reusing seed and poor sanitation; tobacco products on hands can also carry related viruses.`,
      management: `- **There is no cure.** **Rogue out** infected plants and destroy them.
- Practise strict **hygiene:** wash hands, disinfect tools (e.g. with bleach/milk solutions), and avoid using tobacco before handling plants.
- Handle suspect plants **last**; clean stakes and equipment between crops.`,
      prevention: `- Use **virus-free certified seed** and **resistant varieties** (many carry the _Tm_ resistance genes).
- Disinfect tools, stakes and hands regularly.
- Remove crop debris; avoid saving seed from infected plants.`,
      uganda_notes: `> ToMV risk on Ugandan tomato comes mainly from **saved/uncertified seed and handling during staking and pruning**.

The cheapest, most effective local controls are **buying certified seed/resistant varieties, washing hands and disinfecting tools, and removing infected plants** — no spray will cure it.`,
    },
  },

  '37': {
    disease_name: null,
    common_names: [],
    crop: 'Tomato',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description: 'A healthy tomato leaf — no disease detected. Keep staking, spacing and base watering.',
    image_urls: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/960px-Tomato_je.jpg',
    ],
    external_resources: [],
    md: {
      overview: `**No disease detected.** This tomato leaf is healthy — evenly green, flat and undistorted, with no spots, mosaic, curling or mould.`,
      symptoms: `A healthy tomato leaf shows:
- Uniform green colour with no spots, target rings or mosaic.
- Flat, normal shape — no upward curling, fernleaf narrowing or puckering.
- No yellow stippling, webbing or velvety mould underneath.`,
      favorable: ``,
      management: `- Scout regularly, checking lower leaves and undersides.
- **Stake, prune and space** for airflow; water at the base.
- Maintain balanced nutrition and good drainage.`,
      prevention: `- Use **certified seed and resistant varieties**.
- **Rotate** away from tomato/potato; control weeds and whiteflies.
- Disinfect tools and remove crop debris.`,
      uganda_notes: `> A healthy tomato crop in Uganda is built on **certified seed, staking, base/drip watering, spacing and rotation** — these prevent most of the blights, leaf spots and viruses seen locally.`,
    },
  },

  '38': {
    disease_name: 'Not a Leaf',
    common_names: ['No leaf detected'],
    crop: '—',
    scientific_name: null,
    type: 'None',
    cause: null,
    risk_level: 'Low',
    description:
      'The image does not appear to contain a plant leaf. Retake the photo of a single, well-lit leaf for an accurate diagnosis.',
    image_urls: [],
    external_resources: [],
    md: {
      overview: `**This image does not look like a plant leaf.** Smart Leaf could not find a leaf to diagnose, so no disease result is shown.`,
      symptoms: ``,
      favorable: ``,
      management: `For the best diagnosis, retake the photo:
- Fill the frame with **one leaf** against a plain background.
- Use **bright, even light** (avoid deep shade or glare).
- Hold the phone **steady and close** so the leaf is in sharp focus.
- Capture the **side showing symptoms** (often the underside for mites or mould).`,
      prevention: ``,
      uganda_notes: ``,
    },
  },
};
