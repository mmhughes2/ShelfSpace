import "./ProjectLinks.css";

function ProjectLinks() {
  return (
    <section className="project-links">
      <div>
        <p className="section-label">Main 242 Home Page Section</p>
        <h2>Use these links for your React project entry</h2>
        <p className="submit-copy">
          Your homepage only needs one set of links here: one for the live site
          and one for the code repo.
        </p>
      </div>

      <div className="project-link-grid">
        <a
          className="project-link-card"
          href="https://mmhughes2.github.io/ShelfSpace/"
          target="_blank"
          rel="noreferrer"
        >
          <span>Live Site</span>
          <strong>Open the deployed ShelfSpace React site</strong>
        </a>

        <a
          className="project-link-card"
          href="https://github.com/mmhughes2/ShelfSpace"
          target="_blank"
          rel="noreferrer"
        >
          <span>Code</span>
          <strong>View the GitHub repository for this React build</strong>
        </a>
      </div>
    </section>
  );
}

export default ProjectLinks;
