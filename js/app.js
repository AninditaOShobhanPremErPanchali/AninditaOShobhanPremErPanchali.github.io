
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
    'assets/images/both_of_us/photo_2.2.jpeg',
    'assets/images/both_of_us/photo_2.jpg',
    'assets/images/both_of_us/photo_4.jpg',
    'assets/images/both_of_us/photo_5.jpg',
    'assets/images/both_of_us/photo_7.jpg',
    'assets/images/both_of_us/photo_8.jpg',
    'assets/images/both_of_us/photo_9.jpg',
    'assets/images/both_of_us/photo_10.jpg',
    'assets/images/both_of_us/photo_11.jpg',
    'assets/images/both_of_us/photo_12.jpg',
    'assets/images/both_of_us/photo_13.jpg',
    'assets/images/both_of_us/photo_3.jpg',
    'assets/images/both_of_us/photo_6.jpg'
  ],
  onlyAnindita: [
    'assets/images/Only_Anindita/img_ani_5.1.jpeg',
    'assets/images/Only_Anindita/img_ani_1.1.jpeg',
    'assets/images/Only_Anindita/img_ani_9.1.jpg',
    'assets/images/Only_Anindita/img_ani_5.4.jpeg',
    'assets/images/Only_Anindita/img_ani_2.jpeg',
    'assets/images/Only_Anindita/img_ani_5.2.jpeg',
    'assets/images/Only_Anindita/img_ani_8.jpeg',
    'assets/images/Only_Anindita/img_ani_3.jpg',
    'assets/images/Only_Anindita/img_ani_6.jpeg',
    'assets/images/Only_Anindita/img_ani_5.3.jpeg',
    'assets/images/Only_Anindita/img_ani_1.2.jpeg',
    'assets/images/Only_Anindita/img_ani_4.jpeg',
    'assets/images/Only_Anindita/img_ani_7.jpeg',
    'assets/images/Only_Anindita/img_ani_9.2.jpg',
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

// Confetti and Balloon Animation
function triggerBirthdayAnimation(){
  // Adjust confetti parameters based on screen size
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth < 1024;
  
  const centerParticles = isMobile ? 80 : isTablet ? 120 : 150;
  const sideParticles = isMobile ? 50 : isTablet ? 75 : 100;
  
  // Confetti burst from center
  confetti({
    particleCount: centerParticles,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ff1493', '#ff69b4', '#ffb6c1', '#ff6b9d', '#c71585', '#ff00ff']
  });

  // Additional confetti bursts from left side
  setTimeout(() => {
    confetti({
      particleCount: sideParticles,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: ['#ffd700', '#ffed4e', '#ffc700']
    });
  }, 100);

  // Additional confetti bursts from right side
  setTimeout(() => {
    confetti({
      particleCount: sideParticles,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: ['#ffd700', '#ffed4e', '#ffc700']
    });
  }, 200);

  // Create floating balloons
  createBirthdayBalloons();
}

function createBirthdayBalloons(){
  const balloonEmojis = ['🎈', '🎉', '🎊', '🎁', '⭐', '🌟', '✨'];
  const container = document.createElement('div');
  container.className = 'balloon-container';
  document.body.appendChild(container);

  // Adjust number of balloons based on screen size
  const isMobile = window.innerWidth < 640;
  const isTablet = window.innerWidth < 1024;
  const balloonCount = isMobile ? 8 : isTablet ? 10 : 12;

  for(let i = 0; i < balloonCount; i++){
    setTimeout(() => {
      const balloon = document.createElement('div');
      balloon.className = 'birthday-balloon';
      balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
      balloon.style.left = Math.random() * window.innerWidth + 'px';
      balloon.style.setProperty('--duration', (Math.random() * 2 + 2) + 's');
      balloon.style.setProperty('--delay', (i * 50) + 'ms');
      container.appendChild(balloon);
    }, i * 50);
  }

  setTimeout(() => {
    container.remove();
  }, 4000);
}

// Birthday Letter Modal Handler
function initBirthdayLetter(){
  const openLetterBtn = document.getElementById('open-letter-btn');
  const birthdayModal = document.getElementById('birthday-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if(openLetterBtn && birthdayModal && closeModalBtn){
    openLetterBtn.addEventListener('click', () => {
      birthdayModal.classList.remove('hidden');
      triggerBirthdayAnimation();
    });

    closeModalBtn.addEventListener('click', () => {
      birthdayModal.classList.add('hidden');
    });

    birthdayModal.addEventListener('click', (e) => {
      if(e.target === birthdayModal){
        birthdayModal.classList.add('hidden');
      }
    });
  }
}

initBirthdayLetter();
initPrivateAccess();
