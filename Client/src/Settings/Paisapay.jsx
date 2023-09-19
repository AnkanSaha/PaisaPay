import React from "react"; // React 18
import ReactDOM from "react-dom/client"; // React DOM for React 18
import Global from "./Global"; // Main component

// Configure Redux
import { Provider } from "react-redux"; // Import Provider
import ReduxStore from "@redux/Config/Main Store"; // Import Store

// Render the component
const Root = ReactDOM.createRoot(document.getElementById("PaisaPay"));
Root.render(
  <React.StrictMode>
    <Provider store={ReduxStore} > {/* Redux Provider */}
      <Global /> {/* Main component */}
    </Provider> {/* Redux Provider */}
  </React.StrictMode>
);
