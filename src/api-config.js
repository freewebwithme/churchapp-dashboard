let serverHTTPHost;
let serverWSHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "churchapp.dev" || hostname === "www.churchapp.dev") {
  serverHTTPHost = "https://churchapp-server.herokuapp.com/api";
  serverWSHost = "ws://churchapp-server.herokuapp.com/socket";
} else {
  serverHTTPHost = "http://localhost:4000/api";
  serverWSHost = "ws://localhost:4000/socket";
}

export { serverHTTPHost, serverWSHost };
