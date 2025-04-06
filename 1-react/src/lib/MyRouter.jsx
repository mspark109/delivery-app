import React from "react";
import { getComponentName } from './utils';

export const routerContext = React.createContext({});
routerContext.displayName = "RouterContext"; 

export const Link =({to, ...rest}) => (
  <routerContext.Consumer>
    {({path, changePath }) => {
      const handleClick = (e) => {
        e.preventDefault();
        if (to !== path) changePath(to);
      };
      return <a {...rest} href={to} onClick={handleClick}/>
    }}
  </routerContext.Consumer>
)

// 요청 경로를 상태로관리
export class Router extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: window.location.pathname
    };
    this.handleChangePath = this.handleChangePath.bind(this);
    this.handleOnpopstate = this.handleOnpopstate.bind(this);
  }

  handleChangePath(path) {
    this.setState({ path })
    window.history.pushState({ path }, "", path);
  }

  handleOnpopstate(event) {
    const nextPath = event.state && event.state.path;
    if(!nextPath) return;
    this.setState({path:nextPath});
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handleOnpopstate);
    window.history.replaceState({ path: this.state.path }, ""); // 최초 로딩시 상태를 history에 추가
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleOnpopstate);
  }

  render() {
    const contextValue = {
      path : this.state.path,
      changePath : this.handleChangePath,
    };

    return (
      <routerContext.Provider value={contextValue}>
        {this.props.children}
      </routerContext.Provider>
    )
  }
}

// 요청 경로에 따라 적절한 컴포넌트를 찾는 역할
export const Routes = ({children}) => (
  <routerContext.Consumer>
      {({path})=> {
        let selectedRoute = null;

        React.Children.forEach(children, (child) => {
          //리액트 엘리먼트인지 검사 
          if(!React.isValidElement(child)) return;

          //프래그먼트 검사
          if(child.type === React.Fragment) return;

          //Route 컴포넌트인지 검사
          if(!child.props.path || !child.props.element) return;

          // 요청 경로를 검사한다. 
          if(child.props.path !== path.replace(/\?.*$/, "")) return;

          selectedRoute = child.props.element;
        });

        return selectedRoute;
      }}
    </routerContext.Consumer>
)

export const Route = () => null;

export const WithRouter = (WrappedComponent) =>{
  const WithRouter = (props) => (
    <routerContext.Consumer>
      {({path, changePath}) => {

        const navigate = (nextPath) =>{
          if(path !== nextPath) changePath(nextPath);
        };

        const match = comparePath => path === comparePath;

        const params = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const paramsObject= {};
          for (const [key, value] of urlParams) {
            paramsObject[key] = value;
          }

          return paramsObject;
        }

        const enhancedProps = {
          navigate,
          match,
          params,
        };
      
      return <WrappedComponent {...props} {...enhancedProps}/>
      }}
    </routerContext.Consumer>
  );
  WithRouter.displayName = `WithRouter(${getComponentName(WrappedComponent)})`;

  return WithRouter;
}