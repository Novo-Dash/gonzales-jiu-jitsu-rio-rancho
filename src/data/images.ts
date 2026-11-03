// Natural size of every photo in public/img: each <img> carries it as width/height (PRD 0.4), so
// the box is reserved before the file arrives and the rendered size is the prototype's.
export const DIMS: Record<string, [number, number]> = {
  abie: [768, 1024], adults: [1200, 1594], drill: [1200, 1593],
  'face-1': [360, 360], 'face-2': [360, 360], 'face-3': [360, 360], 'face-4': [360, 360], 'face-5': [360, 360], 'face-6': [360, 360], 'face-7': [360, 360], 'face-8': [360, 360],
  flag: [1200, 1800], 'footer-poster': [960, 552], 'g-14': [243, 244],
  // from gonzalesjj.com (03/11): c- the home's community gallery, rm- the About room, tm- the team
  'c-01': [1400, 1054], 'c-02': [678, 900], 'c-03': [1400, 754], 'c-04': [678, 900], 'c-05': [900, 616], 'c-06': [1054, 1400], 'c-07': [1054, 1400], 'c-08': [1054, 1400], 'c-09': [1344, 1400], 'c-10': [1054, 1400], 'c-11': [1054, 1400], 'c-12': [1054, 1400],
  'rm-01': [678, 900], 'rm-02': [678, 900], 'rm-03': [678, 900], 'rm-04': [678, 900], 'rm-05': [678, 900], 'rm-06': [678, 900], 'rm-07': [678, 900], 'rm-08': [749, 900], 'rm-09': [678, 900], 'rm-10': [678, 900], 'rm-11': [678, 900], 'rm-12': [1054, 1400], 'rm-13': [1054, 1400], 'rm-14': [1400, 1242],
  // the Served cards (03/11): folded flags (Unsplash, Dottie Di Liddo), firefighters (Unsplash, Nejc Soklič)
  'serve-vets': [1400, 933], 'serve-fire': [1400, 788],
  // the passport photo (03/11, Adryan)
  '3x4': [1248, 1440],
  // the instructors' portraits (03/11, Adryan)
  'coaches/Abie': [1248, 1440], 'coaches/Laura': [1248, 1440], 'coaches/Tito': [1248, 1440], 'coaches/Adriana': [1248, 1440], 'coaches/Brandon': [1248, 1440],
  hero: [1920, 1445], kids: [1200, 1265], laura: [510, 1024], 'logo-ink': [882, 615], 'logo-white': [882, 615], roll: [1600, 2125], toddlers: [1200, 821], women: [1400, 1681],
}

/** Smaller copies in public/img/w (scripts/images.mjs), for srcset: same crop, chosen by rendered width. */
export const VARIANTS: Record<string, number[]> = {
  abie: [480], adults: [480, 800], drill: [480, 800], flag: [480, 800],
  'c-01': [480, 800, 1200], 'c-02': [480], 'c-03': [480, 800, 1200], 'c-04': [480], 'c-05': [480, 800], 'c-06': [480, 800], 'c-07': [480, 800], 'c-08': [480, 800], 'c-09': [480, 800, 1200], 'c-10': [480, 800], 'c-11': [480, 800], 'c-12': [480, 800],
  'rm-01': [480], 'rm-02': [480], 'rm-03': [480], 'rm-04': [480], 'rm-05': [480], 'rm-06': [480], 'rm-07': [480], 'rm-08': [480], 'rm-09': [480], 'rm-10': [480], 'rm-11': [480], 'rm-12': [480, 800], 'rm-13': [480, 800], 'rm-14': [480, 800, 1200], 'serve-vets': [480, 800, 1200], 'serve-fire': [480, 800, 1200], '3x4': [480, 800],
  hero: [480, 800, 1200], kids: [480, 800], 'logo-ink': [160, 320], 'logo-white': [160, 320], roll: [480, 800, 1200], toddlers: [480, 800], women: [480, 800, 1200],
}
