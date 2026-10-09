import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './responsive.css';
import './experience.css';
import './faq.css';
import './social.css';
import { CreativeDetails } from './experience';

const routes = [['Home', '/'], ['Work', '/work'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']];
const work = [
  { id: '01', name: 'Web platforms', type: 'Website development', tone: 'violet', copy: 'Fast, responsive websites that make your business clear and easy to choose.' },
  { id: '02', name: 'Business software', type: 'Software development', tone: 'lime', copy: 'Practical portals, dashboards, and workflows built around the way your team works.' },
  { id: '03', name: 'Mobile products', type: 'Mobile app development', tone: 'coral', copy: 'Useful customer and team apps designed for everyday use.' },
];
const services = [
  ['01', 'Website development', 'High-performing websites that present your business professionally and convert visitors into enquiries.'],
  ['02', 'Software development', 'Custom software, dashboards, and automation that simplify important work.'],
  ['03', 'Mobile app development', 'Reliable Android, iOS, and cross-platform apps for customers and teams.'],
  ['04', 'Cloud & IT support', 'Cloud-ready infrastructure, integrations, and dependable technical support.'],
];

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [path, setPath] = useState(() => window.location.pathname || '/');
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactDelivery, setContactDelivery] = useState(null);
  const [contactStatus, setContactStatus] = useState('idle');
  const [loading, setLoading] = useState(true);
  const whatsappUrl = 'https://wa.me/919080777754?text=Hello%20Eesan%20IT%20Solutions%2C%20I%20would%20like%20to%20discuss%20a%20project.';
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1150);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);
  const go = (event, to) => {
    event.preventDefault();
    if (path !== to) { window.history.pushState({}, '', to); setPath(to); }
    setMenu(false);
  };
  const prepareContactDelivery = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = fields.get('name')?.trim() || 'Not provided';
    const email = fields.get('email')?.trim() || 'Not provided';
    const company = fields.get('company')?.trim() || 'Not provided';
    const service = fields.get('service') || 'Not selected';
    const details = fields.get('details')?.trim() || 'Not provided';
    const message = `New project enquiry for Eesan IT Solutions\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService needed: ${service}\n\nProject details:\n${details}`;
    const delivery = {
      email: `mailto:bhuvanesan.s10@gmail.com?subject=${encodeURIComponent(`New Eesan enquiry — ${name}`)}&body=${encodeURIComponent(message)}`,
      whatsapp: `https://wa.me/919080777754?text=${encodeURIComponent(message)}`,
    };
    setContactStatus('sending');
    setSent(false);
    setContactDelivery(delivery);
    try {
      const response = await fetch('https://formsubmit.co/ajax/bhuvanesan.s10@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          service,
          project_details: details,
          _subject: `New Eesan website enquiry — ${name}`,
          _template: 'table',
          _replyto: email,
        }),
      });
      if (!response.ok) throw new Error('Email delivery request failed');
      form.reset();
      setContactStatus('sent');
      setSent(true);
    } catch {
      setContactStatus('fallback');
      setSent(true);
    }
  };
  const BrandMark = ({ footer = false }) => <a className={`brand-mark${footer ? ' brand-mark-footer' : ''}`} href="/" onClick={(event) => go(event, '/')} aria-label="Eesan IT Solutions home">
    <img src={footer ? "/eesan-it-solutions-transparent.png" : "/eesan-it-solutions-original-cutout.png"} alt="Eesan IT Solutions" />
  </a>;
  const Header = () => <header className="header">
    <BrandMark />
    <button className={`menu ${menu ? 'is-open' : ''}`} onClick={() => setMenu(!menu)} aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu}><i></i><i></i></button>
    <nav aria-label="Primary navigation" className={menu ? 'open' : ''}>{routes.map(([label, to]) => <a key={to} href={to} className={path === to ? 'active' : ''} onClick={(event) => go(event, to)}>{label}</a>)}</nav>
    <a className="round-link desktop-contact" href="/contact" onClick={(event) => go(event, '/contact')}><span>Start a project</span><b>↗</b></a>
  </header>;
  const socialLinks = [
    ['Instagram', '◎', 'https://www.instagram.com/bhuvanesan__s?mdxt=cG95aWk3MjR1Z3Zp'],
    ['Facebook', 'f', 'https://www.facebook.com/share/19myUddTtK/'],
    ['YouTube', '▶', 'https://youtube.com/@bhuvanesans?si=RscryeOkbARWc5x2'],
    ['WhatsApp', '◔', whatsappUrl],
    ['Email', '✉', 'mailto:bhuvanesan.s10@gmail.com'],
  ];
  const Footer = () => <footer><div className="footer-top"><BrandMark footer /><p>Ideas, developed.<br />Solutions, delivered.</p><a className="round-link light" href="/contact" onClick={(event) => go(event, '/contact')}><span>Let’s work</span><b>↗</b></a></div><div className="footer-social-row"><p>Follow Eesan</p><div className="footer-socials">{socialLinks.map(([label, icon, href]) => <a key={label} className={`social-link social-${label.toLowerCase()}`} href={href} aria-label={`Eesan IT Solutions on ${label}`} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span aria-hidden="true">{icon}</span><em>{label}</em></a>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Eesan IT Solutions</span><span>Ideas · Develop · Deploy · Grow</span></div></footer>;
  const WhatsAppButton = () => <a className="whatsapp-fab" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Eesan IT Solutions on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M27.1 4.8A15.3 15.3 0 0 0 2.9 23.2L1 31l8-2.1a15.2 15.2 0 0 0 7.2 1.8h.1A15.2 15.2 0 0 0 27.1 4.8ZM16.3 28.1h-.1a12.5 12.5 0 0 1-6.4-1.7l-.5-.3-4.8 1.3 1.3-4.7-.3-.5A12.6 12.6 0 1 1 16.3 28.1Zm6.9-9.4c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.6-.2.3-.4.3-.8.1-2.2-1.1-3.7-2-5.1-4.6-.4-.6.4-.6 1.1-1.9.1-.3.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.4 3.9 1.6 4.2c.2.3 2.7 4.2 6.6 5.9.9.4 1.6.7 2.2.9.9.3 1.8.3 2.4.2.7-.1 2.4-1 2.7-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5Z" /></svg><span>WhatsApp us</span></a>;
  const LoadingScreen = () => <div className={`loading-screen${loading ? '' : ' is-hidden'}`} aria-hidden={!loading}><div className="loader-mark"><i></i><i></i><i></i><b>✦</b></div><p>Preparing your digital experience</p></div>;
  const Home = () => <><section className="hero">
    <div className="hero-grid"></div><div className="hero-noise"></div>
    <div className="hero-copy"><p className="eyebrow"><span></span> Eesan IT Solutions</p><h1>Build digital<br /><em>with confidence.</em></h1><p className="hero-lead">From your first website to the software behind your business, we turn ideas into reliable digital products.</p><div className="hero-actions"><a className="button-lime" href="/contact" onClick={(event) => go(event, '/contact')}>Start your project <b>↗</b></a><a className="button-ghost" href="/services" onClick={(event) => go(event, '/services')}>View services <b>↓</b></a></div><div className="hero-points"><span>Websites</span><span>Software</span><span>Mobile apps</span><span>Cloud</span></div></div>
    <div className="hero-capability-bar" aria-hidden="true"><p><i></i> Digital capabilities</p><span>Web</span><span>Software</span><span>Mobile</span><span>Cloud</span><b>↗</b></div>
    <div className="hero-3d-stage" aria-hidden="true"><i className="stage-ring ring-back"></i><i className="stage-ring ring-front"></i><i className="stage-platform"></i><img className="hero-brand-art" src="/eesan-it-solutions-original-cutout.png" alt="" /></div>
    <div className="hero-shape shape-one"></div><div className="hero-shape shape-two"></div><div className="hero-orbit"><span>ideas to impact</span><i>↓</i></div>
  </section>
  <section className="service-rail">{services.map(([number, name, copy]) => <a key={number} href="/services" onClick={(event) => go(event, '/services')}><span>{number}</span><strong>{name}</strong><p>{copy}</p><b>↗</b></a>)}</section>
  <Reveal className="manifesto"><p className="index">01 — WHAT WE DO</p><h2>Digital solutions that are <em>easy to use, ready to grow,</em> and built around your business.</h2><a href="/about" onClick={(event) => go(event, '/about')} className="text-arrow">How Eesan works <b>↗</b></a></Reveal>
  <Reveal className="work-intro"><div><p className="kicker">Recent work</p><h2>For brands<br />with a pulse.</h2></div><a href="/work" onClick={(event) => go(event, '/work')} className="text-arrow">All projects <b>↗</b></a></Reveal>
  <section className="work-stack">{work.map((item, index) => <Reveal key={item.id} className={`work-card ${item.tone}`}><div className="work-card-top"><span>{item.id}</span><span>{item.type}</span></div><div className="browser-mock"><div className="browser-bar"><i></i><i></i><i></i></div><div className="mock-content"><span>{item.name}</span><strong>{index === 0 ? 'Clarity compounds.' : index === 1 ? 'Gather beautifully.' : 'Skin, considered.'}</strong><i></i></div></div><div className="work-caption"><h3>{item.name}</h3><p>{item.copy}</p><a href="/work" onClick={(event) => go(event, '/work')}>View case study <b>↗</b></a></div></Reveal>)}</section>
  <Reveal className="statement-band"><div><p className="kicker">Small team. Wide range.</p><h2>Big-agency thinking,<br /><em>zero agency theatre.</em></h2></div><div className="big-star">✳</div></Reveal>
  <Reveal className="home-services"><p className="kicker">Capabilities</p><div>{services.map(([number, name]) => <a href="/services" onClick={(event) => go(event, '/services')} key={number}><span>{number}</span><strong>{name}</strong><b>↗</b></a>)}</div></Reveal></>;
  const Work = () => <><section className="page-hero"><p className="kicker">Selected work / 2023—2026</p><h1>We build <em>momentum</em><br />for useful brands.</h1><p>Every project starts by finding the sharpest version of the story. Then we make it move.</p></section><section className="work-stack page-work">{work.concat([{ id:'04', name:'Eon Learning', type:'Learning platform', tone:'ink', copy:'A warm, capable learning home for curious teams.' }]).map((item, index) => <Reveal key={item.id} className={`work-card ${item.tone}`}><div className="work-card-top"><span>{item.id}</span><span>{item.type}</span></div><div className="browser-mock"><div className="browser-bar"><i></i><i></i><i></i></div><div className="mock-content"><span>{item.name}</span><strong>{index % 2 ? 'Good ideas, together.' : 'A clearer path forward.'}</strong><i></i></div></div><div className="work-caption"><h3>{item.name}</h3><p>{item.copy}</p><a href="/contact" onClick={(event) => go(event, '/contact')}>Build something similar <b>↗</b></a></div></Reveal>)}</section></>;
  const Services = () => <><section className="page-hero services-hero"><p className="kicker">What we bring</p><h1>From first thought<br />to <em>first click.</em></h1><p>One integrated crew for work that needs to look right, feel right, and perform.</p></section><section className="services-list">{services.map(([number, name, copy]) => <Reveal key={number} className="service"><span>{number}</span><div><h2>{name}</h2><p>{copy}</p></div><b>↗</b></Reveal>)}</section><Reveal className="service-note"><p>Not sure where to begin?</p><h2>Bring the question. We’ll help you find the useful next move.</h2><a className="button-lime" href="/contact" onClick={(event) => go(event, '/contact')}>Start a conversation <b>↗</b></a></Reveal></>;
  const About = () => <><section className="page-hero about-hero"><p className="kicker">Eesan IT Solutions</p><h1>Built for ideas<br /><em>that need to move.</em></h1></section><Reveal className="about-copy"><p className="index">02 — OUR POINT OF VIEW</p><h2>Eesan IT Solutions turns business ideas into dependable digital experiences.</h2><p>We bring web, software, mobile, cloud, and IT expertise into one practical process—so your project can move from idea to development, deployment, and growth with clarity.</p></Reveal><section className="values">{[['Clear beats clever', 'We make complex choices feel obvious.'], ['Care is a feature', 'The small details are where trust lives.'], ['Built to grow', 'We create solutions that can keep pace with your next step.']].map(([title, copy], index) => <Reveal key={title} className="value"><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</section></>;
  const Contact = () => <><section className="page-hero contact-hero"><p className="kicker">Let’s build something useful</p><h1>Your next idea<br />can <em>start here.</em></h1><p>Tell us what you need, and the Eesan IT Solutions team will help you find a practical path forward.</p></section><section className="contact-wrap"><Reveal className="contact-aside"><p className="index">03 — CONTACT</p><h2>Website, software,<br />mobile or cloud?<br /><em>We’re listening.</em></h2><p className="contact-direct">Send your project details through the form, call us, or start a WhatsApp chat.</p><div className="contact-actions"><a href="tel:+919080777754">Call +91 90807 77754</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +91 90807 77754 <b>↗</b></a></div></Reveal><Reveal className="contact-form"><form onSubmit={prepareContactDelivery}><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Company <small>(optional)</small><input name="company" placeholder="Company or organisation" /></label><label>What do you need?<select required name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website development</option><option>Software development</option><option>Mobile app development</option><option>Cloud solutions</option><option>IT consulting & support</option></select></label><label>Tell us a little<textarea required name="details" rows="5" placeholder="The useful details, in your words." /></label><button className="button-lime" type="submit" disabled={contactStatus === 'sending'}>{contactStatus === 'sending' ? 'Sending enquiry…' : 'Send enquiry'} <b>↗</b></button>{sent && <div className="delivery-options" aria-live="polite"><strong>{contactStatus === 'sent' ? 'Your enquiry has been emailed to Eesan.' : 'Email delivery needs a fallback.'}</strong><p>{contactStatus === 'sent' ? 'You can also send the same details by WhatsApp for a faster reply.' : 'Use WhatsApp or your email app to send the full enquiry now.'}</p><div><a className="delivery-whatsapp" href={contactDelivery?.whatsapp} target="_blank" rel="noreferrer">Send by WhatsApp</a>{contactStatus === 'fallback' && <a className="delivery-email" href={contactDelivery?.email}>Send by email</a>}</div></div>}</form></Reveal></section></>;
  const HomeRich = () => <><Home /><CreativeDetails page="home" go={go} work={work} services={services} /></>;
  const WorkRich = () => <><Work /><CreativeDetails page="work" go={go} work={work} services={services} /></>;
  const ServicesRich = () => <><Services /><CreativeDetails page="services" go={go} work={work} services={services} /></>;
  const AboutRich = () => <><About /><CreativeDetails page="about" go={go} work={work} services={services} /></>;
  const ContactRich = () => <><Contact /><CreativeDetails page="contact" go={go} work={work} services={services} /></>;
  const current = path === '/work' ? <WorkRich /> : path === '/services' ? <ServicesRich /> : path === '/about' ? <AboutRich /> : path === '/contact' ? <ContactRich /> : <HomeRich />;
  return <><LoadingScreen /><Header /><main>{current}</main><WhatsAppButton /><Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
