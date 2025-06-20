# BlogPlatform - Full-Stack Blog Platform

A modern, minimal blog platform similar to Dev.to, built with Next.js (App Router), MongoDB, and Tailwind CSS. Features a split-pane markdown editor with live preview, clean typography focused on readability, and support for public image URLs.

## Features

### 🚀 Key Features
- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, MongoDB, Tailwind CSS
- **Markdown Editor**: Split-pane editor with live preview and formatting toolbar
- **Clean UI**: Minimal, modern design optimized for readability
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Support**: Embed images via public URLs (no upload functionality)
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **Reading Time**: Automatic reading time calculation
- **Tags System**: Organize posts with custom tags
- **Author Profiles**: Display author information and avatars

### 📝 Editor Features
- Split-pane layout: Write markdown on the left, see preview on the right
- Formatting toolbar with buttons for:
  - Bold, italic, code formatting
  - Headers, quotes, lists
  - Image insertion via URL
- Mobile-responsive with tabbed view
- Real-time preview updates

### 📱 Pages
1. **Home Feed**: Clean list of blog posts with excerpts and metadata
2. **Editor Page**: Full-featured markdown editor for creating posts
3. **Single Post Page**: Beautifully rendered markdown content with syntax highlighting

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas)

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd blog-app

# Install dependencies
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/blog-platform

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-platform?retryWrites=true&w=majority
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/blog-platform`

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace the `MONGODB_URI` in `.env.local`

### 4. Run the Application
```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### Creating Your First Post
1. Visit `http://localhost:3000/editor`
2. Fill in author information (name and optional avatar URL)
3. Add a compelling title
4. Add tags (optional)
5. Write your content in markdown in the left pane
6. See the live preview in the right pane
7. Use the toolbar for quick formatting
8. Click "Publish Post" to make it live

### Markdown Features Supported
- Headers (`# ## ###`)
- **Bold** and *italic* text
- `Inline code` and code blocks
- > Blockquotes
- Lists (bulleted and numbered)
- Links
- Images via public URLs
- Tables (GitHub-flavored markdown)

### Image Usage
To add images to your posts:
1. Click the image button in the toolbar
2. Enter a public image URL (e.g., from Unsplash, imgur, etc.)
3. The image will be displayed in the preview and final post

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/posts/         # API routes for blog operations
│   ├── editor/            # Blog editor page
│   ├── post/[id]/         # Dynamic single post page
│   └── page.tsx           # Home feed
├── components/            # React components
│   ├── BlogCard.tsx       # Blog post card for feed
│   ├── MarkdownEditor.tsx # Split-pane markdown editor
│   └── Navigation.tsx     # Site navigation
├── lib/
│   └── mongodb.ts         # MongoDB connection setup
├── types/
│   └── blog.ts           # TypeScript interfaces
└── utils/
    └── blogUtils.ts      # Utility functions
```

## API Endpoints

- `GET /api/posts` - Fetch all published posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Fetch a specific post by ID

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with native driver
- **Styling**: Tailwind CSS with Typography plugin
- **Markdown**: react-markdown with GitHub-flavored markdown
- **Syntax Highlighting**: rehype-highlight with highlight.js
- **Date Handling**: date-fns

## Design Philosophy

This blog platform prioritizes:
- **Readability**: Clean typography and spacious layouts
- **Simplicity**: Minimal interface focused on content
- **Performance**: Optimized loading and responsive design
- **Developer Experience**: Clean code structure and TypeScript support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy

### Other Platforms
The app can be deployed to any Node.js hosting platform that supports:
- Node.js 18+
- Environment variables
- MongoDB connection

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Verify your `MONGODB_URI` is correct
   - Check if MongoDB is running (for local installations)
   - Ensure network access is allowed (for Atlas)

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check if all required plugins are installed

For more help, please open an issue on GitHub.
