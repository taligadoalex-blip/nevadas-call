# NEVADAS CALL Desktop v0.2 — GitHub Actions

Este pacote está preparado para o GitHub Actions gerar automaticamente a versão portátil para Windows.

## Como usar

1. Crie um repositório no GitHub.
2. Envie **todo o conteúdo desta pasta `NEVADAS_CALL_APP`** para o repositório.
3. Abra a aba **Actions**.
4. Entre em **Build NEVADAS CALL for Windows**.
5. Clique em **Run workflow**.
6. Quando terminar, abra a execução concluída.
7. Em **Artifacts**, baixe `NEVADAS-CALL-Windows-x64`.

O ZIP do artefato contém:

`NEVADAS CALL Portable.exe`

O workflow usa `windows-latest` para produzir o executável Windows e o alvo `portable` do electron-builder, que gera um único `.exe` sem instalação.
