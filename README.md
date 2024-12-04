# Test Scania

This project is a Next.js application that includes integrations with **GitHub authentication** via **NextAuth.js**. The app also uses **Chart.js** for data visualization and **Axios** for making HTTP requests.

## Requirements

- Node.js (version 18 or higher is recommended)
- GitHub account (for OAuth authentication)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/stefanie-vicente/test-scania.git
cd test-scania
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

To set up GitHub OAuth credentials for authentication, create a `.env.local` file at the root of your project.

First, you'll need to create a GitHub OAuth application to get your client ID and secret. Follow these steps:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Create a new OAuth application.
   - Set the **Homepage URL** as `http://localhost:3000` for development.
   - Set the **Authorization callback URL** as `http://localhost:3000/api/auth/callback` for development.
   
Once you have your credentials, add the following to your `.env.local` file:

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
NEXTAUTH_URL=http://localhost:3000
```

Replace `your-github-client-id` and `your-github-client-secret` with your actual GitHub OAuth credentials.

### 4. Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

To build the project for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### 6. Linting

To run the linting checks, use:

```bash
npm run lint
```

## Project Overview

### Dependencies

- `@scania/tegel-react`: Scania's React component library.
- `axios`: Promise-based HTTP client for making API requests.
- `chart.js`: A library for creating interactive charts.
- `dayjs`: A lightweight date manipulation library.
- `next`: The Next.js framework for building React applications.
- `next-auth`: Authentication library, used here for GitHub OAuth.
- `react`: The React library for building user interfaces.
- `react-chartjs-2`: React wrapper for Chart.js.

## Features

- **GitHub Authentication**: Users can log in using their GitHub credentials, powered by NextAuth.js.
- **Data Visualization**: Uses Chart.js and `react-chartjs-2` to display interactive charts.
- **API Requests**: Axios is used for making HTTP requests to external APIs.

## Additional Notes

- Ensure that you have correctly set up your `.env.local` file before starting the app.
- This project is currently set to run on `http://localhost:3000` during development, but you can change this if deploying elsewhere.

## License

This project is licensed under the MIT License.

