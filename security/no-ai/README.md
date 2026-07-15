# no-ai

Run 

```bash
bun src/01-read-env-node.ts
```

to see a regular script that can read the .env file 


Now run 

```bash
sandbox-exec -D ENV_PATH="$(pwd -P)/.env" -f no-env.sb node src/01-read-env-node.ts
```

and observe you see an error 

```
 Error: EPERM: operation not permitted, open
```


## Important note about bun

Observe that 

```bash
sandbox-exec -D ENV_PATH="$(pwd -P)/.env" -f no-env.sb bun src/00-hello-world.ts
```

(ie. running a simple `console.log("hello world!")` in the sandbox) will cause Bun to exit with process 1. 

I believe what the issue here is that [bun loads `.env` file by default](https://bun.com/docs/runtime/environment-variables) and so encounters the sandboxing and errors out. 

If on the other hand, you ran 

```bash
sandbox-exec -D ENV_PATH="$(pwd -P)/.env" -f no-env.sb bun --no-env-file src/00-hello-world.ts

```

It executes fine.