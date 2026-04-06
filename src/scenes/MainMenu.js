export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    this.createStars();
    this.createMathSymbols();
    this.createTitle();
    this.createPlayButton();
  }

  createStars() {
    const stars = this.add.graphics();
    stars.fillStyle(0xffffff, 1);
    for (let i = 0; i < 150; i++) {
      const x = Phaser.Math.Between(0, 800);
      const y = Phaser.Math.Between(0, 600);
      const size = Phaser.Math.FloatBetween(0.5, 2);
      stars.fillCircle(x, y, size);
    }
  }

  createMathSymbols() {
    const symbols = ['+', '-', '×', '÷', 'π', '∑', '√', '∞', '=', '%'];
    this.mathSymbols = [];

    for (let i = 0; i < 20; i++) {
      const symbol = this.add.text(
        Phaser.Math.Between(0, 800),
        Phaser.Math.Between(0, 600),
        Phaser.Utils.Array.GetRandom(symbols),
        {
          fontSize: `${Phaser.Math.Between(16, 32)}px`,
          fontFamily: 'monospace',
          color: '#00ffcc',
          alpha: 0.15,
        },
      );
      symbol.setOrigin(0.5);
      this.mathSymbols.push(symbol);

      this.tweens.add({
        targets: symbol,
        y: symbol.y - Phaser.Math.Between(50, 150),
        duration: Phaser.Math.Between(3000, 6000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
  }

  createTitle() {
    const title = this.add.text(400, 180, 'MATH INVADERS', {
      fontSize: '64px',
      fontFamily: 'monospace',
      color: '#39ff14',
      fontStyle: 'bold',
    });
    title.setOrigin(0.5);
    title.setShadow(0, 0, 15, '#39ff14', 2, true, true);

    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  createPlayButton() {
    const btn = this.add.container(400, 400);

    const bg = this.add.graphics();
    bg.fillStyle(0x39ff14, 0.2);
    bg.lineStyle(2, 0x39ff14, 1);
    bg.fillRoundedRect(-100, -30, 200, 60, 8);
    bg.strokeRoundedRect(-100, -30, 200, 60, 8);

    const text = this.add.text(0, 0, 'JUGAR', {
      fontSize: '32px',
      fontFamily: 'monospace',
      color: '#39ff14',
      fontStyle: 'bold',
    });
    text.setOrigin(0.5);

    btn.add([bg, text]);
    btn.setSize(200, 60);

    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      bg.clear();
      bg.fillStyle(0x39ff14, 0.4);
      bg.lineStyle(3, 0x39ff14, 1);
      bg.fillRoundedRect(-100, -30, 200, 60, 8);
      bg.strokeRoundedRect(-100, -30, 200, 60, 8);
      text.setScale(1.1);
    });

    btn.on('pointerout', () => {
      bg.clear();
      bg.fillStyle(0x39ff14, 0.2);
      bg.lineStyle(2, 0x39ff14, 1);
      bg.fillRoundedRect(-100, -30, 200, 60, 8);
      bg.strokeRoundedRect(-100, -30, 200, 60, 8);
      text.setScale(1);
    });

    btn.on('pointerdown', () => {
      console.log('Jugar presionado - escena Game pendiente');
    });
  }
}
