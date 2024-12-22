
import "../globals.css";
import Dash from "./Dash";

export default function dashboardLayout({children}) {
  return (
    <html className="h-full">
      <body className="h-full">
        <Dash />
        {children}
      </body>
    </html>
  );
}
