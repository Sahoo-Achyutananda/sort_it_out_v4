# 🧠 SORT IT OUT – Sorting Algorithm Visualizer

**Sort It Out** is an interactive and engaging sorting algorithm visualizer built with **React**. Whether you're a student learning algorithms or a curious coder who enjoys visual interactivity, this tool makes complex sorting concepts simple, fun, and intuitive.

---

## ✨ Features

### 🎥 Algorithm Visualizer

- Visualizes 5 classic sorting algorithms:

  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort

- Animates sorting in real time with color-coded bars and value transitions.
- Control the **speed** of animations.
- Change the **array size** dynamically.

### 🏁 Race Mode

- Let multiple algorithms **race side-by-side** on the same array.
- Visually compare which algorithm performs best in real-time.
- Designed to make time complexity comparisons **fun and competitive**.

### 📚 Learn Alongside

- Time & Space complexity details.
- Short description and **fun historical trivia** about each algorithm.
- Syntax-highlighted code shown for each sorting algorithm.

### 🌟 Feedback System

- Built-in feedback form for collecting user ratings (out of 10), name, and optional comments.
- Feedback is stored in **Supabase**.
- Each submission tracks the **page source** (i.e., where the form was submitted from).
- Real-time **average rating display** on homepage using live data from Supabase.

### 💅 Aesthetic and UX

- Typing animations for a dynamic header using `react-typed`.
- Background videos for immersive experience.
- Fully **responsive** layout, smooth transitions, and intuitive UI/UX.
- Toast messages for feedback submission status.

---

## 🛠 Tech Stack

| Tech           | Purpose                   |
| -------------- | ------------------------- |
| React          | Frontend framework        |
| Supabase       | Backend database & API    |
| React Router   | Client-side routing       |
| React Toastify | Toast notifications       |
| CSS Modules    | Component-scoped styling  |
| Vite           | Fast dev server & bundler |
| Netlify        | Live deployment platform  |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/sort-it-out.git
cd sort-it-out
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase (Optional)

- Here, supabase just collects feedback from the viewers.
- Create a project on [Supabase](https://supabase.com).
- Create a `feedback` table with the following fields:

  - `name` (text)
  - `comments` (text)
  - `overall_rating` (integer)
  - `source` (text)

- In `utils/supabase.js`, add your Supabase URL and anonymous public key:

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
```

### 4. Start the development server

```bash
npm run dev
```

---

## 🌐 Live Demo

> 🔗 [Visit Sort It Out Live](https://sort-it-out-v3-achyutananda-sahoo.netlify.app)

---

## 💡 Use Cases

- 📘 Ideal for students learning DSA.
- 👩‍🏫 Great aid for teachers during lectures.
- 🧪 Useful for visually comparing algorithm performance.
- 🎓 Handy tool for coding bootcamps or self-paced learners.

---

<<<<<<< HEAD
## 🧠 Quote

> _“Your first love and your first project — neither ever works out perfectly, but both teach you what passion really feels like.”_

---

<!-- ## 🤝 Contributing

Pull requests, feedback, and suggestions are welcome! Feel free to fork this repo and submit improvements.

--- -->

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💼 Creator

**Achyutananda Sahoo**
_Artist by passion, developer by vision._
=======
>>>>>>> 4e4c5b7a7c5e63c88dcdbdb3d9641365985dc8e6

<!-- [Portfolio Website](https://achyutananda.dev) *(optional)* -->
