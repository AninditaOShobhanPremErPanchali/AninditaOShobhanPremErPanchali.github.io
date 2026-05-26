
AOS.init();
const PRIVATE_PASSWORD = 'Cab@Bea18626';
const ACCESS_KEY = 'privateAccessGranted';
const text = 'Every love story is beautiful, but ours is my favorite.';
let i = 0;

function type(){
  if(i < text.length){
    document.getElementById('typed').innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 50);
  }
}

function createBubbles(){
  const container = document.createElement('div');
  container.className = 'bubble-container';
  document.body.appendChild(container);
  
  // Create 12 bubbles
  for(let i = 0; i < 12; i++){
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.innerHTML = '❤️';
      
      // Random horizontal position
      const randomX = Math.random() * window.innerWidth;
      bubble.style.left = randomX + 'px';
      
      // Random horizontal drift
      const drift = (Math.random() - 0.5) * 200;
      bubble.style.setProperty('--tx', drift + 'px');
      
      container.appendChild(bubble);
      
      // Remove bubble after animation completes
      setTimeout(() => {
        bubble.remove();
      }, 3000);
    }, i * 100);
  }
  
  // Remove container after all bubbles are done
  setTimeout(() => {
    container.remove();
  }, 4200);
}

function grantAccess(){
  document.getElementById('private-access-overlay').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  document.getElementById('main-content').classList.remove('blurred');
  type();
  createBubbles();
  
  // Start background music
  if (typeof musicPlayer !== 'undefined') {
    musicPlayer.start();
  }
}

function initPrivateAccess(){
  const overlay = document.getElementById('private-access-overlay');
  const input = document.getElementById('access-password');
  const submit = document.getElementById('access-submit');
  const error = document.getElementById('access-error');
  const mainContent = document.getElementById('main-content');

  function checkPassword(){
    if(input.value.trim() === PRIVATE_PASSWORD){
      error.classList.add('hidden');
      grantAccess();
    } else {
      error.classList.remove('hidden');
      input.focus();
    }
  }

  submit.addEventListener('click', checkPassword);
  input.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
      checkPassword();
    }
  });

  overlay.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  mainContent.classList.add('blurred');
  input.focus();
}

initPrivateAccess();
