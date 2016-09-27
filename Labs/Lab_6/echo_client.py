import socket
import sys

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
server_address = ('', 8080)
# print >>sys.stderr, 'connecting to %s port %s' % server_address
sock.connect(server_address)

try:
    # Send data
    message = b'Is IOLab your favorite class?'
    print('sending "{}"'.format(message), file=sys.stderr)
    sock.sendall(message)

    # Look for the response
    amount_received = 0
    amount_expected = len(message)

    while amount_received < amount_expected:
        data = sock.recv(1024)
        amount_received += len(data)
        print('received "{}"'.format(data), file=sys.stderr)

finally:
    print('closing socket', file=sys.stderr)
    sock.close()
