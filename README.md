## Getting Started

1. Configure environment variables in `/.env` and `/server/.env`

    /.env

    ```bash
    NEXT_PUBLIC_SERVER_URL={YOUR_SERVER_URL}
    # NEXT_PUBLIC_SERVER_URL=http://localhost:3001
    ```

    /server/.env

    ```bash
    PORT={YOUR_SERVER_PORT}
    # PORT=3001
    ```

2. Install the project dependencies (ui & server):

```bash
pnpm predev
```

3. Run the development server (ui & server):

```bash
pnpm fulldev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## UML

Check UML [here](https://github.com/INEEDAMONITOR/Role-Rally/blob/UML/UML_Diagram/README.md)

If you want to help refine the UML, check [Get Start doc](https://github.com/INEEDAMONITOR/Role-Rally/blob/UML/UML_Diagram/Get-Start-UML-on-GitHub.md)
