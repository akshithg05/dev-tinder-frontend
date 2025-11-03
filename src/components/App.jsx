import { Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import Error from "./Error";
import Connection from "./Connections";
import Requests from "./Requests";
import Privacy from "./Privacy";
import Contact from "./Contact";
import Shipping from "./Shipping";
import Terms from "./Terms";
import Refund from "./Refund";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/connections" element={<Connection />}></Route>
          <Route path="/requests" element={<Requests />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/refunds" element={<Refund />}></Route>
        </Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
