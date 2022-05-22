function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

window.addEventListener("load", (e) => {
  window.location.hash = "#homepage"
});

function rainRandom(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}
for (i = 0; i < 200; i++) {
  document.getElementsByTagName('body')[0].innerHTML += '<i class="rain" style="left: ' + rainRandom(-2000, 2000) + 'px;transform: translate3d(0, 0, 0);animation-delay: ' + (0.01 * i) + 's"></i>';
}

const plansNote = document.getElementById("app");
const addButton = plansNote.querySelector(".add-note");

getPlans().forEach((note) => {
  const planElement = createplanElement(note.id, note.content);
  plansNote.insertBefore(planElement, addButton);
});

addButton.addEventListener("click", () => addNote());

function getPlans() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function savePlans(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createplanElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note For Your Plans";

  element.addEventListener("change", () => {
    updatePlans(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this note?"
    );

    if (doDelete) {
      deletePlans(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getPlans();
  const planObj = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const planElement = createplanElement(planObj.id, planObj.content);
  plansNote.insertBefore(planElement, addButton);

  notes.push(planObj);
  savePlans(notes);
}

function updatePlans(id, newContent) {
  const notes = getPlans();
  const targetPlan = notes.filter((note) => note.id == id)[0];

  targetPlan.content = newContent;
  savePlans(notes);
}

function deletePlans(id, element) {
  const notes = getPlans().filter((note) => note.id != id);

  savePlans(notes);
  plansNote.removeChild(element);
}

const quotes = {
  "- Mahatma Gandhi": '"Learn as if you will live forever, live like you will die tomorrow."',
  "- Eleanor Roosevelt": '"When you give joy to other people, you get more joy in return. You should give a good thought to happiness that you can give out."',
  "- Winston S. Churchill": '"Success is not final; failure is not fatal: It is the courage to continue that counts."',
  "- Herman Melville": '"It is better to fail in originality than to succeed in imitation."',
  "- Colin R. Davis": '"The road to success and the road to failure are almost exactly the same."',
  "- David Thoreau": '"Success usually comes to those who are too busy looking for it.” "',
  "- Estée Lauder": '"I never dreamed about success. I worked for it.” "',
  "- Winston Churchill": '"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty."',
  "- Alexander Graham Bell": '"Concentrate all your thoughts upon the work in hand. The sun rays do not burn until brought to a focus. "',
  "- Thomas Jefferson": '"I’m a greater believer in luck, and I find the harder I work the more I have of it."',
  "- Paulo Coelho": '"When we strive to become better than we are, everything around us becomes better too."',
  "- Arlan Hamilton": '"We don’t just sit around and wait for other people. We just make, and we do."',
  "- Oprah Winfrey": '"Think like a queen. A queen is not afraid to fail. Failure is another stepping stone to greatness."',
  "- Andrew Jackson": '"One man with courage makes a majority."',
  "- Buddah": '"The mind is everything. What you think you become."',
  "- Chinese Proverb": '"The best time to plant a tree was 20 years ago. The second best time is now."',
  "- Woody Allen": '"Eighty percent of success is showing up."',
  "- Steve Jobs": '"Your time is limited, so don’t waste it living someone else’s life."',
  "- Vince Lombardi": '"Winning isn’t everything, but wanting to win is."',
  "- Stephen Covey": '"I am not a product of my circumstances. I am a product of my decisions. "',
  "- Christopher Columbus": '"You can never cross the ocean until you have the courage to lose sight of the shore."',
  "- Maya Angelou": '"I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel. "',
  "- Jim Rohn": '"Either you run the day, or the day runs you."',
  "- Henry Ford": '"Whether you think you can or you think you can’t, you’re right."',
  "- Frank Sinatra": '"The best revenge is massive success."',
  "- Zig Ziglar": '"People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily."',
  "- Aristotle": '"There is only one way to avoid criticism: do nothing, say nothing, and be nothing"',
  "- Jesus": '"Ask and it will be given to you; search, and you will find; knock and the door will be opened for you."',
  "- Ralph Waldo Emerson": '"The only person you are destined to become is the person you decide to be."',
  "- Henry David Thoreau": '"Go confidently in the direction of your dreams.  Live the life you have imagined."',
  "- Erma Bombeck": '"When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me."',
  "- Booker T. Washington": '"Few things can help an individual more than to place responsibility on him, and to let him know that you trust him."'
}

document.getElementById('generate').addEventListener('click', () => {
  let authors = Object.keys(quotes);
  let author = authors[Math.floor(Math.random() * authors.length)];
  let quote = quotes[author];
  document.getElementById('quote').innerHTML = quote;
  document.getElementById('author').innerHTML = author;
});


let api_url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk";
let api_key = "3eb28959048b1e0b8f6fb51b67916b4c";
let api_final = api_url + "&appid=" + api_key;

fetch(api_final)
  .then(function (resp) { return resp.json() })
  .then(function (data) {
    document.querySelector(".package-name").textContent = "City: " + data.name;
    document.querySelector(".features").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector(".degrees").innerHTML = "Temperature: " + Math.round(data.main.temp - 273) + "&deg;";
    document.querySelector(".degrees2").innerHTML = "Feels like: " + Math.round(data.main.feels_like - 273) + "&deg;";
    document.querySelector(".disclaimer").textContent = "Precipitation: " + data.weather[0]["description"];
    document.querySelector(".press").textContent = "Pressure: " + data.main.pressure + " hPa";
    document.querySelector(".speed").textContent = "Wind speed: " + data.wind.speed + " km/h";
  })
  .catch(error => console.error("Mistake"));

openTab(event, 'Homepage');