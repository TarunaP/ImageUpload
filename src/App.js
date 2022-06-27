import './App.css';
import SingleImageUpload from './components/SingleImageUpload';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import ImageUploadPreviewComponent from './components/ImageUploadPreviewComponent';

function App() {

  return (
    <div className="App">
      <h4>Image Upload Example</h4>
      <SingleImageUpload />
      {/* <ImageUploadPreviewComponent /> */}
    </div>
  );
}

export default App;
