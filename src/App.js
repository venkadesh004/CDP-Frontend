import Landing from "./pages/Landing";
import SupplierSignIn from "./components/SignIn/Supplier/SupplierSignIn";
import SupplierSignUp from "./components/SignIn/Supplier/SupplierSignUp";
import SignUp from "./pages/SignUp";
import UploadDocuments from "./components/Supplier/UploadDocuments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/supplierSignUp" element={<SupplierSignUp />} />
        <Route path="/supplierSignIn" element={<SupplierSignIn />} />
        <Route path="/UploadDocuments" element = {<UploadDocuments/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
