import socket
import os

# Dictionary to store routes
routes = {}

# Custom decorator to register routes
def route(path):
    def wrapper(func):
        routes[path] = func
        return func
    return wrapper

# ============================
# Define route functions below
# ============================

@route("/")
def index():
    return send_file("index.html", "text/html")

@route("/style.css")
def style():
    return send_file("style.css", "text/css")

@route("/about.html")
def about():
    return send_file("about.html", "text/html")

@route("/comingsoon.html")
def index():
    return send_file("comingsoon.html", "text/html")

@route("/contact.html")
def index():
    return send_file("contact.html", "text/html")

@route("/contact1.html")
def index():
    return send_file("contact1.html", "text/html")

@route("/profile.html")
def index():
    return send_file("profile.html", "text/html")

@route("/shoptutorial.html")
def index():
    return send_file("shoptutorial.html", "text/html")

@route("/signin.html")
def index():
    return send_file("signin.html", "text/html")

@route("/signup.html")
def index():
    return send_file("signup.html", "text/html")

@route("/store.html")
def index():
    return send_file("store.html", "text/html")

@route("/images/airpodmaxes.jpg")
def logo_image():
    return send_file("images/airpodmaxes.jpg", "image/png")

@route("/images/Airpods.jpeg")
def logo_image():
    return send_file("images/Airpods.jpeg", "image/png")

@route("/images/baccarat.jpeg")
def logo_image():
    return send_file("images/baccarat.jpeg", "image/png")

@route("/images/Ysl.jpg")
def logo_image():
    return send_file("images/Ysl.jpg", "image/png")

@route("/images/watch.jpeg")
def logo_image():
    return send_file("images/watch.jpeg", "image/png")

@route("/images/vvs.jpg")
def logo_image():
    return send_file("images/vvs.jpg", "image/png")

@route("/images/versace.jpeg")
def logo_image():
    return send_file("images/versace.jpeg", "image/png")

@route("/images/sp5derpants.jpeg")
def logo_image():
    return send_file("images/sp5derpants.jpeg", "image/png")

@route("/images/sp5der.jpg")
def logo_image():
    return send_file("images/sp5der.jpg", "image/png")

@route("/images/S25.jpg")
def logo_image():
    return send_file("images/S25.jpg", "image/png")

@route("/images/iphone.jpeg")
def logo_image():
    return send_file("images/iphone.jpeg", "image/png")

@route("/images/ipad.jpeg")
def logo_image():
    return send_file("images/ipad.jpeg", "image/png")

@route("/images/hellstarshorts.jpeg")
def logo_image():
    return send_file("images/hellstarshorts.jpeg", "image/png")

@route("/images/Hellstarpants.jpeg")
def logo_image():
    return send_file("images/Hellstarpants.jpeg", "image/png")

@route("/images/hellstarhoodie.jpeg")
def logo_image():
    return send_file("images/hellstarhoodie.jpeg", "image/png")

@route("/images/hellstar.jpeg")
def logo_image():
    return send_file("images/hellstar.jpeg", "image/png")

@route("/images/godspeed.jpeg")
def logo_image():
    return send_file("images/godspeed.jpeg", "image/png")

@route("/images/denimpants.jpeg")
def logo_image():
    return send_file("images/denimpants.jpeg", "image/png")

@route("/images/Denim-Tears-Hoodie.jpg.avif")
def logo_image():
    return send_file("images/Denim-Tears-Hoodie.jpg.avif", "image/png")

@route("/images/shop.mov")
def shop_video():
    return send_file("images/shop.mov", "video/quicktime")



# ============================
# Helper function to read files
# ============================

def send_file(filename, content_type):
    try:
        with open(filename, "rb") as f:
            body = f.read()
        response = (
            "HTTP/1.1 200 OK\r\n"
            f"Content-Type: {content_type}\r\n"
            f"Content-Length: {len(body)}\r\n"
            "Access-Control-Allow-Origin: *\r\n"
            "\r\n"
        ).encode() + body
    except FileNotFoundError:
        body = b"404 Not Found"
        response = (
            "HTTP/1.1 404 Not Found\r\n"
            "Content-Type: text/plain\r\n"
            f"Content-Length: {len(body)}\r\n"
            "\r\n"
        ).encode() + body
    return response

# ============================
# Server code
# ============================

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(("localhost", 8002))
server_socket.listen(1)

print("Listening on http://localhost:8002")

while True:
    client_connection, client_address = server_socket.accept()
    request = client_connection.recv(1024).decode()
    print("Request:", request)

    try:
        path = request.split(" ")[1]
    except IndexError:
        path = "/"

    # If route exists, call its function
    if path in routes:
        response = routes[path]()
    else:
        # Handle unknown paths
        response = (
            "HTTP/1.1 404 Not Found\r\n"
            "Content-Type: text/plain\r\n"
            "\r\n"
            "404 Page Not Found"
        ).encode()

    client_connection.sendall(response)
    client_connection.close()
