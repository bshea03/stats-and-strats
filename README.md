## Stats and Strats

Stats and Strats is a platform for tracking and aggretating speedrunning data. The original purpose of this site was to keep track of my own personal bests on a platform specifically catered toward speedrunning, rather than putting everything on a google sheet and organizing it manually.

Since originally starting this project, I have been also planning ways to implement the following:

- Personal best progression graphs
- Integration with speedrun.com to pull in category/category extension data
- The ability to add resources, guides, and videos for each category/IL
- Complete customizability of how you view your data, including configurable tables and forms.

Stretch goals:

- The ability to add new games and export the view you create to a CSV so it can be shared with others

This is a [Next.js](https://nextjs.org)/[Tailwind CSS](https://tailwindcss.com) project and is currently in early stages of development. It is not yet ready for public use, but I am actively working on it.

## Running Locally

Install the dependencies:

```bash
npm install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

The splash page will be available at [http://localhost:3000](http://localhost:3000) and the app will be available at [http://app.localhost:3000](http://app.localhost:3000).

## Database

Run SQLite migration:

`npx prisma migrate [db_name] --name [migration_name]`

View database in Prisma Studio:

`npx prisma studio`
