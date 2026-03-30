import "./ReadingMapEmbed.css";

function ReadingMapEmbed() {
  return (
    <div className="iframe-card map-card">
      <div className="iframe-container">
        <iframe
          src="https://www.google.com/maps?q=Richland+Library+Main+Columbia+SC&output=embed"
          title="Map of Richland Library Main in Columbia, South Carolina"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default ReadingMapEmbed;
