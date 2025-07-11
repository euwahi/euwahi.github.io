from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "API de doações Laços Profanos"

@app.route("/token")
def token():
    return os.environ.get("acesstoken_mp", "Token não definido")

if __name__ == "__main__":
    from waitress import serve
    port = int(os.environ.get("PORT", 5000))
    serve(app, host="0.0.0.0", port=port)
