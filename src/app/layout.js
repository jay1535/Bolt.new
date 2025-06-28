
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";
import Provider from "./provider";




export const metadata = {
  title: "bolt.new 2.0",
  description: "Clone of bolt.new",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
         <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body
       
      >
        <ConvexClientProvider>
        <Provider>
         
           {children}
        </Provider>
        </ConvexClientProvider>
       
      </body>
    </html>
  );
}
