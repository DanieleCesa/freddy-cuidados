# APP Cuidados Saúde

App PWA para gerenciar remédios e cuidados da família: o Freddy (Shih Tzu, 14 anos) e outros pacientes cadastrados no próprio app.

## Acesso

Abra: <https://danielecesa.github.io/freddy-cuidados/>

- Protegido por senha. Instale como PWA no celular para receber lembretes.
- Os dados sincronizam entre celulares pelo Supabase, **criptografados com a senha do app** (AES-GCM). Quem lê a nuvem vê só dados embaralhados.
- O administrador (PIN próprio) cadastra pacientes e remédios e recebe avisos pelo app **ntfy** quando alguém marca uma dose.
- Uma rotina do GitHub Actions acessa o Supabase 2x por semana para o projeto gratuito não pausar.
- Cada paciente pode ter **vários médicos**; cada remédio indica qual médico receitou.
- **Estoque**: o administrador liga o controle no remédio (unidade, quanto gasta por dose, com quantos dias avisar). O estoque desce a cada dose marcada; qualquer cuidador registra compras ("🛒 Comprei") ou conta o que sobrou. Quando faltar pouco aparece o aviso de compra no app e vai um aviso pelo ntfy.
