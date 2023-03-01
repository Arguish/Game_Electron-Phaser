# Game_Electron-Phaser

## Proyecto de juego con:

![](https://upload.wikimedia.org/wikipedia/commons/9/91/Electron_Software_Framework_Logo.svg)
![](https://jaki-jezyk-programowania.pl/img/technologies/phaser.png)
![](https://camo.githubusercontent.com/6ed9c2c50ea2a6dc8fa23f8f41fcb98aebf2b0eb4e816c7c85247280331bd4fa/68747470733a2f2f796f67656e6472612e6d652f323031372f30372f32302f6d6967726174696f6e2d6d616e69612f68746d6c2d6a732d6373732e706e67)

---

## Fase Actual

- INIT
- Configurar Electron JS
- Phaser3 Cargado
  - -> _Configurar Phaser3_

---

## Documentacion

- [Setup Phaser3](https://storage.googleapis.com/assets.ourcade.co/books/Infinite_Jumper_Phaser3_Modern_JavaScript.pdf?ck_subscriber_id=2069688351)
- [Electron Forge](https://www.electronforge.io/)
- [Guia MD](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
- [GDD](https://www.figma.com/file/BbPybFKTaRKF4kqJK1eaTB/GDD?node-id=0%3A1&t=q5YVdGGZs2QbXo3I-1)

---

## Errores conocidos

- ![](./WarningsSnpashot/Screenshot%20from%202023-02-27%2009-17-58.png)

- Las rutas de archivos deben hacerse teniendo en cuenta que al cargar desde el HTML, la ruta relativa debe ser desde este, no desde el js...
  - Lo ideal seria buscar una forma de hacer un cargador de archivos o algo asi que sea mas facil de referenciar durante el codigo.
