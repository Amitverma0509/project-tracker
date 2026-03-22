# Project Tracker

**Live Demo:** https://project-tracker-delta-nine.vercel.app

## Setup Instructions
git clone https://github.com/Amitverma0509/project-tracker
cd project-tracker
npm install
npm run dev

## State Management — Why Zustand
Chosen over Context+useReducer because it needs no provider
wrapping, the store is importable anywhere, and it handles
frequent collab simulation updates without re-rendering the
whole component tree.

## Virtual Scrolling
Built from scratch in useVirtualScroll.ts. Only visible rows
plus 5 buffer rows are in the DOM at any time. Total scroll
height is maintained by a tall spacer div so the scrollbar
stays accurate across all 500 rows. Scrolling is smooth
because row height is fixed at 56px.

## Drag and Drop
Built using native pointer events — no libraries. 
onPointerDown captures the card's exact dimensions via
getBoundingClientRect, creates a ghost card that follows
the cursor, and shows a dashed placeholder in the original
slot. Dropping outside any column triggers a snap-back
via opacity and scale transition over 300ms.

## Lighthouse Score
[<img width="933" height="274" alt="Screenshot 2026-03-23 023535" src="https://github.com/user-attachments/assets/8eb809b7-adc5-4255-86df-e12e43dcbb38" />]

The hardest UI problem was the custom drag-and-drop system.
The trickiest part was preventing layout shift when a card
is picked up. I solved this by capturing the card's exact
dimensions using getBoundingClientRect at pointer-down time,
then immediately rendering a dashed placeholder div of the
same height in the original slot before the ghost card
appears. This means the column layout never shifts because
the placeholder takes the card's space in the flow.

For virtual scrolling I calculate startIndex and endIndex
from scrollTop divided by rowHeight, add a 5-row buffer on
each side, and absolutely position only those rows inside a
container whose total height equals totalRows times rowHeight.
The scrollbar feels accurate because the outer container
always has the correct full height even though most rows
are not in the DOM.

State is managed with Zustand because it requires no provider
wrapping and the store is importable in any component directly.
This made wiring the collab simulation, drag-and-drop, and URL
sync straightforward without prop drilling.

With more time I would add React.memo to TaskCard and ListRow
to prevent unnecessary re-renders during the collab simulation
interval, and extract the Gantt bar position math into a
dedicated utility function for cleaner separation of concerns.
