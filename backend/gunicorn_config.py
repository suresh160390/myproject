import multiprocessing
from gunicorn_config import glogging
from api import app

bind = "0.0.0.0:8000"  # Listen on all network interfaces on port 8000
workers = multiprocessing.cpu_count() * 2 + 1  # Number of worker processes
timeout = 30

# You can adjust worker class and worker timeout based on your application needs
# worker_class = "sync"  # Use synchronous worker class
# worker_connections = 1000  # Number of simultaneous connections a worker can handle
# timeout = 30  # Timeout for worker processes in seconds

# Enable graceful shutdown
# graceful_timeout = 30  # Timeout for graceful shutdown in seconds

# # Logging configurations
# accesslog = "-"  # Log to stdout
# errorlog = "-"   # Log to stderr
# loglevel = "info"  # Log level: debug, info, warning, error, critical

if __name__ == "__main__":
    glogging.Logger.access_log.setLevel("INFO")    
    from gunicorn_config import sync
    sync(app).run()