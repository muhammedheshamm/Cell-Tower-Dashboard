# Cell Tower Dashboard

A modern React dashboard for monitoring cell tower operations across multiple cities. Built with TypeScript, Vite, and modern CSS.

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-7.0-purple)
![Tests](https://img.shields.io/badge/Tests-31%20passing-brightgreen)

## Features

- **Data Monitoring**: Track cell towers across cities
- **Advanced Filtering**: Search by name, filter by city, network, status
- **Interactive Charts**: Data visualization with D3.js charts
- **Responsive Design**: Works on desktop, mobile devices
- **Error Handling**: Graceful error states with retry (simulating API failures with probability 0.1)
- **Loading States**: Shimmer effects for loading data (simulating with a 2-second delay)
- **Modern Animations**: CSS3 entrance and hover effects

## Tech Stack

- **React 18** + **TypeScript 5.0** + **Vite 7.0**
- **SCSS** with modern CSS (Grid, Flexbox, animations)
- **Vitest** + **React Testing Library** for testing
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/muhammedheshamm/Cell-Tower-Dashboard.git
   cd Cell-Tower-Dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Running Tests

#### Unit Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/          # UI components
│   ├── Card/           # Info cards with animations
│   ├── Charts/         # Data visualization
│   ├── Filters/        # Advanced filtering system
│   ├── Header/         # Dashboard header
│   ├── Shimmer/        # Loading states
│   ├── Signal/         # Signal strength indicator
│   └── TowersTable/    # Main data table
├── data/               # Data layer
├── pages/              # Page components
├── styles/             # Global styles
├── types/              # TypeScript types
├── utils/              # Utilities
└── __tests__/          # Tests
```

## Key Features

### Advanced Filtering

- **Custom Select Elements**: Modern CSS-styled dropdowns
- **Real-time Search**: Real-time search with highlighting
- **Multi-criteria Filters**: City, network type, status
- **Clear Filters**: One-click reset

### Responsive Table

- **Horizontal Scrolling**: Mobile-optimized
- **Status Indicators**: Visual status with icons
- **Signal Strength**: Interactive display

## Modern CSS Features

### Customizable Select Elements

```scss
.filter-select-field {
  appearance: base-select;
  text-transform: capitalize;

  &::picker(select) {
    appearance: base-select;
  }

  &::picker-icon {
    content: "";
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z'/%3E%3C/svg%3E")
      no-repeat center;
    background-size: 20px;
    width: 20px;
    transition: rotate 0.4s;
  }

  &:open {
    &::picker-icon {
      rotate: 180deg;
    }
  }

  &::picker(select) {
    border: 1px solid v.$color-primary;
    border-radius: v.$border-radius;
    margin-top: 6px;
  }

  option {
    padding: 8px 10px;
    color: v.$color-dark-gray;
    text-transform: capitalize;

    &:not(:last-child) {
      border-bottom: 1px solid v.$color-light-gray;
    }

    &:hover {
      background-color: rgba(v.$color-primary, 0.1);
    }

    &:checked {
      background-color: rgb(v.$color-primary, 0.9);
      color: v.$color-white;
    }
  }
}
```

## Testing

- **31 Tests** across key components
- **User-centric** testing approach
- **Edge cases** and error states covered

## Trade-offs

### SCSS vs tailwind

- **Pros**: More control over styles
- **Cons**: More verbose, less utility-based

### Testing vs Speed

- **Pros**: Ensures reliability
- **Cons**: More development time

## Feedback

If you have any feedback, please reach out to me at muhammedheshamm1@gmail.com
