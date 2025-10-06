import React, { useState } from 'react';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import './assets/styles.css';

// Font Awesome-ի ԿՈՆՖԻԳՈՒՐԱՑԻԱՅԻ ներմուծում (ԼՈՒԾՈՒՄԸ)
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViber, faWhatsapp, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Ավելացնում ենք բոլոր իկոնկաները գրադարանին, որպեսզի Vite-ը դրանք ճիշտ մշակի
library.add(
  faViber,
  faWhatsapp,
  faFacebookF,
  faInstagram,
  faPhone,
  faEnvelope,
  faMapMarkerAlt
);


// Թարգմանության ֆայլերը ներմուծվում են մեկ անգամ
import hyTranslation from './translations/hy.json';
import ruTranslation from './translations/ru.json';
import nlTranslation from './translations/nl.json';

// i18n-ի Կոնֆիգուրացիա
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

// Լեզվի Ընտրիչ (LanguageSelector)
const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const activeStyle = {
    // Ոսկեգույն ֆոնը՝ ըստ Ձեր ցանկության
    backgroundColor: '#c39d67',
    // Մուգ տեքստ
    color: '#120e0d',
    fontWeight: 'bold',
    // Սեղմված տեսք
    boxShadow: '1px 1px 2px var(--shadow-dark) inset, -1px -1px 2px var(--shadow-light) inset'
  };

  const btnBaseStyle = { width: '70px', padding: '10px', margin: '0' };

  return (
    <header style={{
      textAlign: 'center',
      marginBottom: '30px',
      paddingTop: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px'
    }}>
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

// Գտնվելու Վայրի Բաժին (LocationSection)
const LocationSection = () => {
  const { t } = useTranslation();

  // Խնդրում եմ փոխարինել Ձեր հասցեի կոորդինատներով
  const googleMapsUrl = "https://maps.google.com/maps/dir/?api=1&destination=40.1772,44.5034";
  const mapIframeSrc = "https://www.google.com/maps/embed?pb=... your embed code here ...";

  return (
    <div id="location" className="neomorphic-card">
      <h2>{t('location.title')}</h2>
      <p style={{ marginBottom: '15px' }}>{t('location.address')}</p>

      <div className="map-container" style={{ height: '250px', overflow: 'hidden' }}>
        <iframe
          title="Google Map Location"
          src={mapIframeSrc}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="neomorphic-btn">
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '10px' }} />
        {t('location.button')}
      </a>
    </div>
  );
};

// Կոնտակտների Բաժին (ContactSection)
const ContactSection = () => {
  const { t } = useTranslation();

  // Խնդրում եմ այստեղ փոխարինել Ձեր սոցցանցերի հղումները
  const socialLinks = {
    viber: `viber://chat?number=${t('contact.phone').replace(/\s/g, '')}`,
    whatsapp: `https://wa.me/${t('contact.phone').replace(/\s/g, '')}`,
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
  };


  return (
    <div className="neomorphic-card">
      <h2>{t('contact.title')}</h2>

      {/* Հեռախոսազանգի հղում */}
      <div className="contact-link">
        <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`}>
          <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />
          {t('contact.call')}: {t('contact.phone')}
        </a>
      </div>

      {/* Էլ․ հասցեի հղում */}
      <div className="contact-link">
        <a href={`mailto:${t('contact.email')}`}>
          <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '10px' }} />
          {t('contact.email')}
        </a>
      </div>

      {/* Սոցիալական Ցանցեր */}
      <div className="social-icons" style={{ marginTop: '30px', textAlign: 'center' }}>

        {/* Viber */}
        <a href={socialLinks.viber} target="_blank" rel="noopener noreferrer" title="Viber">
          <FontAwesomeIcon icon={faViber} />
        </a>

        {/* WhatsApp */}
        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>

        {/* Facebook */}
        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" title="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>

        {/* Instagram */}
        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  );
};


// Գլխավոր Բաժին (MainSections)
const MainSections = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <div className="neomorphic-card" style={{ textAlign: 'center', padding: '30px 20px' }}>
        <img src="/logo.png" alt="Mix Country Logo" className="logo" />

        <h1>{t('header.title')}</h1>
        <p style={{ color: 'var(--gold)', fontSize: '1.4em', marginBottom: '10px' }}>{t('hero.date')}</p>
        <p style={{ fontSize: '1.1em' }}>{t('hero.time')}</p>
      </div>

      {/* Details Section */}
      <div className="neomorphic-card">
        <h2>{t('details.title')}</h2>
        <p style={{ marginBottom: '10px' }}>{t('details.p1')}</p>
        <p style={{ marginBottom: '10px' }}>{t('details.p2')}</p>
        <p style={{ fontWeight: 'bold', marginTop: '20px' }}>{t('details.p3')}</p>

        <a href="#location" className="neomorphic-btn">
          {t('hero.button')}
        </a>
      </div>
    </>
  );
};


// Գլխավոր App Կոմպոնենտը
const App = () => {
  return (
    <>
      <LanguageSelector />
      <MainSections />
      <LocationSection />
      <ContactSection />
    </>
  );
};

export default App;