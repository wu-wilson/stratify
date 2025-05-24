# Certificates Setup — mkcert

This folder contains SSL certificates used for local development.

---

## Using mkcert for Trusted Local HTTPS Certificates

### 1. Install mkcert

**macOS:**

```bash
brew install mkcert
brew install nss  # for Firefox support (optional)
```

**Windows:**

- Download the latest `mkcert.exe` from [mkcert releases](https://github.com/FiloSottile/mkcert/releases)
- Or install via Chocolatey:
  ```bash
  choco install mkcert
  ```

**Linux:**

- Follow instructions on the [mkcert GitHub page](https://github.com/FiloSottile/mkcert#linux)

---

### 2. Install the Local CA (One-Time Setup)

Run:

```bash
mkcert -install
```

- You may be prompted for your system password (your normal user password).
- This step adds a trusted local Certificate Authority (CA) to your OS and browsers.

---

### 3. Generate Certificates

Generate certs for `localhost` (or add other domains if needed):

```bash
mkcert localhost
```

This creates two files:

- `localhost.pem` (certificate)
- `localhost-key.pem` (private key)
