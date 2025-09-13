import './style.css';
import './app.css';

import logo from './assets/images/trademark-white.png';
import {Greet} from '../wailsjs/go/main/App';

// DOM要素が必ず存在することをTypeScriptに伝えるために、型アサーションを使う
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <img id="logo" class="logo">
  <div class="result" id="result">Please enter your name below 👇</div>
  <div class="input-box" id="input">
    <input class="input" id="name" type="text" autocomplete="off" />
    <button class="btn" id="greetBtn">Greet</button>
  </div>
</div>
`;

const logoElement = document.getElementById('logo') as HTMLImageElement;
logoElement.src = logo;

const nameElement = document.getElementById('name') as HTMLInputElement;
const resultElement = document.getElementById('result') as HTMLDivElement;
const greetBtn = document.getElementById('greetBtn') as HTMLButtonElement;

nameElement.focus();

greetBtn.addEventListener('click', () => greet());

async function greet() {
  // Get name
  const name = nameElement.value;

  // Check if the input is empty
  if (name === "") {
    return;
  }

  
  try {
    const result = await Greet(name);
    // Update result with data back from App.Greet()
    resultElement.innerText = result;
  } catch (err) {
    console.error(err);
  }
}
