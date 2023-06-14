# Template Edge Application with Azion and Upstash

## Geolocation

This is an edge template that displays a personalized greeting based on the customer's location. Using Redis, you'll upload the greeting message from Upstash.

## Prerequisites

Before use template, ensure that you have the following prerequisites:

- Azion account [visit the sing-up page](https://manager.azion.com/signup/)
- Upstash account (Sign up at [Upstash](https://upstash.com))

---

> - [Create an Azion account](#Create-an-Azion-account)
> - [Create a Redis database](#Creat-a-Redis-database)
> - [Deploy on Edge](#Deploy-on-Edge)
>   - [Marketplace](#Marketplace)
>   - [Github Actions](#Github-Actions)

---

## Create an Azion account

To create an Azion account, just [visit the sing-up page](https://manager.azion.com/signup/) at [Azion's homepage](https://www.azion.com/en/).

---

## Create a Redis database

In order to use the template, you'll have to create a Upstash accpount to use with it. To do so, follow these steps:

1. Create an [Upstash account](https://console.upstash.com/login).
2. Create a Global database for the best edge latency in [Upstash Console](https://console.upstash.com/).
3. Enter your database in the CLI tab and add your greetings:

```bash
Welcome to Upstash CLI

set BR "Olá, tudo bem!"
OK
set GB "Ey up?"
OK
set US "Yo, what’s up?"
OK
set IN "Namaste"
OK
```

---

## Deploy on Edge

To perform the deploy on edge, you have two ways to do:

- By using Marketplace.
- By using GitHub actions.

### Marketplace

Build and Application [choose a template](https://manager.azion.com/build-application/build/choose-template)

Choose **Upstash GeoLocation EdgeDeploy** template

Generate your personal github token by visiting the documentation at [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic)

Enter the information in the settings tab:

- `Application Name`: Application name in RTM Azion
- `Edge Function args`: JSON args required for build and connection to redis database { UPSTASH_REDIS_REST_URL: "", UPSTASH_REDIS_REST_TOKEN: ""}
- `Github Personal Token`: Github Personal Token

---

## Github Actions

### Secrets Github

Accessing your secrets [Add Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### Azion Personal token

Create your Azion personal token by visiting the [Personal Token creating page](https://manager.azion.com/iam/personal-tokens)

Add the Personal Token to the `secrets`:

```bash
    AZION_PERSONAL_TOKEN=<value>
```

Environments for use in the action workflow:

```yml
  - name: edge-...
    id: azion_edge
    ...
    with:
        ....
        azionPersonalToken: ${{ secrets.AZION_PERSONAL_TOKEN }}
        ....

```


Add the Redis Database access credentials to the `secrets`:

```bash
    UPSTASH_REDIS_REST_URL=<value>
```

```bash
    UPSTASH_REDIS_REST_TOKEN=<value>
```

Environments for use in the action workflow:

```yml
 - name: Create args file
    run: |
        ...
        "UPSTASH_REDIS_REST_URL": "${{ secrets.UPSTASH_REDIS_REST_URL }}",
        "UPSTASH_REDIS_REST_TOKEN": "${{ secrets.UPSTASH_REDIS_REST_TOKEN }}"
        ...
```

> **Note**: for automatic deployment, create a pull request to the main branch.
