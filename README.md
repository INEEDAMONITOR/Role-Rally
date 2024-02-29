## Getting Started

### Env Setup

1. Install packages

```bash
pnpm install
```

2. Pull the `.env` file

```bash
npx dotenv-vault@latest pull
```

3. Run the project

```bash
pnpm dev
```

4. Open [localhost:3000](http://localhost:3000/)

If you add new env variable

```bash
$ npx dotenv-vault@latest push
```

> - Push before you commit.
> - The client side env variables need have `NEXT_PUBLIC_` prefix.

## UML

Check UML [here](https://github.com/INEEDAMONITOR/Role-Rally/blob/main/UML_Diagram/README.md)

If you want to help refine the UML, check [Get Start doc](https://github.com/INEEDAMONITOR/Role-Rally/blob/UML/UML_Diagram/Get-Start-UML-on-GitHub.md)
