# 2026 Escape Room Design Tasks

This folder contains the structure for the 2026 Valentine's Escape Room, based on the 2025 design.

## Files Structure
- `startHere.html`: Entry point.
- `phases/phase1.html`: First puzzle (Math + Flower).
- `phases/phase2.html`: Second puzzle (Riddle + Lock).
- `phases/phase3.html`: Final "Congratulations" page.

## Customization Needed

### phase1.html
- **Math Puzzle**: Currently set to `(2026 - 2000) - 12 = 14`. Update the question or answer in the HTML and JS (`validateMath` function).
- **Flower Puzzle**: Currently spells "ROSE". Update the letters and secret word in the HTML and JS logic if desired.

### phase2.html
- **Riddle**: Currently asks for "What year is this?". Update the riddle text in the HTML.
- **Riddle Answer**: Currently accepts "2026". Update `validateAnswer` function if you change the riddle.
- **Lock Code**: Currently set to `2026` ([2,0,2,6]). Update `validatePassword` function with a new code if needed.

### phase3.html
- Add your personal message or final surprise here!

## Assets
- `Images.png/Lock.jpg` is used in Phase 2.
- `adventure.mp3` is used for background music.
