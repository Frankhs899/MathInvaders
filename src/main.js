import './style.css'
import Phaser from 'phaser'
import MainMenu from './scenes/MainMenu.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'app',
    scene: [MainMenu]
}

const game = new Phaser.Game(config)

