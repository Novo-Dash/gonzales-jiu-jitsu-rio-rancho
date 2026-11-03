// The week (data.js), verbatim. d = day (0 Sunday), t = start, k = program, n = class, s = detail.
export type Kind = 't' | 'k' | 'a'
export type Prog = 'toddlers' | 'kids' | 'adults'
export type Slot = { d: number; t: string; k: Kind; n: string; s: string }

export const SLOTS: Slot[] = [
  {d:1,t:'4:30 PM',k:'t',n:'Toddlers',s:'Gi · Ages 4–5'},{d:1,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:1,t:'6:00 PM',k:'a',n:'Adult Fundamentals',s:'Until 7:30'},
  {d:2,t:'11:00 AM',k:'a',n:'Adult Gi',s:'Until 12:00'},{d:2,t:'4:30 PM',k:'t',n:'Toddlers',s:'Gi · Ages 4–5'},{d:2,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:2,t:'6:00 PM',k:'a',n:'Adult All Levels',s:'Until 7:30'},
  {d:3,t:'4:30 PM',k:'t',n:'Toddlers',s:'No-Gi · Ages 4–5'},{d:3,t:'5:00 PM',k:'k',n:'Kids',s:'No-Gi · Ages 6–13'},{d:3,t:'6:00 PM',k:'a',n:'Adult Fundamentals',s:'Gi · Until 7:30'},
  {d:4,t:'11:00 AM',k:'a',n:'Adult Gi',s:'Until 12:00'},{d:4,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:4,t:'6:00 PM',k:'a',n:'Adult Advanced',s:'Until 7:30'},
  {d:5,t:'5:00 PM',k:'k',n:'Kids Comp / Advanced',s:'Gi · Ages 6–13'},{d:5,t:'6:00 PM',k:'a',n:'Adult All Levels',s:'Until 7:30'},
  {d:6,t:'9:00 AM',k:'k',n:'Kids',s:'No-Gi · Ages 6–13'},{d:6,t:'10:00 AM',k:'a',n:'Adult Open Mat',s:'All levels'},
]
export const TIMES = ['9:00 AM','10:00 AM','11:00 AM','4:30 PM','5:00 PM','6:00 PM']
export const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
