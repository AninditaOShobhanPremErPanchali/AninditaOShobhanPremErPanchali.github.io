
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

function grantAccess(){
  document.getElementById('private-access-overlay').classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  document.getElementById('main-content').classList.remove('blurred');
  type();
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
