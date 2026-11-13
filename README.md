# Cuidados

App PWA para gerenciar remédios e cuidados da família: o Freddy (Shih Tzu, 14 anos) e outros pacientes cadastrados no próprio app.

## Acesso

Abra: <https://danielecesa.github.io/freddy-cuidados/>

- Protegido por senha. Instale como PWA no celular para receber lembretes.
- Os dados sincronizam entre celulares pelo Supabase, **criptografados com a senha do app** (AES-GCM). Quem lê a nuvem vê só dados embaralhados.
- O administrador (PIN próprio) cadastra pacientes e remédios e recebe avisos pelo app **ntfy** quando alguém marca uma dose.
- Uma rotina do GitHub Actions acessa o Supabase 2x por semana para o projeto gratuito não pausar.
