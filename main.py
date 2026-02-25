from cryptography.fernet import Fernet
import os
import json

# ------------------ VAULT SETUP ------------------

def generate_key():
    key = Fernet.generate_key()
    with open("vault.key", "wb") as key_file:
        key_file.write(key)

def load_key():
    return open("vault.key", "rb").read()

# Generate key if not exists
if not os.path.exists("vault.key"):
    generate_key()

key = load_key()
cipher = Fernet(key)

# ------------------ VAULT FUNCTIONS ------------------

def save_to_vault(site, username, password):
    data = {
        "site": site,
        "username": username,
        "password": password
    }

    encrypted_data = cipher.encrypt(json.dumps(data).encode())

    with open("vault.dat", "ab") as file:
        file.write(encrypted_data + b"\n")

    print("✅ Stored securely in Vault!")

def view_vault():
    if not os.path.exists("vault.dat"):
        print("Vault is empty.")
        return

    print("\n🔐 Decrypted Vault Data:\n")

    with open("vault.dat", "rb") as file:
        for line in file:
            decrypted = cipher.decrypt(line.strip())
            print(json.loads(decrypted.decode()))

# ------------------ MENU OPTION ------------------

def vault_menu():
    while True:
        print("\n--- Secure Vault ---")
        print("1. Store Password")
        print("2. View Vault")
        print("3. Exit Vault")

        choice = input("Enter choice: ")

        if choice == "1":
            site = input("Enter website/app name: ")
            username = input("Enter username: ")
            password = input("Enter password: ")
            save_to_vault(site, username, password)

        elif choice == "2":
            view_vault()

        elif choice == "3":
            break

        else:
            print("Invalid option.")