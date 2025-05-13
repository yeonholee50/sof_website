# SOF Week Agenda Search

A modern React application to search the SOF Week Agenda API.

## Features

- Search by name, position, organization, or filter
- Background particle animation
- Modern, responsive UI
- Card and JSON view options for results
- Loading states and error handling

## API Endpoints

This application connects to the SOF Week Agenda API at `https://sof-query.onrender.com/` with the following endpoints:

- `/name/{query}` - Search by name
- `/position/{query}` - Search by position
- `/organization/{query}` - Search by organization
- `/filter/{query}` - Search by filter
- Empty query endpoints (`/name`, `/position`, etc.) return all items

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Building for Production

To build the app for production:

```
npm run build
```

or

```
yarn build
```

This creates an optimized build in the `build` folder.

## Technologies Used

- React
- TypeScript
- Styled Components
- Axios
- CSS Animations
- Canvas (for background particles)

## License

MIT
