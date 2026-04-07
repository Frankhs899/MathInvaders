import '@/style.css';
import Phaser from 'phaser';
import MainMenu from '@/scenes/mainMenu';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  parent: 'app',
  dom: {
    createContainer: true,
  },
  scene: [MainMenu],
};

const game = new Phaser.Game(config);
