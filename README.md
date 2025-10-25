# Astro Journal App

A beautiful mobile journal app that combines daily horoscopes with personal journaling. Built with React Native featuring a modern UI inspired by popular astrology apps like AstroTalk.

## 📱 Demo

https://github.com/user-attachments/assets/record.mov

> A quick walkthrough of the app showing horoscope viewing, multiple journal entries creation, and saved entries management with long-press actions.

## ✨ Features

### 🌟 Horoscope
- **Dual API Integration**: Primary Vercel-hosted horoscope API with aztro API fallback for reliability
- **Smart Caching**: AsyncStorage-based caching ensures horoscopes load even when offline
- **Rich Data**: View monthly horoscope, standout days, and challenging days
- **Platform-Specific Zodiac Picker**: 
  - iOS: Beautiful modal with wheel picker
  - Android: Native dropdown
- **Debug Mode**: Built-in debug button to inspect raw API responses

### 📝 Journaling
- **Multiple Entries Per Day**: Write as many journal entries as you want each day
- **Smart Entry Management**:
  - Direct journaling from Journal tab → always creates new entries
  - Edit from Saved tab → updates specific entry
- **Long-Press Actions**: Hold any saved entry to Edit or Delete
- **Auto-Clear**: Text clears after saving, ready for your next entry
- **Rich Metadata**: Each entry stores zodiac sign, timestamps (ISO + epoch), and text

### 💾 Saved Entries
- **Complete History**: Browse all your journal entries across all dates
- **Smart Sorting**: Most recent entries appear first
- **Entry Preview**: See date, time, zodiac sign, and text excerpt
- **Quick Actions**: Long-press any entry to edit or delete with confirmation

### 🎨 Modern UI
- **AstroTalk-Inspired Design**: Clean, centered layout with professional styling
- **Visual Chips**: Standout and challenging days shown as attractive chips
- **Cached Notice**: Friendly banner when viewing offline horoscopes
- **Action Buttons**: Clear CTAs for journaling, retry, and debugging
- **Native Feel**: Platform-specific components for authentic iOS/Android experience

## 🛠 Tech Stack

- **React Native** (Community CLI) - Cross-platform mobile development
- **React Navigation** - Stack and native bottom tabs
- **Context API** - Global state management (JournalContext)
- **AsyncStorage** - Local persistence for entries and horoscope cache
- **Phosphor Icons** - Beautiful, consistent iconography
- **Community Picker** - Reliable native picker component
- **Gesture Handler** - Smooth touch interactions

## 📁 Project Structure

```
AstroApp/
├── App.js                      # Root component with navigation
├── navigation/
│   ├── AppNavigator.js        # Stack navigator setup
│   └── BottomTab.js           # Bottom tab navigator (Home, Journal, Saved)
├── screens/
│   ├── Home.js                # Horoscope display with zodiac picker
│   ├── Journal.js             # Journal editor (create/update entries)
│   ├── SavedJournal.js        # List all saved entries with actions
│   ├── Profile.js             # User profile (placeholder)
│   ├── Chat.js                # Chat feature (placeholder)
│   └── Setting.js             # App settings (placeholder)
├── src/
│   ├── components/
│   │   └── ZodiacPicker.js    # Platform-specific zodiac selector
│   ├── context/
│   │   └── JournalContext.js  # Global state for entries & selected sign
│   ├── hooks/
│   │   └── useAsyncStorage.js # AsyncStorage helper hook
│   └── services/
│       └── horoscope.js       # Horoscope API integration with caching
├── ios/                        # iOS native code
├── android/                    # Android native code
└── package.json               # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Xcode (for iOS development on macOS)
- CocoaPods (iOS dependency manager)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
```sh
git clone <your-repo-url>
cd AstroApp
```

2. **Install JavaScript dependencies**
```sh
yarn install
# or
npm install
```

3. **Install iOS dependencies** (macOS only)
```sh
cd ios
pod install
cd ..
```

4. **Run the app**

**iOS:**
```sh
yarn start          # Start Metro bundler
yarn ios            # Run on iOS simulator
# or
npx react-native run-ios
```

**Android:**
```sh
yarn start          # Start Metro bundler
yarn android        # Run on Android emulator/device
# or
npx react-native run-android
```

## 📦 Key Dependencies

- `@react-navigation/native` & `@bottom-tabs/react-navigation` - Navigation
- `@react-native-async-storage/async-storage` - Local storage
- `@react-native-picker/picker` - Native picker component
- `phosphor-react-native` - Icon library
- `react-native-gesture-handler` - Touch gestures

## 💡 How to Use

### Viewing Horoscopes
1. Open the app to the **Home** tab
2. Select your zodiac sign using the picker (tap the pill on iOS, use dropdown on Android)
3. View your daily horoscope with monthly insights, standout days, and challenging days
4. If offline, cached horoscope will be displayed with a notice banner
5. Tap **Retry** to fetch fresh horoscope data
6. Use **Debug** button to inspect raw API response

### Writing Journal Entries
1. Tap the **Journal** tab from bottom navigation
2. Write your thoughts in the text editor
3. Tap **Save** to create a new entry
4. Write again and save - each save creates a NEW entry (multiple entries per day!)
5. Text automatically clears after saving

### Managing Saved Entries
1. Tap the **Saved** tab to view all your journal entries
2. Entries are sorted by most recent first
3. **Long-press** any entry to see actions menu:
   - **Edit**: Opens the entry in Journal tab for updating
   - **Delete**: Confirms and removes the entry
   - **Cancel**: Dismisses the menu
4. When editing from Saved, the button shows "Update" instead of "Save"

## 🏗 Architecture & Implementation

### Data Structure

**Journal Entries** (`@journal_entries` in AsyncStorage):
```javascript
{
  "2025-10-25": [
    {
      id: "1729872345678-abc123",
      sign: "aries",
      text: "Today was amazing...",
      createdAt: "2025-10-25T10:30:00.000Z",
      updatedAt: "2025-10-25T10:30:00.000Z",
      createdAtEpoch: 1729872345678,
      updatedAtEpoch: 1729872345678
    },
    // ... more entries for the same day
  ],
  "2025-10-24": [ /* ... */ ]
}
```

**Horoscope Cache** (`horoscope:${sign}` in AsyncStorage):
```javascript
{
  description: "Today brings new opportunities...",
  month: "October",
  standout_days: [12, 18, 25],
  challenging_days: [5, 19],
  source: "vercel",
  raw: { /* original API response */ }
}
```

### API Integration

**Primary API**: Vercel Horoscope API
```
GET https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=Aries&day=TODAY
```

**Fallback API**: Aztro API
```
POST https://aztro.sameerkumar.website/
Body: sign=aries&day=today
```

**Flow**:
1. Attempt Vercel API (2 retries)
2. On failure, try Aztro API (2 retries)
3. On total failure, return cached data with `cached: true` flag
4. Cache successful responses for offline use

### Context API (JournalContext)

**Provided Values**:
- `entries` - Object containing all journal entries by date
- `selectedSign` - Currently selected zodiac sign
- `saveEntry(dateKey, sign, text, id?)` - Create or update entry
- `getEntries(dateKey)` - Get all entries for a specific date
- `getEntry(dateKey, id)` - Get specific entry by ID
- `deleteEntry(dateKey, id)` - Delete entry and persist
- `setSelectedSign(sign)` - Update selected zodiac sign

## 🎯 Key Features Implemented

### Multi-Entry Journaling
- ✅ Support for unlimited entries per day
- ✅ Unique epoch-based IDs prevent duplicate key warnings
- ✅ Separate create/update logic based on navigation context
- ✅ Auto-clear after save for quick consecutive entries

### Resilient Horoscope System
- ✅ Primary API with automatic fallback
- ✅ Smart caching with offline support
- ✅ Retry mechanism with exponential backoff
- ✅ Normalized response format across APIs
- ✅ Cached data indicator for transparency

### Modern UX Patterns
- ✅ Platform-specific UI components (iOS modal, Android dropdown)
- ✅ Long-press context menus for entry actions
- ✅ Confirmation dialogs for destructive actions
- ✅ Visual feedback (chips, banners, button states)
- ✅ Centered, professional layout design

### Data Persistence
- ✅ AsyncStorage for local-first architecture
- ✅ Structured storage with date-based keys
- ✅ Automatic persistence on all mutations
- ✅ Reliable data loading on app start

## 🔧 Development Decisions

### Why AsyncStorage?
- Simple, built-in React Native storage solution
- Perfect for offline-first apps
- No setup required, works out of the box
- Sufficient for current data volume
- Future migration path to SQLite if needed

### Why Context API?
- Lightweight state management for small apps
- No external dependencies
- Easy to understand and maintain
- Sufficient for current feature set
- Can upgrade to Redux/Zustand if app grows

### Why Multiple APIs?
- Resilience: If one API is down, app still works
- Caching: Always have data, even offline
- User experience: No blank screens or errors
- Flexibility: Easy to add more API sources

### Entry ID Strategy
- Epoch-based: `${Date.now()}-${random}` ensures uniqueness
- No UUID library needed, reducing bundle size
- Contains timestamp for debugging
- Works across devices without conflicts

## 🚧 Future Enhancements

### High Priority
- [ ] Search and filter saved entries
- [ ] Export entries (PDF, text, email)
- [ ] Reminder notifications for daily journaling
- [ ] Streak tracking and achievement badges
- [ ] Password/biometric lock for privacy

### Medium Priority
- [ ] Rich text editor with formatting
- [ ] Attach photos to journal entries
- [ ] Mood tracking alongside entries
- [ ] Tags and categories
- [ ] Dark mode support

### Nice to Have
- [ ] Cloud sync with user accounts
- [ ] Share entries with friends
- [ ] Journal templates and prompts
- [ ] Astrological compatibility calculator
- [ ] Weekly/monthly horoscope summaries
- [ ] Analytics and insights on journaling habits

## 🧪 Testing

### Manual Testing Checklist
- [x] Multiple entries per day can be created
- [x] Entries appear in Saved tab
- [x] Long-press shows edit/delete menu
- [x] Edit from Saved updates the correct entry
- [x] Delete shows confirmation and removes entry
- [x] Horoscope caching works offline
- [x] Zodiac picker works on iOS and Android
- [x] Data persists across app restarts

### Future Automated Tests
- Unit tests for JournalContext methods
- Integration tests for horoscope API fallback
- E2E tests for journal entry lifecycle
- Snapshot tests for UI components

## 📝 Notes

### Known Limitations
- No data encryption (entries stored in plain text)
- No cloud backup/sync
- Limited to single user (no multi-user support)
- No data export functionality yet

### Performance Considerations
- AsyncStorage is synchronous on Android (can block UI with large data)
- Consider pagination if entry list grows beyond 1000 items
- Image attachments would require migration to file system
- Rich text would increase storage requirements

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

### Development Tips
- Use `yarn start --reset-cache` to clear Metro cache
- Run `pod install` after adding new native dependencies
- Check Metro logs for API errors and warnings
- Use Debug button on Home screen to inspect API responses

## 📄 License

MIT License - feel free to use this project as a learning resource or starting point for your own apps!

## 👨‍💻 Author

Built with ❤️ as a demonstration of React Native best practices and modern mobile app architecture.

---

**Last Updated**: October 25, 2025
