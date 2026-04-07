export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    this.playerConfig = {
      name: '',
      operation: null,
      difficulty: null,
    };

    this.createStars();
    this.createMathSymbols();
    this.createTitle();
    this.createNameInput();
    this.createOperationSelector();
    this.createDifficultySelector();
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
    const title = this.add.text(400, 60, 'MATH INVADERS', {
      fontSize: '48px',
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

  createNameInput() {
    const label = this.add.text(400, 130, 'NOMBRE', {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#39ff14',
      fontStyle: 'bold',
    });
    label.setOrigin(0.5);

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.maxLength = 15;
    inputElement.placeholder = 'Ingresa tu nombre...';
    inputElement.style.cssText = `
      background: transparent;
      border: 2px solid #39ff14;
      border-radius: 8px;
      color: #39ff14;
      font-family: monospace;
      font-size: 18px;
      padding: 8px 16px;
      text-align: center;
      width: 280px;
      outline: none;
    `;

    this.nameInput = this.add.dom(400, 170, inputElement);

    inputElement.addEventListener('input', (e) => {
      this.playerConfig.name = e.target.value.trim();
      this.validateForm();
    });
  }

  createOperationSelector() {
    this.operationButtons = [];

    this.createButtonGroup({
      label: 'OPERACIÓN',
      labelY: 230,
      options: [
        { key: 'addition', symbol: '+', label: 'Suma' },
        { key: 'subtraction', symbol: '-', label: 'Resta' },
        { key: 'multiplication', symbol: '×', label: 'Multiplicación' },
        { key: 'division', symbol: '÷', label: 'División' },
      ],
      buttonY: 280,
      buttonWidth: 90,
      buttonHeight: 50,
      spacing: 110,
      fontSize: 10,
      symbolFontSize: 20,
      onSelect: (key) => {
        this.playerConfig.operation = key;
        this.updateOperationButtons();
        this.validateForm();
      },
      buttonsRef: this.operationButtons,
    });
  }

  createDifficultySelector() {
    this.difficultyButtons = [];

    this.createButtonGroup({
      label: 'DIFICULTAD',
      labelY: 340,
      options: [
        { key: 'easy', label: 'Fácil' },
        { key: 'medium', label: 'Medio' },
        { key: 'hard', label: 'Difícil' },
      ],
      buttonY: 390,
      buttonWidth: 110,
      buttonHeight: 40,
      spacing: 140,
      fontSize: 16,
      onSelect: (key) => {
        this.playerConfig.difficulty = key;
        this.updateDifficultyButtons();
        this.validateForm();
      },
      buttonsRef: this.difficultyButtons,
    });
  }

  createButtonGroup({
    label,
    labelY,
    options,
    buttonY,
    buttonWidth,
    buttonHeight,
    spacing,
    fontSize,
    symbolFontSize,
    onSelect,
    buttonsRef,
  }) {
    const labelText = this.add.text(400, labelY, label, {
      fontSize: '16px',
      fontFamily: 'monospace',
      color: '#39ff14',
      fontStyle: 'bold',
    });
    labelText.setOrigin(0.5);

    const halfW = buttonWidth / 2;
    const halfH = buttonHeight / 2;
    const startX = 400 - (options.length - 1) * (spacing / 2);

    options.forEach((opt, i) => {
      const x = startX + i * spacing;

      const container = this.add.container(x, buttonY);

      const bg = this.add.graphics();
      bg.fillStyle(0x39ff14, 0.1);
      bg.lineStyle(2, 0x39ff14, 0.6);
      bg.fillRoundedRect(-halfW, -halfH, buttonWidth, buttonHeight, 6);
      bg.strokeRoundedRect(-halfW, -halfH, buttonWidth, buttonHeight, 6);

      const elements = [bg];

      if (opt.symbol) {
        const symbol = this.add.text(0, -8, opt.symbol, {
          fontSize: `${symbolFontSize}px`,
          fontFamily: 'monospace',
          color: '#39ff14',
          fontStyle: 'bold',
        });
        symbol.setOrigin(0.5);
        elements.push(symbol);
      }

      const text = this.add.text(0, opt.symbol ? 12 : 0, opt.label, {
        fontSize: `${fontSize}px`,
        fontFamily: 'monospace',
        color: '#39ff14',
      });
      text.setOrigin(0.5);
      elements.push(text);

      container.add(elements);
      container.setSize(buttonWidth, buttonHeight);

      container.setInteractive({ useHandCursor: true });

      container.on('pointerdown', () => onSelect(opt.key));

      buttonsRef.push({ container, bg, key: opt.key });
    });
  }

  updateOperationButtons() {
    this.operationButtons.forEach((btn) => {
      btn.bg.clear();
      if (btn.key === this.playerConfig.operation) {
        btn.bg.fillStyle(0x39ff14, 0.4);
        btn.bg.lineStyle(3, 0x39ff14, 1);
      } else {
        btn.bg.fillStyle(0x39ff14, 0.1);
        btn.bg.lineStyle(2, 0x39ff14, 0.6);
      }
      btn.bg.fillRoundedRect(-45, -25, 90, 50, 6);
      btn.bg.strokeRoundedRect(-45, -25, 90, 50, 6);
    });
  }

  updateDifficultyButtons() {
    this.difficultyButtons.forEach((btn) => {
      btn.bg.clear();
      if (btn.key === this.playerConfig.difficulty) {
        btn.bg.fillStyle(0x39ff14, 0.4);
        btn.bg.lineStyle(3, 0x39ff14, 1);
      } else {
        btn.bg.fillStyle(0x39ff14, 0.1);
        btn.bg.lineStyle(2, 0x39ff14, 0.6);
      }
      btn.bg.fillRoundedRect(-55, -20, 110, 40, 6);
      btn.bg.strokeRoundedRect(-55, -20, 110, 40, 6);
    });
  }

  createPlayButton() {
    const btn = this.add.container(400, 480);

    const bg = this.add.graphics();
    bg.fillStyle(0x555555, 0.3);
    bg.lineStyle(2, 0x555555, 0.6);
    bg.fillRoundedRect(-100, -30, 200, 60, 8);
    bg.strokeRoundedRect(-100, -30, 200, 60, 8);

    const text = this.add.text(0, 0, 'JUGAR', {
      fontSize: '32px',
      fontFamily: 'monospace',
      color: '#555555',
      fontStyle: 'bold',
    });
    text.setOrigin(0.5);

    btn.add([bg, text]);
    btn.setSize(200, 60);

    this.playButton = btn;
    this.playButtonBg = bg;
    this.playButtonText = text;
    this.playButtonEnabled = false;

    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      if (this.playButtonEnabled) {
        bg.clear();
        bg.fillStyle(0x39ff14, 0.5);
        bg.lineStyle(3, 0x39ff14, 1);
        bg.fillRoundedRect(-100, -30, 200, 60, 8);
        bg.strokeRoundedRect(-100, -30, 200, 60, 8);
        text.setScale(1.1);
      }
    });

    btn.on('pointerout', () => {
      if (this.playButtonEnabled) {
        bg.clear();
        bg.fillStyle(0x39ff14, 0.3);
        bg.lineStyle(2, 0x39ff14, 1);
        bg.fillRoundedRect(-100, -30, 200, 60, 8);
        bg.strokeRoundedRect(-100, -30, 200, 60, 8);
        text.setScale(1);
      }
    });

    btn.on('pointerdown', () => {
      if (this.playButtonEnabled) {
        console.log('Config:', this.playerConfig);
      }
    });
  }

  validateForm() {
    const isValid =
      this.playerConfig.name !== '' &&
      this.playerConfig.operation !== null &&
      this.playerConfig.difficulty !== null;

    if (isValid !== this.playButtonEnabled) {
      this.playButtonEnabled = isValid;

      this.playButtonBg.clear();
      if (isValid) {
        this.playButtonBg.fillStyle(0x39ff14, 0.3);
        this.playButtonBg.lineStyle(2, 0x39ff14, 1);
        this.playButtonText.setColor('#39ff14');
      } else {
        this.playButtonBg.fillStyle(0x555555, 0.3);
        this.playButtonBg.lineStyle(2, 0x555555, 0.6);
        this.playButtonText.setColor('#555555');
      }
      this.playButtonBg.fillRoundedRect(-100, -30, 200, 60, 8);
      this.playButtonBg.strokeRoundedRect(-100, -30, 200, 60, 8);
    }
  }
}
