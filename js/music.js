// Background Music Manager
class MusicPlayer {
  constructor() {
    this.audio = new Audio();
    this.playlist = [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.musicPath = 'assets/musics/';
    
    // Initialize music player
    this.init();
  }

  async init() {
    try {
      // Load playlist from JSON
      const response = await fetch('assets/musics/playlist.json');
      this.playlist = await response.json();
      
      if (this.playlist.length > 0) {
        // Shuffle playlist
        this.shufflePlaylist();
        
        // Setup audio event listeners
        this.audio.addEventListener('ended', () => this.playNext());
        this.audio.addEventListener('error', () => {
          console.error('Error loading audio file');
          this.playNext();
        });
      } else {
        console.warn('No music files found in playlist.json');
      }
    } catch (error) {
      console.error('Error loading playlist:', error);
    }
  }

  shufflePlaylist() {
    // Fisher-Yates shuffle algorithm
    for (let i = this.playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
    }
    this.currentIndex = 0;
  }

  start() {
    if (this.playlist.length === 0) {
      console.warn('Playlist is empty');
      return;
    }
    
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  playNext() {
    if (this.currentIndex >= this.playlist.length) {
      // Reshuffle and restart playlist
      this.shufflePlaylist();
    }

    const trackPath = this.musicPath + encodeURIComponent(this.playlist[this.currentIndex]);
    this.audio.src = trackPath;
    this.audio.play().catch(error => {
      console.error('Autoplay prevented or error:', error);
      // Try playing on user interaction
      document.addEventListener('click', () => {
        if (!this.isPlaying) {
          this.audio.play();
          this.isPlaying = true;
        }
      }, { once: true });
    });
    
    this.isPlaying = true;
    this.currentIndex++;
    
    console.log('Now playing:', this.playlist[this.currentIndex - 1]);
  }

  stop() {
    this.audio.pause();
    this.isPlaying = false;
  }

  setVolume(volume) {
    // Volume: 0 to 1, default 0.3 for subtle background music
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }
}

// Initialize music player globally
const musicPlayer = new MusicPlayer();
musicPlayer.setVolume(0.8); // Set background music to 80% volume
