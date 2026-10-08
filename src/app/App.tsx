import { useState } from "react";

type IconName = "paw" | "pin" | "check" | "care" | "matching" | "handover" | "drafts" | "profile" | "arrow" | "shield" | "plus";
function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    paw: <><ellipse cx="7" cy="7" rx="2" ry="3" /><ellipse cx="17" cy="7" rx="2" ry="3" /><ellipse cx="3" cy="12" rx="1.5" ry="2" /><ellipse cx="21" cy="12" rx="1.5" ry="2" /><path d="M7 17c0-3 3-6 5-6s5 3 5 6c0 4-3 2-5 2s-5 2-5-2Z" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    care: <><path d="M9 4H5v17h14V4h-4M9 3h6v4H9z" /><path d="m8 14 3 3 5-6" /></>,
    matching: <><path d="m8 5 4-2 9 8-5 7-4 3-9-9 5-7Z" /><path d="m8 5 5 5-3 3-3-2m5 6 3-3m-7 0 3-3" /></>,
    handover: <><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4" /></>,
    drafts: <><path d="M5 3h10l4 4v5M15 3v5h4M5 3v18h6m1-4 6-6 3 3-6 6-4 1 1-4Z" /></>,
    profile: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="3" /><path d="M6 19v-2c0-4 12-4 12 0v2" /></>,
    arrow: <path d="m9 5 7 7-7 7" />,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return <svg viewBox="0 0 24 24" fill={name === "paw" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name]}</svg>;
}

type CareTask = { id: string; title: string; cat: string; time: string; area: string; status: "Scheduled" | "In progress" | "Available" | "Interest sent"; photo: string; instructions: string; match?: string };
const photos = ["photo-1559624989-7b9303bd9792", "photo-1498100152307-ce63fd6c5424", "photo-1536589961747-e239b2abbec2", "photo-1583795128727-6ec3642408f8"];
const initialTasks: CareTask[] = [
  { id: "mochi", title: "Morning Feeding", cat: "Mochi", time: "Today, 8:30 AM", area: "Greenwood Park", status: "Scheduled", photo: photos[0], instructions: "Fresh wet food & replenish filtered water." },
  { id: "luna", title: "Medication Check", cat: "Luna", time: "Today, 1:00 PM", area: "North Quarter", status: "In progress", photo: photos[1], instructions: "Administer ear drops, 1 ml." },
  { id: "barnaby", title: "Afternoon Social Visit", cat: "Barnaby", time: "Today, 3:00 PM", area: "Greenwood East", status: "Available", photo: photos[2], instructions: "Spend a little time with Barnaby and check his water.", match: "Matches your area" },
  { id: "whiskers", title: "Senior Foster Care", cat: "Whiskers", time: "Tomorrow, 9:00 AM", area: "North Quarter", status: "Interest sent", photo: photos[3], instructions: "Help our senior cat settle into a comfortable foster home.", match: "Matches your experience" },
];

function CareCard({ task, onInterest }: { task: CareTask; onInterest: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const isMatch = !!task.match;
  const sent = task.status === "Interest sent";
  return <article className="rounded-2xl border border-border bg-white p-4">
    <div className="flex items-center gap-3">
      <img src={`https://images.unsplash.com/${task.photo}?auto=format&fit=crop&w=160&h=160&q=80`} alt={task.cat} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
      <div className="min-w-0"><h3 className="text-[16px] font-semibold leading-6">{task.title}</h3><p className="mt-0.5 text-[12px] text-muted-foreground">{task.cat}<span className="mx-1.5 text-[#a5afa9]">·</span>{task.time}</p></div>
    </div>
    <div className="mt-4 rounded-lg bg-[#f5f7f5] px-3 py-2.5">
      <p className="flex items-center gap-2 text-[13px] font-medium"><Icon name="pin" className="h-4 w-4 shrink-0 text-primary" />{task.area}<span className="ml-auto text-[11px] font-normal text-muted-foreground">Approx. area</span></p>
      {!isMatch && <p className="mt-2 text-[12px] leading-5 text-muted-foreground">{task.instructions}</p>}
    </div>
    {isMatch && <p className="mt-3 flex items-center gap-1.5 text-[12px] text-primary"><Icon name={task.id === "barnaby" ? "pin" : "shield"} className="h-3.5 w-3.5" />{task.match}</p>}
    <div className="mt-4 flex items-center justify-between gap-2">
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${task.status === "In progress" ? "bg-[#dff3e6] text-[#276548]" : sent ? "bg-[#edf4ef] text-[#37654b]" : "bg-[#f0f2ef] text-[#5d6c61]"}`}><span className={`h-1.5 w-1.5 rounded-full ${task.status === "Available" ? "bg-[#81907b]" : "bg-[#448361]"}`} />{task.status}</span>
      {isMatch ? sent ? <span className="flex items-center gap-1.5 text-[12px] font-medium text-primary"><Icon name="check" className="h-4 w-4" />Interest sent</span> : <button onClick={() => onInterest(task.id)} className="min-h-10 rounded-lg bg-primary px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#2e6149] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">I'm interested</button> : <button aria-expanded={expanded} onClick={() => setExpanded(!expanded)} className="flex min-h-9 items-center gap-1 text-[12px] font-medium text-primary">{expanded ? "Hide details" : "View details"}<Icon name="arrow" className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} /></button>}
    </div>
    {expanded && <p className="mt-3 border-t border-border pt-3 text-[12px] leading-5 text-muted-foreground">Care for {task.cat} at {task.time.toLowerCase()}. {task.instructions} Only the approximate neighborhood is shared.</p>}
  </article>;
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [announcement, setAnnouncement] = useState("");
  const sendInterest = (id: string) => {
    setTasks(current => current.map(task => task.id === id ? { ...task, status: "Interest sent" } : task));
    setAnnouncement("Interest sent. The care organiser will be in touch.");
  };
  const tabs: { label: string; icon: IconName }[] = [{ label: "Care", icon: "paw" }, { label: "Matching", icon: "matching" }, { label: "Handover", icon: "handover" }, { label: "Drafts", icon: "drafts" }, { label: "Profile", icon: "profile" }];
  return <div className="min-h-dvh bg-[#f3f5f2] text-foreground sm:py-8">
    <div className="relative mx-auto min-h-dvh w-full max-w-[390px] bg-white sm:min-h-[844px] sm:rounded-[24px] sm:border sm:border-border">
      <header className="flex h-[72px] items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-[#e0eddb]"><Icon name="paw" className="h-5 w-5" /></span><span className="text-[19px] font-bold">MewLink</span></div>
        <span className="rounded-full border border-[#dce6da] bg-[#f5f8f2] px-2.5 py-1 text-[10px] font-medium text-[#5a7154]">A little care, every day</span>
      </header>
      <main className="px-4 pb-28 pt-7">
        <div className="mb-7"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#748471]">Your community, connected</p><h1 className="text-[29px] font-semibold leading-9 tracking-[-0.5px]">Recent Care</h1><p className="mt-1.5 text-[13px] text-muted-foreground">Calm daily rhythm & care tasks</p></div>
        <section aria-labelledby="my-care"><div className="mb-3.5 flex items-center justify-between"><h2 id="my-care" className="flex items-center gap-2 text-[18px] font-semibold"><Icon name="care" className="h-5 w-5 text-primary" />My care</h2><span className="rounded-full bg-[#f1f3ef] px-2.5 py-1 text-[11px] font-medium text-muted-foreground">2 today</span></div><div className="space-y-3">{tasks.filter(task => !task.match).map(task => <CareCard key={task.id} task={task} onInterest={sendInterest} />)}</div></section>
        <section aria-labelledby="for-you" className="mt-8"><div className="mb-3.5 flex items-center justify-between"><h2 id="for-you" className="flex items-center gap-2 text-[18px] font-semibold"><Icon name="paw" className="h-5 w-5 text-primary" />For you</h2><span className="text-[11px] text-muted-foreground">Voluntary matches</span></div><div className="space-y-3">{tasks.filter(task => task.match).map(task => <CareCard key={task.id} task={task} onInterest={sendInterest} />)}</div><p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground"><Icon name="shield" className="h-3.5 w-3.5" />Community care. Approximate locations only.</p></section>
      </main>
      <p role="status" className="sr-only">{announcement}</p>
      <nav aria-label="Main navigation" className="fixed bottom-0 left-1/2 z-10 grid w-full max-w-[390px] -translate-x-1/2 grid-cols-5 border-t border-border bg-white/95 px-2 pb-5 pt-3 backdrop-blur-sm sm:pb-4">
        {tabs.map((tab, index) => <button key={tab.label} aria-current={index === 0 ? "page" : undefined} onClick={() => { if (index === 0) window.scrollTo({ top: 0, behavior: "smooth" }); else setAnnouncement(`${tab.label} is coming soon. This preview includes the Care homepage.`); }} className={`flex min-h-11 flex-col items-center gap-1 text-[10px] ${index === 0 ? "font-semibold text-primary" : "text-[#7c847c]"}`}><span className={`flex h-7 w-10 items-center justify-center rounded-lg ${index === 0 ? "bg-[#eaf2e6]" : ""}`}><Icon name={tab.icon} className="h-5 w-5" /></span>{tab.label}</button>)}
      </nav>
    </div>
  </div>;
}
