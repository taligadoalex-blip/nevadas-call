# NEVADAS CALL — primeira versão desktop

Esta versão transforma o HTML atual da NEVADAS CALL em um aplicativo Electron para Windows.

## O que já está preparado

- Interface atual da NEVADAS preservada.
- Janela desktop própria.
- Seletor próprio do NEVADAS para escolher **Telas** e **Janelas**.
- O seletor nativo de compartilhamento do Chrome/Google não é usado no app.
- O compartilhamento continua usando `getDisplayMedia`, mas o Electron decide qual fonte será concedida depois que o usuário escolhe no seletor do NEVADAS.
- Captura de áudio de desktop é solicitada quando disponível.
- O renderer pede `restrictOwnAudio` para evitar que o próprio áudio da NEVADAS entre na captura quando suportado pelo Chromium/Electron.

## Rodar no Windows

1. Instale Node.js LTS.
2. Abra o Prompt/PowerShell nesta pasta.
3. Rode:

```bash
npm install
npm start
```

## Gerar um executável portátil

```bash
npm run dist
```

O executável será criado na pasta `dist`.

## Observação sobre áudio

No Windows, o Electron consegue fornecer áudio de desktop via loopback. A separação perfeita por aplicativo/janela depende das APIs de áudio do sistema. A primeira versão já evita o áudio da própria NEVADAS quando o Chromium/Electron respeita `restrictOwnAudio`, mas isso deve ser validado no computador de destino.

A seleção de **abas individuais do Chrome** não é equivalente a uma janela do sistema e, nesta primeira versão, o seletor próprio mostra telas e janelas. Abas individuais poderão ser tratadas em uma etapa específica caso a NEVADAS passe a incorporar um navegador interno.
