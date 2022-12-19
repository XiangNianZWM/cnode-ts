// BrowserRouter 和 HashRouter 区别： B /xx访问, H #/xxx访问
import Index from "../pages/Index/Index";
import Detail from "../pages/Detail/Detail";
import Collect from "../pages/Collect/Collect";

const routes = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/detail',
    element: <Detail />,
    children: [
      {
        path: '/detail/:id',
        element: <Detail />
      }
    ]
  },
  {
    path: '/collect',
    element: <Collect />
  }
]
export {
  routes
} 

// 此处为原来APP里面的内容， 新建一个app.tsx
// 等同于下面的  const elements = useRoutes(routes);
// const IRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element={<App />}></Route>
//         <Route exact path="/detail" element={<Detail />}>
//           <Route path="/detail/login" element={<Login />}></Route>
//         </Route>
//         <Route path="/Test" element={<Test />}></Route>
//       </Routes>
//     </Router>
//   );
// };

// export default IRouter;
