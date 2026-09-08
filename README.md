# 🎮 Pong Game

A classic Pong game built with HTML, CSS, and JavaScript. Play against the computer AI with real-time scoring and smooth physics!

## 🚀 Play Now (Online)

**Easiest way to play - Click here:** [Open Pong Game in Browser](https://vanshparojan123.github.io/pong-game/)

Ya GitHub Pages se directly khel sakte ho:
1. Repository ko open karo
2. **Settings** → **Pages** pe jaao
3. Build and deployment section mein dekho - link milega direct khelnne ke liye

## 🎮 Game Controls

| Control | Action |
|---------|--------|
| **Mouse Y Position** | Move left paddle up/down |
| **Arrow Keys ↑/↓** | Move left paddle up/down |
| **W/S Keys** | Move left paddle up/down |
| **Start Game** | Begin playing |
| **Reset** | Reset score and restart |

## ✨ Features

- ✅ Player vs Computer AI
- ✅ Real-time scoreboard
- ✅ Ball physics with paddle spin
- ✅ Smooth collision detection
- ✅ Progressive difficulty (ball speeds up during rallies)
- ✅ Beautiful neon aesthetic
- ✅ Responsive design
- ✅ Sound and visual feedback

## 🎯 Game Rules

1. Move your left paddle to hit the ball
2. Computer controls the right paddle
3. First to score - ball goes out of bounds on opponent's side
4. Ball speed increases as the game progresses
5. Paddle movement affects ball trajectory (spin mechanics)

## 📁 Files

- `index.html` - Game structure
- `styles.css` - Modern neon styling
- `script.js` - Complete game logic and physics

## 🔧 How to Use Locally

```bash
# Clone the repository
git clone https://github.com/vanshparojan123/pong-game.git

# Navigate to the folder
cd pong-game

# Open in your browser
open index.html
# or on Windows: start index.html
# or on Linux: xdg-open index.html
```

## 🎯 Game Tips

- Move smoothly to control ball direction
- Predict where the ball will be, not where it is
- Quick paddle movements create stronger spin
- Computer is moderately difficult - practice makes perfect!

## 🎨 Customization

You can easily modify the game:

**Difficulty Level** (in `script.js`):
```javascript
const difficulty = 0.04; // Lower = Harder, Higher = Easier
```

**Ball Speed**:
```javascript
ball.maxSpeed = 8; // Increase for faster gameplay
```

**Paddle Speed**:
```javascript
leftPaddle.maxSpeed = 6;
rightPaddle.maxSpeed = 5;
```

## 📝 License

Free to use and modify!

---

**Enjoy the game! 🏓** 

Agar khelna chahte ho to bas upar wale link par click karo aur immediately khel sakte ho! 🎮
