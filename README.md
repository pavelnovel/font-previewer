# Font Previewer - Google Fonts Comparison Tool

A modern web application for previewing and comparing Google Fonts side-by-side with real-time customization options. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Side-by-Side Font Comparison**: Compare up to 4 different Google Fonts simultaneously
- **Real-Time Customization**: Adjust font size, weight, letter spacing, and color instantly
- **Live Text Preview**: Test fonts with your own custom text
- **1,400+ Google Fonts**: Access to the entire Google Fonts library
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Analytics Integration**: Track font usage and preferences
- **Modern UI**: Clean, intuitive interface built with shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pavelnovel/font-previewer.git
cd font-previewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Font Selection**: Each panel displays a different font. Click on the font name dropdown to select from 1,400+ Google Fonts.

2. **Customization Options**:
   - **Size**: Adjust font size from 8px to 96px
   - **Weight**: Choose from 100 (Thin) to 900 (Black)
   - **Letter Spacing**: Fine-tune character spacing
   - **Color**: Pick any color using the color picker

3. **Live Preview**: Click "Use for Live Preview" on any font panel to test it with custom text in the preview area below.

4. **Compare**: Arrange different fonts side-by-side to find the perfect typography combination for your project.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **Font Library**: [Google Fonts API](https://fonts.google.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

```
font-previewer/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main font comparison page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── font-previewer/   # Font preview components
│   │   │   ├── FontPanel.tsx
│   │   │   ├── LivePreviewBox.tsx
│   │   │   └── types.ts
│   │   ├── analytics/        # Analytics tracking
│   │   └── ui/              # shadcn/ui components
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
└── package.json
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Adding New Features

1. Font panels are configured in `src/app/page.tsx` with the `initialFontConfigs` array
2. To add more comparison panels, extend the array and adjust the grid layout
3. Analytics events can be tracked using the `useAnalytics` hook

## Deployment

This project is configured for deployment on Firebase Hosting with App Hosting support.

1. Build the project:
```bash
npm run build
```

2. Deploy using Firebase CLI or your preferred hosting platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Google Fonts for providing the extensive font library
- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- All contributors who help improve this tool

## Links

- [Live Demo](https://your-demo-url.com)
- [Google Fonts](https://fonts.google.com)
- [Report Issues](https://github.com/pavelnovel/font-previewer/issues)
