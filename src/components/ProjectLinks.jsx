import "./ProjectLinks.css";

function ProjectLinks() {
  return (
    <section className="project-links submit-section">
      <div>
        <p className="section-label">Main 242 Home Page Section</p>
        <h2>Add this React build to your project section</h2>
        <p className="submit-copy">
          Replace these placeholders with your final GitHub Pages deployment and
          the new repository link before you submit.
        </p>
      </div>

      <div className="project-link-grid">
        <a
          className="project-link-card"
          href="https://username.github.io/shelfspace-react-site/"
          target="_blank"
          rel="noreferrer"
        >
          <span>Live React Site</span>
          <strong>GitHub Pages deployment placeholder</strong>
        </a>

        <a
          className="project-link-card"
          href="https://github.com/username/shelfspace-react-site"
          target="_blank"
          rel="noreferrer"
        >
          <span>GitHub Repo</span>
          <strong>Project repository placeholder</strong>
        </a>
      </div>
    </section>
  );
}

export default ProjectLinks;
