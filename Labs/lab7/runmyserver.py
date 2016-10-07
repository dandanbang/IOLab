'''Sockets can be configured to act as a server and listen for incoming messages, or connect to other
applications as a client. After both ends of a TCP/IP socket are connected, communication is bi-directional.'''

import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Bind the socket to the port
server_address = ('', 8080)
# Listen for incoming connections
sock.listen(1)

while True:
    # Wait for a connection
    connection, client_address = sock.accept()

    try:
        # print >>sys.stderr, 'connection from', client_address
        # Receive the data in small chunks and retransmit it
        while True:
            data = connection.recv(1024)
            # print >>sys.stderr, 'received "%s"' % data
            if data:
                # print >>sys.stderr, 'sending data back to the client'
                connection.sendall('Of couese!')
            else:
                # print >>sys.stderr, 'no more data from', client_address
                break

    finally:
        # Clean up the connection
        connection.close()
