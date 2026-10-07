#!/usr/bin/env python3
"""server.py
Lightweight static web server for NEXUS: Campus & Enterprise Intelligence Platform.
Runs locally on http://localhost:3000
"""
import http.server
import os
import socketserver
import sys
import webbrowser

PORT = 3000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app")

class NexusHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for high speed local dev
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

def main():
    os.chdir(ROOT)
    print("=" * 65)
    print("⚡ NEXUS: Campus to Corporate Talent Intelligence Platform")
    print(f"📡 Serving from: {ROOT}")
    print(f"🌐 URL: http://localhost:{PORT}")
    print("=" * 65)
    
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NexusHTTPHandler) as httpd:
        print(f"Server active on port {PORT}. Press Ctrl+C to terminate.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    main()
