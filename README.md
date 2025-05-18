### CardVerse

CardVerse is an interactive card-based knowledge platform that allows users to explore, collect, and organize information cards across various categories. Built with Next.js and featuring a modern, responsive design, CardVerse offers a unique way to discover and interact with content.


## 🏆 Code Circuit Hackathon Submission

This project was created for the **Code Circuit Hackathon** under the category:

### 📚 Recommendations

CardVerse implements several key recommendation features:

* Card list with genre/category filters
* Favorites toggle for saving preferred cards
* Swipe-based card explorer that learns from user interactions
* Bookmarking system for saved items
* Category-based filtering and organization
* Visual recommendation banners
* Interactive rating system

## 🎯 What We Accomplished

### Core Functionality

- **Interactive Card System**: Swipe-based card explorer with intuitive gestures
- **Category Exploration**: Browse cards by categories including Nature, Technology, Art, Science, and History
- **Personalized Collections**: Create and manage custom collections of cards
- **Smart Recommendations**: Personalized content suggestions based on user behavior and preferences
- **Bookmarking System**: Save cards for later viewing with a comprehensive bookmark manager
- **Favorites**: Mark cards as favorites for quick access
- **Search Functionality**: Enhanced search with filters and suggestions


### User Experience

- **Voice Assistant**: Navigate the app hands-free with voice commands
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Theme Customization**: Choose from multiple color themes (Teal, Purple, Green, Blue, Red)
- **Animated Transitions**: Smooth page transitions and card animations
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Custom Cursor**: Enhanced cursor experience on desktop
- **Loading Screens**: Engaging loading screens with progress indicators


### Gamification

- **Points System**: Earn points for various interactions within the app
- **Challenges**: Complete challenges to earn badges and points
- **Badges**: Unlock achievements for completing specific actions
- **Leaderboard**: Compare your progress with other users


### User Profile

- **Profile Page**: View and edit your profile information
- **Stats Tracking**: Track your activity and preferences
- **Points History**: View your points earning history
- **Mood Indicator**: Visual representation of your app usage patterns


### Support & Information

- **Help & Support Page**: Comprehensive FAQ and support resources
- **Contact Form**: Easy way to reach out for assistance
- **Animated Quotes**: Inspirational quotes that change with smooth animations
- **Chatbot Assistant**: Get help and information through an interactive chatbot


## 💻 Technologies Used

- **Frontend Framework**: Next.js 14 with App Router
- **Styling**: CSS with custom variables for theming
- **Animations**: GSAP for advanced animations
- **State Management**: React hooks for local state management
- **Storage**: LocalStorage for persistent data
- **Voice Recognition**: Web Speech API for voice commands
- **Responsive Design**: Custom CSS with media queries
- **Accessibility**: ARIA attributes and keyboard navigation


## 🛠️ Installation and Setup

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/cardverse.git
cd cardverse
```


2. Install dependencies:

```shellscript
npm install
```


3. Run the development server:

```shellscript
npm run dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## 📂 Project Structure

```plaintext
cardverse/
├── app/                  # Next.js app directory
│   ├── bookmarks/        # Bookmarks page
│   ├── card/[id]/        # Card detail page
│   ├── challenges/       # Challenges page
│   ├── collections/      # Collections pages
│   ├── contact/          # Contact page
│   ├── explore/          # Explore page
│   ├── favorites/        # Favorites page
│   ├── help/             # Help & Support page
│   ├── leaderboard/      # Leaderboard page
│   ├── profile/          # User profile page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── components/           # Reusable components
│   ├── Awards/           # Award components
│   ├── Bookmarks/        # Bookmark components
│   ├── Cards/            # Card components
│   ├── Categories/       # Category components
│   ├── Challenges/       # Challenge components
│   ├── Chatbot/          # Chatbot components
│   ├── Collections/      # Collection components
│   ├── CustomCursor/     # Custom cursor component
│   ├── Features/         # Feature highlight components
│   ├── Footer/           # Footer component
│   ├── Hero/             # Hero section components
│   ├── LoadingScreen/    # Loading screen components
│   ├── Navigation/       # Navigation components
│   ├── Notifications/    # Notification components
│   ├── PageTransition/   # Page transition components
│   ├── Points/           # Points system components
│   ├── Quotes/           # Animated quotes component
│   ├── Recommendations/  # Recommendation components
│   ├── Search/           # Search components
│   ├── TestimonialS/     # Testimonial components
│   ├── ThemeProvider/    # Theme provider components
│   ├── ThemeSelector/    # Theme selector components
│   └── VoiceAssistant/   # Voice assistant components
├── lib/                  # Utility functions and libraries
│   ├── challenge-tracker.ts  # Challenge tracking system
│   ├── debug-helper.ts       # Debugging utilities
│   ├── mock-data.ts          # Mock data generation
│   ├── points-system.ts      # Points system logic
│   ├── storage-utils.ts      # Storage utilities
│   └── types.ts              # TypeScript type definitions
├── public/               # Static assets
│   └── [various images]  # Images used in the app
├── types/                # TypeScript type definitions
│   └── card.ts           # Card type definitions
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## 🎯 Key Components

### Card System

The core of CardVerse is its card system, allowing users to:

- Swipe through cards in a deck-like interface
- View detailed information about each card
- Save cards to favorites or collections
- Bookmark cards for later viewing
- Filter cards by category or search terms


### Theme System

CardVerse features a comprehensive theming system:

- Toggle between dark and light modes
- Choose from 5 color themes (Teal, Purple, Green, Blue, Red)
- Consistent styling throughout the application
- Smooth transitions between themes


### Voice Assistant

The voice assistant allows hands-free navigation:

- Activate with a voice command or button press
- Navigate to different pages
- Search for content
- Control the application with natural language


### Challenges and Badges

The gamification system includes:

- Various challenges to complete
- Badges as rewards for completing challenges
- Points earned for different actions
- Progress tracking for each challenge


### Smart Recommendations

The recommendation system suggests content based on:

- User browsing history
- Favorited and bookmarked items
- Category preferences
- Interaction patterns


## 🔮 Future Improvements

- **User Authentication**: Implement user accounts and authentication
- **Cloud Sync**: Sync data across devices
- **Social Features**: Share collections and cards with friends
- **Advanced Analytics**: More detailed insights into user behavior
- **Custom Card Creation**: Allow users to create their own cards
- **API Integration**: Connect to external APIs for dynamic content
- **Offline Support**: Enable offline functionality with PWA features
- **Advanced Voice Commands**: Expand voice assistant capabilities


## 👥 Credits

- **Design & Development**: Dhruv Chaturvedi
- **Icons**: Various sources including Lucide React
- **Images**: Placeholder images from Picsum Photos
- **Fonts**: System fonts with Calibri as primary


