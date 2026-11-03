import { client } from '../../nd/config'
import { fetchPrograms, type Program } from '../../nd/programs'
import { adsConversion, fbTrack, gaTrack } from '../../nd/tracking'
import { sendBooking, sendLead, type BookingData } from '../../nd/webhook'
import type { Prog } from '../../data/schedule'

// The two forms (modal and ticket) keep the prototype's look and fields; this is what they send,
// through the Novo Dash kit. A webhook failure never blocks the person: the sent state shows anyway.

const letters = (s: string) => (s.match(/\p{L}/gu) ?? []).length
const digits = (s: string) => s.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')

export const validName = (s: string) => letters(s.trim()) >= 2
export const validPhone = (s: string) => digits(s).length === 10

/** Anti-spam: the honeypot is empty and this tab has not sent in the last 30 s. */
const KEY = 'gjj_lead_at'
export function mayBeHuman(honeypot: string) {
  if (honeypot.trim()) return false
  try {
    const last = Number(sessionStorage.getItem(KEY) || 0)
    if (Date.now() - last < 30_000) return false
    sessionStorage.setItem(KEY, String(Date.now()))
  } catch { /* private mode: the honeypot alone */ }
  return true
}

const audienceOf = (p: Prog): 'adults' | 'kids' => (p === 'adults' ? 'adults' : 'kids')

export function lead(form: 'modal' | 'ticket', p: Prog, name: string, phone: string, slot?: { day: number; time: string }) {
  const data: BookingData = { fullName: name.trim(), childName: '', email: '', phone: phone.trim(), calendarId: '', date: '', time: '', preferredAudience: audienceOf(p) }
  sendLead(data, null, client.source)
  const user = { name: data.fullName, phone: data.phone }
  fbTrack('Lead', { content_name: p, form }, user)
  gaTrack('generate_lead', { form, program: p })
  adsConversion(client.tracking.adsLeadLabel)
  if (!slot) return
  // The ticket names a weekday and a start: when the academy's live calendar has a class of that
  // audience at that start on the next such day (Rio Rancho time), it is booked too.
  const hhmm = to24(slot.time)
  const date = nextDate(slot.day, hhmm)
  fetchPrograms(audienceOf(p)).then((programs: Program[]) => {
    const match = programs.find(pr => pr.audience === audienceOf(p) && pr.slots[date]?.includes(hhmm))
    if (!match) return
    sendBooking({ ...data, calendarId: match.calendar_id, date, time: hhmm }, match, client.source)
    fbTrack('Schedule', { content_name: match.name }, user)
    gaTrack('schedule', { program: p })
    adsConversion(client.tracking.adsBookedLabel)
  }).catch(() => {})
}

/** "YYYY-MM-DD" of the next given weekday (0 Sunday) in America/Denver; today only while the class is still ahead. */
function nextDate(day: number, hhmm: string) {
  const now = new Date()
  for (let i = 0; i < 8; i++) {
    const d = new Date(now.getTime() + i * 86400000)
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Denver', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d).map(x => [x.type, x.value]))
    if (i === 0 && `${p.hour}:${p.minute}` >= hhmm) continue
    if (['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday) === day) return `${p.year}-${p.month}-${p.day}`
  }
  return ''
}

/** "4:30 PM" -> "16:30", the kit's slot format. */
function to24(t: string) {
  const [hm, ap] = t.split(' '); let [h, m] = hm.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
