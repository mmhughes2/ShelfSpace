import "./ProjectLinks.css";

function ProjectLinks() {
  return (
    <section className="project-links">
      <div>
        <p className="section-label">Main 242 Home Page Section</p>
        <h2>Project links ready for your portfolio page</h2>
      </div>

      <div className="project-link-grid">
        <a
          className="project-link-card"
          href="https://github.com/mmhughes2/ShelfSpace"
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
