import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext' // <-- Import this

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>  {/* <-- Wrap your App inside the AuthProvider */}
			<App />
		</AuthProvider>
	</React.StrictMode>,
)