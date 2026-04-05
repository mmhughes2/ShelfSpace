# ShelfSpace

React version of the actual ShelfSpace project site for Project Part 8.

## Included

- Multiple React pages using `react-router-dom`
- Pages based on the original ShelfSpace Part 7 project
- Reusable list components for future JSON-driven content
- Separate stylesheets for pages and components
- Responsive navigation that stacks vertically on smaller screens
- Homepage project section with placeholder links for the deployed site and GitHub repo

## Run locally

1. Install Node.js if it is not already available.
2. Run `npm install`
3. Add a `.env` file if you want the Explore page to use your live Render backend:
   `VITE_API_BASE_URL=https://your-render-service.onrender.com`
3. Run `npm run dev`

## Before submitting

- Replace the placeholder GitHub Pages URL in `src/components/ProjectLinks.jsx`
- Replace the placeholder GitHub repository URL in `src/components/ProjectLinks.jsx`
- Deploy the site to GitHub Pages and add that live link to your Main 242 home page
