"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Home, Monitor, Wifi } from "lucide-react";
import styles from "./portfolio-section.module.css";

const properties = [
  {
    name: "The Coastal House",
    location: "A place by the water",
    guests: "Maya & Jordan",
    network: "CoastalHouse_Guest",
    note: "Beach towels are in the hall cupboard.",
  },
  {
    name: "The Woodland Cabin",
    location: "A slower kind of weekend",
    guests: "Alex & Sam",
    network: "Woodland_Guest",
    note: "Trail maps are beside the front door.",
  },
  {
    name: "The City Loft",
    location: "Right in the neighborhood",
    guests: "Taylor & Morgan",
    network: "CityLoft_Guest",
    note: "Your favorite coffee is a short walk away.",
  },
];
export function PortfolioSection() {
  const [selected, setSelected] = useState(0);
  const property = properties[selected];
  return (
    <section
      id="property-managers"
      className={styles.section}
      aria-labelledby="portfolio-title"
    >
      <div className={styles.copy}>
        <p className={styles.eyebrow}>FOR PROPERTY MANAGERS</p>
        <h2 id="portfolio-title">
          One portfolio.
          <br />
          <em>Every stay, personal.</em>
        </h2>
        <p>
          A consistent guest experience across your properties, with room for
          what makes each one special. Manage the screens from one place and
          refresh the details before every arrival.
        </p>
        <ul>
          <li>
            <Check size={17} /> See your properties’ screens and online status.
          </li>
          <li>
            <Check size={17} /> Give each property its own welcome and house
            guide.
          </li>
          <li>
            <Check size={17} /> Update guest details remotely between stays.
          </li>
        </ul>
        <a href="/contact">
          Talk about your portfolio <ArrowUpRight size={19} />
        </a>
      </div>
      <div className={styles.portfolio}>
        <div className={styles.toolbar}>
          <span>
            <Monitor size={17} /> Your properties
          </span>
          <small>INTERACTIVE EXAMPLE</small>
        </div>
        <div className={styles.layout}>
          <div
            className={styles.properties}
            aria-label="Choose an example property"
          >
            {properties.map((p, i) => (
              <button
                type="button"
                key={p.name}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={selected === i ? styles.selected : ""}
              >
                <Home size={18} />
                <span>
                  <strong>{p.name}</strong>
                  <small>
                    <i /> Online
                  </small>
                </span>
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div className={styles.property} aria-live="polite">
            <div className={styles.propertyTop}>
              <span>GUEST WELCOME</span>
              <span>
                <i /> Ready for arrival
              </span>
            </div>
            <h3>{property.name}</h3>
            <p>{property.location}</p>
            <div className={styles.welcome}>
              <span>Make yourself at home,</span>
              <strong>{property.guests}.</strong>
              <p>{property.note}</p>
            </div>
            <div className={styles.propertyBottom}>
              <Wifi size={17} />
              <span>{property.network}</span>
              <Check size={16} />
            </div>
          </div>
        </div>
        <div className={styles.caption}>
          Sample properties and guest details · Select a property to explore.
        </div>
      </div>
    </section>
  );
}
