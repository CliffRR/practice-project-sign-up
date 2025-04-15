import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/signup";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

//Notes
//the nav bar will be shown in every page
//I could easily create a footer page by just simply putting a div below the Routes 
//anything above or below the Routes will always stay on the page 


function App() {
  return (
      <QueryClientProvider client={queryClient}>  
          {/* <DndProvider backend = {HTML5Backend}> */}
          <BrowserRouter>
            <ReactQueryDevtools />
            <Routes>

              <Route path = "/" element = { <Registration /> }/>

            </Routes>
          </BrowserRouter>
            
          {/* </DndProvider> */}
      </QueryClientProvider>
  );
}

export default App;
