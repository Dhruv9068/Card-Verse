import "../help.css"

export default function HelpPage() {
  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Help & Support</h1>
        <p>Find answers to common questions about CardVerse</p>
      </div>

      <div className="help-content">
        <div className="help-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            <li>
              <a href="#getting-started">Getting Started</a>
            </li>
            <li>
              <a href="#account">Account & Profile</a>
            </li>
            <li>
              <a href="#cards">Cards & Collections</a>
            </li>
            <li>
              <a href="#points">Points & Challenges</a>
            </li>
            <li>
              <a href="#features">Features & Navigation</a>
            </li>
            <li>
              <a href="#troubleshooting">Troubleshooting</a>
            </li>
          </ul>

          <div className="help-contact">
            <h3>Need More Help?</h3>
            <p>Can't find what you're looking for?</p>
            <a href="/contact" className="contact-button">
              Contact Us
            </a>
          </div>
        </div>

        <div className="faq-container">
          <section id="getting-started" className="faq-section">
            <h2>Getting Started</h2>

            <div className="faq-item">
              <h3>What is CardVerse?</h3>
              <p>
                CardVerse is a digital card collection platform where you can discover, collect, and organize beautiful
                digital cards. You can earn points, complete challenges, and create your own collections of visually
                stunning cards.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I get started with CardVerse?</h3>
              <p>
                To get started, explore the cards on the home page, swipe through cards you like, and add them to your
                favorites. You can create collections to organize your cards, complete challenges to earn points, and
                customize your experience with different themes.
              </p>
            </div>

            <div className="faq-item">
              <h3>Is CardVerse free to use?</h3>
              <p>
                Yes, CardVerse is completely free to use! You can explore all cards, create collections, and use all
                features without any subscription fees.
              </p>
            </div>
          </section>

          <section id="account" className="faq-section">
            <h2>Account & Profile</h2>

            <div className="faq-item">
              <h3>How do I view my profile?</h3>
              <p>
                You can access your profile by clicking on the profile icon in the navigation bar. Your profile shows
                your points, achievements, favorite collections, and activity history.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I customize my profile?</h3>
              <p>
                Yes, you can customize your profile by adding a profile picture, updating your display name, and
                selecting your favorite collections to showcase.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I change my theme preferences?</h3>
              <p>
                You can switch between light and dark mode by clicking the theme toggle in the navigation bar.
                Additional theme options are available in the settings menu.
              </p>
            </div>
          </section>

          <section id="cards" className="faq-section">
            <h2>Cards & Collections</h2>

            <div className="faq-item">
              <h3>How do I add cards to my favorites?</h3>
              <p>
                To add a card to favorites, swipe right on the card or tap the heart icon. You can view all your
                favorites in the Favorites page.
              </p>
            </div>

            <div className="faq-item">
              <h3>What's the difference between bookmarks and favorites?</h3>
              <p>
                Favorites are cards you love and want to collect, while bookmarks are cards you want to save for later
                viewing. Favorites can be organized into collections, while bookmarks are a temporary way to flag cards
                of interest.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I create a collection?</h3>
              <p>
                To create a collection, go to the Collections page and click 'Create New Collection'. You can then add
                cards to your collection by marking them as favorites and organizing them.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I share my collections with others?</h3>
              <p>
                Yes, you can share your collections by clicking the share button on any collection page. This will
                generate a link that you can send to friends.
              </p>
            </div>
          </section>

          <section id="points" className="faq-section">
            <h2>Points & Challenges</h2>

            <div className="faq-item">
              <h3>How do I earn points?</h3>
              <p>
                You can earn points by swiping cards, adding favorites, completing challenges, and daily logins. The
                more you interact with CardVerse, the more points you'll earn.
              </p>
            </div>

            <div className="faq-item">
              <h3>What are challenges?</h3>
              <p>
                Challenges are special tasks that earn you bonus points. Check the Challenges page to see available
                challenges and track your progress. New challenges are added regularly to keep things interesting.
              </p>
            </div>

            <div className="faq-item">
              <h3>How does the leaderboard work?</h3>
              <p>
                The leaderboard shows the top CardVerse users ranked by points. It's updated in real-time as users earn
                points through various activities.
              </p>
            </div>
          </section>

          <section id="features" className="faq-section">
            <h2>Features & Navigation</h2>

            <div className="faq-item">
              <h3>How do I use voice commands?</h3>
              <p>
                You can use voice commands by clicking the microphone button in the bottom right corner. Try saying
                things like 'go to favorites' or 'dark mode' to navigate and control the app hands-free.
              </p>
            </div>

            <div className="faq-item">
              <h3>What does the Explore page offer?</h3>
              <p>
                The Explore page is where you can discover new cards. You can browse by category, use filters to find
                specific types of cards, or just swipe through random selections.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I search for specific cards?</h3>
              <p>
                Use the search bar at the top of the app to search for cards by title, description, or category. You can
                also use filters to narrow down your search results.
              </p>
            </div>
          </section>

          <section id="troubleshooting" className="faq-section">
            <h2>Troubleshooting</h2>

            <div className="faq-item">
              <h3>The app is loading slowly. What can I do?</h3>
              <p>
                Try refreshing the page or clearing your browser cache. If the issue persists, check your internet
                connection or try using a different browser.
              </p>
            </div>

            <div className="faq-item">
              <h3>Voice commands aren't working. How can I fix this?</h3>
              <p>
                Make sure your browser has permission to use your microphone. Also check that you're speaking clearly
                and using recognized commands. If issues persist, try refreshing the page.
              </p>
            </div>

            <div className="faq-item">
              <h3>I found a bug. How do I report it?</h3>
              <p>
                You can report bugs through our <a href="/contact">Contact page</a>. Please include as much detail as
                possible, including what you were doing when the bug occurred and any error messages you saw.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
