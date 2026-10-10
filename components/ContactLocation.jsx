import Icon from './Icon';
import Logo from './Logo';
import { SITE, LINKS } from '@/data/site';

const { ratingLabel, reviewCount } = SITE.google;

// Standortblock im bisherigen Look: Adresse, Routen-Buttons, stilisierte Map-Card (Tap öffnet Google Maps).
export default function ContactLocation() {
  return (
    <section className="section location" aria-labelledby="location-title">
      <div className="location-shell" data-reveal>
        <div className="location-copy">
          <div className="eyebrow">
            <span aria-hidden="true" /> STANDORT
          </div>
          <h2 id="location-title">
            ANFAHRT{' '}
            <em>&amp; ROUTE.</em>
          </h2>
          <div className="address-block">
            <div className="address-icon">
              <Icon name="map-pin" size={26} />
            </div>
            <address>
              <span>ADRESSE</span>
              <strong>
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.city}
              </strong>
              <small>{SITE.address.district}</small>
            </address>
          </div>
          <p>Navigation starten und direkt hinfahren: Google Maps und Apple Karten öffnen die Route auf dem Handy mit Fresh Car Hamm als Ziel.</p>
          <div className="route-actions">
            <a className="route-btn google" href={LINKS.googleDirections} target="_blank" rel="noopener noreferrer">
              <Icon name="compass" size={24} />
              <span>
                <small>ROUTE MIT</small>
                GOOGLE MAPS
              </span>
              <Icon name="arrow-up-right" size={18} />
            </a>
            <a className="route-btn apple" href={LINKS.appleMaps} target="_blank" rel="noopener noreferrer">
              <Icon name="compass" size={24} />
              <span>
                <small>ROUTE MIT</small>
                APPLE KARTEN
              </span>
              <Icon name="arrow-up-right" size={18} />
            </a>
          </div>
        </div>

        <a className="map-visual" href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer" aria-label="Fresh Car Hamm auf Google Maps öffnen">
          <div className="map-grid" aria-hidden="true" />
          <div className="road road-a" aria-hidden="true" />
          <div className="road road-b" aria-hidden="true" />
          <div className="road road-c" aria-hidden="true" />
          <div className="road-label road-label-a" aria-hidden="true">
            BOCKELWEG
          </div>
          <div className="road-label road-label-b" aria-hidden="true">
            HAMM-HEESSEN
          </div>
          <div className="map-pin" aria-hidden="true">
            <span>
              <Icon name="map-pin" size={28} />
            </span>
            <div className="pin-pulse" />
          </div>
          <div className="map-business-card">
            <Logo width={86} />
            <div>
              <strong>FRESH CAR HAMM</strong>
              <span>
                {SITE.address.street} · {SITE.address.postalCode} {SITE.address.city}
              </span>
              <small>
                <Icon name="star" size={13} /> {ratingLabel} · {reviewCount} Google-Rezensionen
              </small>
            </div>
            <Icon name="arrow-up-right" size={18} />
          </div>
          <div className="map-open" aria-hidden="true">
            AUF GOOGLE MAPS ÖFFNEN <Icon name="arrow-up-right" size={14} />
          </div>
        </a>
      </div>
    </section>
  );
}
