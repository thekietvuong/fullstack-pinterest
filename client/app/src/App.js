import './App.css';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Detail } from './pages/Detail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserInfo } from './pages/UserInfo';
import { Home } from './pages/Home';
import { UploadImage } from './pages/UploadImage';
import { EditProfile } from './pages/EditProfile';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/detail/:id' element={<Detail />} />
          <Route exact path='/userinfo/:id' element={<UserInfo />} />
          <Route exact path='/upload-image' element={<UploadImage />} />
          <Route exact path='/edit-profile' element={<EditProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
