/* eslint-disable max-classes-per-file */
function requiredValue(value, keyName) {
  if (!value) {
    throw new Error(`The value of ${keyName} is required!`);
  }
  return value;
}

class Screenshot {
  constructor(screenshotArea) {
    this.screenshotArea = screenshotArea;
    this.areas = {
      WINDOW: 'window',
      SCREEN: 'screen',
    };
    this.WINDOW_AREA = this.areas.WINDOW;
    this.SCREEN_AREA = this.areas.SCREEN;
    this.savedScreenshots = [];
    this.saveResult = false;
  }

  set screenshotArea(area) {
    if (!Object.values(this.areas).includes(area)) {
      const error = 'Area tidak valid!. Area hanya boleh termasuk salah satu dari properti Screenshot.areas';
      throw new Error(error);
    }
    this.screenshotArea = area;
  }

  get screenshotArea() {
    const SAValue = this.screenshotArea;
    const SAKey = this.areas.values.indexOf(SAValue);
    return `Screenshot.${this.areas.keys()[SAKey]}`;
  }

  setScreenshotArea(area) {
    this.screenshotArea = area;
    return true;
  }

  getScreenshotarea() {
    return this.screenshotArea;
  }
}

class YoutubeButton {
  constructor() {
    this.btnClassNames = {
      $all: '.ytp-button',
      play: '.ytp-play-button',
      playNext: '.ytp-next-button',
      playPrev: '.ytp-prev-button',
      mute: '.ytp-mute-button',
      settings: '.ytp-settings-button',
      watchLater: '.ytp-watch-later-button',
    };
    this.adBtnClassNames = {
      youtubeAdSkipBtn: '.ytp-ad-skip-button',
    };
    this.get = document.querySelector;
    this.getAll = document.querySelectorAll;
  }

  get allBtn() {
    return this.getAll(this.btnClassNames.$all);
  }

  get youtubeAdSkipBtn() {
    return this.getAdButton('youtubeAdSkipBtn');
  }

  get play() {
    return this.getButton('play');
  }

  get playNext() {
    return this.getButton('playNext');
  }

  get playPrev() {
    return this.getButton('playPrev');
  }

  get mute() {
    return this.getButton('mute');
  }

  get settings() {
    return this.getButton('settings');
  }

  get watchLater() {
    return this.getButton('watchLater');
  }

  getButton(buttonName) {
    if (!this.btnClassNames[buttonName]) {
      throw new Error('Tidak ada tombol dengan nama seperti itu!');
    }
    return this.get(this.btnClassNames[buttonName]);
  }

  getAdButton(buttonName) {
    if (!this.adBtnClassNames[buttonName]) {
      throw new Error('Tidak ada tombol dengan nama seperti itu!');
    }
    return this.get(this.adBtnClassNames[buttonName]);
  }

  click(buttonName) {
    if (!this[buttonName]) {
      throw new Error('Tidak ada tombol dengan nama seperti itu!');
    }
    this.btnClassNames[buttonName].click();
  }
}

class YoutubeManager {
  constructor() {
    this.buttons = new YoutubeButton();
    this.classNames = {
      adPlayerOverlay: '.ytp-ad-player-overlay',
      progressBar: '.ytp-progress-bar',
    };
    this.get = document.querySelector;
    this.getAll = document.querySelectorAll;
  }

  get skipAdBtnIsExist() {
    return this.buttons.youtubeAdSkipBtn;
  }

  get adIsExist() {
    return !!document.querySelector(this.classNames.adPlayerOverlay);
  }

  get progressBar() {
    return this.get(this.classNames.progressBar);
  }
}

class AlarmSound {
  constructor(source) {
    this.source = source;
    (async () => {
      this.sound = await this.getSoundFrom(source);
    })();
  }

  // eslint-disable-next-line class-methods-use-this
  async getSoundFrom(source) {
    const sound = await fetch(source).then((r) => r.blob());
    return sound;
  }
}

class ScheduledTask {
  constructor(params) {
    this.name = requiredValue(params.name, 'name');
    this.sound = params.sound;
    this.time = params.time;
    this.message = requiredValue(params.message, 'message');
    this.showProgress = params.showProgress === undefined ? true : false;
    this.withDialog = params.withDialog === undefined ? true : false;
    this.audioPlayer = document.createElement('audio');
    this.finished = false;
    this.$intervalId = null;
  }

  set sound(sound) {
    if (!(sound instanceof AlarmSound)) {
      throw new Error('Suara alarm tidak tidak valid!');
    }
    this.sound = sound;
  }

  setSound(sound) {
    this.sound = sound;
    return true;
  }

  get sound() {
    return this.sound;
  }

  getSound() {
    return this.sound;
  }

  cancel() {
    this.time = null;
  }
}

class Alarm extends ScheduledTask {
  save() {
    let now;
    this.$intervalId = setInterval(() => {
      now = new Date();
      if (this.time === null) {
        clearInterval(this.$intervalId);
      }
      if (now.getTime() >= this.time.getTime()) {
        this.finished = true;
        this.audioPlayer.src = this.sound.blob;
        this.audioPlayer.play();
        clearInterval(this.$intervalId);
      }
    }, 100);
  }
}

class Task extends ScheduledTask {
  constructor(params) {
    super(params);
    this.task = params.task || (() => {});
    this.event = params.event;
  }

  save() {
    let now;
    if (this.time) {
      this.$intervalId = setInterval(() => {
        now = new Date();
        if (this.time === null) {
          clearInterval(this.$intervalId);
        }
        if (now.getTime() >= this.time.getTime()) {
          this.completed = true;
          this.task.call();
          this.audioPlayer.src = this.sound.blob;
          this.audioPlayer.play();
          clearInterval(this.$intervalId);
        }
      }, 100);
    } else {
      document.addEventListener(this.event, this.task);
    }
  }
}

const history = [];
const tasks = [];
const alarms = [];
let historyMode = true;
