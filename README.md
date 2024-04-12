## Getting Started

### Environment Variables

Pull the `.env` file

```bash
npx dotenv-vault@latest pull
```

or create a .env file

```text
# We use Sendbird, MongoDB and Uploadthing as third-party APIs
# The client side env variables need have `NEXT_PUBLIC_` prefix

NEXT_PUBLIC_SENDBIRD_APP_ID={INFO}
API_TOKEN={INFO}
MONGODB_URI={INFO}
JWT_SECRET={INFO}
JWT_EXPIRES_IN={INFO}
UPLOADTHING_SECRET={INFO}
UPLOADTHING_APP_ID={INFO}
```

### Install packages

```bash
pnpm install
```

### Run the project

```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000/) to see the results.

## UML

Check out UML [here](https://github.com/INEEDAMONITOR/Role-Rally/blob/main/UML_Diagram/README.md)

If you want to help refine the UML, check [Get Start doc](https://github.com/INEEDAMONITOR/Role-Rally/blob/UML/UML_Diagram/Get-Start-UML-on-GitHub.md)
