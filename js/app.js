
AOS.init();
const PRIVATE_PASSWORD = 'Personality';
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

const galleryImages = {
  bothOfUs: [
    'assets/images/both_of_us/photo_1.jpg',
    'assets/images/both_of_us/photo_2.jpg',
    'assets/images/both_of_us/photo_3.jpg',
    'assets/images/both_of_us/photo_4.jpg',
    'assets/images/both_of_us/photo_5.jpg',
    'assets/images/both_of_us/photo_6.jpg',
    'assets/images/both_of_us/photo_7.jpg',
    'assets/images/both_of_us/photo_8.jpg',
    'assets/images/both_of_us/photo_9.jpg',
    'assets/images/both_of_us/photo_10.jpg',
    'assets/images/both_of_us/photo_11.jpg',
    'assets/images/both_of_us/photo_12.jpg',
    'assets/images/both_of_us/photo_13.jpg',
    'assets/images/both_of_us/photo_14.jpg',
    'assets/images/both_of_us/photo_15.jpg'
  ],
  onlyAnindita: [
    'assets/images/Only_Anindita/img_ani_1.1.jpeg',
    'assets/images/Only_Anindita/img_ani_1.2.jpeg',
    'assets/images/Only_Anindita/img_ani_2.jpeg',
    'assets/images/Only_Anindita/img_ani_3.jpg',
    'assets/images/Only_Anindita/img_ani_4.jpeg',
    'assets/images/Only_Anindita/img_ani_5.1.jpeg',
    'assets/images/Only_Anindita/img_ani_5.2.jpeg',
    'assets/images/Only_Anindita/img_ani_5.3.jpeg',
    'assets/images/Only_Anindita/img_ani_5.4.jpeg',
    'assets/images/Only_Anindita/img_ani_5.5.jpeg'
  ]
};

function shuffleGalleryImages(){
  const both = galleryImages.bothOfUs.slice();
  const only = galleryImages.onlyAnindita.slice();
  if(both.length < 3 || only.length < 2) return;

  const selectedBoth = [];
  const selectedOnly = [];

  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * both.length);
    selectedBoth.push(both.splice(index, 1)[0]);
  }

  for (let i = 0; i < 2; i++) {
    const index = Math.floor(Math.random() * only.length);
    selectedOnly.push(only.splice(index, 1)[0]);
  }

  const galleryItems = document.querySelectorAll('.gallery-item');
  if(galleryItems.length < 5) return;

  const sources = [
    selectedBoth[0],
    selectedOnly[0],
    selectedBoth[1],
    selectedOnly[1],
    selectedBoth[2]
  ];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      img.classList.add('fade-out');
      setTimeout(() => {
        img.src = sources[index];
        img.classList.remove('fade-out');
        img.classList.add('fade-in');
        setTimeout(() => {
          img.classList.remove('fade-in');
        }, 600);
      }, 300);
    } else {
      const newImg = document.createElement('img');
      newImg.src = sources[index];
      newImg.alt = `Gallery image ${index + 1}`;
      newImg.loading = 'lazy';
      newImg.classList.add('fade-in');
      item.innerHTML = '';
      item.appendChild(newImg);
      setTimeout(() => {
        newImg.classList.remove('fade-in');
      }, 600);
    }
  });
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

shuffleGalleryImages();
setInterval(shuffleGalleryImages, 5000);
initPrivateAccess();
