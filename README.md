# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2f15758a-592e-4913-aa2e-6e2ccac5a3e2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2f15758a-592e-4913-aa2e-6e2ccac5a3e2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2f15758a-592e-4913-aa2e-6e2ccac5a3e2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)


Classroom Attendance Tracker idea (with bonus twist), here’s a complete mobile-first UI/UX breakdown — following both Material Design (Android) and Apple HIG (iOS), structured for clarity and fast attendance interaction.

🔥 Final Screen List
Welcome / Role Selector

Login / Join Class

Home Dashboard (Role-based view)

Calendar View

Mark Attendance (Teacher only)

Attendance Summary (Student only)

Alerts & Smart Insights

Goal Tracker & Streaks

Profile / Settings

🖼️ Screen 1: Welcome & Role Selection
🔍 Purpose:
Let user select if they are a student or a teacher (defines app flow & permissions).

📐 Layout Structure (Top → Bottom):

Header: App logo or icon

Main Area:

"Who are you?" prompt

Two cards: 🎓 Student / 👨‍🏫 Teacher

Footer: Small disclaimer about role selection

🔘 Key UI Elements:

Role cards (e.g., icon + title + select radio or tap area)

Continue button (enabled on selection)

🔗 Navigation / Page Flow:

Select Role → Tap "Continue" → Login/Join Class screen

📱 Mobile Platform Notes:

Android: Use elevation shadow on role cards

iOS: Use subtle haptic feedback when role is selected

✅ UX Flow Tips:

This sets the conditional rendering logic for all screens ahead.

🖼️ Screen 2: Login / Join Class
🔍 Purpose:
Authenticate the user and connect to class (no full auth system needed for mock).

📐 Layout Structure (Top → Bottom):

Header: Role icon + title (e.g., "Student Login")

Main Area:

Input: Name

Input: Roll Number

Input: Class Code (join)

Footer:

Join Class button

OR "Create Class" (if Teacher)

🔘 Key UI Elements:

Text fields with native keyboard

Class code join logic

Snackbar for errors

🔗 Navigation / Page Flow:

On Join → Dashboard (Home)

📱 Mobile Platform Notes:

Android: Autofill inputs where possible

iOS: Use native SheetPresentation for Create Class modal

✅ UX Flow Tips:

Minimal data entry. Don't overload here.

🖼️ Screen 3: Home Dashboard
🔍 Purpose:
Landing page with key attendance tools + visual summary.

📐 Layout Structure (Top → Bottom):

Header: App bar with greeting (e.g., "Hi, Ganesh") + profile icon

Main Area:

For Student:

Today’s attendance status (e.g., “Present 🎉”)

Calendar preview (heatmap or dot view)

Buttons: View Streaks | Check Trends

For Teacher:

Button: Mark Attendance

Today’s Class Summary (e.g., “26/30 present”)

Quick access calendar

Footer/Tabbar:
Home | Calendar | Alerts | Profile

🔘 Key UI Elements:

Bottom nav bar (Material/Blurred)

Summary cards

Calendar component (dot or gradient heat)

🔗 Navigation / Page Flow:

Tap “Mark Attendance” → Mark Attendance Screen

Tap “View Streaks” → Goal Tracker

Calendar → Full View Calendar

📱 Mobile Platform Notes:

Android: Use FAB for Mark Attendance

iOS: Show Mark Attendance inline with larger tap area

✅ UX Flow Tips:

Make this the “single glance” dashboard, minimal distractions.

🖼️ Screen 4: Calendar View
🔍 Purpose:
Visualize attendance patterns by date (heatmap + legend).

📐 Layout Structure (Top → Bottom):

Header: App bar with back icon

Main Area:

Calendar month selector

Dot/Color coding: Present (green), Absent (red), Upcoming (gray)

Tap date → small modal opens with list of students (for Teacher) or attendance info (for Student)

🔘 Key UI Elements:

Date picker

Attendance legend (inline component)

Modal pop-ups on tap

🔗 Navigation / Page Flow:

Tap day → detail modal

Swipe month → state refresh

📱 Mobile Platform Notes:

Android: Use Material DatePicker (customized)

iOS: Use iOS-styled picker + smooth transitions

✅ UX Flow Tips:

Works for both student and teacher, conditional display logic.

🖼️ Screen 5: Mark Attendance (Teacher Only)
🔍 Purpose:
Mark today’s class attendance quickly and intuitively.

📐 Layout Structure (Top → Bottom):

Header: Class name + date

Main Area:

Scroll list of students (Name, Roll No., Present/Absent toggle)

Filter tabs: All | Absent | Present

Footer: Save Attendance button

🔘 Key UI Elements:

Toggle buttons

Filter pills

Scrollable list with sticky header

🔗 Navigation / Page Flow:

Save Attendance → Confirmation toast

Optional: “Back to Dashboard”

📱 Mobile Platform Notes:

Android: Use sticky top filter + pull to refresh

iOS: Smooth swipe toggles + haptics on toggle

✅ UX Flow Tips:

Goal: Tap-tap-tap fast action in 30 seconds.

🖼️ Screen 6: Attendance Summary (Student)
🔍 Purpose:
Show detailed attendance stats for student.

📐 Layout Structure (Top → Bottom):

Header: "My Attendance"

Main Area:

Pie chart: Present vs Absent %

Weekly trend bar chart

Last 7 days status list

🔘 Key UI Elements:

Charts (use SVG or flat mock)

Attendance cards

Streak indicator (🔥, 🧊 if broken)

🔗 Navigation / Page Flow:

From Dashboard → Tap “Check Trends”

📱 Mobile Platform Notes:

Android: Use tabs for "Month", "Week"

iOS: Use segmented controls + inline animation

✅ UX Flow Tips:

Reinforce motivation with visual clarity.

🖼️ Screen 7: Alerts & Smart Insights
🔍 Purpose:
Notify users of low attendance, warnings, or updates.

📐 Layout Structure (Top → Bottom):

Header: “Smart Alerts”

Main Area:

Cards:

"Your attendance dropped below 75%"

"3 days missed this week"

“Class avg. 89% this month”

🔘 Key UI Elements:

Dismissible cards

Icons (⚠️, ⏰)

Snackbar for instant feedback

🔗 Navigation / Page Flow:

Auto-notify → Alert → Tap to summary

📱 Mobile Platform Notes:

Android: Snackbar & card elevation

iOS: Alert modals & haptics on new alert

✅ UX Flow Tips:

Pull from database logic for automation (in MVP, mock manually)

🖼️ Screen 8: Goal Tracker & Streaks
🔍 Purpose:
Let students set goals and track consistency.

📐 Layout Structure (Top → Bottom):

Header: “Attendance Goal”

Main Area:

Set goal modal (e.g., "90% this month")

Current streak: 🔥 7 days

Progress bar or ring

🔘 Key UI Elements:

Goal input (stepper or % slider)

Progress ring (animated)

Reset/Update button

🔗 Navigation / Page Flow:

From Home → Tap “Set Goal”

📱 Mobile Platform Notes:

Android: Use steppers

iOS: Use sliders + confetti on success

✅ UX Flow Tips:

Reward habit formation. This adds gamification layer.

🖼️ Screen 9: Profile / Settings
🔍 Purpose:
Manage personal info, theme, class switch, etc.

📐 Layout Structure (Top → Bottom):

Header: “Profile”

Main Area:

Avatar + Name

Class Info

Switch class / Logout

Notification toggle

Theme switcher (light/dark)

🔘 Key UI Elements:

Toggle switches

Edit buttons

Bottom sheet for logout confirmation

🔗 Navigation / Page Flow:

Tab bar → Profile

Logout → Splash screen

📱 Mobile Platform Notes:

Android: Theme toggle with Material switch

iOS: Use system settings icon + sheet interactions

✅ UX Flow Tips:

Let users personalize but keep it minimal.

✅ Final Flow Summary
pgsql
Copy
Edit
Welcome → Role Select → Join Class → Home → [Mark Attendance | View Streak | Calendar] → Summary / Alerts → Pro
