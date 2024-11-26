# Forkly: A Revamped Frontend for CookCLI

Forkly is a frontend rewrite of the CookCLI, designed to enhance your self-hosted cooking experience. This project is mostly focused on the server part of it. Other parts should be fully working, but are not the focus of this fork.

## Features

Forkly includes all the original CookCLI web UI features and adds a variety of new tools to streamline your cooking experience:

- **Built-in Timer:** Click on any time mentioned in a recipe (e.g., "bake for 2 hours") to instantly set a timer.
- **Measurement Conversion:** Convert measurements like "1 cup" into other units with a single click.
- **Interactive Shopping List:** Mark off ingredients as you shop.
- **PWA Support:** Install Forkly as a Progressive Web App (PWA) on your phone.
- **Modern Design:** Enjoy a sleek and responsive user interface.
- **Additional Quality of Life Features:**
  - Keep your screen awake while viewing recipes (requires HTTPS).
  - Customize settings for rounded conversions.
  - View extra recipe stats, like the number of servings.

### Planned Features

- Sorting shopping lists by category (e.g., group all meats, fruits, etc.).
- Scaling recipes to serve different numbers of people (experimental).
- Web-based recipe addition (For now you can use [File Browser](https://github.com/filebrowser/filebrowser)).
- Docker container for easy deployment.

## Installation

### Build From Source

1. Clone the repository:  
   ```bash
   git clone https://github.com/ChaoticLeah/Forkly.git
   cd Forkly
   ```
2. Install frontend dependencies:
   ```bash
   cd ui
   bun install
   ```
3. Build the frontend (If it fails delete the old build folder):
   ```bash
   bun --bun run build
   ```
4. Start the server:
   ```bash
   cd ..
   cargo run -- --server
   ```
5. Access the server using the address provided in the terminal output.
6. Add recipes: Place your recipes in the `seed/` directory or specify a custom directory when starting the server.

## Why Rewrite CookCLI's Frontend?

The original CookCLI frontend was functional but outdated. By leveraging modern tools like Svelte 5, Vite, TypeScript, and Tailwind CSS, Forkly offers improved performance. It also introduces new features that simplify recipe management and enhance the cooking experience.
