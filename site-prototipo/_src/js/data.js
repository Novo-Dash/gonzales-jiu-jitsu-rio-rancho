/* ============ DATA ============ */
const SLOTS = [
  {d:1,t:'4:30 PM',k:'t',n:'Toddlers',s:'Gi · Ages 4–5'},{d:1,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:1,t:'6:00 PM',k:'a',n:'Adult Fundamentals',s:'Until 7:30'},
  {d:2,t:'11:00 AM',k:'a',n:'Adult Gi',s:'Until 12:00'},{d:2,t:'4:30 PM',k:'t',n:'Toddlers',s:'Gi · Ages 4–5'},{d:2,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:2,t:'6:00 PM',k:'a',n:'Adult All Levels',s:'Until 7:30'},
  {d:3,t:'4:30 PM',k:'t',n:'Toddlers',s:'No-Gi · Ages 4–5'},{d:3,t:'5:00 PM',k:'k',n:'Kids',s:'No-Gi · Ages 6–13'},{d:3,t:'6:00 PM',k:'a',n:'Adult Fundamentals',s:'Gi · Until 7:30'},
  {d:4,t:'11:00 AM',k:'a',n:'Adult Gi',s:'Until 12:00'},{d:4,t:'5:00 PM',k:'k',n:'Kids',s:'Gi · Ages 6–13'},{d:4,t:'6:00 PM',k:'a',n:'Adult Advanced',s:'Until 7:30'},
  {d:5,t:'5:00 PM',k:'k',n:'Kids Comp / Advanced',s:'Gi · Ages 6–13'},{d:5,t:'6:00 PM',k:'a',n:'Adult All Levels',s:'Until 7:30'},
  {d:6,t:'9:00 AM',k:'k',n:'Kids',s:'No-Gi · Ages 6–13'},{d:6,t:'10:00 AM',k:'a',n:'Adult Open Mat',s:'All levels'},
];
const TIMES = ['9:00 AM','10:00 AM','11:00 AM','4:30 PM','5:00 PM','6:00 PM'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const REVIEWS = [
  {q:"By far one of the best experiences we've had for my son! Taught him so much more than self-defense, Gonzales Jiu Jitsu taught him Self-confidence and discipline.",n:'Sonja C.',w:'Parent'},
  {q:"Professor Abie and staff are amazing literally could not ask for better instruction. They truly care about their students and their development in and out of the sport.",n:'Travis F.',w:'Google review'},
  {q:"After my daughter faced bullying at school, we enrolled her in jiu-jitsu with Professor Abie, Coach Laura, and Coach Brandon. The transformation has been incredible.",n:'Kenneth B.',w:'Parent'},
  {q:"Walked in not knowing what anything was. Good thing coaching and people are awesome. Around people who strive to be better then yesterday!",n:'Marcus B.',w:'Student'},
  {q:"My 11-year-old and 7-year-old absolutely LOVE the coaches here! They are so welcoming, encouraging and professional.",n:'Sarah S.',w:'Parent'},
  {q:"Great atmosphere! Everyone at Gonzales jiu jitsu is respectful on the mats! The women who train are welcoming and encouraging! Love my jiu jitsu sisters!!",n:'Valerie E.',w:'Student'},
  {q:"First time training and I was happily welcomed into the gym. I would trust these coaches with my two sons.",n:'Dee J.',w:'First class'},
  {q:"Hard training but easy to understand. For the hobbyist and the competitor. Huge mat space. Clean and professional environment.",n:'Andrew G.',w:'Student'},
];
const FAQ = [
  ['Do I need experience?',"No. Most adults start in Fundamentals, built for people who've never stepped on a mat. Kids start in the class for their age. Your first class is built for beginners."],
  ['How young can my child start?','Toddlers starts at four. Kids runs six to thirteen. From there, your coach tells you when it\'s time to move up.'],
  ['Gi or No-Gi?','Both. Every program trains in the Gi and No-Gi during the week. For your free class, come in shorts and a t-shirt and we\'ll take it from there.'],
  ['What does it cost?',"Your first class is free. Memberships change with the monthly sign-up special, so call or text 505-414-8083 for this month's number. Veterans can train through We Defy scholarships; city workers through One Pass."],
  ['Where are you?','1630 Rio Rancho Blvd SE, Suite D, on Highway 528 just north of Intel. We serve Rio Rancho, Albuquerque and Corrales.'],
  ['Who teaches?','Abie Gonzales, black belt and two-time IBJJF No-Gi World Champion, with black belts Tito Valdez and Adriana Rascon. Laura Gonzales and Brandon Romero assist the kids classes. Everyone is IBJJF certified.'],
];

