# AI Stock Analyzer

A modern web application for analyzing the top 10 AI companies to invest in for 2025. The application provides detailed statistical analytics, market trends, and price predictions along with recommendations for stock purchases based on market analysis and individual stock performance.

## Features

- Real-time stock data for top 10 AI companies
- Technical analysis with key indicators (RSI, MACD, Moving Averages)
- AI-focused metrics and scoring system
- Market sentiment analysis
- Price predictions and targets
- Risk assessment
- Interactive UI with detailed stock analysis
- Dark mode interface

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-stock-analyzer.git
   cd ai-stock-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your stock API key:
   ```
   REACT_APP_STOCK_API_KEY=your_api_key_here
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

To create a production build:
```bash
npm run build
```

The build files will be created in the `build` folder.

## Technology Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Chart.js
- Axios for API calls

## API Integration

The application is designed to work with financial data APIs. You'll need to:

1. Sign up for a stock market data API service
2. Get your API key
3. Add the API key to your `.env` file
4. Update the API endpoints in `src/services/stockService.ts` if necessary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This application is for educational purposes only. Always do your own research and consult with financial advisors before making investment decisions. The predictions and analysis provided by this tool should not be considered as financial advice.
