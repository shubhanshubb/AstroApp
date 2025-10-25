# Astro Journal App

Mobile journal app focused on daily horoscopes and daily journaling. Built with React Native and a clean, modular folder structure so you can extend it quickly.

Summary
- Select a zodiac sign and view today's horoscope (from the public aztro API).
- Write and persist journal entries locally per-day.
- Offline-ready using AsyncStorage.

Tech stack
- React Native (community CLI)
- React Navigation (stack + bottom tabs)
- Context API for app state
- AsyncStorage for persistence (`@react-native-async-storage/async-storage`)
- Picker (`@react-native-picker/picker`)

What I implemented (minimal, demo-ready)
- Home screen: shows today's date, zodiac picker, fetched horoscope and a "Write Journal" button.
- Journal screen: editable journal for the day with explicit save.
- Local persistence via AsyncStorage (entries keyed by date).
- Clean folders: `src/components`, `src/services`, `src/hooks`, `src/context`.

Folder structure (important files)

```
App.js
navigation/
  AppNavigator.js
  BottomTab.js
screens/
  Home.js
  Journal.js
src/
  components/
    ZodiacPicker.js
  context/
    JournalContext.js
  hooks/
    useAsyncStorage.js
  services/
    horoscope.js
README.md
package.json
ios/
android/
```

Setup — run locally

1. Install JS dependencies

```sh
yarn install
# or: npm install
```

2. Install native iOS deps (macOS)

```sh
cd ios
pod install
cd ..
```

3. Run Metro + app

```sh
yarn start   # start metro
yarn ios     # run on iOS simulator (or: npx react-native run-ios)
yarn android # run on Android (if configured)
```

Notes
- I added `@react-native-async-storage/async-storage` and `@react-native-picker/picker` for persistence and a reliable picker component.
- The horoscope service uses the public aztro API (POST with form data). It is fine for demos, but consider a backend or caching for production.

How to use
- Open the app. On Home pick a zodiac sign. The app fetches today's horoscope.
- Tap "Write Journal" to open the journal editor for today. Type and tap Save. The entry persists locally and will be reloaded on next app start.

Development notes & decisions
- Persistence: AsyncStorage chosen for simplicity and offline support. For structured queries or larger data, migrate to SQLite.
- State: small app uses Context API (JournalContext) to keep selected sign and save/load entries.
- UI: minimal components to keep the scope small. The `LiquidGlass` package is present and used in other screens from the starter template.

Future improvements (stretch / product ideas)
- Autosave with debounce and offline queueing.
- Add list/history of previous entries with search and tags.
- Add scheduled local notifications to remind users to journal.
- Add encryption for sensitive journal content.
- Sync to a backend (user accounts) and enable cross-device sync.
- Improve accessibility and animations.

Submission checklist
- [ ] Core app code (no node_modules) pushed to GitHub
- [ ] README with run instructions and product notes (this file)
- [ ] Short recorded flow (screen recording) showing main flows

UX notes (quick product thoughts)
- The core loop: read horoscope -> reflect -> journal. Keep friction low: show today's date, selected sign prominently, and one-tap to journal.
- Use reminders and streaks to increase daily engagement.

If you want, I can:
- Add a README `Screenshots` section and include a small design spec.
- Implement autosave and a history screen.
- Add unit tests for `useAsyncStorage` and `JournalContext`.

Contact / next steps
- Tell me which of the optional improvements you want next (autosave, notifications, SQLite, tests, README screenshots) and I will implement it.
