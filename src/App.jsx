import React, { useState, useEffect } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
// ԿԱՐԵՎՈՐ Է: Այս CSS ֆայլում է մեր նոր, բաց դիզայնը և անիմացիաները
import './assets/styles.css';

// Font Awesome-ի ԿՈՆՖԻԳՈՒՐԱՑԻԱՅԻ ներմուծում
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViber, faWhatsapp, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Իկոնկաների ավելացում
library.add(faViber, faWhatsapp, faFacebookF, faInstagram, faPhone, faEnvelope, faMapMarkerAlt);


// Թարգմանության ֆայլերը ներմուծվում են մեկ անգամ
import hyTranslation from './translations/hy.json';
import ruTranslation from './translations/ru.json';
import nlTranslation from './translations/nl.json';

// i18n-ի Կոնֆիգուրացիա (Անփոփոխ)
i18n
  .use(initReactI18next)
  .init({
    resources: {
      hy: { translation: hyTranslation },
      ru: { translation: ruTranslation },
      nl: { translation: nlTranslation },
    },
    lng: 'hy',
    fallbackLng: 'hy',
    interpolation: {
      escapeValue: false,
    },
  });

// --- ԿՈՄՊՈՆԵՆՏՆԵՐ ---

// Հետհաշվարկի Ժամաչափ (CountdownTimer) - (Փոփոխություն չկա, քանի որ տրամաբանությունը ճիշտ է)
const CountdownTimer = ({ targetDate, targetTime }) => {
  const { t } = useTranslation();

  const translateUnit = (unit) => {
    return t(`countdown.${unit}`);
  };

  const calculateTimeLeft = () => {
    // ԿՈՇՏ ԳՐՎԱԾ ԹԻՐԱԽԱՅԻՆ ԺԱՄԱՆԱԿ
    const targetTimestamp = new Date('October 15, 2025 18:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetTimestamp - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (timeLeft.expired) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = Object.keys(timeLeft).filter(key => key !== 'expired').map((unit) => {
    if (!timeLeft[unit] && unit !== 'seconds' && timeLeft.days === 0 && timeLeft.hours === 0) {
      return null;
    }

    return (
      <div key={unit} className="time-unit **animated-scale**"> {/* Ավելացնում ենք անիմացիայի դաս */}
        <div className="time-value neomorphic-btn">
          {timeLeft[unit] < 10 ? `0${timeLeft[unit]}` : timeLeft[unit]}
        </div>
        <span className="time-label">{translateUnit(unit)}</span>
      </div>
    );
  });

  return (
    <div className="countdown-container">
      {timeLeft.expired ? (
        <p className="countdown-expired">{t('countdown.event_started')}</p>
      ) : (
        <div className="countdown-blocks">
          {timerComponents}
        </div>
      )}
    </div>
  );
};

// Լեզվի Ընտրիչ (LanguageSelector) - (Փոքր ոճային փոփոխություններ)
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const activeStyle = {
    backgroundColor: 'var(--gold)',
    color: 'var(--bg-color)',
    fontWeight: 'bold',
    boxShadow: '2px 2px 4px var(--shadow-dark) inset, -2px -2px 4px var(--shadow-light) inset'
  };

  const btnBaseStyle = { width: '70px', padding: '10px', margin: '0' };

  return (
    <header className="lang-selector-header">
      <button
        onClick={() => changeLanguage('hy')}
        style={i18n.language === 'hy' ? { ...btnBaseStyle, ...activeStyle } : btnBaseStyle}
        className="neomorphic-btn">ՀՅ</button>
      <button
        onClick={() => changeLanguage('ru')}
        style={i18n.language === 'ru' ? { ...btnBaseStyle, ...activeStyle } : btnBaseStyle}
        className="neomorphic-btn">РУ</button>
      <button
        onClick={() => changeLanguage('nl')}
        style={i18n.language === 'nl' ? { ...btnBaseStyle, ...activeStyle } : btnBaseStyle}
        className="neomorphic-btn">NL</button>
    </header>
  );
};

// Գտնվելու Վայրի Բաժին (LocationSection) - (Փոքր ոճային փոփոխություններ)
const LocationSection = () => {
  const { t } = useTranslation();

  const googleMapsUrl = "https://maps.app.goo.gl/5DPwmFcfYrEr7oUa8";

  return (
    <div id="location" className="neomorphic-card animated-fade-in">
      <h2>{t('location.title')}</h2>
      <p className="address-text">{t('location.address')}</p>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2498.277562686073!2d4.451887876452583!3d51.23238287175217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3f779d271d7b9%3A0x4d2f09b8d9c09b8a!2sMix%20Country%20Supermarkt!5e0!3m2!1sru!2sam!4v1759847924802!5m2!1sru!2sam"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Մեր գրասենյակի տեղակայությունը քարտեզի վրա"
          className="map-iframe"
        ></iframe>
      </div>

      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="neomorphic-btn btn-full-width">
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px' }} />
        {t('location.button')}
      </a>
    </div>
  );
};

// Կոնտակտների Բաժին (ContactSection) - (Մաքրվել է Karen Catering տողը)
const ContactSection = () => {
  const { t } = useTranslation();

  const socialLinks = {
    viber: `viber://chat?number=${t('contact.phone').replace(/\s/g, '')}`,
    whatsapp: `https://wa.me/${t('contact.phone').replace(/\s/g, '')}`,
    facebook: 'https://www.facebook.com/mix.country.supermarkt?mibextid=wwXIfr&rdid=2dNjl4I7Iup6HfYD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16JNQTDE7B%2F%3Fmibextid%3DwwXIfr#',
    instagram: 'https://www.instagram.com/mixcountrysupermarkt/?igsh=a3p3ampkbDdzczZn#',
  };


  return (
    <div className="neomorphic-card animated-fade-in contact-card-mb">
      <h2>{t('contact.title')}</h2>

      {/* Հեռախոսազանգի հղում */}
      <div className="contact-link interactive-link">
        <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`}>
          <FontAwesomeIcon icon={faPhone} />
          <span>{t('contact.call')}: {t('contact.phone')}</span>
        </a>
      </div>

      {/* Էլ․ հասցեի հղում */}
      <div className="contact-link interactive-link">
        <a href={`mailto:${t('contact.email')}`}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>{t('contact.email')}</span>
        </a>
      </div>

      {/* Սոցիալական Ցանցեր */}
      <div className="social-icons">

        {/* Viber */}
        <a href={socialLinks.viber} target="_blank" rel="noopener noreferrer" title="Viber" className="social-icon-btn">
          <FontAwesomeIcon icon={faViber} />
        </a>

        {/* WhatsApp */}
        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="social-icon-btn">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>

        {/* Facebook */}
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon-btn">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        {/* Instagram */}
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon-btn">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  );
};

// Համագործակցող Ընկերությունների Լոգոներ (PartnerLogos) - ՊԱՐԶԵՑՎԱԾ, ԻՆՉՊԵՍ ԽՆԴՐԵՑԻՔ
const PartnerLogos = () => {

  const logoTextStyle = {
    fontWeight: 'bold',
    color: 'var(--gold)',
    fontSize: '1.2em',
    margin: '5px 0'
  };

  return (
    <footer className="footer-partners">
      <div className="partners-container">
        {/* Karen Catering */}
        <div className="neomorphic-btn partner-btn animated-pop">
          <div style={logoTextStyle}>Karen Catering</div>
        </div>
        {/* Tomas Sweets */}
        <div className="neomorphic-btn partner-btn animated-pop">
          <div style={logoTextStyle}>Tomas Sweets</div>
        </div>
      </div>
      {/* Պարզ հեղինակային իրավունքի տող */}
      <p className="copyright-text">
        © {new Date().getFullYear()} Mix Country Supermarkt
      </p>
    </footer>
  );
};


// Գլխավոր Բաժին (MainSections) - (Փոքր ոճային փոփոխություններ)
const MainSections = () => {
  const { t } = useTranslation();
  const eventDate = 'October 15';
  const eventTime = '18:00';

  return (
    <>
      {/* Hero Section */}
      <div className="neomorphic-card animated-fade-in hero-section">
        {/* Հեռացված է 'animated-bounce' և 'logo' դասերը */}
        <img src="/logo.png" alt="Mix Country Logo" className="plain-logo" />

        <h1 className="hero-title">{t('header.title')}</h1>
        <p className="hero-date">{t('hero.date')}</p>
        <p className="hero-time">{t('hero.time')}</p>

        <CountdownTimer targetDate={eventDate} targetTime={eventTime} />
      </div>

      {/* ... (Details Section-ը անփոփոխ) */}
      <div className="neomorphic-card animated-fade-in details-section">
        <h2>{t('details.title')}</h2>
        <p>{t('details.p1')}</p>
        <p>{t('details.p2')}</p>
        <p>{t('details.p3')}</p>
        <p>{t('details.p4')}</p>
        <p>{t('details.p5')}</p>
        <p>{t('details.p6')}</p>
        <p>{t('details.p7')}</p>
        <p>{t('details.p8')}</p>
        <p>{t('details.p9')}</p>
        <p>{t('details.p10')}</p>
        <p className="details-emphasis">{t('details.p11')}</p>

        <a href="#location" className="neomorphic-btn btn-full-width">
          {t('hero.button')}
        </a>
      </div>
    </>
  );
};


// Գլխավոր App Կոմպոնենտը
const App = () => {
  return (
    <div className="app-container"> {/* Ընդհանուր կոնտեյներ բաց ֆոնի համար */}
      <LanguageSelector />
      <MainSections />
      <LocationSection />
      <ContactSection />
      <PartnerLogos />
    </div>
  );
};

export default App;