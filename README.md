# APP Cuidados Saúde

App PWA para gerenciar remédios e cuidados da família: o Freddy (Shih Tzu, 14 anos) e outros pacientes cadastrados no próprio app.

## Acesso

Abra: <https://danielecesa.github.io/freddy-cuidados/>

- Cada pessoa entra com **o próprio nome e senha**. Para criar um acesso novo é preciso o **código da família** (a senha antiga do app). O administrador pode remover acessos em ⚙️ Ajustes.
- Instale como PWA no celular para receber lembretes.
- Os dados sincronizam entre celulares pelo Supabase, **criptografados** (AES-GCM) com a chave da família; cada pessoa guarda na nuvem uma cópia dessa chave trancada com a própria senha. Quem lê a nuvem vê só dados embaralhados.
- O administrador (PIN próprio) cadastra pacientes e remédios e recebe avisos pelo app **ntfy** quando alguém marca uma dose.
- Uma rotina do GitHub Actions acessa o Supabase 2x por semana para o projeto gratuito não pausar.
- Cada paciente pode ter **vários médicos**; cada remédio indica qual médico receitou.
- **Estoque**: o administrador liga o controle no remédio (unidade, quanto gasta por dose, com quantos dias avisar). O estoque desce a cada dose marcada; qualquer cuidador registra compras ("🛒 Comprei") ou conta o que sobrou. Quando faltar pouco aparece o aviso de compra no app e vai um aviso pelo ntfy.
- **Receita por foto ou PDF** (administrador, aba Medicamentos): o app lê a receita no próprio celular (PDF digital direto; foto/PDF escaneado com Tesseract), separa médico e remédios e mostra tudo para conferir antes de cadastrar. Receita manuscrita costuma não ser reconhecida.
